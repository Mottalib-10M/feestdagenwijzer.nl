/**
 * De rekenaars van de site. Elke datum komt uit de rekenkern (engine/feestdagen.ts, engine/bruggen.ts,
 * engine/school.ts, engine/termijnen.ts); niets is overgetypt. Een spec somt zijn velden op (zichtbaar eerst, `adv`
 * ingeklapt) en een functie `run` die de resultaatkaart levert. Aftellen en kalender zijn eigen componenten.
 */
import type { ToolSpec, V, ToolOut, Opt } from './tool-types';
import { resolve } from './tool-types';
import { formatNumber, formatDecimal, TAG, type Lang } from './format';
import { officieel, vrijeDagen, datum, defOf, isVrij, VRIJ, STATUS_TEKST, PROFIELEN, PROFIEL_NAAM, FEESTDAGEN, optiesVoor, volgende, type FeestId, type Profiel, type Opties, type Status } from './engine/feestdagen';
import { optimaliseer, bruggen, brugdagen, werkdagen, weekdagen, werkdagenTussen } from './engine/bruggen';
import { kalender, SCHOOLJAREN, REGIOS, REGIO_KORT, REGIO_NAAM, VAKS, VAK_NAAM, ADVIES, dagen, weekdagenIn, volgendeVakantie, regiosMetVakantie, zelfdeOveral, PROVINCIE_NAMEN, keuzes, regioVan, sj, type Regio, type Vak, type Periode } from './engine/school';
import { verleng } from './engine/termijnen';
import { paaszondag, gaussStappen, fromIso, toIso, isWeekend, weekday, dayNum, isoWeek, weeksInYear } from './engine/dagen';

export type Args = Record<string, number | string>;
export const T = (l: Lang, nl: string, en: string) => (l === 'nl' ? nl : en);
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k] ?? '');
const num = (x: number, l: Lang) => formatNumber(x, 0, l);
const fmt = (iso: string, l: Lang, o: Intl.DateTimeFormatOptions) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(TAG(l), { ...o, timeZone: 'UTC' });
/** « 6 mei 2027 » */
export const dLong = (iso: string, l: Lang) => fmt(iso, l, { day: 'numeric', month: 'long', year: 'numeric' });
/** « donderdag 6 mei 2027 » */
export const dWeek = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
/** « do 6 mei » */
export const dShort = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'short', day: 'numeric', month: 'long' }).replace('.', '');
/** « 6 mei » */
export const dDay = (iso: string, l: Lang) => fmt(iso, l, { day: 'numeric', month: 'long' });
export const wdLong = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'long' });
export const span = (a: string, b: string, l: Lang) => (a === b ? dShort(a, l) : `${dShort(a, l)} – ${dShort(b, l)}`);
/** « 24 april – 2 mei 2027 » of « 19 december 2026 – 3 januari 2027 » */
export function periode(p: Periode, l: Lang): string {
  const [ya, yb] = [p.van.slice(0, 4), p.tot.slice(0, 4)];
  if (ya !== yb) return `${dLong(p.van, l)} – ${dLong(p.tot, l)}`;
  if (p.van.slice(5, 7) === p.tot.slice(5, 7)) return `${fmt(p.van, l, { day: 'numeric' })} – ${dLong(p.tot, l)}`;
  return `${dDay(p.van, l)} – ${dLong(p.tot, l)}`;
}
/** « 4 verlofdagen → 9 dagen vrij » (testeurs naïfs 2026-11-14 : « 4 → 9 » seul ne se lisait pas). */
export const verlofNaarVrij = (verlof: number, vrij: number, l: Lang) => T(l, `${num(verlof, l)} verlofdag${verlof === 1 ? '' : 'en'} → ${num(vrij, l)} dagen vrij`, `${num(verlof, l)} leave day${verlof === 1 ? '' : 's'} → ${num(vrij, l)} days off`);
export const dagenTxt = (x: number, l: Lang) => `${num(x, l)} ${x === 1 ? T(l, 'dag', 'day') : T(l, 'dagen', 'days')}`;
const off = (iso: string, d: number) => toIso(fromIso(iso) + d);
const sumA = (a: number[]) => a.reduce((x, z) => x + z, 0);
export const JAREN = [2026, 2027, 2028, 2029, 2030];
export const MAANDEN = (l: Lang) => Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(2027, i, 15)).toLocaleDateString(TAG(l), { month: 'long', timeZone: 'UTC' }));

/* ------------------------------------------------------------------ Velden */
const jaarOpts = (ys: number[]): Opt[] => ys.map((y) => ({ value: String(y), label: String(y) }));
const fJaar = (l: Lang, def: number, ys = JAREN) => ({ kind: 'select' as const, id: 'jaar', label: T(l, 'Jaar', 'Year'), def: String(def), options: jaarOpts(ys) });
const fProfiel = (l: Lang, def = 'bedrijf', adv = false) => ({ kind: 'select' as const, id: 'pf', label: T(l, 'Uw situatie', 'Your situation'), def, adv, options: PROFIELEN.map((p) => ({ value: p, label: PROFIEL_NAAM[p][l] })) });
const fGV = (l: Lang, def = 'nee') => ({ kind: 'choice' as const, id: 'gv', label: T(l, 'Goede Vrijdag vrij (cao)?', 'Good Friday off (your agreement)?'), def, adv: true, options: [{ value: 'nee', label: T(l, 'Nee', 'No') }, { value: 'ja', label: T(l, 'Ja', 'Yes') }], help: T(l, 'Rijksoverheid: bij de meeste bedrijven een werkdag.', 'Government: a working day at most companies.') });
const fBD = (l: Lang, def = 'nee') => ({ kind: 'choice' as const, id: 'bd', label: T(l, '5 mei vrij (cao)?', '5 May off (your agreement)?'), def, adv: true, options: [{ value: 'nee', label: T(l, 'Nee', 'No') }, { value: 'ja', label: T(l, 'Ja', 'Yes') }], help: T(l, 'Rijksoverheid: niet iedereen is dan vrij.', 'Government: not everyone has the day off.') });
const fOud = (l: Lang) => ({ kind: 'choice' as const, id: 'od', label: T(l, '24 en 31 december', '24 and 31 December'), def: 'werk', adv: true, options: [{ value: 'werk', label: T(l, 'Werkdagen', 'Working days') }, { value: 'vrij', label: T(l, 'Vrij', 'Days off') }] });
const fRegio = (l: Lang, def = 'midden', adv = false, id = 'regio') => ({ kind: 'select' as const, id, label: T(l, 'Schoolvakantieregio', 'School-holiday region'), def, adv, options: REGIOS.map((r) => ({ value: r, label: REGIO_NAAM[r][l] })) });
const fSj = (l: Lang, def = 2026) => ({ kind: 'select' as const, id: 'sj', label: T(l, 'Schooljaar', 'School year'), def: String(def), options: SCHOOLJAREN.map((y) => ({ value: String(y), label: sj(y) })) });
const fFeest = (l: Lang, def: FeestId = 'hemelvaartsdag') => ({ kind: 'select' as const, id: 'fd', label: T(l, 'Feestdag', 'Public holiday'), def, options: FEESTDAGEN.map((f) => ({ value: f.id, label: f.name[l] })) });
const opts = (v: V, pf?: Profiel): Opties => { const base = pf ? optiesVoor(pf) : { goedeVrijdag: false, bevrijdingsdag: false, oudejaar: false }; return { goedeVrijdag: v.gv === undefined ? base.goedeVrijdag : s(v, 'gv') === 'ja', bevrijdingsdag: v.bd === undefined ? base.bevrijdingsdag : s(v, 'bd') === 'ja', oudejaar: s(v, 'od') === 'vrij' }; };
const aanname = (o: Opties, l: Lang) => T(l,
  `Als vrij gerekend: Nieuwjaarsdag, Tweede Paasdag, Koningsdag, Hemelvaartsdag, Tweede Pinksterdag en beide Kerstdagen${o.goedeVrijdag ? ', Goede Vrijdag' : ''}${o.bevrijdingsdag ? ', Bevrijdingsdag' : ''}${o.oudejaar ? ', 24 en 31 december' : ''}. Of u echt vrij bent, staat in uw cao of contract.`,
  `Counted as days off: New Year's Day, Easter Monday, King's Day, Ascension Day, Whit Monday and both Christmas days${o.goedeVrijdag ? ', Good Friday' : ''}${o.bevrijdingsdag ? ', Liberation Day' : ''}${o.oudejaar ? ', 24 and 31 December' : ''}. Whether you are actually off is in your collective agreement or contract.`);
const fname = (id: string, l: Lang) => FEESTDAGEN.find((f) => f.id === id)?.name[l] ?? (id === 'kerstavond' ? T(l, 'Kerstavond', 'Christmas Eve') : id === 'oudejaarsdag' ? T(l, 'Oudejaarsdag', "New Year's Eve") : id);
const statusTxt = (st: Status, l: Lang) => STATUS_TEKST[st][l];
const schoolTxt = (iso: string, l: Lang) => { const rs = regiosMetVakantie(fromIso(iso)); return rs.length === 3 ? T(l, 'alle regio’s', 'all regions') : rs.length ? rs.map((r) => REGIO_KORT[r][l]).join(', ') : T(l, 'geen', 'none'); };

/* ------------------------------------------------------------------ Feestdagen van een jaar */
const lijstNl = (xs: string[], en = 'en') => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} ${en} ${xs[xs.length - 1]}`);
const waarom = (id: string, l: Lang) => (id === 'goede-vrijdag' ? T(l, 'meestal een werkdag', 'usually a working day') : id === 'bevrijdingsdag' ? T(l, 'niet iedereen is dan vrij', 'not everyone is off') : '');
/** De telling achter « X vrije dagen door de week », in woorden die optellen tot 11. */
export function somZin(y: number, weekend: Array<{ id: string; name: { nl: string; en: string } }>, niet: Array<{ id: string; name: { nl: string; en: string } }>, vrij: number, l: Lang): string {
  const nw = weekend.map((f) => f.name[l]), nn = niet.map((f) => `${f.name[l]} (${waarom(f.id, l)})`);
  const w = weekend.length ? T(l, ` en ${num(weekend.length, l)} in ${y} in het weekend (${lijstNl(nw)})`, ` and ${num(weekend.length, l)} at the weekend in ${y} (${lijstNl(nw, 'and')})`) : '';
  const n = niet.length ? T(l, ` Niet meegeteld: ${lijstNl(nn)}.`, ` Not counted: ${lijstNl(nn, 'and')}.`) : '';
  return T(l, `Van de 11 officiële feestdagen vallen er 2 altijd op zondag${w}; een vervangende dag bestaat niet.${n} Blijven over: ${num(vrij, l)} vrije dagen door de week.`,
    `Of the 11 official holidays, 2 are always Sundays${w}; there is no substitute day.${n} That leaves ${num(vrij, l)} weekday days off.`);
}

function ftSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJaar(l, Number(a.jaar ?? 2027)), fProfiel(l, String(a.pf ?? 'bedrijf')), fGV(l), fBD(l)],
    run: (v) => {
      const y = n(v, 'jaar'), pf = s(v, 'pf') as Profiel, o = opts(v, pf);
      const list = officieel(y, o);
      const wk = list.filter((f) => f.vrij && !isWeekend(fromIso(f.date)));
      const weekend = list.filter((f) => !f.zondag && isWeekend(fromIso(f.date)));
      const niet = list.filter((f) => !f.vrij && !f.zondag && !isWeekend(fromIso(f.date)));
      const bd = brugdagen(y, o);
      return {
        label: T(l, `Feestdagen ${y} in Nederland`, `Public holidays ${y} in the Netherlands`),
        value: T(l, `${num(wk.length, l)} vrije dagen door de week`, `${num(wk.length, l)} weekday days off`),
        // Testeurs naïfs 2026-11-14 : « 11 − 2 − 2 » ne donnait pas 5 ; la phrase nomme maintenant chaque groupe,
        // et la somme 2 + weekend + niet meegeteld + vrij fait toujours 11 (test dans tests/datums.test.ts).
        sub: somZin(y, weekend, niet, wk.length, l),
        rows: [
          [T(l, 'Vrije feestdagen op een weekdag', 'Holidays off on a weekday'), num(wk.length, l)],
          [T(l, 'Feestdagen in het weekend (geen compensatie)', 'Holidays at the weekend (no compensation)'), num(weekend.length, l)],
          [T(l, 'Brugdagen (1 werkdag tussen feestdag en weekend)', 'Bridge days (1 working day between a holiday and the weekend)'), num(bd.length, l)],
          [T(l, 'Werkdagen (ma–vr)', 'Working days (Mon–Fri)'), num(sumA(werkdagen(y, o)), l)],
        ],
        table: {
          caption: T(l, `Alle officiële feestdagen ${y} met weekdag en wat de Rijksoverheid zegt voor: ${PROFIEL_NAAM[pf][l].toLowerCase()}`, `Every official holiday in ${y} with the weekday and what the government says for: ${PROFIEL_NAAM[pf][l].toLowerCase()}`),
          headers: [T(l, 'Datum', 'Date'), T(l, 'Weekdag', 'Weekday'), T(l, 'Feestdag', 'Holiday'), T(l, 'Vrij?', 'Day off?'), T(l, 'Schoolvakantie', 'School holiday')],
          rows: list.map((f) => [dLong(f.date, l), wdLong(f.date, l), f.name[l], statusTxt(VRIJ[f.id][pf], l), schoolTxt(f.date, l)]),
          align: ['l', 'l', 'l', 'l', 'l'],
        },
        aanname: aanname(o, l),
      };
    },
  };
}

/* ------------------------------------------------------------------ Eén feestdag (fiche) */
function fdSpec(l: Lang, a: Args = {}): ToolSpec {
  const id = String(a.fd ?? 'hemelvaartsdag') as FeestId;
  return {
    inputs: [fJaar(l, Number(a.jaar ?? 2027)), fProfiel(l, String(a.pf ?? 'bedrijf')), { ...fFeest(l, id), adv: true }],
    run: (v) => {
      const y = n(v, 'jaar'), pf = s(v, 'pf') as Profiel, fid = (s(v, 'fd') || id) as FeestId, d = datum(fid, y), def = defOf(fid);
      const o = optiesVoor(pf);
      const st = VRIJ[fid][pf];
      const wd = weekday(fromIso(d));
      const vrij = isVrij(fid, { ...o, goedeVrijdag: fid === 'goede-vrijdag' ? true : o.goedeVrijdag, bevrijdingsdag: fid === 'bevrijdingsdag' ? true : o.bevrijdingsdag });
      const brug = vrij && wd >= 1 && wd <= 5 ? bruggen(y, { ...o, goedeVrijdag: fid === 'goede-vrijdag' || o.goedeVrijdag, bevrijdingsdag: fid === 'bevrijdingsdag' || o.bevrijdingsdag }).filter((b) => b.feestdagen.includes(fid)).sort((p, q) => p.verlof - q.verlof)[0] : undefined;
      const rows: Array<[string, string, number?]> = [
        [T(l, 'Weekdag', 'Weekday'), wdLong(d, l)],
        [T(l, `Vrij als ${PROFIEL_NAAM[pf][l].toLowerCase()}?`, `Off as ${PROFIEL_NAAM[pf][l].toLowerCase()}?`), statusTxt(st, l)],
        [T(l, 'Schoolvakantie die dag', 'School holiday that day'), schoolTxt(d, l)],
      ];
      if (brug) rows.push([T(l, 'Beste brug', 'Best bridge'), T(l, `${num(brug.verlof, l)} verlofdag${brug.verlof === 1 ? '' : 'en'} → ${num(brug.vrij, l)} dagen vrij (${span(brug.vrijVan, brug.vrijTot, l)})`, `${num(brug.verlof, l)} leave day${brug.verlof === 1 ? '' : 's'} → ${num(brug.vrij, l)} days off (${span(brug.vrijVan, brug.vrijTot, l)})`)]);
      else if (wd === 0 || wd === 6) rows.push([T(l, 'Brug', 'Bridge'), T(l, 'Geen: de dag valt in het weekend', 'None: the day falls at the weekend')]);
      return {
        label: `${def.name[l]} ${y}`,
        value: dLong(d, l),
        sub: wd === 0 || wd === 6 ? T(l, `${def.name[l]} valt in ${y} in het weekend: er gaat geen werkdag af en er komt geen vervangende vrije dag.`, `${def.name[l]} falls at the weekend in ${y}: no working day is lost and no substitute day is given.`) : undefined,
        rows,
        table: {
          caption: T(l, `${def.name[l]} van 2026 tot 2030`, `${def.name[l]} from 2026 to 2030`),
          headers: [T(l, 'Jaar', 'Year'), T(l, 'Datum', 'Date'), T(l, 'Weekdag', 'Weekday'), T(l, 'Schoolvakantie', 'School holiday')],
          rows: JAREN.map((yy) => { const dd = datum(fid, yy); return [String(yy), dLong(dd, l), wdLong(dd, l), schoolTxt(dd, l)]; }),
          align: ['l', 'l', 'l', 'l'],
        },
      };
    },
  };
}

/* ------------------------------------------------------------------ Brugdagenplanner */
function btSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJaar(l, Number(a.jaar ?? 2027), [2026, 2027, 2028, 2029, 2030]), { id: 'verlof', label: T(l, 'Verlofdagen die u inzet', 'Leave days to use'), def: Number(a.verlof ?? 5), unit: T(l, 'dagen', 'days'), max: 40 }, fRegio(l, String(a.regio ?? 'midden')), fGV(l, String(a.gv ?? 'nee')), fBD(l, String(a.bd ?? 'nee')), fOud(l)],
    run: (v) => {
      const y = n(v, 'jaar'), o = opts(v), budget = Math.round(n(v, 'verlof')), r = s(v, 'regio') as Regio;
      const p = optimaliseer(y, budget, o), all = bruggen(y, o);
      const f = p.verlof ? p.vrij / p.verlof : 0;
      const sch = (b: { vrijVan: string; vrijTot: string }) => { let c = 0; const set = new Set([...(regioVak(r, y - 1)), ...regioVak(r, y), ...regioVak(r, y + 1)]); for (let d = fromIso(b.vrijVan); d <= fromIso(b.vrijTot); d++) if (set.has(d)) c++; return c; };
      const rij = (b: typeof all[number]) => [span(b.verlofVan, b.verlofTot, l), num(b.verlof, l), span(b.vrijVan, b.vrijTot, l), num(b.vrij, l), b.feestdagen.map((id) => fname(id, l)).join(', '), sch(b) ? T(l, `${num(sch(b), l)} dagen`, `${num(sch(b), l)} days`) : '–'];
      const hd = [T(l, 'Verlof nemen', 'Take leave'), T(l, 'Verlofdagen', 'Leave days'), T(l, 'Vrij op een rij', 'Off in a row'), T(l, 'Vrije dagen', 'Days off'), T(l, 'Dankzij', 'Thanks to'), T(l, `Overlap schoolvakantie ${REGIO_KORT[r][l]}`, `Overlap with school holidays, ${REGIO_KORT[r][l]}`)];
      return {
        label: T(l, `${y}: met ${num(p.verlof, l)} verlofdagen`, `${y}: using ${num(p.verlof, l)} leave days`),
        value: T(l, `${num(p.vrij, l)} dagen vrij`, `${num(p.vrij, l)} days off`),
        sub: p.verlof ? T(l, `Eén verlofdag levert gemiddeld ${formatDecimal(f, 1, l)} vrije dagen op een rij op.`, `One leave day buys on average ${formatDecimal(f, 1, l)} days off in a row.`) : T(l, 'Vul minstens één verlofdag in.', 'Enter at least one leave day.'),
        rows: p.blokken.slice(0, 6).map((b) => [span(b.vrijVan, b.vrijTot, l), verlofNaarVrij(b.verlof, b.vrij, l), b.vrij] as [string, string, number]),
        table: p.blokken.length ? { caption: T(l, `Uw verlofplan ${y}: deze dagen aanvragen`, `Your ${y} leave plan: book these days`), headers: hd, rows: p.blokken.map(rij), align: ['l', 'r', 'l', 'r', 'l', 'l'] } : undefined,
        tables: all.length ? [{ caption: T(l, `Alle bruggen van ${y}, de beste eerst`, `Every bridge in ${y}, best first`), headers: hd, rows: all.map(rij), align: ['l', 'r', 'l', 'r', 'l', 'l'] }] : undefined,
        note: p.rest > 0 ? T(l, `${dagenTxt(p.rest, l)} verlengen geen brug meer en blijven vrij te plannen.`, `${dagenTxt(p.rest, l)} no longer lengthen any bridge and stay free to plan.`) : undefined,
        aanname: aanname(o, l),
      };
    },
  };
}
const regioVak = (r: Regio, y: number): Set<number> => { const out = new Set<number>(); for (const sy of SCHOOLJAREN) { const k = kalender(sy, r)!; for (const vk of VAKS) for (let d = fromIso(k[vk].van); d <= fromIso(k[vk].tot); d++) if (toIso(d).startsWith(String(y))) out.add(d); } return out; };

/* ------------------------------------------------------------------ Werkdagen */
function wdSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJaar(l, Number(a.jaar ?? 2027)), { kind: 'choice', id: 'week', label: T(l, 'Werkdagen per week', 'Days per week'), def: String(a.week ?? '5'), options: [{ value: '5', label: '5' }, { value: '4', label: '4' }, { value: '3', label: '3' }] }, { id: 'uren', label: T(l, 'Uren per werkdag', 'Hours per working day'), def: 8, unit: T(l, 'uur', 'h'), max: 12, decimals: 1, adv: true }, fGV(l), fBD(l), fOud(l)],
    run: (v) => {
      const y = n(v, 'jaar'), o = opts(v), m = werkdagen(y, o), sum = sumA(m), w = Number(s(v, 'week')) || 5, u = n(v, 'uren') || 8;
      const bruto = weekdagen(y), eigen = Math.round((sum * w) / 5), vrijF = opWeekdagCount(y, o);
      return {
        label: T(l, `Werkdagen ${y} in Nederland`, `Working days ${y} in the Netherlands`),
        value: w === 5 ? num(sum, l) : `≈ ${num(eigen, l)}`,
        sub: w === 5 ? T(l, `Maandag tot vrijdag, min ${num(vrijF, l)} vrije feestdagen door de week; ${num(Math.round(sum * u), l)} uur bij ${formatDecimal(u, 1, l)} uur per dag.`, `Monday to Friday, minus ${num(vrijF, l)} weekday holidays; ${num(Math.round(sum * u), l)} hours at ${formatDecimal(u, 1, l)} hours a day.`) : T(l, `Bij ${w} dagen per week, naar rato van ${num(sum, l)} werkdagen; ${num(Math.round(eigen * u), l)} uur.`, `At ${w} days a week, pro rata from ${num(sum, l)} working days; ${num(Math.round(eigen * u), l)} hours.`),
        rows: [
          [T(l, 'Maandagen tot vrijdagen', 'Mondays to Fridays'), num(bruto, l)],
          [T(l, 'Vrije feestdagen door de week', 'Weekday holidays off'), num(vrijF, l)],
          [T(l, 'Eerste halfjaar', 'First half'), num(sumA(m.slice(0, 6)), l)],
          [T(l, 'Tweede halfjaar', 'Second half'), num(sumA(m.slice(6)), l)],
        ],
        table: { caption: T(l, `Werkdagen per maand, ${y}`, `Working days per month, ${y}`), headers: [T(l, 'Maand', 'Month'), T(l, 'Werkdagen', 'Working days'), T(l, 'Vrije feestdag', 'Holiday off')], rows: MAANDEN(l).map((mn, i) => [mn, num(m[i], l), vrijeDagen(y, o).filter((f) => Number(f.date.slice(5, 7)) === i + 1 && !isWeekend(fromIso(f.date))).map((f) => fname(f.id, l)).join(', ') || '–']), align: ['l', 'r', 'l'] },
        aanname: aanname(o, l),
      };
    },
  };
}
const opWeekdagCount = (y: number, o: Opties) => vrijeDagen(y, o).filter((f) => !isWeekend(fromIso(f.date))).length;

/* ------------------------------------------------------------------ Schoolvakanties van een schooljaar */
function svSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fRegio(l, String(a.regio ?? 'midden')), fSj(l, Number(a.sj ?? 2026))],
    run: (v) => {
      const r = s(v, 'regio') as Regio, y = n(v, 'sj'), k = kalender(y, r)!;
      const wk = VAKS.filter((x) => x !== 'zomer').reduce((t, x) => t + weekdagenIn(k[x]), 0);
      const anders = (x: Vak) => REGIOS.filter((q) => q !== r && (kalender(y, q)![x].van !== k[x].van)).map((q) => `${REGIO_KORT[q][l]}: ${span(kalender(y, q)![x].van, kalender(y, q)![x].tot, l)}`).join('; ');
      return {
        label: T(l, `Schoolvakanties ${sj(y)}, ${REGIO_NAAM[r][l]}`, `School holidays ${sj(y)}, ${REGIO_NAAM[r][l]}`),
        value: periode(k.herfst, l),
        sub: T(l, `Herfstvakantie; daarna volgen kerst-, voorjaars-, mei- en zomervakantie. ${num(wk, l)} lesvrije weekdagen buiten de zomer.`, `Autumn half-term; Christmas, spring, May and summer follow. ${num(wk, l)} weekdays without lessons outside summer.`),
        rows: VAKS.slice(1).map((x) => [VAK_NAAM[x][l], x === 'zomer' ? `${dDay(k[x].van, l)} – ${dDay(k[x].tot, l)}` : span(k[x].van, k[x].tot, l)] as [string, string]),
        table: {
          caption: T(l, `Alle vakanties ${sj(y)} in ${REGIO_NAAM[r][l]}, met de andere regio's waar ze afwijken`, `Every break in ${sj(y)} for the ${REGIO_NAAM[r][l]}, with the other regions where they differ`),
          headers: [T(l, 'Vakantie', 'Break'), T(l, 'Van', 'From'), T(l, 'Tot en met', 'To'), T(l, 'Dagen', 'Days'), T(l, 'Status', 'Status'), T(l, 'Andere regio’s', 'Other regions')],
          rows: VAKS.map((x) => [VAK_NAAM[x][l], dWeek(k[x].van, l), dWeek(k[x].tot, l), num(dagen(k[x]), l), ADVIES[x] ? T(l, 'adviesdatum OCW', 'advisory date (OCW)') : T(l, 'zoals gepubliceerd', 'as published'), zelfdeOveral(y, x) ? T(l, 'zelfde overal', 'same everywhere') : anders(x)]),
          align: ['l', 'l', 'l', 'r', 'l', 'l'],
        },
        note: T(l, `Adviesweek meivakantie (scholen mogen uitbreiden): ${periode(k.adviesMei, l)}. Uw school kan van adviesdata afwijken; de schoolgids beslist.`, `Advisory extra May week (schools may extend): ${periode(k.adviesMei, l)}. Your school may deviate from advisory dates; the school guide decides.`),
      };
    },
  };
}

/* ------------------------------------------------------------------ Regio van uw gemeente */
function rgSpec(l: Lang, a: Args = {}): ToolSpec {
  const provOpts: Opt[] = PROVINCIE_NAMEN.map((p) => ({ value: p, label: p }));
  return {
    inputs: [
      { kind: 'select', id: 'prov', label: T(l, 'Provincie', 'Province'), def: String(a.prov ?? 'Zuid-Holland'), options: provOpts },
      { kind: 'select', id: 'gem', label: T(l, 'Gemeente', 'Municipality'), def: '*', options: (v: V) => keuzes(s(v, 'prov')).map((k) => ({ value: k.value, label: k.value === '*' ? T(l, 'Alle gemeenten (behalve hieronder)', 'All municipalities (except those below)') : k.label })) },
      fSj(l, Number(a.sj ?? 2026)),
    ],
    run: (v) => {
      const prov = s(v, 'prov'), gem = s(v, 'gem') || '*', y = n(v, 'sj'), r = regioVan(prov, gem) ?? 'midden', k = kalender(y, r)!;
      const uitz = keuzes(prov).filter((x) => x.value !== '*');
      return {
        label: T(l, `${gem === '*' ? prov : gem}`, `${gem === '*' ? prov : gem}`),
        value: REGIO_NAAM[r][l],
        sub: T(l, `Schoolvakanties ${sj(y)} van deze regio hieronder. ${uitz.length ? `${prov} heeft ${num(uitz.length, l)} gemeente${uitz.length === 1 ? '' : 'n'} of kern${uitz.length === 1 ? '' : 'en'} met een andere regio.` : `Heel ${prov} hoort bij deze regio.`}`, `School holidays ${sj(y)} for this region below. ${uitz.length ? `${prov} has ${num(uitz.length, l)} municipalit${uitz.length === 1 ? 'y' : 'ies'} or village${uitz.length === 1 ? '' : 's'} in another region.` : `All of ${prov} belongs to this region.`}`),
        rows: VAKS.map((x) => [VAK_NAAM[x][l], span(k[x].van, k[x].tot, l)] as [string, string]),
        table: uitz.length ? { caption: T(l, `Uitzonderingen in ${prov} volgens de regio-indeling van de Rijksoverheid`, `Exceptions in ${prov} according to the government's regional list`), headers: [T(l, 'Gemeente of kern', 'Municipality or village'), T(l, 'Regio', 'Region')], rows: uitz.map((x) => [x.label, REGIO_NAAM[x.regio][l]]), align: ['l', 'l'] } : undefined,
      };
    },
  };
}

/* ------------------------------------------------------------------ Ben ik vrij? */
function bvSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fProfiel(l, String(a.pf ?? 'bedrijf')), fFeest(l, String(a.fd ?? 'goede-vrijdag') as FeestId), fJaar(l, Number(a.jaar ?? 2027))],
    run: (v) => {
      const pf = s(v, 'pf') as Profiel, fid = s(v, 'fd') as FeestId, y = n(v, 'jaar'), d = datum(fid, y), st = VRIJ[fid][pf];
      const alle = officieel(y);
      return {
        label: T(l, `${defOf(fid).name[l]} ${y}, ${PROFIEL_NAAM[pf][l].toLowerCase()}`, `${defOf(fid).name[l]} ${y}, ${PROFIEL_NAAM[pf][l].toLowerCase()}`),
        value: statusTxt(st, l),
        sub: `${dWeek(d, l)}. ${uitleg(st, pf, l)}`,
        rows: PROFIELEN.map((p) => [PROFIEL_NAAM[p][l], statusTxt(VRIJ[fid][p], l)] as [string, string]),
        table: {
          caption: T(l, `Alle feestdagen ${y} voor ${PROFIEL_NAAM[pf][l].toLowerCase()}, volgens de vraag-en-antwoordpagina's van de Rijksoverheid`, `Every ${y} holiday for ${PROFIEL_NAAM[pf][l].toLowerCase()}, according to the government's question-and-answer pages`),
          headers: [T(l, 'Feestdag', 'Holiday'), T(l, 'Datum', 'Date'), T(l, 'Vrij?', 'Day off?')],
          rows: alle.map((f) => [f.name[l], dShort(f.date, l), statusTxt(VRIJ[f.id][pf], l)]),
          align: ['l', 'l', 'l'],
        },
        aanname: T(l, `Voorbeeld voor: ${PROFIEL_NAAM[pf][l].toLowerCase()}, ${defOf(fid).name[l]} ${y}`, `Example for: ${PROFIEL_NAAM[pf][l].toLowerCase()}, ${defOf(fid).name[l]} ${y}`),
        note: T(l, 'Er is geen wet die een feestdag tot vrije dag maakt. Uw cao of arbeidsovereenkomst beslist; de Rijksoverheid beschrijft alleen wat gangbaar is.', 'No law turns a public holiday into a day off. Your collective agreement or contract decides; the government only describes what is usual.'),
      };
    },
  };
}
function uitleg(st: Status, pf: Profiel, l: Lang): string {
  const amb = pf === 'ambtenaar';
  switch (st) {
    case 'ja': return T(l, 'De Rijksoverheid: « Bent u ambtenaar? Dan bent u vrij », met mogelijke uitzonderingen voor politie, defensie en academische ziekenhuizen.', 'The government: civil servants have the day off, with possible exceptions for police, defence and university hospitals.');
    case 'meestal': return T(l, pf === 'school' ? 'Scholen zijn dan bijna altijd gesloten; het jaarrooster van de school beslist.' : 'Bij de meeste bedrijven een vrije dag; kijk in uw cao of contract.', pf === 'school' ? 'Schools are almost always closed; the school calendar decides.' : 'A day off at most companies; check your collective agreement or contract.');
    case 'werken': return T(l, amb ? 'Ook als ambtenaar moet u volgens de Rijksoverheid waarschijnlijk gewoon werken, tenzij uw cao anders zegt.' : 'Volgens de Rijksoverheid moet u waarschijnlijk gewoon werken; alleen uw cao of contract kan er een vrije dag van maken.', 'According to the government you probably have to work; only your agreement or contract can make it a day off.');
    case 'vraag-na': return T(l, 'Officiële feestdag, maar niet iedereen is vrij: vraag het na bij uw werkgever of kijk in uw cao.', 'An official holiday, but not everyone is off: ask your employer or check your agreement.');
    case 'zondag': return T(l, 'Deze dag valt altijd op zondag; de vrije dag is de maandag erna.', 'This day is always a Sunday; the day off is the Monday after.');
    case 'vakantie': return T(l, 'Valt elk jaar in de kerstvakantie van alle drie de regio’s.', 'Falls in the Christmas break of all three regions every year.');
    default: return T(l, 'Deze site rekent de dag als vrij. De Rijksoverheid geeft er geen aparte uitleg over; of u echt vrij bent, staat in uw cao of contract.', 'This site counts the day as a day off. The government gives no separate guidance on it; whether you are actually off is in your agreement or contract.');
  }
}

/* ------------------------------------------------------------------ Termijnen (Algemene termijnenwet) */
function tmSpec(l: Lang, a: Args = {}): ToolSpec {
  const mnd = MAANDEN(l);
  return {
    inputs: [
      { id: 'dag', label: T(l, 'Dag waarop de termijn eindigt', 'Day the deadline ends'), def: Number(a.dag ?? 6), min: 1, max: 31 },
      { kind: 'select', id: 'maand', label: T(l, 'Maand', 'Month'), def: String(a.maand ?? 5), options: mnd.map((m, i) => ({ value: String(i + 1), label: m })) },
      fJaar(l, Number(a.jaar ?? 2027)),
      { id: 'lengte', label: T(l, 'Lengte van de termijn (dagen, voor art. 2)', 'Length of the deadline (days, for section 2)'), def: 0, max: 365, adv: true, help: T(l, '0 = niet toepassen. Vanaf 3 dagen moeten er twee tellende dagen in vallen.', '0 = do not apply. From 3 days, two counting days must fall inside it.') },
    ],
    run: (v) => {
      const y = n(v, 'jaar'), m = n(v, 'maand') || 1, dmax = dayNum(y, m + 1, 1) - dayNum(y, m, 1), d = Math.min(Math.max(1, Math.round(n(v, 'dag') || 1)), dmax);
      const einde = toIso(dayNum(y, m, d)), L = Math.round(n(v, 'lengte'));
      const r = verleng(einde, L >= 3 ? toIso(dayNum(y, m, d) - L) : undefined, L >= 3 ? L : undefined);
      const reden = (x: string) => (x === 'zaterdag' ? T(l, 'zaterdag', 'Saturday') : x === 'zondag' ? T(l, 'zondag', 'Sunday') : fname(x, l));
      return {
        label: T(l, `Termijn die eindigt op ${dWeek(einde, l)}`, `Deadline ending on ${dWeek(einde, l)}`),
        value: r.dagen ? dWeek(r.verlengd, l) : T(l, 'Geen verlenging', 'No extension'),
        sub: r.dagen ? T(l, `Verlengd met ${dagenTxt(r.dagen, l)} tot en met de eerstvolgende dag die geen zaterdag, zondag of algemeen erkende feestdag is (art. 1).`, `Extended by ${dagenTxt(r.dagen, l)} up to and including the first day that is not a Saturday, Sunday or generally recognised holiday (section 1).`) : T(l, 'De einddag is een gewone werkdag: de termijn verandert niet.', 'The last day is an ordinary working day: the deadline does not move.'),
        rows: [...r.redenen.map((x) => [dShort(x.date, l), reden(x.reden)] as [string, string]), ...(r.art2 ? [[T(l, 'Art. 2 toegepast', 'Section 2 applied'), T(l, 'minstens 2 tellende dagen', 'at least 2 counting days')] as [string, string]] : [])],
        table: {
          caption: T(l, `Algemeen erkende feestdagen ${y} volgens artikel 3 (Goede Vrijdag gelijkgesteld)`, `Generally recognised holidays ${y} under section 3 (Good Friday treated alike)`),
          headers: [T(l, 'Dag', 'Day'), T(l, 'Datum', 'Date'), T(l, 'Termijn die hier eindigt loopt tot', 'A deadline ending here runs until')],
          rows: ['nieuwjaarsdag', 'goede-vrijdag', 'tweede-paasdag', 'koningsdag', 'bevrijdingsdag', 'hemelvaartsdag', 'tweede-pinksterdag', 'eerste-kerstdag', 'tweede-kerstdag'].map((id) => { const dd = datum(id as FeestId, y); return [fname(id, l), dShort(dd, l), dShort(verleng(dd).verlengd, l)]; }),
          align: ['l', 'l', 'l'],
        },
        note: T(l, 'Geldt voor termijnen die in een wet staan (bezwaar, beroep, wettelijke betaaltermijnen); een afspraak in een contract alleen als het contract naar de wet verwijst. Niet voor termijnen die terugrekenen vanaf een gebeurtenis.', 'Applies to deadlines set by statute (objections, appeals, statutory payment terms); to a contractual term only if the contract refers to the Act. Not to periods counted backwards from an event.'),
      };
    },
  };
}

/* ------------------------------------------------------------------ Pasen */
function osSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJaar(l, Number(a.jaar ?? 2027), Array.from({ length: 31 }, (_, i) => 2020 + i))],
    run: (v) => {
      const y = n(v, 'jaar'), os = paaszondag(y), g = gaussStappen(y);
      return {
        label: T(l, `Pasen ${y}`, `Easter ${y}`),
        value: dLong(os, l),
        sub: T(l, `Eerste Paasdag; Tweede Paasdag is ${dWeek(off(os, 1), l)}.`, `Easter Sunday; Easter Monday is ${dWeek(off(os, 1), l)}.`),
        rows: [
          [T(l, 'Goede Vrijdag', 'Good Friday'), dShort(off(os, -2), l)],
          [T(l, 'Tweede Paasdag', 'Easter Monday'), dShort(off(os, 1), l)],
          [T(l, 'Hemelvaartsdag (+39)', 'Ascension Day (+39)'), dShort(off(os, 39), l)],
          [T(l, 'Pinksteren (+49/+50)', 'Whitsun (+49/+50)'), `${dShort(off(os, 49), l)} – ${dShort(off(os, 50), l)}`],
        ],
        table: {
          caption: T(l, `Paasformule van Gauss voor ${y}, stap voor stap`, `Gauss's Easter formula for ${y}, step by step`),
          headers: [T(l, 'Grootheid', 'Quantity'), T(l, 'Betekenis', 'Meaning'), T(l, 'Waarde', 'Value')],
          rows: [['K', T(l, 'eeuwgetal', 'century number'), String(g.K)], ['M', T(l, 'maancorrectie', 'lunar correction'), String(g.M)], ['S', T(l, 'zonnecorrectie', 'solar correction'), String(g.S)], ['A', T(l, 'maanparameter', 'lunar parameter'), String(g.A)], ['D', T(l, 'kiem van de eerste lentevollemaan', 'seed of the first spring full moon'), String(g.D)], ['R', T(l, 'kalendercorrectie', 'calendar correction'), String(g.R)], ['OG', T(l, 'paasgrens (dag van maart)', 'paschal full moon (day of March)'), String(g.OG)], ['SZ', T(l, 'eerste zondag van maart', 'first Sunday in March'), String(g.SZ)], ['OE', T(l, 'afstand tot paaszondag', 'days to Easter Sunday'), String(g.OE)], ['OS', T(l, 'paaszondag als dag van maart (32 = 1 april)', 'Easter Sunday as a day of March (32 = 1 April)'), String(g.OS)]],
          align: ['l', 'l', 'r'],
        },
      };
    },
  };
}

export const SPECS: Record<string, (l: Lang, arg?: Args) => ToolSpec> = { ft: ftSpec, fd: fdSpec, bt: btSpec, wd: wdSpec, sv: svSpec, rg: rgSpec, bv: bvSpec, tm: tmSpec, os: osSpec };
export const TOOL_KINDS = [...Object.keys(SPECS), 'kalender', 'aftellen'];
export function getTool(kind: string, l: Lang, arg?: Args): ToolSpec {
  const f = SPECS[kind]; if (!f) throw new Error(`simulateur inconnu : ${kind}`);
  return f(l, arg);
}
/** Lance un simulateur avec ses valeurs par défaut (ou celles données) : sert aux pages et aux tests. */
export function runTool(kind: string, l: Lang, arg?: Args, values?: V): ToolOut {
  const spec = getTool(kind, l, arg);
  const v = Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])) as V;
  return spec.run(resolve(spec.inputs, { ...v, ...(values ?? {}) }));
}
export { formatNumber, isoWeek, weeksInYear, volgende, volgendeVakantie, werkdagenTussen };
