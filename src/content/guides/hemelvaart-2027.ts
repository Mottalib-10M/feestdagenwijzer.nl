/** Hemelvaart 2027: donderdag 6 mei, brugdag vrijdag 7 mei, adviesweek meivakantie, Hemelvaart 2026-2030. */
import { defineGuide } from '../../lib/page-types';
import { K, D, DW, N, F, SV, PER } from '../_k';

const Y = 2027;
const hv = F('hemelvaartsdag', Y), ps = F('eerste-paasdag', Y), bv = F('bevrijdingsdag', Y);
const k = SV(2026, 'midden');
const brug = K.brugdagen(Y).find((b) => b.feestdagen.includes('hemelvaartsdag'))!;
const jaren = [2026, 2027, 2028, 2029, 2030];

export default defineGuide({
  id: 'hemelvaart-2027', group: 'feestdagen', order: 7, tool: 'fd', toolArg: { fd: 'hemelvaartsdag', jaar: Y },
  related: ['pinksteren-2027', 'brugdagen-2027', 'bevrijdingsdag-2027', 'schoolvakanties-2026-2027'],
  sources: ['rijks-hemelvaart', 'rijks-feestdagen', 'rijks-sv-2026'],
  nl: {
    slug: 'hemelvaart-2027', nav: 'Hemelvaart 2027', card: `${DW(hv, 'nl')}, brug op vrijdag`,
    title: 'Hemelvaart 2027: donderdag 6 mei en de brugdag op vrijdag',
    description: `Hemelvaart 2027 valt op donderdag 6 mei. Met vrijdag ${D(brug.verlofVan, 'nl')} vrij heeft u vier dagen. Wie vrij is, hoe het zit met school en de data van Hemelvaart tot 2030.`,
    h1: 'Hemelvaart 2027: donderdag 6 mei',
    intro: `Hemelvaart 2027 valt op ${DW(hv, 'nl')}; met vrijdag ${D(brug.verlofVan, 'nl')} als verlofdag bent u vier dagen vrij.`,
    resume: `Hemelvaartsdag valt altijd op een donderdag, veertig dagen na Pasen als u Paaszondag meetelt, en dus 39 dagen na Eerste Paasdag. Omdat Pasen in ${Y} vroeg valt, op ${D(ps, 'nl')}, is Hemelvaart al op ${D(hv, 'nl')}. Volgens de Rijksoverheid is Hemelvaartsdag bij de meeste bedrijven een vrije dag en voor ambtenaren altijd; scholieren zijn meestal vrij. De vrijdag erna, ${D(brug.verlofVan, 'nl')}, is de klassieke brugdag: met één verlofdag heeft u vier dagen vrij, van ${D(brug.vrijVan, 'nl')} tot en met ${D(brug.vrijTot, 'nl')}. Veel scholen geven die vrijdag vrij, maar het is geen vaste vrije dag. De meivakantie loopt in ${Y} van ${PER(k.mei, 'nl')}; scholen mogen er volgens het advies een week aan vastplakken, van ${PER(k.adviesMei, 'nl')}, en dan valt Hemelvaart erin. Bevrijdingsdag, de dag ervoor, is niet voor iedereen vrij.`,
    faqs: [
      { q: 'Op welke dag valt Hemelvaartsdag 2027?', a: `Op ${DW(hv, 'nl')}, altijd 39 dagen na Eerste Paasdag (${D(ps, 'nl')}). Hemelvaart valt dus altijd op een donderdag. Volgens de Rijksoverheid zijn de meeste werknemers die dag vrij en ambtenaren altijd. Een dag eerder valt Bevrijdingsdag, ${D(bv, 'nl')}, waardoor die week in 2027 bijzonder kort kan worden.` },
      { q: 'Is de vrijdag na Hemelvaart vrij?', a: `Niet automatisch. Vrijdag ${D(brug.verlofVan, 'nl')} is een gewone werkdag, tenzij uw werkgever of cao hem vrij geeft. Met één verlofdag heeft u vier dagen achter elkaar vrij. Veel scholen zijn die vrijdag dicht; dat staat in de schoolgids. Vraag uw verlof op tijd aan.` },
      { q: 'Hebben kinderen in 2027 vrij met Hemelvaart?', a: `Op Hemelvaartsdag zelf meestal wel, en vaak ook op de vrijdag erna. Of er meer vrij is, hangt af van de school: de vaste meivakantie is ${PER(k.mei, 'nl')}, en scholen mogen er een adviesweek aan toevoegen, ${PER(k.adviesMei, 'nl')}. De schoolgids van uw school geeft uitsluitsel.` },
    ],
    body: (h) => `<h2>Hemelvaart 2027 en volgende jaren</h2>
${h.table(['Jaar', 'Hemelvaartsdag', 'Brugdag (vrijdag)'], jaren.map((y) => [String(y), h.day(F('hemelvaartsdag', y)), h.day(K.plusDagen(F('hemelvaartsdag', y), 1))]), 'Hemelvaart 2026 tot 2030', ['l', 'l', 'l'])}
<p>De ${h.src('rijks-hemelvaart', 'Rijksoverheid')} noemt Hemelvaartsdag voor de meeste werknemers een vrije dag. Dat regelt niet de wet maar uw cao of contract. Werkt u in de zorg, het vervoer of de horeca, dan kan het een gewone roosterdag zijn; uw cao zegt of er een toeslag is.</p>
<h2>Hemelvaart 2027 en de schoolvakantie</h2>
<p>In ${Y} liggen meivakantie en Hemelvaart dicht bij elkaar maar overlappen ze niet: de vaste meivakantie eindigt op ${h.day(k.mei.tot)}, vier dagen voor Hemelvaart. Scholen die de adviesweek nemen, zijn van ${h.per(k.adviesMei)} dicht. Kijk in de schoolgids welke keuze uw school maakt.</p>
${h.mini('school', { t: 'Meivakantie 2027 in uw regio', d: { regio: 1, sj: 0, vak: 3 }, e: 'Voorbeeld voor regio Midden' })}
<p>Met Bevrijdingsdag op ${h.wday(bv)} en Hemelvaart erachter kan mei 2027 lang worden; zie de ${h.a('brugdagen-2027', 'brugdagenplanner')}.</p>`,
  },
  en: {
    slug: 'ascension-day-2027', nav: 'Ascension Day 2027', card: `${DW(hv, 'en')}, bridge on the Friday`,
    title: 'Ascension Day 2027 Netherlands: Thursday 6 May, Friday off',
    description: `Ascension Day 2027 is Thursday 6 May. Take Friday ${D(brug.verlofVan, 'en')} off and you have four days. Who is off, how schools handle it and the Ascension dates up to 2030.`,
    h1: 'Ascension Day 2027: Thursday 6 May',
    intro: `Ascension Day 2027 falls on ${DW(hv, 'en')}; take Friday ${D(brug.verlofVan, 'en')} as leave and you are off four days.`,
    resume: `Ascension Day always falls on a Thursday, forty days after Easter counting Easter Sunday, so 39 days after it. Because Easter is early in ${Y}, on ${D(ps, 'en')}, Ascension is already on ${D(hv, 'en')}. According to the Dutch government, Ascension Day is a day off at most companies and always for civil servants; pupils are usually off. The Friday after, ${D(brug.verlofVan, 'en')}, is the classic bridge day: one leave day gives four days off, ${D(brug.vrijVan, 'en')} to ${D(brug.vrijTot, 'en')}. Many schools close that Friday, but it is not a fixed day off. The May school break runs ${PER(k.mei, 'en')} in ${Y}; schools may add the advisory week of ${PER(k.adviesMei, 'en')}, which contains Ascension. Liberation Day, the day before, is not a day off for everyone.`,
    faqs: [
      { q: 'Which day is Ascension Day 2027?', a: `${DW(hv, 'en')}, always 39 days after Easter Sunday (${D(ps, 'en')}). So Ascension always falls on a Thursday. The government says most employees are off that day, and civil servants always. Liberation Day, ${D(bv, 'en')}, is the day before, which can make that week in 2027 very short.` },
      { q: 'Is the Friday after Ascension a day off?', a: `Not automatically. Friday ${D(brug.verlofVan, 'en')} is an ordinary working day unless your employer or agreement gives it off. One leave day gives four days off in a row. Many schools close that Friday; the school guide says. Book your leave in good time.` },
      { q: 'Are children off around Ascension 2027?', a: `On Ascension Day itself usually yes, and often on the Friday after too. Anything more depends on the school: the fixed May break is ${PER(k.mei, 'en')}, and schools may add an advisory week, ${PER(k.adviesMei, 'en')}. Your own school guide has the final answer.` },
    ],
    body: (h) => `<h2>Ascension Day 2027 and later years</h2>
${h.table(['Year', 'Ascension Day', 'Bridge day (Friday)'], jaren.map((y) => [String(y), h.day(F('hemelvaartsdag', y)), h.day(K.plusDagen(F('hemelvaartsdag', y), 1))]), 'Ascension 2026 to 2030', ['l', 'l', 'l'])}
<p>The ${h.src('rijks-hemelvaart', 'government')} calls Ascension Day a day off for most employees. That is set by your agreement or contract, not by law. In care, transport or hospitality it can be a normal roster day; your agreement says whether there is a premium.</p>
<h2>Ascension 2027 and the school break</h2>
<p>In ${Y} the May break and Ascension are close but do not overlap: the fixed break ends on ${h.day(k.mei.tot)}, four days before Ascension. Schools taking the advisory week close ${h.per(k.adviesMei)}. Check your school guide for its choice.</p>
${h.mini('school', { t: 'May break 2027 in your region', d: { regio: 1, sj: 0, vak: 3 }, e: 'Example for the Central region' })}
<p>With Liberation Day on ${h.wday(bv)} and Ascension right after, May 2027 can be long; see the ${h.a('brugdagen-2027', 'bridge-day planner')}.</p>`,
  },
});
