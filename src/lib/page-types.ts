/**
 * Une page = UN fichier de contenu : `src/content/guides/<id>.ts`, avec les versions néerlandaise (`nl`) et anglaise
 * (`en`) côte à côte. Routes, menus, sitemap, hreflang, schémas et liens internes lisent ces fichiers et rien d'autre.
 */
import type { Kit } from './kit';
import type { Lang } from './format';

export interface FAQ { q: string; a: string }
export interface MiniOpts { /** titre */ t?: string; /** valeurs par défaut */ d?: Record<string, number>; /** texte du lien */ c?: string; /** ce que suppose l'exemple */ e?: string }

export interface Helpers extends Kit {
  lang: Lang;
  /** Lien interne par id de page, dans la langue de la page. Id inconnu = test en échec. */
  a: (id: string, text: string) => string;
  /** Tableau ; les nombres sont formatés dans la langue, les chaînes insérées en HTML. */
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Lien vers une source de params-2026.json (clé). */
  src: (key: string, text?: string) => string;
  ext: (url: string, text: string) => string;
  box: (title: string, html: string) => string;
  /** Mini-simulateur bâti sur lib/mini-specs.ts. */
  mini: (kind: string, opts?: MiniOpts) => string;
  n: (x: number, d?: number) => string;
  /** « 6 mei 2027 ». */
  day: (iso: string) => string;
  /** « donderdag 6 mei 2027 ». */
  wday: (iso: string) => string;
  /** Jour de la semaine seul. */
  wd: (iso: string) => string;
  /** « 24 april – 2 mei 2027 ». */
  per: (p: { van: string; tot: string }) => string;
  /** Choisit le texte de la langue. */
  t: (nl: string, en: string) => string;
}

export type Group = 'feestdagen' | 'verlof' | 'school';

export interface LangPage {
  /** Segment d'URL, minuscules et tirets, sans accent. */
  slug: string;
  nav: string; card: string;
  /** 50 à 60 caractères, terme clé d'abord, année comprise (§11). */
  title: string;
  /** 150 à 160 caractères, année comprise. */
  description: string;
  h1: string; intro: string;
  /** UN paragraphe de 120 mots ou plus : la réponse directe, chiffrée (§21). */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
}
export interface GuideDef {
  id: string; group: Group; order: number;
  /** Outil en tête : une clé de tool-specs.ts, ou un outil propre (kalender, aftellen). */
  tool: string;
  toolArg?: Record<string, number | string>;
  related: string[];
  /** Clés de params-2026.json > sources. */
  sources: string[];
  /** Compte à rebours en direct au-dessus de l'outil : date (ISO), libellé. */
  countdown?: { date: string; label: { nl: string; en: string } };
  nl: LangPage; en: LangPage;
}
export const defineGuide = (p: GuideDef): GuideDef => p;
