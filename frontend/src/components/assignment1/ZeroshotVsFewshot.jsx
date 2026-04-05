import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Image as ImageIcon, MessageSquare, Layers, BrainCircuit,
    ArrowDown, ArrowRight, Sparkles, GitMerge, Target,
    CheckCircle2, Type, Snowflake, Table2
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
const ClipChip = ({ label, sub, color = 'bg-indigo-600 border-indigo-700', glow = 'bg-indigo-400', frozen = false }) => (
    <div className={`flex flex-col items-center gap-1 ${frozen ? 'bg-gradient-to-b from-sky-400 to-cyan-500 border-cyan-400 shadow-cyan-200' : color} px-6 py-3 rounded-2xl shadow-lg border relative group cursor-default overflow-hidden`}>
        <div className={`absolute -inset-1 ${frozen ? 'bg-cyan-100' : glow} opacity-25 rounded-2xl blur group-hover:opacity-40 transition-opacity`} />
        {frozen && (
            <div className="absolute top-0 right-0 p-1 opacity-20 group-hover:opacity-40 transition-all duration-1000 group-hover:rotate-180">
                <Snowflake size={48} className="text-white transform translate-x-1/4 -translate-y-1/4" />
            </div>
        )}
        <BrainCircuit size={20} className="text-white relative z-10" />
        <span className="text-sm font-black text-white relative z-10 tracking-wide whitespace-nowrap">{label}</span>
        {sub && (
            <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-white/80 relative z-10">
                {frozen && <Snowflake size={10} className="text-white/80" />}
                {sub}
            </span>
        )}
    </div>
);

// ─── MLP classifier chip ──────────────────────────────────────────────────────
const MlpChip = ({ label, sub, color = 'bg-indigo-600 border-indigo-700', glow = 'bg-indigo-400' }) => (
    <div className={`flex flex-col items-center gap-1 ${color} px-6 py-3 rounded-2xl shadow-lg border relative group cursor-default transition-all duration-300 md:hover:scale-105 overflow-hidden`}>
        <div className={`absolute -inset-1 ${glow} opacity-25 rounded-2xl blur group-hover:opacity-40 transition-opacity`} />
        <Layers size={20} className="text-white relative z-10" />
        <span className="text-sm font-black text-white relative z-10 tracking-wide whitespace-nowrap">{label}</span>
        {sub && <span className="text-[9px] font-bold uppercase tracking-widest text-white/80 relative z-10">{sub}</span>}
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
    const [kSetting, setKSetting] = useState(100);

    const K100_RESULTS = [
        { setting: 'Zero-shot', modality: 'Image', acc: '0.5378', f1m: '0.5117', f1w: '0.5368' },
        { setting: 'Zero-shot', modality: 'Text', acc: '0.5125', f1m: '0.5009', f1w: '0.4940' },
        { setting: 'Zero-shot', modality: 'Multimodal', acc: '0.5874', f1m: '0.5696', f1w: '0.5776' },
        { setting: 'Few-shot (MLP)', modality: 'Image', acc: '0.6752', f1m: '0.6562', f1w: '0.6789' },
        { setting: 'Few-shot (MLP)', modality: 'Text', acc: '0.7293', f1m: '0.7031', f1w: '0.7286' },
        { setting: 'Few-shot (MLP)', modality: 'Multimodal', acc: '0.7329', f1m: '0.7189', f1w: '0.7348' },
        { setting: 'Few-shot (CoOp)', modality: 'Image', acc: '0.6515', f1m: '0.6469', f1w: '0.6553' },
        { setting: 'Few-shot (CoOp)', modality: 'Text', acc: '0.7115', f1m: '0.6967', f1w: '0.7138' },
        { setting: 'Few-shot (CoOp)', modality: 'Multimodal', acc: '0.7248', f1m: '0.7214', f1w: '0.7265' },
    ];

    const K20_RESULTS = [
        { setting: 'Zero-shot', modality: 'Image', acc: '0.5378', f1m: '0.5117', f1w: '0.5368' },
        { setting: 'Zero-shot', modality: 'Text', acc: '0.5125', f1m: '0.5009', f1w: '0.4940' },
        { setting: 'Zero-shot', modality: 'Multimodal', acc: '0.5874', f1m: '0.5696', f1w: '0.5776' },
        { setting: 'Few-shot (MLP)', modality: 'Image', acc: '0.5212', f1m: '0.4838', f1w: '0.5149' },
        { setting: 'Few-shot (MLP)', modality: 'Text', acc: '0.4707', f1m: '0.4537', f1w: '0.4662' },
        { setting: 'Few-shot (MLP)', modality: 'Multimodal', acc: '0.6100', f1m: '0.5746', f1w: '0.5948' },
        { setting: 'Few-shot (CoOp)', modality: 'Image', acc: '0.5912', f1m: '0.5862', f1w: '0.5959' },
        { setting: 'Few-shot (CoOp)', modality: 'Text', acc: '0.6370', f1m: '0.6254', f1w: '0.6407' },
        { setting: 'Few-shot (CoOp)', modality: 'Multimodal', acc: '0.6538', f1m: '0.6474', f1w: '0.6630' },
    ];

    const renderTable = (data) => {
        const maxAccByModality = {
            Image: Math.max(...data.filter(r => r.modality === 'Image').map(r => parseFloat(r.acc))),
            Text: Math.max(...data.filter(r => r.modality === 'Text').map(r => parseFloat(r.acc))),
            Multimodal: Math.max(...data.filter(r => r.modality === 'Multimodal').map(r => parseFloat(r.acc)))
        };
        
        return (
            <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                        <tr>
                            <th className="px-5 py-4 border-b border-slate-200 text-slate-800">Setting</th>
                            <th className="px-5 py-4 border-b border-slate-200 text-slate-800">Modality</th>
                            <th className="px-5 py-4 border-b border-slate-200 text-right">Accuracy</th>
                            <th className="px-5 py-4 border-b border-slate-200 text-right">F1 (Macro)</th>
                            <th className="px-5 py-4 border-b border-slate-200 text-right">F1 (Weighted)</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                        {data.map((row, idx) => {
                            const isCoOp = row.setting.includes('CoOp');
                            const isMlp = row.setting.includes('MLP');
                            const isMaxAcc = parseFloat(row.acc) === maxAccByModality[row.modality];
                            
                            let badgeColor = 'bg-slate-100 text-slate-600 border-slate-200 bg-opacity-50 border';
                            if (isMlp) badgeColor = 'bg-indigo-50 text-indigo-700 border-indigo-200 border';
                            else if (isCoOp) badgeColor = 'bg-amber-50 text-amber-700 border-amber-200 border';

                            let modColor = 'text-slate-500';
                            if (row.modality === 'Image') modColor = 'text-indigo-600';
                            if (row.modality === 'Text') modColor = 'text-cyan-600';
                            if (row.modality === 'Multimodal') modColor = 'text-emerald-600';

                            return (
                                <tr key={idx} className={`transition-colors ${isMaxAcc ? 'bg-amber-50' : 'hover:bg-slate-50'}`}>
                                    <td className="px-5 py-3 align-middle font-medium">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
                                            {row.setting}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 align-middle">
                                        <span className={`text-xs font-black uppercase tracking-wider ${modColor}`}>
                                            {row.modality}
                                        </span>
                                    </td>
                                    <td className={`px-5 py-3 align-middle text-right font-mono ${isMaxAcc ? 'text-amber-600 font-extrabold text-[15px]' : 'text-slate-600'}`}>
                                        {isMaxAcc && <Sparkles size={14} className="inline mr-1 text-amber-500 mb-0.5 animate-pulse" />}
                                        {row.acc}
                                    </td>
                                    <td className={`px-5 py-3 align-middle text-right font-mono ${isMaxAcc ? 'text-amber-700 font-bold' : 'text-slate-600'}`}>{row.f1m}</td>
                                    <td className={`px-5 py-3 align-middle text-right font-mono ${isMaxAcc ? 'text-amber-700 font-bold' : 'text-slate-600'}`}>{row.f1w}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="space-y-16">

            {/* ── Zero-shot Pipeline ─────────────────────────────────────────────── */}
            <SectionCard title="Zero-Shot CLIP Pipeline" icon={<Sparkles size={22} />}>
                <div className="text-slate-600 text-sm mb-10 max-w-3xl leading-relaxed space-y-2">
                    <p>The zero-shot pipeline uses a <b>pretrained CLIP model</b> with no additional training.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><b>Embed Images/Text:</b> Pass images and/or text through the frozen CLIP encoders. For multimodal, average and normalize them to form the sample embedding.</li>
                        <li><b>Construct Label Prompts:</b> Place each candidate class into hand-crafted prompt templates (e.g., "a photo of [class]") and encode them into label prototypes.</li>
                        <li><b>Cosine Similarity:</b> Compute similarity between the sample embedding and all label prototypes.</li>
                        <li><b>Prediction:</b> The class with the highest similarity score is chosen.</li>
                    </ul>
                </div>

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

            {/* ── Few-Shot Pipeline ─────────────────────────────────────────────── */}
            <SectionCard title="Few-Shot MLP Pipeline" icon={<BrainCircuit size={22} />}>
                <div className="text-slate-600 text-sm mb-10 max-w-3xl leading-relaxed space-y-2">
                    <p>The few-shot MLP pipeline uses CLIP as a <b>frozen feature extractor</b> and trains a lightweight classifier head on top.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><b>Few-Shot Sampling:</b> Reduce the original dataset to a few-shot subset by sampling at most K=100 examples per class.</li>
                        <li><b>Extract Features:</b> Pass samples through frozen CLIP encoders to get normalized 1D embedding vectors.</li>
                        <li><b>MLP Classifier:</b> Train a lightweight classification head (Linear → LayerNorm → ReLU → Dropout → Linear) for each modality stream independently.</li>
                        <li><b>Training & Inference:</b> Optimize the MLP weights using Cross-Entropy Loss (with label smoothing) on the few-shot subset. At inference, pick the class with the highest logit.</li>
                    </ul>
                </div>

                <div className="flex flex-col items-center gap-0">

                    {/* ── Step 1: Few-Shot Subset Sampling ─────────────────────── */}
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Step 1 — Few-Shot Sampling</p>
                    <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm w-full max-w-md mb-2">
                        <div className="p-3 bg-amber-100 text-amber-600 rounded-xl flex-shrink-0">
                            <Layers size={24} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-black text-slate-700">Labeled Training Set</h4>
                            <p className="text-xs text-slate-500 mt-1">Sample at most K=100 examples per class</p>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-center flex-shrink-0">
                            <span className="block text-[10px] font-bold uppercase text-amber-500">Output</span>
                            <span className="block text-xs font-black text-amber-700 whitespace-nowrap">Few-Shot Subset</span>
                        </div>
                    </div>

                    <VLine color="bg-slate-200" />

                    {/* ── Step 2: Frozen Feature Extractors ─────────────────────── */}
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 mt-1">Step 2 — Frozen CLIP Encoders</p>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Image-only */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-1">Image-only</span>
                            <ClipChip label="CLIP Image Encoder" sub="Frozen" frozen />
                            <VLine color="bg-slate-200" />
                            <EmbedChip label="Normalized Image Emb." values="[0.21, -0.34, …]" color="border-indigo-200 text-indigo-600 bg-indigo-50" />
                        </div>
                        {/* Text-only */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-widest text-cyan-500 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full mb-1">Text-only</span>
                            <ClipChip label="CLIP Text Encoder" sub="Frozen" frozen />
                            <VLine color="bg-slate-200" />
                            <EmbedChip label="Normalized Text Emb." values="[0.05, 0.67, …]" color="border-cyan-200 text-cyan-600 bg-cyan-50" />
                        </div>
                        {/* Multimodal */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-1">Image + Text</span>
                            <div className="flex gap-2 justify-center">
                                <ClipChip label="Image Enc." sub="Frozen" frozen />
                                <ClipChip label="Text Enc." sub="Frozen" frozen />
                            </div>
                            <VLine color="bg-slate-200" />
                            <div className="flex flex-col items-center gap-1 bg-emerald-50 border-2 border-emerald-300 rounded-2xl px-5 py-3 shadow-sm w-full">
                                <GitMerge size={16} className="text-emerald-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Concatenate</span>
                                <div className="font-mono text-[10px] px-2 py-1 rounded-lg bg-white border border-emerald-100 w-full text-center text-slate-500 mt-1">
                                    [ img_emb , txt_emb ]
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                        <div className="flex justify-center"><VLine color="bg-indigo-200" /></div>
                        <div className="flex justify-center"><VLine color="bg-cyan-200" /></div>
                        <div className="flex justify-center"><VLine color="bg-emerald-200" /></div>
                    </div>

                    {/* ── Step 3: MLP Classifiers ─────────────────────── */}
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Step 3 — Independent MLP Classifiers</p>

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center gap-2">
                            <MlpChip label="MLP Classifier" color="bg-indigo-600 border-indigo-700" glow="bg-indigo-400" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <MlpChip label="MLP Classifier" color="bg-cyan-600 border-cyan-700" glow="bg-cyan-400" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <MlpChip label="MLP Classifier" color="bg-emerald-600 border-emerald-700" glow="bg-emerald-400" />
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                        <div className="flex justify-center"><VLine color="bg-indigo-200" /></div>
                        <div className="flex justify-center"><VLine color="bg-cyan-200" /></div>
                        <div className="flex justify-center"><VLine color="bg-emerald-200" /></div>
                    </div>

                    {/* Step 4: Output Logits convergence */}
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Step 4 — Training & Inference</p>
                    <div className="hidden md:block w-2/3 h-5 border-t-2 border-l-2 border-r-2 border-slate-300 rounded-t-xl mb-0" />
                    <VLine color="bg-slate-300" />

                    <div className="flex flex-col items-center gap-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm w-full max-w-xl text-center">
                        <h4 className="text-[12px] font-black uppercase text-slate-800 tracking-wider">Class Logits Output</h4>
                        <div className="flex gap-2 flex-wrap justify-center my-1">
                            <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200">sports: 2.1</span>
                            <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200">wedding: 5.4</span>
                            <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200">dogs: -1.2</span>
                            <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200">...</span>
                        </div>
                        <div className="flex flex-col md:flex-row w-full items-stretch gap-4 justify-center text-xs mt-3 relative text-left">
                            <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-xl flex-1">
                                <span className="block font-black uppercase text-[10px] mb-2 tracking-widest text-blue-500">During Training</span>
                                MLP head learns to map features to labels using <b className="text-blue-800">cross-entropy loss</b> with <b className="text-blue-800">label smoothing</b>.
                            </div>
                            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl flex-1">
                                <span className="block font-black uppercase text-[10px] mb-2 tracking-widest text-rose-500">During Inference</span>
                                Sample class with the <b className="text-rose-800">highest logit</b> forms the final prediction.
                            </div>
                        </div>
                    </div>

                    <VLine color="bg-slate-300" />
                    <div className="flex gap-4 w-full max-w-xl mx-auto">
                        <div className="flex-1 bg-indigo-600 text-white rounded-2xl p-4 flex flex-col items-center gap-1 shadow-lg shadow-indigo-200">
                            <CheckCircle2 size={18} className="opacity-80 mb-1" />
                            <span className="text-[9px] font-black uppercase tracking-widest opacity-70">Few-Shot Prediction</span>
                            <span className="font-black text-lg tracking-tight">wedding</span>
                        </div>
                    </div>

                </div>
            </SectionCard>

            {/* ── Few-Shot CoOp Pipeline ─────────────────────────────────────────────── */}
            <SectionCard title="Few-Shot CoOp Pipeline" icon={<MessageSquare size={22} />}>
                <div className="text-slate-600 text-sm mb-10 max-w-3xl leading-relaxed space-y-2">
                    <p>The few-shot CoOp pipeline keeps CLIP frozen and adapts by learning <b>prompt context tokens</b> instead of training a classifier head.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><b>Few-Shot Sampling & Embedding:</b> Sample K=100 images per class and extract sample embeddings using the frozen CLIP encoders, exactly like zero-shot.</li>
                        <li><b>Learnable Prompts:</b> Replace handcrafted templates like "a photo of [class]" with trainable context vectors <code className="font-mono text-xs bg-slate-100 px-1 rounded text-slate-800">[V₁] [V₂] ... [class]</code>.</li>
                        <li><b>Encode & Compare:</b> Pass these learnable prompts through the frozen Text Encoder, yielding continuous label embeddings. Compare against the sample using Cosine Similarity.</li>
                        <li><b>Training & Inference:</b> Backpropagate Cross-Entropy loss to optimize <i>only</i> the context tokens. At inference, use the refined tokens to pick the highest similarity score.</li>
                    </ul>
                </div>

                <div className="flex flex-col items-center gap-0">
                    
                    {/* ── Step 1: Few-Shot Subset Sampling ─────────────────────── */}
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Step 1 — Few-Shot Sampling</p>
                    <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm w-full max-w-md mb-2">
                        <div className="p-3 bg-amber-100 text-amber-600 rounded-xl flex-shrink-0">
                            <Layers size={24} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-black text-slate-700">Labeled Training Set</h4>
                            <p className="text-xs text-slate-500 mt-1">Sample at most K=100 examples per class</p>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-center flex-shrink-0">
                            <span className="block text-[10px] font-bold uppercase text-amber-500">Output</span>
                            <span className="block text-xs font-black text-amber-700 whitespace-nowrap">Few-Shot Subset</span>
                        </div>
                    </div>
                
                    <VLine color="bg-slate-200" />
                    
                    {/* ── Step 2: Frozen Feature Extractors ─────────────────────── */}
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 mt-1">Step 2 — Frozen CLIP Encoders</p>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Image-only */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-1">Image-only</span>
                            <ClipChip label="CLIP Image Encoder" sub="Frozen" frozen />
                            <VLine color="bg-slate-200" />
                            <EmbedChip label="Normalized Image Emb." values="[0.21, -0.34, …]" color="border-indigo-200 text-indigo-600 bg-indigo-50" />
                        </div>
                        {/* Text-only */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-widest text-cyan-500 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full mb-1">Text-only</span>
                            <ClipChip label="CLIP Text Encoder" sub="Frozen" frozen />
                            <VLine color="bg-slate-200" />
                            <EmbedChip label="Normalized Text Emb." values="[0.05, 0.67, …]" color="border-cyan-200 text-cyan-600 bg-cyan-50" />
                        </div>
                        {/* Multimodal */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-1">Image + Text</span>
                            <div className="flex gap-2 justify-center">
                                <ClipChip label="Image Enc." sub="Frozen" frozen />
                                <ClipChip label="Text Enc." sub="Frozen" frozen />
                            </div>
                            <VLine color="bg-slate-200" />
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

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                        <div className="flex justify-center"><VLine color="bg-indigo-200" /></div>
                        <div className="flex justify-center"><VLine color="bg-cyan-200" /></div>
                        <div className="flex justify-center"><VLine color="bg-emerald-200" /></div>
                    </div>

                    {/* ── Step 3: Sample embedding (converge) ─────────────────────── */}
                    <div className="hidden md:block w-2/3 h-5 border-t-2 border-l-2 border-r-2 border-slate-300 rounded-t-xl mb-0" />
                    <VLine color="bg-slate-300" />
                    <div className="flex flex-col items-center gap-1 bg-slate-800 text-white px-8 py-4 rounded-2xl shadow-xl border border-slate-700">
                        <Layers size={20} className="text-slate-300" />
                        <span className="font-black text-sm tracking-wide">Sample Embedding</span>
                    </div>

                    {/* ── Big divider showing parallel stream ─────────────────────── */}
                    <div className="w-full my-8 border-t-2 border-dashed border-slate-200 relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                            In Parallel — Learnable Prompts
                        </span>
                    </div>

                    {/* ── Step 4: CoOp Learnable Prompts ─────────────────────────── */}
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Step 3 — Learnable Context Tokens</p>

                    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">

                        {/* CoOp Context Tokens */}
                        <div className="flex flex-col items-start gap-2 bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 shadow-sm relative">
                            <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm animate-pulse">Trainable parameters</div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 mb-1 flex items-center gap-1"><Type size={11} /> Context Tokens + Class Label</span>
                            {[
                                '[V₁] [V₂] ... [Vₘ] "sports"',
                                '[V₁] [V₂] ... [Vₘ] "wedding"',
                                '[V₁] [V₂] ... [Vₘ] "dogs"',
                            ].map(t => (
                                <span key={t} className="font-mono text-[11px] text-amber-800 bg-amber-100/50 border border-amber-200 px-2 py-0.5 rounded italic font-semibold">{t}</span>
                            ))}
                            <span className="text-[9px] text-amber-500 font-bold mt-1 max-w-[120px]">Vectors [V_i] are optimized via backprop →</span>
                        </div>

                        <HArrow color="text-amber-300" />

                        {/* CLIP text encoder for prompts */}
                        <div className="flex flex-col items-center gap-2">
                            <ClipChip label="CLIP Text Encoder" sub="Frozen" frozen />
                            <VLine color="bg-amber-200" />
                            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-4 py-2 shadow-sm text-center">
                                <span className="text-[9px] font-black uppercase tracking-widest text-amber-600">Encode Context</span>
                                <div className="font-mono text-[10px] text-slate-500 mt-1">→ 1 embedding / class</div>
                            </div>
                        </div>

                        <HArrow color="text-amber-300" />

                        {/* Label prototypes */}
                        <div className="flex flex-col items-start gap-2 bg-white border-2 border-amber-300 rounded-2xl p-4 shadow-sm">
                            <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 mb-1">Learnable Lbl Embeddings</span>
                            {[
                                { label: 'sports', v: '[0.51, -0.09, …]' },
                                { label: 'wedding', v: '[0.14,  0.81, …]' },
                                { label: 'dogs', v: '[-0.2,  0.28, …]' },
                            ].map(({ label, v }) => (
                                <div key={label} className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-amber-700 w-16">{label}</span>
                                    <span className="font-mono text-[10px] text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg">{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Step 5: Match & Optimize ────────────────────────────────── */}
                    <div className="w-full my-8 border-t-2 border-dashed border-slate-200 relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                            Comparison & Loss
                        </span>
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Step 4 — Training & Inference</p>

                    <div className="w-full max-w-xl flex flex-col items-center gap-0">
                        <div className="flex flex-col items-center gap-1 bg-rose-600 px-10 py-4 rounded-2xl shadow-xl shadow-rose-200 border border-rose-700 relative group cursor-default">
                            <div className="absolute -inset-1 bg-rose-400 opacity-25 rounded-2xl blur group-hover:opacity-40 transition-opacity" />
                            <Target size={24} className="text-white relative z-10" />
                            <span className="text-sm font-black text-white relative z-10 tracking-wide">Cosine Similarity</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-rose-200 relative z-10">sample_emb · learnable_lbl_emb</span>
                        </div>

                        <VLine color="bg-rose-200" />

                        {/* Split Training & Inference */}
                        <div className="flex flex-col md:flex-row w-full items-stretch gap-4 justify-center text-xs relative text-left">
                            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex-1 relative overflow-hidden shadow-sm">
                                <div className="absolute top-0 right-0 p-2 opacity-10"><Target size={40} /></div>
                                <span className="block font-black uppercase text-[10px] mb-2 tracking-widest text-amber-600 relative z-10">During Training</span>
                                <span className="relative z-10 block">
                                    Gradients flow back from <b>Cross-Entropy Loss</b>, through the frozen CLIP Text encoder, to optimize <i>only</i> the context tokens <code className="font-mono text-[10px] bg-amber-200/50 px-1 rounded">[V_i]</code>.
                                </span>
                            </div>
                            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl flex-1 shadow-sm">
                                <span className="block font-black uppercase text-[10px] mb-2 tracking-widest text-rose-500">During Inference</span>
                                Sample class with the <b className="text-rose-800">highest similarity score</b> against the learned prototypes forms the final prediction.
                            </div>
                        </div>

                        <VLine color="bg-rose-200" />

                        <div className="flex gap-4 w-full">
                            <div className="flex-1 bg-rose-600 text-white rounded-2xl p-4 flex flex-col items-center gap-1 shadow-lg shadow-rose-200">
                                <CheckCircle2 size={18} className="opacity-80 mb-1" />
                                <span className="text-[9px] font-black uppercase tracking-widest opacity-70">CoOp Prediction</span>
                                <span className="font-black text-lg tracking-tight">wedding</span>
                            </div>
                        </div>

                    </div>

                </div>
            </SectionCard>

            {/* ── Results Comparison Table ─────────────────────────────────────────────── */}
            <SectionCard title="Performance Comparison" icon={<Table2 size={22} />}>
                <div className="flex flex-col gap-6">
                    <p className="text-slate-500 text-sm leading-relaxed max-w-3xl">
                        Detailed classification metrics evaluated across all three pipelines using both the <b>K=100</b> and <b>K=20</b> few-shot sampling regimes.
                    </p>
                    
                    {/* Tabs */}
                    <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit border border-slate-200 shadow-inner">
                        <button 
                            onClick={() => setKSetting(100)}
                            className={`px-6 py-2 rounded-lg text-sm font-black transition-all ${kSetting === 100 ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                        >
                            K = 100 Samples
                        </button>
                        <button 
                            onClick={() => setKSetting(20)}
                            className={`px-6 py-2 rounded-lg text-sm font-black transition-all ${kSetting === 20 ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                        >
                            K = 20 Samples
                        </button>
                    </div>

                    {/* Active Table */}
                    <motion.div
                        key={kSetting}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {renderTable(kSetting === 100 ? K100_RESULTS : K20_RESULTS)}
                    </motion.div>
                </div>
            </SectionCard>

        </div>
    );
}
