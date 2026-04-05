import React from 'react';
import { motion } from 'framer-motion';
import {
    Image as ImageIcon, MessageSquare, Layers, BrainCircuit,
    ArrowDown, ArrowRight, Sparkles, GitMerge, Target,
    CheckCircle2, Type
} from 'lucide-react';

// ─── Shared layout card ─────────────────────────────────────────────────────
const SectionCard = ({ title, icon, children }) => (
    <div className="bg-white p-6 md:p-10 rounded-[3.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-700 group">
        <div className="flex items-center gap-5 mb-10">
            <div className="p-4 bg-slate-100 text-slate-600 rounded-[1.5rem] group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                {icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tighter italic">{title}</h3>
        </div>
        {children}
    </div>
);

// ─── Connector helpers ───────────────────────────────────────────────────────
const VLine = ({ color = 'bg-slate-300' }) => <div className={`h-7 w-0.5 ${color} mx-auto`} />;
const HArrow = ({ color = 'text-slate-300' }) => (
    <>
        <ArrowRight className={`${color} hidden md:block shrink-0`} size={22} />
        <ArrowDown className={`${color} md:hidden`} size={22} />
    </>
);

// ─── CLIP model chip ─────────────────────────────────────────────────────────
const ClipChip = ({ label, sub, color = 'bg-indigo-600 border-indigo-700', glow = 'bg-indigo-400' }) => (
    <div className={`flex flex-col items-center gap-1 ${color} px-6 py-3 rounded-2xl shadow-lg border relative group cursor-default`}>
        <div className={`absolute -inset-1 ${glow} opacity-25 rounded-2xl blur group-hover:opacity-40 transition-opacity`} />
        <BrainCircuit size={20} className="text-white relative z-10" />
        <span className="text-sm font-black text-white relative z-10 tracking-wide whitespace-nowrap">{label}</span>
        {sub && <span className="text-[9px] font-bold uppercase tracking-widest text-white/60 relative z-10">{sub}</span>}
    </div>
);

// ─── Embedding chip ──────────────────────────────────────────────────────────
const EmbedChip = ({ label, values, color = 'border-indigo-200 text-indigo-600 bg-indigo-50' }) => (
    <div className={`flex flex-col items-center gap-1 bg-white border-2 ${color} rounded-2xl p-3 shadow-sm min-w-[110px]`}>
        <div className={`font-mono text-[10px] px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-100 w-full text-center text-slate-500 tracking-widest`}>
            {values}
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest`}>{label}</span>
    </div>
);

// ════════════════════════════════════════════════════════════════════════════
export default function ZeroshotVsFewshot({ setSelectedImage }) {
    return (
        <div className="space-y-16">

            {/* ── Zero-shot Pipeline ─────────────────────────────────────────────── */}
            <SectionCard title="Zero-Shot CLIP Pipeline" icon={<Sparkles size={22} />}>
                <p className="text-slate-500 text-sm mb-10 max-w-3xl leading-relaxed">
                    The zero-shot pipeline uses a <b>pretrained CLIP model with no additional training</b>.
                    Depending on the input modality, the sample embedding is computed differently, then compared
                    against learnable label prototype embeddings via cosine similarity to produce a prediction.
                </p>

                {/* ── Step 1: Three input modality columns ─────────────────────── */}
                <div className="flex flex-col items-center gap-0">

                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Step 1 — Input Modality (choose one)</p>

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* Image-only */}
                        <div className="flex flex-col items-center gap-3 bg-slate-50 border-2 border-indigo-200 rounded-3xl p-5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">Image-only</span>
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center shadow-inner">
                                <ImageIcon size={36} className="text-indigo-400" />
                            </div>
                            <span className="text-xs font-bold text-slate-600 text-center">Raw image fed to<br />CLIP image encoder</span>
                        </div>

                        {/* Text-only */}
                        <div className="flex flex-col items-center gap-3 bg-slate-50 border-2 border-cyan-200 rounded-3xl p-5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-cyan-500 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full">Text-only</span>
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-200 flex items-center justify-center shadow-inner">
                                <MessageSquare size={36} className="text-cyan-400" />
                            </div>
                            <span className="text-xs font-bold text-slate-600 text-center">Caption fed to<br />CLIP text encoder</span>
                        </div>

                        {/* Multimodal */}
                        <div className="flex flex-col items-center gap-3 bg-slate-50 border-2 border-emerald-200 rounded-3xl p-5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">Image + Text</span>
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center shadow-inner">
                                <GitMerge size={36} className="text-emerald-400" />
                            </div>
                            <span className="text-xs font-bold text-slate-600 text-center">Both encoded separately,<br />then averaged + normalized</span>
                        </div>
                    </div>

                    {/* Arrows down to encoders */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                        <div className="flex justify-center"><VLine color="bg-indigo-200" /></div>
                        <div className="flex justify-center"><VLine color="bg-cyan-200" /></div>
                        <div className="flex justify-center"><VLine color="bg-emerald-200" /></div>
                    </div>

                    {/* ── Step 2: CLIP Encoders ────────────────────────────────────── */}
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Step 2 — CLIP Encoders</p>

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* Image encoder */}
                        <div className="flex flex-col items-center gap-2">
                            <ClipChip label="CLIP Image Encoder" sub="ViT-B/32" color="bg-indigo-600 border-indigo-700" glow="bg-indigo-400" />
                            <VLine color="bg-indigo-200" />
                            <EmbedChip label="Image Embedding" values="[0.21, -0.34, …]" color="border-indigo-200 text-indigo-600 bg-indigo-50" />
                        </div>

                        {/* Text encoder */}
                        <div className="flex flex-col items-center gap-2">
                            <ClipChip label="CLIP Text Encoder" sub="Transformer" color="bg-cyan-600 border-cyan-700" glow="bg-cyan-400" />
                            <VLine color="bg-cyan-200" />
                            <EmbedChip label="Text Embedding" values="[0.05, 0.67, …]" color="border-cyan-200 text-cyan-600 bg-cyan-50" />
                        </div>

                        {/* Both encoders for multimodal */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex gap-2 flex-wrap justify-center">
                                <ClipChip label="Image Enc." sub="ViT-B/32" color="bg-indigo-500 border-indigo-600" glow="bg-indigo-300" />
                                <ClipChip label="Text Enc." sub="Transformer" color="bg-cyan-500 border-cyan-600" glow="bg-cyan-300" />
                            </div>
                            <VLine color="bg-emerald-200" />
                            {/* Fusion box */}
                            <div className="flex flex-col items-center gap-1 bg-emerald-50 border-2 border-emerald-300 rounded-2xl px-5 py-3 shadow-sm w-full">
                                <GitMerge size={16} className="text-emerald-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Average + L2 Normalize</span>
                                <div className="font-mono text-[10px] px-2 py-1 rounded-lg bg-white border border-emerald-100 w-full text-center text-slate-500 mt-1">
                                    (img_emb + txt_emb) / 2 → norm
                                </div>
                            </div>
                            <VLine color="bg-emerald-200" />
                            <EmbedChip label="Fused Embedding" values="[0.13, 0.17, …]" color="border-emerald-200 text-emerald-600 bg-emerald-50" />
                        </div>
                    </div>

                    {/* Merge arrows down to sample embedding */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                        <div className="flex justify-center"><VLine color="bg-indigo-200" /></div>
                        <div className="flex justify-center"><VLine color="bg-cyan-200" /></div>
                        <div className="flex justify-center"><VLine color="bg-emerald-200" /></div>
                    </div>

                    {/* ── Step 3: Sample embedding (converge) ─────────────────────── */}
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Step 3 — Sample Embedding (normalized)</p>

                    {/* Horizontal connector bar */}
                    <div className="hidden md:block w-2/3 h-5 border-t-2 border-l-2 border-r-2 border-slate-300 rounded-t-xl mb-0" />
                    <VLine color="bg-slate-300" />
                    <div className="flex flex-col items-center gap-1 bg-slate-800 text-white px-8 py-4 rounded-2xl shadow-xl border border-slate-700">
                        <Layers size={20} className="text-slate-300" />
                        <span className="font-black text-sm tracking-wide">Sample Embedding</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">image / text / fused — L2 normalized</span>
                    </div>

                    {/* ── Big divider showing parallel stream ─────────────────────── */}
                    <div className="w-full my-8 border-t-2 border-dashed border-slate-200 relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                            In Parallel — Label Prototypes
                        </span>
                    </div>

                    {/* ── Step 4: Label prototypes stream ─────────────────────────── */}
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Step 4 — Prompt Templates → Label Prototypes</p>

                    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">

                        {/* Class labels */}
                        <div className="flex flex-col items-start gap-2 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Candidate Classes</span>
                            {['sports', 'wedding', 'dogs', '… (13 total)'].map(l => (
                                <span key={l} className="bg-slate-100 text-slate-600 font-mono text-[11px] px-3 py-1 rounded-lg font-bold">{l}</span>
                            ))}
                        </div>

                        <HArrow color="text-amber-300" />

                        {/* Prompt templates */}
                        <div className="flex flex-col items-start gap-2 bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 shadow-sm">
                            <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 mb-1 flex items-center gap-1"><Type size={11} /> Prompt Templates</span>
                            {[
                                '"a photo of sports"',
                                '"a picture of wedding"',
                                '"a photo of dogs in the scene"',
                            ].map(t => (
                                <span key={t} className="font-mono text-[10px] text-amber-800 italic">{t}</span>
                            ))}
                            <span className="text-[9px] text-amber-400 font-bold mt-1">Multiple templates per class →</span>
                        </div>

                        <HArrow color="text-amber-300" />

                        {/* CLIP text encoder for prompts */}
                        <div className="flex flex-col items-center gap-2">
                            <ClipChip label="CLIP Text Encoder" color="bg-amber-500 border-amber-600" glow="bg-amber-300" />
                            <VLine color="bg-amber-200" />
                            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-4 py-2 shadow-sm text-center">
                                <span className="text-[9px] font-black uppercase tracking-widest text-amber-600">Average prompt embeddings</span>
                                <div className="font-mono text-[10px] text-slate-500 mt-1">→ 1 prototype / class</div>
                            </div>
                        </div>

                        <HArrow color="text-amber-300" />

                        {/* Label prototype embeddings */}
                        <div className="flex flex-col items-start gap-2 bg-white border-2 border-amber-300 rounded-2xl p-4 shadow-sm">
                            <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 mb-1">Label Prototypes</span>
                            {[
                                { label: 'sports', v: '[0.44, -0.12, …]' },
                                { label: 'wedding', v: '[0.11,  0.89, …]' },
                                { label: 'dogs', v: '[-0.3,  0.22, …]' },
                            ].map(({ label, v }) => (
                                <div key={label} className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-amber-700 w-16">{label}</span>
                                    <span className="font-mono text-[10px] text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg">{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Step 5: Cosine similarity ────────────────────────────────── */}
                    <div className="w-full my-8 border-t-2 border-dashed border-slate-200 relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                            Comparison
                        </span>
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Step 5 — Cosine Similarity (dot product of normalized vectors)</p>

                    <div className="w-full max-w-xl flex flex-col items-center gap-0">
                        <div className="flex flex-col items-center gap-1 bg-rose-600 px-10 py-4 rounded-2xl shadow-xl shadow-rose-200 border border-rose-700 relative group cursor-default">
                            <div className="absolute -inset-1 bg-rose-400 opacity-25 rounded-2xl blur group-hover:opacity-40 transition-opacity" />
                            <Target size={24} className="text-white relative z-10" />
                            <span className="text-sm font-black text-white relative z-10 tracking-wide">Cosine Similarity</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-rose-200 relative z-10">sample_emb · label_proto  (for each class)</span>
                        </div>

                        <VLine color="bg-rose-200" />

                        {/* Score table */}
                        <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Similarity Scores</p>
                            <div className="space-y-2">
                                {[
                                    { label: 'wedding', score: 0.91, winner: true },
                                    { label: 'sports', score: 0.34, winner: false },
                                    { label: 'dogs', score: 0.18, winner: false },
                                    { label: '…', score: null, winner: false },
                                ].map(({ label, score, winner }, i) => (
                                    <div key={label} className={`flex items-center gap-3 rounded-xl px-3 py-1.5 ${winner ? 'bg-rose-50 border border-rose-200' : ''}`}>
                                        <span className={`font-mono text-xs w-20 shrink-0 ${winner ? 'text-rose-700 font-black' : 'text-slate-400 font-medium'}`}>{label}</span>
                                        <div className="flex-1 bg-slate-100 h-4 rounded-full overflow-hidden">
                                            {score !== null && (
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${score * 100}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
                                                    className={`h-full rounded-full ${winner ? 'bg-rose-500' : 'bg-slate-300'}`}
                                                />
                                            )}
                                        </div>
                                        <span className={`font-mono text-xs font-black w-10 text-right ${winner ? 'text-rose-600' : 'text-slate-400'}`}>
                                            {score !== null ? score.toFixed(2) : '…'}
                                        </span>
                                        {winner && <CheckCircle2 size={14} className="text-rose-500 shrink-0" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <VLine color="bg-rose-200" />

                        {/* ── Step 6: Final prediction ─────────────────────────────── */}
                        <div className="flex gap-4 w-full">
                            <div className="flex-1 bg-rose-600 text-white rounded-2xl p-4 flex flex-col items-center gap-1 shadow-lg shadow-rose-200">
                                <CheckCircle2 size={18} className="opacity-80 mb-1" />
                                <span className="text-[9px] font-black uppercase tracking-widest opacity-70">Zero-shot Prediction</span>
                                <span className="font-black text-lg tracking-tight">wedding</span>
                            </div>
                            <div className="flex-1 bg-white border-2 border-rose-300 rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm">
                                <Sparkles size={18} className="text-rose-500 mb-1" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Similarity Score</span>
                                <span className="font-black text-lg text-rose-600 tracking-tight">0.91</span>
                            </div>
                        </div>

                    </div>

                    {/* Summary note */}
                    <p className="text-xs text-slate-400 italic mt-8 max-w-2xl text-center leading-relaxed">
                        No training is required — CLIP's pretrained weights transfer directly.
                        The same text encoder is shared between caption encoding and prompt-template encoding.
                        The label with the <b>highest cosine similarity</b> is the zero-shot prediction.
                    </p>

                </div>
            </SectionCard>

        </div>
    );
}
