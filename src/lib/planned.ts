/** Toutes les pages prévues (id = nom du fichier de src/content/guides). Les tests acceptent un lien vers ces ids
 *  pendant la rédaction ; « toutes les pages existent » échoue tant qu'il en manque. */
export const PLANNED_GUIDES = [
  'feestdagen-2028', 'feestdagen-2029',
  'pasen-2027', 'goede-vrijdag-2027', 'koningsdag-2027', 'bevrijdingsdag-2027', 'hemelvaart-2027', 'pinksteren-2027',
  'brugdagen-2027', 'brugdagen-2028', 'werkdagen-2027',
  'ben-ik-vrij', 'termijnen-feestdagen', 'kalender-2027',
  'schoolvakanties-2026-2027', 'schoolvakanties-2027-2028', 'regio-schoolvakantie',
];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, 'home', 'method', 'about', 'widget', 'contact', 'editorial', 'privacy', 'terms', 'cookies']);
