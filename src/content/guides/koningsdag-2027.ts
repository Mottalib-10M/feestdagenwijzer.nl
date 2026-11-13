/** Koningsdag 2027: dinsdag 27 april, brugdag op maandag, in de meivakantie, de regel van 26 april. */
import { defineGuide } from '../../lib/page-types';
import { K, D, DW, WD, N, F, SV, PER } from '../_k';

const Y = 2027;
const kd = F('koningsdag', Y), mei = SV(2026, 'midden').mei;
const brug = K.brugdagen(Y).find((b) => b.feestdagen.includes('koningsdag'))!;
const jaren = [2025, 2026, 2027, 2028, 2029, 2030, 2031];
const zat = jaren.filter((y) => F('koningsdag', y).endsWith('04-26'));

export default defineGuide({
  id: 'koningsdag-2027', group: 'feestdagen', order: 5, tool: 'fd', toolArg: { fd: 'koningsdag', jaar: Y },
  related: ['bevrijdingsdag-2027', 'hemelvaart-2027', 'brugdagen-2027', 'schoolvakanties-2026-2027'],
  sources: ['rijks-koningsdag', 'rijks-feestdagen', 'rijks-sv-2026'],
  nl: {
    slug: 'koningsdag-2027', nav: 'Koningsdag 2027', card: `${DW(kd, 'nl')}, brug op maandag`,
    title: 'Koningsdag 2027: dinsdag 27 april, brugdag en meivakantie',
    description: "Koningsdag 2027 valt op dinsdag 27 april. Neem maandag 26 april vrij en u bent vier dagen vrij, in de meivakantie. Wie vrij is en wanneer 26 april geldt.",
    h1: 'Koningsdag 2027 op dinsdag 27 april',
    intro: `Koningsdag 2027 valt op ${DW(kd, 'nl')}; met één verlofdag op maandag ${D(brug.verlofVan, 'nl')} bent u vier dagen vrij.`,
    resume: `Koningsdag viert de verjaardag van koning Willem-Alexander, geboren op 27 april. In ${Y} valt die dag op een dinsdag. Volgens de Rijksoverheid is Koningsdag bij de meeste bedrijven een vrije dag en voor ambtenaren altijd; scholieren zijn meestal vrij. Omdat de dag op dinsdag valt, is maandag ${D(brug.verlofVan, 'nl')} een echte brugdag: met één verlofdag bent u vrij van ${D(brug.vrijVan, 'nl')} tot en met ${D(brug.vrijTot, 'nl')}. Voor gezinnen komt dat goed uit, want de meivakantie loopt in alle drie de regio’s van ${PER(mei, 'nl')}: Koningsdag valt er middenin. Valt 27 april op een zondag, dan wordt Koningsdag een dag eerder gevierd, op zaterdag 26 april. Dat gebeurde in ${zat[0]} en gebeurt weer in ${zat[zat.length - 1]}; in ${Y} speelt het niet.`,
    faqs: [
      { q: 'Op welke dag valt Koningsdag 2027?', a: `Op ${DW(kd, 'nl')}, de verjaardag van koning Willem-Alexander. Valt 27 april op een zondag, dan wordt Koningsdag een dag eerder gevierd, op zaterdag 26 april. In 2027 is dat niet zo. Met één verlofdag op maandag ${D(brug.verlofVan, 'nl')} heeft u vier dagen achter elkaar vrij.` },
      { q: 'Ben ik vrij op Koningsdag?', a: 'Bij de meeste bedrijven wel, en ambtenaren altijd, schrijft de Rijksoverheid. Werkt u in een winkel, het openbaar vervoer of de horeca, dan bepaalt uw rooster het; Koningsdag is daar vaak een drukke dag. Uw cao regelt of er een toeslag is. De wet zelf geeft niemand vrij.' },
      { q: 'Valt Koningsdag 2027 in de meivakantie?', a: `Ja. De meivakantie loopt in alle drie de regio’s van ${PER(mei, 'nl')}, dus ook Koningsdag valt erin. Kinderen zijn die dag hoe dan ook vrij. Werkende ouders die maandag ${D(brug.verlofVan, 'nl')} vrij nemen, hebben een lang weekend samen met de kinderen.` },
    ],
    body: (h) => `<h2>Koningsdag 2027 en de jaren eromheen</h2>
${h.table(['Jaar', 'Koningsdag', 'Weekdag'], jaren.map((y) => [String(y), h.day(F('koningsdag', y)), h.wd(F('koningsdag', y))]), 'Koningsdag 2025 tot 2031; op zondag schuift hij naar zaterdag 26 april', ['l', 'l', 'l'])}
<p>Koningsdag is de enige feestdag die schuift als hij op zondag valt, en dan naar voren, niet naar achteren. Een vervangende vrije dag op maandag bestaat niet. De ${h.src('rijks-koningsdag', 'Rijksoverheid')} legt uit wie er vrij is.</p>
<h2>Een lang weekend rond Koningsdag 2027</h2>
<p>De maandag ervoor, ${h.day(brug.verlofVan)}, is de beste verlofdag van het voorjaar: één dag voor vier dagen vrij. Wie een week verder wil, kan de rest van de week vrij nemen; de dagen tot en met vrijdag ${h.day(K.plusDagen(kd, 3))} kosten dan nog drie verlofdagen en sluiten aan op het tweede weekend van de meivakantie.</p>
${h.mini('brug', { t: 'Uw verlof rond Koningsdag 2027', d: { verlof: 4, jaar: 2027 }, e: 'Voorbeeld met 4 verlofdagen in 2027' })}
<p>Na Koningsdag volgen ${h.a('bevrijdingsdag-2027', 'Bevrijdingsdag')} op ${h.wday(F('bevrijdingsdag', Y))} en ${h.a('hemelvaart-2027', 'Hemelvaart')} op ${h.wday(F('hemelvaartsdag', Y))}.</p>`,
  },
  en: {
    slug: 'kings-day-2027', nav: "King's Day 2027", card: `${DW(kd, 'en')}, bridge on the Monday`,
    title: "King's Day 2027: Tuesday 27 April, bridge day and May break",
    description: "King's Day 2027 falls on Tuesday 27 April. Take Monday 26 April off for four days in a row, in the school May break. Who is off and when 26 April applies.",
    h1: "King's Day 2027 on Tuesday 27 April",
    intro: `King's Day 2027 falls on ${DW(kd, 'en')}; one leave day on Monday ${D(brug.verlofVan, 'en')} gives you four days off.`,
    resume: `King's Day celebrates the birthday of King Willem-Alexander, born on 27 April. In ${Y} that day is a Tuesday. According to the Dutch government, King's Day is a day off at most companies and always for civil servants; pupils are usually off. Because it falls on a Tuesday, Monday ${D(brug.verlofVan, 'en')} is a true bridge day: one leave day and you are off from ${D(brug.vrijVan, 'en')} to ${D(brug.vrijTot, 'en')}. That suits families, as the school May break runs ${PER(mei, 'en')} in all three regions, with King's Day in the middle. When 27 April is a Sunday, King's Day is held a day earlier, on Saturday 26 April. That happened in ${zat[0]} and happens again in ${zat[zat.length - 1]}; it does not apply in ${Y}.`,
    faqs: [
      { q: "What day is King's Day 2027?", a: `${DW(kd, 'en')}, the birthday of King Willem-Alexander. When 27 April is a Sunday, King's Day moves a day earlier to Saturday 26 April. That is not the case in 2027. One leave day on Monday ${D(brug.verlofVan, 'en')} gives four days off in a row.` },
      { q: "Am I off on King's Day?", a: 'At most companies yes, and always as a civil servant, says the government. In retail, public transport or hospitality your roster decides; King’s Day is often a busy day there. Your collective agreement sets any premium. The law itself gives nobody the day off.' },
      { q: "Is King's Day 2027 in the May school break?", a: `Yes. The May break runs ${PER(mei, 'en')} in all three regions, so King's Day falls inside it. Children are off that day either way. Working parents who take Monday ${D(brug.verlofVan, 'en')} off get a long weekend together with their children.` },
    ],
    body: (h) => `<h2>King's Day 2027 and the years around it</h2>
${h.table(['Year', "King's Day", 'Weekday'], jaren.map((y) => [String(y), h.day(F('koningsdag', y)), h.wd(F('koningsdag', y))]), "King's Day 2025 to 2031; on a Sunday it moves to Saturday 26 April", ['l', 'l', 'l'])}
<p>King's Day is the only holiday that moves when it falls on a Sunday, and it moves earlier, not later. There is no substitute Monday. The ${h.src('rijks-koningsdag', 'government')} explains who is off.</p>
<h2>A long weekend around King's Day 2027</h2>
<p>The Monday before, ${h.day(brug.verlofVan)}, is the best leave day of spring: one day for four off. To stretch it to a week, take the rest of the week too; the days through Friday ${h.day(K.plusDagen(kd, 3))} cost three more leave days and join the second weekend of the May break.</p>
${h.mini('brug', { t: "Your leave around King's Day 2027", d: { verlof: 4, jaar: 2027 }, e: 'Example with 4 leave days in 2027' })}
<p>After King's Day come ${h.a('bevrijdingsdag-2027', 'Liberation Day')} on ${h.wday(F('bevrijdingsdag', Y))} and ${h.a('hemelvaart-2027', 'Ascension')} on ${h.wday(F('hemelvaartsdag', Y))}.</p>`,
  },
});
