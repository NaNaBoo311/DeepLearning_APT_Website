import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon, FileText, FileDigit, BrainCircuit, Network,
  Key, Layers, CheckCircle2, ChevronDown, ArrowRight, ArrowDown,
  Sparkles, Search, Tag, Minimize, BarChart3, AlertTriangle
} from 'lucide-react';
import hdbscanImg from '../../assets/assignment1/Multimodal_classification/hdbscan_clustering.png';

// ─── Cluster colours (used by scatter-plot demo) ────────────────────────────
const clusterColors = [
  'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500',
  'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-blue-500',
  'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500',
];

// ─── Deterministic PRNG scatter-plot generator ───────────────────────────────
const generateScatterPoints = () => {
  const seedPRNG = (seed) => () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const random = seedPRNG(42);
  const points = [];

  for (let i = 0; i < 13; i++) {
    const cx = 10 + random() * 80;
    const cy = 10 + random() * 80;
    const numPts = 25 + Math.floor(random() * 20);
    for (let j = 0; j < numPts; j++) {
      const offsetX = (random() + random() + random() - 1.5) * 6;
      const offsetY = (random() + random() + random() - 1.5) * 6;
      points.push({
        id: `c_${i}_${j}`,
        x: cx + offsetX,
        y: cy + offsetY,
        c: clusterColors[i],
        s: 0.3 + random() * 0.6,
        glow: random() > 0.8,
      });
    }
  }

  for (let i = 0; i < 150; i++) {
    points.push({
      id: `n_${i}`,
      x: random() * 100,
      y: random() * 100,
      c: 'bg-slate-400 opacity-40',
      s: 0.2 + random() * 0.4,
      glow: false,
      noise: true,
    });
  }
  return points;
};

const SCATTER_POINTS = generateScatterPoints();

// ─── KeyBERT results data ─────────────────────────────────────────────────────
const KEYBERT_RESULTS = [
  { id: 0, docs: 2790, words: ['playing instruments', 'playing music', 'performing', 'guitar man', 'musical', 'playing guitar', 'men playing', 'concert', 'guitar', 'instruments'] },
  { id: 1, docs: 2497, words: ['children playing', 'young boys', 'children', 'boy wearing', 'boy playing', 'boy blue', 'small boy', 'young boy', 'little boy', 'young child'] },
  { id: 2, docs: 2479, words: ['construction workers', 'men working', 'workers', 'men wearing', 'construction worker', 'building man', 'construction site', 'construction', 'building', 'man working'] },
  { id: 3, docs: 2265, words: ['dogs', 'grass', 'grassy field', 'yellow dog', 'walking dog', 'white dog', 'grassy', 'running grass', 'dog', 'black dog'] },
  { id: 4, docs: 1969, words: ['people riding', 'rides bike', 'person riding', 'man riding', 'riding bikes', 'riding bike', 'biker', 'rides bicycle', 'bike man', 'riding bicycle'] },
  { id: 5, docs: 1906, words: ['women walking', 'woman walking', 'people walking', 'street woman', 'people walk', 'walking street', 'walks street', 'walking city', 'woman wearing', 'walking sidewalk'] },
  { id: 6, docs: 1469, words: ['kitchen man', 'outdoor market', 'restaurant', 'people eating', 'preparing food', 'street vendor', 'grocery', 'food', 'kitchen', 'market man'] },
  { id: 7, docs: 1466, words: ['playing soccer', 'soccer', 'soccer ball', 'men playing', 'players', 'ball', 'sports', 'player', 'football', 'plays'] },
  { id: 8, docs: 1346, words: ['hiking', 'hiker', 'man climbing', 'man wearing', 'skating', 'climber', 'ski', 'snow', 'snow covered', 'skate'] },
  { id: 9, docs: 921, words: ['boat water', 'boat', 'boats', 'water men', 'small boat', 'water man', 'water people', 'water person', 'sailing', 'fishing'] },
  { id: 10, docs: 475, words: ['camera woman', 'picture woman', 'taking picture', 'takes picture', 'taking pictures', 'photograph', 'camera', 'posing picture', 'holding camera', 'woman taking'] },
  { id: 11, docs: 374, words: ['people beach', 'beach people', 'beach group', 'walking beach', 'sitting beach', 'walk beach', 'beach', 'standing beach', 'beach men', 'beach woman'] },
  { id: 12, docs: 342, words: ['people running', 'people run', 'runners', 'men running', 'marathon', 'race group', 'runner', 'racing', 'race', 'competing'] },
  { id: 13, docs: 158, words: ['wedding', 'bride', 'ceremony', 'bouquet', 'groom', 'dress holding', 'dresses', 'aisle', 'white dress', 'couple'] },
];

// ─── Shared UI sub-components ─────────────────────────────────────────────────
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

const PipelineStage = ({ step, title, desc, icon, isLast, color = 'indigo', expandableContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const colorMap = {
    indigo: { text: 'text-indigo-500', border: 'border-indigo-100', bgGlow: 'bg-indigo-50 group-hover:bg-indigo-100', line: 'bg-indigo-100', badge: 'text-indigo-500 bg-indigo-50', button: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' },
    emerald: { text: 'text-emerald-500', border: 'border-emerald-100', bgGlow: 'bg-emerald-50 group-hover:bg-emerald-100', line: 'bg-emerald-100', badge: 'text-emerald-500 bg-emerald-50', button: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100' },
  };
  const theme = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex relative group"
    >
      {!isLast && <div className={`absolute left-7 top-14 bottom-[-2rem] w-1 ${theme.line} z-0`} />}

      <div className={`z-10 bg-white rounded-full p-3 border-4 ${theme.border} w-14 h-14 flex-shrink-0 flex items-center justify-center shadow-md ${theme.text}`}>
        {icon}
      </div>

      <div className="ml-8 flex-1 pb-10">
        <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
          <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl -z-10 transition-colors duration-500 ${theme.bgGlow}`} />

          <div className="flex justify-between items-start mb-3">
            <span className={`text-[10px] font-black uppercase tracking-widest inline-block px-3 py-1 rounded-full ${theme.badge}`}>Stage {step}</span>
          </div>

          <h4 className="text-xl md:text-2xl font-black text-slate-800 mb-3 tracking-tight">{title}</h4>
          <p className="text-slate-600 leading-relaxed text-base font-medium">{desc}</p>

          <AnimatePresence>
            {isExpanded && expandableContent && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden pb-2"
              >
                {expandableContent}
              </motion.div>
            )}
          </AnimatePresence>

          {expandableContent && (
            <div className="mt-4 flex justify-center border-t border-slate-50 pt-3 relative z-20">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`p-1.5 rounded-full transition-colors ${theme.button}`}
              >
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                  <ChevronDown size={18} />
                </motion.div>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main exported component ──────────────────────────────────────────────────
export default function GeneratingLabel({ setSelectedImage }) {
  return (
    <div className="space-y-16">

      {/* Intro Card */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 -z-0" />
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-black mb-5 tracking-tighter cursor-default">Building the Dataset Labels</h2>
          <p className="text-indigo-200 text-lg md:text-xl leading-relaxed">
            Because Flickr30k does not provide predefined classification labels, we construct pseudo-labels through a
            hybrid pipeline that uses BERTopic, built on Sentence-Transformer embeddings with UMAP and HDBSCAN,
            together with zero-shot NLI. This process discovers latent semantic structure in the captions and maps it
            into 13 coarse category labels.
          </p>
        </div>
      </div>

      {/* ── Phase 1 ── */}
      <SectionCard title="Phase 1: Topic Discovery" icon={<Network size={22} />}>
        <div className="max-w-4xl mx-auto pt-6 pl-4 md:pl-8">

          {/* Stage 1 */}
          <PipelineStage
            step="1" title="Flickr30k Dataset"
            desc="The starting point is the Flickr30k dataset: 31,000 images, 5 captions each, with no labels."
            icon={<ImageIcon size={24} />} color="indigo"
          />

          {/* Stage 2 */}
          <PipelineStage
            step="2" title="Caption Aggregation"
            desc="The 5 captions per image are concatenated into 1 document, giving a single text representation per image."
            icon={<FileText size={24} />} color="indigo"
            expandableContent={
              <div className="bg-slate-50 p-5 rounded-2xl border border-indigo-100 text-base font-mono mt-4 space-y-4">
                <div>
                  <p className="text-indigo-800 font-bold mb-2 uppercase tracking-wider text-xs">Original 5 Captions:</p>
                  <ul className="list-disc list-outside ml-4 text-slate-600 space-y-1.5 text-sm">
                    <li>A young man in swim shorts is jumping over a wave in the ocean.</li>
                    <li>A man in swimming trunks plays in the ocean 's waves .</li>
                    <li>a surfer falling of his board into a wave.</li>
                    <li>A man falling over in an ocean wave.</li>
                    <li>A man is falling into waves .</li>
                  </ul>
                </div>
                <div>
                  <p className="text-indigo-800 font-bold mb-2 uppercase tracking-wider text-xs">Concatenated Document Vector:</p>
                  <p className="text-indigo-900 bg-white p-4 rounded-xl border border-indigo-200 leading-relaxed text-sm shadow-sm shadow-indigo-100/50">
                    A young man in swim shorts is jumping over a wave in the ocean. A man in swimming trunks plays in
                    the ocean 's waves . a surfer falling of his board into a wave. A man falling over in an ocean wave.
                    A man is falling into waves .
                  </p>
                </div>
              </div>
            }
          />

          {/* Stage 3 */}
          <PipelineStage
            step="3" title="Sentence Embeddings"
            desc="Each document is encoded using the all-MiniLM-L6-v2 SentenceTransformer model, producing 384-dim vectors that capture semantic meaning."
            icon={<FileDigit size={24} />} color="indigo"
            expandableContent={
              <div className="bg-slate-50 py-8 px-6 rounded-2xl border border-indigo-100 flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
                <div className="flex flex-col items-center gap-3 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 min-w-[120px]">
                  <div className="bg-indigo-100 p-4 rounded-full text-indigo-500"><FileText size={28} /></div>
                  <span className="text-sm font-black text-slate-700">Document</span>
                </div>

                <ArrowRight className="text-indigo-300 hidden md:block" size={32} />
                <div className="h-8 w-1 bg-indigo-200 md:hidden rounded-full" />

                <div className="flex flex-col items-center gap-2 bg-indigo-600 px-6 py-5 rounded-2xl shadow-xl shadow-indigo-200 border border-indigo-700 relative group cursor-default">
                  <div className="absolute -inset-1 bg-indigo-400 opacity-40 rounded-2xl blur group-hover:opacity-60 transition-opacity" />
                  <BrainCircuit size={32} className="text-white relative z-10 mb-1" />
                  <span className="text-base font-black text-white relative z-10">all-MiniLM-L6-v2</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 relative z-10">SentenceTransformer</span>
                </div>

                <ArrowRight className="text-emerald-300 hidden md:block" size={32} />
                <div className="h-8 w-1 bg-emerald-200 md:hidden rounded-full" />

                <div className="flex flex-col items-center gap-3 bg-white p-5 rounded-2xl shadow-sm border border-emerald-200 min-w-[120px]">
                  <div className="bg-emerald-50 text-emerald-600 font-mono text-xs w-full text-center px-3 py-4 rounded-xl border border-emerald-100 uppercase font-bold tracking-widest whitespace-nowrap">
                    [ 0.12, -0.45, ... ]
                  </div>
                  <span className="text-sm font-black text-emerald-700">384-dim Vector</span>
                </div>
              </div>
            }
          />

          {/* Stage 4 */}
          <PipelineStage
            step="4" title="UMAP Dimensionality Reduction"
            desc="The 384-dim vectors are reduced to 5-dim using UMAP with a cosine metric, making the data more suitable for clustering."
            icon={<Minimize size={24} />} color="indigo"
            expandableContent={
              <div className="bg-slate-50 py-8 px-6 rounded-2xl border border-indigo-100 flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
                <div className="flex flex-col items-center gap-3 bg-white p-5 rounded-2xl shadow-sm border border-emerald-200 min-w-[120px]">
                  <div className="bg-emerald-50 text-emerald-600 font-mono text-xs w-full text-center px-3 py-4 rounded-xl border border-emerald-100 uppercase font-bold tracking-widest whitespace-nowrap opacity-75">
                    [ 0.12, -0.45, ... ]
                  </div>
                  <span className="text-sm font-black text-emerald-700">384-dim Vector</span>
                </div>

                <ArrowRight className="text-emerald-300 hidden md:block" size={32} />
                <div className="h-8 w-1 bg-emerald-200 md:hidden rounded-full" />

                <div className="flex flex-col items-center gap-2 bg-pink-600 px-8 py-5 rounded-2xl shadow-xl shadow-pink-200 border border-pink-700 relative group cursor-default">
                  <div className="absolute -inset-1 bg-pink-400 opacity-40 rounded-2xl blur group-hover:opacity-60 transition-opacity" />
                  <Minimize size={32} className="text-white relative z-10 mb-1" />
                  <span className="text-base font-black text-white relative z-10 tracking-widest">UMAP</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-pink-200 relative z-10">Cosine Metric</span>
                </div>

                <ArrowRight className="text-cyan-300 hidden md:block" size={32} />
                <div className="h-8 w-1 bg-cyan-200 md:hidden rounded-full" />

                <div className="flex flex-col items-center gap-3 bg-white p-5 rounded-2xl shadow-sm border border-cyan-200 min-w-[120px]">
                  <div className="bg-cyan-50 text-cyan-600 font-mono text-xs w-full text-center px-3 py-4 rounded-xl border border-cyan-100 uppercase font-bold tracking-widest whitespace-nowrap">
                    [ 0.81, -0.22, 0.44, 0.05, -0.91 ]
                  </div>
                  <span className="text-sm font-black text-cyan-700">5-dim Vector</span>
                </div>
              </div>
            }
          />

          {/* Stage 5 */}
          <PipelineStage
            step="5" title="HDBSCAN Clustering"
            desc="HDBSCAN is applied to the 5-dim embeddings with min_cluster_size=150. This density-based algorithm automatically discovers clusters without requiring a predefined number of groups."
            icon={<Network size={24} />} color="indigo" isLast={true}
            expandableContent={
              <div className="bg-slate-50 p-4 md:p-6 rounded-2xl border border-indigo-100 mt-4 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  {/* Input */}
                  <div className="flex flex-col items-center gap-3 bg-white p-5 rounded-2xl shadow-sm border border-cyan-200 min-w-[140px]">
                    <div className="flex flex-col gap-1 w-full">
                      {['Img 1', 'Img 2', 'Img 3'].map((lbl, idx) => (
                        <div key={lbl} className="bg-cyan-50 text-cyan-600 font-mono text-[10px] sm:text-xs text-center px-2 py-2 rounded-lg border border-cyan-100 uppercase tracking-widest whitespace-nowrap" style={{ opacity: 1 - idx * 0.2 }}>
                          [... 5-dim] ({lbl})
                        </div>
                      ))}
                      <div className="text-center text-cyan-300 font-black leading-3 mt-1">...</div>
                    </div>
                    <span className="text-sm font-black text-cyan-700 text-center leading-tight mt-1">List of 31k<br />5-dim Vectors</span>
                  </div>

                  <ArrowRight className="text-cyan-300 hidden md:block" size={32} />
                  <div className="h-8 w-1 bg-cyan-200 md:hidden rounded-full" />

                  {/* HDBSCAN */}
                  <div className="flex flex-col items-center gap-2 bg-violet-600 px-8 py-5 rounded-2xl shadow-xl shadow-violet-200 border border-violet-700 relative group cursor-default">
                    <div className="absolute -inset-1 bg-violet-400 opacity-40 rounded-2xl blur group-hover:opacity-60 transition-opacity" />
                    <Network size={32} className="text-white relative z-10 mb-1" />
                    <span className="text-base font-black text-white relative z-10 tracking-widest">HDBSCAN</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-violet-200 relative z-10">Density Clustering</span>
                  </div>

                  <ArrowRight className="text-violet-300 hidden md:block" size={32} />
                  <div className="h-8 w-1 bg-violet-200 md:hidden rounded-full" />

                  {/* Output */}
                  <div className="flex flex-col items-center gap-3 bg-white p-5 rounded-2xl shadow-sm border border-purple-200 min-w-[140px]">
                    <div className="flex flex-col gap-1 w-full">
                      <div className="bg-purple-50 text-purple-600 font-black text-[10px] sm:text-xs text-center px-2 py-2 rounded-lg border border-purple-100 uppercase tracking-widest whitespace-nowrap shadow-sm">Topic 2</div>
                      <div className="bg-rose-50   text-rose-600   font-black text-[10px] sm:text-xs text-center px-2 py-2 rounded-lg border border-rose-100   uppercase tracking-widest whitespace-nowrap shadow-sm opacity-80">Topic -1 (Outlier)</div>
                      <div className="bg-purple-50 text-purple-600 font-black text-[10px] sm:text-xs text-center px-2 py-2 rounded-lg border border-purple-100 uppercase tracking-widest whitespace-nowrap shadow-sm opacity-60">Topic 4</div>
                      <div className="text-center text-purple-300 font-black leading-3 mt-1">...</div>
                    </div>
                    <span className="text-sm font-black text-purple-700 text-center leading-tight mt-1">Discrete<br />Cluster IDs</span>
                  </div>
                </div>

                {/* Actual clustering image */}
                <div className="w-full flex flex-col items-center justify-center bg-white border border-slate-200 p-3 md:p-4 rounded-2xl shadow-sm">
                  <h5 className="text-xs font-black uppercase text-slate-800 tracking-widest mb-4 flex items-center justify-center gap-2">
                    <Network size={14} className="text-violet-500" /> Exact Algorithm Clustering Output
                  </h5>
                  <img
                    src={hdbscanImg}
                    alt="HDBSCAN Clustering Final Result"
                    className="w-full max-w-5xl h-auto rounded-xl shadow-inner border border-slate-100 cursor-pointer hover:opacity-95 transition-opacity"
                    onClick={() => setSelectedImage(hdbscanImg)}
                  />
                </div>
              </div>
            }
          />
        </div>
      </SectionCard>

      {/* ── Phase 2 ── */}
      <SectionCard title="Phase 2: Label Assignment via NLI" icon={<Tag size={22} />}>
        <div className="max-w-4xl mx-auto pt-6 pl-4 md:pl-8">

          {/* Stage 6 – BERTopic + KeyBERT */}
          <PipelineStage
            step="6" title="BERTopic + KeyBERT"
            desc="BERTopic with KeyBERT is run on the clusters to extract topic words, discovering ~14 semantic topics with representative keywords per cluster."
            icon={<Key size={24} />} color="emerald"
            expandableContent={
              <div className="bg-slate-50 p-6 md:p-10 rounded-2xl border border-emerald-100 flex flex-col items-center mt-4 relative">

                {/* 1. Cluster Documents */}
                <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200 min-w-[200px] justify-center">
                  <div className="bg-emerald-100 p-2.5 rounded-full text-emerald-600"><Layers size={20} /></div>
                  <span className="font-bold text-slate-700 text-sm">Cluster Documents</span>
                </div>

                <ArrowDown className="text-emerald-300 my-2" size={24} />

                {/* 2. c-TF-IDF Branching */}
                <div className="w-full max-w-2xl grid grid-cols-2 gap-4 md:gap-10 text-center relative z-0 mt-5">
                  <div className="absolute top-0 left-[25%] right-[25%] h-6 border-t-2 border-l-2 border-r-2 border-slate-300 rounded-t-xl -mt-6 z-0" />

                  {/* Path A: Merged Cluster c-TF-IDF */}
                  <div className="flex flex-col items-center relative z-10 w-full">
                    <div className="bg-emerald-600 w-[95%] px-3 py-4 rounded-2xl shadow-md border border-emerald-700 flex flex-col justify-center items-center relative group min-h-[90px]">
                      <div className="absolute -inset-1 bg-emerald-400 opacity-40 rounded-2xl blur group-hover:opacity-60 transition-opacity" />
                      <BarChart3 size={20} className="text-white relative z-10 mb-2" />
                      <span className="font-black text-white text-[10px] md:text-[11px] tracking-widest relative z-10 leading-tight uppercase">Cluster Documents<br />TF-IDF</span>
                    </div>
                    <ArrowDown className="text-emerald-300 my-4" size={20} />
                    <div className="bg-white w-[95%] py-4 px-2 rounded-2xl shadow-sm border border-indigo-200 flex flex-col justify-center items-center min-h-[120px]">
                      <Tag size={24} className="text-indigo-500 mb-2" />
                      <span className="text-xs md:text-sm font-bold text-slate-700 leading-tight">Top Candidate<br />Words</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-end w-full min-h-[40px] mt-2 mb-2">
                      <div className="h-full w-0.5 bg-slate-200 flex-1 border-l-2 border-dashed border-slate-300" />
                      <ArrowDown className="text-slate-400 -mt-2" size={24} />
                    </div>
                  </div>

                  {/* Path B: Individual Docs c-TF-IDF */}
                  <div className="flex flex-col items-center relative z-10 w-full">
                    <div className="bg-teal-600 w-[95%] px-3 py-4 rounded-2xl shadow-md border border-teal-700 flex flex-col justify-center items-center relative group min-h-[90px]">
                      <div className="absolute -inset-1 bg-teal-400 opacity-40 rounded-2xl blur group-hover:opacity-60 transition-opacity" />
                      <FileDigit size={20} className="text-white relative z-10 mb-2" />
                      <span className="font-black text-white text-[10px] md:text-[11px] tracking-widest relative z-10 leading-tight uppercase">Individual Docs<br />TF-IDF</span>
                    </div>
                    <div className="h-3 border-l-2 border-slate-300 my-0.5" />
                    <div className="bg-white w-[85%] py-2 px-2 rounded-lg shadow-sm border border-slate-300 border-dashed flex flex-col justify-center items-center relative my-1 z-20">
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight text-center">Compare w/<br />Cluster Topic</span>
                    </div>
                    <div className="h-3 border-l-2 border-slate-300 my-0.5" />
                    <ArrowDown className="text-slate-300 -mt-2 -mb-2" size={20} />
                    <div className="bg-white w-[95%] py-4 px-2 rounded-2xl shadow-sm border border-blue-200 flex flex-col justify-center items-center min-h-[120px] mt-2">
                      <FileText size={24} className="text-blue-500 mb-2" />
                      <span className="text-xs md:text-sm font-bold text-slate-700 leading-tight">Representative<br />Documents</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-end w-full mt-2 mb-2">
                      <ArrowDown className="text-slate-400" size={24} />
                    </div>
                  </div>
                </div>

                {/* 3. Encoder */}
                <div className="w-full max-w-xl flex justify-center pb-2 relative z-10">
                  <div className="flex flex-col items-center gap-1 bg-indigo-600 px-10 py-5 rounded-2xl shadow-xl shadow-indigo-200 border border-indigo-700 relative group cursor-default w-full sm:w-auto">
                    <div className="absolute -inset-1 bg-indigo-400 opacity-40 rounded-2xl blur group-hover:opacity-60 transition-opacity" />
                    <BrainCircuit size={32} className="text-white relative z-10 mb-1" />
                    <span className="text-base md:text-lg font-black text-white relative z-10 tracking-widest">all-MiniLM-L6-v2</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 relative z-10">SentenceTransformer</span>
                  </div>
                </div>

                {/* 4. Embeddings / Aggregation */}
                <div className="w-full max-w-xl grid grid-cols-2 gap-4 md:gap-8 text-center relative z-0">
                  <div className="absolute top-0 left-[25%] right-[25%] h-5 border-b-2 border-l-2 border-r-2 border-slate-300 rounded-b-xl z-0" />

                  {/* Word Embeddings path */}
                  <div className="flex flex-col justify-start items-center relative z-10 mt-3 w-full h-full">
                    <ArrowDown className="text-slate-400 mb-2" size={20} />
                    <div className="bg-slate-100 border border-slate-200 shadow-inner px-4 py-3 rounded-xl w-[90%] md:w-auto">
                      <span className="text-[10px] md:text-[11px] uppercase font-black tracking-widest text-slate-500 leading-tight">Word<br />Embeddings</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-end w-full min-h-[40px] mt-2 mb-2">
                      <div className="h-full w-0.5 bg-slate-200 flex-1 border-l-2 border-dashed border-slate-300" />
                      <ArrowDown className="text-emerald-300 -mt-2" size={24} />
                    </div>
                  </div>

                  {/* Document Embeddings + Aggregation path */}
                  <div className="flex flex-col justify-start items-center relative z-10 mt-3 w-full h-full">
                    <ArrowDown className="text-slate-400 mb-2" size={20} />
                    <div className="bg-slate-100 border border-slate-200 shadow-inner px-4 py-3 rounded-xl w-[90%] md:w-auto mb-1">
                      <span className="text-[10px] md:text-[11px] uppercase font-black tracking-widest text-slate-500 leading-tight">Document<br />Embeddings</span>
                    </div>
                    <div className="h-4 w-0.5 bg-slate-200 border-l-2 border-slate-300 my-0.5" />
                    <div className="bg-white w-[85%] py-2 px-2 rounded-lg shadow-sm border border-slate-300 border-dashed flex flex-col justify-center items-center relative my-1 z-20">
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight text-center">Aggregate Docs<br />(Average)</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-end w-full min-h-[40px] mt-0.5 mb-2">
                      <div className="h-full w-0.5 bg-slate-200 flex-1 border-l-2 border-slate-300" />
                      <ArrowDown className="text-emerald-300 -mt-2" size={24} />
                    </div>
                  </div>
                </div>

                {/* 5. Cosine Similarity */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="bg-white px-6 py-5 rounded-2xl shadow-md border-2 border-emerald-300 flex items-center justify-center gap-4 min-w-[250px] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-emerald-500" />
                    <Search size={28} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span className="font-black text-slate-800 text-sm md:text-base tracking-widest uppercase">Cosine Similarity</span>
                  </div>
                </div>

                <ArrowDown className="text-emerald-400 my-4" size={24} />

                {/* 6. Final Keywords Table */}
                <div className="w-full max-w-4xl bg-gradient-to-r from-emerald-50 to-teal-50 px-6 md:px-8 py-6 rounded-2xl shadow-inner shadow-emerald-100/50 border border-emerald-200 flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-emerald-600 mb-4">
                    <Sparkles size={20} />
                    <span className="font-black text-sm uppercase tracking-widest">Detailed Top Keywords Per Topic</span>
                    <Sparkles size={20} />
                  </div>
                  <div className="w-full bg-slate-900 rounded-xl p-4 md:p-6 shadow-xl border border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                      <div className="min-w-[700px]">
                        {KEYBERT_RESULTS.map((row) => (
                          <div key={row.id} className="flex flex-row items-center font-mono text-xs md:text-sm py-1.5 hover:bg-slate-800/50 rounded transition duration-200 px-2">
                            <div className="flex text-emerald-400 font-bold shrink-0 items-center justify-start w-20">
                              <span className="text-slate-500 mr-2">Topic</span>
                              {String(row.id).padStart(2, ' ')}
                            </div>
                            <div className="text-slate-400 shrink-0 w-[100px] ml-2 flex items-center">
                              [<span className="text-teal-300 mx-1.5">{String(row.docs).padStart(4, ' ')}</span> docs]
                            </div>
                            <div className="text-slate-500 shrink-0 w-8 flex items-center justify-center">→</div>
                            <div className="text-slate-300 ml-2 flex flex-wrap gap-x-0.5 items-center truncate">
                              <span className="text-slate-500">{'['}</span>
                              {row.words.map((w, i) => (
                                <span key={w}>
                                  <span className="text-amber-200 hover:text-amber-300 cursor-default transition-colors whitespace-nowrap">'{w}'</span>
                                  {i < row.words.length - 1 && <span className="text-slate-500 mr-1.5">,</span>}
                                </span>
                              ))}
                              <span className="text-slate-500">{']'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            }
          />

          {/* Stage 7 */}
          <PipelineStage
            step="7" title="Manual Taxonomy Mapping"
            desc="Each discovered topic is manually mapped to a human-readable label — e.g. T7 → sports, T13 → wedding."
            icon={<Tag size={24} />} color="emerald"
            expandableContent={
              <div className="bg-slate-50 p-5 md:p-8 rounded-2xl border border-emerald-100 mt-4">
                <h5 className="text-xs font-black uppercase text-slate-700 tracking-widest mb-6 flex items-center gap-2">
                  <Tag size={13} className="text-emerald-500" /> Label Distribution After BERTopic Mapping
                </h5>
                <div className="space-y-3">
                  {LABEL_DISTRIBUTION.map((item, idx) => {
                    const pct = (item.count / 11326) * 100;
                    return (
                      <div key={item.label} className="flex items-center gap-3 text-xs group">
                        <div className="w-36 md:w-44 text-right shrink-0 font-mono font-bold text-slate-600 group-hover:text-emerald-700 transition-colors truncate">
                          {item.label}
                        </div>
                        <div className="flex-1 bg-slate-200 h-7 rounded-r-xl relative flex items-center overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.04 }}
                            className={`h-full rounded-r-xl ${item.color} flex items-center justify-end pr-2 shrink-0`}
                            style={{ minWidth: '3.8rem' }}
                          >
                            <span className="text-white font-black text-[11px] font-mono whitespace-nowrap drop-shadow">
                              {item.count.toLocaleString()}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-400 mt-6 font-medium italic">
                  * "other" covers BERTopic outliers (topic -1) not confidently assigned — these are later processed by NLI fallback.
                </p>
              </div>
            }
          />

          {/* Stage 8 */}
          <PipelineStage
            step="8" title="Zero-shot NLI (BART-MNLI)"
            desc="For images not confidently assigned by BERTopic (outliers), facebook/bart-large-mnli is used to classify captions against the label taxonomy via zero-shot NLI, producing confidence scores."
            icon={<BrainCircuit size={24} />} color="emerald"
            expandableContent={
              <div className="bg-slate-50 p-5 md:p-8 rounded-2xl border border-emerald-100 mt-4 flex flex-col items-center gap-0">

                {/* ── Row 1: Image + Caption → Premise ── */}
                <div className="w-full flex flex-col md:flex-row items-stretch gap-4 justify-center">

                  {/* Image placeholder */}
                  <div className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm min-w-[130px] gap-2">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                      <ImageIcon size={28} className="text-slate-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Outlier Image</span>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <ArrowRight className="text-slate-300 hidden md:block" size={26} />
                    <ArrowDown className="text-slate-300 md:hidden" size={26} />
                  </div>

                  {/* Caption Premise box */}
                  <div className="flex-1 flex flex-col justify-center bg-white border-2 border-indigo-200 rounded-2xl p-4 shadow-sm gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1">Premise — 1st Caption</span>
                    <p className="font-mono text-xs text-slate-700 italic leading-relaxed">
                      "A bride in a white dress stands beside a groom during a ceremony."
                    </p>
                    <span className="text-[9px] text-slate-400 font-medium mt-1">
                      ↳ Only the <b>first caption</b> is used — shorter and cleaner than full concatenation.
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <ArrowRight className="text-slate-300 hidden md:block" size={26} />
                    <ArrowDown className="text-slate-300 md:hidden" size={26} />
                  </div>

                  {/* Hypothesis Templates */}
                  <div className="flex flex-col justify-center bg-white border-2 border-emerald-200 rounded-2xl p-4 shadow-sm gap-2 min-w-[200px]">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-1">Hypotheses (per label)</span>
                    {[
                      { label: 'wedding', highlight: true },
                      { label: 'sports', highlight: false },
                      { label: 'dogs', highlight: false },
                      { label: '…', highlight: false },
                    ].map(({ label, highlight }) => (
                      <div key={label} className={`font-mono text-[10px] px-2 py-1 rounded-lg border ${highlight ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                        "This image shows <span className="font-black">{label}</span>."
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Connector down to model ── */}
                <div className="h-6 w-0.5 bg-slate-300 my-1" />

                {/* ── Row 2: BART-MNLI model ── */}
                <div className="flex flex-col items-center gap-2 bg-emerald-700 px-10 py-5 rounded-2xl shadow-xl shadow-emerald-200 border border-emerald-800 relative group cursor-default">
                  <div className="absolute -inset-1 bg-emerald-400 opacity-30 rounded-2xl blur group-hover:opacity-50 transition-opacity" />
                  <BrainCircuit size={32} className="text-white relative z-10 mb-1" />
                  <span className="text-base font-black text-white relative z-10 tracking-widest">facebook/bart-large-mnli</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-200 relative z-10">Zero-shot NLI — premise × hypothesis</span>
                </div>

                {/* ── Connector down to scores ── */}
                <div className="h-6 w-0.5 bg-slate-300 my-1" />

                {/* ── Row 3: NLI Score table ── */}
                <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-1.5">
                    <Search size={11} className="text-emerald-500" /> Entailment Score Per Hypothesis
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: 'wedding', score: 0.94, winner: true },
                      { label: 'taking_pictures', score: 0.23, winner: false },
                      { label: 'street_walking', score: 0.08, winner: false },
                      { label: 'sports', score: 0.05, winner: false },
                      { label: 'dogs', score: 0.03, winner: false },
                    ].map(({ label, score, winner }, i) => (
                      <div key={label} className={`flex items-center gap-3 rounded-xl px-3 py-1.5 ${winner ? 'bg-emerald-50 border border-emerald-200' : ''}`}>
                        <span className={`font-mono text-xs w-36 shrink-0 ${winner ? 'text-emerald-700 font-black' : 'text-slate-500 font-medium'}`}>{label}</span>
                        <div className="flex-1 bg-slate-100 h-4 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${score * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
                            className={`h-full rounded-full ${winner ? 'bg-emerald-500' : 'bg-slate-300'}`}
                          />
                        </div>
                        <span className={`font-mono text-xs font-black w-10 text-right ${winner ? 'text-emerald-600' : 'text-slate-400'}`}>{score.toFixed(2)}</span>
                        {winner && <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Connector down ── */}
                <div className="h-6 w-0.5 bg-slate-300 my-1" />

                {/* ── Row 4: Output ── */}
                <div className="flex gap-4 w-full max-w-lg">
                  <div className="flex-1 bg-emerald-600 text-white rounded-2xl p-4 flex flex-col items-center gap-1 shadow-lg shadow-emerald-200">
                    <Tag size={18} className="opacity-80 mb-1" />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-70">Predicted Label</span>
                    <span className="font-black text-lg tracking-tight">wedding</span>
                  </div>
                  <div className="flex-1 bg-white border-2 border-emerald-300 rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm">
                    <Sparkles size={18} className="text-emerald-500 mb-1" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Confidence</span>
                    <span className="font-black text-lg text-emerald-600 tracking-tight">0.94</span>
                  </div>
                </div>

              </div>
            }
          />

          {/* Stage 9 */}
          <PipelineStage
            step="9" title="Label Fusion"
            desc="A BERTopic-first strategy is applied: use the BERTopic label if confident, otherwise fall back to the NLI label for outliers."
            icon={<Layers size={24} />} color="emerald"
            expandableContent={
              <div className="bg-slate-50 p-5 md:p-8 rounded-2xl border border-emerald-100 mt-4 flex flex-col items-center gap-0">

                {/* ── Row 1: Two inputs ── */}
                <div className="w-full flex flex-col md:flex-row gap-4 justify-center">
                  {/* BERTopic source */}
                  <div className="flex-1 flex flex-col items-center bg-white border-2 border-violet-200 rounded-2xl p-4 shadow-sm gap-2">
                    <Network size={20} className="text-violet-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-violet-500">Source A</span>
                    <span className="font-black text-sm text-slate-700">BERTopic Label</span>
                    <div className="flex gap-2 mt-1 flex-wrap justify-center">
                      <span className="bg-violet-100 text-violet-700 text-[10px] font-black px-2 py-0.5 rounded-full">sports</span>
                      <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded-full italic">other</span>
                    </div>
                  </div>

                  {/* NLI source */}
                  <div className="flex-1 flex flex-col items-center bg-white border-2 border-emerald-200 rounded-2xl p-4 shadow-sm gap-2">
                    <BrainCircuit size={20} className="text-emerald-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Source B</span>
                    <span className="font-black text-sm text-slate-700">NLI Label + Score</span>
                    <div className="flex gap-2 mt-1 flex-wrap justify-center">
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full">wedding 0.94</span>
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-full">dogs 0.31</span>
                    </div>
                  </div>
                </div>

                <div className="h-6 w-0.5 bg-slate-300 my-1" />

                {/* ── Decision box ── */}
                <div className="flex flex-col items-center gap-1 bg-indigo-600 px-8 py-4 rounded-2xl shadow-xl shadow-indigo-200 border border-indigo-700 relative group cursor-default">
                  <div className="absolute -inset-1 bg-indigo-400 opacity-30 rounded-2xl blur group-hover:opacity-50 transition-opacity" />
                  <Layers size={24} className="text-white relative z-10" />
                  <span className="text-sm font-black text-white relative z-10 tracking-widest">bertopic_first Strategy</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-200 relative z-10">Is BERTopic label = "other"?</span>
                </div>

                {/* ── Three branch paths ── */}
                <div className="w-full mt-1 grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                  {/* Top connector bar */}
                  <div className="hidden md:block absolute top-0 left-[16.5%] right-[16.5%] h-5 border-b-2 border-l-2 border-r-2 border-slate-300 rounded-b-xl z-0" />

                  {/* Path A: BERTopic normal label */}
                  <div className="flex flex-col items-center gap-2 mt-5 relative z-10">
                    <div className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-slate-500">
                      NO — label ≠ "other"
                    </div>
                    <ArrowDown className="text-violet-300" size={18} />
                    <div className="w-full bg-violet-50 border-2 border-violet-300 rounded-2xl p-3 flex flex-col items-center gap-1">
                      <CheckCircle2 size={16} className="text-violet-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-violet-600">Keep BERTopic</span>
                      <span className="text-xs font-bold text-slate-700 text-center">Use BERTopic label as final label</span>
                      <span className="bg-violet-100 text-violet-700 text-[10px] font-black px-2 py-0.5 rounded-full mt-1">sports ✓</span>
                    </div>
                  </div>

                  {/* Path B: other + high NLI confidence */}
                  <div className="flex flex-col items-center gap-2 mt-5 relative z-10">
                    <div className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-slate-500">
                      YES + conf ≥ threshold
                    </div>
                    <ArrowDown className="text-emerald-300" size={18} />
                    <div className="w-full bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3 flex flex-col items-center gap-1">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Use NLI Label</span>
                      <span className="text-xs font-bold text-slate-700 text-center">Replace "other" with top NLI prediction</span>
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full mt-1">wedding ✓</span>
                    </div>
                  </div>

                  {/* Path C: other + low NLI confidence */}
                  <div className="flex flex-col items-center gap-2 mt-5 relative z-10">
                    <div className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-slate-500">
                      YES + conf &lt; threshold
                    </div>
                    <ArrowDown className="text-amber-300" size={18} />
                    <div className="w-full bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 flex flex-col items-center gap-1">
                      <AlertTriangle size={16} className="text-amber-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-amber-600">Flag Uncertain</span>
                      <span className="text-xs font-bold text-slate-700 text-center">Use NLI label but mark as low-confidence</span>
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-full mt-1">dogs ⚠ uncertain</span>
                    </div>
                  </div>
                </div>

                <div className="h-6 w-0.5 bg-slate-300 mt-6 mb-1" />

                {/* ── Output ── */}
                <div className="w-full max-w-lg flex gap-4">
                  <div className="flex-1 bg-indigo-600 text-white rounded-2xl p-4 flex flex-col items-center gap-1 shadow-lg shadow-indigo-200">
                    <Tag size={16} className="opacity-80 mb-1" />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-70">Output</span>
                    <span className="font-black text-sm tracking-tight">Final Label (every image)</span>
                  </div>
                  <div className="flex-1 bg-white border-2 border-amber-300 rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm">
                    <AlertTriangle size={16} className="text-amber-500 mb-1" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Output</span>
                    <span className="font-black text-sm text-amber-600 tracking-tight">Uncertainty Flag</span>
                  </div>
                </div>

              </div>
            }
          />

          <PipelineStage
            step="10" title="Final Labeled Dataset"
            desc="The output is a fully labeled dataset with 13 classes — sports, beach, dogs, wedding, and more — saved as flickr30k_labeled.csv."
            icon={<CheckCircle2 size={24} />} color="emerald" isLast={true}
            expandableContent={
              <div className="bg-slate-50 p-5 md:p-8 rounded-2xl border border-emerald-100 mt-4">

                <h5 className="text-xs font-black uppercase text-slate-700 tracking-widest mb-6 flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-500" /> Final Label Distribution (after fusion)
                </h5>

                {/* Bar chart */}
                <div className="space-y-3 mb-8">
                  {FINAL_LABEL_DISTRIBUTION.map((item, idx) => {
                    const pct = (item.count / 5816) * 100;
                    return (
                      <div key={item.label} className="flex items-center gap-3 text-xs group">
                        <div className="w-36 md:w-44 text-right shrink-0 font-mono font-bold text-slate-600 group-hover:text-emerald-700 transition-colors truncate">
                          {item.label}
                        </div>
                        <div className="flex-1 bg-slate-200 h-7 rounded-r-xl relative flex items-center overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.04 }}
                            className={`h-full rounded-r-xl ${item.color} flex items-center justify-end pr-2 shrink-0`}
                            style={{ minWidth: '3.8rem' }}
                          >
                            <span className="text-white font-black text-[11px] font-mono whitespace-nowrap drop-shadow">
                              {item.count.toLocaleString()}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col items-center gap-1">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Total Images</span>
                    <span className="text-xl font-black text-slate-800">31,783</span>
                  </div>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex flex-col items-center gap-1">
                    <Tag size={16} className="text-indigo-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500">Classes</span>
                    <span className="text-xl font-black text-slate-800">13</span>
                  </div>
                  <div className="col-span-2 md:col-span-1 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col items-center gap-1">
                    <AlertTriangle size={16} className="text-amber-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">Uncertain Labels</span>
                    <span className="text-xl font-black text-slate-800">938</span>
                    <span className="text-[9px] text-slate-400 font-medium text-center">NLI confidence &lt; 0.3</span>
                  </div>
                </div>

              </div>
            }
          />

        </div>
      </SectionCard>

    </div>
  );
}

const LABEL_DISTRIBUTION = [
  { label: 'other', count: 11326, color: 'bg-slate-400' },
  { label: 'music_performance', count: 2790, color: 'bg-violet-500' },
  { label: 'children', count: 2497, color: 'bg-sky-400' },
  { label: 'construction_work', count: 2479, color: 'bg-orange-500' },
  { label: 'dogs', count: 2265, color: 'bg-amber-500' },
  { label: 'biking', count: 1969, color: 'bg-lime-500' },
  { label: 'street_walking', count: 1906, color: 'bg-teal-500' },
  { label: 'sports', count: 1808, color: 'bg-emerald-500' },
  { label: 'food_and_market', count: 1469, color: 'bg-rose-400' },
  { label: 'outdoor_adventure', count: 1346, color: 'bg-green-600' },
  { label: 'water_boats', count: 921, color: 'bg-cyan-500' },
  { label: 'taking_pictures', count: 475, color: 'bg-indigo-400' },
  { label: 'beach', count: 374, color: 'bg-yellow-400' },
  { label: 'wedding', count: 158, color: 'bg-pink-400' },
];

const FINAL_LABEL_DISTRIBUTION = [
  { label: 'children', count: 5816, color: 'bg-sky-400' },
  { label: 'outdoor_adventure', count: 4114, color: 'bg-green-600' },
  { label: 'music_performance', count: 3095, color: 'bg-violet-500' },
  { label: 'taking_pictures', count: 2844, color: 'bg-indigo-400' },
  { label: 'sports', count: 2790, color: 'bg-emerald-500' },
  { label: 'construction_work', count: 2773, color: 'bg-orange-500' },
  { label: 'street_walking', count: 2467, color: 'bg-teal-500' },
  { label: 'dogs', count: 2310, color: 'bg-amber-500' },
  { label: 'biking', count: 2047, color: 'bg-lime-500' },
  { label: 'food_and_market', count: 1802, color: 'bg-rose-400' },
  { label: 'water_boats', count: 960, color: 'bg-cyan-500' },
  { label: 'beach', count: 582, color: 'bg-yellow-400' },
  { label: 'wedding', count: 183, color: 'bg-pink-400' },
];
