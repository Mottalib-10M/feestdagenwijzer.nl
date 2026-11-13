import { describe, it, expect } from 'vitest';
import { paaszondag, paaszondagMeeus, isoWeek, weeksInYear, nthWeekday, nederlandInstant, maandagVanWeek } from '../src/lib/engine/dagen';
import { officieel, koningsdag, vrijeDagen, volgende, datum, VRIJ, FEEST_IDS } from '../src/lib/engine/feestdagen';
import { optimaliseer, bruggen, brugdagen, werkdagen, weekdagen, werkdagenTussen } from '../src/lib/engine/bruggen';
import { kalender, SCHOOLJAREN, REGIOS, VAKS, volgendeVakantie, regioVan, keuzes, PROVINCIE_NAMEN, dagen, zelfdeOveral } from '../src/lib/engine/school';
import { verleng, algemeenErkend } from '../src/lib/engine/termijnen';
import P from '../src/data/params-2026.json';

describe('Pasen', () => {
  it('klopt met de bekende data', () => {
    expect(paaszondag(2026)).toBe('2026-04-05');
    expect(paaszondag(2027)).toBe('2027-03-28');
    expect(paaszondag(2028)).toBe('2028-04-16');
    expect(paaszondag(2029)).toBe('2029-04-01');
    expect(paaszondag(2030)).toBe('2030-04-21');
  });
  it('Gauss en Meeus geven van 1600 tot 2600 hetzelfde', () => {
    for (let y = 1600; y <= 2600; y++) expect(paaszondag(y)).toBe(paaszondagMeeus(y));
  });
});

/** De lijst van de Rijksoverheid (« Wanneer zijn de officiële feestdagen in Nederland? »), gelezen op 2026-11-13. */
const RIJKS: Record<number, Record<string, string>> = {
  2026: { nieuwjaarsdag: '2026-01-01', 'goede-vrijdag': '2026-04-03', 'eerste-paasdag': '2026-04-05', 'tweede-paasdag': '2026-04-06', koningsdag: '2026-04-27', bevrijdingsdag: '2026-05-05', hemelvaartsdag: '2026-05-14', 'eerste-pinksterdag': '2026-05-24', 'tweede-pinksterdag': '2026-05-25', 'eerste-kerstdag': '2026-12-25', 'tweede-kerstdag': '2026-12-26' },
  2027: { nieuwjaarsdag: '2027-01-01', 'goede-vrijdag': '2027-03-26', 'eerste-paasdag': '2027-03-28', 'tweede-paasdag': '2027-03-29', koningsdag: '2027-04-27', bevrijdingsdag: '2027-05-05', hemelvaartsdag: '2027-05-06', 'eerste-pinksterdag': '2027-05-16', 'tweede-pinksterdag': '2027-05-17', 'eerste-kerstdag': '2027-12-25', 'tweede-kerstdag': '2027-12-26' },
};
describe('Officiële feestdagen (Rijksoverheid)', () => {
  it('elf per jaar, exact de lijst 2026 en 2027', () => {
    for (const y of [2026, 2027]) {
      const d = Object.fromEntries(officieel(y).map((f) => [f.id, f.date]));
      expect(Object.keys(d).length).toBe(11);
      expect(d).toEqual(RIJKS[y]);
    }
  });
  it('weekdagen 2027 zoals gepubliceerd: Koningsdag dinsdag, Bevrijdingsdag woensdag, Hemelvaart donderdag, Kerst zaterdag en zondag', () => {
    const wd = (iso: string) => new Date(`${iso}T12:00:00Z`).getUTCDay();
    expect(wd(datum('koningsdag', 2027))).toBe(2);
    expect(wd(datum('bevrijdingsdag', 2027))).toBe(3);
    expect(wd(datum('hemelvaartsdag', 2027))).toBe(4);
    expect(wd(datum('eerste-kerstdag', 2027))).toBe(6);
    expect(wd(datum('tweede-kerstdag', 2027))).toBe(0);
  });
  it('Koningsdag op zaterdag 26 april als 27 april een zondag is (2025, 2031)', () => {
    expect(koningsdag(2025)).toBe('2025-04-26');
    expect(koningsdag(2031)).toBe('2031-04-26');
    expect(koningsdag(2028)).toBe('2028-04-27');
  });
  it('vrije dagen standaard: zonder Goede Vrijdag en 5 mei, zondagen nooit', () => {
    const ids = vrijeDagen(2027).map((f) => f.id);
    expect(ids).toEqual(['nieuwjaarsdag', 'tweede-paasdag', 'koningsdag', 'hemelvaartsdag', 'tweede-pinksterdag', 'eerste-kerstdag', 'tweede-kerstdag']);
    expect(vrijeDagen(2027, { goedeVrijdag: true, bevrijdingsdag: true }).length).toBe(9);
    expect(vrijeDagen(2027, { oudejaar: true }).length).toBe(9);
  });
  it('volgende feestdagen over de jaarwisseling', () => {
    expect(volgende('2027-12-27', 2).map((f) => f.id)).toEqual(['nieuwjaarsdag', 'goede-vrijdag']);
  });
  it('elke feestdag heeft een status per profiel', () => {
    for (const id of FEEST_IDS) { expect(VRIJ[id].bedrijf).toBeTruthy(); expect(VRIJ[id].ambtenaar).toBeTruthy(); expect(VRIJ[id].school).toBeTruthy(); }
    expect(VRIJ['goede-vrijdag'].bedrijf).toBe('werken');
    expect(VRIJ['hemelvaartsdag'].ambtenaar).toBe('ja');
  });
});

describe('Brugdagen en werkdagen', () => {
  it('2027: vrijdag 7 mei is een echte brugdag na Hemelvaart', () => {
    const bd = brugdagen(2027);
    expect(bd.map((b) => b.verlofVan)).toContain('2027-05-07');
    const b = bd.find((x) => x.verlofVan === '2027-05-07')!;
    expect(b.verlof).toBe(1); expect(b.vrij).toBe(4); expect(b.vrijVan).toBe('2027-05-06'); expect(b.vrijTot).toBe('2027-05-09');
  });
  it('2027: met Goede Vrijdag vrij ontstaat een lang paasweekend zonder verlof', () => {
    const o = { goedeVrijdag: true };
    const alle = bruggen(2027, o);
    expect(alle.every((b) => b.verlof >= 1)).toBe(true);
    expect(werkdagen(2027, o).reduce((a, b) => a + b, 0)).toBe(werkdagen(2027).reduce((a, b) => a + b, 0) - 1);
  });
  it('optimaliseerder: nooit meer verlof dan het budget, vrij ≥ verlof, en monotoon', () => {
    let prev = 0;
    for (const b of [0, 1, 3, 5, 10, 20, 25]) {
      const p = optimaliseer(2027, b);
      expect(p.verlof).toBeLessThanOrEqual(b);
      expect(p.vrij).toBeGreaterThanOrEqual(p.verlof);
      expect(p.vrij).toBeGreaterThanOrEqual(prev); prev = p.vrij;
      expect(p.rest).toBe(b - p.verlof);
    }
    expect(['2027-04-26', '2027-05-07']).toContain(optimaliseer(2027, 1).blokken[0].verlofVan);
    expect(brugdagen(2027).map((b) => b.verlofVan).sort()).toEqual(['2027-04-26', '2027-05-07']);
  });
  it('werkdagen 2027: 261 weekdagen, 7 vrije feestdagen op een weekdag → 254 standaard', () => {
    expect(weekdagen(2027)).toBe(261);
    const w = werkdagen(2027);
    expect(w.length).toBe(12);
    expect(w.reduce((a, b) => a + b, 0)).toBe(256);
    expect(werkdagenTussen('2027-05-01', '2027-05-31')).toBe(w[4]);
  });
  it('weeknummers ISO 8601', () => {
    expect(isoWeek('2027-01-01')).toEqual({ year: 2026, week: 53 });
    expect(isoWeek('2027-01-04')).toEqual({ year: 2027, week: 1 });
    expect(weeksInYear(2026)).toBe(53);
    expect(weeksInYear(2027)).toBe(52);
    expect(maandagVanWeek(2027, 1)).toBe('2027-01-04');
    expect(nthWeekday(2027, 3, 0, -1)).toBe('2027-03-28');
  });
  it('middernacht in Nederland naar UTC, zomer en winter', () => {
    expect(nederlandInstant('2027-01-01')).toBe('2026-12-31T23:00:00.000Z');
    expect(nederlandInstant('2027-05-06')).toBe('2027-05-05T22:00:00.000Z');
  });
});

describe('Schoolvakanties (Rijksoverheid, per regio)', () => {
  it('vier schooljaren, vijf vakanties, drie regio’s, van ≤ tot', () => {
    expect(SCHOOLJAREN).toEqual([2026, 2027, 2028, 2029]);
    for (const y of SCHOOLJAREN) for (const r of REGIOS) { const k = kalender(y, r)!; for (const v of VAKS) { expect(k[v].van <= k[v].tot).toBe(true); expect(dagen(k[v])).toBeGreaterThanOrEqual(9); } }
  });
  it('2026-2027 zoals gepubliceerd: herfst Noord 10-18 oktober, voorjaar Zuid 13-21 februari, zomer Zuid 24 juli-5 september', () => {
    expect(kalender(2026, 'noord')!.herfst).toEqual({ van: '2026-10-10', tot: '2026-10-18' });
    expect(kalender(2026, 'zuid')!.voorjaar).toEqual({ van: '2027-02-13', tot: '2027-02-21' });
    expect(kalender(2026, 'zuid')!.zomer).toEqual({ van: '2027-07-24', tot: '2027-09-05' });
    expect(kalender(2026, 'midden')!.mei).toEqual({ van: '2027-04-24', tot: '2027-05-02' });
    expect(zelfdeOveral(2026, 'mei')).toBe(true);
    expect(zelfdeOveral(2026, 'zomer')).toBe(false);
  });
  it('kerst-, mei- en zomervakanties beginnen op zaterdag en eindigen op zondag', () => {
    const wd = (iso: string) => new Date(`${iso}T12:00:00Z`).getUTCDay();
    for (const y of SCHOOLJAREN) for (const r of REGIOS) { const k = kalender(y, r)!; for (const v of VAKS) { expect(wd(k[v].van)).toBe(6); expect(wd(k[v].tot)).toBe(0); } }
  });
  it('volgende vakantie vanaf 13 november 2026 in Zuid is de kerstvakantie', () => {
    const n = volgendeVakantie('zuid', '2026-11-13', 2);
    expect(n[0].vak).toBe('kerst'); expect(n[0].bezig).toBe(false); expect(n[1].vak).toBe('voorjaar');
    expect(volgendeVakantie('noord', '2026-10-12', 1)[0].bezig).toBe(true);
  });
  it('regio uit provincie en gemeente', () => {
    expect(PROVINCIE_NAMEN.length).toBe(12);
    expect(regioVan('Groningen')).toBe('noord');
    expect(regioVan('Zuid-Holland')).toBe('midden');
    expect(regioVan('Limburg')).toBe('zuid');
    expect(regioVan('Flevoland', 'Zeewolde')).toBe('midden');
    expect(regioVan('Flevoland')).toBe('noord');
    expect(regioVan('Utrecht', 'Eemnes')).toBe('noord');
    expect(regioVan('Gelderland', 'Nijmegen')).toBe('zuid');
    expect(regioVan('Gelderland', 'Apeldoorn')).toBe('midden');
    expect(regioVan('Gelderland', 'Hattem')).toBe('noord');
    expect(keuzes('Gelderland').length).toBe(1 + 31 + 22);
  });
  it('bronnen van de params bestaan', () => {
    const S = (P as { sources: Record<string, unknown> }).sources;
    for (const k of ['rijks-feestdagen', 'rijks-sv-2026', 'rijks-sv-2029', 'rijks-regios', 'termijnenwet']) expect(S[k]).toBeTruthy();
    expect((P as { retrieved_at: string }).retrieved_at).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('Algemene termijnenwet', () => {
  it('art. 3: negen algemeen erkende dagen per jaar (Goede Vrijdag gelijkgesteld)', () => {
    expect(algemeenErkend(2027).size).toBe(9);
  });
  it('art. 1: einde op Hemelvaart 2027 schuift naar vrijdag 7 mei; einde op zaterdag 25 december 2027 naar maandag 27 december', () => {
    expect(verleng('2027-05-06').verlengd).toBe('2027-05-07');
    const k = verleng('2027-12-25');
    expect(k.verlengd).toBe('2027-12-27'); expect(k.dagen).toBe(2); expect(k.redenen.map((r) => r.reden)).toEqual(['eerste-kerstdag', 'tweede-kerstdag']);
    expect(verleng('2028-01-01').verlengd).toBe('2028-01-03');
    expect(verleng('2027-06-15').dagen).toBe(0);
  });
  it('art. 2: een termijn van drie dagen over Pasen 2027 krijgt twee tellende dagen', () => {
    const v = verleng('2027-03-29', '2027-03-26', 3);
    expect(v.art2).toBe(true);
    expect(v.verlengd >= '2027-03-31').toBe(true);
  });
});
