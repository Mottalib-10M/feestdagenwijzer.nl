/** Feestdagen 2029: Bevrijdingsdag op zaterdag, Koningsdag op vrijdag, Kerst op dinsdag en woensdag, drie brugdagen. */
import { defineGuide } from '../../lib/page-types';
import { K, D, DW, WD, SPAN, N, F, opWeek, BD, WERK, OPT } from '../_k';
import { verlofNaarVrij } from '../../lib/tool-specs';

const Y = 2029;
const wk = opWeek(Y), bd = BD(Y), werk = WERK(Y);
const kd = F('koningsdag', Y), bv = F('bevrijdingsdag', Y), hv = F('hemelvaartsdag', Y), ps = F('eerste-paasdag', Y), k1 = F('eerste-kerstdag', Y), nj = F('nieuwjaarsdag', Y);
const kb = bd.find((b) => b.verlofVan.endsWith('12-24'))!;
// Testeurs naïfs 2026-11-14 : le texte vantait 4 jours à Noël, la rekenhulp juste dessous (4 jours) en utilisait 3 en
// trois blocs. Le texte donne maintenant les deux plans, tirés du même moteur, et la rekenhulp part de 3 jours.
const p3 = OPT(Y, 3), lang = (l: 'nl' | 'en') => p3.blokken.map((b) => `${SPAN(b.vrijVan, b.vrijTot, l)} (${verlofNaarVrij(b.verlof, b.vrij, l)})`).join('; ');

export default defineGuide({
  id: 'feestdagen-2029', group: 'feestdagen', order: 2, tool: 'ft', toolArg: { jaar: Y },
  related: ['feestdagen-2028', 'bevrijdingsdag-2027', 'werkdagen-2027', 'brugdagen-2028'],
  sources: ['rijks-feestdagen', 'gov-feestdagen-en', 'rijks-bevrijdingsdag', 'rijks-koningsdag'],
  nl: {
    slug: 'feestdagen-2029', nav: 'Feestdagen 2029', card: `${N(bd.length, 'nl')} brugdagen, Kerstavond als brug van vijf dagen`,
    title: 'Feestdagen 2029: data, weekdagen en de drie brugdagen',
    description: `Feestdagen 2029 in Nederland: Koningsdag op vrijdag ${D(kd, 'nl')}, Bevrijdingsdag op zaterdag, Hemelvaart ${D(hv, 'nl')} en Kerst op dinsdag. Met ${N(bd.length, 'nl')} brugdagen.`,
    h1: 'Feestdagen 2029 in Nederland',
    intro: `De feestdagen 2029 hebben ${N(bd.length, 'nl')} brugdagen; maandag 24 december is de beste, met vijf dagen vrij voor één verlofdag.`,
    resume: `${Y} begint met Nieuwjaarsdag op ${WD(nj, 'nl')} en eindigt met Kerst op ${DW(k1, 'nl')} en ${DW(F('tweede-kerstdag', Y), 'nl')}. Pasen valt op ${D(ps, 'nl')}, Hemelvaart op ${D(hv, 'nl')}. Koningsdag is op ${DW(kd, 'nl')}: een lang weekend zonder verlof. Bevrijdingsdag valt op ${DW(bv, 'nl')} en kost dus niemand een werkdag. Bij de gangbare afspraken geeft dat ${N(wk.length, 'nl')} vrije weekdagen en ${N(werk, 'nl')} werkdagen. Het jaar telt ${N(bd.length, 'nl')} echte brugdagen: ${bd.map((b) => `${WD(b.verlofVan, 'nl')} ${D(b.verlofVan, 'nl')}`).join(', ')}. De brug op 24 december is bijzonder, want die levert met één verlofdag vijf dagen vrij op: van zaterdag 22 tot en met Tweede Kerstdag. De Rijksoverheid heeft de lijst voor ${Y} nog niet gepubliceerd; de datums volgen uit dezelfde vaste regels als elk jaar.`,
    faqs: [
      { q: 'Valt Bevrijdingsdag 2029 in het weekend?', a: `Ja, op ${DW(bv, 'nl')}. Wie op 5 mei normaal vrij is, verliest die dag in 2029; een vervangende vrije dag kent Nederland niet, tenzij uw cao er een regelt. Voor de Algemene termijnenwet telt 5 mei wel gewoon als erkende feestdag, ook als het een zaterdag is.` },
      { q: 'Wat is de beste brugdag van 2029?', a: `Maandag ${D(kb.verlofVan, 'nl')}: met één verlofdag bent u vrij van ${D(kb.vrijVan, 'nl')} tot en met ${D(kb.vrijTot, 'nl')}, ${N(kb.vrij, 'nl')} dagen achter elkaar. Dat komt doordat Eerste Kerstdag in 2029 op een dinsdag valt. Vraag die dag vroeg aan; veel collega’s willen dan ook vrij.` },
      { q: 'Staat 2029 al op de site van de Rijksoverheid?', a: 'Nog niet. De Rijksoverheid toont de lijst van het lopende en het volgende jaar; op 13 november 2026 waren dat 2026 en 2027. De datums voor 2029 volgen uit vaste regels: vaste data voor Nieuwjaar, Koningsdag, 5 mei en Kerst, en de paasdatum voor de andere feestdagen.' },
    ],
    body: (h) => `<h2>Feestdagen 2029 met weekdag en brugdagen</h2>
${h.table(['Feestdag', 'Datum', 'Weekdag'], h.officieel(Y).map((f) => [f.name.nl, h.day(f.date), h.wd(f.date)]), `Officiële feestdagen ${Y}, berekend volgens de vaste regels`, ['l', 'l', 'l'])}
<p>Dat Koningsdag op vrijdag valt en 5 mei op zaterdag, maakt het voorjaar van ${Y} rustig: geen brug rond Koningsdag, en geen gedoe over wel of niet vrij op Bevrijdingsdag. De brug na Hemelvaart, vrijdag ${h.day(K.plusDagen(hv, 1))}, blijft.</p>
<h2>Het einde van 2029: twee bruggen achter elkaar</h2>
<p>Met Kerst op dinsdag en woensdag zijn maandag 24 en maandag 31 december allebei brugdagen. Neemt u ook donderdag 27 en vrijdag 28 december vrij, dan bent u met vier verlofdagen van zaterdag 22 december tot en met Nieuwjaarsdag 2030 vrij: elf dagen op een rij.</p>
<p>Liever losse lange weekenden? Met ${N(p3.verlof, 'nl')} verlofdagen komt u op ${N(p3.vrij, 'nl')} vrije dagen in ${N(p3.blokken.length, 'nl')} blokken: ${lang('nl')}. Dat rekent de rekenhulp hieronder.</p>
${h.mini('brug', { t: 'Hoeveel vrij haalt u uit 2029?', d: { verlof: 3, jaar: 2029 }, e: 'Voorbeeld met 3 verlofdagen in 2029' })}
<p>De kerstvakantie van de scholen begint in alle regio’s op ${h.day(K.kalender(2029, 'midden')!.kerst.van)}. Werkdagen per maand voor ${Y} rekent de ${h.a('werkdagen-2027', 'werkdagenpagina')}; kies daar het jaar.</p>`,
  },
  en: {
    slug: 'public-holidays-2029', nav: 'Public holidays 2029', card: `${N(bd.length, 'en')} bridge days, Christmas Eve as a five-day bridge`,
    title: 'Public holidays 2029 Netherlands: dates and 3 bridge days',
    description: "Public holidays 2029 in the Netherlands: King's Day on Friday 27 April, Liberation Day on a Saturday, Ascension 10 May, Christmas on Tuesday. 3 bridge days.",
    h1: 'Public holidays 2029 in the Netherlands',
    intro: `The 2029 public holidays have ${N(bd.length, 'en')} bridge days; Monday 24 December is the best, five days off for one leave day.`,
    resume: `${Y} starts with New Year's Day on a ${WD(nj, 'en')} and ends with Christmas on ${DW(k1, 'en')} and ${DW(F('tweede-kerstdag', Y), 'en')}. Easter is ${D(ps, 'en')}, Ascension ${D(hv, 'en')}. King's Day is ${DW(kd, 'en')}: a long weekend without leave. Liberation Day falls on ${DW(bv, 'en')} and costs nobody a working day. Under common agreements that gives ${N(wk.length, 'en')} weekday days off and ${N(werk, 'en')} working days. The year has ${N(bd.length, 'en')} true bridge days: ${bd.map((b) => `${WD(b.verlofVan, 'en')} ${D(b.verlofVan, 'en')}`).join(', ')}. The 24 December bridge stands out, because one leave day gives five days off, from Saturday 22 to Boxing Day. The government has not published the ${Y} list yet; the dates follow from the same fixed rules as every year.`,
    faqs: [
      { q: 'Does Liberation Day 2029 fall at the weekend?', a: `Yes, on ${DW(bv, 'en')}. If 5 May is normally off for you, you lose it in 2029; the Netherlands has no substitute day unless your agreement sets one. For the General Time Limits Act, 5 May still counts as a recognised holiday, even on a Saturday.` },
      { q: 'What is the best bridge day of 2029?', a: `Monday ${D(kb.verlofVan, 'en')}: one leave day and you are off from ${D(kb.vrijVan, 'en')} to ${D(kb.vrijTot, 'en')}, ${N(kb.vrij, 'en')} days in a row. That is because Christmas Day 2029 falls on a Tuesday. Book it early; many colleagues will want that day off too.` },
      { q: 'Is 2029 already on the government website?', a: 'Not yet. The government shows the current and the next year; on 13 November 2026 that was 2026 and 2027. The 2029 dates follow fixed rules: fixed dates for New Year, King’s Day, 5 May and Christmas, and the Easter date for the other holidays.' },
    ],
    body: (h) => `<h2>Public holidays 2029 with weekdays and bridge days</h2>
${h.table(['Holiday', 'Date', 'Weekday'], h.officieel(Y).map((f) => [f.name.en, h.day(f.date), h.wd(f.date)]), `Official holidays ${Y}, computed from the fixed rules`, ['l', 'l', 'l'])}
<p>With King's Day on a Friday and 5 May on a Saturday, spring ${Y} is calm: no bridge around King's Day and no question about Liberation Day. The bridge after Ascension, Friday ${h.day(K.plusDagen(hv, 1))}, remains.</p>
<h2>The end of 2029: two bridges in a row</h2>
<p>With Christmas on Tuesday and Wednesday, Monday 24 and Monday 31 December are both bridge days. Take Thursday 27 and Friday 28 December too, and four leave days give you Saturday 22 December through New Year's Day 2030: eleven days in a row.</p>
<p>Prefer separate long weekends? ${N(p3.verlof, 'en')} leave days give ${N(p3.vrij, 'en')} days off in ${N(p3.blokken.length, 'en')} blocks: ${lang('en')}. The tool below works it out.</p>
${h.mini('brug', { t: 'How much time off can you get from 2029?', d: { verlof: 3, jaar: 2029 }, e: 'Example with 3 leave days in 2029' })}
<p>The school Christmas break starts on ${h.day(K.kalender(2029, 'midden')!.kerst.van)} in every region. Working days by month for ${Y} are on the ${h.a('werkdagen-2027', 'working days page')}; pick the year there.</p>`,
  },
});
