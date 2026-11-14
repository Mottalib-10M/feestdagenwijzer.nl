/** Brugdagen 2028: twee echte brugdagen, de kerstbrug van drie dagen voor tien dagen vrij, schrikkeljaar. */
import { defineGuide } from '../../lib/page-types';
import { K, D, DW, WD, SPAN, PER, N, F, OPT, BD, vijfMei } from '../_k';
import type { Lang } from '../../lib/format';

const Y = 2028;
const bd = BD(Y), alle = K.bruggen(Y);
const p3 = OPT(Y, 3), p5 = OPT(Y, 5), p9 = OPT(Y, 9);
const kerst = alle.find((b) => b.feestdagen.includes('eerste-kerstdag'))!;
const kd = F('koningsdag', Y), hv = F('hemelvaartsdag', Y), bv = F('bevrijdingsdag', Y);
const kb = bd.find((b) => b.feestdagen.includes('koningsdag'))!, hb = bd.find((b) => b.feestdagen.includes('hemelvaartsdag'))!;
const s27 = K.kalender(2027, 'midden')!;
const rij = (l: Lang, p: typeof p9) => p.blokken.map((b) => [SPAN(b.verlofVan, b.verlofTot, l), b.verlof, SPAN(b.vrijVan, b.vrijTot, l), b.vrij]);

export default defineGuide({
  id: 'brugdagen-2028', group: 'verlof', order: 11, tool: 'bt', toolArg: { jaar: Y, verlof: 3 },
  related: ['feestdagen-2028', 'brugdagen-2027', 'schoolvakanties-2027-2028', 'werkdagen-2027'],
  sources: ['rijks-feestdagen', 'rijks-bevrijdingsdag', 'rijks-sv-2027'],
  nl: {
    slug: 'brugdagen-2028', nav: 'Brugdagen 2028', card: `Kerst: ${N(kerst.verlof, 'nl')} verlofdagen = ${N(kerst.vrij, 'nl')} dagen vrij`,
    title: 'Brugdagen 2028: verlof plannen rond Kerst en Hemelvaart',
    description: "Brugdagen 2028: vrijdag 28 april en vrijdag 26 mei, plus Kerst met 3 verlofdagen voor 10 dagen vrij. De planner legt uw verlofdagen waar ze het meest opleveren.",
    h1: 'Brugdagen 2028: waar uw verlof het meest oplevert',
    intro: `De brugdagen 2028 zijn twee vrijdagen; de beste deal van het jaar is Kerst: ${N(kerst.verlof, 'nl')} verlofdagen voor ${N(kerst.vrij, 'nl')} dagen vrij.`,
    resume: `In ${Y} zijn er ${N(bd.length, 'nl')} echte brugdagen, allebei op vrijdag: ${DW(kb.verlofVan, 'nl')}, na Koningsdag op ${DW(kd, 'nl')}, en ${DW(hb.verlofVan, 'nl')}, na Hemelvaart. ${vijfMei(Y, 'nl')} Het meeste levert het einde van het jaar op. Eerste en Tweede Kerstdag vallen op maandag en dinsdag; neemt u woensdag tot en met vrijdag vrij, ${SPAN(kerst.verlofVan, kerst.verlofTot, 'nl')}, dan bent u met ${N(kerst.verlof, 'nl')} verlofdagen ${N(kerst.vrij, 'nl')} dagen vrij, tot en met Nieuwjaarsdag 2029. Over het jaar geven ${N(p3.verlof, 'nl')} verlofdagen zo ${N(p3.vrij, 'nl')} vrije dagen, ${N(p5.verlof, 'nl')} geven er ${N(p5.vrij, 'nl')} en ${N(p9.verlof, 'nl')} geven er ${N(p9.vrij, 'nl')}. ${Y} is een schrikkeljaar; dat verandert niets aan de bruggen.`,
    faqs: [
      { q: 'Wat is de beste brug van 2028?', a: `Per verlofdag de twee vrijdagen na een feestdag: één verlofdag voor vier dagen vrij. In totaal levert de week rond Kerst het meest op: ${N(kerst.verlof, 'nl')} verlofdagen voor ${N(kerst.vrij, 'nl')} dagen vrij achter elkaar. Dat komt doordat beide Kerstdagen in 2028 op een werkdag vallen.` },
      { q: 'Is vrijdag 5 mei 2028 vrij?', a: 'Het is Bevrijdingsdag, een officiële feestdag. Volgens de Rijksoverheid is niet iedereen dan vrij; kijk in uw cao of contract, of vraag het uw werkgever. Bent u vrij, dan kost het lange weekend rond 5 mei geen verlof. Scholen zijn op Bevrijdingsdag bijna altijd dicht.' },
      { q: 'Valt de kerstbrug 2028 in de schoolvakantie?', a: `Ja. De kerstvakantie ${Y}-${Y + 1} begint in alle regio’s op ${D(K.kalender(2028, 'midden')!.kerst.van, 'nl')}. Ouders die de kerstbrug nemen, zijn dus tegelijk met hun kinderen vrij. Omdat veel gezinnen dat doen, is het verstandig het verlof vroeg in het jaar aan te vragen.` },
    ],
    body: (h) => `<h2>Brugdagen 2028 in een plan van negen verlofdagen</h2>
${h.table(['Verlof nemen', 'Verlofdagen', 'Vrij op een rij', 'Vrije dagen'], rij('nl', p9), `Negen verlofdagen in ${Y}: ${N(p9.vrij, 'nl')} dagen vrij`, ['l', 'r', 'l', 'r'])}
<p>De kerstbrug staat bovenaan omdat drie verlofdagen er twee weekenden, twee Kerstdagen en Nieuwjaarsdag aan elkaar rijgen. Daarna volgen de twee vrijdagen en de week na Pasen. Pasen valt in ${Y} laat, op ${h.day(F('eerste-paasdag', Y))}, en de meivakantie loopt van ${h.per(s27.mei)}.</p>
<h2>Koningsdag op ${WD(kd, 'nl')}, 5 mei op ${WD(bv, 'nl')}</h2>
<p>Koningsdag valt op ${h.wday(kd)}. Met één verlofdag op ${h.wday(kb.verlofVan)} bent u ${N(kb.vrij, 'nl')} dagen achter elkaar vrij, ${SPAN(kb.vrijVan, kb.vrijTot, 'nl')}. ${vijfMei(Y, 'nl')} Of 5 mei vrij is, ${h.src('rijks-bevrijdingsdag', 'hangt af van uw cao')}.</p>
${h.mini('vrij', { t: `Bent u vrij op 5 mei ${Y}?`, d: { pf: 0, fd: 5, jaar: Y }, e: `Voorbeeld voor een werknemer bij een bedrijf, ${Y}` })}
<p>De feestdagen zelf staan op ${h.a('feestdagen-2028', 'feestdagen 2028')}; de schoolvakanties op ${h.a('schoolvakanties-2027-2028', 'schoolvakanties 2027-2028')}.</p>`,
  },
  en: {
    slug: 'bridge-days-2028', nav: 'Bridge days 2028', card: `Christmas: ${N(kerst.verlof, 'en')} leave days = ${N(kerst.vrij, 'en')} days off`,
    title: 'Bridge days 2028 Netherlands: plan leave around Christmas',
    description: "Bridge days 2028: Friday 28 April and Friday 26 May, plus Christmas with 3 leave days for 10 days off. The planner puts your leave where it gives most.",
    h1: 'Bridge days 2028: where your leave goes furthest',
    intro: `The 2028 bridge days are two Fridays; the best deal of the year is Christmas: ${N(kerst.verlof, 'en')} leave days for ${N(kerst.vrij, 'en')} days off.`,
    resume: `There are ${N(bd.length, 'en')} true bridge days in ${Y}, both Fridays: ${DW(kb.verlofVan, 'en')}, after King's Day on ${DW(kd, 'en')}, and ${DW(hb.verlofVan, 'en')}, after Ascension. ${vijfMei(Y, 'en')} The end of the year gives most. Christmas Day and Boxing Day fall on Monday and Tuesday; take Wednesday to Friday off, ${SPAN(kerst.verlofVan, kerst.verlofTot, 'en')}, and ${N(kerst.verlof, 'en')} leave days give ${N(kerst.vrij, 'en')} days off, through New Year's Day 2029. Across the year, ${N(p3.verlof, 'en')} leave days give ${N(p3.vrij, 'en')} days off, ${N(p5.verlof, 'en')} give ${N(p5.vrij, 'en')} and ${N(p9.verlof, 'en')} give ${N(p9.vrij, 'en')}. ${Y} is a leap year, with one extra weekday in February; that does not change the bridges, which all sit around fixed holidays.`,
    faqs: [
      { q: 'What is the best bridge of 2028?', a: `Per leave day, the two Fridays after a holiday: one leave day for four days off. In total, the week around Christmas gives most: ${N(kerst.verlof, 'en')} leave days for ${N(kerst.vrij, 'en')} days off in a row. That is because both Christmas days fall on weekdays in 2028.` },
      { q: 'Is Friday 5 May 2028 a day off?', a: 'It is Liberation Day, an official holiday. The government says not everyone is off; check your agreement or contract, or ask your employer. If you are off, the long weekend around 5 May costs no leave. Schools almost always close on Liberation Day.' },
      { q: 'Does the 2028 Christmas bridge fall in the school break?', a: `Yes. The ${Y}-${Y + 1} Christmas break starts on ${D(K.kalender(2028, 'midden')!.kerst.van, 'en')} in every region. Parents who take the Christmas bridge are off at the same time as their children. Since many families do this, it is wise to request the leave early in the year.` },
    ],
    body: (h) => `<h2>Bridge days 2028 in a nine-day leave plan</h2>
${h.table(['Take leave', 'Leave days', 'Off in a row', 'Days off'], rij('en', p9), `Nine leave days in ${Y}: ${N(p9.vrij, 'en')} days off`, ['l', 'r', 'l', 'r'])}
<p>The Christmas bridge tops the list because three leave days link two weekends, both Christmas days and New Year's Day. Next come the two Fridays and the week after Easter. Easter is late in ${Y}, on ${h.day(F('eerste-paasdag', Y))}, and the May break runs ${h.per(s27.mei)}.</p>
<h2>King's Day on ${WD(kd, 'en')}, 5 May on ${WD(bv, 'en')}</h2>
<p>King's Day falls on ${h.wday(kd)}. One leave day on ${h.wday(kb.verlofVan)} gives ${N(kb.vrij, 'en')} days off in a row, ${SPAN(kb.vrijVan, kb.vrijTot, 'en')}. ${vijfMei(Y, 'en')} Whether 5 May is off ${h.src('rijks-bevrijdingsdag', 'depends on your agreement')}.</p>
${h.mini('vrij', { t: `Are you off on 5 May ${Y}?`, d: { pf: 0, fd: 5, jaar: Y }, e: `Example for an employee at a company, ${Y}` })}
<p>The holidays themselves are on ${h.a('feestdagen-2028', 'public holidays 2028')}; school breaks on ${h.a('schoolvakanties-2027-2028', 'school holidays 2027-2028')}.</p>`,
  },
});
