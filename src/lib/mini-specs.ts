/**
 * Mini-simulateurs des pages (MASTERFACTORY §9.3), lus par components/calc/MiniSim.tsx (trame). Même moteur que
 * les grands outils ; les valeurs sont numériques (index des années, régions, profils) comme MiniSim l'exige.
 *   brug   : verlofdagen + jaar → vrije dagen op een rij
 *   werk   : jaar + dagen per week → werkdagen
 *   school : regio + schooljaar + vakantie → data
 *   vrij   : profiel + feestdag → wat de Rijksoverheid zegt
 *   termijn: feestdag + jaar → verlengde termijn
 */
import type { MiniSpec, MiniInput } from './mini-types';
import type { Lang } from './format';
import { formatNumber, formatDecimal } from './format';
import { optimaliseer, brugdagen, werkdagen } from './engine/bruggen';
import { kalender, SCHOOLJAREN, REGIOS, REGIO_NAAM, VAKS, VAK_NAAM, dagen, sj, type Regio, type Vak } from './engine/school';
import { FEESTDAGEN, PROFIELEN, PROFIEL_NAAM, VRIJ, STATUS_TEKST, datum, type Profiel } from './engine/feestdagen';
import { verleng } from './engine/termijnen';
import { JAREN, span, dWeek, dShort, periode, T, dagenTxt } from './tool-specs';

const L = (l: string): Lang => (l === 'nl' ? 'nl' : 'en');
const jaarIn = (l: Lang, def = 2027): MiniInput => ({ id: 'jaar', label: T(l, 'Jaar', 'Year'), def, options: JAREN.map((y) => ({ value: String(y), label: String(y) })) });

export function getSpec(kind: string, lang = 'nl'): MiniSpec {
  const l = L(lang);
  switch (kind) {
    case 'brug': return {
      title: T(l, 'Hoeveel vrije dagen koopt uw verlof?', 'How many days off does your leave buy?'),
      cta: T(l, 'Naar de brugdagenplanner', 'Open the bridge-day planner'),
      exemple: (v) => T(l, `Voorbeeld met ${formatNumber(v.verlof, 0, l)} verlofdagen in ${v.jaar}`, `Example with ${formatNumber(v.verlof, 0, l)} leave days in ${v.jaar}`),
      inputs: [{ id: 'verlof', label: T(l, 'Verlofdagen', 'Leave days'), def: 5, unit: T(l, 'dagen', 'days'), max: 40 }, jaarIn(l)],
      run: (v) => {
        const p = optimaliseer(v.jaar, Math.round(v.verlof)), bd = brugdagen(v.jaar);
        return { head: [T(l, `${v.jaar}: vrij op een rij`, `${v.jaar}: days off in a row`), dagenTxt(p.vrij, l)], rows: [[T(l, 'Verlofdagen gebruikt', 'Leave days used'), formatNumber(p.verlof, 0, l)], [T(l, 'Rendement per verlofdag', 'Return per leave day'), p.verlof ? formatDecimal(p.vrij / p.verlof, 1, l) : '–'], [T(l, 'Echte brugdagen dit jaar', 'True bridge days this year'), formatNumber(bd.length, 0, l)], ...(p.blokken[0] ? [[T(l, 'Beste blok', 'Best block'), span(p.blokken[0].vrijVan, p.blokken[0].vrijTot, l)] as [string, string]] : [])], note: T(l, 'Zonder Goede Vrijdag en 5 mei als vrije dag; zet ze aan in de planner als uw cao ze geeft.', 'Without Good Friday and 5 May as days off; switch them on in the planner if your agreement grants them.') };
      },
    };
    case 'werk': return {
      title: T(l, 'Werkdagen in uw jaar', 'Working days in your year'),
      cta: T(l, 'Werkdagen per maand bekijken', 'See working days per month'),
      exemple: (v) => T(l, `Voorbeeld voor ${v.jaar} bij ${v.week} dagen per week`, `Example for ${v.jaar} at ${v.week} days a week`),
      inputs: [jaarIn(l), { id: 'week', label: T(l, 'Werkdagen per week', 'Working days per week'), def: 5, options: [{ value: '5', label: '5' }, { value: '4', label: '4' }, { value: '3', label: '3' }] }],
      run: (v) => {
        const m = werkdagen(v.jaar), sum = m.reduce((a, b) => a + b, 0), eigen = Math.round((sum * v.week) / 5);
        const min = Math.min(...m), max = Math.max(...m);
        return { head: [T(l, `Werkdagen ${v.jaar}`, `Working days ${v.jaar}`), formatNumber(eigen, 0, l)], rows: [[T(l, 'Bij 5 dagen per week', 'At 5 days a week'), formatNumber(sum, 0, l)], [T(l, 'Kortste maand', 'Shortest month'), formatNumber(min, 0, l)], [T(l, 'Langste maand', 'Longest month'), formatNumber(max, 0, l)]] };
      },
    };
    case 'school': return {
      title: T(l, 'Wanneer is de vakantie in uw regio?', 'When is the break in your region?'),
      cta: T(l, 'Alle schoolvakanties per regio', 'All school holidays by region'),
      exemple: (v) => T(l, `Voorbeeld voor ${REGIO_NAAM[REGIOS[v.regio]][l]}, schooljaar ${sj(SCHOOLJAREN[v.sj])}`, `Example for the ${REGIO_NAAM[REGIOS[v.regio]][l]}, school year ${sj(SCHOOLJAREN[v.sj])}`),
      inputs: [
        { id: 'regio', label: T(l, 'Regio', 'Region'), def: 1, options: REGIOS.map((r, i) => ({ value: String(i), label: REGIO_NAAM[r][l] })) },
        { id: 'sj', label: T(l, 'Schooljaar', 'School year'), def: 0, options: SCHOOLJAREN.map((y, i) => ({ value: String(i), label: sj(y) })) },
        { id: 'vak', label: T(l, 'Vakantie', 'Break'), def: 3, options: VAKS.map((x, i) => ({ value: String(i), label: VAK_NAAM[x][l] })), avance: true },
      ],
      run: (v) => {
        const r = REGIOS[v.regio] as Regio, y = SCHOOLJAREN[v.sj], x = VAKS[v.vak] as Vak, k = kalender(y, r)!, p = k[x];
        return { head: [`${VAK_NAAM[x][l]} ${sj(y)}, ${REGIO_NAAM[r][l]}`, periode(p, l)], rows: [[T(l, 'Eerste dag', 'First day'), dWeek(p.van, l)], [T(l, 'Laatste dag', 'Last day'), dWeek(p.tot, l)], [T(l, 'Dagen', 'Days'), formatNumber(dagen(p), 0, l)], ...REGIOS.filter((q) => q !== r).map((q) => [REGIO_NAAM[q][l], span(kalender(y, q)![x].van, kalender(y, q)![x].tot, l)] as [string, string])] };
      },
    };
    case 'vrij': return {
      title: T(l, 'Ben ik vrij op deze feestdag?', 'Am I off on this holiday?'),
      cta: T(l, 'Alle feestdagen per situatie', 'Every holiday by situation'),
      exemple: (v) => T(l, `Voorbeeld voor: ${PROFIEL_NAAM[PROFIELEN[v.pf]][l].toLowerCase()}`, `Example for: ${PROFIEL_NAAM[PROFIELEN[v.pf]][l].toLowerCase()}`),
      inputs: [
        { id: 'pf', label: T(l, 'Uw situatie', 'Your situation'), def: 0, options: PROFIELEN.map((p, i) => ({ value: String(i), label: PROFIEL_NAAM[p][l] })) },
        { id: 'fd', label: T(l, 'Feestdag', 'Holiday'), def: 1, options: FEESTDAGEN.map((f, i) => ({ value: String(i), label: f.name[l] })) },
        jaarIn(l),
      ],
      run: (v) => {
        const pf = PROFIELEN[v.pf] as Profiel, f = FEESTDAGEN[v.fd], d = datum(f.id, v.jaar), st = VRIJ[f.id][pf];
        return { head: [`${f.name[l]} ${v.jaar}`, STATUS_TEKST[st][l]], rows: [[T(l, 'Datum', 'Date'), dWeek(d, l)], ...PROFIELEN.filter((p) => p !== pf).map((p) => [PROFIEL_NAAM[p][l], STATUS_TEKST[VRIJ[f.id][p]][l]] as [string, string])], note: T(l, 'Volgens de vraag-en-antwoordpagina’s van de Rijksoverheid; uw cao beslist.', 'According to the government’s question-and-answer pages; your agreement decides.') };
      },
    };
    case 'termijn': return {
      title: T(l, 'Termijn die op een feestdag eindigt', 'Deadline that ends on a holiday'),
      cta: T(l, 'Termijnrekenaar met elke datum', 'Deadline calculator for any date'),
      exemple: (v) => T(l, `Voorbeeld: termijn die eindigt op ${FEESTDAGEN[v.fd].name[l]} ${v.jaar}`, `Example: deadline ending on ${FEESTDAGEN[v.fd].name[l]} ${v.jaar}`),
      inputs: [{ id: 'fd', label: T(l, 'Feestdag', 'Holiday'), def: 6, options: FEESTDAGEN.map((f, i) => ({ value: String(i), label: f.name[l] })) }, jaarIn(l)],
      run: (v) => {
        const f = FEESTDAGEN[v.fd], d = datum(f.id, v.jaar), r = verleng(d);
        return { head: [T(l, 'Loopt tot en met', 'Runs up to and including'), dShort(r.verlengd, l)], rows: [[T(l, 'Oorspronkelijk einde', 'Original end'), dWeek(d, l)], [T(l, 'Verlenging', 'Extension'), dagenTxt(r.dagen, l)]], note: T(l, 'Algemene termijnenwet, art. 1 en 3. Eerste Paasdag en Eerste Pinksterdag zijn zondagen.', 'General Time Limits Act, sections 1 and 3. Easter Sunday and Whit Sunday are Sundays.') };
      },
    };
    default: throw new Error(`mini-simulateur inconnu : ${kind}`);
  }
}
