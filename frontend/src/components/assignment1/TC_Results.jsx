import { Pill, Collapse, DataTable, FiguresGallery, ProgBar } from './TC_Shared';

function ProgressGrid({ rows }) {
  return (
    <div className="space-y-2.5">
      {rows.map(({ cfg, rob, bil }) => (
        <div key={cfg} className="grid grid-cols-[36px_1fr_52px_1fr_52px] gap-2 items-center">
          <code className="text-xs font-mono text-slate-400">{cfg}</code>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-indigo-500" style={{ width: `${(rob - 0.35) / 0.55 * 100}%` }} /></div>
          <span className="text-xs font-black text-indigo-600 text-right">{rob.toFixed(3)}</span>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-blue-400" style={{ width: `${(bil - 0.35) / 0.55 * 100}%` }} /></div>
          <span className="text-xs font-black text-blue-500 text-right">{bil.toFixed(3)}</span>
        </div>
      ))}
      <div className="grid grid-cols-[36px_1fr_52px_1fr_52px] gap-2 pt-1">
        <span/>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500"/><span className="text-xs text-slate-400">RoBERTa</span></div>
        <span/>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-400"/><span className="text-xs text-slate-400">BiLSTM</span></div>
        <span/>
      </div>
    </div>
  );
}

export default function TC_Results() {
  return (
    <div className="space-y-14">

      {/* ── Hero stats ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Experiment Overview</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Six configs. Two models. Two tasks. 24 runs.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num:'0.836', label:'Best binary – RoBERTa',  sub:'v1 · Focal + LS',   color:'text-indigo-600' },
            { num:'0.624', label:'Best category – RoBERTa',sub:'v2/v3 · CE + LS',   color:'text-emerald-600' },
            { num:'0.759', label:'Best binary – BiLSTM',   sub:'v6 · CE + LS 0.15', color:'text-blue-500' },
            { num:'0.488', label:'Best category – BiLSTM', sub:'v6 · CE + LS 0.15', color:'text-slate-500' },
          ].map(({ num, label, sub, color }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm">
              <div className={`text-3xl font-black ${color} mb-1`}>{num}</div>
              <div className="text-sm text-slate-600 font-medium mb-0.5">{label}</div>
              <div className="text-xs text-slate-400">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Full results table ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Full Results</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">All runs at a glance</h2>
        <Collapse title="Expand full results table" open>
          <DataTable
            cols={['Model','Task','Config','Loss','Accuracy','Macro F1 ↑','Weighted F1']}
            rows={[
              [<Pill key="r" cls="badge-green">RoBERTa</Pill>,'Binary',  <code key="v1">v1</code>,'Focal + LS 0.1','0.879',<strong key="f" className="text-indigo-600">0.836</strong>,'0.879'],
              [<Pill key="r" cls="badge-green">RoBERTa</Pill>,'Binary',  <code key="v2">v2</code>,'CE only',       '0.877',<strong key="f" className="text-indigo-600">0.827</strong>,'0.875'],
              [<Pill key="r" cls="badge-green">RoBERTa</Pill>,'Binary',  <code key="v3">v3</code>,'CE + LS 0.1',   '0.864',<strong key="f" className="text-indigo-600">0.820</strong>,'0.866'],
              [<Pill key="r" cls="badge-green">RoBERTa</Pill>,'Binary',  <code key="v4">v4</code>,'CE + LS 0.1',   '0.866',<strong key="f" className="text-indigo-600">0.821</strong>,'0.867'],
              [<Pill key="r" cls="badge-green">RoBERTa</Pill>,'Binary',  <code key="v5">v5</code>,'Focal',          '0.871',<strong key="f" className="text-indigo-600">0.826</strong>,'0.871'],
              [<Pill key="r" cls="badge-green">RoBERTa</Pill>,'Binary',  <code key="v6">v6</code>,'CE + LS 0.15',  '0.877',<strong key="f" className="text-indigo-600">0.828</strong>,'0.877'],
              [<Pill key="r" cls="badge-green">RoBERTa</Pill>,'Category',<code key="v1">v1</code>,'Focal + LS 0.1','0.619',<strong key="f" className="text-emerald-600">0.605</strong>,'0.610'],
              [<Pill key="r" cls="badge-green">RoBERTa</Pill>,'Category',<code key="v2">v2</code>,'CE only',       '0.622',<strong key="f" className="text-emerald-600">0.603</strong>,'0.621'],
              [<Pill key="r" cls="badge-green">RoBERTa</Pill>,'Category',<code key="v3">v3</code>,'CE + LS 0.1',   '0.635',<strong key="f" className="text-emerald-600">0.624</strong>,'0.634'],
              [<Pill key="r" cls="badge-green">RoBERTa</Pill>,'Category',<code key="v4">v4</code>,'CE + LS 0.1',   '0.606',<strong key="f" className="text-emerald-600">0.601</strong>,'0.606'],
              [<Pill key="r" cls="badge-green">RoBERTa</Pill>,'Category',<code key="v5">v5</code>,'Focal',          '0.630',<strong key="f" className="text-emerald-600">0.620</strong>,'0.630'],
              [<Pill key="r" cls="badge-green">RoBERTa</Pill>,'Category',<code key="v6">v6</code>,'CE + LS 0.15',  '0.608',<strong key="f" className="text-emerald-600">0.571</strong>,'0.608'],
              [<Pill key="b" cls="badge-blue">BiLSTM</Pill>,  'Binary',  <code key="v1">v1</code>,'Focal + LS 0.1','0.796',<strong key="f" className="text-blue-600">0.732</strong>,'0.799'],
              [<Pill key="b" cls="badge-blue">BiLSTM</Pill>,  'Binary',  <code key="v2">v2</code>,'CE only',       '0.804',<strong key="f" className="text-blue-600">0.738</strong>,'0.805'],
              [<Pill key="b" cls="badge-blue">BiLSTM</Pill>,  'Binary',  <code key="v3">v3</code>,'CE + LS 0.1',   '0.817',<strong key="f" className="text-blue-600">0.756</strong>,'0.819'],
              [<Pill key="b" cls="badge-blue">BiLSTM</Pill>,  'Binary',  <code key="v4">v4</code>,'CE + LS 0.1',   '0.812',<strong key="f" className="text-blue-600">0.757</strong>,'0.813'],
              [<Pill key="b" cls="badge-blue">BiLSTM</Pill>,  'Binary',  <code key="v5">v5</code>,'Focal',          '0.806',<strong key="f" className="text-blue-600">0.744</strong>,'0.809'],
              [<Pill key="b" cls="badge-blue">BiLSTM</Pill>,  'Binary',  <code key="v6">v6</code>,'CE + LS 0.15',  '0.823',<strong key="f" className="text-blue-600">0.759</strong>,'0.823'],
              [<Pill key="b" cls="badge-blue">BiLSTM</Pill>,  'Category',<code key="v1">v1</code>,'Focal + LS 0.1','0.431',<strong key="f" className="text-blue-400">0.412</strong>,'0.420'],
              [<Pill key="b" cls="badge-blue">BiLSTM</Pill>,  'Category',<code key="v2">v2</code>,'CE only',       '0.481',<strong key="f" className="text-blue-400">0.437</strong>,'0.478'],
              [<Pill key="b" cls="badge-blue">BiLSTM</Pill>,  'Category',<code key="v3">v3</code>,'CE + LS 0.1',   '0.502',<strong key="f" className="text-blue-400">0.466</strong>,'0.502'],
              [<Pill key="b" cls="badge-blue">BiLSTM</Pill>,  'Category',<code key="v4">v4</code>,'CE + LS 0.1',   '0.529',<strong key="f" className="text-blue-400">0.482</strong>,'0.529'],
              [<Pill key="b" cls="badge-blue">BiLSTM</Pill>,  'Category',<code key="v5">v5</code>,'Focal',          '0.528',<strong key="f" className="text-blue-400">0.486</strong>,'0.528'],
              [<Pill key="b" cls="badge-blue">BiLSTM</Pill>,  'Category',<code key="v6">v6</code>,'CE + LS 0.15',  '0.522',<strong key="f" className="text-blue-400">0.488</strong>,'0.522'],
            ]}
          />
        </Collapse>
      </div>

      {/* ── Task A ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Task A – Binary Detection</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">RoBERTa vs BiLSTM: the gap is not small</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { model:'RoBERTa', cls:'badge-green', accent:'border-t-indigo-500', f1:'0.836', best:'v1 – Focal + LS 0.1',
              classes:[{label:'Not sexist',p:0.92,r:0.92,f:0.92,color:'bg-slate-400'},{label:'Sexist',p:0.75,r:0.75,f:0.75,color:'bg-indigo-500'}],
              fp:244, fn:240, note:'Focal loss proved most effective for binary detection – penalising overconfident wrong predictions on the dominant Not sexist class directly improved Sexist recall.' },
            { model:'BiLSTM',  cls:'badge-blue',  accent:'border-t-blue-400', f1:'0.759', best:'v6 – CE + LS 0.15',
              classes:[{label:'Not sexist',p:0.88,r:0.88,f:0.88,color:'bg-slate-400'},{label:'Sexist',p:0.63,r:0.64,f:0.63,color:'bg-blue-500'}],
              fp:355, fn:354, note:"BiLSTM's ceiling on the Sexist class is a representation problem, not a tuning problem. GloVe embeddings cannot encode pragmatic or tonal signals." },
          ].map(({ model, cls, accent, f1, best, classes, fp, fn, note }) => (
            <div key={model} className={`bg-white border border-slate-200 border-t-4 ${accent} rounded-2xl p-5 shadow-sm`}>
              <div className="flex justify-between items-start mb-4">
                <div><Pill cls={cls}>{model}</Pill><div className="text-xs text-slate-400 mt-1">Best: {best}</div></div>
                <div className="text-right"><div className="text-3xl font-black text-slate-800">{f1}</div><div className="text-xs text-slate-400">Macro F1</div></div>
              </div>
              <div className="space-y-3 mb-4">
                {classes.map(({ label, p, r, f, color }) => (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-700">{label}</span>
                      <div className="flex gap-3 text-xs text-slate-500">
                        <span>P <strong className="text-slate-800">{p.toFixed(2)}</strong></span>
                        <span>R <strong className="text-slate-800">{r.toFixed(2)}</strong></span>
                        <span>F1 <strong className="text-slate-800">{f.toFixed(2)}</strong></span>
                      </div>
                    </div>
                    <ProgBar pct={f * 100} color={color} />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mb-4">
                {[{label:'False positives',val:fp,sub:'not sexist → sexist'},{label:'False negatives',val:fn,sub:'sexist → not sexist'}].map(({ label, val, sub }) => (
                  <div key={label} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div className="text-lg font-black text-slate-800">{val}</div>
                    <div className="text-xs text-slate-500">{label}</div>
                    <div className="text-[10px] text-slate-400">{sub}</div>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-300 rounded-r-xl px-4 py-3 text-sm text-slate-600">{note}</div>
            </div>
          ))}
        </div>

        {/* Binary progression */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mt-5">
          <div className="text-sm font-bold text-slate-700 mb-4">Macro F1 progression across configs – Binary</div>
          <ProgressGrid rows={[{cfg:'v1',rob:0.836,bil:0.732},{cfg:'v2',rob:0.827,bil:0.738},{cfg:'v3',rob:0.820,bil:0.756},{cfg:'v4',rob:0.821,bil:0.757},{cfg:'v5',rob:0.826,bil:0.744},{cfg:'v6',rob:0.828,bil:0.759}]} />
        </div>
      </div>

      {/* ── Task B ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Task B – Category Classification</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">The hardest task – and a ceiling neither model broke</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { model:'RoBERTa', cls:'badge-green', accent:'border-t-indigo-500', f1:'0.624', best:'v3 – CE + LS 0.1',
              classes:[{label:'Threats',p:0.65,r:0.76,f:0.70},{label:'Derogation',p:0.69,r:0.63,f:0.66},{label:'Animosity',p:0.57,r:0.65,f:0.61},{label:'Prejudiced Disc.',p:0.60,r:0.46,f:0.52}],
              note:'v3 remains the best RoBERTa category result across all six configs. Every subsequent attempt failed to beat it. This is the ceiling for base RoBERTa on this corpus.' },
            { model:'BiLSTM',  cls:'badge-blue',  accent:'border-t-blue-400', f1:'0.488', best:'v6 – CE + LS 0.15',
              classes:[{label:'Threats',p:0.42,r:0.54,f:0.48},{label:'Derogation',p:0.49,r:0.33,f:0.39},{label:'Animosity',p:0.39,r:0.60,f:0.48},{label:'Prejudiced Disc.',p:0.48,r:0.22,f:0.30}],
              note:"BiLSTM's category ceiling barely moved across six configs – only 7.6 points of spread from v1 to v6. The architecture found its representational limit with GloVe + max-pooling." },
          ].map(({ model, cls, accent, f1, best, classes, note }) => (
            <div key={model} className={`bg-white border border-slate-200 border-t-4 ${accent} rounded-2xl p-5 shadow-sm`}>
              <div className="flex justify-between items-start mb-4">
                <div><Pill cls={cls}>{model}</Pill><div className="text-xs text-slate-400 mt-1">Best: {best}</div></div>
                <div className="text-right"><div className="text-3xl font-black text-slate-800">{f1}</div><div className="text-xs text-slate-400">Macro F1</div></div>
              </div>
              <div className="space-y-3 mb-4">
                {classes.map(({ label, p, r, f }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-700">{label}</span>
                      <div className="flex gap-3 text-xs text-slate-500">
                        <span>P <strong className="text-slate-800">{p.toFixed(2)}</strong></span>
                        <span>R <strong className="text-slate-800">{r.toFixed(2)}</strong></span>
                        <span>F1 <strong className="text-slate-800">{f.toFixed(2)}</strong></span>
                      </div>
                    </div>
                    <ProgBar pct={f * 100} color="bg-indigo-400" />
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-300 rounded-r-xl px-4 py-3 text-sm text-slate-600">{note}</div>
            </div>
          ))}
        </div>

        {/* Category progression */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mt-5">
          <div className="text-sm font-bold text-slate-700 mb-4">Macro F1 progression across configs – Category</div>
          <ProgressGrid rows={[{cfg:'v1',rob:0.605,bil:0.412},{cfg:'v2',rob:0.603,bil:0.437},{cfg:'v3',rob:0.624,bil:0.466},{cfg:'v4',rob:0.601,bil:0.482},{cfg:'v5',rob:0.620,bil:0.486},{cfg:'v6',rob:0.571,bil:0.488}]} />
        </div>
      </div>

      {/* ── Figures Gallery ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Figures & Plots</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">All experimental figures</h2>
        <FiguresGallery />
      </div>

      {/* ── Error Analysis ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Error Analysis</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">The confusion that wouldn't move</h2>

        {/* Confusion pair table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-5">
          <div className="font-bold text-slate-800 mb-5">Persistent confusion pairs – RoBERTa Category (best config v3)</div>
          <div className="space-y-4">
            {[
              { from:'Derogation',      to:'Animosity',   count:128, pct:28.2, badge:'badge-amber'  },
              { from:'Animosity',       to:'Derogation',  count:98,  pct:29.4, badge:'badge-blue'   },
              { from:'Prejudiced Disc.',to:'Derogation',  count:23,  pct:24.5, badge:'badge-purple' },
              { from:'Prejudiced Disc.',to:'Animosity',   count:22,  pct:23.4, badge:'badge-purple' },
              { from:'Derogation',      to:'Threats',     count:22,  pct:4.8,  badge:'badge-amber'  },
            ].map(({ from, to, count, pct, badge }) => (
              <div key={`${from}→${to}`} className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 w-64 shrink-0">
                  <Pill cls={badge}>{from}</Pill>
                  <span className="text-slate-400 text-xs">→</span>
                  <Pill cls={badge}>{to}</Pill>
                </div>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${count / 128 * 100}%` }} />
                </div>
                <span className="text-sm font-bold text-slate-800 w-8 text-right">{count}</span>
                <span className="text-xs text-slate-400 w-10 text-right">{pct}%</span>
              </div>
            ))}
          </div>
          <div className="mt-5 bg-amber-50 border-l-4 border-amber-300 rounded-r-xl px-4 py-3 text-sm text-slate-600">
            The Derogation→Animosity confusion (128) and Animosity→Derogation (98) together account for nearly a quarter of all category errors. These exact examples recur in every single config.
          </div>
        </div>

        {/* Focal effect */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-5">
          <div className="font-bold text-slate-800 mb-2">How focal loss shifts the confusion asymmetry</div>
          <p className="text-sm text-slate-500 mb-5">Focal loss systematically flips which direction the confusion flows. Without it, Derogation leaks into Animosity more. With it, Animosity leaks into Derogation more. Neither direction is solved – the boundary simply shifts.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label:'Without focal loss (v2, v3)', cls:'badge-blue',  rows:[{pair:'Derog → Animosity',n:128,max:178},{pair:'Animosity → Derog',n:98,max:178}],  note:'Derogation over-absorbs Animosity' },
              { label:'With focal loss (v5)',        cls:'badge-amber', rows:[{pair:'Derog → Animosity',n:75,max:178}, {pair:'Animosity → Derog',n:154,max:178}], note:'Animosity over-absorbs Derogation' },
            ].map(({ label, cls, rows, note }) => (
              <div key={label} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <Pill cls={cls}>{label}</Pill>
                <div className="mt-4 space-y-3">
                  {rows.map(({ pair, n, max }) => (
                    <div key={pair}>
                      <div className="flex justify-between mb-1 text-sm text-slate-700"><span>{pair}</span><span className="font-bold">{n}</span></div>
                      <ProgBar pct={n / max * 100} color="bg-indigo-400" />
                    </div>
                  ))}
                </div>
                <div className="text-xs text-slate-400 italic mt-3">{note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Next steps */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Limitations & Next Steps</p>
          <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Where the ceiling sits – and how to break it</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { cls:'badge-green',  accent:'border-t-emerald-400', impact:'High',   label:'Domain-adapted backbone',          body:'Switching roberta-base → cardiffnlp/twitter-roberta-base-hate-latest. Twitter-domain pretraining handles the informal register and slang base RoBERTa cannot.' },
              { cls:'badge-amber',  accent:'border-t-amber-400',   impact:'High',   label:'Hierarchical classification',      body:'Binary detection first, then 4-way binary classification on sexist-only examples. The Animosity/Derogation boundary becomes the only hard problem left.' },
              { cls:'badge-blue',   accent:'border-t-blue-400',    impact:'Medium', label:'Threshold calibration',            body:'Best binary Sexist recall is 0.75. Shifting threshold 0.5 → ~0.35 trades some Not-sexist precision for higher Sexist recall – the right trade-off for detection.' },
              { cls:'badge-purple', accent:'border-t-purple-400',  impact:'Medium', label:'FastText embeddings for BiLSTM',   body:'GloVe maps all OOV tokens to random init – slurs, misspellings, internet slang. FastText constructs subword vectors via character n-grams, catching these without vocabulary coverage.' },
            ].map(({ cls, accent, impact, label, body }) => (
              <div key={label} className={`bg-white border border-slate-200 border-t-4 ${accent} rounded-2xl p-5 shadow-sm`}>
                <div className="flex justify-between items-center mb-3">
                  <Pill cls={cls}>{label}</Pill>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full px-2.5 py-0.5">↑ {impact}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
