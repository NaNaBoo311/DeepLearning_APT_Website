import { Pill } from './TC_Shared';

export default function TC_Demo() {
  return (
    <div className="space-y-14">

      {/* ── Live Demo ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Live Inference</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Try the two-stage pipeline</h2>
        <p className="text-slate-500 text-base leading-relaxed mb-6 max-w-2xl">
          Enter any text to run Task A binary detection, followed by Task B fine-grained categorisation
          if sexist content is flagged. Powered by fine-tuned RoBERTa-base.
        </p>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Browser-chrome bar */}
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-b border-slate-200">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-400"/>
              <div className="w-3 h-3 rounded-full bg-amber-400"/>
              <div className="w-3 h-3 rounded-full bg-emerald-400"/>
            </div>
            <div className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs text-slate-400 font-mono">
              phatpinkkkk-edos-sexism-detector.hf.space
            </div>
            <a href="https://huggingface.co/spaces/phatpinkkkk/edos-sexism-detector"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
              Open in new tab
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>
              </svg>
            </a>
          </div>
          <iframe
            src="https://phatpinkkkk-edos-sexism-detector.hf.space"
            title="EDOS Sexism Detector"
            style={{ width: '100%', height: 700, border: 'none', display: 'block' }}
          />
        </div>
      </div>

      {/* ── Resources ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Resources</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Links & references</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title:'Code repository',  desc:'Full pipeline: data loading, BiLSTM, RoBERTa, trainer, evaluation, error analysis.', href:'https://github.com/phatpinkkk/edos-sexism-detection', badge:'GitHub',       cls:'badge-blue'   },
            { title:'Live demo',        desc:'Interactive two-stage classifier. Runs Task A then Task B for sexist content.',         href:'https://huggingface.co/spaces/phatpinkkkk/edos-sexism-detector', badge:'HuggingFace', cls:'badge-green'  },
            { title:'EDOS paper',       desc:'SemEval-2023 Task 10 – Explainable Detection of Online Sexism (Kirk et al.).',         href:'https://aclanthology.org/2023.semeval-1.305/', badge:'ACL Anthology',cls:'badge-amber'  },
            { title:'GloVe embeddings', desc:'GloVe Twitter 27B vectors used for BiLSTM – download from Stanford NLP.',              href:'https://nlp.stanford.edu/projects/glove/', badge:'Stanford NLP', cls:'badge-purple' },
          ].map(({ title, desc, href, badge, cls }) => (
            <a key={title} href={href} target="_blank" rel="noreferrer"
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all block group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{title}</span>
                <Pill cls={cls}>{badge}</Pill>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
