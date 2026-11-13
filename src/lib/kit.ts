/**
 * Trousse de rédaction : tout chiffre et toute date écrits dans une page viennent d'ici, jamais tapés à la main.
 *   K.P                               paramètres datés (params-2026.json)
 *   K.officieel, K.vrijeDagen, K.datum, K.VRIJ …   feestdagen (engine/feestdagen.ts)
 *   K.optimaliseer, K.bruggen, K.brugdagen, K.werkdagen …  bruggen en werkdagen (engine/bruggen.ts)
 *   K.kalender, K.volgendeVakantie, K.regioVan …           schoolvakanties (engine/school.ts)
 *   K.verleng                                               Algemene termijnenwet (engine/termijnen.ts)
 *   K.tool(kind, lang, args, valeurs)  lance un simulateur de tool-specs.ts et rend sa carte de résultat
 */
import P from '../data/params-2026.json';
import * as D from './engine/dagen';
import * as F from './engine/feestdagen';
import * as B from './engine/bruggen';
import * as S from './engine/school';
import * as Tm from './engine/termijnen';
import { runTool } from './tool-specs';
import { LAST_UPDATED } from '../data/site-config';

export const KIT = { P, ...D, ...F, ...B, ...S, ...Tm, tool: runTool, LEESDATUM: LAST_UPDATED };
export type Kit = typeof KIT;
