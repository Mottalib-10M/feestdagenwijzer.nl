/**
 * Toont een declaratieve rekenhulp (src/lib/tool-specs.ts): velden links, resultaatkaart rechts (data-resultat),
 * extra opties ingeklapt, deellink pas na een handeling van de lezer. Eerste weergave = standaardwaarden van de
 * build; een gedeelde link wordt na het mounten gelezen (RECETTE §17.5). Zolang niets is gewijzigd, staat er dat
 * het resultaat een voorbeeld is en wat het voorbeeld aanneemt (MentionExemple, §15.8).
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import MentionExemple from './MentionExemple';
import { Choice, ResultCard, Rows, ShareRow } from './parts';
import { readParams, updateURL } from '../../lib/url-state';
import { getTool } from '../../lib/tool-specs';
import { optsOf, resolve, type Input, type V } from '../../lib/tool-types';
import { t } from '../../i18n/ui';
import { etiquettes, ficheTitre } from '../../lib/tableaux';
import type { Lang } from '../../lib/format';

interface Props { kind: string; lang: Lang; arg?: string; methodHref?: string; idPrefix?: string }

/** Valeur lisible d'un champ (libellé de l'option choisie, ou nombre et unité). */
const waarde = (i: Input, v: V): string => (i.kind === 'choice' ? i.options.find((o) => o.value === String(v[i.id]))?.label : i.kind === 'select' ? optsOf(i, v).find((o) => o.value === String(v[i.id]))?.label : `${v[i.id]}${i.unit ? `\u00a0${i.unit}` : ''}`) ?? String(v[i.id]);

/** Werkdag-keuzes (Goede Vrijdag, 5 mei, 24 en 31 december) in gewone woorden; andere opties als « label: waarde ». */
const DAG: Record<string, [string, string]> = { gv: ['Goede Vrijdag', 'Good Friday'], bd: ['5 mei', '5 May'], od: ['24 en 31 december', '24 and 31 December'] };
const lijst = (xs: string[], en: string) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} ${en} ${xs[xs.length - 1]}`);
function actueel(adv: Input[], v: V, lang: Lang): string {
  const L = lang === 'nl' ? 0 : 1, en = lang === 'nl' ? 'en' : 'and';
  const dag = adv.filter((i) => DAG[i.id]), werk = dag.filter((i) => ['nee', 'werk'].includes(String(v[i.id])));
  const vrij = dag.filter((i) => !werk.includes(i)), rest = adv.filter((i) => !DAG[i.id]);
  const z: string[] = [];
  if (werk.length) z.push(lang === 'nl' ? `Nu gerekend alsof u werkt op ${lijst(werk.map((i) => DAG[i.id][L]), en)}.` : `Now calculated as if you work on ${lijst(werk.map((i) => DAG[i.id][L]), en)}.`);
  if (vrij.length) z.push(lang === 'nl' ? `Gerekend als vrij: ${lijst(vrij.map((i) => DAG[i.id][L]), en)}.` : `Counted as off: ${lijst(vrij.map((i) => DAG[i.id][L]), en)}.`);
  if (rest.length) z.push(`${rest.map((i) => `${i.label.replace(/\?$/, '')}: ${waarde(i, v)}`).join(' · ')}.`);
  z.push(werk.length ? (lang === 'nl' ? 'Bent u die dagen vrij? Tik hier.' : 'Off on those days? Tap here.') : (lang === 'nl' ? 'Tik om aan te passen.' : 'Tap to change.'));
  return z.join(' ');
}

export default function SpecTool({ kind, lang, arg, methodHref, idPrefix = 't' }: Props) {
  const ui = t(lang);
  const spec = useMemo(() => getTool(kind, lang, arg ? JSON.parse(arg) : undefined), [kind, lang, arg]);
  const defaults = useMemo(() => Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])) as V, [spec]);
  const [v, setV] = useState<V>(defaults);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const u = readParams(window.location.search);
    if (![...u.keys()].length) return;
    const next: V = { ...defaults };
    const tt: Record<string, boolean> = {};
    for (const i of spec.inputs) {
      const x = u.get(i.id);
      if (x === null) continue;
      if (i.kind === 'choice') { if (i.options.some((o) => o.value === x)) { next[i.id] = x; tt[i.id] = true; } }
      else if (i.kind === 'select') { if (optsOf(i, next).some((o) => o.value === x)) { next[i.id] = x; tt[i.id] = true; } }
      else { const f = parseFloat(x); if (!isNaN(f)) { next[i.id] = Math.max(i.min ?? 0, Math.min(f, i.max ?? Infinity)); tt[i.id] = true; } }
    }
    setV(next); setTouched(tt);
  }, []);
  const rv = useMemo(() => resolve(spec.inputs, v), [v, spec]);
  // Un lien « … ↓ » vers une liste repliée l'ouvre avant de défiler (le clic passe avant la navigation).
  useEffect(() => {
    const open = (id: string) => { const el = id && document.getElementById(id); if (el instanceof HTMLDetailsElement) el.open = true; };
    const onClick = (e: MouseEvent) => { const a = (e.target as Element | null)?.closest?.('a[href^="#"]'); if (a) open(a.getAttribute('href')!.slice(1)); };
    open(decodeURIComponent(location.hash.slice(1)));
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  useEffect(() => { if (Object.keys(touched).length) updateURL(rv as Record<string, string | number>); }, [rv, touched]);
  const out = useMemo(() => spec.run(rv), [rv, spec]);
  const set = (id: string) => (x: number | string) => { setV((o) => ({ ...o, [id]: x })); setTouched((o) => (o[id] ? o : { ...o, [id]: true })); };
  const field = (i: Input) => {
    const id = `${idPrefix}-${i.id}`;
    const cls = i.wide ? 'sm:col-span-2' : '';
    if (i.kind === 'choice') return <div key={i.id} className={`grid grid-rows-subgrid row-span-3 ${cls}`}><Choice id={id} label={i.label} value={String(rv[i.id])} options={i.options} onChange={set(i.id)} /></div>;
    if (i.kind === 'select') return <SelectField key={i.id} id={id} label={i.label} value={String(rv[i.id])} onChange={set(i.id)} options={optsOf(i, rv)} help={i.help} className={cls} />;
    return <NumberField key={i.id} id={id} label={i.label} value={Number(rv[i.id])} onChange={set(i.id)} unit={i.unit} max={i.max} decimals={i.decimals} help={i.help} min={i.min} className={cls} />;
  };
  const main = spec.inputs.filter((i) => !i.adv), adv = spec.inputs.filter((i) => i.adv);
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
        <form data-simulateur className="grid content-start grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          {main.map(field)}
          {adv.length > 0 && (
            <details className="sm:col-span-2 rounded-lg border border-navy-200 px-3 py-2">
              {/* Testeurs naïfs 2026-11-14 : « Meer opties » ne disait pas ce qu'il cachait ; le titre montre chaque réglage et sa valeur. */}
              <summary className="cursor-pointer text-sm font-medium text-navy-700">{ui.moreOptions}
                {/* Tour 2 : « Goede Vrijdag vrij (cao): Nee » se lisait comme une réponse imposée ; on dit que c'est un choix modifiable. */}
                {/* Tour 3 (testeurs 1 et 3) : « Goede Vrijdag vrij (cao): Nee » se lisait encore comme un verdict ; la ligne dit
                    sur quelle hypothèse on calcule (« alsof u werkt op … ») et comment la changer. */}
                <span data-actuellement className="mt-1 block text-xs font-normal text-navy-600">{actueel(adv, rv, lang)}</span>
              </summary>
              <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">{adv.map(field)}</div>
            </details>
          )}
        </form>
        <ResultCard label={out.label} value={out.value} sub={out.sub}>
          <MentionExemple lang={lang} touched={touched} suppose={out.aanname} modifiables={spec.inputs.length} className="mt-2" />
          <Rows rows={out.rows} />
          {out.note && <p className="mt-2 text-xs text-navy-600">{out.note}</p>}
          {out.jump && [out.table, ...(out.tables ?? [])].find((x) => x?.id) && <p className="mt-2 text-sm"><a href={`#${idPrefix}-${[out.table, ...(out.tables ?? [])].find((x) => x?.id)!.id}`} className="font-medium text-accent-700 underline">{out.jump}</a></p>}
          <ShareRow methodHref={methodHref} labels={ui} />
        </ResultCard>
      </div>
      {/* Testeurs naïfs 2026-11-14 : ces tableaux (5 ou 6 colonnes) étaient coupés à droite sur téléphone, la colonne
          « Vrij? » cachée. Comme les tableaux du contenu (lib/tableaux.ts), ils deviennent des fiches sous 768 px. */}
      {[out.table, ...(out.tables ?? [])].filter((x) => !!x).map((tb, ti) => { const fiche = ficheTitre(tb!.headers, tb!.rows); const tabel = (
        <div key={ti} id={tb!.id && !tb!.fold ? `${idPrefix}-${tb!.id}` : undefined} className="mt-4 overflow-x-auto scroll-mt-20">
          <table className={`w-full text-sm${tb!.headers.length >= 3 ? ' empile' : ''}`} data-titre={fiche.titre ? '2' : undefined}>
            {tb!.caption && <caption className="mb-2 text-left text-sm text-navy-700">{tb!.caption}</caption>}
            <thead><tr>{tb!.headers.map((h, i) => <th key={h + i} scope="col" className={`border-b border-navy-300 px-2 py-1.5 font-semibold text-navy-900 ${tb!.align?.[i] === 'r' ? 'text-right' : 'text-left'}`}>{h}</th>)}</tr></thead>
            <tbody>{tb!.rows.map((r, k) => { const lab = etiquettes(tb!.headers, r.length, fiche); return <tr key={k}>{r.map((c, i) => <td key={i} data-label={lab[i] || undefined} className={`tabular-nums border-b border-navy-100 px-2 py-1.5 text-navy-800 ${tb!.align?.[i] === 'r' ? 'text-right' : 'text-left'}`} dangerouslySetInnerHTML={{ __html: c }} />)}</tr>; })}</tbody>
          </table>
        </div>
      );
      return tb!.fold ? <details key={ti} id={tb!.id ? `${idPrefix}-${tb!.id}` : undefined} className="mt-4 scroll-mt-20 rounded-lg border border-navy-200 px-3 py-2"><summary className="cursor-pointer text-sm font-medium text-accent-700">{tb!.fold}</summary>{tabel}</details> : tabel; })}
    </div>
  );
}
