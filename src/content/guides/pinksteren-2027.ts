/** Pinksteren 2027: 16 en 17 mei, Tweede Pinksterdag vrij, de brug van vier dagen erna, Pinksteren 2026-2030. */
import { defineGuide } from '../../lib/page-types';
import { K, D, DW, N, F } from '../_k';

const Y = 2027;
const p1 = F('eerste-pinksterdag', Y), p2 = F('tweede-pinksterdag', Y), hv = F('hemelvaartsdag', Y);
const brug = K.bruggen(Y).find((b) => b.feestdagen.includes('tweede-pinksterdag') && b.verlof === 4)!;
const tussen = K.weekdagenTussen(K.fromIso(K.plusDagen(hv, 1)), K.fromIso(p2) - 1);
const jaren = [2026, 2027, 2028, 2029, 2030];

export default defineGuide({
  id: 'pinksteren-2027', group: 'feestdagen', order: 8, tool: 'fd', toolArg: { fd: 'tweede-pinksterdag', jaar: Y },
  related: ['hemelvaart-2027', 'pasen-2027', 'brugdagen-2027', 'werkdagen-2027'],
  sources: ['rijks-tweede-pinksterdag', 'rijks-feestdagen'],
  nl: {
    slug: 'pinksteren-2027', nav: 'Pinksteren 2027', card: `${D(p1, 'nl')} en ${D(p2, 'nl')}`,
    title: 'Pinksteren 2027: 16 en 17 mei, Tweede Pinksterdag vrij',
    description: `Pinksteren 2027 valt op zondag 16 en maandag 17 mei. Tweede Pinksterdag is bij de meeste werkgevers vrij. Met vier verlofdagen erna bent u ${N(brug.vrij, 'nl')} dagen vrij.`,
    h1: 'Pinksteren 2027: zondag 16 en maandag 17 mei',
    intro: `Pinksteren 2027 valt op ${DW(p1, 'nl')} en ${DW(p2, 'nl')}, tien dagen na Hemelvaart.`,
    resume: `Pinksteren valt zeven weken na Pasen, op de vijftigste dag als u Paaszondag meetelt. In ${Y} is Eerste Pinksterdag zondag ${D(p1, 'nl')} en Tweede Pinksterdag maandag ${D(p2, 'nl')}. De Rijksoverheid schrijft dat Tweede Pinksterdag bij de meeste bedrijven een vrije dag is, voor ambtenaren altijd, en dat scholieren meestal vrij zijn. Eerste Pinksterdag valt altijd op zondag en levert dus geen extra vrije dag op. Na Hemelvaart op ${D(hv, 'nl')} zijn er tot Pinksteren nog ${N(tussen, 'nl')} werkdagen. De brug na Pinksteren is in ${Y} de tweede beste van het voorjaar in absolute dagen: vier verlofdagen, van ${D(brug.verlofVan, 'nl')} tot ${D(brug.verlofTot, 'nl')}, geven ${N(brug.vrij, 'nl')} dagen vrij op een rij. Een schoolvakantie rond Pinksteren is er in ${Y} niet: de meivakantie is dan al voorbij en de zomervakantie begint pas in juli.`,
    faqs: [
      { q: 'Wanneer is Pinksteren 2027?', a: `Eerste Pinksterdag is zondag ${D(p1, 'nl')}, Tweede Pinksterdag maandag ${D(p2, 'nl')}. Pinksteren valt altijd zeven weken na Pasen en tien dagen na Hemelvaartsdag (${D(hv, 'nl')}). Wie na Pinksteren vier verlofdagen neemt, van ${D(brug.verlofVan, 'nl')} tot ${D(brug.verlofTot, 'nl')}, is ${N(brug.vrij, 'nl')} dagen achter elkaar vrij.` },
      { q: 'Is Tweede Pinksterdag 2027 vrij?', a: 'Bij de meeste bedrijven wel, en voor ambtenaren altijd, zegt de Rijksoverheid. Wie in een winkel, de zorg of het openbaar vervoer werkt, kijkt in rooster en cao; daar wordt vaak gewoon gewerkt. De cao regelt ook of er een toeslag is. Eerste Pinksterdag valt altijd op zondag.' },
      { q: 'Is er een pinkstervakantie?', a: 'Nee. Scholen zijn op Tweede Pinksterdag meestal dicht, maar een aparte pinkstervakantie bestaat in Nederland niet. Sommige scholen plakken er een studiedag aan vast, zodat leerlingen een lang weekend hebben. Dat staat in de schoolgids. De zomervakantie begint pas enkele weken later.' },
    ],
    body: (h) => `<h2>Pinksteren 2027 en de jaren erna</h2>
${h.table(['Jaar', 'Eerste Pinksterdag', 'Tweede Pinksterdag'], jaren.map((y) => [String(y), h.day(F('eerste-pinksterdag', y)), h.day(F('tweede-pinksterdag', y))]), 'Pinksteren 2026 tot 2030', ['l', 'l', 'l'])}
<p>Pinksteren schuift mee met Pasen; in 2028 valt het pas in juni. Wat de ${h.src('rijks-tweede-pinksterdag', 'Rijksoverheid')} over vrij zijn zegt, ziet u in de rekenhulp bovenaan per situatie.</p>
<h2>Een week vrij na Pinksteren 2027</h2>
<p>Wie de week na Pinksteren vrij neemt, gebruikt vier verlofdagen voor ${N(brug.vrij, 'nl')} dagen, van ${h.day(brug.vrijVan)} tot en met ${h.day(brug.vrijTot)}. Dat rendement is lager dan een losse brugdag, maar het blok is langer. De planner kiest het blok als u genoeg verlof heeft.</p>
${h.mini('brug', { t: 'Wat leveren uw verlofdagen op in 2027?', d: { verlof: 6, jaar: 2027 }, e: 'Voorbeeld met 6 verlofdagen in 2027' })}
<p>Werkdagen in mei en juni 2027 staan per maand op de ${h.a('werkdagen-2027', 'werkdagenpagina')}.</p>`,
  },
  en: {
    slug: 'whitsun-2027', nav: 'Whitsun 2027', card: `${D(p1, 'en')} and ${D(p2, 'en')}`,
    title: 'Whitsun 2027 Netherlands: 16 and 17 May, Whit Monday off',
    description: "Whitsun 2027 falls on Sunday 16 and Monday 17 May. Whit Monday is a day off at most employers. Four leave days after it give 9 days off in a row. Dates to 2030.",
    h1: 'Whitsun 2027: Sunday 16 and Monday 17 May',
    intro: `Whitsun 2027 falls on ${DW(p1, 'en')} and ${DW(p2, 'en')}, ten days after Ascension.`,
    resume: `Whitsun (Pentecost) comes seven weeks after Easter, on the fiftieth day counting Easter Sunday. In ${Y}, Whit Sunday is ${D(p1, 'en')} and Whit Monday ${D(p2, 'en')}. The Dutch government writes that Whit Monday is a day off at most companies, always for civil servants, and that pupils are usually off. Whit Sunday is always a Sunday and so gives no extra day off. After Ascension on ${D(hv, 'en')} there are ${N(tussen, 'en')} working days left until Whitsun. The bridge after Whitsun is the second best of spring ${Y} in total days: four leave days, ${D(brug.verlofVan, 'en')} to ${D(brug.verlofTot, 'en')}, give ${N(brug.vrij, 'en')} days off in a row. There is no school break around Whitsun in ${Y}: the May break is over and summer starts in July.`,
    faqs: [
      { q: 'When is Whitsun 2027?', a: `Whit Sunday is ${D(p1, 'en')}, Whit Monday ${D(p2, 'en')}. Whitsun always falls seven weeks after Easter and ten days after Ascension Day (${D(hv, 'en')}). Taking four leave days after Whitsun, ${D(brug.verlofVan, 'en')} to ${D(brug.verlofTot, 'en')}, gives ${N(brug.vrij, 'en')} days off in a row.` },
      { q: 'Is Whit Monday 2027 a day off?', a: 'At most companies yes, and always for civil servants, says the government. In retail, care or public transport, check your roster and agreement; people there often work. The agreement also sets any premium. Whit Sunday always falls on a Sunday.' },
      { q: 'Is there a Whitsun school break?', a: 'No. Schools usually close on Whit Monday, but the Netherlands has no separate Whitsun break. Some schools add a study day to give pupils a long weekend. The school guide says so. The summer break only starts several weeks later.' },
    ],
    body: (h) => `<h2>Whitsun 2027 and the years after</h2>
${h.table(['Year', 'Whit Sunday', 'Whit Monday'], jaren.map((y) => [String(y), h.day(F('eerste-pinksterdag', y)), h.day(F('tweede-pinksterdag', y))]), 'Whitsun 2026 to 2030', ['l', 'l', 'l'])}
<p>Whitsun moves with Easter; in 2028 it is not until June. What the ${h.src('rijks-tweede-pinksterdag', 'government')} says about days off is shown by situation in the tool above.</p>
<h2>A week off after Whitsun 2027</h2>
<p>Taking the week after Whitsun uses four leave days for ${N(brug.vrij, 'en')} days, ${h.day(brug.vrijVan)} to ${h.day(brug.vrijTot)}. The return is lower than a single bridge day, but the block is longer. The planner picks it if you have enough leave.</p>
${h.mini('brug', { t: 'What do your leave days give in 2027?', d: { verlof: 6, jaar: 2027 }, e: 'Example with 6 leave days in 2027' })}
<p>Working days in May and June 2027 are listed by month on the ${h.a('werkdagen-2027', 'working days page')}.</p>`,
  },
});
