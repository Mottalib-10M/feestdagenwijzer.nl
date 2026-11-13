/** Brugdagen 2027: de twee echte brugdagen, het meiblok, verlofplannen met 5 en 10 dagen, overlap met de meivakantie. */
import { defineGuide } from '../../lib/page-types';
import { K, D, DW, WD, SPAN, PER, N, F, OPT, BD, SV } from '../_k';
import type { Lang } from '../../lib/format';

const Y = 2027;
const bd = BD(Y), alle = K.bruggen(Y);
const p3 = OPT(Y, 3), p5 = OPT(Y, 5), p10 = OPT(Y, 10);
const kd = F('koningsdag', Y), hv = F('hemelvaartsdag', Y), bv = F('bevrijdingsdag', Y);
const mei = SV(2026, 'midden').mei;
const metBd = K.optimaliseer(Y, 3, { bevrijdingsdag: true });
const paas = alle.find((b) => b.feestdagen.includes('tweede-paasdag') && b.verlof === 4)!;
const pink = alle.find((b) => b.feestdagen.includes('tweede-pinksterdag') && b.verlof === 4)!;
const rij = (l: Lang, p: typeof p10) => p.blokken.map((b) => [SPAN(b.verlofVan, b.verlofTot, l), b.verlof, SPAN(b.vrijVan, b.vrijTot, l), b.vrij]);

export default defineGuide({
  id: 'brugdagen-2027', group: 'verlof', order: 10, tool: 'bt', toolArg: { jaar: Y, verlof: 5 },
  related: ['werkdagen-2027', 'hemelvaart-2027', 'koningsdag-2027', 'brugdagen-2028'],
  sources: ['rijks-feestdagen', 'rijks-koningsdag', 'rijks-hemelvaart', 'rijks-sv-2026'],
  nl: {
    slug: 'brugdagen-2027', nav: 'Brugdagen 2027', card: `${N(bd.length, 'nl')} echte brugdagen; 5 verlofdagen = ${N(p5.vrij, 'nl')} dagen vrij`,
    title: 'Brugdagen 2027: verlofplanner met de beste vrije dagen',
    description: `Brugdagen 2027 in Nederland: ${WD(bd[0].verlofVan, 'nl')} ${D(bd[0].verlofVan, 'nl')} en ${WD(bd[1].verlofVan, 'nl')} ${D(bd[1].verlofVan, 'nl')}. De planner legt uw verlofdagen zo dat u de meeste dagen achter elkaar vrij bent.`,
    h1: 'Brugdagen 2027: meer vrij met minder verlof',
    intro: `De brugdagen 2027 zijn ${DW(bd[0].verlofVan, 'nl')} en ${DW(bd[1].verlofVan, 'nl')}: elk levert met één verlofdag vier vrije dagen op.`,
    resume: `Een brugdag is een werkdag die tussen een vrije feestdag en het weekend ligt. In ${Y} heeft Nederland er ${N(bd.length, 'nl')}. De eerste is maandag ${D(bd[0].verlofVan, 'nl')}: Koningsdag valt op dinsdag ${D(kd, 'nl')}, dus met die maandag vrij loopt het weekend door tot en met Koningsdag. De tweede is vrijdag ${D(bd[1].verlofVan, 'nl')}, de dag na Hemelvaart. Beide liggen dicht bij de meivakantie van de scholen, die in alle regio’s loopt van ${PER(mei, 'nl')}. Over het hele jaar leveren ${N(p5.verlof, 'nl')} goed geplaatste verlofdagen ${N(p5.vrij, 'nl')} vrije dagen in blokken op, en ${N(p10.verlof, 'nl')} verlofdagen ${N(p10.vrij, 'nl')}. Kerst biedt in ${Y} geen brug, want beide Kerstdagen vallen in het weekend. Heeft u volgens uw cao ook 5 mei vrij, dan wordt de periode van Koningsdag tot Hemelvaart één lang blok; zet die optie in de planner aan.`,
    faqs: [
      { q: 'Welke dagen zijn brugdagen in 2027?', a: `Maandag ${D(bd[0].verlofVan, 'nl')}, tussen het weekend en Koningsdag, en vrijdag ${D(bd[1].verlofVan, 'nl')}, na Hemelvaartsdag. Elk van die twee kost één verlofdag en levert vier dagen vrij op. Andere bruggen kosten meer verlof: na Pasen en na Pinksteren betaalt u vier verlofdagen voor negen vrije dagen achter elkaar.` },
      { q: 'Is vrijdag na Hemelvaart 2027 automatisch vrij?', a: 'Nee. Veel werkgevers en scholen geven de vrijdag na Hemelvaart vrij, maar het is een gewone werkdag, tenzij uw cao, uw werkgever of uw school iets anders bepaalt. Meestal kost het u dus één verlofdag. Vraag het op tijd aan, want op zo’n dag willen veel collega’s tegelijk vrij.' },
      { q: 'Hoeveel vrije dagen haal ik met 3 verlofdagen in 2027?', a: `${N(p3.vrij, 'nl')} vrije dagen, als u de twee brugdagen neemt en de derde verlofdag zet waar die het meest oplevert. Heeft u op 5 mei vrij, dan worden het er ${N(metBd.vrij, 'nl')}. De rekenhulp bovenaan rekent het voor elk ander aantal verlofdagen uit.` },
    ],
    body: (h) => `<h2>Brugdagen 2027 in een verlofplan van tien dagen</h2>
${h.table(['Verlof nemen', 'Verlofdagen', 'Vrij op een rij', 'Vrije dagen'], rij('nl', p10), `Tien verlofdagen in ${Y}: ${N(p10.vrij, 'nl')} dagen vrij`, ['l', 'r', 'l', 'r'])}
<p>De planner vergelijkt alle combinaties en kiest de verdeling met de meeste vrije dagen, niet alleen de bruggen met het beste rendement. Daarom staan er ook blokken van vier verlofdagen in: na Pasen, van ${h.day(paas.verlofVan)} tot ${h.day(paas.verlofTot)}, geeft dat ${N(paas.vrij, 'nl')} dagen vrij; na Pinksteren, van ${h.day(pink.verlofVan)} tot ${h.day(pink.verlofTot)}, ook ${N(pink.vrij, 'nl')}.</p>
<h2>Mei 2027: drie feestdagen, twee bruggen</h2>
<p>Koningsdag op ${h.wd(kd)}, Bevrijdingsdag op ${h.wd(bv)} en Hemelvaart op ${h.wd(hv)} liggen binnen tien dagen. Voor wie 5 mei moet werken, zijn er twee losse bruggen. Wie 5 mei vrij heeft, vult met ${N(metBd.verlof, 'nl')} verlofdagen veel meer: ${N(metBd.vrij, 'nl')} vrije dagen. Of 5 mei vrij is, ${h.src('rijks-bevrijdingsdag', 'hangt volgens de Rijksoverheid af van uw cao')}.</p>
${h.mini('vrij', { t: 'Is 5 mei 2027 vrij in uw situatie?', d: { pf: 0, fd: 5 }, e: 'Voorbeeld voor een werknemer bij een bedrijf' })}
<h2>Rekening houden met de meivakantie</h2>
<p>De meivakantie van ${h.per(mei)} geldt in Noord, Midden en Zuid tegelijk. Ouders die de week ervoor of erna vrij nemen, zitten dus nooit verkeerd per regio. De brug van ${h.day(bd[0].verlofVan)} valt al in de schoolvakantie; die van ${h.day(bd[1].verlofVan)} niet, al geven veel scholen die vrijdag vrij. Meer per regio op ${h.a('schoolvakanties-2026-2027', 'schoolvakanties 2026-2027')}.</p>`,
  },
  en: {
    slug: 'bridge-days-2027', nav: 'Bridge days 2027', card: `${N(bd.length, 'en')} true bridge days; 5 leave days = ${N(p5.vrij, 'en')} days off`,
    title: "Bridge days 2027 Netherlands: leave planner, long weekends",
    description: "Bridge days 2027 in the Netherlands: Monday 26 April and Friday 7 May. The planner places your leave days to give you the longest runs of days off in a row.",
    h1: 'Bridge days 2027: more time off for less leave',
    intro: `The 2027 bridge days are ${DW(bd[0].verlofVan, 'en')} and ${DW(bd[1].verlofVan, 'en')}: each turns one leave day into four days off.`,
    resume: `A bridge day is a working day between a holiday off and the weekend. The Netherlands has ${N(bd.length, 'en')} of them in ${Y}. The first is Monday ${D(bd[0].verlofVan, 'en')}: King's Day falls on Tuesday ${D(kd, 'en')}, so with that Monday off the weekend runs straight into King's Day. The second is Friday ${D(bd[1].verlofVan, 'en')}, the day after Ascension. Both sit close to the school May break, which runs ${PER(mei, 'en')} in every region. Across the whole year, ${N(p5.verlof, 'en')} well-placed leave days give ${N(p5.vrij, 'en')} days off in blocks, and ${N(p10.verlof, 'en')} leave days give ${N(p10.vrij, 'en')}. Christmas offers no bridge in ${Y}, because both Christmas days fall at the weekend. If your collective agreement also gives you 5 May off, the stretch from King's Day to Ascension becomes one long block; switch that option on in the planner.`,
    faqs: [
      { q: 'Which days are bridge days in 2027?', a: `Monday ${D(bd[0].verlofVan, 'en')}, between the weekend and King's Day, and Friday ${D(bd[1].verlofVan, 'en')}, after Ascension Day. Each costs one leave day and gives four days off. Other bridges cost more leave: after Easter and after Whitsun you pay four leave days for nine days off in a row.` },
      { q: 'Is the Friday after Ascension 2027 a day off?', a: 'Not automatically. Many employers and schools give it off, but it is an ordinary working day unless your agreement, employer or school decides otherwise. So it usually costs one leave day. Book it early, because many colleagues want that same day off.' },
      { q: 'How many days off do 3 leave days give in 2027?', a: `${N(p3.vrij, 'en')} days off, using both bridge days and placing the third leave day where it adds most. With 5 May off, it becomes ${N(metBd.vrij, 'en')}. The tool at the top of this page works it out for any other number of leave days.` },
    ],
    body: (h) => `<h2>Bridge days 2027 in a ten-day leave plan</h2>
${h.table(['Take leave', 'Leave days', 'Off in a row', 'Days off'], rij('en', p10), `Ten leave days in ${Y}: ${N(p10.vrij, 'en')} days off`, ['l', 'r', 'l', 'r'])}
<p>The planner compares every combination and picks the split with the most days off, not just the bridges with the best return. That is why four-day blocks appear too: after Easter, ${h.day(paas.verlofVan)} to ${h.day(paas.verlofTot)}, gives ${N(paas.vrij, 'en')} days off; after Whitsun, ${h.day(pink.verlofVan)} to ${h.day(pink.verlofTot)}, also ${N(pink.vrij, 'en')}.</p>
<h2>May 2027: three holidays, two bridges</h2>
<p>King's Day on a ${h.wd(kd)}, Liberation Day on a ${h.wd(bv)} and Ascension on a ${h.wd(hv)} fall within ten days. If you work on 5 May, there are two separate bridges. If 5 May is off, ${N(metBd.verlof, 'en')} leave days fill far more: ${N(metBd.vrij, 'en')} days off. Whether 5 May is off ${h.src('rijks-bevrijdingsdag', 'depends on your agreement, says the government')}.</p>
${h.mini('vrij', { t: 'Is 5 May 2027 a day off for you?', d: { pf: 0, fd: 5 }, e: 'Example for an employee at a company' })}
<h2>Planning around the May school break</h2>
<p>The May break of ${h.per(mei)} applies in North, Central and South at once, so parents taking the week before or after are never out of step by region. The ${h.day(bd[0].verlofVan)} bridge already falls inside the school break; the ${h.day(bd[1].verlofVan)} one does not, though many schools close that Friday. More by region on ${h.a('schoolvakanties-2026-2027', 'school holidays 2026-2027')}.</p>`,
  },
});
