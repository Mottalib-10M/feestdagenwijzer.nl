/** Goede Vrijdag 2027: wel officiële feestdag, meestal geen vrije dag; wat per situatie geldt en wat het kost. */
import { defineGuide } from '../../lib/page-types';
import { K, D, DW, N, F } from '../_k';

const Y = 2027;
const gv = F('goede-vrijdag', Y), ps = F('eerste-paasdag', Y), p2 = F('tweede-paasdag', Y);
const w0 = K.werkdagen(Y).reduce((a, b) => a + b, 0), w1 = K.werkdagen(Y, { goedeVrijdag: true }).reduce((a, b) => a + b, 0);
const term = K.verleng(gv);

export default defineGuide({
  id: 'goede-vrijdag-2027', group: 'feestdagen', order: 4, tool: 'bv', toolArg: { fd: 'goede-vrijdag', jaar: Y },
  related: ['pasen-2027', 'ben-ik-vrij', 'termijnen-feestdagen', 'bevrijdingsdag-2027'],
  sources: ['rijks-goede-vrijdag', 'rijks-feestdagen', 'rijks-cao', 'termijnenwet'],
  nl: {
    slug: 'goede-vrijdag-2027', nav: 'Goede Vrijdag 2027', card: `${D(gv, 'nl')}: officieel, maar meestal werken`,
    title: "Goede Vrijdag 2027: vrij of werken op vrijdag 26 maart?",
    description: "Goede Vrijdag 2027 valt op 26 maart. Officieel een feestdag, maar volgens de Rijksoverheid werkt u meestal. Wat geldt voor werknemers, ambtenaren en scholieren.",
    h1: 'Goede Vrijdag 2027: vrij of niet?',
    intro: `Goede Vrijdag 2027 valt op ${DW(gv, 'nl')}; volgens de Rijksoverheid moet u die dag waarschijnlijk gewoon werken.`,
    resume: `Goede Vrijdag staat op de lijst van officiële feestdagen, maar dat maakt hem nog geen vrije dag. De Rijksoverheid schrijft dat werknemers op Goede Vrijdag waarschijnlijk gewoon moeten werken, en dat dat ook voor ambtenaren geldt. Alleen als uw cao (collectieve arbeidsovereenkomst), uw contract of uw werkgever de dag vrij geeft, bent u vrij. Scholieren en studenten zijn meestal wel vrij: scholen zijn op Goede Vrijdag vaak dicht. In ${Y} valt de dag op ${D(gv, 'nl')}, twee dagen voor Eerste Paasdag op ${D(ps, 'nl')}. Heeft u hem vrij, dan wordt Pasen een weekend van vier dagen tot en met ${D(p2, 'nl')}, en telt ${Y} ${N(w1, 'nl')} werkdagen in plaats van ${N(w0, 'nl')}. Voor wettelijke termijnen telt Goede Vrijdag wel als feestdag: een termijn die op ${D(gv, 'nl')} eindigt, loopt door tot ${D(term.verlengd, 'nl')}.`,
    faqs: [
      { q: 'Is Goede Vrijdag 2027 een vrije dag?', a: `Voor de meeste werknemers niet. Goede Vrijdag, ${DW(gv, 'nl')}, staat op de lijst van officiële feestdagen, maar volgens de Rijksoverheid werken werknemers en ambtenaren die dag meestal gewoon. Of u vrij bent, hangt af van uw cao of werkgever. Scholen zijn meestal dicht, dus regel op tijd opvang.` },
      { q: 'Krijg ik toeslag als ik op Goede Vrijdag werk?', a: 'Alleen als uw cao Goede Vrijdag noemt als feestdag met toeslag. Staat er niets over, dan is het een gewone werkdag met gewoon loon. Sommige cao’s noemen Goede Vrijdag wel, andere niet. Twijfelt u, vraag het dan na bij uw werkgever, de ondernemingsraad of uw vakbond.' },
      { q: 'Telt Goede Vrijdag voor een betalingstermijn?', a: `Ja. Voor de Algemene termijnenwet is Goede Vrijdag gelijkgesteld aan een erkende feestdag. Een wettelijke termijn die op ${D(gv, 'nl')} eindigt, schuift door naar ${D(term.verlengd, 'nl')}, omdat ook het weekend en Tweede Paasdag niet meetellen. Een afgesproken betaaltermijn valt er niet vanzelf onder.` },
    ],
    body: (h) => `<h2>Goede Vrijdag 2027 per situatie</h2>
<p>De ${h.src('rijks-goede-vrijdag', 'vraag-en-antwoordpagina van de Rijksoverheid')} maakt onderscheid tussen werknemers, ambtenaren en scholieren. De rekenhulp bovenaan volgt die indeling. In het kort: werknemers en ambtenaren werken meestal, scholieren zijn meestal vrij. Het eigenlijke antwoord staat in uw ${h.src('rijks-cao', 'cao')}: daar staat welke feestdagen vrij zijn, en of u bij werken een toeslag krijgt.</p>
<h2>Wat Goede Vrijdag u kost of oplevert</h2>
<p>Is Goede Vrijdag geen vrije dag, dan kost een lang paasweekend één verlofdag. In ${Y} is het jaar dan ${N(w0, 'nl')} werkdagen lang. Geeft uw werkgever de dag wel vrij, dan zijn het er ${N(w1, 'nl')}. Zet de optie in de ${h.a('brugdagen-2027', 'brugdagenplanner')} aan om te zien hoe uw verlofplan verandert.</p>
${h.mini('werk', { t: 'Werkdagen 2027 bij uw aantal dagen per week', d: { jaar: 2027, week: 5 }, e: 'Voorbeeld voor 2027 bij 5 dagen per week (Goede Vrijdag telt hier altijd als werkdag)' })}
<h2>Goede Vrijdag en termijnen</h2>
<p>Bij termijnen is het anders: de ${h.src('termijnenwet', 'Algemene termijnenwet')} stelt Goede Vrijdag gelijk aan de erkende feestdagen. Een bezwaartermijn of betaaltermijn die op ${h.wday(gv)} eindigt, verloopt pas op ${h.wday(term.verlengd)}. Reken het uit op ${h.a('termijnen-feestdagen', 'termijnen en feestdagen')}.</p>`,
  },
  en: {
    slug: 'good-friday-2027', nav: 'Good Friday 2027', card: `${D(gv, 'en')}: official, but usually a working day`,
    title: 'Good Friday 2027 Netherlands: day off or working day?',
    description: "Good Friday 2027 falls on 26 March. An official Dutch holiday, but the government says most people work. What applies to employees, civil servants and pupils.",
    h1: 'Good Friday 2027: a day off or not?',
    intro: `Good Friday 2027 falls on ${DW(gv, 'en')}; according to the Dutch government you will probably have to work that day.`,
    resume: `Good Friday is on the list of official holidays, but that does not make it a day off. The Dutch government writes that employees will probably have to work on Good Friday, and that the same goes for civil servants. You are only off if your collective labour agreement (cao), contract or employer gives you the day. Pupils and students are usually off, because schools often close on Good Friday. In ${Y} the day falls on ${D(gv, 'en')}, two days before Easter Sunday on ${D(ps, 'en')}. If you have it off, Easter becomes a four-day weekend through ${D(p2, 'en')}, and ${Y} counts ${N(w1, 'en')} working days instead of ${N(w0, 'en')}. For statutory deadlines Good Friday does count as a holiday: a deadline ending on ${D(gv, 'en')} runs on to ${D(term.verlengd, 'en')}.`,
    faqs: [
      { q: 'Is Good Friday 2027 a day off in the Netherlands?', a: `For most employees, no. Good Friday, ${DW(gv, 'en')}, is on the official holiday list, but the government says employees and civil servants usually work that day. Whether you are off depends on your agreement or employer. Schools usually close, so arrange childcare in good time.` },
      { q: 'Do I get a premium for working on Good Friday?', a: 'Only if your agreement lists Good Friday as a holiday with a premium. If it says nothing, it is an ordinary working day at ordinary pay. Some agreements name Good Friday, others do not. If in doubt, ask your employer, the works council or your union.' },
      { q: 'Does Good Friday count for a payment deadline?', a: `Yes. Under the General Time Limits Act, Good Friday is treated as a recognised holiday. A statutory deadline ending on ${D(gv, 'en')} moves to ${D(term.verlengd, 'en')}, because the weekend and Easter Monday do not count either. A payment term you agreed with a supplier is not covered automatically.` },
    ],
    body: (h) => `<h2>Good Friday 2027 by situation</h2>
<p>The ${h.src('rijks-goede-vrijdag', 'government Q&amp;A page')} separates employees, civil servants and pupils, and the tool above follows that split. In short: employees and civil servants usually work, pupils are usually off. The real answer is in your ${h.src('rijks-cao', 'collective agreement')}: it lists which holidays are off and whether working them earns a premium.</p>
<h2>What Good Friday costs or gives you</h2>
<p>If Good Friday is not a day off, a long Easter weekend costs one leave day, and ${Y} has ${N(w0, 'en')} working days. If your employer gives it off, there are ${N(w1, 'en')}. Switch the option on in the ${h.a('brugdagen-2027', 'bridge-day planner')} to see how your leave plan changes.</p>
${h.mini('werk', { t: 'Working days 2027 at your days per week', d: { jaar: 2027, week: 5 }, e: 'Example for 2027 at 5 days a week (Good Friday always counts as a working day here)' })}
<h2>Good Friday and deadlines</h2>
<p>Deadlines work differently: the ${h.src('termijnenwet', 'General Time Limits Act')} treats Good Friday like the recognised holidays. An objection or payment deadline ending on ${h.wday(gv)} only expires on ${h.wday(term.verlengd)}. Work it out on ${h.a('termijnen-feestdagen', 'deadlines and holidays')}.</p>`,
  },
});
