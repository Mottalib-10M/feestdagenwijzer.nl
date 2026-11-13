/** Regio schoolvakantie: welke regio hoort bij uw provincie of gemeente, met de uitzonderingen van de Rijksoverheid. */
import { defineGuide } from '../../lib/page-types';
import { K, D, PER, N } from '../_k';

const P = K.PROVINCIES;
const per = (r: 'noord' | 'midden' | 'zuid') => K.PROVINCIE_NAMEN.filter((p) => P[p].regio === r);
const geld = P['Gelderland'].gemeenten!;
const gN = geld.noord.length, gM = geld.midden.length, gZ = geld.zuid.length;
const zomer = (['noord', 'midden', 'zuid'] as const).map((r) => K.kalender(2026, r)!.zomer);

export default defineGuide({
  id: 'regio-schoolvakantie', group: 'school', order: 17, tool: 'rg', toolArg: { prov: 'Gelderland', sj: 2026 },
  related: ['schoolvakanties-2026-2027', 'schoolvakanties-2027-2028', 'kalender-2027', 'brugdagen-2027'],
  sources: ['rijks-regios', 'rijks-sv-2026', 'rijks-sv-2027'],
  nl: {
    slug: 'regio-schoolvakantie', nav: 'Regio van uw gemeente', card: 'Noord, Midden of Zuid: zoek uw gemeente op',
    title: 'Regio schoolvakantie: Noord, Midden of Zuid per gemeente',
    description: "In welke regio voor de schoolvakantie valt uw gemeente: Noord, Midden of Zuid? Kies provincie en gemeente en zie uw vakanties, met alle uitzonderingen.",
    h1: 'Regio schoolvakantie: Noord, Midden of Zuid?',
    intro: 'De regio voor de schoolvakantie hangt af van uw gemeente; in Gelderland, Utrecht, Flevoland en Noord-Brabant is de provincie niet genoeg.',
    resume: `De Rijksoverheid deelt Nederland voor de schoolvakanties in drie regio’s. Bij de meeste provincies is het eenvoudig. Noord: ${per('noord').join(', ')}. Midden: ${per('midden').join(', ')}. Zuid: ${per('zuid').join(', ')}. Vier provincies hebben uitzonderingen. In Flevoland hoort Zeewolde bij Midden. In Utrecht horen Eemnes en de voormalige gemeente Abcoude (De Ronde Venen) bij Noord. In Noord-Brabant hoort Altena bij Midden, behalve de kernen Hank en Dussen. Gelderland is verdeeld per gemeente: ${N(gN, 'nl')} gemeente bij Noord, ${N(gM, 'nl')} bij Midden en ${N(gZ, 'nl')} bij Zuid, en twee gemeenten zijn zelfs per voormalige gemeente gesplitst. De regio bepaalt vooral de herfst-, voorjaars- en zomervakantie; kerst- en meivakantie zijn overal gelijk. In 2027 begint de zomervakantie in Noord op ${D(zomer[0].van, 'nl')}, in Midden op ${D(zomer[1].van, 'nl')} en in Zuid op ${D(zomer[2].van, 'nl')}.`,
    faqs: [
      { q: 'In welke regio valt Gelderland?', a: `Gelderland is verdeeld over drie regio’s: ${N(gM, 'nl')} gemeenten horen bij Midden, ${N(gZ, 'nl')} bij Zuid (onder meer Arnhem en Nijmegen) en ${N(gN, 'nl')} bij Noord (Hattem). Kies uw gemeente in de rekenhulp, dan ziet u meteen de regio en de vakanties die daarbij horen.` },
      { q: 'Hoort Utrecht bij regio Midden?', a: 'Ja, de provincie Utrecht hoort bij regio Midden, met uitzondering van Eemnes en de voormalige gemeente Abcoude (nu onderdeel van De Ronde Venen), die bij regio Noord horen. Voor die plaatsen gelden dus de vakanties van Noord. De rekenhulp hierboven houdt rekening met deze uitzonderingen.' },
      { q: 'Wat als mijn kind in een andere regio naar school gaat?', a: 'Dan gelden de vakanties van de regio waar de school staat, niet die van uw woonplaats. Dat speelt vaak in grensgemeenten en bij middelbare scholen in een andere stad. Hebben uw kinderen scholen in verschillende regio’s, dan vallen hun herfst-, voorjaars- en zomervakanties mogelijk niet samen. Kijk in de schoolgids.' },
    ],
    body: (h) => `<h2>Regio schoolvakantie per provincie</h2>
${h.table(['Provincie', 'Regio', 'Uitzonderingen'], K.PROVINCIE_NAMEN.map((p) => [p, P[p].regio ? h.REGIO_NAAM[P[p].regio!].nl : 'per gemeente', P[p].uitzonderingen ? Object.entries(P[p].uitzonderingen!).map(([r, g]) => `${(g as string[]).join(', ')} → ${h.REGIO_KORT[r as 'noord'].nl}`).join('; ') : P[p].gemeenten ? `${N(gN, 'nl')} Noord, ${N(gM, 'nl')} Midden, ${N(gZ, 'nl')} Zuid` : '–']), 'Indeling in regio’s volgens de Rijksoverheid', ['l', 'l', 'l'])}
<p>Bron: de ${h.src('rijks-regios', 'regio-indeling van de Rijksoverheid')}, letterlijk overgenomen, ook de kernen en voormalige gemeenten die apart genoemd worden. Gemeentelijke herindelingen kunnen de lijst veranderen; de Rijksoverheid past haar overzicht dan aan.</p>
<h2>Wat de regio uitmaakt</h2>
<p>In schooljaar 2026-2027 begint de herfstvakantie in Noord een week eerder, de voorjaarsvakantie in Zuid een week eerder en de zomervakantie in Noord twee weken eerder dan in Zuid. In 2027-2028 is de volgorde in de zomer anders; zie ${h.a('schoolvakanties-2027-2028', 'schoolvakanties 2027-2028')}.</p>
${h.mini('school', { t: 'Vakanties van uw regio', d: { regio: 1, sj: 0, vak: 0 }, e: 'Voorbeeld: herfstvakantie 2026 in regio Midden' })}
<p>Alle data van dit schooljaar staan op ${h.a('schoolvakanties-2026-2027', 'schoolvakanties 2026-2027')}.</p>`,
  },
  en: {
    slug: 'school-holiday-region', nav: 'Region of your town', card: 'North, Central or South: look up your municipality',
    title: 'School holiday region Netherlands: North, Central or South',
    description: "Which Dutch school holiday region is your municipality in: North, Central or South? Pick province and town and see your breaks, with all the exceptions.",
    h1: 'School holiday region: North, Central or South?',
    intro: 'Your school holiday region depends on your municipality; in Gelderland, Utrecht, Flevoland and North Brabant the province alone is not enough.',
    resume: `The Dutch government splits the country into three regions for school holidays. For most provinces it is simple. North: ${per('noord').join(', ')}. Central: ${per('midden').join(', ')}. South: ${per('zuid').join(', ')}. Four provinces have exceptions. In Flevoland, Zeewolde belongs to Central. In Utrecht, Eemnes and the former municipality of Abcoude (De Ronde Venen) belong to North. In Noord-Brabant, Altena belongs to Central, except the villages of Hank and Dussen. Gelderland is split by municipality: ${N(gN, 'en')} municipality in North, ${N(gM, 'en')} in Central and ${N(gZ, 'en')} in South, and two municipalities are even split by former municipality. The region mainly sets the autumn, spring and summer breaks; Christmas and May are the same everywhere. In 2027 summer starts on ${D(zomer[0].van, 'en')} in the North, ${D(zomer[1].van, 'en')} in Central and ${D(zomer[2].van, 'en')} in the South.`,
    faqs: [
      { q: 'Which region is Gelderland in?', a: `Gelderland is split across three regions: ${N(gM, 'en')} municipalities are in Central, ${N(gZ, 'en')} in South (including Arnhem and Nijmegen) and ${N(gN, 'en')} in North (Hattem). Pick your municipality in the tool above and you immediately see the region and all its school breaks.` },
      { q: 'Is Utrecht in the Central region?', a: 'Yes, the province of Utrecht is in the Central region, except Eemnes and the former municipality of Abcoude (now part of De Ronde Venen), which are in the North region. The North breaks apply there. The tool above takes these exceptions into account.' },
      { q: 'What if my child goes to school in another region?', a: 'Then the breaks of the region where the school is apply, not those of your home town. This often happens in border municipalities and with secondary schools in another town. If your children attend schools in different regions, their autumn, spring and summer breaks may not coincide. Check the school guide.' },
    ],
    body: (h) => `<h2>School holiday region by province</h2>
${h.table(['Province', 'Region', 'Exceptions'], K.PROVINCIE_NAMEN.map((p) => [p, P[p].regio ? h.REGIO_NAAM[P[p].regio!].en : 'by municipality', P[p].uitzonderingen ? Object.entries(P[p].uitzonderingen!).map(([r, g]) => `${(g as string[]).join(', ')} → ${h.REGIO_KORT[r as 'noord'].en}`).join('; ') : P[p].gemeenten ? `${N(gN, 'en')} North, ${N(gM, 'en')} Central, ${N(gZ, 'en')} South` : '–']), 'Regions according to the Dutch government', ['l', 'l', 'l'])}
<p>Source: the ${h.src('rijks-regios', "government's regional split")}, copied as published, including villages and former municipalities listed separately. Municipal mergers can change the list; the government then updates its overview.</p>
<h2>What the region changes</h2>
<p>In school year 2026-2027 the autumn break starts a week earlier in the North, the spring break a week earlier in the South and summer two weeks earlier in the North than in the South. In 2027-2028 the summer order differs; see ${h.a('schoolvakanties-2027-2028', 'school holidays 2027-2028')}.</p>
${h.mini('school', { t: 'Breaks for your region', d: { regio: 1, sj: 0, vak: 0 }, e: 'Example: autumn break 2026 in the Central region' })}
<p>All dates of this school year are on ${h.a('schoolvakanties-2026-2027', 'school holidays 2026-2027')}.</p>`,
  },
});
