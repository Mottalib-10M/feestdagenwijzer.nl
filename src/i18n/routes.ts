import { makeRouter, type RouteDef } from './routes-core';
import { GUIDES } from '../lib/pages';
/** Nederlands eerst, Engels op elke pagina (RECETTE : lokale taal + Engels). */
export const LOCALES = ['nl', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'nl';
const R = (id: string, nl: string, en: string, noindex = false) => ({ id, paths: { nl: `/nl/${nl}/`, en: `/en/${en}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { nl: '/nl/', en: '/en/' } },
  R('method', 'methode', 'method'),
  R('about', 'over-ons', 'about'),
  R('widget', 'widget', 'widget', true),
  R('contact', 'contact', 'contact', true),
  R('editorial', 'redactiebeleid', 'editorial-policy', true),
  R('privacy', 'privacy', 'privacy', true),
  R('terms', 'disclaimer', 'legal-notice', true),
  R('cookies', 'cookies', 'cookies', true),
];
const G = (g: (typeof GUIDES)[number]): RouteDef<Locale> => ({ id: g.id, paths: { nl: `/nl/${g.nl.slug}/`, en: `/en/${g.en.slug}/` } });
export const ROUTES: RouteDef<Locale>[] = [CORE[0], ...GUIDES.map(G), ...CORE.slice(1)];
export const { NOINDEX_PATHS, route, hasRoute, altPaths } = makeRouter(LOCALES, ROUTES);
