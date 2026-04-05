import { Pill, ProgBar } from './TC_Shared';

export default function TC_Overview() {
  return (
    <div className="space-y-14">

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          ['20,000', 'Total samples'],
          ['16,000', 'Train + dev'],
          ['4,000',  'Official test set'],
          ['5',      'Label classes'],
          ['~23',    'Avg. words / post'],
          ['2',      'Classification tasks'],
        ].map(([num, label]) => (
          <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-black text-indigo-600 mb-1">{num}</div>
            <div className="text-sm text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      {/* ── Tasks ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">The Tasks</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Detecting and Classifying Sexism</h2>
        <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-2xl">
          Online platforms are saturated with toxic content. Sexism is harder to detect — not because it is rare,
          but because it is often subtle and woven into everyday language. Identifying it requires recognising intent,
          tone, and meaning beyond surface-level words.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { badge: 'Task A', cls: 'badge-blue', title: 'Binary Detection',
              desc: 'Decide whether a post is sexist. Not all offensive language is sexist – and not all sexism is obvious.',
              items: ['Classes: Not Sexist · Sexist', 'Training: 16,000 samples', 'Test: 4,000 samples', 'Metric: Macro F1'] },
            { badge: 'Task B', cls: 'badge-amber', title: 'Category Classification',
              desc: 'Given a sexist post, identify how it is expressed – from direct attacks to subtle bias.',
              items: ['Classes: Threats · Derogation · Animosity · Prejudiced Discussion', 'Training: 3,884 sexist-only', 'Test: 970 sexist-only', 'Metric: Macro F1'] },
          ].map(({ badge, cls, title, desc, items }) => (
            <div key={title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3"><Pill cls={cls}>{badge}</Pill><span className="font-bold text-slate-800">{title}</span></div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>
              <ul className="space-y-1.5">
                {items.map(d => (
                  <li key={d} className="flex gap-2 text-sm text-slate-500">
                    <span className="text-indigo-400 shrink-0">›</span>{d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Taxonomy ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">EDOS Taxonomy</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Four categories of sexism</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { badge: 'Threats',              cls: 'badge-red',    accent: 'border-rose-400',   desc: 'Explicit intent to harm or intimidate.',                     example: '"I\'ll find out where you live."' },
            { badge: 'Derogation',           cls: 'badge-amber',  accent: 'border-amber-400',  desc: 'Direct insults or demeaning language.',                       example: '"Women are only good in the kitchen."' },
            { badge: 'Animosity',            cls: 'badge-blue',   accent: 'border-blue-400',   desc: 'Subtle hostility or stereotypical claims.',                   example: '"Women should stay at home and raise kids."' },
            { badge: 'Prejudiced Discussion',cls: 'badge-purple', accent: 'border-purple-400', desc: 'Arguments that justify or deny inequality.',                  example: '"Sexism isn\'t real anymore."' },
          ].map(({ badge, cls, accent, desc, example }) => (
            <div key={badge} className={`bg-white border-l-4 ${accent} border border-slate-200 rounded-2xl p-5 shadow-sm`}>
              <Pill cls={cls}>{badge}</Pill>
              <p className="text-slate-700 text-sm mt-3 mb-1 font-medium">{desc}</p>
              <p className="text-slate-400 text-sm italic">{example}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Class Distribution ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Class Distribution</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Severe imbalance across all labels</h2>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          {[
            { label: 'Not Sexist',           count: 15146, pct: 75.7, cls: 'badge-blue',   color: 'bg-slate-400' },
            { label: 'Derogation',           count: 2227,  pct: 11.1, cls: 'badge-amber',  color: 'bg-amber-400' },
            { label: 'Animosity',            count: 1665,  pct: 8.3,  cls: 'badge-blue',   color: 'bg-blue-400'  },
            { label: 'Prejudiced Discussion',count: 475,   pct: 2.4,  cls: 'badge-purple', color: 'bg-purple-400'},
            { label: 'Threats',              count: 443,   pct: 2.2,  cls: 'badge-red',    color: 'bg-rose-400'  },
          ].map(({ label, count, pct, cls, color }) => (
            <div key={label}>
              <div className="flex justify-between items-center mb-1.5">
                <Pill cls={cls}>{label}</Pill>
                <span className="text-sm font-semibold text-slate-700">
                  {count.toLocaleString()} <span className="text-slate-400 font-normal">({pct}%)</span>
                </span>
              </div>
              <ProgBar pct={pct} color={color} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Challenges ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Key Challenges</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Key challenges in detecting sexism</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            ['Class imbalance', 'Non-sexist posts dominate (75.7%), while Threats and Prejudiced Discussion together are under 5%. Models tend to ignore these rare but critical cases.'],
            ['Shared language', 'Words like "women", "bitch", and "rape" appear across multiple classes – even in non-sexist posts. Keywords alone are unreliable.'],
            ['Short & dense text', 'Posts are short (~23 words) and informal. Meaning is compressed into a few cues like tone, slang, or emojis.'],
            ['Implicit & overlapping signals', 'Explicit cases are easier, but many rely on tone or context. Categories often overlap, making boundaries unclear.'],
          ].map(([title, body]) => (
            <div key={title} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm border-l-4 border-l-indigo-400">
              <div className="font-bold text-slate-800 mb-2">{title}</div>
              <div className="text-sm text-slate-500 leading-relaxed">{body}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
