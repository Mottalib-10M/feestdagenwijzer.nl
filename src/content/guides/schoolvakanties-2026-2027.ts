/** Schoolvakanties 2026-2027 per regio: data, adviesdata, verschillen tussen Noord, Midden en Zuid, feestdagen in de vakanties. */
import { defineGuide } from '../../lib/page-types';
import { K, D, DW, PER, N, F } from '../_k';
import type { Lang } from '../../lib/format';

const SJ = 2026;
const R = ['noord', 'midden', 'zuid'] as const;
const k = Object.fromEntries(R.map((r) => [r, K.kalender(SJ, r)!])) as Record<(typeof R)[number], NonNullable<ReturnType<typeof K.kalender>>>;
const zomerDagen = R.map((r) => K.dagen(k[r].zomer));
const naam = (v: 'herfst' | 'kerst' | 'voorjaar' | 'mei' | 'zomer', l: Lang) => K.VAK_NAAM[v][l];
const rij = (l: Lang) => K.VAKS.map((v) => [naam(v, l), ...R.map((r) => PER(k[r][v], l))]);

export default defineGuide({
  id: 'schoolvakanties-2026-2027', group: 'school', order: 15, tool: 'sv', toolArg: { sj: SJ },
  related: ['schoolvakanties-2027-2028', 'regio-schoolvakantie', 'brugdagen-2027', 'kalender-2027'],
  sources: ['rijks-sv-2026', 'rijks-regios', 'rijks-feestdagen'],
  nl: {
    slug: 'schoolvakanties-2026-2027', nav: 'Schoolvakanties 2026-2027', card: `Zomer 2027 vanaf ${D(k.noord.zomer.van, 'nl')} (Noord)`,
    title: "Schoolvakanties 2026-2027: data voor Noord, Midden, Zuid",
    description: `Schoolvakanties 2026-2027 per regio: meivakantie ${PER(k.midden.mei, 'nl')} overal, zomervakantie 2027 vanaf ${D(k.noord.zomer.van, 'nl')} in Noord. Met adviesdata en feestdagen.`,
    h1: 'Schoolvakanties 2026-2027 per regio',
    intro: `De schoolvakanties 2026-2027 eindigen met de zomervakantie, die in Noord begint op ${DW(k.noord.zomer.van, 'nl')}, in Midden een week later en in Zuid twee weken later.`,
    resume: `Voor de schoolvakanties is Nederland verdeeld in drie regio’s, Noord, Midden en Zuid, zodat niet het hele land tegelijk op pad gaat. In schooljaar 2026-2027 vallen de kerstvakantie (${PER(k.midden.kerst, 'nl')}) en de meivakantie (${PER(k.midden.mei, 'nl')}) overal tegelijk. De herfstvakantie begint in Noord een week eerder dan in Midden en Zuid; de voorjaarsvakantie begint juist in Zuid een week eerder. De zomervakantie van 2027 schuift per regio een week op: Noord van ${PER(k.noord.zomer, 'nl')}, Midden van ${PER(k.midden.zomer, 'nl')} en Zuid van ${PER(k.zuid.zomer, 'nl')}. De herfst- en voorjaarsvakantie zijn adviesdata van het ministerie van Onderwijs (OCW): scholen mogen ervan afwijken, de schoolgids beslist. Scholen mogen ook een tweede week meivakantie geven; de adviesweek is ${PER(k.midden.adviesMei, 'nl')}. Koningsdag (${D(F('koningsdag', 2027), 'nl')}) valt in de meivakantie.`,
    faqs: [
      { q: 'Wanneer is de meivakantie 2027?', a: `In alle drie de regio’s van ${PER(k.midden.mei, 'nl')}. Koningsdag valt erin. Scholen mogen er een week aan toevoegen; die adviesweek loopt van ${PER(k.midden.adviesMei, 'nl')}. Of uw school twee weken vrij geeft, staat in de schoolgids. Ouders plannen hun verlof dus het best pas na het lezen daarvan.` },
      { q: 'Wanneer begint de zomervakantie 2027?', a: `Noord: ${DW(k.noord.zomer.van, 'nl')}. Midden: ${DW(k.midden.zomer.van, 'nl')}. Zuid: ${DW(k.zuid.zomer.van, 'nl')}. De zomervakantie duurt overal zes weken, maar de regio’s beginnen om beurten eerder of later, zodat niet het hele land tegelijk op vakantie gaat. Kies uw regio in de rekenhulp om de datums te zien.` },
      { q: 'Mag een school van deze data afwijken?', a: 'Bij de herfst- en voorjaarsvakantie wel: de overheid geeft daarvoor adviesdata, en scholen mogen in overleg een andere week kiezen. De zomervakantie ligt vaster. Scholen voegen daarnaast vaak studiedagen toe. Kijk voor de exacte data van uw school daarom altijd in de schoolgids of op de website van de school.' },
    ],
    body: (h) => `<h2>Schoolvakanties 2026-2027 naast elkaar</h2>
${h.table(['Vakantie', 'Noord', 'Midden', 'Zuid'], rij('nl'), 'Schoolvakanties 2026-2027 per regio, zoals de Rijksoverheid ze publiceert', ['l', 'l', 'l', 'l'])}
<p>Bron: ${h.src('rijks-sv-2026', 'overzicht schoolvakanties 2026-2027')}. De zomervakantie duurt overal ${N(zomerDagen[0], 'nl')} dagen, zes weken plus het weekend ervoor. Welke regio voor uw gemeente geldt, staat in de ${h.src('rijks-regios', 'regio-indeling')}; de ${h.a('regio-schoolvakantie', 'regiozoeker')} zoekt het voor u op.</p>
<h2>Feestdagen in de schoolvakanties 2026-2027</h2>
<p>Kerst en Nieuwjaarsdag vallen in de kerstvakantie, Koningsdag in de meivakantie. Goede Vrijdag (${h.day(F('goede-vrijdag', 2027))}) en Tweede Paasdag (${h.day(F('tweede-paasdag', 2027))}) liggen erbuiten; scholen zijn dan meestal dicht. Hemelvaart (${h.day(F('hemelvaartsdag', 2027))}) valt alleen in de vakantie als uw school de adviesweek neemt.</p>
${h.mini('school', { t: 'Vakantie 2026-2027 in uw regio', d: { regio: 2, sj: 0, vak: 2 }, e: 'Voorbeeld: voorjaarsvakantie in regio Zuid' })}
<p>Ouders die verlof willen afstemmen op de vakanties, vinden de bruggen op ${h.a('brugdagen-2027', 'brugdagen 2027')}.</p>`,
  },
  en: {
    slug: 'school-holidays-2026-2027', nav: 'School holidays 2026-2027', card: `Summer 2027 from ${D(k.noord.zomer.van, 'en')} (North)`,
    title: "School holidays 2026-2027 Netherlands: North, Central, South",
    description: "Dutch school holidays 2026-2027 by region: May break 24 April – 2 May everywhere, summer 2027 from 10 July in the North. With advisory dates and holidays.",
    h1: 'School holidays 2026-2027 by region',
    intro: `The 2026-2027 school holidays end with summer, starting ${DW(k.noord.zomer.van, 'en')} in the North, a week later in Central and two weeks later in the South.`,
    resume: `For school holidays the Netherlands is divided into three regions, North, Central and South, so the whole country does not travel at once. In school year 2026-2027 the Christmas break (${PER(k.midden.kerst, 'en')}) and the May break (${PER(k.midden.mei, 'en')}) fall at the same time everywhere. The autumn break starts a week earlier in the North than in Central and South; the spring break starts a week earlier in the South. Summer 2027 shifts a week per region: North ${PER(k.noord.zomer, 'en')}, Central ${PER(k.midden.zomer, 'en')} and South ${PER(k.zuid.zomer, 'en')}. Autumn and spring dates are advisory dates from the Ministry of Education (OCW): schools may deviate, and the school guide decides. Schools may also add a second May week; the advisory week is ${PER(k.midden.adviesMei, 'en')}. King's Day (${D(F('koningsdag', 2027), 'en')}) falls in the May break.`,
    faqs: [
      { q: 'When is the May break 2027?', a: `In all three regions ${PER(k.midden.mei, 'en')}. King's Day falls inside it. Schools may add a week; that advisory week runs ${PER(k.midden.adviesMei, 'en')}. Whether your school gives two weeks off is in the school guide. Parents are best off planning leave only after reading it.` },
      { q: 'When does the 2027 summer break start?', a: `North: ${DW(k.noord.zomer.van, 'en')}. Central: ${DW(k.midden.zomer.van, 'en')}. South: ${DW(k.zuid.zomer.van, 'en')}. The summer break lasts six weeks everywhere, but the regions take turns starting earlier or later, so the whole country is not on holiday at once. Pick your region in the tool to see the dates.` },
      { q: 'May a school deviate from these dates?', a: 'For the autumn and spring breaks, yes: the government gives advisory dates, and schools may choose another week after consultation. The summer break is more fixed. Schools also often add study days. So always check your own school’s guide or website for its exact dates.' },
    ],
    body: (h) => `<h2>School holidays 2026-2027 side by side</h2>
${h.table(['Break', 'North', 'Central', 'South'], rij('en'), 'Dutch school holidays 2026-2027 by region, as published by the government', ['l', 'l', 'l', 'l'])}
<p>Source: ${h.src('rijks-sv-2026', 'school holidays overview 2026-2027')}. Summer lasts ${N(zomerDagen[0], 'en')} days everywhere, six weeks plus the weekend before. Which region your municipality is in is set out in the ${h.src('rijks-regios', 'regional split')}; the ${h.a('regio-schoolvakantie', 'region finder')} looks it up for you.</p>
<h2>Public holidays inside the 2026-2027 school breaks</h2>
<p>Christmas and New Year's Day fall in the Christmas break, King's Day in the May break. Good Friday (${h.day(F('goede-vrijdag', 2027))}) and Easter Monday (${h.day(F('tweede-paasdag', 2027))}) fall outside; schools usually close then. Ascension (${h.day(F('hemelvaartsdag', 2027))}) only falls in the break if your school takes the advisory week.</p>
${h.mini('school', { t: 'Your 2026-2027 break by region', d: { regio: 2, sj: 0, vak: 2 }, e: 'Example: spring break in the South region' })}
<p>Parents matching leave to the breaks will find the bridges on ${h.a('brugdagen-2027', 'bridge days 2027')}.</p>`,
  },
});
