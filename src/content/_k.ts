/** Schrijfhulp voor de inhoud: elke datum en elk getal in een tekst komt uit de motor, nooit met de hand getypt. */
import { KIT as K } from '../lib/kit';
import { dLong, dWeek, wdLong, dShort, span, periode } from '../lib/tool-specs';
import { formatNumber, type Lang } from '../lib/format';
import type { FeestId } from '../lib/engine/feestdagen';
export { K };
/** « 6 mei 2027 » */
export const D = (iso: string, l: Lang) => dLong(iso, l);
/** « donderdag 6 mei 2027 » */
export const DW = (iso: string, l: Lang) => dWeek(iso, l);
/** « donderdag » */
export const WD = (iso: string, l: Lang) => wdLong(iso, l);
export const DS = (iso: string, l: Lang) => dShort(iso, l);
export const SPAN = (a: string, b: string, l: Lang) => span(a, b, l);
export const PER = (p: { van: string; tot: string }, l: Lang) => periode(p, l);
export const N = (x: number, l: Lang) => formatNumber(x, 0, l);
/** Datum van een feestdag. */
export const F = (id: FeestId, y: number) => K.datum(id, y);
/** Vrije feestdagen op een weekdag (standaard: zonder Goede Vrijdag en 5 mei). */
export const opWeek = (y: number) => K.officieel(y).filter((f) => f.vrij && !K.isWeekend(K.fromIso(f.date)));
/** Feestdagen die geen zondag zijn maar in het weekend vallen. */
export const inWeekend = (y: number) => K.officieel(y).filter((f) => !f.zondag && K.isWeekend(K.fromIso(f.date)));
export const WERK = (y: number) => K.werkdagen(y).reduce((a, b) => a + b, 0);
export const BD = (y: number) => K.brugdagen(y);
export const OPT = (y: number, n: number) => K.optimaliseer(y, n);
export const SV = (y: number, r: 'noord' | 'midden' | 'zuid') => K.kalender(y, r)!;
/** Aaneengesloten vrije dagen (weekend en vrije feestdagen volgens de opties) rond een datum, die zelf meetelt. */
export function vrijRond(iso: string, o: Parameters<typeof K.vrijeDagen>[1] = {}): number {
  const y = Number(iso.slice(0, 4)), n = K.fromIso(iso);
  const hol = new Set<number>(); for (const yy of [y - 1, y, y + 1]) for (const f of K.vrijeDagen(yy, o)) hol.add(K.fromIso(f.date));
  const vrij = (d: number) => d === n || hol.has(d) || K.isWeekend(d);
  let a = n, b = n; while (vrij(a - 1)) a--; while (vrij(b + 1)) b++;
  return b - a + 1;
}
/**
 * Zin over 5 mei ten opzichte van Koningsdag, voor elk jaar uit de datums berekend (testeurs naïfs 2026-11-14 :
 * de pagina's 2028 schreven « 5 mei de dag erna » en « die vrijdag is ook 5 mei », terwijl de vrijdag na Koningsdag
 * 28 april is). Bevrijdingsdag valt altijd acht of negen dagen na Koningsdag, nooit de dag erna; tests/datums.test.ts.
 */
export function vijfMei(y: number, l: Lang): string {
  const kd = F('koningsdag', y), bv = F('bevrijdingsdag', y), gap = K.fromIso(bv) - K.fromIso(kd), wd = K.weekday(K.fromIso(bv));
  const nl = `Bevrijdingsdag valt ${N(gap, 'nl')} dagen na Koningsdag, op ${DW(bv, 'nl')}`;
  const en = `Liberation Day falls ${N(gap, 'en')} days after King's Day, on ${DW(bv, 'en')}`;
  if (wd === 0 || wd === 6) return l === 'nl' ? `${nl}, in het weekend.` : `${en}, at the weekend.`;
  if (wd === 1 || wd === 5) { const n = vrijRond(bv, { bevrijdingsdag: true }); return l === 'nl' ? `${nl}: wie op 5 mei vrij is, heeft zonder verlof een lang weekend van ${N(n, 'nl')} dagen.` : `${en}: if 5 May is off for you, that is a ${N(n, 'en')}-day weekend without leave.`; }
  return l === 'nl' ? `${nl}.` : `${en}.`;
}
/**
 * « De beste brug » : partout le premier de K.bruggen(), classé sur vrije dagen per verlofdag (testeurs naïfs
 * 2026-11-14, tour 2 : la page 2028 appelait « beste » la kerstbrug, 3e de la liste « de beste eerst »).
 * `langsteBrug` : la plus longue période libre, qu'on nomme « langste », jamais « beste ». tests/datums.test.ts.
 */
export const besteBrug = (y: number) => K.bruggen(y)[0];
/** Bruggen die even goed zijn als de beste (zelfde vrije dagen per verlofdag), in volgorde van de lijst. */
export const besteBruggen = (y: number) => { const a = K.bruggen(y), r = a[0].vrij / a[0].verlof; return a.filter((b) => b.vrij / b.verlof === r); };
export const langsteBrug = (y: number) => [...K.bruggen(y)].sort((a, b) => b.vrij - a.vrij || a.verlof - b.verlof || a.verlofVan.localeCompare(b.verlofVan))[0];
export { RANG } from '../lib/tool-specs';
