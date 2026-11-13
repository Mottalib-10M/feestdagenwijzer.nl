/** Declaratieve rekenaars (src/lib/tool-specs.ts), weergegeven door components/calc/SpecTool.tsx. */
export type V = Record<string, number | string>;
export interface NumIn { kind?: 'num'; id: string; label: string; def: number; unit?: string; min?: number; max?: number; decimals?: number; help?: string; adv?: boolean; wide?: boolean }
export interface ChoiceIn { kind: 'choice'; id: string; label: string; def: string; options: Array<{ value: string; label: string }>; help?: string; adv?: boolean; wide?: boolean }
export type Opt = { value: string; label: string };
/** De keuzes kunnen van de andere velden afhangen (de gemeenten van de gekozen provincie). */
export interface SelectIn { kind: 'select'; id: string; label: string; def: string; options: Opt[] | ((v: V) => Opt[]); help?: string; adv?: boolean; wide?: boolean }
export type Input = NumIn | ChoiceIn | SelectIn;
export interface OutTable { caption?: string; headers: string[]; rows: string[][]; align?: Array<'l' | 'r'> }
export interface ToolOut {
  label: string; value: string; sub?: string;
  rows: Array<[string, string, number?]>;
  table?: OutTable;
  tables?: OutTable[];
  note?: string;
  /** Aanname die onder het resultaat staat (wat we als vrij rekenen). */
  aanname?: string;
}
export interface ToolSpec { inputs: Input[]; run: (v: V) => ToolOut }
export const optsOf = (i: SelectIn, v: V): Opt[] => (typeof i.options === 'function' ? i.options(v) : i.options);
export function resolve(inputs: Input[], v: V): V {
  const out: V = { ...v };
  for (const i of inputs) if (i.kind === 'select') { const o = optsOf(i, out); if (!o.some((x) => x.value === String(out[i.id]))) out[i.id] = o[0]?.value ?? ''; }
  return out;
}
