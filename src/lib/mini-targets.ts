/** Où mène le bouton d'un mini-simulateur : la page qui porte le calculateur complet du même sujet. */
import { ROUTES, route } from '../i18n/routes';
import type { Lang } from './format';
const CIBLE: Record<string, string> = { brug: 'brugdagen-2027', werk: 'werkdagen-2027', school: 'schoolvakanties-2026-2027', vrij: 'ben-ik-vrij', termijn: 'termijnen-feestdagen' };
export const miniHref = (kind: string, lang: Lang, fallback: string) => { const id = CIBLE[kind]; return id && ROUTES.some((r) => r.id === id) ? route(id, lang) : fallback; };
