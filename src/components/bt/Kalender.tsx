/**
 * Jaarkalender met weeknummers (ISO 8601), de elf officiële feestdagen, de echte brugdagen en de schoolvakanties van
 * de gekozen regio. Eerste weergave = standaardwaarden van de build; het gedeelde adres wordt pas na het mounten
 * gelezen (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { Choice, ResultCard, Rows, ShareRow } from '../calc/parts';
import { readParams, updateURL } from '../../lib/url-state';
import { officieel } from '../../lib/engine/feestdagen';
import { werkdagen, brugdagen } from '../../lib/engine/bruggen';
import { dayNum, fromIso, isoWeek, weeksInYear, isWeekend } from '../../lib/engine/dagen';
import { vakantieInJaar, REGIOS, REGIO_NAAM, type Regio } from '../../lib/engine/school';
import { dLong, T as TT } from '../../lib/tool-specs';
import { TAG } from '../../lib/format';
import { t } from '../../i18n/ui';
import type { Lang } from '../../lib/format';

interface Props { lang: Lang; year: number; regio?: string; methodHref?: string; idPrefix?: string }

export default function Kalender({ lang, year, regio: r0, methodHref, idPrefix = 'k' }: Props) {
  const ui = t(lang), T = (nl: string, en: string) => TT(lang, nl, en);
  const [regio, setRegio] = useState<Regio>((r0 as Regio) ?? 'midden');
  const [bd, setBd] = useState<'ja' | 'nee'>('ja');
  const [moved, setMoved] = useState(false);
  useEffect(() => {
    const u = readParams(window.location.search);
    const g = u.get('regio') as Regio | null; if (g && REGIOS.includes(g)) setRegio(g);
    const p = u.get('bd'); if (p === 'ja' || p === 'nee') setBd(p);
  }, []);
  useEffect(() => { if (moved) updateURL({ regio, bd }); }, [regio, bd, moved]);
  const list = useMemo(() => officieel(year), [year]);
  const hol = useMemo(() => new Map(list.map((f) => [f.date, f])), [list]);
  const bruggen = useMemo(() => new Set(bd === 'ja' ? brugdagen(year).map((b) => b.verlofVan) : []), [year, bd]);
  const school = useMemo(() => vakantieInJaar(regio, year), [regio, year]);
  const wd = useMemo(() => werkdagen(year).reduce((a, b) => a + b, 0), [year]);
  const ft = list.filter((f) => f.vrij && !isWeekend(fromIso(f.date))).length;
  const wdHead = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2027, 1, 1 + i)).toLocaleDateString(TAG(lang), { weekday: 'short', timeZone: 'UTC' }).replace('.', ''));
  const months = Array.from({ length: 12 }, (_, m) => {
    const first = dayNum(year, m + 1, 1), last = dayNum(year, m + 2, 1) - 1;
    const lead = (new Date(first * 864e5).getUTCDay() + 6) % 7;
    const cells: Array<number | null> = [...Array(lead).fill(null)];
    for (let d = first; d <= last; d++) cells.push(d);
    while (cells.length % 7) cells.push(null);
    const weeks: Array<Array<number | null>> = []; for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    return { name: new Date(first * 864e5).toLocaleDateString(TAG(lang), { month: 'long', timeZone: 'UTC' }), weeks };
  });
  const iso = (d: number) => new Date(d * 864e5).toISOString().slice(0, 10);
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
        <form data-simulateur className="grid content-start grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-regio`} label={T('Schoolvakanties van', 'School holidays of')} value={regio} onChange={(v) => { setRegio(v as Regio); setMoved(true); }} options={REGIOS.map((g) => ({ value: g, label: REGIO_NAAM[g][lang] }))} />
          <div className="grid grid-rows-subgrid row-span-3"><Choice id={`${idPrefix}-bd`} label={T('Brugdagen tonen', 'Show bridge days')} value={bd} options={[{ value: 'ja', label: T('Ja', 'Yes') }, { value: 'nee', label: T('Nee', 'No') }]} onChange={(v) => { setBd(v); setMoved(true); }} /></div>
        </form>
        <ResultCard label={T(`Kalender ${year}, ${REGIO_NAAM[regio].nl}`, `Calendar ${year}, ${REGIO_NAAM[regio].en}`)} value={T(`${wd} werkdagen`, `${wd} working days`)} sub={T(`${ft} vrije feestdagen op een weekdag, ${weeksInYear(year)} weken`, `${ft} public holidays off on weekdays, ${weeksInYear(year)} weeks`)}>
          <Rows rows={[[T('Dagen schoolvakantie in dit kalenderjaar', 'School-holiday days in this calendar year'), String(school.size)], [T('Echte brugdagen', 'True bridge days'), String(brugdagen(year).length)], [T('Week 1 begint op', 'Week 1 starts on'), dLong(iso(dayNum(year, 1, 4) - ((new Date(dayNum(year, 1, 4) * 864e5).getUTCDay() + 6) % 7)), lang)]]} />
          <p className="mt-2 text-xs text-navy-600">{T('Werkdagen: maandag tot vrijdag, zonder de feestdagen die de Rijksoverheid als gewoonlijk vrij noemt; Goede Vrijdag en 5 mei tellen als werkdag.', 'Working days: Monday to Friday, minus the holidays the government describes as usually off; Good Friday and 5 May count as working days.')}</p>
          <ShareRow methodHref={methodHref} labels={ui} />
        </ResultCard>
      </div>
      <div className="kal-grid mt-6">
        {months.map((mo) => (
          <table key={mo.name}>
            <caption className="mb-1 text-left text-sm font-semibold text-navy-900">{mo.name} {year}</caption>
            <thead><tr><th scope="col" className="text-[0.7rem] font-medium text-navy-600">{T('Wk', 'Wk')}</th>{wdHead.map((h) => <th key={h} scope="col" className="font-medium text-navy-700">{h}</th>)}</tr></thead>
            <tbody>{mo.weeks.map((w, i) => {
              const firstDay = w.find((x) => x !== null)!;
              return (
                <tr key={i}><td className="kw">{isoWeek(iso(firstDay)).week}</td>
                  {w.map((d, j) => {
                    if (d === null) return <td key={j} />;
                    const f = hol.get(iso(d));
                    const cls = f ? 'ft' : bruggen.has(iso(d)) ? 'tf' : school.has(d) ? 'sv' : j >= 5 ? 'we' : '';
                    return <td key={j} className={cls} title={f ? f.name[lang] : bruggen.has(iso(d)) ? T('brugdag', 'bridge day') : undefined}>{new Date(d * 864e5).getUTCDate()}</td>;
                  })}
                </tr>
              );
            })}</tbody>
          </table>
        ))}
      </div>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy-700">
        <span><span className="mr-1 inline-block h-3 w-3 rounded bg-accent-100 align-middle" aria-hidden="true" />{T('officiële feestdag', 'official public holiday')}</span>
        <span><span className="mr-1 inline-block h-3 w-3 rounded bg-navy-100 align-middle" aria-hidden="true" />{T('brugdag', 'bridge day')}</span>
        <span><span className="mr-1 inline-block h-3 w-3 rounded bg-amber-100 align-middle" aria-hidden="true" />{T('schoolvakantie', 'school holiday')}</span>
      </p>
      <ul className="mt-4 grid gap-x-6 gap-y-1 text-sm text-navy-800 sm:grid-cols-2">
        {list.map((f) => <li key={f.id}><span className="tabular-nums">{dLong(f.date, lang)}</span> · {f.name[lang]}</li>)}
      </ul>
    </div>
  );
}
