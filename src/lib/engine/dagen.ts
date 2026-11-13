/**
 * Dagrekenen zonder tijdzone: elke dag is een geheel getal (dagen sinds 1970-01-01, UTC), zodat
 * zomertijd en de klok van het toestel nooit een datum laten verschuiven.
 *
 * - Pasen: formule van Gauss in de versie van de Physikalisch-Technische Bundesanstalt (Lichtenberg);
 *   `paaszondagMeeus` is een tweede, onafhankelijke berekening (Meeus/Jones/Butcher) voor de tests.
 * - Weeknummers volgens ISO 8601 (NEN-EN 28601): week 1 is de week met de eerste donderdag van het jaar.
 */
const MS = 86400000;
export const dayNum = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d) / MS;
export const fromIso = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return dayNum(y, m, d); };
export const toIso = (n: number) => new Date(n * MS).toISOString().slice(0, 10);
/** 0 = zondag … 6 = zaterdag */
export const weekday = (n: number) => new Date(n * MS).getUTCDay();
export const isWeekend = (n: number) => { const w = weekday(n); return w === 0 || w === 6; };
export const plusDagen = (iso: string, d: number) => toIso(fromIso(iso) + d);
export const jaarVan = (iso: string) => Number(iso.slice(0, 4));
/** Maandag van de week waarin dag n valt. */
export const maandagVan = (n: number) => n - ((weekday(n) + 6) % 7);

/** Paaszondag volgens Gauss (PTB/Lichtenberg), als ISO-datum. */
export function paaszondag(x: number): string {
  const K = Math.floor(x / 100);
  const M = 15 + Math.floor((3 * K + 3) / 4) - Math.floor((8 * K + 13) / 25);
  const S = 2 - Math.floor((3 * K + 3) / 4);
  const A = x % 19;
  const D = (19 * A + M) % 30;
  const R = Math.floor((D + Math.floor(A / 11)) / 29);
  const OG = 21 + D - R;
  const SZ = 7 - ((x + Math.floor(x / 4) + S) % 7);
  const OE = 7 - ((((OG - SZ) % 7) + 7) % 7);
  return toIso(dayNum(x, 3, 1) + OG + OE - 1);
}
/** Tweede, onafhankelijke berekening (Meeus/Jones/Butcher), alleen voor de tests. */
export function paaszondagMeeus(y: number): string {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return toIso(dayNum(y, month, day));
}
/** De tussenstappen van Gauss, om ze op een pagina te tonen. */
export function gaussStappen(x: number) {
  const K = Math.floor(x / 100), M = 15 + Math.floor((3 * K + 3) / 4) - Math.floor((8 * K + 13) / 25), S = 2 - Math.floor((3 * K + 3) / 4);
  const A = x % 19, D = (19 * A + M) % 30, R = Math.floor((D + Math.floor(A / 11)) / 29), OG = 21 + D - R;
  const SZ = 7 - ((x + Math.floor(x / 4) + S) % 7), OE = 7 - ((((OG - SZ) % 7) + 7) % 7);
  return { K, M, S, A, D, R, OG, SZ, OE, OS: OG + OE };
}
/** n-de weekdag van een maand (n = −1: laatste). wd 0 = zondag. */
export function nthWeekday(y: number, m: number, wd: number, n: number): string {
  if (n > 0) { const first = dayNum(y, m, 1); return toIso(first + ((wd - weekday(first) + 7) % 7) + 7 * (n - 1)); }
  const last = dayNum(y, m + 1, 1) - 1; return toIso(last - ((weekday(last) - wd + 7) % 7));
}
/** Weeknummer volgens ISO 8601. */
export function isoWeek(iso: string): { year: number; week: number } {
  const n = fromIso(iso), wd = (weekday(n) + 6) % 7;
  const thu = n - wd + 3, ty = new Date(thu * MS).getUTCFullYear();
  return { year: ty, week: Math.floor((thu - dayNum(ty, 1, 1)) / 7) + 1 };
}
export const weeksInYear = (y: number) => isoWeek(`${y}-12-28`).week;
/** Maandag van ISO-week w van jaar y. */
export function maandagVanWeek(y: number, w: number): string {
  const j4 = dayNum(y, 1, 4);
  return toIso(maandagVan(j4) + 7 * (w - 1));
}
/** Weekdagen (ma–vr) in [a, b], grenzen inbegrepen. */
export function weekdagenTussen(a: number, b: number): number {
  let c = 0; for (let d = a; d <= b; d++) if (!isWeekend(d)) c++; return c;
}
/**
 * Nederlandse wettelijke tijd → UTC-tijdstip. Normaaltijd is de Midden-Europese Tijd (UTC+1); zomertijd
 * (UTC+2) van de laatste zondag van maart, 2 uur, tot de laatste zondag van oktober, 3 uur (richtlijn
 * 2000/84/EG). Dient de aftellers: middernacht in Nederland, omgerekend naar de klok van de bezoeker.
 */
export function nederlandInstant(dateIso: string, time = '00:00'): string {
  const y = Number(dateIso.slice(0, 4)), [hh, mm] = time.split(':').map(Number);
  const local = Date.UTC(y, Number(dateIso.slice(5, 7)) - 1, Number(dateIso.slice(8, 10)), hh, mm);
  const b = fromIso(nthWeekday(y, 3, 0, -1)) * MS + 1 * 3600e3;
  const e = fromIso(nthWeekday(y, 10, 0, -1)) * MS + 1 * 3600e3;
  const guessUtc = local - 3600e3;
  const off = guessUtc > b && local - 7200e3 <= e ? 2 : 1;
  return new Date(local - off * 3600e3).toISOString();
}
