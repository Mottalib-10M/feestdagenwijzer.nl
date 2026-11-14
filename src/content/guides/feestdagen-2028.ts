/** Feestdagen 2028: schrikkeljaar, Nieuwjaarsdag op zaterdag, Kerst op maandag en dinsdag, late Pinksteren. */
import { defineGuide } from '../../lib/page-types';
import { K, D, DW, WD, SPAN, N, F, opWeek, inWeekend, WERK, BD, OPT, vijfMei } from '../_k';

const Y = 2028;
const wk = opWeek(Y), weg = inWeekend(Y), bd = BD(Y), werk = WERK(Y), p3 = OPT(Y, 3);
const nj = F('nieuwjaarsdag', Y), kd = F('koningsdag', Y), bv = F('bevrijdingsdag', Y), hv = F('hemelvaartsdag', Y);
const ps = F('eerste-paasdag', Y), pi = F('eerste-pinksterdag', Y), pi2 = F('tweede-pinksterdag', Y), k1 = F('eerste-kerstdag', Y), k2 = F('tweede-kerstdag', Y);
const kerst = p3.blokken.find((b) => b.feestdagen.includes('eerste-kerstdag'))!;
const wk27 = opWeek(2027).length;
const kb = bd.find((b) => b.feestdagen.includes('koningsdag'))!;

export default defineGuide({
  id: 'feestdagen-2028', group: 'feestdagen', order: 1, tool: 'ft', toolArg: { jaar: Y },
  related: ['brugdagen-2028', 'feestdagen-2029', 'schoolvakanties-2027-2028', 'ben-ik-vrij'],
  sources: ['rijks-feestdagen', 'gov-feestdagen-en', 'rijks-goede-vrijdag', 'rijks-bevrijdingsdag'],
  nl: {
    slug: 'feestdagen-2028', nav: 'Feestdagen 2028', card: `${N(wk.length, 'nl')} vrije weekdagen, Kerst op maandag en dinsdag`,
    title: 'Feestdagen 2028: alle datums, weekdagen en brugdagen',
    description: "Feestdagen 2028 in Nederland: Pasen 16 april, Koningsdag op donderdag, Hemelvaart 25 mei, Kerst op maandag en dinsdag. 6 vrije weekdagen en 254 werkdagen.",
    h1: 'Feestdagen 2028 in Nederland',
    intro: `De feestdagen 2028 geven ${N(wk.length, 'nl')} vrije weekdagen, een meer dan in 2027, omdat Kerst weer door de week valt.`,
    resume: `In ${Y} vallen de elf officiële feestdagen gunstiger dan in 2027. Alleen Nieuwjaarsdag gaat verloren: ${DW(nj, 'nl')}. Pasen valt laat, op ${D(ps, 'nl')}, en daardoor schuift alles mee: Hemelvaart is pas op ${D(hv, 'nl')} en Pinksteren op ${D(pi, 'nl')} en ${D(pi2, 'nl')}, al in juni. Koningsdag valt op ${DW(kd, 'nl')}. ${vijfMei(Y, 'nl')} Eerste en Tweede Kerstdag vallen op maandag en dinsdag. Samen levert dat bij de gangbare afspraken ${N(wk.length, 'nl')} vrije weekdagen op, tegen ${N(wk27, 'nl')} in 2027. ${Y} is een schrikkeljaar met ${N(K.weekdagen(Y), 'nl')} weekdagen; daarvan blijven er ${N(werk, 'nl')} werkdagen over. De rijkste brug van het jaar is de week tussen Kerst en Oud en Nieuw.`,
    faqs: [
      { q: 'Valt Kerst 2028 op een werkdag?', a: `Ja: Eerste Kerstdag is ${DW(k1, 'nl')}, Tweede Kerstdag ${DW(k2, 'nl')}. Dat levert twee vrije dagen door de week op, anders dan in ${Y - 1}. Met ${N(kerst.verlof, 'nl')} verlofdagen, van ${D(kerst.verlofVan, 'nl')} tot ${D(kerst.verlofTot, 'nl')}, bent u ${N(kerst.vrij, 'nl')} dagen vrij, tot en met Nieuwjaarsdag 2029.` },
      { q: 'Waarom is Pinksteren 2028 zo laat?', a: `Omdat Pasen laat valt, op ${D(ps, 'nl')}. Pinksteren volgt altijd zeven weken na Pasen, en Hemelvaart 39 dagen na Pasen. In 2027 viel Pasen op ${D(F('eerste-paasdag', 2027), 'nl')}, bijna drie weken eerder. De paasdatum volgt uit de berekening van Gauss, die op de methodepagina staat uitgelegd.` },
      { q: 'Is 2028 een schrikkeljaar?', a: `Ja. Februari ${Y} heeft 29 dagen, dus het jaar telt 366 dagen. Dat voegt hier een weekdag toe: ${Y} telt ${N(K.weekdagen(Y), 'nl')} weekdagen van maandag tot en met vrijdag. Voor wie per maand betaald krijgt, verandert er niets; voor wie per dag werkt, telt die extra dag wel mee.` },
    ],
    body: (h) => `<h2>Feestdagen 2028 met weekdag</h2>
${h.table(['Feestdag', 'Datum', 'Weekdag'], h.officieel(Y).map((f) => [f.name.nl, h.day(f.date), h.wd(f.date)]), `De elf officiële feestdagen van ${Y}`, ['l', 'l', 'l'])}
<p>Weg in het weekend: ${weg.map((f) => `${f.name.nl} (${h.wd(f.date)})`).join(', ')}. Een vervangende dag kent Nederland niet. De Rijksoverheid publiceert de lijst per jaar; voor ${Y} staat ze er nog niet, maar elke datum volgt uit vaste regels: vaste data voor Nieuwjaar, Koningsdag, 5 mei en Kerst, en de paasdatum voor de rest. De ${h.a('method', 'methode')} legt dat uit.</p>
<h2>Bruggen rond Koningsdag en Hemelvaart</h2>
<p>De echte brugdagen van ${Y} zijn ${bd.map((b) => `${h.wd(b.verlofVan)} ${h.day(b.verlofVan)}`).join(' en ')}. Koningsdag op ${h.wd(kd)} maakt van ${h.wday(kb.verlofVan)} een brug. ${vijfMei(Y, 'nl')} Hemelvaart op ${h.day(hv)} geeft de tweede brug.</p>
${h.mini('brug', { t: 'Uw verlof in 2028', d: { verlof: 3, jaar: 2028 }, e: 'Voorbeeld met 3 verlofdagen in 2028' })}
<p>Alle combinaties rekent de ${h.a('brugdagen-2028', 'brugdagenplanner 2028')} door. De schoolvakanties van het schooljaar staan op ${h.a('schoolvakanties-2027-2028', 'schoolvakanties 2027-2028')}.</p>`,
  },
  en: {
    slug: 'public-holidays-2028', nav: 'Public holidays 2028', card: `${N(wk.length, 'en')} weekday holidays, Christmas on Monday and Tuesday`,
    title: 'Public holidays 2028 Netherlands: dates, weekdays, bridges',
    description: "Public holidays 2028 in the Netherlands: Easter 16 April, King's Day on a Thursday, Ascension 25 May, Christmas on Mon and Tue. 254 working days in all.",
    h1: 'Public holidays 2028 in the Netherlands',
    intro: `The 2028 public holidays give ${N(wk.length, 'en')} weekday days off, one more than 2027, because Christmas falls midweek again.`,
    resume: `In ${Y} the eleven official holidays fall better than in 2027. Only New Year's Day is lost: ${DW(nj, 'en')}. Easter is late, on ${D(ps, 'en')}, and everything shifts with it: Ascension is not until ${D(hv, 'en')} and Whitsun falls on ${D(pi, 'en')} and ${D(pi2, 'en')}, already in June. King's Day is ${DW(kd, 'en')}. ${vijfMei(Y, 'en')} Christmas Day and Boxing Day fall on Monday and Tuesday. Under common agreements that gives ${N(wk.length, 'en')} weekday days off, against ${N(wk27, 'en')} in 2027. ${Y} is a leap year with ${N(K.weekdagen(Y), 'en')} weekdays, leaving ${N(werk, 'en')} working days. The richest bridge of the year is the week between Christmas and New Year.`,
    faqs: [
      { q: 'Does Christmas 2028 fall on a working day?', a: `Yes: Christmas Day is ${DW(k1, 'en')}, Boxing Day ${DW(k2, 'en')}. That gives two weekday days off, unlike ${Y - 1}. With ${N(kerst.verlof, 'en')} leave days, ${D(kerst.verlofVan, 'en')} to ${D(kerst.verlofTot, 'en')}, you are off ${N(kerst.vrij, 'en')} days, through New Year's Day 2029.` },
      { q: 'Why is Whitsun 2028 so late?', a: `Because Easter is late, on ${D(ps, 'en')}. Whitsun always follows seven weeks after Easter, and Ascension 39 days after Easter. In 2027 Easter fell on ${D(F('eerste-paasdag', 2027), 'en')}, nearly three weeks earlier. The Easter date follows from Gauss's calculation, explained on the method page.` },
      { q: 'Is 2028 a leap year?', a: `Yes. February ${Y} has 29 days, so the year has 366 days. Here that adds a weekday: ${Y} has ${N(K.weekdagen(Y), 'en')} weekdays from Monday to Friday. For people paid by the month nothing changes; for people paid by the day, the extra day does count.` },
    ],
    body: (h) => `<h2>Public holidays 2028 with weekdays</h2>
${h.table(['Holiday', 'Date', 'Weekday'], h.officieel(Y).map((f) => [f.name.en, h.day(f.date), h.wd(f.date)]), `The eleven official holidays of ${Y}`, ['l', 'l', 'l'])}
<p>Lost at the weekend: ${weg.map((f) => `${f.name.en} (${h.wd(f.date)})`).join(', ')}. The Netherlands has no substitute day. The government publishes the list year by year and has not yet done so for ${Y}, but every date follows fixed rules: fixed dates for New Year, King's Day, 5 May and Christmas, and the Easter date for the rest. The ${h.a('method', 'method')} explains how.</p>
<h2>Bridges around King's Day and Ascension</h2>
<p>The true bridge days of ${Y} are ${bd.map((b) => `${h.wd(b.verlofVan)} ${h.day(b.verlofVan)}`).join(' and ')}. King's Day on a ${h.wd(kd)} makes ${h.wday(kb.verlofVan)} a bridge. ${vijfMei(Y, 'en')} Ascension on ${h.day(hv)} gives the second bridge.</p>
${h.mini('brug', { t: 'Your leave in 2028', d: { verlof: 3, jaar: 2028 }, e: 'Example with 3 leave days in 2028' })}
<p>The ${h.a('brugdagen-2028', '2028 bridge-day planner')} works through every combination. School breaks for the school year are on ${h.a('schoolvakanties-2027-2028', 'school holidays 2027-2028')}.</p>`,
  },
});
