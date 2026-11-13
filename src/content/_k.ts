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
