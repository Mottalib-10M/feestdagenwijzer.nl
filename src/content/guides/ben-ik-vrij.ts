/** Ben ik vrij op een feestdag? Per situatie (werknemer, ambtenaar, scholier) wat de Rijksoverheid zegt, en waarom de cao beslist. */
import { defineGuide } from '../../lib/page-types';
import { K, D, N, F } from '../_k';

const Y = 2027;
const ids = ['goede-vrijdag', 'tweede-paasdag', 'koningsdag', 'bevrijdingsdag', 'hemelvaartsdag', 'tweede-pinksterdag'] as const;
const meestal = K.FEESTDAGEN.filter((f) => K.VRIJ[f.id].bedrijf === 'meestal').length;
const wk = K.officieel(Y).filter((f) => !K.isWeekend(K.fromIso(f.date))).length;

export default defineGuide({
  id: 'ben-ik-vrij', group: 'verlof', order: 13, tool: 'bv', toolArg: { fd: 'koningsdag', jaar: Y },
  related: ['goede-vrijdag-2027', 'bevrijdingsdag-2027', 'werkdagen-2027', 'brugdagen-2027'],
  sources: ['rijks-cao', 'rijks-goede-vrijdag', 'rijks-tweede-paasdag', 'rijks-koningsdag', 'rijks-bevrijdingsdag', 'rijks-hemelvaart', 'rijks-tweede-pinksterdag'],
  nl: {
    slug: 'ben-ik-vrij-op-een-feestdag', nav: 'Ben ik vrij op een feestdag?', card: 'Per feestdag en per situatie wat de Rijksoverheid zegt',
    title: "Vrij op een feestdag? Wat geldt voor u in 2027 en daarna",
    description: "Bent u vrij op een feestdag? Geen wet regelt het; uw cao of contract wel. Per feestdag wat de Rijksoverheid zegt voor werknemers, ambtenaren en scholieren.",
    h1: 'Vrij op een feestdag: wat geldt voor u?',
    intro: 'Vrij op een feestdag bent u alleen als uw cao, contract of werkgever dat zegt; de wet regelt het niet.',
    resume: `Veel mensen denken dat een officiële feestdag automatisch een vrije dag is. Dat klopt niet: in Nederland staat in geen enkele wet dat werknemers op een feestdag vrij zijn. Dat regelt de cao, de collectieve arbeidsovereenkomst die werkgevers en vakbonden per sector of bedrijf afsluiten, of anders uw arbeidsovereenkomst. De Rijksoverheid beschrijft per feestdag wat gangbaar is. Van de elf officiële feestdagen noemt ze er ${N(meestal, 'nl')} bij de meeste bedrijven een vrije dag: Tweede Paasdag, Koningsdag, Hemelvaartsdag en Tweede Pinksterdag. Ambtenaren zijn op die dagen vrij. Op Goede Vrijdag moet u waarschijnlijk werken; op Bevrijdingsdag is niet iedereen vrij. Scholen zijn op vrijwel al deze dagen dicht. In ${Y} vallen ${N(wk, 'nl')} van de elf feestdagen op een weekdag. De rekenhulp hierboven geeft per feestdag, per jaar en per situatie het antwoord en de bron.`,
    faqs: [
      { q: 'Heb ik recht op een vrije dag op een feestdag?', a: 'Niet volgens de wet. Geen Nederlandse wet geeft werknemers vrij op een officiële feestdag. Uw cao (collectieve arbeidsovereenkomst) of uw arbeidsovereenkomst bepaalt welke feestdagen vrij zijn. Staat er niets in, dan beslist uw werkgever. Wat de Rijksoverheid per feestdag schrijft over wie meestal vrij is, ziet u in de rekenhulp bovenaan deze pagina.' },
      { q: 'Moet mijn werkgever extra betalen als ik op een feestdag werk?', a: 'Alleen als uw cao of contract een toeslag regelt. De wet schrijft geen feestdagtoeslag voor, en ook geen vervangende vrije dag. In sectoren die altijd doorwerken, zoals de zorg, de horeca en het openbaar vervoer, staat de toeslag meestal in de cao. Vraag het na bij uw werkgever of de vakbond als u twijfelt.' },
      { q: 'Wat is een cao?', a: 'Een collectieve arbeidsovereenkomst: schriftelijke afspraken over loon, werktijden, toeslagen en vrije dagen, gemaakt tussen werkgevers en vakbonden. Een cao geldt voor één bedrijf of voor een hele sector. In de cao staat meestal ook welke feestdagen vrij zijn. Uw werkgever kan u vertellen welke cao op uw baan van toepassing is.' },
    ],
    body: (h) => `<h2>Vrij op een feestdag in 2027: overzicht per situatie</h2>
${h.table(['Feestdag', 'Datum 2027', 'Werknemer', 'Ambtenaar', 'Scholier'], ids.map((id) => [h.defOf(id).name.nl, h.day(F(id, Y)), h.statusVol(h.VRIJ[id].bedrijf, 'nl'), h.statusVol(h.VRIJ[id].ambtenaar, 'nl'), h.statusVol(h.VRIJ[id].school, 'nl')]), 'Wat de Rijksoverheid per feestdag zegt, voor de dagen met een eigen toelichting', ['l', 'l', 'l', 'l', 'l'])}
<p>Elke regel volgt de vraag-en-antwoordpagina van de Rijksoverheid voor die dag, bijvoorbeeld over ${h.src('rijks-hemelvaart', 'Hemelvaartsdag')} of ${h.src('rijks-bevrijdingsdag', 'Bevrijdingsdag')}. Voor ambtenaren noemt de Rijksoverheid mogelijke uitzonderingen bij politie, defensie en academische ziekenhuizen.</p>
<h2>Waar u het zeker weet</h2>
<p>Zoek uw cao op, of vraag uw werkgever welke cao geldt. Daarin staat een lijst met erkende feestdagen en, in sectoren met roosters, de toeslag voor werken op die dagen. De ${h.src('rijks-cao', 'Rijksoverheid legt uit')} wat een cao is en voor wie hij geldt.</p>
${h.mini('werk', { t: 'Hoeveel werkdagen houdt u over in 2027?', d: { jaar: 2027, week: 5 }, e: 'Voorbeeld voor 2027 bij 5 dagen per week' })}
<p>Een feestdag die in het weekend valt, wordt in Nederland niet gecompenseerd. Hoeveel werkdagen u overhoudt, ziet u op ${h.a('werkdagen-2027', 'werkdagen 2027')}.</p>`,
  },
  en: {
    slug: 'am-i-off-on-a-public-holiday', nav: 'Am I off on a holiday?', card: 'What the government says per holiday and situation',
    title: 'Day off on a Dutch public holiday? What applies in 2027',
    description: "Are you off on a Dutch public holiday? No law says so; your agreement or contract does. Per holiday: the government view for employees, civil servants, pupils.",
    h1: 'Day off on a Dutch public holiday: what applies to you?',
    intro: 'A day off on a public holiday is yours only if your agreement, contract or employer says so; Dutch law does not.',
    resume: `Many people assume an official public holiday is automatically a day off. It is not: no Dutch law says employees are off on a holiday. That is settled by the collective labour agreement (cao) that employers and unions sign per sector or company, or otherwise by your employment contract. The government describes what is usual for each holiday. Of the eleven official holidays it calls ${N(meestal, 'en')} a day off at most companies: Easter Monday, King's Day, Ascension Day and Whit Monday. Civil servants are off on those days. On Good Friday you will probably work; on Liberation Day not everyone is off. Schools close on nearly all of these days. In ${Y}, ${N(wk, 'en')} of the eleven holidays fall on a weekday. The tool above gives the answer and the source for each holiday, year and situation.`,
    faqs: [
      { q: 'Am I entitled to a day off on a public holiday?', a: 'Not by law. No Dutch law gives employees a public holiday off. Your collective labour agreement (cao) or your employment contract sets which holidays are off. If neither says anything, your employer decides. What the government writes per holiday about who is usually off is shown in the tool at the top of this page.' },
      { q: 'Must my employer pay extra if I work on a holiday?', a: 'Only if your agreement or contract sets a premium. The law requires no holiday premium and no substitute day off. In sectors that never stop, such as care, hospitality and public transport, the premium is usually in the collective agreement. Ask your employer or your union if you are unsure.' },
      { q: 'What is a cao?', a: 'A collective labour agreement: written terms on pay, hours, premiums and days off, agreed between employers and unions. A cao covers one company or a whole sector. It usually also lists which public holidays are days off. Your employer can tell you which agreement applies to your job.' },
    ],
    body: (h) => `<h2>Day off on a public holiday in 2027: overview by situation</h2>
${h.table(['Holiday', 'Date 2027', 'Employee', 'Civil servant', 'Pupil'], ids.map((id) => [h.defOf(id).name.en, h.day(F(id, Y)), h.statusVol(h.VRIJ[id].bedrijf, 'en'), h.statusVol(h.VRIJ[id].ambtenaar, 'en'), h.statusVol(h.VRIJ[id].school, 'en')]), 'What the government says per holiday, for the days with their own guidance', ['l', 'l', 'l', 'l', 'l'])}
<p>Each row follows the government Q&amp;A page for that day, for example on ${h.src('rijks-hemelvaart', 'Ascension Day')} or ${h.src('rijks-bevrijdingsdag', 'Liberation Day')}. For civil servants the government mentions possible exceptions in the police, defence and academic hospitals.</p>
<h2>Where to be sure</h2>
<p>Look up your agreement, or ask your employer which one applies. It lists the recognised holidays and, in rostered sectors, the premium for working them. The ${h.src('rijks-cao', 'government explains')} what a cao is and whom it covers.</p>
${h.mini('werk', { t: 'How many working days do you have left in 2027?', d: { jaar: 2027, week: 5 }, e: 'Example for 2027 at 5 days a week' })}
<p>A holiday at the weekend is not compensated in the Netherlands. How many working days remain is on ${h.a('werkdagen-2027', 'working days 2027')}.</p>`,
  },
});
