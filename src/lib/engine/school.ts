/**
 * Schoolvakanties in Nederland per regio (Noord, Midden, Zuid), overgenomen uit de overzichten van de
 * Rijksoverheid per schooljaar (src/data/params-2026.json, met bron en leesdatum), nooit berekend of geraden.
 *
 * - Kerst-, mei- en zomervakantie zijn wettelijk vastgelegd; voor de herfst- en voorjaarsvakantie geeft het
 *   ministerie van OCW adviesdata, waar een school van mag afwijken (dat staat in de schoolgids).
 * - Scholen kunnen de meivakantie met een adviesweek uitbreiden (`adviesMei`).
 * - De regio van een school volgt uit de gemeente (regio-indeling van de Rijksoverheid): de meeste provincies
 *   horen in hun geheel bij één regio; Gelderland is per gemeente verdeeld, en Flevoland, Utrecht en
 *   Noord-Brabant hebben uitzonderingen.
 */
import P from '../../data/params-2026.json';
import { fromIso, toIso, isWeekend } from './dagen';
import type { Tri } from './feestdagen';

export type Regio = 'noord' | 'midden' | 'zuid';
export const REGIOS: Regio[] = ['noord', 'midden', 'zuid'];
export const REGIO_NAAM: Record<Regio, Tri> = { noord: { nl: 'Regio Noord', en: 'North region' }, midden: { nl: 'Regio Midden', en: 'Central region' }, zuid: { nl: 'Regio Zuid', en: 'South region' } };
export const REGIO_KORT: Record<Regio, Tri> = { noord: { nl: 'Noord', en: 'North' }, midden: { nl: 'Midden', en: 'Central' }, zuid: { nl: 'Zuid', en: 'South' } };
export type Vak = 'herfst' | 'kerst' | 'voorjaar' | 'mei' | 'zomer';
export const VAKS: Vak[] = ['herfst', 'kerst', 'voorjaar', 'mei', 'zomer'];
export const VAK_NAAM: Record<Vak, Tri> = {
  herfst: { nl: 'Herfstvakantie', en: 'Autumn half-term' }, kerst: { nl: 'Kerstvakantie', en: 'Christmas holidays' },
  voorjaar: { nl: 'Voorjaarsvakantie', en: 'Spring half-term' }, mei: { nl: 'Meivakantie', en: 'May holidays' }, zomer: { nl: 'Zomervakantie', en: 'Summer holidays' },
};
/** Herfst en voorjaar zijn adviesdata van OCW; kerst, mei en zomer zijn vastgesteld. */
export const ADVIES: Record<Vak, boolean> = { herfst: true, kerst: false, voorjaar: true, mei: false, zomer: false };

export interface Periode { van: string; tot: string }
type RawJaar = { bron: string; adviesMei: [string, string] } & Record<Vak, Record<Regio, [string, string]>>;
const RAW = (P as unknown as { schoolvakanties: Record<string, RawJaar> }).schoolvakanties;
/** Schooljaren (startjaar) die de Rijksoverheid heeft gepubliceerd en die hier zijn overgenomen. */
export const SCHOOLJAREN = Object.keys(RAW).map(Number).sort();
export const sj = (y: number) => `${y}-${y + 1}`;
export type Kalender = Record<Vak, Periode> & { adviesMei: Periode; bron: string };
export function kalender(startjaar: number, regio: Regio): Kalender | null {
  const r = RAW[String(startjaar)]; if (!r) return null;
  const p = (v: Vak): Periode => ({ van: r[v][regio][0], tot: r[v][regio][1] });
  return { herfst: p('herfst'), kerst: p('kerst'), voorjaar: p('voorjaar'), mei: p('mei'), zomer: p('zomer'), adviesMei: { van: r.adviesMei[0], tot: r.adviesMei[1] }, bron: r.bron };
}
export const dagen = (p: Periode) => fromIso(p.tot) - fromIso(p.van) + 1;
export const weekdagenIn = (p: Periode) => { let c = 0; for (let d = fromIso(p.van); d <= fromIso(p.tot); d++) if (!isWeekend(d)) c++; return c; };
/** Alle vakantiedagen van een schooljaar (dagnummers), adviesweek mei niet meegeteld. */
export function vakantieSet(regio: Regio, startjaar: number): Set<number> {
  const k = kalender(startjaar, regio), s = new Set<number>(); if (!k) return s;
  for (const v of VAKS) for (let d = fromIso(k[v].van); d <= fromIso(k[v].tot); d++) s.add(d);
  return s;
}
/** Vakantiedagen van een regio in een kalenderjaar. */
export function vakantieInJaar(regio: Regio, y: number): Set<number> {
  const s = new Set<number>();
  for (const sy of [y - 1, y]) for (const d of vakantieSet(regio, sy)) if (toIso(d).startsWith(String(y))) s.add(d);
  return s;
}
export interface Volgende { vak: Vak; startjaar: number; p: Periode; bezig: boolean }
/** De lopende of volgende vakanties van een regio vanaf een dag. */
export function volgendeVakantie(regio: Regio, iso: string, n = 5): Volgende[] {
  const out: Volgende[] = [];
  for (const y of SCHOOLJAREN) { const k = kalender(y, regio)!; for (const v of VAKS) out.push({ vak: v, startjaar: y, p: k[v], bezig: false }); }
  out.sort((a, b) => a.p.van.localeCompare(b.p.van));
  return out.filter((x) => x.p.tot >= iso).map((x) => ({ ...x, bezig: x.p.van <= iso })).slice(0, n);
}
/** Regio's waarin dag n schoolvakantie is. */
export function regiosMetVakantie(n: number): Regio[] {
  const y = Number(toIso(n).slice(0, 4));
  return REGIOS.filter((r) => vakantieInJaar(r, y).has(n));
}
/** Vallen alle regio's samen voor deze vakantie? */
export function zelfdeOveral(startjaar: number, v: Vak): boolean {
  const ks = REGIOS.map((r) => kalender(startjaar, r)!);
  return ks.every((k) => k[v].van === ks[0][v].van && k[v].tot === ks[0][v].tot);
}

/* ------------------------------------------------------------------ Regio van een gemeente */
type ProvDef = { regio: Regio | null; uitzonderingen?: Partial<Record<Regio, string[]>>; gemeenten?: Record<Regio, string[]> };
export const PROVINCIES = (P as unknown as { regios: { provincies: Record<string, ProvDef> } }).regios.provincies;
export const PROVINCIE_NAMEN = Object.keys(PROVINCIES);
/** Keuzes binnen een provincie: « alle andere gemeenten » plus de uitzonderingen, of de volledige lijst (Gelderland). */
export function keuzes(prov: string): Array<{ value: string; regio: Regio; label: string }> {
  const p = PROVINCIES[prov]; if (!p) return [];
  const out: Array<{ value: string; regio: Regio; label: string }> = [];
  if (p.gemeenten) { for (const r of REGIOS) for (const g of p.gemeenten[r]) out.push({ value: g, regio: r, label: g }); return out.sort((a, b) => a.label.localeCompare(b.label, 'nl')); }
  out.push({ value: '*', regio: p.regio!, label: '*' });
  if (p.uitzonderingen) for (const r of REGIOS) for (const g of p.uitzonderingen[r] ?? []) out.push({ value: g, regio: r, label: g });
  return out;
}
export function regioVan(prov: string, keuze = '*'): Regio | null {
  const k = keuzes(prov); if (!k.length) return null;
  return (k.find((x) => x.value === keuze) ?? k.find((x) => x.value === '*') ?? k[0]).regio;
}
