/** Termijnen en feestdagen: de Algemene termijnenwet (art. 1-3), voorbeelden 2027, wat wel en niet meetelt. */
import { defineGuide } from '../../lib/page-types';
import { K, D, DW, N, F } from '../_k';

const Y = 2027;
const ex = [F('goede-vrijdag', Y), F('koningsdag', Y), F('bevrijdingsdag', Y), F('eerste-kerstdag', Y), `${Y + 1}-01-01`].map((d) => [d, K.verleng(d)] as const);
const bv = K.verleng(F('bevrijdingsdag', Y));
const k1 = K.verleng(F('eerste-kerstdag', Y));

export default defineGuide({
  id: 'termijnen-feestdagen', group: 'feestdagen', order: 9, tool: 'tm', toolArg: { dag: 5, maand: 5, jaar: Y },
  related: ['goede-vrijdag-2027', 'bevrijdingsdag-2027', 'werkdagen-2027', 'kalender-2027'],
  sources: ['termijnenwet', 'rijks-feestdagen', 'rijks-goede-vrijdag'],
  nl: {
    slug: 'termijnen-en-feestdagen', nav: 'Termijn op een feestdag', card: 'Algemene termijnenwet: wanneer een termijn echt afloopt',
    title: 'Termijn op een feestdag: wanneer loopt hij af? (2027)',
    description: "Termijn op een feestdag of in het weekend? De Algemene termijnenwet verlengt hem tot de eerstvolgende werkdag. Reken uit wanneer uw bezwaartermijn echt afloopt.",
    h1: 'Termijn op een feestdag: tot wanneer heeft u de tijd?',
    intro: `Een termijn op een feestdag, zaterdag of zondag loopt door tot de eerstvolgende werkdag; eindigt hij op ${DW(F('bevrijdingsdag', Y), 'nl')}, dan heeft u tot ${D(bv.verlengd, 'nl')}.`,
    resume: `De Algemene termijnenwet regelt wat er gebeurt als een wettelijke termijn eindigt op een dag waarop niemand werkt. Artikel 1 zegt: valt de laatste dag op een zaterdag, een zondag of een algemeen erkende feestdag, dan wordt de termijn verlengd tot en met de eerstvolgende dag die dat niet is. Artikel 3 noemt de erkende feestdagen: Nieuwjaarsdag, Tweede Paasdag, Hemelvaartsdag, Tweede Pinksterdag, beide Kerstdagen, de dag waarop de verjaardag van de Koning wordt gevierd en 5 mei. Goede Vrijdag is bij besluit met die dagen gelijkgesteld. Artikel 2 voegt eraan toe dat een termijn van minstens drie dagen ten minste twee werkdagen moet bevatten. De wet geldt voor termijnen uit een wet, zoals bezwaar, beroep en wettelijke betaaltermijnen, en voor contracten die ernaar verwijzen. Een voorbeeld uit ${Y}: een termijn die eindigt op Bevrijdingsdag, woensdag 5 mei, loopt over Hemelvaart heen tot ${DW(bv.verlengd, 'nl')}.`,
    faqs: [
      { q: 'Geldt 5 mei ook als 5 mei voor mij geen vrije dag is?', a: `Ja. Voor de Algemene termijnenwet is 5 mei elk jaar een erkende feestdag, los van uw cao of rooster. Een wettelijke termijn die op ${D(F('bevrijdingsdag', Y), 'nl')} eindigt, loopt daarom door tot en met ${DW(bv.verlengd, 'nl')}. Dat geldt ook voor bezwaar- en beroepstermijnen bij de overheid.` },
      { q: 'Tot wanneer loopt een termijn die op Eerste Kerstdag 2027 eindigt?', a: `Tot en met ${DW(k1.verlengd, 'nl')}. Eerste Kerstdag is in 2027 een zaterdag en Tweede Kerstdag een zondag; beide tellen niet mee. De maandag erna is weer een gewone dag, dus daar eindigt de termijn. De rekenhulp hierboven rekent dit voor elke einddatum uit.` },
      { q: 'Geldt de wet voor een factuur met betaaltermijn?', a: 'Alleen als de termijn uit een wet komt, of als het contract naar de Algemene termijnenwet verwijst. Een betaaltermijn die u zelf met een leverancier of klant afspreekt, valt er niet vanzelf onder; dan geldt wat in het contract staat. Twijfelt u bij een belangrijke termijn, vraag dan juridisch advies.' },
    ],
    body: (h) => `<h2>Termijn op een feestdag in 2027: voorbeelden</h2>
${h.table(['Termijn eindigt op', 'Loopt door tot en met', 'Extra dagen'], ex.map(([d, r]) => [h.wday(d), h.wday(r.verlengd), r.dagen]), `Hoe de Algemene termijnenwet uitpakt rond de feestdagen van ${Y}`, ['l', 'l', 'r'])}
<p>De tekst van de wet staat op ${h.src('termijnenwet', 'wetten.overheid.nl')}. Welke feestdagen er in een jaar vallen, staat in de ${h.src('rijks-feestdagen', 'lijst van de Rijksoverheid')}. De rekenhulp bovenaan past artikel 1 toe op elke datum en, als u de lengte van de termijn invult, ook artikel 2.</p>
<h2>Wat niet onder de wet valt</h2>
<p>Termijnen die terugrekenen vanaf een gebeurtenis, zoals “uiterlijk tien dagen voor de zitting”, worden niet verlengd. Ook afspraken in een contract zonder verwijzing naar de wet vallen erbuiten. Bij twijfel geldt: dien op tijd in, liefst een werkdag voor het einde.</p>
${h.mini('termijn', { t: 'Eindigt uw termijn op een feestdag?', d: { fd: 6, jaar: 2027 }, e: 'Voorbeeld: termijn die eindigt op Hemelvaartsdag 2027' })}
<p>Welke dagen in ${Y} feestdagen zijn, ziet u ook in de ${h.a('kalender-2027', 'kalender 2027')}.</p>`,
  },
  en: {
    slug: 'deadlines-and-public-holidays', nav: 'Deadline on a holiday', card: 'General Time Limits Act: when a deadline really ends',
    title: "Deadline on a Dutch public holiday: when does it end? 2027",
    description: "A deadline ending on a Dutch public holiday or a weekend runs on to the next working day under the General Time Limits Act. See when your deadline really ends.",
    h1: 'Deadline on a Dutch public holiday: how long do you have?',
    intro: `A deadline ending on a Dutch public holiday, Saturday or Sunday runs on to the next working day; one ending ${DW(F('bevrijdingsdag', Y), 'en')} runs to ${D(bv.verlengd, 'en')}.`,
    resume: `The General Time Limits Act (Algemene termijnenwet) sets what happens when a statutory deadline ends on a day nobody works. Section 1: if the last day is a Saturday, a Sunday or a generally recognised holiday, the deadline is extended up to and including the next day that is none of these. Section 3 lists the recognised holidays: New Year's Day, Easter Monday, Ascension Day, Whit Monday, both Christmas days, the day the King's birthday is celebrated and 5 May. Good Friday is treated the same by decree. Section 2 adds that a deadline of at least three days must contain at least two working days. The act covers deadlines set by law, such as objections, appeals and statutory payment terms, and contracts that refer to it. An example from ${Y}: a deadline ending on Liberation Day, Wednesday 5 May, runs past Ascension to ${DW(bv.verlengd, 'en')}.`,
    faqs: [
      { q: 'Does 5 May count even if it is not a day off for me?', a: `Yes. For the General Time Limits Act, 5 May is a recognised holiday every year, regardless of your agreement or roster. A statutory deadline ending on ${D(F('bevrijdingsdag', Y), 'en')} therefore runs until ${DW(bv.verlengd, 'en')}. The same applies to objection and appeal deadlines with the government.` },
      { q: 'When does a deadline ending on Christmas Day 2027 run out?', a: `On ${DW(k1.verlengd, 'en')}. Christmas Day 2027 is a Saturday and Boxing Day a Sunday; neither counts. The Monday after is an ordinary day again, so the deadline ends there. The tool above works this out for any end date.` },
      { q: 'Does the act apply to an invoice payment term?', a: 'Only if the term comes from a law, or the contract refers to the General Time Limits Act. A payment term you agree with a supplier or customer is not covered automatically; then the contract applies. If an important deadline is at stake, get legal advice.' },
    ],
    body: (h) => `<h2>Deadline on a public holiday in 2027: examples</h2>
${h.table(['Deadline ends on', 'Runs on to', 'Extra days'], ex.map(([d, r]) => [h.wday(d), h.wday(r.verlengd), r.dagen]), `How the General Time Limits Act works around the ${Y} holidays`, ['l', 'l', 'r'])}
<p>The text of the act is on ${h.src('termijnenwet', 'wetten.overheid.nl')}. Which holidays fall in a year is on the ${h.src('rijks-feestdagen', 'government list')}. The tool at the top applies section 1 to any date and, if you enter the length of the deadline, section 2 too.</p>
<h2>What the act does not cover</h2>
<p>Deadlines counted back from an event, such as “no later than ten days before the hearing”, are not extended. Contract terms that do not refer to the act fall outside it too. When in doubt, file in time, ideally a working day before the end.</p>
${h.mini('termijn', { t: 'Does your deadline end on a holiday?', d: { fd: 6, jaar: 2027 }, e: 'Example: deadline ending on Ascension Day 2027' })}
<p>Which days are holidays in ${Y} is also shown in the ${h.a('kalender-2027', 'calendar 2027')}.</p>`,
  },
});
