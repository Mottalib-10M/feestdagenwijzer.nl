/** Pasen 2027: datum (Gauss), Goede Vrijdag en Tweede Paasdag, vroeg Pasen, de brug na Pasen, Pasen 2026-2030. */
import { defineGuide } from '../../lib/page-types';
import { K, D, DW, WD, N, F } from '../_k';

const Y = 2027;
const ps = F('eerste-paasdag', Y), p2 = F('tweede-paasdag', Y), gv = F('goede-vrijdag', Y), hv = F('hemelvaartsdag', Y);
const brug = K.bruggen(Y).find((b) => b.feestdagen.includes('tweede-paasdag') && b.verlof === 4)!;
const metGv = K.bruggen(Y, { goedeVrijdag: true }).find((b) => b.feestdagen.includes('tweede-paasdag') && b.verlof === 4)!;
const g = K.gaussStappen(Y);
const jaren = [2026, 2027, 2028, 2029, 2030];
const vroeg = K.fromIso(ps) - K.fromIso(`${Y}-03-22`);

export default defineGuide({
  id: 'pasen-2027', group: 'feestdagen', order: 3, tool: 'os', toolArg: { jaar: Y },
  related: ['goede-vrijdag-2027', 'hemelvaart-2027', 'pinksteren-2027', 'brugdagen-2027'],
  sources: ['rijks-feestdagen', 'rijks-tweede-paasdag', 'rijks-goede-vrijdag'],
  nl: {
    slug: 'pasen-2027', nav: 'Pasen 2027', card: `Eerste Paasdag ${D(ps, 'nl')}, Tweede Paasdag ${D(p2, 'nl')}`,
    title: 'Pasen 2027: datum, Tweede Paasdag en Goede Vrijdag',
    description: "Pasen 2027 valt op zondag 28 maart, Tweede Paasdag op maandag 29 maart en Goede Vrijdag op 26 maart. Met de berekening van Gauss en alle paasdata tot 2030.",
    h1: 'Pasen 2027: zondag 28 maart',
    intro: `Pasen 2027 valt op ${DW(ps, 'nl')}, Tweede Paasdag op ${DW(p2, 'nl')}: vroeg, slechts ${N(vroeg, 'nl')} dagen na de vroegst mogelijke datum.`,
    resume: `Eerste Paasdag 2027 is zondag ${D(ps, 'nl')} en Tweede Paasdag maandag ${D(p2, 'nl')}. Goede Vrijdag, ${D(gv, 'nl')}, staat ook op de lijst van officiële feestdagen. Volgens de Rijksoverheid is Tweede Paasdag bij de meeste bedrijven een vrije dag en voor ambtenaren altijd; op Goede Vrijdag moet u waarschijnlijk gewoon werken, tenzij uw cao (collectieve arbeidsovereenkomst) iets anders zegt. Pasen valt altijd op de eerste zondag na de eerste volle maan van de lente; de vroegste datum is 22 maart, de laatste 25 april. In 2027 valt Pasen dus vroeg, en daarmee ook Hemelvaart (${D(hv, 'nl')}) en Pinksteren. Wie na Pasen vier dagen verlof neemt, van ${D(brug.verlofVan, 'nl')} tot ${D(brug.verlofTot, 'nl')}, is ${N(brug.vrij, 'nl')} dagen vrij. Met Goede Vrijdag vrij worden het er ${N(metGv.vrij, 'nl')}.`,
    faqs: [
      { q: 'Wanneer is Pasen 2027?', a: `Eerste Paasdag is zondag ${D(ps, 'nl')}, Tweede Paasdag maandag ${D(p2, 'nl')} en Goede Vrijdag ${D(gv, 'nl')}. Dat is vroeg: slechts ${N(vroeg, 'nl')} dagen na 22 maart, de vroegst mogelijke paasdatum. Daardoor vallen ook Hemelvaartsdag, op ${D(hv, 'nl')}, en Pinksteren in 2027 relatief vroeg in het voorjaar.` },
      { q: 'Is Tweede Paasdag 2027 een vrije dag?', a: 'Bij de meeste bedrijven wel, en voor ambtenaren altijd, schrijft de Rijksoverheid. Werkt u in een winkel, de zorg of de horeca, kijk dan in uw rooster en cao; daar wordt op feestdagen vaak gewoon gewerkt. De cao regelt ook of u toeslag krijgt. De wet zelf geeft niemand vrij.' },
      { q: 'Hebben scholen een paasvakantie?', a: 'Nee, Nederland kent geen aparte paasvakantie. Scholen zijn meestal dicht op Goede Vrijdag en Tweede Paasdag, zodat leerlingen een lang weekend hebben. De meivakantie begint pas eind april. Welke dagen uw school precies dicht is, staat in de schoolgids; scholen mogen zelf studiedagen toevoegen.' },
    ],
    body: (h) => `<h2>Pasen 2027 en de jaren erna</h2>
${h.table(['Jaar', 'Eerste Paasdag', 'Goede Vrijdag', 'Tweede Paasdag'], jaren.map((y) => [String(y), h.day(F('eerste-paasdag', y)), h.day(F('goede-vrijdag', y)), h.day(F('tweede-paasdag', y))]), 'Paasdata 2026 tot 2030', ['l', 'l', 'l', 'l'])}
<p>De paasdatum hangt af van maan en zon, daarom springt hij. De formule van Gauss vat dat samen in een paar rekenstappen. Voor ${Y} ligt de kerkelijke volle maan op maartdag ${g.OG}; de zondag erna valt ${g.OE} dagen later, op maartdag ${g.OS}. Dat is ${h.day(ps)}. De rekenhulp hierboven laat alle tussenstappen zien voor elk jaar van 2020 tot 2050.</p>
<h2>Vrij met Pasen 2027</h2>
<p>De Rijksoverheid zegt over ${h.src('rijks-tweede-paasdag', 'Tweede Paasdag')} dat de meeste werknemers vrij zijn. Over ${h.src('rijks-goede-vrijdag', 'Goede Vrijdag')} schrijft ze dat u waarschijnlijk moet werken. Het verschil merkt u in de planning: zonder Goede Vrijdag kost een lang paasweekend één verlofdag, met Goede Vrijdag vrij geen.</p>
${h.mini('vrij', { t: 'Bent u vrij op Goede Vrijdag 2027?', d: { pf: 0, fd: 1 }, e: 'Voorbeeld voor een werknemer bij een bedrijf' })}
<p>Meer over de dag zelf op ${h.a('goede-vrijdag-2027', 'Goede Vrijdag 2027')}; de bruggen van het hele jaar op ${h.a('brugdagen-2027', 'brugdagen 2027')}.</p>`,
  },
  en: {
    slug: 'easter-2027', nav: 'Easter 2027', card: `Easter Sunday ${D(ps, 'en')}, Easter Monday ${D(p2, 'en')}`,
    title: 'Easter 2027 Netherlands: date, Easter Monday, Good Friday',
    description: "Easter 2027 is Sunday 28 March, Easter Monday 29 March and Good Friday 26 March. With Gauss's calculation step by step and the Dutch Easter dates up to 2030.",
    h1: 'Easter 2027: Sunday 28 March',
    intro: `Easter 2027 is ${DW(ps, 'en')}, Easter Monday ${DW(p2, 'en')}: early, only ${N(vroeg, 'en')} days after the earliest possible date.`,
    resume: `Easter Sunday 2027 is ${D(ps, 'en')} and Easter Monday ${D(p2, 'en')}. Good Friday, ${D(gv, 'en')}, is on the official holiday list too. According to the Dutch government, Easter Monday is a day off at most companies and always for civil servants; on Good Friday you will probably have to work unless your collective labour agreement (cao) says otherwise. Easter is always the first Sunday after the first full moon of spring; the earliest date is 22 March, the latest 25 April. Easter 2027 is therefore early, and so are Ascension (${D(hv, 'en')}) and Whitsun. Taking four days of leave after Easter, ${D(brug.verlofVan, 'en')} to ${D(brug.verlofTot, 'en')}, gives ${N(brug.vrij, 'en')} days off. With Good Friday off it becomes ${N(metGv.vrij, 'en')}.`,
    faqs: [
      { q: 'When is Easter 2027?', a: `Easter Sunday is ${D(ps, 'en')}, Easter Monday ${D(p2, 'en')} and Good Friday ${D(gv, 'en')}. That is early: only ${N(vroeg, 'en')} days after 22 March, the earliest possible Easter date. So Ascension Day, on ${D(hv, 'en')}, and Whitsun also come fairly early in the spring of 2027.` },
      { q: 'Is Easter Monday 2027 a day off in the Netherlands?', a: 'At most companies yes, and always for civil servants, says the government. In retail, care or hospitality, check your roster and agreement; people there often work on holidays. The agreement also sets any premium. The law itself gives nobody the day off.' },
      { q: 'Do Dutch schools have an Easter break?', a: 'No, there is no separate Easter break. Schools usually close on Good Friday and Easter Monday, which gives pupils a long weekend. The May break only starts at the end of April. Your school guide lists the exact closing days; schools may add their own study days.' },
    ],
    body: (h) => `<h2>Easter 2027 and the years after</h2>
${h.table(['Year', 'Easter Sunday', 'Good Friday', 'Easter Monday'], jaren.map((y) => [String(y), h.day(F('eerste-paasdag', y)), h.day(F('goede-vrijdag', y)), h.day(F('tweede-paasdag', y))]), 'Easter dates 2026 to 2030', ['l', 'l', 'l', 'l'])}
<p>The Easter date depends on moon and sun, which is why it jumps. Gauss's formula condenses that into a few steps. For ${Y} the ecclesiastical full moon falls on March day ${g.OG}; the following Sunday comes ${g.OE} days later, March day ${g.OS}. That is ${h.day(ps)}. The tool above shows every step for any year from 2020 to 2050.</p>
<h2>Days off at Easter 2027</h2>
<p>On ${h.src('rijks-tweede-paasdag', 'Easter Monday')} the government says most employees are off. On ${h.src('rijks-goede-vrijdag', 'Good Friday')} it says you will probably work. That changes your plans: without Good Friday a long Easter weekend costs one leave day, with it none.</p>
${h.mini('vrij', { t: 'Are you off on Good Friday 2027?', d: { pf: 0, fd: 1 }, e: 'Example for an employee at a company' })}
<p>More on the day itself on ${h.a('goede-vrijdag-2027', 'Good Friday 2027')}; the bridges of the whole year on ${h.a('brugdagen-2027', 'bridge days 2027')}.</p>`,
  },
});
