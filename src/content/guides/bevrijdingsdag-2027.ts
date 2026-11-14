/** Bevrijdingsdag 2027: woensdag 5 mei, niet iedereen vrij, scholen bijna altijd dicht, na de meivakantie, vlak voor Hemelvaart. */
import { defineGuide } from '../../lib/page-types';
import { K, D, DW, N, F, SV, PER } from '../_k';

const Y = 2027;
const bv = F('bevrijdingsdag', Y), hv = F('hemelvaartsdag', Y), kd = F('koningsdag', Y), mei = SV(2026, 'midden').mei;
const zonder = K.optimaliseer(Y, 3), met = K.optimaliseer(Y, 3, { bevrijdingsdag: true });
const w0 = K.werkdagen(Y).reduce((a, b) => a + b, 0), w1 = K.werkdagen(Y, { bevrijdingsdag: true }).reduce((a, b) => a + b, 0);
const jaren = [2026, 2027, 2028, 2029, 2030];

export default defineGuide({
  id: 'bevrijdingsdag-2027', group: 'feestdagen', order: 6, tool: 'bv', toolArg: { fd: 'bevrijdingsdag', jaar: Y },
  related: ['koningsdag-2027', 'hemelvaart-2027', 'ben-ik-vrij', 'brugdagen-2027'],
  sources: ['rijks-bevrijdingsdag', 'rijks-feestdagen', 'rijks-cao', 'rijks-sv-2026'],
  nl: {
    slug: 'bevrijdingsdag-2027', nav: 'Bevrijdingsdag 2027', card: `${DW(bv, 'nl')}: vrij volgens uw cao`,
    title: 'Bevrijdingsdag 2027: is woensdag 5 mei een vrije dag?',
    description: "Bevrijdingsdag 2027 valt op woensdag 5 mei, de dag voor Hemelvaart. Niet iedereen is vrij: dat hangt af van uw cao. Scholen zijn bijna altijd gesloten.",
    h1: 'Bevrijdingsdag 2027: woensdag 5 mei vrij of niet?',
    intro: `Bevrijdingsdag 2027 valt op ${DW(bv, 'nl')}, de dag voor Hemelvaart; of u vrij bent, staat in uw cao.`,
    resume: `Op 5 mei viert Nederland het einde van de Duitse bezetting in 1945. Bevrijdingsdag is een officiële feestdag, maar de Rijksoverheid zegt er duidelijk bij: niet iedereen is dan vrij. Werknemers vragen het na bij hun werkgever of kijken in hun contract of cao (collectieve arbeidsovereenkomst). Scholieren en studenten zijn zeer waarschijnlijk vrij, want scholen zijn bijna altijd dicht op Bevrijdingsdag. In ${Y} valt 5 mei op een woensdag, net na de meivakantie (${PER(mei, 'nl')}) en een dag voor Hemelvaartsdag op ${D(hv, 'nl')}. Dat maakt het verschil groot. Moet u werken, dan kosten drie verlofdagen u ${N(zonder.vrij, 'nl')} vrije dagen in het hele jaar. Bent u op 5 mei vrij, dan halen dezelfde drie verlofdagen er ${N(met.vrij, 'nl')}. Ouders met jonge kinderen moeten op 5 mei vaak opvang regelen als ze zelf werken.`,
    faqs: [
      { q: 'Is Bevrijdingsdag 2027 een vrije dag?', a: `Niet voor iedereen. Bevrijdingsdag, ${DW(bv, 'nl')}, is een officiële feestdag, maar de Rijksoverheid schrijft dat niet iedereen dan vrij is. Of u vrij bent, staat in uw cao of contract, of bepaalt uw werkgever. Scholen zijn op 5 mei bijna altijd dicht, dus werkende ouders moeten vaak opvang regelen.` },
      { q: 'Waarom is niet iedereen vrij op 5 mei?', a: 'De wet geeft niemand vrij op een feestdag. Werkgevers en vakbonden spreken in de cao af welke feestdagen vrij zijn. Over Koningsdag en Hemelvaart schrijft de Rijksoverheid dat de meeste werknemers vrij zijn; over Bevrijdingsdag alleen dat niet iedereen vrij is. Daardoor verschilt het per sector en per werkgever.' },
      { q: 'Hoeveel werkdagen scheelt 5 mei in 2027?', a: `Eén: ${N(w0, 'nl')} werkdagen zonder en ${N(w1, 'nl')} met Bevrijdingsdag als vrije dag, bij een werkweek van maandag tot en met vrijdag. Omdat 5 mei in ${Y} op een woensdag valt, een dag voor Hemelvaart, maakt de dag voor uw verlofplanning meer uit dan dat ene getal doet vermoeden.` },
    ],
    body: (h) => `<h2>Bevrijdingsdag 2027 voor werknemers, ambtenaren en scholieren</h2>
<p>De ${h.src('rijks-bevrijdingsdag', 'Rijksoverheid')} geeft geen vast antwoord voor werknemers: vraag het na bij uw werkgever of kijk in uw ${h.src('rijks-cao', 'cao')}. Voor scholieren en ouders zegt ze dat kinderen zeer waarschijnlijk vrij zijn. De rekenhulp bovenaan zet dat per situatie op een rij.</p>
<h2>5 mei van 2026 tot 2030</h2>
${h.table(['Jaar', 'Datum', 'Weekdag'], jaren.map((y) => [String(y), h.day(F('bevrijdingsdag', y)), h.wd(F('bevrijdingsdag', y))]), 'Bevrijdingsdag per jaar', ['l', 'l', 'l'])}
<h2>Verlof plannen met of zonder 5 mei</h2>
<p>Zonder 5 mei zijn er twee losse bruggen: maandag voor Koningsdag (${h.day(kd)}) en vrijdag na Hemelvaart. Met 5 mei vrij liggen er tussen Koningsdag en Hemelvaart nog maar een paar werkdagen; dat maakt één lang blok mogelijk.</p>
${h.mini('brug', { t: 'Verlof rond Koningsdag en Hemelvaart 2027', d: { verlof: 2, jaar: 2027 }, e: 'Voorbeeld met 2 verlofdagen, 5 mei als werkdag' })}
<p>In de ${h.a('brugdagen-2027', 'brugdagenplanner')} zet u 5 mei aan of uit en ziet u het verschil meteen.</p>`,
  },
  en: {
    slug: 'liberation-day-2027', nav: 'Liberation Day 2027', card: `${DW(bv, 'en')}: off if your agreement says so`,
    title: 'Liberation Day 2027 Netherlands: is 5 May a day off?',
    description: "Liberation Day 2027 falls on Wednesday 5 May, the day before Ascension. Not everyone is off: it depends on your agreement. Schools almost always close.",
    h1: 'Liberation Day 2027: is Wednesday 5 May off?',
    intro: `Liberation Day 2027 falls on ${DW(bv, 'en')}, the day before Ascension; whether you are off depends on your agreement.`,
    resume: `On 5 May the Netherlands marks the end of the German occupation in 1945. Liberation Day is an official holiday, but the Dutch government adds plainly that not everyone is off. Employees should ask their employer or check their contract or collective labour agreement (cao). Pupils and students are very likely off, as schools almost always close on Liberation Day. In ${Y}, 5 May is a Wednesday, just after the school May break (${PER(mei, 'en')}) and the day before Ascension on ${D(hv, 'en')}. That makes a big difference. If you work that day, three leave days buy ${N(zonder.vrij, 'en')} days off across the year. If 5 May is off, the same three leave days buy ${N(met.vrij, 'en')}. Parents of young children often need childcare on 5 May if they work themselves.`,
    faqs: [
      { q: 'Is Liberation Day 2027 a day off?', a: `Not for everyone. Liberation Day, ${DW(bv, 'en')}, is an official holiday, but the government writes that not everyone is off. Whether you are off is in your collective agreement or contract, or your employer decides. Schools almost always close on 5 May, so working parents often need childcare.` },
      { q: 'Why is not everyone off on 5 May?', a: 'No law gives anyone a holiday off. Employers and unions agree in the collective agreement which holidays are days off. For King’s Day and Ascension the government says most employees are off; for Liberation Day it only says not everyone is. So it differs by sector and by employer.' },
      { q: 'How many working days does 5 May change in 2027?', a: `One: ${N(w0, 'en')} working days without and ${N(w1, 'en')} with Liberation Day off, for a Monday-to-Friday week. Because 5 May ${Y} is a Wednesday, the day before Ascension, it matters far more for planning your annual leave than that single number suggests.` },
    ],
    body: (h) => `<h2>Liberation Day 2027 for employees, civil servants and pupils</h2>
<p>The ${h.src('rijks-bevrijdingsdag', 'government')} gives no fixed answer for employees: ask your employer or check your ${h.src('rijks-cao', 'agreement')}. For pupils and parents it says children are very likely off. The tool at the top lists it by situation.</p>
<h2>5 May from 2026 to 2030</h2>
${h.table(['Year', 'Date', 'Weekday'], jaren.map((y) => [String(y), h.day(F('bevrijdingsdag', y)), h.wd(F('bevrijdingsdag', y))]), 'Liberation Day by year', ['l', 'l', 'l'])}
<h2>Planning leave with or without 5 May</h2>
<p>Without 5 May there are two separate bridges: the Monday before King's Day (${h.day(kd)}) and the Friday after Ascension. With 5 May off, only a few working days remain between King's Day and Ascension, which makes one long block possible.</p>
${h.mini('brug', { t: "Leave around King's Day and Ascension 2027", d: { verlof: 2, jaar: 2027 }, e: 'Example with 2 leave days, 5 May as a working day' })}
<p>In the ${h.a('brugdagen-2027', 'bridge-day planner')} you switch 5 May on or off and see the difference at once.</p>`,
  },
});
