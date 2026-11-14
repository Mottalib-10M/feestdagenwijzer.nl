/**
 * Hoe lang nog tot de volgende feestdag: de eerstvolgende officiële feestdag, met aftelling tot middernacht in
 * Nederland, of hij voor de meeste werknemers vrij is, en de volgende schoolvakantie van de gekozen regio.
 * Eerste weergave = dag van de build (__BUILD_DAY__), gelijk op server en browser (RECETTE §17.5); de klok van het
 * toestel neemt het over na het mounten. Niets wordt verzonden.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { ResultCard, Rows, ShareRow } from '../calc/parts';
import { readParams, updateURL } from '../../lib/url-state';
import { volgende, VRIJ, STATUS_TEKST } from '../../lib/engine/feestdagen';
import { volgendeVakantie, REGIOS, REGIO_NAAM, VAK_NAAM, type Regio } from '../../lib/engine/school';
import { fromIso, nederlandInstant, isWeekend } from '../../lib/engine/dagen';
import { dShortY, dLong, dWeek, T as TT } from '../../lib/tool-specs';
import { t } from '../../i18n/ui';
import type { Lang } from '../../lib/format';

interface Props { lang: Lang; regio?: string; methodHref?: string; idPrefix?: string; regioHref?: string }
const isoOf = (ms: number) => { const d = new Date(ms); const p = (x: number) => String(x).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`; };

export default function Aftellen({ lang, regio: r0, methodHref, idPrefix = 'a', regioHref }: Props) {
  const ui = t(lang), T = (nl: string, en: string) => TT(lang, nl, en);
  const [regio, setRegio] = useState<Regio>((r0 as Regio) ?? 'midden');
  const [now, setNow] = useState<number>(() => Date.parse(`${__BUILD_DAY__}T00:00:00Z`));
  const [live, setLive] = useState(false);
  const [moved, setMoved] = useState(false);
  useEffect(() => {
    const u = readParams(window.location.search);
    const g = u.get('regio') as Regio | null; if (g && REGIOS.includes(g)) setRegio(g);
    setNow(Date.now()); setLive(true);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { if (moved) updateURL({ regio }); }, [regio, moved]);
  const today = live ? isoOf(now) : __BUILD_DAY__;
  const lijst = useMemo(() => volgende(today, 5), [today]);
  const vak = useMemo(() => volgendeVakantie(regio, today, 3), [regio, today]);
  const next = lijst[0];
  if (!next) return null;
  const left = Math.max(0, Date.parse(nederlandInstant(next.date)) - now);
  const d = Math.floor(left / 864e5), h = Math.floor((left % 864e5) / 36e5), m = Math.floor((left % 36e5) / 6e4), s = Math.floor((left % 6e4) / 1e3);
  const nf = new Intl.NumberFormat(lang === 'nl' ? 'nl-NL' : 'en-GB');
  const vandaag = next.date === today;
  const status = STATUS_TEKST[VRIJ[next.id].bedrijf][lang];
  const v0 = vak[0];
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
        <form data-simulateur className="grid content-start grid-cols-1 gap-x-4 gap-y-3" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-regio`} label={T('Regio voor de schoolvakantie', 'Region for school holidays')} value={regio} onChange={(v) => { setRegio(v as Regio); setMoved(true); }} options={REGIOS.map((g) => ({ value: g, label: REGIO_NAAM[g][lang] }))} />
          {regioHref && <p className="-mt-1 text-xs text-navy-600"><a href={regioHref} className="underline hover:text-navy-900">{T('Weet u uw regio niet? Zoek uw gemeente op', 'Not sure of your region? Look up your municipality')}</a></p>}
          <div className="rounded-lg border border-accent-200 bg-accent-50 px-4 py-3" data-chrome>
            <p className="text-sm font-medium text-navy-700">{vandaag ? T(`Vandaag is het ${next.name.nl}`, `Today is ${next.name.en}`) : T(`Vanaf vandaag nog tot ${next.name.nl} ${next.date.slice(0, 4)}`, `From today until ${next.name.en} ${next.date.slice(0, 4)}`)}</p>
            {!vandaag && <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1" aria-live="off">
              {[[d, ui.days], [h, ui.hours], [m, ui.minutes], [s, ui.seconds]].map(([v, u]) => <span key={String(u)} className="inline-flex items-baseline gap-1"><span className="tabular-nums text-2xl font-bold text-navy-900">{nf.format(Number(v))}</span><span className="text-sm text-navy-600">{u}</span></span>)}
            </p>}
            <p className="mt-1 text-xs text-navy-600">{T('Geteld tot middernacht in Nederland, met de klok van uw toestel.', 'Counted to midnight in the Netherlands, using your device clock.')}</p>
          </div>
        </form>
        {/* Testeurs naïfs 2026-11-14, tour 2 : sur la page 2027, ce bloc passait à 2026 sans prévenir (« vrijdag 25 december
            2026 » sous « 25 december 2027 zaterdag ») et donnait des dates sans année. Il dit d'où il compte, et chaque date a son année. */}
        <ResultCard label={T(`Vanaf vandaag (${dLong(today, lang)}): de eerstvolgende feestdag`, `From today (${dLong(today, lang)}): the next public holiday`)} value={next.name[lang]} sub={dWeek(next.date, lang)}>
          <Rows rows={[
            [T('Vrij voor werknemers?', 'Day off for employees?'), isWeekend(fromIso(next.date)) ? T('Valt in het weekend', 'Falls on a weekend') : status],
            ...lijst.slice(1, 4).map((f) => [T(`Daarna: ${f.name.nl}`, `Then: ${f.name.en}`), dShortY(f.date, lang)] as [string, string]),
            ...(v0 ? [[`${VAK_NAAM[v0.vak][lang]} (${REGIO_NAAM[regio][lang]})`, v0.bezig ? T('nu bezig', 'now on') : dShortY(v0.p.van, lang)] as [string, string]] : []),
          ]} />
          <p className="mt-2 text-xs text-navy-600">{T('Dit blok telt vanaf vandaag, los van het jaar van de pagina', 'This block counts from today, whatever year the page is about')}.</p>
          <ShareRow methodHref={methodHref} labels={ui} />
        </ResultCard>
      </div>
    </div>
  );
}
