/**
 * Algemene termijnenwet (wet van 25 juli 1964, wetten.overheid.nl BWBR0002448, geldend sinds 10-10-2010).
 *
 * - Art. 1 lid 1: een in een wet gestelde termijn die op een zaterdag, zondag of algemeen erkende feestdag eindigt,
 *   wordt verlengd tot en met de eerstvolgende dag die geen zaterdag, zondag of algemeen erkende feestdag is.
 * - Art. 1 lid 2: dat geldt niet voor termijnen die terugrekenen vanaf een tijdstip of gebeurtenis.
 * - Art. 2: een termijn van ten minste drie dagen wordt zo nodig verlengd tot er minstens twee dagen in vallen die
 *   geen zaterdag, zondag of algemeen erkende feestdag zijn.
 * - Art. 3: algemeen erkende feestdagen zijn Nieuwjaarsdag, de christelijke Tweede Paas- en Pinksterdag, beide
 *   Kerstdagen, Hemelvaartsdag, de dag waarop de verjaardag van de Koning wordt gevierd en de vijfde mei; Goede
 *   Vrijdag wordt daarmee gelijkgesteld (lid 2). De Kroon kan andere dagen gelijkstellen (lid 3): die kennen we niet.
 * De wet geldt voor termijnen die in een wet staan; voor een contractuele betaaltermijn geldt ze alleen als het
 * contract ernaar verwijst. De Rijksoverheid zegt hetzelfde over betalings- en reactietermijnen op feestdagen.
 */
import { datum, type FeestId } from './feestdagen';
import { fromIso, toIso, isWeekend } from './dagen';

export const TERMIJN_FEESTDAGEN: FeestId[] = ['nieuwjaarsdag', 'goede-vrijdag', 'tweede-paasdag', 'koningsdag', 'bevrijdingsdag', 'hemelvaartsdag', 'tweede-pinksterdag', 'eerste-kerstdag', 'tweede-kerstdag'];

/** Algemeen erkende feestdagen (art. 3, Goede Vrijdag gelijkgesteld) van een jaar, als dagnummers. */
export function algemeenErkend(y: number): Map<number, FeestId> {
  const m = new Map<number, FeestId>();
  for (const id of TERMIJN_FEESTDAGEN) m.set(fromIso(datum(id, y)), id);
  return m;
}
const erkend = (n: number, cache: Map<number, Map<number, FeestId>>) => {
  const y = new Date(n * 86400000).getUTCFullYear();
  if (!cache.has(y)) cache.set(y, algemeenErkend(y));
  return cache.get(y)!.get(n);
};
export const telt = (n: number, cache = new Map<number, Map<number, FeestId>>()) => !isWeekend(n) && !erkend(n, cache);

export interface Verlenging { einde: string; verlengd: string; dagen: number; redenen: Array<{ date: string; reden: 'zaterdag' | 'zondag' | FeestId }>; art2: boolean }
/**
 * Art. 1: schuift het einde van een termijn door naar de eerste dag die telt. `start` en `lengte` (dagen) zijn
 * optioneel: met beide past de rekenaar ook art. 2 toe (termijn van drie dagen of meer met minstens twee tellende dagen).
 */
export function verleng(eindeIso: string, start?: string, lengte?: number): Verlenging {
  const cache = new Map<number, Map<number, FeestId>>();
  let e = fromIso(eindeIso), art2 = false;
  if (start && lengte !== undefined && lengte >= 3) {
    const s = fromIso(start);
    let tellend = 0; for (let d = s + 1; d <= e; d++) if (telt(d, cache)) tellend++;
    while (tellend < 2) { e++; art2 = true; if (telt(e, cache)) tellend++; }
  }
  const redenen: Verlenging['redenen'] = [];
  while (!telt(e, cache)) {
    const f = erkend(e, cache);
    redenen.push({ date: toIso(e), reden: f ?? (isWeekend(e) && new Date(e * 86400000).getUTCDay() === 6 ? 'zaterdag' : 'zondag') });
    e++;
  }
  return { einde: eindeIso, verlengd: toIso(e), dagen: e - fromIso(eindeIso), redenen, art2 };
}
