/** Schoolvakanties 2027-2028 per regio: kerstvakantie vanaf Eerste Kerstdag, meivakantie met 5 mei, zomer 2028 per regio. */
import { defineGuide } from '../../lib/page-types';
import { K, D, DW, PER, N, F } from '../_k';
import type { Lang } from '../../lib/format';

const SJ = 2027;
const R = ['noord', 'midden', 'zuid'] as const;
const k = Object.fromEntries(R.map((r) => [r, K.kalender(SJ, r)!])) as Record<(typeof R)[number], NonNullable<ReturnType<typeof K.kalender>>>;
const vorig = K.kalender(2026, 'noord')!;
const kd = F('koningsdag', 2028), bv = F('bevrijdingsdag', 2028), hv = F('hemelvaartsdag', 2028);
const rij = (l: Lang) => K.VAKS.map((v) => [K.VAK_NAAM[v][l], ...R.map((r) => PER(k[r][v], l))]);
const eerst = R.reduce((a, r) => (k[r].zomer.van < k[a].zomer.van ? r : a), 'noord' as (typeof R)[number]);
const laatst = R.reduce((a, r) => (k[r].zomer.van > k[a].zomer.van ? r : a), 'noord' as (typeof R)[number]);

export default defineGuide({
  id: 'schoolvakanties-2027-2028', group: 'school', order: 16, tool: 'sv', toolArg: { sj: SJ },
  related: ['schoolvakanties-2026-2027', 'regio-schoolvakantie', 'brugdagen-2028', 'feestdagen-2028'],
  sources: ['rijks-sv-2027', 'rijks-regios', 'rijks-feestdagen'],
  nl: {
    slug: 'schoolvakanties-2027-2028', nav: 'Schoolvakanties 2027-2028', card: `Zomer 2028 eerst in ${K.REGIO_NAAM[eerst].nl}`,
    title: 'Schoolvakanties 2027-2028: data per regio en feestdagen',
    description: "Schoolvakanties 2027-2028: kerstvakantie 25 december – 9 januari, meivakantie 29 april – 7 mei, zomer 2028 eerst in regio Midden. Alle data per regio.",
    h1: 'Schoolvakanties 2027-2028 per regio',
    intro: `De schoolvakanties 2027-2028 beginnen met de herfstvakantie op ${D(k.noord.herfst.van, 'nl')} in Noord en Midden; in de zomer van 2028 is ${K.REGIO_NAAM[eerst].nl} als eerste vrij.`,
    resume: `In schooljaar 2027-2028 draait de volgorde van de zomervakantie: ${K.REGIO_NAAM[eerst].nl} begint als eerste, op ${D(k[eerst].zomer.van, 'nl')}, en ${K.REGIO_NAAM[laatst].nl} als laatste, op ${D(k[laatst].zomer.van, 'nl')}. Een jaar eerder begon Noord nog op ${D(vorig.zomer.van, 'nl')}. De herfstvakantie valt in Noord en Midden van ${PER(k.noord.herfst, 'nl')}, in Zuid een week later. De kerstvakantie begint in alle regio’s op Eerste Kerstdag zelf, ${DW(k.midden.kerst.van, 'nl')}, en loopt tot ${D(k.midden.kerst.tot, 'nl')}. De voorjaarsvakantie valt in Noord een week vroeger dan in Midden en Zuid. De meivakantie, ${PER(k.midden.mei, 'nl')}, is overal gelijk en bevat Bevrijdingsdag op ${DW(bv, 'nl')}. Koningsdag, ${DW(kd, 'nl')}, valt net ervoor, in de adviesweek van ${PER(k.midden.adviesMei, 'nl')} die scholen mogen toevoegen. Herfst- en voorjaarsvakantie zijn adviesdata van het ministerie van Onderwijs (OCW).`,
    faqs: [
      { q: 'Wanneer is de kerstvakantie 2027?', a: `In alle drie de regio’s van ${PER(k.midden.kerst, 'nl')}. De vakantie begint op Eerste Kerstdag zelf, ${DW(k.midden.kerst.van, 'nl')}. Net als de meivakantie is de kerstvakantie in het hele land gelijk. Omdat beide Kerstdagen in 2027 in het weekend vallen, levert Kerst werkende ouders dat jaar geen extra vrije dagen op.` },
      { q: 'Wanneer is de zomervakantie 2028?', a: `Noord: ${PER(k.noord.zomer, 'nl')}. Midden: ${PER(k.midden.zomer, 'nl')}. Zuid: ${PER(k.zuid.zomer, 'nl')}. Elke regio heeft zes weken; de volgorde wisselt per jaar, zodat niet het hele land tegelijk vertrekt. In 2028 is ${K.REGIO_NAAM[eerst].nl} als eerste vrij en ${K.REGIO_NAAM[laatst].nl} als laatste.` },
      { q: 'Valt Koningsdag 2028 in de meivakantie?', a: `Niet in de vaste meivakantie (${PER(k.midden.mei, 'nl')}), wel in de adviesweek ervoor. Neemt uw school die adviesweek, dan zijn de kinderen ook op Koningsdag, ${D(kd, 'nl')}, vrij. Neemt de school die week niet, kijk dan in de schoolgids of Koningsdag een vrije dag is.` },
    ],
    body: (h) => `<h2>Schoolvakanties 2027-2028 per regio</h2>
${h.table(['Vakantie', 'Noord', 'Midden', 'Zuid'], rij('nl'), 'Schoolvakanties 2027-2028, zoals de Rijksoverheid ze publiceert', ['l', 'l', 'l', 'l'])}
<p>Bron: ${h.src('rijks-sv-2027', 'overzicht schoolvakanties 2027-2028')}. Scholen kunnen bij de herfst- en voorjaarsvakantie afwijken; de schoolgids heeft het laatste woord.</p>
<h2>Feestdagen in en rond de vakanties van 2027-2028</h2>
<p>Hemelvaart 2028 valt op ${h.day(hv)}, drie weken na de meivakantie; de vrijdag erna is een brugdag. Pinksteren valt in juni, ${h.day(F('eerste-pinksterdag', 2028))} en ${h.day(F('tweede-pinksterdag', 2028))}. Wie in 2028 verlof wil nemen naast de meivakantie, kijkt op ${h.a('brugdagen-2028', 'brugdagen 2028')}.</p>
${h.mini('school', { t: 'Vakantie 2027-2028 in uw regio', d: { regio: 0, sj: 1, vak: 4 }, e: 'Voorbeeld: zomervakantie 2028 in regio Noord' })}
<p>Weet u niet in welke regio uw school valt? Gebruik de ${h.a('regio-schoolvakantie', 'regiozoeker')}.</p>`,
  },
  en: {
    slug: 'school-holidays-2027-2028', nav: 'School holidays 2027-2028', card: `Summer 2028 first in the ${K.REGIO_NAAM[eerst].en}`,
    title: 'School holidays 2027-2028 Netherlands: dates by region',
    description: "Dutch school holidays 2027-2028: Christmas 25 December – 9 January, May break 29 April – 7 May, summer 2028 first in the Central region. All dates by region.",
    h1: 'School holidays 2027-2028 by region',
    intro: `The 2027-2028 school holidays start with the autumn break on ${D(k.noord.herfst.van, 'en')} in North and Central; in summer 2028 the ${K.REGIO_NAAM[eerst].en} goes first.`,
    resume: `In school year 2027-2028 the summer order turns around: the ${K.REGIO_NAAM[eerst].en} starts first, on ${D(k[eerst].zomer.van, 'en')}, and the ${K.REGIO_NAAM[laatst].en} last, on ${D(k[laatst].zomer.van, 'en')}. A year earlier the North still started on ${D(vorig.zomer.van, 'en')}. The autumn break runs ${PER(k.noord.herfst, 'en')} in North and Central and a week later in the South. The Christmas break starts on Christmas Day itself in every region, ${DW(k.midden.kerst.van, 'en')}, and runs to ${D(k.midden.kerst.tot, 'en')}. The spring break comes a week earlier in the North than in Central and South. The May break, ${PER(k.midden.mei, 'en')}, is the same everywhere and contains Liberation Day on ${DW(bv, 'en')}. King's Day, ${DW(kd, 'en')}, falls just before, in the advisory week of ${PER(k.midden.adviesMei, 'en')} that schools may add. Autumn and spring dates are advisory dates from the Ministry of Education (OCW).`,
    faqs: [
      { q: 'When is the Christmas break 2027?', a: `In all three regions ${PER(k.midden.kerst, 'en')}. The break starts on Christmas Day itself, ${DW(k.midden.kerst.van, 'en')}. Like the May break, the Christmas break is the same across the country. Because both Christmas days fall at the weekend in 2027, Christmas gives working parents no extra days off that year.` },
      { q: 'When is the summer break 2028?', a: `North: ${PER(k.noord.zomer, 'en')}. Central: ${PER(k.midden.zomer, 'en')}. South: ${PER(k.zuid.zomer, 'en')}. Each region has six weeks; the order rotates every year so the whole country does not leave at once. In 2028 the ${K.REGIO_NAAM[eerst].en} goes first and the ${K.REGIO_NAAM[laatst].en} last.` },
      { q: "Is King's Day 2028 in the May break?", a: `Not in the fixed May break (${PER(k.midden.mei, 'en')}), but in the advisory week before it. If your school takes that advisory week, children are off on King's Day, ${D(kd, 'en')}, too. If the school does not, check the school guide to see whether King's Day is a day off.` },
    ],
    body: (h) => `<h2>School holidays 2027-2028 by region</h2>
${h.table(['Break', 'North', 'Central', 'South'], rij('en'), 'Dutch school holidays 2027-2028, as published by the government', ['l', 'l', 'l', 'l'])}
<p>Source: ${h.src('rijks-sv-2027', 'school holidays overview 2027-2028')}. Schools may deviate for autumn and spring; the school guide has the final word.</p>
<h2>Public holidays in and around the 2027-2028 breaks</h2>
<p>Ascension 2028 falls on ${h.day(hv)}, three weeks after the May break; the Friday after is a bridge day. Whitsun falls in June, ${h.day(F('eerste-pinksterdag', 2028))} and ${h.day(F('tweede-pinksterdag', 2028))}. To take leave next to the May break in 2028, see ${h.a('brugdagen-2028', 'bridge days 2028')}.</p>
${h.mini('school', { t: 'Your 2027-2028 break by region', d: { regio: 0, sj: 1, vak: 4 }, e: 'Example: summer 2028 in the North region' })}
<p>Not sure which region your school is in? Use the ${h.a('regio-schoolvakantie', 'region finder')}.</p>`,
  },
});
