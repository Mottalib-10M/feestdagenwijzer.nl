/** Werkdagen 2027: per maand, per kwartaal, bij 4 of 3 dagen per week, met en zonder Goede Vrijdag en 5 mei. */
import { defineGuide } from '../../lib/page-types';
import { K, D, N, opWeek, WERK } from '../_k';

const Y = 2027;
const m = K.werkdagen(Y), werk = WERK(Y), wd = K.weekdagen(Y), vrij = opWeek(Y).length;
const met = K.werkdagen(Y, { goedeVrijdag: true, bevrijdingsdag: true }).reduce((a, b) => a + b, 0);
const kw = [0, 3, 6, 9].map((i) => m.slice(i, i + 3).reduce((a, b) => a + b, 0));
const w26 = WERK(2026), w28 = WERK(2028);
const mnd = (l: 'nl' | 'en') => Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(Y, i, 15)).toLocaleDateString(l === 'nl' ? 'nl-NL' : 'en-GB', { month: 'long', timeZone: 'UTC' }));
const minI = m.indexOf(Math.min(...m)), maxI = m.indexOf(Math.max(...m));

export default defineGuide({
  id: 'werkdagen-2027', group: 'verlof', order: 12, tool: 'wd', toolArg: { jaar: Y },
  related: ['brugdagen-2027', 'kalender-2027', 'goede-vrijdag-2027', 'termijnen-feestdagen'],
  sources: ['rijks-feestdagen', 'rijks-goede-vrijdag', 'rijks-bevrijdingsdag'],
  nl: {
    slug: 'werkdagen-2027', nav: 'Werkdagen 2027', card: `${N(werk, 'nl')} werkdagen, per maand en per kwartaal`,
    title: 'Werkdagen 2027: aantal per maand, kwartaal en jaar',
    description: "Werkdagen 2027 in Nederland: 256 bij een werkweek van maandag tot vrijdag, 254 als Goede Vrijdag en 5 mei vrij zijn. Per maand, per kwartaal en bij deeltijd.",
    h1: 'Werkdagen 2027: per maand en per jaar',
    intro: `Werkdagen 2027: ${N(werk, 'nl')} bij een volle werkweek, als u de feestdagen vrij heeft die bij de meeste werkgevers vrij zijn.`,
    resume: `${Y} telt ${N(wd, 'nl')} dagen van maandag tot en met vrijdag. Daarvan vallen er ${N(vrij, 'nl')} op een feestdag die bij de meeste werkgevers vrij is: Nieuwjaarsdag, Tweede Paasdag, Koningsdag, Hemelvaartsdag en Tweede Pinksterdag. Beide Kerstdagen vallen dit jaar in het weekend. Zo blijven er ${N(werk, 'nl')} werkdagen over, tegen ${N(w26, 'nl')} in 2026 en ${N(w28, 'nl')} in 2028. Heeft u ook Goede Vrijdag en Bevrijdingsdag vrij, dan zijn het er ${N(met, 'nl')}. De kortste maand is ${mnd('nl')[minI]} met ${N(m[minI], 'nl')} werkdagen, de langste ${mnd('nl')[maxI]} met ${N(m[maxI], 'nl')}. Per kwartaal: ${kw.map((x) => N(x, 'nl')).join(', ')}. Werkt u vier dagen per week, reken dan met ongeveer vier vijfde, maar welke weekdag u vrij heeft, maakt verschil: wie op maandag vrij is, verliest geen feestdag aan Tweede Paasdag of Tweede Pinksterdag. Vakantiedagen zijn hier niet afgetrokken.`,
    faqs: [
      { q: 'Hoeveel werkdagen heeft 2027?', a: `${N(werk, 'nl')} bij een werkweek van maandag tot en met vrijdag, zonder de vijf feestdagen die bij de meeste werkgevers vrij zijn: Nieuwjaarsdag, Tweede Paasdag, Koningsdag, Hemelvaartsdag en Tweede Pinksterdag. Zijn Goede Vrijdag en 5 mei ook vrij, dan zijn het er ${N(met, 'nl')}. In 2026 waren het er ${N(w26, 'nl')}.` },
      { q: 'Hoeveel werkdagen heeft mei 2027?', a: `${N(m[4], 'nl')} bij een werkweek van maandag tot en met vrijdag. Koningsdag valt in april; in mei vallen Hemelvaartsdag en Tweede Pinksterdag, en als u vrij bent ook Bevrijdingsdag op 5 mei. Wie in mei ook de vrijdag na Hemelvaart vrij neemt, werkt nog een dag minder.` },
      { q: 'Tellen vakantiedagen mee?', a: 'Nee. Dit is het aantal werkdagen in het rooster, voordat u verlof opneemt. Trek uw eigen verlofdagen er zelf van af. Werkt u parttime, vermenigvuldig dan met uw deel van de week: bij vier dagen per week ongeveer vier vijfde, afhankelijk van op welke dagen de feestdagen vallen.' },
    ],
    body: (h) => `<h2>Werkdagen 2027 per maand</h2>
${h.table(['Maand', 'Werkdagen', 'Weekdagen'], mnd('nl').map((mn, i) => { let c = 0; for (let d = K.dayNum(Y, i + 1, 1); d < K.dayNum(Y, i + 2, 1); d++) if (!K.isWeekend(d)) c++; return [mn, m[i], c]; }), `Werkdagen per maand in ${Y}, zonder Goede Vrijdag en 5 mei als vrije dag`, ['l', 'r', 'r'])}
<p>De derde kolom telt alle dagen van maandag tot vrijdag; het verschil met de tweede zijn de vrije feestdagen. Salarisadministraties gebruiken het aantal werkdagen voor een dagloon; zzp’ers voor een omzetraming.</p>
<h2>Werkdagen 2027 bij een deeltijdbaan</h2>
<p>Bij drie of vier dagen per week hangt het af van uw vaste vrije dag. Twee van de vijf vrije feestdagen van ${Y} vallen op maandag, de andere drie op vrijdag, dinsdag en donderdag. Wie op maandag vrij is, heeft daar dus geen voordeel van; wie op woensdag vrij is, wel.</p>
${h.mini('werk', { t: 'Werkdagen 2027 bij uw werkweek', d: { jaar: 2027, week: 4 }, e: 'Voorbeeld voor 2027 bij 4 dagen per week' })}
<p>De rekenhulp bovenaan telt ook uren, met uw aantal uren per dag. Zet daar Goede Vrijdag of 5 mei aan als ze in uw cao vrij zijn; de ${h.src('rijks-goede-vrijdag', 'Rijksoverheid')} gaat ervan uit dat u op Goede Vrijdag werkt.</p>`,
  },
  en: {
    slug: 'working-days-2027', nav: 'Working days 2027', card: `${N(werk, 'en')} working days, by month and quarter`,
    title: 'Working days 2027 Netherlands: by month, quarter and year',
    description: `Working days 2027 in the Netherlands: ${N(werk, 'en')} for a Monday-to-Friday week, ${N(met, 'en')} if Good Friday and 5 May are off. By month, by quarter and for part-time work.`,
    h1: 'Working days 2027: by month and for the year',
    intro: `Working days 2027: ${N(werk, 'en')} for a full working week, with the holidays most Dutch employers give off.`,
    resume: `${Y} has ${N(wd, 'en')} days from Monday to Friday. Of those, ${N(vrij, 'en')} fall on a holiday most employers give off: New Year's Day, Easter Monday, King's Day, Ascension Day and Whit Monday. Both Christmas days fall at the weekend this year. That leaves ${N(werk, 'en')} working days, against ${N(w26, 'en')} in 2026 and ${N(w28, 'en')} in 2028. With Good Friday and Liberation Day off as well, it is ${N(met, 'en')}. The shortest month is ${mnd('en')[minI]} with ${N(m[minI], 'en')} working days, the longest ${mnd('en')[maxI]} with ${N(m[maxI], 'en')}. By quarter: ${kw.map((x) => N(x, 'en')).join(', ')}. On a four-day week, count roughly four fifths, but your day off matters: if Monday is your day off, Easter Monday and Whit Monday give you nothing extra. Annual leave is not deducted here; take your own leave days off the total yourself.`,
    faqs: [
      { q: 'How many working days are there in 2027?', a: `${N(werk, 'en')} for a Monday-to-Friday week, without the five holidays most employers give off: New Year's Day, Easter Monday, King's Day, Ascension Day and Whit Monday. With Good Friday and 5 May off too, it is ${N(met, 'en')}. In 2026 there were ${N(w26, 'en')}.` },
      { q: 'How many working days does May 2027 have?', a: `${N(m[4], 'en')} for a Monday-to-Friday week. King's Day is in April; May has Ascension Day and Whit Monday, and Liberation Day on 5 May if you are off. If you also take the Friday after Ascension off, you work one day less in May.` },
      { q: 'Is annual leave included?', a: 'No. This is the number of rostered working days before you take leave. Subtract your own leave days yourself. If you work part-time, multiply by your share of the week: for four days a week roughly four fifths, depending on which weekdays the holidays fall on.' },
    ],
    body: (h) => `<h2>Working days 2027 by month</h2>
${h.table(['Month', 'Working days', 'Weekdays'], mnd('en').map((mn, i) => { let c = 0; for (let d = K.dayNum(Y, i + 1, 1); d < K.dayNum(Y, i + 2, 1); d++) if (!K.isWeekend(d)) c++; return [mn, m[i], c]; }), `Working days per month in ${Y}, Good Friday and 5 May counted as working days`, ['l', 'r', 'r'])}
<p>The third column counts every Monday to Friday; the gap with the second is the holidays off. Payroll uses the number of working days for a daily rate; freelancers for a turnover estimate.</p>
<h2>Working days 2027 on a part-time contract</h2>
<p>On three or four days a week it depends on your fixed day off. Two of the five holidays off in ${Y} fall on a Monday, the other three on a Friday, Tuesday and Thursday. If Monday is your day off you gain nothing from them; if Wednesday is, you do.</p>
${h.mini('werk', { t: 'Working days 2027 for your week', d: { jaar: 2027, week: 4 }, e: 'Example for 2027 at 4 days a week' })}
<p>The tool at the top also counts hours at your hours per day. Switch on Good Friday or 5 May there if your agreement gives them off; the ${h.src('rijks-goede-vrijdag', 'government')} assumes you work on Good Friday.</p>`,
  },
});
