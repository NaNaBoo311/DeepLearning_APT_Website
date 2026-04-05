import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Cpu, BarChart3, MonitorPlay, BookOpen } from 'lucide-react';
import TC_Overview from './TC_Overview';
import TC_EDA     from './TC_EDA';
import TC_Pipeline from './TC_Pipeline';
import TC_Results  from './TC_Results';
import TC_Demo     from './TC_Demo';

const TABS = [
  { id: 'overview', label: 'Dataset Overview',    icon: <BookOpen  size={16} /> },
  { id: 'eda',      label: 'EDA & Insights',      icon: <Search    size={16} /> },
  { id: 'pipeline', label: 'Pipeline & Models',   icon: <Cpu       size={16} /> },
  { id: 'results',  label: 'Results & Analysis',  icon: <BarChart3 size={16} /> },
  { id: 'demo',     label: 'Demo & Resources',    icon: <MonitorPlay size={16} /> },
];

export default function TextClassification() {
  const [tab, setTab] = useState('overview');

  return (
    <div className="flex flex-col gap-10 w-full p-4 md:p-8 text-slate-800 font-sans leading-relaxed bg-white">

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-12 right-24 w-64 h-64 rounded-full bg-violet-400 blur-3xl" />
          <div className="absolute bottom-8 left-32 w-48 h-48 rounded-full bg-indigo-400 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-violet-500/20 text-violet-300 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-6 inline-block border border-violet-500/30"
          >
            Assignment 1 · NLP Pipeline
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[1.1]">
            Explainable{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
              Sexism Detection
            </span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed mb-8 max-w-2xl">
            A two-task NLP pipeline over the SemEval-2023 EDOS dataset — binary detection and
            fine-grained categorisation — benchmarking BiLSTM+GloVe against fine-tuned RoBERTa-base
            across six experimental configurations.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Peak Binary F1', value: '0.836', sub: 'RoBERTa v1' },
              { label: 'Peak Category F1', value: '0.624', sub: 'RoBERTa v3' },
              { label: 'Dataset', value: '20k', sub: 'SemEval-2023 EDOS' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="bg-white/5 px-6 py-4 rounded-3xl border border-white/10">
                <p className="text-[10px] opacity-50 uppercase font-black tracking-widest">{label}</p>
                <p className="font-bold text-xl">{value}</p>
                <p className="text-xs text-slate-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NAV TABS ── */}
      <nav className="flex bg-slate-50 p-2 rounded-3xl sticky top-4 z-50 shadow-lg border border-slate-200 overflow-x-auto no-scrollbar backdrop-blur-md">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl transition-all duration-300 font-black tracking-tight whitespace-nowrap text-sm ${
              tab === t.id
                ? 'bg-indigo-600 text-white shadow-xl translate-y-[-2px]'
                : 'text-slate-400 hover:bg-white hover:text-indigo-600'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </nav>

      {/* ── TAB CONTENT ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {tab === 'overview' && <TC_Overview />}
          {tab === 'eda'      && <TC_EDA />}
          {tab === 'pipeline' && <TC_Pipeline />}
          {tab === 'results'  && <TC_Results />}
          {tab === 'demo'     && <TC_Demo />}
        </motion.div>
      </AnimatePresence>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-200 pt-7 text-center">
        <p className="text-xs text-slate-400 leading-relaxed">
          EDOS Sexism Detection · CO3133 Deep Learning · HCMUT–VNUHCM · 2025–2026<br />
          Dataset: SemEval-2023 Task 10 · Models: BiLSTM + GloVe Twitter, RoBERTa-base
        </p>
      </footer>
    </div>
  );
}