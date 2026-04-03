import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderTree, FileText, ChevronRight, ChevronDown, X,
  Terminal, BarChart3, Search, Cpu, Brain, Layers, 
  CheckCircle2, AlertCircle, ImageIcon, Zap, Microscope, Activity,
  Settings, Database, PlayCircle, Eye, MonitorPlay
} from 'lucide-react';

import { QRCodeCanvas } from "qrcode.react";

// Import Assets from the specific folder: assets/Image_classification/
import architectureEnsemble1 from '../../assets/Image_classification/architectureensemble1.png';
import architectureEnsemble2 from '../../assets/Image_classification/architectureensemble2.png';
import augVerifyImg from '../../assets/Image_classification/aug-verify.png';
import bestConfusionMatrixImg from '../../assets/Image_classification/best-confusion-matrix.png';
import blurrySamplesImg from '../../assets/Image_classification/blurry-samples.png';
import classDistImg from '../../assets/Image_classification/class_dist.png';
import confusionMatrix1 from '../../assets/Image_classification/confusionmatrix1.png';
import confusionMatrix2 from '../../assets/Image_classification/confusionmatrix2.png';
import dataSamplesImg from '../../assets/Image_classification/data-samples.png';
import diverseBrightnessImg from '../../assets/Image_classification/diverse-brightness.png';
import ensemble1Img from '../../assets/Image_classification/ensemble1.png';
import ensemble2Img from '../../assets/Image_classification/ensemble2.png';
import extremeDimsImg from '../../assets/Image_classification/extreme-dims.png';
import extremeDims2Img from '../../assets/Image_classification/extreme-dims2.png';
import extremeDims3Img from '../../assets/Image_classification/extreme-dims3.png';
import limeExplanationImg from '../../assets/Image_classification/lime-explanation.png';
import missingLabelImg from '../../assets/Image_classification/missing_label.png';
import modelComparisonImg from '../../assets/Image_classification/model-comparison.png';
import modelComparison2Img from '../../assets/Image_classification/model-comparison2.png';
import modelsHistoryImg from '../../assets/Image_classification/models_history.png';
import resnetHierarchyImg from '../../assets/Image_classification/resnet-hierarchy.png';
import vit12ClassAttnImg from '../../assets/Image_classification/vit-12class-attn.png';

// Import Demo Assets
import demo1 from '../../assets/Image_classification/demo1.png';
import demo2 from '../../assets/Image_classification/demo2.png';
import demo3 from '../../assets/Image_classification/demo3.png';
import demo4 from '../../assets/Image_classification/demo4.png';

const ImageClassification = () => {
  const [activeTab, setActiveTab] = useState('eda');
  const [selectedImage, setSelectedImage] = useState(null); // State cho Pop-up ảnh

  const tabs = [
    { id: 'eda', label: 'Data Exploration', icon: <Search size={18}/> },
    { id: 'models', label: 'Model Benchmarking', icon: <Cpu size={18}/> },
    { id: 'interpret', label: 'Interpretability', icon: <Microscope size={18}/> },
    { id: 'ensemble', label: 'Ensemble Learning', icon: <Zap size={18}/> },
    { id: 'demo', label: 'App Demo', icon: <MonitorPlay size={18}/> },
  ];

  return (
    <div className="flex flex-col gap-10 w-full p-4 md:p-8 text-slate-800 font-sans leading-relaxed bg-white relative">
      
      {/* MODAL PHÓNG TO ẢNH */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-rose-500 transition-colors z-50">
              <X size={40} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              src={selectedImage} 
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl border-4 border-white/10 object-contain cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-6 inline-block border border-indigo-500/30"
          >
            Assignment 1 • Computer Vision Pipeline
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[1.1]">
            Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Waste Sorting</span> Engine
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed mb-8 max-w-2xl">
            A comprehensive study on 12 waste categories using hierarchical CNNs, Vision Transformers, and Meta-Learner Ensembles for high-accuracy urban waste management.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/5 px-6 py-4 rounded-3xl border border-white/10 flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400" />
              <div><p className="text-[10px] opacity-50 uppercase font-black">Peak Accuracy</p><p className="font-bold text-xl font-mono">99.57%</p></div>
            </div>
            <div className="bg-white/5 px-6 py-4 rounded-3xl border border-white/10 flex items-center gap-3">
              <Activity className="text-cyan-400" />
              <div><p className="text-[10px] opacity-50 uppercase font-black">Top Architecture</p><p className="font-bold text-xl">Swin-T Partial</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION TABS */}
      <nav className="flex bg-slate-50 p-2 rounded-3xl sticky top-4 z-50 shadow-lg border border-slate-200 overflow-x-auto no-scrollbar backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl transition-all duration-500 font-black tracking-tight whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-xl translate-y-[-2px]' 
                : 'text-slate-400 hover:bg-white hover:text-indigo-600'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      {/* DYNAMIC CONTENT */}
      <main className="min-h-[1000px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* EDA TAB */}
            {activeTab === 'eda' && (
              <div className="space-y-16">
                <SectionCard title="Dataset Anatomy" icon={<FolderTree size={22}/>}>
                  <div className="grid lg:grid-cols-2 gap-10">
                    <div className="bg-slate-950 rounded-[2rem] p-8 font-mono text-sm text-emerald-400 border border-slate-800 shadow-2xl overflow-x-auto">
                      <p className="text-slate-600 mb-4 font-bold border-b border-slate-800 pb-2">/content/data</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 font-bold">📁 garbage_classification_corrected</li>
                        <li className="pl-6 flex items-center gap-2 text-emerald-500/70 italic opacity-80">└── 📁 battery, biological, brown-glass, cardboard, ...</li>
                        <li className="flex items-center gap-2 font-bold mt-2">📁 garbage_classification_enhanced</li>
                        <li className="pl-6 text-slate-500 flex items-center gap-2">└── [12 Classes Mirror Structure]</li>
                        <div className="h-4"></div>
                        <li className="flex items-center gap-2 text-rose-400"><FileText size={16}/> labels_corrections.csv</li>
                        <li className="flex items-center gap-2 text-blue-400"><FileText size={16}/> model_comparison_results.csv</li>
                        <li className="flex items-center gap-2 text-indigo-400"><FolderTree size={16}/> splits (Train/Val/Test)</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-6">
                      <ExpandableLog title="Corrupted Image Scan" icon={<AlertCircle className="text-amber-500" size={16}/>}>
                        <div className="p-5 bg-slate-50 border-l-4 border-amber-500 font-mono text-xs leading-relaxed">
                          Scanning dataset for corrupted images...<br/>
                          ----------------------------------------<br/>
                          <span className="text-emerald-600 font-bold">Scan complete. Found 0 corrupted images. []</span>
                        </div>
                      </ExpandableLog>
                      
                      <ExpandableLog title="Perceptual Hash Duplicate Analysis" icon={<Layers className="text-rose-500" size={16}/>}>
                        <div className="p-5 bg-slate-50 border-l-4 border-rose-500 font-mono text-xs space-y-3 max-h-80 overflow-y-auto">
                          <p className="text-rose-600 font-black">Scan complete. Found 35 visual duplicates.</p>
                          <p className="text-slate-800 underline font-bold">Critical Cross-Class Conflicts Found (4 Pairs):</p>
                          <ul className="space-y-1 text-slate-600">
                            <li>• [trash] vs [brown-glass] (trash370.jpg)</li>
                            <li>• [metal] vs [white-glass] (metal459.jpg)</li>
                            <li>• [plastic] vs [white-glass] (plastic556.jpg)</li>
                            <li>• [green-glass] vs [trash] (green-glass474.jpg)</li>
                          </ul>
                          <div className="bg-emerald-100 p-3 rounded text-emerald-800 border border-emerald-200">
                            <strong>System Action:</strong> Aggressive deletion triggered. Successfully removed 8 files to prevent data leakage.
                          </div>
                        </div>
                      </ExpandableLog>

                      <div className="bg-indigo-700 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-100 border-b-8 border-indigo-950">
                        <h4 className="font-black flex items-center gap-3 mb-6 uppercase tracking-widest text-sm italic">
                          <Activity size={20}/> Exact Global Normalization (RGB)
                        </h4>
                        <div className="grid grid-cols-2 gap-6">
                           <div className="bg-white/10 p-5 rounded-2xl border border-white/20">
                              <p className="text-[10px] uppercase font-bold opacity-60 mb-2">Dataset Mean</p>
                              <p className="font-mono text-xs leading-relaxed">[0.6109, 0.5569, 0.5309]</p>
                           </div>
                           <div className="bg-white/10 p-5 rounded-2xl border border-white/20">
                              <p className="text-[10px] uppercase font-bold opacity-60 mb-2">Dataset Std</p>
                              <p className="font-mono text-xs leading-relaxed">[0.2657, 0.2733, 0.2759]</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <SectionCard title="Class Imbalance Verification" icon={<BarChart3/>}>
                    <img 
                      src={classDistImg} 
                      className="w-full rounded-[2rem] border border-slate-100 shadow-inner cursor-zoom-in hover:scale-[1.02] transition-transform" 
                      alt="Distribution"
                      onClick={() => setSelectedImage(classDistImg)}
                    />
                    <p className="mt-6 text-sm text-slate-500 italic leading-relaxed">
                      <b>Insight:</b> 'Clothes' and 'Shoes' categories exhibit high frequency. To prevent bias, we utilize a <b>WeightedRandomSampler</b> with inverse-frequency sampling.
                    </p>
                  </SectionCard>
                  
                  <SectionCard title="Missing Label Identification" icon={<AlertCircle/>}>
                    <img 
                      src={missingLabelImg} 
                      className="w-full rounded-[2rem] border border-slate-100 cursor-zoom-in hover:scale-[1.02] transition-transform" 
                      alt="Missing Label"
                      onClick={() => setSelectedImage(missingLabelImg)}
                    />
                    <p className="mt-6 text-sm text-slate-500 italic leading-relaxed">
                      <b>Cleanup:</b> Manual inspection revealed objects with missing or contradictory metadata (e.g., green-glass labeled as trash), which were rectified in <i>labels_corrections.csv</i>.
                    </p>
                  </SectionCard>
                </div>

                {/* MODIFIED: DATA QUALITY INSIGHTS WITH TOGGLES */}
                <SectionCard title="Data Quality Insights" icon={<ImageIcon/>}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ExpandableLog title="Inspection: Visual Data Redundancy" icon={<Search size={16}/>}>
                         <div className="p-4 bg-slate-50 border-t">
                            <img src={dataSamplesImg} className="w-full rounded-xl border cursor-zoom-in hover:shadow-lg transition" onClick={() => setSelectedImage(dataSamplesImg)} alt="Samples"/>
                         </div>
                      </ExpandableLog>

                      <ExpandableLog title="Inspection: Exposure Variability" icon={<Search size={16}/>}>
                         <div className="p-4 bg-slate-50 border-t">
                            <img src={diverseBrightnessImg} className="w-full rounded-xl border cursor-zoom-in hover:shadow-lg transition" onClick={() => setSelectedImage(diverseBrightnessImg)} alt="Brightness"/>
                         </div>
                      </ExpandableLog>

                      <ExpandableLog title="Inspection: Defocus & Blurry Assessment" icon={<Search size={16}/>}>
                         <div className="p-4 bg-slate-50 border-t">
                            <img src={blurrySamplesImg} className="w-full rounded-xl border cursor-zoom-in hover:shadow-lg transition" onClick={() => setSelectedImage(blurrySamplesImg)} alt="Blurry"/>
                         </div>
                      </ExpandableLog>

                      <ExpandableLog title="Inspection: Spatial Dimension Outliers 1" icon={<Search size={16}/>}>
                         <div className="p-4 bg-slate-50 border-t">
                            <img src={extremeDimsImg} className="w-full rounded-xl border cursor-zoom-in hover:shadow-lg transition" onClick={() => setSelectedImage(extremeDimsImg)} alt="Extreme 1"/>
                         </div>
                      </ExpandableLog>

                      <ExpandableLog title="Inspection: Spatial Dimension Outliers 2" icon={<Search size={16}/>}>
                         <div className="p-4 bg-slate-50 border-t">
                            <img src={extremeDims2Img} className="w-full rounded-xl border cursor-zoom-in hover:shadow-lg transition" onClick={() => setSelectedImage(extremeDims2Img)} alt="Extreme 2"/>
                         </div>
                      </ExpandableLog>

                      <ExpandableLog title="Inspection: Spatial Dimension Outliers 3" icon={<Search size={16}/>}>
                         <div className="p-4 bg-slate-50 border-t">
                            <img src={extremeDims3Img} className="w-full rounded-xl border cursor-zoom-in hover:shadow-lg transition" onClick={() => setSelectedImage(extremeDims3Img)} alt="Extreme 3"/>
                         </div>
                      </ExpandableLog>
                   </div>
                </SectionCard>

                <SectionCard title="Image Preprocessing Pipeline" icon={<Settings/>}>
                  <div className="grid md:grid-cols-4 gap-6 mb-10">
                    <PipelineStep num="1" title="AR-Preserving Resize" desc="Scale longer side to 224 to prevent geometric distortion."/>
                    <PipelineStep num="2" title="Symmetric Padding" desc="White constant padding to reach fixed 224x224 input."/>
                    <PipelineStep num="3" title="On-the-fly Augment" desc="Random ±15° rotation, horizontal flip, and jitter."/>
                    <PipelineStep num="4" title="RGB Normalization" desc="Tensor conversion using exact dataset-wide mean/std."/>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-[3rem] border-4 border-dashed border-slate-200">
                    <img 
                      src={augVerifyImg} 
                      className="w-full rounded-[2rem] shadow-2xl border-8 border-white cursor-zoom-in hover:scale-[1.01] transition-transform" 
                      alt="Verification"
                      onClick={() => setSelectedImage(augVerifyImg)}
                    />
                  </div>
                </SectionCard>
              </div>
            )}

            {/* MODELS TAB */}
            {activeTab === 'models' && (
              <div className="space-y-16">
                <SectionCard title="Benchmark Architectures & Strategies" icon={<Terminal/>}>
                   <div className="overflow-x-auto">
                      <img 
                        src={modelComparisonImg} 
                        className="w-full rounded-2xl border shadow-lg mb-10 cursor-zoom-in hover:scale-[1.02] transition-transform" 
                        alt="Strategy Table"
                        onClick={() => setSelectedImage(modelComparisonImg)}
                      />
                      <table className="w-full text-left border-collapse rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                        <thead className="bg-slate-900 text-white text-xs uppercase tracking-widest">
                          <tr>
                            <th className="p-6">Model</th>
                            <th className="p-6 text-center">Type</th>
                            <th className="p-6">Transfer Learning Strategy</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {['AlexNet', 'VGG16', 'ResNet50', 'ViT-B/16', 'Swin-T'].map((m, i) => (
                            <tr key={m} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-indigo-50/50 transition-colors`}>
                              <td className="p-6 font-black text-indigo-900">{m}</td>
                              <td className="p-6 text-center"><span className={`px-4 py-1 rounded-full text-[10px] font-black ${m.includes('ViT') ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{m.includes('ViT') || m.includes('Swin') ? 'TRANSFORMER' : 'CNN'}</span></td>
                              <td className="p-6 text-slate-600 font-medium">Train head & unfreeze final convolutional/transformer block</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                   </div>
                </SectionCard>

                <SectionCard title="Training Configuration" icon={<Settings/>}>
                   <div className="grid md:grid-cols-3 gap-8">
                      <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                        <h5 className="font-black text-indigo-600 mb-4 flex items-center gap-2"><PlayCircle size={18}/> OPTIMIZER</h5>
                        <ul className="text-sm space-y-2 text-slate-600">
                          <li>• <b>Algorithm:</b> Adam</li>
                          <li>• <b>Base LR (Freeze):</b> 1 × 10⁻³</li>
                          <li>• <b>Base LR (Fine-tune):</b> 1 × 10⁻⁴</li>
                          <li>• <b>Loss:</b> Cross-Entropy</li>
                        </ul>
                      </div>
                      <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                        <h5 className="font-black text-rose-600 mb-4 flex items-center gap-2"><Activity size={18}/> SCHEDULER</h5>
                        <ul className="text-sm space-y-2 text-slate-600">
                          <li>• <b>Type:</b> ReduceLROnPlateau</li>
                          <li>• <b>Factor:</b> 0.1</li>
                          <li>• <b>Patience:</b> 2 Epochs</li>
                          <li>• <b>Metric:</b> Validation Loss</li>
                        </ul>
                      </div>
                      <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                        <h5 className="font-black text-emerald-600 mb-4 flex items-center gap-2"><Layers size={18}/> SPECS</h5>
                        <ul className="text-sm space-y-2 text-slate-600">
                          <li>• <b>Epochs:</b> 10</li>
                          <li>• <b>Batch Size:</b> 32</li>
                          <li>• <b>Device:</b> NVIDIA T4 GPU</li>
                          <li>• <b>Input:</b> 224 × 224 × 3</li>
                        </ul>
                      </div>
                   </div>
                </SectionCard>

                <SectionCard title="Statistical Performance Analysis" icon={<BarChart3/>}>
                  <img 
                    src={modelComparison2Img} 
                    className="w-full rounded-[2.5rem] border-4 border-white shadow-2xl mb-12 cursor-zoom-in hover:scale-[1.02] transition-transform" 
                    alt="6 Charts"
                    onClick={() => setSelectedImage(modelComparison2Img)}
                  />
                  <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col lg:flex-row items-center justify-between gap-10">
                     <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-6">
                           <span className="bg-emerald-500 text-emerald-950 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-emerald-500/20">🏆 LEADERBOARD WINNER</span>
                        </div>
                        <h4 className="text-4xl font-black mb-2 tracking-tighter">Swin_T_Partial</h4>
                        <p className="text-slate-400 font-mono text-sm mb-6 underline">Architecture: hierarchical-swin-t</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                           <MetricItem label="F1-Score" value="98.11%" sub="+1.42% vs ResNet"/>
                           <MetricItem label="Inference" value="6.27 ms" sub="per image"/>
                           <MetricItem label="Total Params" value="27.53M" sub="weights"/>
                           <MetricItem label="VRAM" value="1185.5" sub="Megabytes"/>
                        </div>
                        <div className="bg-indigo-600/20 p-6 rounded-2xl border border-indigo-400/20 flex flex-col gap-2 font-mono text-xs text-indigo-300">
                          <p>Total Accuracy: 98.10%</p>
                          <p>Trainable Params: 14.19M</p>
                          <p>Training Duration: 16.2 min</p>
                          <p>Strategy: partial-block-tuning</p>
                        </div>
                     </div>
                     {/* ADDED: BEST CONFUSION MATRIX HERE */}
                     <div className="bg-white/10 p-6 rounded-[2rem] border border-white/20 backdrop-blur-sm">
                        <p className="text-center font-bold mb-4 text-emerald-400 uppercase text-sm tracking-wider">Best Model Confusion Matrix</p>
                        <img 
                          src={bestConfusionMatrixImg} 
                          className="w-[320px] rounded-xl shadow-2xl cursor-zoom-in hover:scale-105 transition-transform" 
                          alt="Best CM" 
                          onClick={() => setSelectedImage(bestConfusionMatrixImg)}
                        />
                     </div>
                  </div>
                </SectionCard>

                <SectionCard title="Loss & Accuracy Dynamics" icon={<Activity/>}>
                   <img 
                    src={modelsHistoryImg} 
                    className="w-full rounded-[2rem] border cursor-zoom-in hover:scale-[1.01] transition-transform" 
                    alt="Global History"
                    onClick={() => setSelectedImage(modelsHistoryImg)}
                   />
                   <p className="mt-6 text-center text-xs text-slate-400 font-bold uppercase tracking-widest underline decoration-indigo-500 underline-offset-4">Sketch of training convergence for all candidate configurations</p>
                </SectionCard>
              </div>
            )}

            {/* INTERPRETABILITY TAB */}
            {activeTab === 'interpret' && (
              <div className="space-y-16">

                <SectionCard title="Visual Explanation (XAI)" icon={<Brain/>}>
                  <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                    
                    <div className="space-y-6">
                      <h4 className="text-3xl font-black tracking-tight text-indigo-950 italic">
                        ResNet-50: <span className="text-indigo-600">Feature Hierarchy</span>
                      </h4>

                      <p className="text-slate-600 leading-relaxed">
                        By leveraging <b>Grad-CAM</b> across different residual stages, we observe the model's 
                        "mental transition" from low-level geometric primitives to high-level semantic understanding 
                        of waste materials.
                      </p>

                      <div className="space-y-4">
                        <div className="bg-slate-50 p-5 rounded-2xl border-l-8 border-indigo-200">
                          <p className="font-black text-[10px] uppercase mb-1">
                            Layer 1-2 (Edges & Textures)
                          </p>
                          <p className="text-xs text-slate-500">
                            Focus on object boundaries and high-frequency light reflections on glass/metal.
                          </p>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-2xl border-l-8 border-indigo-600">
                          <p className="font-black text-[10px] uppercase mb-1">
                            Layer 3-4 (Semantic Object)
                          </p>
                          <p className="text-xs text-slate-500">
                            Attention converges entirely on the physical entity, correctly ignoring the background.
                          </p>
                        </div>
                      </div>
                    </div>

                    <img 
                      src={resnetHierarchyImg} 
                      className="w-full rounded-[2.5rem] shadow-2xl border-4 border-white cursor-zoom-in hover:scale-[1.02] transition-transform" 
                      alt="ResNet Hierarchy"
                      onClick={() => setSelectedImage(resnetHierarchyImg)}
                    />
                  </div>
                </SectionCard>

                {/* ===== SWIN + LIME ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                  {/* SWIN */}
                  <SectionCard title="Swin-T: Global Token Attention" icon={<Eye/>}>
                    
                    <div className="w-[480px] h-[650px] mx-auto flex items-center justify-center bg-white rounded-[2rem] border-2 border-slate-200 p-6">
                      <img 
                        src={vit12ClassAttnImg} 
                        className="max-w-full max-h-full object-contain cursor-zoom-in hover:scale-[1.02] transition-transform"
                        alt="Attention Maps"
                        onClick={() => setSelectedImage(vit12ClassAttnImg)}
                      />
                    </div>

                    <p className="mt-6 text-xs text-slate-500 leading-relaxed italic">
                      <b>Visualization Logic:</b> CLS Token interaction matrix triturated into 14×14 patches, 
                      highlighting the multi-head self-attention mechanism across 12 categories.
                    </p>
                  </SectionCard>

                  {/* LIME */}
                  <SectionCard title="LIME: Superpixel Verification" icon={<Microscope/>}>
                    
                    <div className="w-[480px] h-[650px] mx-auto flex items-center justify-center bg-white rounded-[2rem] border-2 border-slate-200 p-6">
                      <img 
                        src={limeExplanationImg} 
                        className="max-w-full max-h-full object-contain cursor-zoom-in hover:scale-[1.02] transition-transform"
                        alt="LIME Explanations"
                        onClick={() => setSelectedImage(limeExplanationImg)}
                      />
                    </div>

                    <p className="mt-6 text-xs text-slate-500 leading-relaxed italic">
                      <b>Method:</b> Local Interpretable Model-Agnostic Explanations identifying superpixels 
                      with the highest positive influence (e.g., labels on plastic bottles).
                    </p>
                  </SectionCard>

                </div>
              </div>
            )}

            {/* ENSEMBLE TAB */}
            {activeTab === 'ensemble' && (
              <div className="space-y-16">
                <SectionCard title="Hybrid Meta-Learning" icon={<Zap/>}>
                  <div className="grid lg:grid-cols-2 gap-10">
                    <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 flex flex-col h-full">
                      <h4 className="font-black text-indigo-900 mb-6 flex items-center gap-3">
                        <Layers size={20}/> Level 1: Feature Fusion (Late Fusion)
                      </h4>
                      <img 
                        src={architectureEnsemble1} 
                        className="w-full rounded-2xl border mb-6 shadow-sm flex-grow object-contain bg-white p-4 cursor-zoom-in hover:shadow-xl transition-shadow" 
                        alt="Ensemble 1"
                        onClick={() => setSelectedImage(architectureEnsemble1)}
                      />
                      <div className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-xl">
                         <div className="flex justify-between items-end mb-4">
                            <div><p className="text-[10px] opacity-60 font-black uppercase">Resulting Accuracy</p><p className="text-3xl font-black">99.31%</p></div>
                            <CheckCircle2 size={32} className="opacity-40"/>
                         </div>
                         <ClassificationReport data={[
                            ['battery','0.99','1.00','0.99','142'],['biological','1.00','1.00','1.00','147'],['brown-glass','1.00','1.00','1.00','90'],
                            ['cardboard','1.00','0.96','0.98','135'],['clothes','1.00','0.99','1.00','793'],['green-glass','1.00','1.00','1.00','92'],
                            ['metal','0.97','0.99','0.98','115'],['paper','0.97','0.98','0.97','156'],['plastic','0.97','1.00','0.98','130']
                         ]} />
                      </div>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 flex flex-col h-full">
                      <h4 className="font-black text-indigo-900 mb-6 flex items-center gap-3">
                        <Zap size={20}/> Level 2: Soft Voting (Prediction Level)
                      </h4>
                      <img 
                        src={architectureEnsemble2} 
                        className="w-full rounded-2xl border mb-6 shadow-sm flex-grow object-contain bg-white p-4 cursor-zoom-in hover:shadow-xl transition-shadow" 
                        alt="Ensemble 2"
                        onClick={() => setSelectedImage(architectureEnsemble2)}
                      />
                      <div className="bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl">
                         <div className="flex justify-between items-end mb-4">
                            <div><p className="text-[10px] opacity-60 font-black uppercase tracking-widest">Final System Accuracy</p><p className="text-3xl font-black text-cyan-400 tracking-tighter italic">99.57%</p></div>
                            <Activity size={32} className="text-cyan-500 opacity-50"/>
                         </div>
                         <ClassificationReport data={[
                            ['battery','1.00','1.00','1.00','142'],['biological','1.00','1.00','1.00','147'],['brown-glass','1.00','1.00','1.00','90'],
                            ['cardboard','1.00','0.97','0.98','135'],['clothes','1.00','1.00','1.00','793'],['green-glass','1.00','1.00','1.00','92'],
                            ['metal','0.98','0.99','0.99','115'],['paper','0.99','0.99','0.99','156'],['plastic','0.97','0.99','0.98','130']
                         ]} />
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   <SectionCard title="Ensemble Confusion Matrix 1" icon={<BarChart3/>}>
                      <img src={confusionMatrix1} className="w-full rounded-2xl border cursor-zoom-in hover:scale-[1.02] transition-transform" alt="CM1" onClick={() => setSelectedImage(confusionMatrix1)}/>
                      <img src={ensemble1Img} className="w-full mt-4 rounded-xl border border-slate-100 shadow-sm cursor-zoom-in hover:scale-[1.02] transition-transform" alt="Ensemble 1 Samples" onClick={() => setSelectedImage(ensemble1Img)}/>
                   </SectionCard>
                   <SectionCard title="Ensemble Confusion Matrix 2" icon={<BarChart3/>}>
                      <img src={confusionMatrix2} className="w-full rounded-2xl border cursor-zoom-in hover:scale-[1.02] transition-transform" alt="CM2" onClick={() => setSelectedImage(confusionMatrix2)}/>
                      <img src={ensemble2Img} className="w-full mt-4 rounded-xl border border-slate-100 shadow-sm cursor-zoom-in hover:scale-[1.02] transition-transform" alt="Ensemble 2 Samples" onClick={() => setSelectedImage(ensemble2Img)}/>
                   </SectionCard>
                </div>
              </div>
            )}

            {/* DEMO TAB */}
            {activeTab === 'demo' && (
              <div className="space-y-12">

                <SectionCard 
                  title="Application Interface Demo" 
                  icon={<MonitorPlay size={24} className="text-indigo-600"/>}
                >

                  {/* ===== DESCRIPTION ===== */}
                  <p className="text-slate-600 leading-relaxed max-w-3xl mb-6">
                    This application is deployed on <b>Vercel</b> with an optimized inference pipeline using 
                    <b> ONNX Runtime</b> for fast and lightweight model execution. The system enables real-time 
                    waste classification with confidence scoring and explainable AI visualization, ensuring both 
                    performance and interpretability in practical scenarios.
                  </p>

                  <div className="flex items-center gap-4 mt-6 bg-slate-50 p-4 rounded-2xl w-fit">
                  <QRCodeCanvas 
                    value="https://trash-ai-web.vercel.app/" 
                    size={100}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      Live Demo
                    </p>
                    <p className="text-xs text-slate-500">
                      Scan QR to access the deployed app on Vercel
                    </p>
                  </div>
                </div>

                  {/* ===== GRID DEMO (FIX LỆCH) ===== */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                    {/* ITEM */}
                    {[
                      {img: demo1, title: "#01 Refrigerator Pin Detection"},
                      {img: demo2, title: "#02 Glass Detection"},
                      {img: demo3, title: "#03 Laptop Pin Detection"},
                      {img: demo4, title: "#04 Metal object Detection"},
                    ].map((item, i) => (
                      <div key={i} className="space-y-4">
                        
                        <h5 className="font-black text-xs uppercase tracking-widest text-slate-500">
                          {item.title}
                        </h5>

                        {/* FIX SIZE KHÔNG LỆCH */}
                        <div className="w-full h-[420px] flex items-center justify-center bg-white rounded-[2rem] border p-4">
                          <img 
                            src={item.img}
                            className="max-h-full max-w-full object-contain cursor-zoom-in hover:scale-[1.02] transition-transform"
                            onClick={() => setSelectedImage(item.img)}
                            alt={item.title}
                          />
                        </div>
                      </div>
                    ))}

                  </div>

                  {/* ===== KEY INSIGHTS ===== */}
                  <div className="mt-10 grid md:grid-cols-3 gap-6">

                    <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-indigo-500">
                      <p className="text-xs font-bold uppercase mb-2">Real-time Inference</p>
                      <p className="text-xs text-slate-500">
                        ONNX deployment significantly reduces latency, enabling near real-time predictions 
                        directly in the web environment.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-indigo-500">
                      <p className="text-xs font-bold uppercase mb-2">Robust Classification</p>
                      <p className="text-xs text-slate-500">
                        The model generalizes well across different waste materials including plastic, 
                        glass, metal, and paper under varying conditions.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-indigo-500">
                      <p className="text-xs font-bold uppercase mb-2">Explainability Support</p>
                      <p className="text-xs text-slate-500">
                        Integrated XAI modules (Grad-CAM & LIME) provide visual explanations, 
                        improving model transparency and trustworthiness.
                      </p>
                    </div>

                  </div>

                </SectionCard>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// HELPER COMPONENTS
const SectionCard = ({ title, icon, children }) => (
  <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-700 group">
    <div className="flex items-center gap-5 mb-10">
      <div className="p-5 bg-slate-100 rounded-[1.5rem] group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
        {icon}
      </div>
      <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">{title}</h3>
    </div>
    {children}
  </div>
);

const ExpandableLog = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-md hover:border-indigo-300 transition-colors">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors font-black text-sm text-slate-700 tracking-tight"
      >
        <span className="flex items-center gap-3"> {icon} {title} </span>
        {isOpen ? <ChevronDown size={18}/> : <ChevronRight size={18}/>}
      </button>
      {isOpen && <div className="border-t">{children}</div>}
    </div>
  );
};

const PipelineStep = ({ num, title, desc }) => (
  <div className="flex flex-col gap-3 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group hover:bg-white hover:shadow-xl transition-all duration-500">
    <span className="absolute -top-4 -left-2 w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black shadow-xl italic group-hover:scale-110 transition-transform">#{num}</span>
    <h5 className="font-black text-indigo-900 mt-4 uppercase tracking-widest text-xs leading-none">{title}</h5>
    <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

const MetricItem = ({ label, value, sub }) => (
  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
    <p className="text-[9px] uppercase font-black opacity-50 mb-1 tracking-widest">{label}</p>
    <p className="text-xl font-black text-emerald-400">{value}</p>
    <p className="text-[10px] opacity-40 italic">{sub}</p>
  </div>
);

const ClassificationReport = ({ data }) => (
  <div className="font-mono text-[9px] border border-white/10 rounded-2xl bg-black/30 p-4 overflow-x-auto shadow-inner">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-white/10 opacity-60">
          <th className="pb-2">Class</th>
          <th className="pb-2">Prec</th>
          <th className="pb-2">Rec</th>
          <th className="pb-2">F1</th>
          <th className="pb-2">Sup</th>
        </tr>
      </thead>
      <tbody className="opacity-90">
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-white/5 transition-colors">
            <td className="py-1 font-bold text-cyan-300">{row[0]}</td>
            <td className="py-1">{row[1]}</td>
            <td className="py-1">{row[2]}</td>
            <td className="py-1 font-bold text-emerald-400">{row[3]}</td>
            <td className="py-1 opacity-40">{row[4]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ImageClassification;