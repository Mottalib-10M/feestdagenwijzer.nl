/**
 * Brugdagen en verlofplanning voor Nederland.
 *
 * Het jaar wordt opgedeeld in afwisselende blokken: vrije blokken (weekend en vrije feestdagen volgens de opties)
 * en werkblokken (maandag tot vrijdag zonder vrije dag). Wie alle dagen van een werkblok verlof neemt, verbindt
 * de twee vrije blokken links en rechts tot één aaneengesloten periode.
 *
 * - `bruggen`: elk werkblok van hoogstens `max` dagen naast een vrije feestdag op een weekdag, met het rendement
 *   (vrije dagen op een rij per verlofdag), beste eerst. Een werkblok van één dag is een echte brugdag.
 * - `optimaliseer`: de beste keuze voor een budget aan verlofdagen. Dynamisch programmeren over de werkblokken:
 *   maximaliseert de vrije dagen op een rij; bij gelijke stand wint de oplossing met minder verlofdagen. Exact.
 * - `werkdagen`: maandag tot vrijdag zonder vrije dagen, per maand.
 */
import { vrijeDagen, type Opties } from './feestdagen';
import { fromIso, toIso, isWeekend, dayNum } from './dagen';
export type { Opties };

interface Block { frei: boolean; start: number; len: number; feest: boolean }

const vrijeSet = (y: number, o: Opties) => {
  const hol = new Set<number>();
  for (const yy of [y - 1, y, y + 1]) for (const f of vrijeDagen(yy, o)) hol.add(fromIso(f.date));
  return hol;
};

/** Vrije en werkblokken van begin december van het vorige jaar tot eind januari van het volgende. */
export function blokken(y: number, o: Opties = {}): Block[] {
  const hol = vrijeSet(y, o);
  const a = dayNum(y - 1, 12, 1), b = dayNum(y + 1, 1, 31);
  const out: Block[] = [];
  for (let d = a; d <= b; d++) {
    const isHol = hol.has(d), frei = isHol || isWeekend(d);
    const wirkt = isHol && !isWeekend(d);
    const last = out[out.length - 1];
    if (last && last.frei === frei) { last.len++; last.feest ||= wirkt; }
    else out.push({ frei, start: d, len: 1, feest: wirkt });
  }
  return out;
}

export interface Brug {
  verlofVan: string; verlofTot: string; verlof: number;
  vrijVan: string; vrijTot: string; vrij: number;
  /** Vrije dagen (ids) in het blok. */
  feestdagen: string[];
}
const mk = (bl: Block[], i: number, j: number, y: number, o: Opties): Brug => {
  const pre = bl[i - 1], post = bl[j + 1];
  const von = pre ? pre.start : bl[i].start, bis = post ? post.start + post.len - 1 : bl[j].start + bl[j].len - 1;
  let verlof = 0; for (let k = i; k <= j; k++) if (!bl[k].frei) verlof += bl[k].len;
  const ids = new Set<string>();
  for (const yy of [y - 1, y, y + 1]) for (const f of vrijeDagen(yy, o)) { const n = fromIso(f.date); if (n >= von && n <= bis) ids.add(f.id); }
  return { verlofVan: toIso(bl[i].start), verlofTot: toIso(bl[j].start + bl[j].len - 1), verlof, vrijVan: toIso(von), vrijTot: toIso(bis), vrij: bis - von + 1, feestdagen: [...ids] };
};
const inJaar = (b: Block, y: number) => b.start >= dayNum(y, 1, 1) && b.start + b.len - 1 <= dayNum(y, 12, 31);

/** Alle bruggen van een jaar: werkblokken tot `max` dagen naast een vrije weekdag, beste eerst. */
export function bruggen(y: number, o: Opties = {}, max = 4): Brug[] {
  const bl = blokken(y, o), out: Brug[] = [];
  for (let i = 1; i < bl.length - 1; i++) {
    const b = bl[i];
    if (b.frei || b.len > max || !inJaar(b, y)) continue;
    if (!bl[i - 1].feest && !bl[i + 1].feest) continue;
    out.push(mk(bl, i, i, y, o));
  }
  return out.sort((a, b) => b.vrij / b.verlof - a.vrij / a.verlof || b.vrij - a.vrij || a.verlofVan.localeCompare(b.verlofVan));
}
/** Echte brugdagen: één werkdag tussen een vrije feestdag en het weekend (of twee vrije dagen). */
export const brugdagen = (y: number, o: Opties = {}) => bruggen(y, o, 1);

export interface Plan { blokken: Brug[]; verlof: number; vrij: number; /** Verlofdagen die geen brug meer verlengen. */ rest: number }
/** Beste verdeling van `budget` verlofdagen in jaar y (alleen dagen in jaar y kosten verlof). */
export function optimaliseer(y: number, budget: number, o: Opties = {}): Plan {
  const B = Math.max(0, Math.min(60, Math.floor(budget)));
  const bl = blokken(y, o);
  const runs: number[] = []; for (let i = 0; i < bl.length; i++) if (!bl[i].frei) runs.push(i);
  const n = runs.length, NEG = -1e9;
  const ok = (r: number) => { const i = runs[r]; return i > 0 && i < bl.length - 1 && inJaar(bl[i], y) && bl[i].len <= 10; };
  const fr = (i: number) => (bl[i] && bl[i].frei ? bl[i].len : 0);
  const dp: Float64Array[][] = [], from: Int32Array[][] = [];
  for (let r = 0; r <= n; r++) { dp.push([0, 1, 2].map(() => new Float64Array(B + 1).fill(NEG))); from.push([0, 1, 2].map(() => new Int32Array(B + 1).fill(-1))); }
  dp[0][0][0] = 0;
  const hol = (i: number) => !!(bl[i] && bl[i].frei && bl[i].feest);
  for (let r = 0; r < n; r++) {
    const i = runs[r], cost = bl[i].len;
    for (let c = 0; c <= B; c++) for (let s = 0; s < 3; s++) {
      const v = dp[r][s][c]; if (v <= NEG / 2) continue;
      if (s !== 2 && v > dp[r + 1][0][c]) { dp[r + 1][0][c] = v; from[r + 1][0][c] = s; }
      if (ok(r) && c + cost <= B) {
        const gain = s ? cost + fr(i + 1) : fr(i - 1) + cost + fr(i + 1);
        const has = (s === 1) || (s === 0 && hol(i - 1)) || hol(i + 1);
        const t = has ? 1 : 2, nv = v + 100 * gain - cost;
        if (nv > dp[r + 1][t][c + cost]) { dp[r + 1][t][c + cost] = nv; from[r + 1][t][c + cost] = s; }
      }
    }
  }
  let best = 0, bc = 0, bs = 0;
  for (let c = 0; c <= B; c++) for (let s = 0; s < 2; s++) if (dp[n][s][c] > best) { best = dp[n][s][c]; bc = c; bs = s; }
  const chosen: boolean[] = new Array(n).fill(false);
  for (let r = n, c = bc, s = bs; r > 0; r--) { const p = from[r][s][c]; if (s) { chosen[r - 1] = true; c -= bl[runs[r - 1]].len; } s = p < 0 ? 0 : p; }
  const plan: Brug[] = [];
  for (let r = 0; r < n; r++) {
    if (!chosen[r]) continue;
    let e = r; while (e + 1 < n && chosen[e + 1]) e++;
    plan.push(mk(bl, runs[r], runs[e], y, o)); r = e;
  }
  const verlof = plan.reduce((a, b) => a + b.verlof, 0);
  return { blokken: plan, verlof, vrij: plan.reduce((a, b) => a + b.vrij, 0), rest: B - verlof };
}

/** Werkdagen (maandag tot vrijdag zonder vrije dagen) per maand. */
export function werkdagen(y: number, o: Opties = {}): number[] {
  const hol = new Set(vrijeDagen(y, o).map((f) => fromIso(f.date)));
  const out: number[] = [];
  for (let m = 1; m <= 12; m++) {
    let c = 0; for (let d = dayNum(y, m, 1); d < dayNum(y, m + 1, 1); d++) if (!isWeekend(d) && !hol.has(d)) c++;
    out.push(c);
  }
  return out;
}
/** Maandagen tot vrijdagen van een jaar, zonder vrije dagen af te trekken. */
export const weekdagen = (y: number) => { let c = 0; for (let d = dayNum(y, 1, 1); d <= dayNum(y, 12, 31); d++) if (!isWeekend(d)) c++; return c; };
/** Werkdagen tussen twee data (grenzen inbegrepen), zonder weekends en vrije dagen. */
export function werkdagenTussen(van: string, tot: string, o: Opties = {}): number {
  const a = fromIso(van), b = fromIso(tot); if (b < a) return 0;
  const hol = new Set<number>(); for (let yy = Number(van.slice(0, 4)); yy <= Number(tot.slice(0, 4)); yy++) for (const f of vrijeDagen(yy, o)) hol.add(fromIso(f.date));
  let c = 0; for (let d = a; d <= b; d++) if (!isWeekend(d) && !hol.has(d)) c++; return c;
}
