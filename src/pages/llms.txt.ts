/** llms.txt (RECETTE §21), gegenereerd uit het register van de pagina's. */
import { GUIDES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { KIT as K } from '../lib/kit';
export function GET() {
  const l27 = K.officieel(2027).map((f) => `${f.name.en} ${f.date}`).join(', ');
  const bd = K.brugdagen(2027).map((b) => b.verlofVan).join(', ');
  const m = K.kalender(2026, 'midden')!;
  const lines = [
    `# ${SITE_NAMES.nl}`, '',
    `> Dutch public holidays 2026-2030, bridge days, working days and school holidays by region (North, Central, South), in Dutch (nl-NL) and English. Holidays follow the Dutch central government list (rijksoverheid.nl, CC0 1.0). 2027: ${l27}. No substitute day when a holiday falls at the weekend. Days off are set by collective agreement (cao) or contract, not by law; per holiday the site reports the government's guidance (Good Friday: usually a working day; Liberation Day 5 May: not everyone is off). True bridge days 2027: ${bd}. Working days 2027 (Mon-Fri minus usual holidays): ${K.werkdagen(2027).reduce((a, b) => a + b, 0)}. School May break 2027: ${m.mei.van} to ${m.mei.tot} in all regions. Easter by Gauss's formula, cross-checked against Meeus for 1600-2600. Deadlines under the General Time Limits Act (Algemene termijnenwet). Everything runs in the browser; nothing entered is sent. Independent site by Radif Partners. Last updated ${LAST_UPDATED}.`, '',
    `## Public holidays 2027`, `- [Feestdagen 2027](${SITE_URL}${route('home', 'nl')})`, `- [Public holidays 2027](${SITE_URL}${route('home', 'en')})`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label.en}`, ...GUIDES.filter((p) => p.group === g.id).flatMap((p) => [
      `- [${p.nl.nav}](${SITE_URL}${route(p.id, 'nl')}): ${p.nl.card}`,
      `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`,
    ]), '']),
    '## About', `- [Methode](${SITE_URL}${route('method', 'nl')})`, `- [Method](${SITE_URL}${route('method', 'en')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
