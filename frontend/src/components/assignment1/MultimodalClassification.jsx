import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Image as ImageIcon, MessageSquare, AlertTriangle, List, FileImage,
  Tag, X, CheckCircle2, Layers, Database, Maximize, BarChart3, Type,
  FileDigit, ChevronDown
} from 'lucide-react';

import sample1 from '../../assets/assignment1/Multimodal_classification/sample1.png';
import sample2 from '../../assets/assignment1/Multimodal_classification/sample2.jpg';
import sample3 from '../../assets/assignment1/Multimodal_classification/sample3.jpg';

import widthHeightImg from '../../assets/assignment1/Multimodal_classification/width_height_distribution.png';
import extremeImg from '../../assets/assignment1/Multimodal_classification/extreme_images.png';
import captionLenDistImg from '../../assets/assignment1/Multimodal_classification/caption_length_distribution.png';
import captionBoxplotImg from '../../assets/assignment1/Multimodal_classification/caption_length_boxplot.png';
import wordCloudImg from '../../assets/assignment1/Multimodal_classification/word_cloud.png';
import GeneratingLabel from './GeneratingLabel';

const MultimodalClassification = () => {
  const [activeTab, setActiveTab] = useState('eda');
  const [selectedImage, setSelectedImage] = useState(null);

  const tabs = [
    { id: 'eda', label: 'Dataset Overview', icon: <Search size={18} /> },
    { id: 'exploration', label: 'Data Exploration', icon: <Layers size={18} /> },
    { id: 'label-gen', label: 'Label Generation', icon: <Tag size={18} /> },
  ];

  const samples = [
    {
      img: sample1,
      id: "sample1.png",
      captions: [
        "A young man in swim shorts is jumping over a wave in the ocean.",
        "A man in swimming trunks plays in the ocean 's waves .",
        "a surfer falling of his board into a wave",
        "A man falling over in an ocean wave",
        "A man is falling into waves ."
      ]
    },
    {
      img: sample2,
      id: "sample2.jpg",
      captions: [
        "Two young guys with shaggy hair look at their hands while hanging out in the yard.",
        "Two young white males are outside near many bushes.",
        "Two men in green shirts are standing in a yard.",
        "A man in a blue shirt standing in a garden.",
        "Two friends enjoy time spent together."
      ]
    },
    {
      img: sample3,
      id: "sample3.jpg",
      captions: [
        "A child in a pink dress is climbing up a set of stairs in an entry way.",
        "A little girl in a pink dress going into a wooden cabin.",
        "A little girl climbing the stairs to her playhouse.",
        "A little girl climbing into a wooden playhouse.",
        "A girl going into a wooden building."
      ]
    }
  ];

  const stopWordsData = [
    { rank: 1, word: 'a', count: 181627, color: 'bg-amber-400' },
    { rank: 2, word: 'in', count: 83224, color: 'bg-pink-400' },
    { rank: 3, word: 'the', count: 57401, color: 'bg-purple-500' },
    { rank: 4, word: 'on', count: 45538, color: 'bg-purple-500' },
    { rank: 5, word: 'and', count: 42753, color: 'bg-purple-500' },
    { rank: 6, word: 'is', count: 41087, color: 'bg-purple-500' },
    { rank: 7, word: 'of', count: 37736, color: 'bg-purple-500' },
    { rank: 8, word: 'with', count: 36171, color: 'bg-purple-500' },
    { rank: 9, word: 'are', count: 20189, color: 'bg-blue-400' },
    { rank: 10, word: 'to', count: 19760, color: 'bg-blue-400' },
    { rank: 11, word: 'at', count: 16157, color: 'bg-blue-400' },
    { rank: 12, word: 'while', count: 16501, color: 'bg-blue-400' },
    { rank: 13, word: 'his', count: 14891, color: 'bg-blue-400' },
    { rank: 14, word: 'an', count: 11919, color: 'bg-blue-400' },
    { rank: 15, word: 'down', count: 7675, color: 'bg-blue-400' },
    { rank: 16, word: 'her', count: 7414, color: 'bg-blue-400' },
    { rank: 17, word: 'by', count: 5705, color: 'bg-blue-400' },
    { rank: 18, word: 'up', count: 5113, color: 'bg-blue-400' },
    { rank: 19, word: 'as', count: 5004, color: 'bg-blue-400' },
    { rank: 20, word: 'for', count: 4892, color: 'bg-blue-400' }
  ];

  const tfidfData = [
    { word: "in", score: 0.187, color: 'bg-emerald-500' },
    { word: "the", score: 0.153, color: 'bg-emerald-500' },
    { word: "on", score: 0.131, color: 'bg-emerald-500' },
    { word: "man", score: 0.121, color: 'bg-emerald-500' },
    { word: "is", score: 0.117, color: 'bg-emerald-500' },
    { word: "of", score: 0.110, color: 'bg-emerald-500' },
    { word: "and", score: 0.108, color: 'bg-emerald-500' },
    { word: "with", score: 0.103, color: 'bg-emerald-500' },
    { word: "two", score: 0.077, color: 'bg-indigo-400' },
    { word: "woman", score: 0.073, color: 'bg-indigo-400' },
    { word: "are", score: 0.068, color: 'bg-indigo-400' },
    { word: "people", score: 0.063, color: 'bg-indigo-400' },
    { word: "to", score: 0.061, color: 'bg-indigo-400' },
    { word: "at", score: 0.059, color: 'bg-indigo-400' },
    { word: "an", score: 0.056, color: 'bg-indigo-400' },
    { word: "wearing", score: 0.051, color: 'bg-indigo-400' },
    { word: "young", score: 0.050, color: 'bg-indigo-400' },
    { word: "shirt", score: 0.044, color: 'bg-indigo-400' },
    { word: "white", score: 0.043, color: 'bg-indigo-400' },
    { word: "black", score: 0.040, color: 'bg-indigo-400' }
  ];

  const bigramsData = [
    { word: "in the", count: 15679, color: 'bg-rose-400' },
    { word: "man in", count: 11279, color: 'bg-rose-400' },
    { word: "on the", count: 10126, color: 'bg-rose-400' },
    { word: "group of", count: 7423, color: 'bg-rose-400' },
    { word: "front of", count: 7238, color: 'bg-rose-400' },
    { word: "in front", count: 7234, color: 'bg-rose-400' },
    { word: "man is", count: 5445, color: 'bg-rose-400' },
    { word: "woman in", count: 5401, color: 'bg-rose-400' },
    { word: "of people", count: 4971, color: 'bg-rose-400' },
    { word: "two men", count: 4148, color: 'bg-rose-400' },
    { word: "people are", count: 4135, color: 'bg-rose-400' },
    { word: "in blue", count: 4078, color: 'bg-rose-400' },
    { word: "sitting on", count: 3824, color: 'bg-rose-400' },
    { word: "man with", count: 3757, color: 'bg-rose-400' },
    { word: "next to", count: 3641, color: 'bg-rose-400' },
    { word: "man wearing", count: 3618, color: 'bg-rose-400' },
    { word: "shirt and", count: 3595, color: 'bg-rose-400' },
    { word: "at the", count: 3584, color: 'bg-rose-400' },
    { word: "the street", count: 3550, color: 'bg-rose-400' },
    { word: "in black", count: 3493, color: 'bg-rose-400' }
  ];

  const trigramsData = [
    { word: "in front of", count: 7099, color: 'bg-amber-500' },
    { word: "group of people", count: 3296, color: 'bg-amber-500' },
    { word: "in the background", count: 2545, color: 'bg-amber-500' },
    { word: "man and woman", count: 1728, color: 'bg-amber-500' },
    { word: "in the air", count: 1454, color: 'bg-amber-500' },
    { word: "man in blue", count: 1397, color: 'bg-amber-500' },
    { word: "man in black", count: 1269, color: 'bg-amber-500' },
    { word: "in blue shirt", count: 1196, color: 'bg-amber-500' },
    { word: "in white shirt", count: 1156, color: 'bg-amber-500' },
    { word: "man in white", count: 1121, color: 'bg-amber-500' },
    { word: "down the street", count: 1071, color: 'bg-amber-500' },
    { word: "is sitting on", count: 1060, color: 'bg-amber-500' },
    { word: "standing in front", count: 1048, color: 'bg-amber-500' },
    { word: "of people are", count: 1036, color: 'bg-amber-500' },
    { word: "in the snow", count: 1006, color: 'bg-amber-500' },
    { word: "black and white", count: 959, color: 'bg-amber-500' },
    { word: "on the beach", count: 947, color: 'bg-amber-500' },
    { word: "on the street", count: 945, color: 'bg-amber-500' },
    { word: "in red shirt", count: 869, color: 'bg-amber-500' },
    { word: "crowd of people", count: 856, color: 'bg-amber-500' }
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
            Assignment 1 • Zero-Shot & Few-Shot Vision-Language classification
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[1.1]">
            Multimodal <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Classification</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed mb-8 max-w-2xl">
            Exploring state-of-the-art vision-language models on the Flickr30k dataset. From automated label generation to Zero-Shot and Few-Shot evaluation.
          </p>
        </div>
      </section>

      {/* NAVIGATION TABS */}
      <nav className="flex bg-slate-50 p-2 rounded-3xl sticky top-4 z-50 shadow-lg border border-slate-200 overflow-x-auto no-scrollbar backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl transition-all duration-500 font-black tracking-tight whitespace-nowrap ${activeTab === tab.id
              ? 'bg-indigo-600 text-white shadow-xl translate-y-[-2px]'
              : 'text-slate-400 hover:bg-white hover:text-indigo-600'
              }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      {/* DYNAMIC CONTENT */}
      <main className="min-h-[800px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* EDA TAB - Dataset Overview */}
            {activeTab === 'eda' && (
              <div className="space-y-16">

                {/* Dataset Stats & Constraints */}
                <SectionCard title="Flickr30k Overview" icon={<List size={22} />}>
                  <div className="grid lg:grid-cols-2 gap-10">

                    {/* Metrics */}
                    <div className="bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-2xl flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-6">
                        <MetricItem label="Total Images" value="31,783" icon={<FileImage size={24} className="text-emerald-400 mb-2 opacity-80" />} />
                        <MetricItem label="Total Captions" value="158,915" icon={<MessageSquare size={24} className="text-cyan-400 mb-2 opacity-80" />} />
                        <MetricItem label="Captions / Image" value="5" sub="Descriptive sentences" icon={<List size={24} className="text-indigo-400 mb-2 opacity-80" />} />
                        <MetricItem label="Format" value="RGB" sub="Variable dimensions" icon={<ImageIcon size={24} className="text-amber-400 mb-2 opacity-80" />} />
                      </div>
                    </div>

                    {/* Constraint / Label Gen */}
                    <div className="space-y-6">
                      <div className="bg-rose-50 border border-rose-200 rounded-[2rem] p-8 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200 rounded-bl-full opacity-50 -z-10 group-hover:scale-110 transition-transform"></div>
                        <AlertTriangle size={32} className="text-rose-500 mb-4" />
                        <h4 className="text-xl font-black text-rose-950 tracking-tighter mb-2">The Labeling Challenge</h4>
                        <p className="text-slate-700 leading-relaxed text-sm">
                          Unlike traditional classification datasets, <b>Flickr30k</b> inherently does not possess definitive categorical labels. It is purely an image-to-text dataset containing only images and their corresponding descriptive captions.
                        </p>
                        <div className="mt-6 bg-white p-4 rounded-xl border border-rose-100 flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-rose-500 mt-1 flex-shrink-0" />
                          <p className="text-xs text-slate-600 font-medium">
                            <span className="font-bold text-rose-700">Requirement: </span>
                            Before proceeding with Zero-Shot and Few-Shot evaluation architectures, we must construct a <b>generative labeling pipeline</b> to intelligently assign definitive multi-class labels to these samples based on semantic clustering of their text captions.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </SectionCard>

                {/* Samples */}
                <SectionCard title="Data Samples & Modalities" icon={<Tag size={22} />}>
                  <p className="text-slate-500 mb-8 max-w-2xl text-sm">
                    Each entry in the dataset pairs one high-resolution image with five independent descriptive sentences crowdsourced from different annotators, capturing varied perspectives and stylistic phrasing.
                  </p>

                  <div className="flex flex-col gap-10">
                    {samples.map((sample, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 lg:p-8 flex flex-col lg:flex-row gap-8 shadow-sm hover:shadow-xl transition-shadow group">

                        {/* Image Side */}
                        <div className="w-full lg:w-1/3 flex flex-col gap-4">
                          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm relative">
                            <span className="absolute -top-3 -left-3 bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-xl font-black text-sm shadow-lg z-10">#{idx + 1}</span>
                            <img
                              src={sample.img}
                              alt={`Sample ${idx + 1}`}
                              className="w-full rounded-xl object-cover aspect-square cursor-zoom-in group-hover:opacity-95 transition-opacity"
                              onClick={() => setSelectedImage(sample.img)}
                            />
                          </div>
                          <p className="text-center font-mono text-xs text-slate-400">File: {sample.id}</p>
                        </div>

                        {/* Text Side */}
                        <div className="w-full lg:w-2/3 flex flex-col justify-center">
                          <h5 className="font-black text-indigo-900 tracking-tighter uppercase text-sm flex items-center gap-2 mb-4">
                            <MessageSquare size={16} /> 5 Corresponding Captions
                          </h5>
                          <ul className="space-y-3">
                            {sample.captions.map((cap, cIdx) => (
                              <li key={cIdx} className="bg-white border border-slate-200 p-4 rounded-xl text-sm text-slate-700 flex items-start gap-4">
                                <span className="text-indigo-300 font-black font-mono">{(cIdx + 1).toString().padStart(2, '0')}</span>
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    ))}
                  </div>

                </SectionCard>

              </div>
            )}

            {/* EXPLORATION TAB */}
            {activeTab === 'exploration' && (
              <div className="space-y-16">

                {/* DATA QUALITY OVERALL */}
                <SectionCard title="Global Data Consistency" icon={<Database size={22} />}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-rose-50 border border-rose-100 p-8 rounded-[2rem] flex items-center justify-between group hover:shadow-lg transition-all duration-300">
                      <div className="flex flex-col gap-1">
                        <span className="font-black text-rose-800 text-lg flex items-center gap-2"><FileDigit size={20} /> Missing Values</span>
                        <span className="text-sm text-slate-600 font-medium">Negligible omission. Resolved during pipeline prep.</span>
                      </div>
                      <span className="text-5xl font-black text-rose-500 group-hover:scale-110 transition-transform">1</span>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2rem] flex items-center justify-between group hover:shadow-lg transition-all duration-300">
                      <div className="flex flex-col gap-1">
                        <span className="font-black text-amber-800 text-lg flex items-center gap-2"><Layers size={20} /> Duplicate Rows</span>
                        <span className="text-sm text-slate-600 font-medium">Identified & pruned to maintain dataset integrity.</span>
                      </div>
                      <span className="text-5xl font-black text-amber-500 group-hover:scale-110 transition-transform">34</span>
                    </div>
                  </div>
                </SectionCard>

                {/* IMAGE MODALITY EXPLORATION */}
                <SectionCard title="Image Modality Exploration" icon={<ImageIcon size={22} />}>
                  <div className="grid lg:grid-cols-2 gap-10 mb-12">

                    {/* STATS */}
                    <div className="space-y-6">
                      {/* Width Height Stats */}
                      <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
                        <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
                          <Maximize size={16} className="text-indigo-500" /> Spatial Resolutions
                        </h4>
                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <p className="text-indigo-700 font-black border-b-2 border-indigo-100 pb-2 uppercase text-sm tracking-wide">Width (px)</p>
                            <ul className="text-sm font-mono text-slate-600 space-y-2 border-l-2 border-indigo-100 pl-3">
                              <li><span className="opacity-50">Min:</span>  <span className="font-bold text-slate-800">164</span></li>
                              <li><span className="opacity-50">Max:</span>  <span className="font-bold text-slate-800">500</span></li>
                              <li><span className="opacity-50">Mean:</span> <span className="font-bold text-slate-800">459.6</span></li>
                              <li><span className="opacity-50">Std:</span>  <span className="font-bold text-slate-800">67.5</span></li>
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <p className="text-emerald-700 font-black border-b-2 border-emerald-100 pb-2 uppercase text-sm tracking-wide">Height (px)</p>
                            <ul className="text-sm font-mono text-slate-600 space-y-2 border-l-2 border-emerald-100 pl-3">
                              <li><span className="opacity-50">Min:</span>  <span className="font-bold text-slate-800">112</span></li>
                              <li><span className="opacity-50">Max:</span>  <span className="font-bold text-slate-800">500</span></li>
                              <li><span className="opacity-50">Mean:</span> <span className="font-bold text-slate-800">395.1</span></li>
                              <li><span className="opacity-50">Std:</span>  <span className="font-bold text-slate-800">74.4</span></li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* RGB Color */}
                      <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
                        <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-rose-500 via-emerald-500 to-blue-500 shadow-md" />
                          RGB Global Mean Configuration
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center bg-white py-4 px-2 rounded-xl border border-rose-100 shadow-sm group hover:border-rose-300">
                            <p className="text-rose-500 font-black text-2xl mb-1 group-hover:scale-110 transition-transform">0.44</p>
                            <p className="text-[9px] text-rose-800 font-black uppercase tracking-widest">Red</p>
                            <p className="text-[9px] text-slate-400 font-mono mt-1 pt-1 border-t border-rose-50 inline-block">± 0.2851 (σ)</p>
                          </div>
                          <div className="text-center bg-white py-4 px-2 rounded-xl border border-emerald-100 shadow-sm group hover:border-emerald-300">
                            <p className="text-emerald-500 font-black text-2xl mb-1 group-hover:scale-110 transition-transform">0.42</p>
                            <p className="text-[9px] text-emerald-800 font-black uppercase tracking-widest">Green</p>
                            <p className="text-[9px] text-slate-400 font-mono mt-1 pt-1 border-t border-emerald-50 inline-block">± 0.2773 (σ)</p>
                          </div>
                          <div className="text-center bg-white py-4 px-2 rounded-xl border border-blue-100 shadow-sm group hover:border-blue-300">
                            <p className="text-blue-500 font-black text-2xl mb-1 group-hover:scale-110 transition-transform">0.38</p>
                            <p className="text-[9px] text-blue-800 font-black uppercase tracking-widest">Blue</p>
                            <p className="text-[9px] text-slate-400 font-mono mt-1 pt-1 border-t border-blue-50 inline-block">± 0.2858 (σ)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CHART IMAGE */}
                    <div className="bg-slate-50 p-4 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-center cursor-zoom-in group relative overflow-hidden" onClick={() => setSelectedImage(widthHeightImg)}>
                      <div className="absolute top-6 left-8 bg-white backdrop-blur-sm px-4 py-2 rounded-xl font-bold text-xs text-indigo-900 border border-indigo-100 shadow-md">
                        Width & Height Dist
                      </div>
                      <img src={widthHeightImg} alt="Width Height Dist" className="max-h-[400px] w-full object-contain mix-blend-multiply group-hover:scale-[1.02] transition-transform" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2 mb-4">
                      <ImageIcon size={16} /> Visualizing Dimensional Extremes
                    </h4>
                    <div className="bg-slate-50 p-4 rounded-[2rem] border border-slate-100 shadow-sm cursor-zoom-in group" onClick={() => setSelectedImage(extremeImg)}>
                      <img src={extremeImg} alt="Extreme Images" className="w-full rounded-xl mix-blend-multiply group-hover:opacity-90 transition-opacity" />
                    </div>
                  </div>
                </SectionCard>

                {/* TEXT MODALITY EXPLORATION */}
                <SectionCard title="Text Modality Exploration" icon={<MessageSquare size={22} />}>

                  {/* OVERALL WORD TOTALS & TOP 10 */}
                  <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    <div className="bg-indigo-900 text-white p-8 rounded-[2rem] shadow-xl flex flex-col justify-center gap-6 relative overflow-hidden">
                      <div className="absolute -right-10 -bottom-10 opacity-20"><Type size={180} /></div>
                      <div>
                        <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-1">Total Words</p>
                        <p className="text-4xl font-black">1,957,129</p>
                      </div>
                      <div>
                        <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-1">Unique Lexicon</p>
                        <p className="text-4xl font-black text-emerald-400">18,285</p>
                      </div>
                    </div>

                    <div className="lg:col-span-2 bg-slate-50 border border-slate-100 p-8 rounded-[2rem]">
                      <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-6 flex items-center gap-2 text-indigo-700">
                        <Type size={16} /> Top 10 Most Common Words Overall
                      </h4>
                      <div className="flex flex-wrap gap-3 font-mono">
                        {[
                          ["a", "271,739"], ["in", "83,520"], ["the", "62,984"], ["on", "45,686"],
                          ["and", "44,299"], ["man", "42,626"], ["is", "41,117"], ["of", "38,844"],
                          ["with", "36,208"], ["women", "22,213"]
                        ].map(([w, c]) => (
                          <div key={w} className="bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm hover:border-indigo-300 transition-colors">
                            <span className="font-bold text-indigo-600 text-sm">"{w}"</span>
                            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CAPTION LENGTH STATS + IMAGES */}
                  <div className="grid lg:grid-cols-2 gap-10 mb-16">
                    <div className="space-y-6">
                      <div className="bg-white border-l-4 border-indigo-500 p-6 shadow-sm rounded-r-2xl">
                        <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-4">Caption Length Distribution</h4>
                        <ul className="text-sm text-slate-600 space-y-3 font-medium">
                          <li className="flex justify-between border-b pb-1"><span>Mean Length</span> <span className="font-black text-indigo-600">13.39 words</span></li>
                          <li className="flex justify-between border-b pb-1"><span>Maximum</span> <span className="font-black text-indigo-600">82 words</span></li>
                          <li className="flex justify-between border-b pb-1"><span>Minimum</span> <span className="font-black text-indigo-600">1 word</span></li>
                          <li className="flex justify-between pt-1">
                            <span>Majority Density</span>
                            <span className="font-black text-emerald-600 bg-emerald-50 px-2 rounded">10 to 16 words</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl cursor-zoom-in group" onClick={() => setSelectedImage(captionLenDistImg)}>
                        <img src={captionLenDistImg} alt="Length Dist" className="w-full mix-blend-multiply group-hover:opacity-80 transition-opacity" />
                      </div>
                    </div>
                    <div className="bg-slate-50 p-6 border border-slate-100 rounded-[2rem] flex items-center justify-center cursor-zoom-in group" onClick={() => setSelectedImage(captionBoxplotImg)}>
                      <img src={captionBoxplotImg} alt="Len Boxplot" className="w-full object-contain mix-blend-multiply group-hover:scale-[1.02] transition-transform" />
                    </div>
                  </div>

                  {/* WORD CLOUD IMAGE */}
                  <div className="mb-16">
                    <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2 mb-4">
                      <ImageIcon size={16} className="text-indigo-500" /> Word Cloud Distribution
                    </h4>
                    <div className="bg-slate-50 p-6 md:p-12 border border-slate-100 rounded-[2rem] flex items-center justify-center cursor-zoom-in group" onClick={() => setSelectedImage(wordCloudImg)}>
                      <img src={wordCloudImg} alt="Word Cloud" className="max-w-[700px] w-full mix-blend-multiply group-hover:scale-[1.02] transition-transform" />
                    </div>
                  </div>

                  {/* CUSTOM ANIMATED BAR CHARTS */}
                  <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                      <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-8 flex items-center gap-2">
                        <BarChart3 size={16} className="text-indigo-500" /> Stopword Frequencies (Top 20)
                      </h4>
                      <HorizontalBarChart data={stopWordsData} labelKey="word" valueKey="count" colorKey="color" maxVal={181627} />
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                      <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-8 flex items-center gap-2">
                        <BarChart3 size={16} className="text-emerald-500" /> Top TF-IDF Weighted Words
                      </h4>
                      <HorizontalBarChart data={tfidfData} labelKey="word" valueKey="score" colorKey="color" maxVal={0.187} isFloat={true} />
                    </div>
                  </div>

                  {/* N-GRAM BAR CHARTS */}
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                      <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-8 flex items-center gap-2">
                        <BarChart3 size={16} className="text-rose-500" /> Top Bigram Frequencies
                      </h4>
                      <HorizontalBarChart data={bigramsData} labelKey="word" valueKey="count" colorKey="color" maxVal={15679} />
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                      <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-8 flex items-center gap-2">
                        <BarChart3 size={16} className="text-amber-500" /> Top Trigram Frequencies
                      </h4>
                      <HorizontalBarChart data={trigramsData} labelKey="word" valueKey="count" colorKey="color" maxVal={7099} />
                    </div>
                  </div>

                </SectionCard>

              </div>
            )}


            {/* LABEL GENERATION TAB */}
            {activeTab === 'label-gen' && <GeneratingLabel setSelectedImage={setSelectedImage} />}
            
            {/* Other tabs placeholder */}
            {activeTab !== 'eda' && activeTab !== 'exploration' && activeTab !== 'label-gen' && (
              <div className="p-12 border-2 border-dashed border-slate-200 rounded-[3rem] text-center text-slate-400 bg-slate-50/50">
                <Layers size={48} className="mx-auto mb-4 opacity-20" />
                <h3 className="text-2xl font-black text-slate-500 mb-2">Section under construction</h3>
                <p>This pipeline step will be detailed in the following phases.</p>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// ─── Shared helper components used by the EDA / Exploration tabs ─────────────

const HorizontalBarChart = ({ data, labelKey, valueKey, colorKey, maxVal, isFloat }) => {
  return (
    <div className="space-y-3 font-mono">
      {data.map((item, idx) => {
        const percentage = (item[valueKey] / maxVal) * 100;
        return (
          <div key={idx} className="flex items-center gap-4 text-xs pr-12 group hover:bg-slate-50 rounded-lg p-1 transition-colors">
            <div className="w-24 text-right truncate text-slate-800 font-bold group-hover:text-indigo-600 transition-colors">
              {item[labelKey]}
            </div>
            <div className="flex-1 bg-slate-100 h-6 rounded-r-lg relative flex items-center">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.02 }}
                className={`h-full rounded-r-lg ${item[colorKey] || 'bg-indigo-500'}`}
              />
              <span className="absolute left-full ml-3 text-slate-600 font-bold whitespace-nowrap">
                {isFloat ? item[valueKey].toFixed(3) : item[valueKey].toLocaleString()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

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

const MetricItem = ({ label, value, sub, icon }) => (
  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
    {icon}
    <p className="text-[10px] uppercase font-black opacity-50 mb-1 tracking-widest text-slate-300">{label}</p>
    <p className="text-3xl font-black text-white">{value}</p>
    {sub && <p className="text-[10px] opacity-40 italic text-slate-300 mt-1">{sub}</p>}
  </div>
);



export default MultimodalClassification;

