/**
 * Verrou des dates écrites dans les textes (testeurs naïfs du 2026-11-14, RECETTE §15.8).
 *
 * Les pages 2028 disaient « Koningsdag op donderdag 27 april 2028 en 5 mei de dag erna » et « omdat die vrijdag ook
 * 5 mei is » : une phrase écrite pour un cas qui n'existe pas (5 mai tombe toujours 8 ou 9 jours après Koningsdag).
 * Ces tests rendent tous les textes (accueil et guides, nl et en) et vérifient :
 *  1. chaque « weekdag dag maand jaar » écrit correspond au vrai jour de la semaine ;
 *  2. aucune phrase ne fait de 5 mai le lendemain de Koningsdag, ni le vendredi-pont qui suit Koningsdag ;
 *  3. les dates des pages 2028 (pont du 28 avril, 5 mai un vendredi) ;
 *  4. la phrase « X vrije dagen door de week » additionne bien jusqu'à 11 ;
 *  5. Nieuwjaarsdag et Kerst ne disent plus « geen toelichting » dans la colonne « Vrij? ».
 */
import { describe, it, expect } from 'vitest';
import { GUIDES } from '../src/lib/pages';
import { HOME } from '../src/content/home';
import { helpers } from '../src/lib/helpers';
import { vijfMei } from '../src/content/_k';
import { datum, officieel, PROFIELEN, VRIJ, STATUS_TEKST, optiesVoor } from '../src/lib/engine/feestdagen';
import { brugdagen } from '../src/lib/engine/bruggen';
import { fromIso, weekday, isWeekend } from '../src/lib/engine/dagen';
import { getTool, somZin } from '../src/lib/tool-specs';
import type { Lang } from '../src/lib/format';

const LANGS: Lang[] = ['nl', 'en'];
function teksten(l: Lang): Array<{ waar: string; tekst: string }> {
  const h = helpers(l), out: Array<{ waar: string; tekst: string }> = [];
  const H = HOME[l];
  out.push({ waar: 'home', tekst: [H.title, H.description, H.intro, H.resume, ...H.faqs.flatMap((f) => [f.q, f.a]), H.why(h), ...H.sections(h).flatMap((s) => [s.title, s.html])].join('\n') });
  for (const g of GUIDES) {
    const p = g[l];
    out.push({ waar: g.id, tekst: [p.title, p.description, p.h1, p.intro, p.resume, p.card, ...p.faqs.flatMap((f) => [f.q, f.a]), p.body(h)].join('\n') });
  }
  return out;
}
const DAGEN = { nl: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'], en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] };
const MAANDEN = { nl: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'], en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] };
const S = '[\\s\\u00a0]+';

describe('1. weekdag en datum kloppen in alle teksten', () => {
  for (const l of LANGS) it(l, () => {
    const re = new RegExp(`\\b(${DAGEN[l].join('|')}),?${S}(\\d{1,2})${S}(${MAANDEN[l].join('|')})${S}(\\d{4})\\b`, 'gi');
    let n = 0; const fout: string[] = [];
    for (const { waar, tekst } of teksten(l)) for (const m of tekst.matchAll(re)) {
      n++;
      const wd = DAGEN[l].findIndex((d) => d.toLowerCase() === m[1].toLowerCase());
      const mnd = MAANDEN[l].findIndex((x) => x.toLowerCase() === m[3].toLowerCase()) + 1;
      const iso = `${m[4]}-${String(mnd).padStart(2, '0')}-${m[2].padStart(2, '0')}`;
      if (weekday(fromIso(iso)) !== wd) fout.push(`${waar}: « ${m[0]} »`);
    }
    expect(n).toBeGreaterThan(50);
    expect(fout).toEqual([]);
  });
});

describe('2. 5 mei en Koningsdag', () => {
  it('Bevrijdingsdag valt altijd 8 of 9 dagen na Koningsdag (2000-2100)', () => {
    for (let y = 2000; y <= 2100; y++) expect([8, 9]).toContain(fromIso(datum('bevrijdingsdag', y)) - fromIso(datum('koningsdag', y)));
  });
  it('geen tekst maakt van 5 mei de dag na Koningsdag of de brug na Koningsdag', () => {
    const fout = /5 mei de dag erna|Bevrijdingsdag de dag erna|die vrijdag ook 5 mei|vrijdag is ook Bevrijdingsdag|5 May the day after|Liberation Day the day after|that Friday is also 5 May|Friday is also Liberation Day/i;
    for (const l of LANGS) for (const { waar, tekst } of teksten(l)) expect(fout.test(tekst), `${waar} (${l})`).toBe(false);
  });
  it('de zin over 5 mei noemt de echte weekdag, elk jaar', () => {
    for (let y = 2026; y <= 2035; y++) {
      const bv = datum('bevrijdingsdag', y), wd = weekday(fromIso(bv));
      expect(vijfMei(y, 'nl')).toContain(`${DAGEN.nl[wd]} 5 mei ${y}`);
      expect(vijfMei(y, 'en')).toContain(`${DAGEN.en[wd]}, 5 May ${y}`);
      expect(vijfMei(y, 'nl')).not.toMatch(/dag erna/);
    }
    expect(vijfMei(2028, 'nl')).toBe('Bevrijdingsdag valt 8 dagen na Koningsdag, op vrijdag 5 mei 2028: wie op 5 mei vrij is, heeft zonder verlof een lang weekend van 3 dagen.');
  });
  it('Hemelvaart 2027 is de dag na 5 mei (« de dag ervoor » op de pagina Hemelvaart)', () => {
    expect(fromIso(datum('hemelvaartsdag', 2027)) - fromIso(datum('bevrijdingsdag', 2027))).toBe(1);
  });
});

describe('3. pagina’s 2028', () => {
  it('brugdagen 2028: vrijdag 28 april en vrijdag 26 mei, geen van beide is 5 mei', () => {
    const bd = brugdagen(2028).map((b) => b.verlofVan).sort();
    expect(bd).toEqual(['2028-04-28', '2028-05-26']);
    expect(bd).not.toContain(datum('bevrijdingsdag', 2028));
  });
  for (const id of ['brugdagen-2028', 'feestdagen-2028']) it(id, () => {
    const t = teksten('nl').find((x) => x.waar === id)!.tekst;
    expect(t).toContain('vrijdag 5 mei 2028');
    expect(t).toContain('donderdag 27 april 2028');
    if (id === 'brugdagen-2028') expect(t).toContain('vrijdag 28 april 2028');
  });
});

describe('4. telling van de vrije weekdagen', () => {
  it('2 zondagen + weekend + niet meegeteld + vrij = 11, elk jaar en elk profiel', () => {
    for (let y = 2026; y <= 2030; y++) for (const pf of PROFIELEN) {
      const list = officieel(y, optiesVoor(pf));
      const weekend = list.filter((f) => !f.zondag && isWeekend(fromIso(f.date)));
      const niet = list.filter((f) => !f.vrij && !f.zondag && !isWeekend(fromIso(f.date)));
      const vrij = list.filter((f) => f.vrij && !isWeekend(fromIso(f.date)));
      expect(2 + weekend.length + niet.length + vrij.length).toBe(11);
      const out = getTool('ft', 'nl', { jaar: y, pf }).run({ jaar: String(y), pf });
      expect(out.sub).toBe(somZin(y, weekend, niet, vrij.length, 'nl'));
      expect(out.value).toBe(`${vrij.length} vrije dagen door de week`);
    }
  });
  it('2027: de zin noemt Kerst en de twee dagen die niet meetellen', () => {
    const s = getTool('ft', 'nl', { jaar: 2027 }).run({ jaar: '2027', pf: 'bedrijf' }).sub!;
    expect(s).toContain('2 in 2027 in het weekend (Eerste Kerstdag en Tweede Kerstdag)');
    expect(s).toContain('Niet meegeteld: Goede Vrijdag');
    expect(s).toContain('Blijven over: 5 vrije dagen door de week.');
  });
});

describe('5. Nieuwjaar en Kerst: een antwoord in de kolom « Vrij? »', () => {
  it('geen « Geen toelichting » meer, wel « als vrij gerekend »', () => {
    for (const id of ['nieuwjaarsdag', 'eerste-kerstdag', 'tweede-kerstdag'] as const) {
      expect(STATUS_TEKST[VRIJ[id].bedrijf].nl).toBe('Als vrij gerekend; uw cao beslist');
      expect(STATUS_TEKST[VRIJ[id].bedrijf].nl).not.toMatch(/geen toelichting/i);
    }
  });
});
