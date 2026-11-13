/** Kalender 2027: jaarkalender met weeknummers, feestdagen, brugdagen en schoolvakanties per regio, afdrukbaar. */
import { defineGuide } from '../../lib/page-types';
import { K, D, DW, N, F, opWeek, WERK, BD } from '../_k';

const Y = 2027;
const w1 = K.maandagVanWeek(Y, 1), wk = K.weeksInYear(Y), bd = BD(Y);
const kwHv = K.isoWeek(F('hemelvaartsdag', Y)).week, kwKd = K.isoWeek(F('koningsdag', Y)).week;
const zomer = (['noord', 'midden', 'zuid'] as const).map((r) => [r, K.kalender(2026, r)!.zomer] as const);

export default defineGuide({
  id: 'kalender-2027', group: 'verlof', order: 14, tool: 'kalender', toolArg: { jaar: Y },
  related: ['werkdagen-2027', 'brugdagen-2027', 'schoolvakanties-2026-2027', 'feestdagen-2028'],
  sources: ['rijks-feestdagen', 'gov-feestdagen-en', 'rijks-sv-2026', 'rijks-sv-2027'],
  nl: {
    slug: 'kalender-2027', nav: 'Kalender 2027', card: `Met weeknummers, feestdagen en schoolvakanties`,
    title: 'Kalender 2027 met weeknummers, feestdagen en vakanties',
    description: "Kalender 2027 met weeknummers, de officiële feestdagen, de brugdagen en de schoolvakanties van uw regio. Week 1 begint op maandag 4 januari. Om af te drukken.",
    h1: 'Kalender 2027 met feestdagen en schoolvakanties',
    intro: `Kalender 2027: ${N(wk, 'nl')} weken, week 1 begint op ${DW(w1, 'nl')}; kies uw regio voor de schoolvakanties.`,
    resume: `Deze jaarkalender zet twaalf maanden van ${Y} naast elkaar, met de weeknummers volgens ISO 8601, de internationale norm die in Nederland gebruikelijk is: een week begint op maandag en week 1 is de week met de eerste donderdag van het jaar. Daardoor begint week 1 van ${Y} op ${DW(w1, 'nl')}, en hoort vrijdag 1 januari nog bij de laatste week van 2026. Het jaar heeft ${N(wk, 'nl')} weken. In de kalender zijn de elf officiële feestdagen gekleurd, de ${N(bd.length, 'nl')} echte brugdagen gemarkeerd en de schoolvakanties van de gekozen regio ingekleurd. Koningsdag valt in week ${N(kwKd, 'nl')}, Hemelvaart in week ${N(kwHv, 'nl')}. De zomervakantie verschilt per regio en begint in Noord op ${D(zomer[0][1].van, 'nl')}, in Midden op ${D(zomer[1][1].van, 'nl')} en in Zuid op ${D(zomer[2][1].van, 'nl')}. Met de knop Afdrukken drukt u de twaalf maanden af zonder menu en voettekst.`,
    faqs: [
      { q: 'Hoeveel weken heeft 2027?', a: `${N(wk, 'nl')} weken volgens ISO 8601, de norm die in Nederland voor weeknummers geldt. Week 1 loopt van ${D(w1, 'nl')} tot en met ${D(K.plusDagen(w1, 6), 'nl')}. Koningsdag valt in week ${N(kwKd, 'nl')} en Hemelvaartsdag in week ${N(kwHv, 'nl')}. De kalender hierboven toont bij elke week het nummer.` },
      { q: `Waarom hoort 1 januari 2027 bij week ${N(K.isoWeek('2027-01-01').week, 'nl')}?`, a: `Volgens ISO 8601 is week 1 de week met de eerste donderdag van het jaar. 1 januari ${Y} is een vrijdag, dus die dag hoort nog bij de laatste week van 2026. Week 1 begint pas op maandag ${D(w1, 'nl')}. Agenda’s die met zondag beginnen, kunnen hier andere weeknummers tonen.` },
      { q: 'Kan ik de kalender afdrukken?', a: 'Ja, met de knop Afdrukken in de rekenhulp. Menu en voettekst vallen dan weg en de twaalf maanden passen in drie kolommen. Kies eerst uw regio, dan staan de schoolvakanties van die regio erop. Zet de brugdagen aan als u ook uw verlofdagen op papier wilt zien.' },
    ],
    body: (h) => `<h2>Kalender 2027: wat er in staat</h2>
<p>De kalender hierboven rekent alles in uw browser. Feestdagen volgen de ${h.src('rijks-feestdagen', 'lijst van de Rijksoverheid')}; schoolvakanties de ${h.src('rijks-sv-2026', 'overzichten per schooljaar')}, voor januari tot juli uit schooljaar 2026-2027 en voor augustus tot december uit 2027-2028. De brugdagen zijn de werkdagen tussen een vrije feestdag en het weekend.</p>
<h2>Weeknummers 2027 van de feestdagen</h2>
${h.table(['Feestdag', 'Datum', 'Week'], h.officieel(Y).map((f) => [f.name.nl, h.day(f.date), h.isoWeek(f.date).week]), `ISO-weeknummers van de feestdagen in ${Y}`, ['l', 'l', 'r'])}
${h.mini('school', { t: 'Wanneer is de vakantie in uw regio?', d: { regio: 0, sj: 0, vak: 4 }, e: 'Voorbeeld: zomervakantie 2027 in regio Noord' })}
<p>Werkdagen per maand staan op ${h.a('werkdagen-2027', 'werkdagen 2027')}.</p>`,
  },
  en: {
    slug: 'calendar-2027', nav: 'Calendar 2027', card: 'With week numbers, holidays and school breaks',
    title: 'Calendar 2027 Netherlands with week numbers and holidays',
    description: "Calendar 2027 with week numbers, the official Dutch holidays, bridge days and the school breaks of your region. Week 1 starts on Monday 4 January. Printable.",
    h1: 'Calendar 2027 with Dutch holidays and school breaks',
    intro: `Calendar 2027: ${N(wk, 'en')} weeks, week 1 starts on ${DW(w1, 'en')}; pick your region for the school breaks.`,
    resume: `This year calendar sets the twelve months of ${Y} side by side, with week numbers under ISO 8601, the international standard used in the Netherlands: weeks start on Monday and week 1 is the week with the year's first Thursday. So week 1 of ${Y} starts on ${DW(w1, 'en')}, and Friday 1 January still belongs to the last week of 2026. The year has ${N(wk, 'en')} weeks. The eleven official holidays are coloured, the ${N(bd.length, 'en')} true bridge days marked and the school breaks of the chosen region shaded. King's Day falls in week ${N(kwKd, 'en')}, Ascension in week ${N(kwHv, 'en')}. The summer break differs by region and starts on ${D(zomer[0][1].van, 'en')} in the North, ${D(zomer[1][1].van, 'en')} in Central and ${D(zomer[2][1].van, 'en')} in the South. The Print button prints the twelve months without menu and footer.`,
    faqs: [
      { q: 'How many weeks does 2027 have?', a: `${N(wk, 'en')} weeks under ISO 8601, the standard used for week numbers in the Netherlands. Week 1 runs from ${D(w1, 'en')} to ${D(K.plusDagen(w1, 6), 'en')}. King's Day is in week ${N(kwKd, 'en')} and Ascension Day in week ${N(kwHv, 'en')}. The calendar above shows the number next to every week.` },
      { q: `Why is 1 January 2027 in week ${N(K.isoWeek('2027-01-01').week, 'en')}?`, a: `Under ISO 8601, week 1 is the week with the first Thursday of the year. 1 January ${Y} is a Friday, so it still belongs to the last week of 2026. Week 1 only starts on Monday ${D(w1, 'en')}. Calendars that start on Sunday may show different week numbers here.` },
      { q: 'Can I print the calendar?', a: 'Yes, with the Print button in the tool. Menu and footer drop out and the twelve months fit in three columns. Pick your region first so its school breaks are printed. Switch the bridge days on if you also want your leave days on paper.' },
    ],
    body: (h) => `<h2>Calendar 2027: what it shows</h2>
<p>The calendar above runs entirely in your browser. Holidays follow the ${h.src('gov-feestdagen-en', 'government list')}; school breaks the ${h.src('rijks-sv-2026', 'overviews per school year')}, January to July from 2026-2027 and August to December from 2027-2028. Bridge days are working days between a holiday off and the weekend.</p>
<h2>Week numbers of the 2027 holidays</h2>
${h.table(['Holiday', 'Date', 'Week'], h.officieel(Y).map((f) => [f.name.en, h.day(f.date), h.isoWeek(f.date).week]), `ISO week numbers of the holidays in ${Y}`, ['l', 'l', 'r'])}
${h.mini('school', { t: 'When is the break in your region?', d: { regio: 0, sj: 0, vak: 4 }, e: 'Example: summer break 2027 in the North region' })}
<p>Working days by month are on ${h.a('werkdagen-2027', 'working days 2027')}.</p>`,
  },
});
