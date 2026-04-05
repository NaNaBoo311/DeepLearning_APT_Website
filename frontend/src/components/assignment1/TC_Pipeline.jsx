import { Pill } from './TC_Shared';

const V_COLORS = ['bg-slate-400','bg-blue-400','bg-purple-400','bg-orange-400','bg-rose-400','bg-indigo-600'];

export default function TC_Pipeline() {
  return (
    <div className="space-y-14">

      {/* ── Data Pipeline ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Data Pipeline</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">From raw text to model input</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { badge: 'BiLSTM path', cls: 'badge-blue', accent: 'border-t-blue-400',
              steps: [
                { label:'Normalisation', icon:'🔡', val:'Lowercase · strip URLs / mentions / emojis' },
                { label:'Vocabulary',    icon:'📖', val:'Top-20 000 tokens built from training text only' },
                { label:'Embeddings',   icon:'🧠', val:'GloVe Twitter 27B – 200d · OOV → random init' },
                { label:'Sequence',     icon:'📏', val:'Padded / truncated to max_len = 64' },
                { label:'Class weights',icon:'⚖️', val:'sklearn balanced_class_weight on train labels' },
                { label:'DataLoader',   icon:'📦', val:'Batch 32 · shuffle train · stratified dev split' },
              ],
              note: 'GloVe Twitter pre-encodes slang and abbreviations common in this domain – a meaningful advantage over Wikipedia-trained vectors.' },
            { badge: 'RoBERTa path', cls: 'badge-green', accent: 'border-t-indigo-500',
              steps: [
                { label:'Normalisation',icon:'🔡', val:'Minimal – tokeniser handles raw text natively' },
                { label:'Tokeniser',    icon:'✂️', val:'HuggingFace AutoTokenizer (roberta-base)' },
                { label:'Sequence',     icon:'📏', val:'max_length 80–96 tokens · truncation + padding' },
                { label:'Fine-tuning',  icon:'🎯', val:'Full fine-tuning – all layers + classifier head' },
                { label:'Scheduler',    icon:'📈', val:'Linear warmup (10% steps) then linear decay' },
                { label:'Precision',    icon:'⚡', val:'fp16 mixed precision · AdamW · batch 16–32' },
              ],
              note: 'Full fine-tuning – not just top-layer probing – is critical for adapting to subtle domain-specific linguistic patterns.' },
          ].map(({ badge, cls, accent, steps, note }) => (
            <div key={badge} className={`bg-white border border-slate-200 border-t-4 ${accent} rounded-2xl p-6 shadow-sm`}>
              <Pill cls={cls}>{badge}</Pill>
              <div className="mt-4 divide-y divide-slate-100">
                {steps.map(({ label, icon, val }) => (
                  <div key={label} className="py-3">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{label}</div>
                    <div className="text-sm text-slate-700"><span className="mr-2">{icon}</span>{val}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-blue-50 border-l-4 border-blue-300 rounded-r-xl px-4 py-3 text-sm text-slate-600">{note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Architecture comparison ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Models</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Architecture comparison</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { name:'BiLSTM', cls:'badge-blue', accent:'border-t-blue-400', sub:'GloVe Twitter 200d · 2-layer bidirectional', tag:'RNN', arch:'Embedding → BiLSTM ×2 → max/last-hidden pooling → Dropout 0.3 → Linear', params:'~5M',
              rows:[{label:'Optimiser',val:'Adam · LR 1e-3'},{label:'Scheduler',val:'ReduceLROnPlateau on val Macro F1'},{label:'Loss',val:'Weighted CrossEntropy or Focal (γ = 2)'},{label:'Regulariser',val:'Dropout 0.3 · L2 weight decay · early stopping (patience 4–6)'}],
              strength:'Captures local phrasing and word order within a narrow window.', weakness:'Fixed context window limits cross-sentence reasoning.' },
            { name:'RoBERTa-base', cls:'badge-green', accent:'border-t-indigo-500', sub:'125M parameters · full fine-tuning', tag:'Transformer', arch:'roberta-base → linear classification head (AutoModelForSequenceClassification)', params:'125M',
              rows:[{label:'Optimiser',val:'AdamW · LR 1e-5 to 2e-5'},{label:'Scheduler',val:'Linear warmup + linear decay'},{label:'Loss',val:'Weighted CrossEntropy + optional label smoothing'},{label:'Regulariser',val:'Weight decay · fp16 mixed precision · early stopping (patience 4–6)'}],
              strength:'Full bidirectional context across the entire post.', weakness:'25× more parameters – significantly higher compute cost.' },
          ].map(({ name, cls, accent, sub, tag, arch, rows, params, strength, weakness }) => (
            <div key={name} className={`bg-white border border-slate-200 border-t-4 ${accent} rounded-2xl p-6 shadow-sm`}>
              <div className="flex justify-between items-start mb-4">
                <div><div className="text-xl font-black text-slate-800">{name}</div><div className="text-xs text-slate-400 mt-0.5">{sub}</div></div>
                <Pill cls={cls}>{tag}</Pill>
              </div>
              <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-500 mb-4">
                <span className="uppercase tracking-wider font-bold">Parameters</span>
                <span className="font-black text-slate-800">{params}</span>
              </div>
              <div className="font-mono text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-500 mb-4">{arch}</div>
              <div className="divide-y divide-slate-100 mb-4">
                {rows.map(({ label, val }) => (
                  <div key={label} className="flex gap-4 py-2.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 w-24 shrink-0 mt-0.5">{label}</span>
                    <span className="text-sm text-slate-700">{val}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                <div className="flex gap-2 text-sm text-slate-600"><span>✅</span><span>{strength}</span></div>
                <div className="flex gap-2 text-sm text-slate-600"><span>⚠️</span><span>{weakness}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Side-by-side comparison ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Side-by-side</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">How the two approaches differ</h2>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm divide-y divide-slate-100">
          {[
            { aspect:'Context window',    bilstm:'Local – sliding over tokens',         roberta:'Global – full post at once' },
            { aspect:'Pre-training data', bilstm:'GloVe Twitter 27B tokens',            roberta:'160GB web text (BooksCorpus + CC-News)' },
            { aspect:'OOV handling',      bilstm:'Random init for unknown words',        roberta:'Byte-pair encoding – no true OOV' },
            { aspect:'Training cost',     bilstm:'Fast – minutes per epoch',            roberta:'Slow – GPU-hours per run' },
            { aspect:'Pooling strategy',  bilstm:'Max-pool or last hidden state',        roberta:'[CLS] token representation' },
            { aspect:'Suited for',        bilstm:'Explicit, keyword-rich cases',         roberta:'Subtle, context-dependent cases' },
          ].map(({ aspect, bilstm, roberta }) => (
            <div key={aspect} className="py-3 grid grid-cols-[120px_1fr_1fr] gap-4 items-start">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{aspect}</span>
              <div className="flex items-start gap-2"><Pill cls="badge-blue">BiLSTM</Pill><span className="text-sm text-slate-600">{bilstm}</span></div>
              <div className="flex items-start gap-2"><Pill cls="badge-green">RoBERTa</Pill><span className="text-sm text-slate-600">{roberta}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Experiment Configs ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Experiment System</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Six configurations, six hypotheses</h2>
        <div className="space-y-4">
          {[
            { version:'v1', label:'Baseline',              changes:[], hypothesis:'A clean starting point – Focal Loss active, all hyperparameters at their defaults. Every subsequent config measures improvement against this run.', specs:{ Loss:'Focal (γ=2)', 'RNN LR':'1e-3', 'TF LR':'2e-5', Pooling:'max', Smoothing:'–', Epochs:'20', Patience:'4', 'TF Batch':'32', Warmup:'10%' } },
            { version:'v2', label:'Focal → CrossEntropy',  changes:['Focal Loss OFF','Label smoothing OFF','max_len 80→96','Batch 32→16','LR 2e-5→1.5e-5'], hypothesis:'Focal Loss was the obvious choice for imbalanced data – but was it actually helping?', specs:{ Loss:'CrossEntropy', 'RNN LR':'1e-3', 'TF LR':'1.5e-5', Pooling:'max', Smoothing:'–', Epochs:'25', Patience:'6', 'TF Batch':'16', Warmup:'10%' } },
            { version:'v3', label:'Label smoothing ON',    changes:['Label smoothing 0.0→0.1','LR 1.5e-5→2e-5'], hypothesis:'CrossEntropy alone may push the model to be overconfident on the majority class. Adding label smoothing (0.1) softens the targets.', specs:{ Loss:'CrossEntropy', 'RNN LR':'1e-3', 'TF LR':'2e-5', Pooling:'max', Smoothing:'0.1', Epochs:'25', Patience:'6', 'TF Batch':'16', Warmup:'10%' } },
            { version:'v4', label:'Larger RNN + cautious TF', changes:['Hidden dim 128→256','TF LR 2e-5→1e-5','Warmup 10%→20%','Weight decay 1e-5→1e-4','Epochs→30'], hypothesis:'Two bets – was BiLSTM underfitting due to limited capacity, or was the learning rate moving too fast?', specs:{ Loss:'CrossEntropy', 'RNN LR':'1e-3', 'TF LR':'1e-5', Pooling:'max', Smoothing:'0.1', Epochs:'30', Patience:'6', 'TF Batch':'16', Warmup:'20%' } },
            { version:'v5', label:'Focal Loss on RoBERTa', changes:['Focal Loss ON for transformer','Label smoothing OFF','LR back to 2e-5'], hypothesis:'Focal Loss was only ever paired with BiLSTM in v1 – its effect on the transformer was never actually measured.', specs:{ Loss:'Focal (γ=2)', 'RNN LR':'1e-3', 'TF LR':'2e-5', Pooling:'max', Smoothing:'–', Epochs:'25', Patience:'6', 'TF Batch':'16', Warmup:'10%' } },
            { version:'v6', label:'Small batch + aggressive patience', changes:['TF batch 16→8','RNN batch 32→16','Patience 6→8','Grad clip 1.0→0.5','RNN LR→5e-4','Smoothing→0.15','Epochs→30'], hypothesis:'Halving the batch size doubles gradient updates per epoch – a form of implicit regularisation that can help on noisy, short-text data.', specs:{ Loss:'CrossEntropy', 'RNN LR':'5e-4', 'TF LR':'1.5e-5', Pooling:'max', Smoothing:'0.15', Epochs:'30', Patience:'8', 'TF Batch':'8', Warmup:'10%' } },
          ].map(({ version, label, changes, hypothesis, specs }, idx) => {
            const color = V_COLORS[idx];
            return (
              <div key={version} className={`bg-white border border-slate-200 border-l-4 ${color.replace('bg-','border-l-')} rounded-r-2xl p-5 shadow-sm`}>
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <span className={`font-mono font-black text-xs px-2 py-0.5 rounded-lg ${color} text-white`}>{version}</span>
                  <span className="font-bold text-slate-800">{label}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-3">{hypothesis}</p>
                {changes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {changes.map(c => <span key={c} className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-full px-2.5 py-0.5 font-semibold">{c}</span>)}
                  </div>
                )}
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {Object.entries(specs).map(([k, v]) => (
                    <div key={k} className="bg-slate-50 border border-slate-200 rounded-xl p-2">
                      <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-0.5">{k}</div>
                      <div className="text-xs font-bold text-slate-700">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
