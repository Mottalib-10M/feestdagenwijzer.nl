/**
 * Officiële feestdagen in Nederland, berekend en niet overgetypt; getest tegen de lijst 2026 en 2027 die de
 * Rijksoverheid publiceert (tests/engine.test.ts).
 *
 * - De elf dagen van de lijst van de Rijksoverheid (« Wanneer zijn de officiële feestdagen in Nederland? »):
 *   Nieuwjaarsdag, Goede Vrijdag, Eerste en Tweede Paasdag, Koningsdag, Bevrijdingsdag, Hemelvaartsdag,
 *   Eerste en Tweede Pinksterdag, Eerste en Tweede Kerstdag.
 * - Koningsdag is 27 april; valt die op een zondag, dan wordt Koningsdag op zaterdag 26 april gevierd
 *   (Rijksoverheid, « Is Koningsdag een vrije dag? »).
 * - Pasen: formule van Gauss; Goede Vrijdag −2, Tweede Paasdag +1, Hemelvaart +39, Pinksteren +49 en +50.
 * - Er is geen wet die een feestdag tot vrije dag maakt: of u vrij bent staat in uw cao of arbeidsovereenkomst.
 *   Per feestdag nemen we over wat de Rijksoverheid daarover zegt voor werknemers, ambtenaren en scholieren
 *   (`VRIJ`), met de bron; Nieuwjaarsdag en de Kerstdagen hebben geen aparte toelichting.
 * - De Algemene termijnenwet (art. 3) noemt dezelfde dagen « algemeen erkende feestdagen » (Eerste Paasdag
 *   en Eerste Pinksterdag zijn zondagen) en stelt Goede Vrijdag ermee gelijk: zie engine/termijnen.ts.
 */
import { dayNum, toIso, fromIso, weekday, isWeekend, plusDagen, paaszondag } from './dagen';

export type Lang = 'nl' | 'en';
export type Tri = { nl: string; en: string };
const N = (nl: string, en: string): Tri => ({ nl, en });

export type FeestId = 'nieuwjaarsdag' | 'goede-vrijdag' | 'eerste-paasdag' | 'tweede-paasdag' | 'koningsdag' | 'bevrijdingsdag' | 'hemelvaartsdag' | 'eerste-pinksterdag' | 'tweede-pinksterdag' | 'eerste-kerstdag' | 'tweede-kerstdag';
export interface FeestdagDef { id: FeestId; name: Tri; kort: Tri; date: (y: number) => string; zondag?: boolean }
const vast = (m: number, d: number) => (y: number) => toIso(dayNum(y, m, d));
const pasen = (off: number) => (y: number) => plusDagen(paaszondag(y), off);
/** 27 april, of zaterdag 26 april als 27 april een zondag is. */
export const koningsdag = (y: number) => { const n = dayNum(y, 4, 27); return toIso(weekday(n) === 0 ? n - 1 : n); };

export const FEESTDAGEN: FeestdagDef[] = [
  { id: 'nieuwjaarsdag', name: N('Nieuwjaarsdag', "New Year's Day"), kort: N('Nieuwjaar', 'New Year'), date: vast(1, 1) },
  { id: 'goede-vrijdag', name: N('Goede Vrijdag', 'Good Friday'), kort: N('Goede Vrijdag', 'Good Friday'), date: pasen(-2) },
  { id: 'eerste-paasdag', name: N('Eerste Paasdag', 'Easter Sunday'), kort: N('Pasen', 'Easter'), date: pasen(0), zondag: true },
  { id: 'tweede-paasdag', name: N('Tweede Paasdag', 'Easter Monday'), kort: N('Paasmaandag', 'Easter Monday'), date: pasen(1) },
  { id: 'koningsdag', name: N('Koningsdag', "King's Day"), kort: N('Koningsdag', "King's Day"), date: koningsdag },
  { id: 'bevrijdingsdag', name: N('Bevrijdingsdag', 'Liberation Day'), kort: N('5 mei', '5 May'), date: vast(5, 5) },
  { id: 'hemelvaartsdag', name: N('Hemelvaartsdag', 'Ascension Day'), kort: N('Hemelvaart', 'Ascension'), date: pasen(39) },
  { id: 'eerste-pinksterdag', name: N('Eerste Pinksterdag', 'Whit Sunday'), kort: N('Pinksteren', 'Whitsun'), date: pasen(49), zondag: true },
  { id: 'tweede-pinksterdag', name: N('Tweede Pinksterdag', 'Whit Monday'), kort: N('Pinkstermaandag', 'Whit Monday'), date: pasen(50) },
  { id: 'eerste-kerstdag', name: N('Eerste Kerstdag', 'Christmas Day'), kort: N('Kerst', 'Christmas'), date: vast(12, 25) },
  { id: 'tweede-kerstdag', name: N('Tweede Kerstdag', 'Boxing Day (Second Christmas Day)'), kort: N('Tweede Kerstdag', 'Boxing Day'), date: vast(12, 26) },
];
export const FEEST_IDS = FEESTDAGEN.map((f) => f.id);
export const defOf = (id: FeestId) => FEESTDAGEN.find((f) => f.id === id)!;

export interface Feestdag { id: FeestId; date: string; name: Tri; kort: Tri; zondag: boolean; /** vrij volgens de gekozen opties */ vrij: boolean }

/* ------------------------------------------------------------------ Wie is vrij? (Rijksoverheid) */
export type Profiel = 'bedrijf' | 'ambtenaar' | 'school';
export const PROFIELEN: Profiel[] = ['bedrijf', 'ambtenaar', 'school'];
export const PROFIEL_NAAM: Record<Profiel, Tri> = {
  bedrijf: N('Werknemer bij een bedrijf', 'Employee at a company'),
  ambtenaar: N('Ambtenaar', 'Civil servant'),
  school: N('Scholier, student of ouder', 'Pupil, student or parent'),
};
/**
 * Wat de Rijksoverheid per feestdag zegt (vraag-en-antwoordpagina's, gelezen op de datum in params-2026.json):
 *   ja          « Dan bent u vrij »
 *   meestal     « bij de meeste bedrijven een vrije dag », « zeer waarschijnlijk vrij »
 *   werken      « moet u waarschijnlijk gewoon werken »
 *   vraag-na    « niet iedereen is dan vrij; vraag het na bij uw werkgever »
 *   zondag      de dag valt altijd op zondag
 *   vakantie    valt binnen de kerstvakantie van alle regio's
 *   geen        geen aparte toelichting van de Rijksoverheid: de site rekent de dag als vrij, de cao beslist
 */
export type Status = 'ja' | 'meestal' | 'werken' | 'vraag-na' | 'zondag' | 'vakantie' | 'geen';
export const VRIJ: Record<FeestId, { bedrijf: Status; ambtenaar: Status; school: Status; bron?: string }> = {
  'nieuwjaarsdag': { bedrijf: 'geen', ambtenaar: 'geen', school: 'vakantie' },
  'goede-vrijdag': { bedrijf: 'werken', ambtenaar: 'werken', school: 'meestal', bron: 'rijks-goede-vrijdag' },
  'eerste-paasdag': { bedrijf: 'zondag', ambtenaar: 'zondag', school: 'zondag', bron: 'rijks-tweede-paasdag' },
  'tweede-paasdag': { bedrijf: 'meestal', ambtenaar: 'ja', school: 'meestal', bron: 'rijks-tweede-paasdag' },
  'koningsdag': { bedrijf: 'meestal', ambtenaar: 'ja', school: 'meestal', bron: 'rijks-koningsdag' },
  'bevrijdingsdag': { bedrijf: 'vraag-na', ambtenaar: 'vraag-na', school: 'meestal', bron: 'rijks-bevrijdingsdag' },
  'hemelvaartsdag': { bedrijf: 'meestal', ambtenaar: 'ja', school: 'meestal', bron: 'rijks-hemelvaart' },
  'eerste-pinksterdag': { bedrijf: 'zondag', ambtenaar: 'zondag', school: 'zondag', bron: 'rijks-tweede-pinksterdag' },
  'tweede-pinksterdag': { bedrijf: 'meestal', ambtenaar: 'ja', school: 'meestal', bron: 'rijks-tweede-pinksterdag' },
  'eerste-kerstdag': { bedrijf: 'geen', ambtenaar: 'geen', school: 'vakantie' },
  'tweede-kerstdag': { bedrijf: 'geen', ambtenaar: 'geen', school: 'vakantie' },
};
export const STATUS_TEKST: Record<Status, Tri> = {
  ja: N('Vrij', 'Day off'),
  meestal: N('Meestal vrij', 'Usually off'),
  werken: N('Meestal werken', 'Usually a working day'),
  'vraag-na': N('Hangt van uw cao af', 'Depends on your agreement'),
  zondag: N('Altijd op zondag: geen extra vrije dag', 'Always a Sunday: no extra day off'),
  vakantie: N('Kerstvakantie', 'Christmas break'),
  // Testeurs naïfs 2026-11-14 : « Geen toelichting van de Rijksoverheid » se lisait « on ne sait pas si l'on est
  // libre à Noël », alors que la page compte ces jours comme vrij. La source ne dit rien de plus : on dit ce que
  // fait le site (compté comme jour libre) et qui décide, sans inventer de « meestal ».
  // Tour 2 : « Als vrij gerekend; uw cao beslist » se lisait « on ne sait pas » (3 testeurs sur 3). Le libellé commence
  // maintenant par la réponse de la page (compté libre) ; toujours sans « meestal », que la source ne dit pas.
  // Tour 3 (testeurs 1 et 3, validé par l'éditeur) : « Telt hier als vrij (uw cao beslist) » n'était pas compris et
  // passait d'un jour à l'autre selon l'année. Libellé simple et constant, le même que les autres jours fériés courants ;
  // la réserve « uw cao beslist » reste dans le cadre « Gerekend als vrij » sous chaque résultat.
  geen: N('Meestal vrij', 'Usually off'),
};
/**
 * Tekst voor de kolom « Vrij? » bij een datum. Een feestdag op zaterdag of zondag levert geen vrije werkdag op:
 * « Eerste Kerstdag, zaterdag: Als vrij gerekend » las als onzin (testeurs naïfs 2026-11-14, tour 2).
 */
export function vrijOpDatum(id: FeestId, date: string, pf: Profiel, l: Lang): string {
  const st = VRIJ[id][pf], wd = weekday(fromIso(date));
  if ((wd === 0 || wd === 6) && st !== 'zondag' && st !== 'vakantie') return l === 'nl' ? `Valt op ${wd === 6 ? 'zaterdag' : 'zondag'}: geen extra vrije dag` : `Falls on a ${wd === 6 ? 'Saturday' : 'Sunday'}: no extra day off`;
  return STATUS_TEKST[st][l];
}

/* ------------------------------------------------------------------ Opties voor de rekenaars */
export interface Opties {
  /** Goede Vrijdag als vrije dag (cao). Standaard nee: « moet u waarschijnlijk gewoon werken ». */
  goedeVrijdag?: boolean;
  /** Bevrijdingsdag als vrije dag (cao). Standaard nee: « niet iedereen is dan vrij ». */
  bevrijdingsdag?: boolean;
  /** 24 en 31 december als vrije (mid)dag volgens bedrijfsafspraak. Standaard nee. */
  oudejaar?: boolean;
}
export const STANDAARD: Required<Opties> = { goedeVrijdag: false, bevrijdingsdag: false, oudejaar: false };
/** Opties die bij een profiel horen: ambtenaar en bedrijf volgen de toelichting van de Rijksoverheid, school heeft beide dagen vrij. */
export const optiesVoor = (p: Profiel): Required<Opties> => (p === 'school' ? { goedeVrijdag: true, bevrijdingsdag: true, oudejaar: false } : { ...STANDAARD });

/** Is deze feestdag vrij volgens de opties? Zondagen tellen nooit als vrije weekdag; de aanname voor de andere dagen staat op elke pagina. */
export function isVrij(id: FeestId, o: Opties = {}): boolean {
  if (id === 'goede-vrijdag') return !!o.goedeVrijdag;
  if (id === 'bevrijdingsdag') return !!o.bevrijdingsdag;
  if (id === 'eerste-paasdag' || id === 'eerste-pinksterdag') return false;
  return true;
}

/** De elf officiële feestdagen van een jaar, op datum, met de vrij-vlag van de opties. */
export const officieel = (y: number, o: Opties = {}): Feestdag[] =>
  FEESTDAGEN.map((f) => ({ id: f.id, date: f.date(y), name: f.name, kort: f.kort, zondag: !!f.zondag, vrij: isVrij(f.id, o) }))
    .sort((a, b) => a.date.localeCompare(b.date));

export interface VrijeDag { id: string; date: string; name: Tri }
/** Alle vrije dagen van een jaar volgens de opties: vrije feestdagen, en 24/31 december als gekozen. */
export function vrijeDagen(y: number, o: Opties = {}): VrijeDag[] {
  const out: VrijeDag[] = officieel(y, o).filter((f) => f.vrij).map((f) => ({ id: f.id, date: f.date, name: f.name }));
  if (o.oudejaar) out.push({ id: 'kerstavond', date: toIso(dayNum(y, 12, 24)), name: N('Kerstavond', 'Christmas Eve') }, { id: 'oudejaarsdag', date: toIso(dayNum(y, 12, 31)), name: N('Oudejaarsdag', "New Year's Eve") });
  return out.sort((a, b) => a.date.localeCompare(b.date));
}
/** Vrije feestdagen die op een weekdag vallen (dat zijn de dagen die verlof schelen). */
export const opWeekdag = (list: Array<{ date: string }>) => list.filter((f) => !isWeekend(fromIso(f.date)));
/** De volgende n officiële feestdagen vanaf een dag (inbegrepen), over de jaarwisseling heen. */
export function volgende(iso: string, n = 5, o: Opties = {}): Feestdag[] {
  const y = Number(iso.slice(0, 4));
  return [...officieel(y, o), ...officieel(y + 1, o)].filter((f) => f.date >= iso).slice(0, n);
}
/** Datum van één feestdag in een jaar. */
export const datum = (id: FeestId, y: number) => defOf(id).date(y);
