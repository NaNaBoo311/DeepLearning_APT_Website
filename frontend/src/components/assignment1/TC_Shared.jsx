// Shared helper components for TextClassification tabs
import { useState } from 'react';

/* ─── Pill / Badge ─────────────────────────────── */
const PILL_STYLES = {
  'badge-amber':  'bg-amber-100 text-amber-700 border border-amber-200',
  'badge-blue':   'bg-blue-100 text-blue-700 border border-blue-200',
  'badge-green':  'bg-emerald-100 text-emerald-700 border border-emerald-200',
  'badge-purple': 'bg-purple-100 text-purple-700 border border-purple-200',
  'badge-red':    'bg-rose-100 text-rose-700 border border-rose-200',
};
export function Pill({ children, cls = 'badge-amber' }) {
  return (
    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold tracking-wide ${PILL_STYLES[cls] ?? PILL_STYLES['badge-amber']}`}>
      {children}
    </span>
  );
}

/* ─── Figure ───────────────────────────────────── */
export function Figure({ src, caption, height = 280, alt }) {
  const [err, setErr] = useState(false);
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
      {src && !err ? (
        <img src={src} alt={alt || caption} onError={() => setErr(true)}
          style={{ width: '100%', height, objectFit: 'contain', display: 'block', background: '#f8fafc' }} />
      ) : (
        <div style={{ height }} className="flex flex-col items-center justify-center text-slate-400 gap-2">
          <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
          </svg>
          <span className="text-sm">{alt || caption}</span>
        </div>
      )}
      {caption && <div className="px-3 py-2 text-xs text-slate-400 italic border-t border-slate-200">{caption}</div>}
    </div>
  );
}

/* ─── Collapse ─────────────────────────────────── */
export function Collapse({ title, children, open: defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors text-left"
      >
        {title}
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', flexShrink: 0 }}>
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <div className="border border-slate-200 border-t-0 rounded-b-xl bg-white px-5 py-4 mt-[-1px]">
          {children}
        </div>
      )}
    </div>
  );
}

/* ─── DataTable ────────────────────────────────── */
export function DataTable({ cols, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {cols.map(c => (
              <th key={c} className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider px-4 py-2.5 text-left border-b border-slate-200">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 border-b border-slate-100 text-slate-700 align-middle">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── ProgBar ──────────────────────────────────── */
export function ProgBar({ pct, color = 'bg-indigo-500' }) {
  return (
    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ─── FiguresGallery ───────────────────────────── */
export function FiguresGallery() {
  const [activeTab, setActiveTab] = useState('roberta_binary');
  const [lightbox, setLightbox] = useState(null);

  const tabs = [
    { id: 'roberta_binary',   label: 'RoBERTa · Binary' },
    { id: 'roberta_category', label: 'RoBERTa · Category' },
    { id: 'bilstm_binary',    label: 'BiLSTM · Binary' },
    { id: 'bilstm_category',  label: 'BiLSTM · Category' },
  ];

  const prefix = './figures';
  const figures = {
    roberta_binary: [
      { src: `${prefix}/training_curve_roberta_binary.png`,   caption: 'Training curves – loss · accuracy · Macro F1', span: 2 },
      { src: `${prefix}/cm_roberta_binary.png`,               caption: 'Confusion matrix (count + normalised)',        span: 1 },
      { src: `${prefix}/perclass_roberta_binary.png`,         caption: 'Per-class Precision / Recall / F1',           span: 1 },
      { src: `${prefix}/error_rate_roberta_binary.png`,       caption: 'Error rate per class',                        span: 1 },
      { src: `${prefix}/confusion_errors_roberta_binary.png`, caption: 'Confusion error heatmap',                     span: 1 },
      { src: `${prefix}/error_analysis1_roberta_binary.png`,  caption: 'Error analysis I – text length & confidence', span: 2 },
      { src: `${prefix}/error_analysis2_roberta_binary.png`,  caption: 'Error analysis II – violin & scatter',        span: 2 },
    ],
    roberta_category: [
      { src: `${prefix}/training_curve_roberta_category.png`,   caption: 'Training curves', span: 2 },
      { src: `${prefix}/cm_roberta_category.png`,               caption: 'Confusion matrix', span: 2 },
      { src: `${prefix}/perclass_roberta_category.png`,         caption: 'Per-class metrics', span: 1 },
      { src: `${prefix}/error_rate_roberta_category.png`,       caption: 'Error rate per class', span: 1 },
      { src: `${prefix}/confusion_errors_roberta_category.png`, caption: 'Confusion heatmap', span: 1 },
      { src: `${prefix}/error_analysis1_roberta_category.png`,  caption: 'Error analysis I', span: 2 },
      { src: `${prefix}/error_analysis2_roberta_category.png`,  caption: 'Error analysis II', span: 2 },
    ],
    bilstm_binary: [
      { src: `${prefix}/training_curve_bilstm_binary.png`,   caption: 'Training curves', span: 2 },
      { src: `${prefix}/cm_bilstm_binary.png`,               caption: 'Confusion matrix', span: 1 },
      { src: `${prefix}/perclass_bilstm_binary.png`,         caption: 'Per-class metrics', span: 1 },
      { src: `${prefix}/error_rate_bilstm_binary.png`,       caption: 'Error rate per class', span: 1 },
      { src: `${prefix}/confusion_errors_bilstm_binary.png`, caption: 'Confusion heatmap', span: 1 },
      { src: `${prefix}/error_analysis1_bilstm_binary.png`,  caption: 'Error analysis I', span: 2 },
      { src: `${prefix}/error_analysis2_bilstm_binary.png`,  caption: 'Error analysis II', span: 2 },
    ],
    bilstm_category: [
      { src: `${prefix}/training_curve_bilstm_category.png`,   caption: 'Training curves', span: 2 },
      { src: `${prefix}/cm_bilstm_category.png`,               caption: 'Confusion matrix', span: 2 },
      { src: `${prefix}/perclass_bilstm_category.png`,         caption: 'Per-class metrics', span: 1 },
      { src: `${prefix}/error_rate_bilstm_category.png`,       caption: 'Error rate per class', span: 1 },
      { src: `${prefix}/confusion_errors_bilstm_category.png`, caption: 'Confusion heatmap', span: 1 },
      { src: `${prefix}/error_analysis1_bilstm_category.png`,  caption: 'Error analysis I', span: 2 },
      { src: `${prefix}/error_analysis2_bilstm_category.png`,  caption: 'Error analysis II', span: 2 },
    ],
  };

  const current = figures[activeTab];

  return (
    <div className="w-full mb-14">
      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 mb-5 pb-3 border-b border-slate-200 justify-center">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-4 py-1.5 rounded-xl text-sm font-semibold border transition-all ${activeTab === t.id ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {current.map(({ src, caption, span }) => (
          <div key={src} onClick={() => setLightbox(src)}
            style={{ gridColumn: span === 2 ? '1 / -1' : 'auto' }}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-zoom-in hover:shadow-lg hover:border-indigo-200 transition-all">
            <img src={src} alt={caption} className="w-full object-contain bg-white block" />
            <div className="px-4 py-2.5 text-xs text-slate-400 border-t border-slate-100">{caption}</div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-8 cursor-zoom-out">
          <img src={lightbox} className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain cursor-default" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
