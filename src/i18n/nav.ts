import { route, hasRoute, type Locale } from './routes';
import { GUIDES, guideById } from '../lib/pages';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  nl: { home: 'Feestdagen 2027', method: 'Methode', about: 'Over ons', widget: 'Widget insluiten', contact: 'Contact', editorial: 'Redactiebeleid', privacy: 'Privacy', terms: 'Disclaimer', cookies: 'Cookies' },
  en: { home: 'Public holidays 2027', method: 'Method', about: 'About', widget: 'Embed the widget', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
};
/** `short` : intitulé du menu du haut (un ou deux mots, RECETTE §10.3) ; `label` : intitulé complet. */
export const GROUPS: Array<{ id: Group; label: Record<Locale, string>; short: Record<Locale, string> }> = [
  { id: 'feestdagen', label: { nl: 'Feestdagen per jaar en per dag', en: 'Public holidays by year and by day' }, short: { nl: 'Feestdagen', en: 'Holidays' } },
  { id: 'verlof', label: { nl: 'Brugdagen, werkdagen en vrij zijn', en: 'Bridge days, working days and time off' }, short: { nl: 'Brugdagen', en: 'Bridge days' } },
  { id: 'school', label: { nl: 'Schoolvakanties per regio', en: 'School holidays by region' }, short: { nl: 'Schoolvakanties', en: 'School holidays' } },
];
export const label = (id: string, lang: Locale) => CORE[lang][id] ?? guideById(id)?.[lang]?.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => GUIDES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale, short = true): NavCategory[] {
  return GROUPS.map((g) => ({ label: (short ? g.short : g.label)[lang], links: g.id === 'feestdagen' ? [link('home', lang), ...inGroup(g.id, lang)] : inGroup(g.id, lang) })).filter((c) => c.links.length);
}
/** La Méthode n'est pas dans le menu du haut (RECETTE §10.3) : sous le titre et en bas de page. */
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => {
  const site = { label: { nl: 'Deze site', en: 'This site' }[lang], links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) };
  return [...GROUPS.map((g) => ({ label: g.label[lang], links: inGroup(g.id, lang) })), site];
};
/** Les outils, à un clic de toute page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => [link('home', lang), ...['brugdagen-2027', 'ben-ik-vrij', 'werkdagen-2027'].filter((id) => hasRoute(id, lang)).map((id) => link(id, lang))];
