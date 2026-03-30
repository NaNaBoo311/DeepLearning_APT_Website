import React, { useState } from 'react';
import { Image, Type, Layers, Users, Github, PlayCircle, Video } from 'lucide-react';
import ImageClassification from '../components/assignment1/ImageClassification';
import TextClassification from '../components/assignment1/TextClassification';
import MultimodalClassification from '../components/assignment1/MultimodalClassification';

const Assignment1 = () => {
  const [activeTab, setActiveTab] = useState('image');

  const tabs = [
    { id: 'image', label: 'Image Classification', icon: Image },
    { id: 'text', label: 'Text Classification', icon: Type },
    { id: 'multimodal', label: 'Multimodal Classification', icon: Layers },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 mt-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-bl-full -z-0 opacity-50"></div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 relative z-10">Assignment 1</h1>
        
        <div className="flex flex-wrap gap-6 text-sm text-slate-600 relative z-10 mb-6 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-full text-primary-700 font-medium">
            <Users className="w-4 h-4" />
            Group APT
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Instructor:</span> 
            Instructor Name
          </div>
        </div>

        {/* Resources Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
          <a href="#" className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-700 p-4 rounded-xl border border-slate-200 hover:border-primary-200 transition">
            <PlayCircle className="w-5 h-5 text-primary-500" />
            Demo Video (Placeholder)
          </a>
          <a href="#" className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-700 p-4 rounded-xl border border-slate-200 hover:border-primary-200 transition">
            <Video className="w-5 h-5 text-primary-500" />
            Presentation Video (Placeholder)
          </a>
          <a href="#" className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-700 p-4 rounded-xl border border-slate-200 hover:border-primary-200 transition">
            <Github className="w-5 h-5 text-primary-500" />
            Code Repository (Placeholder)
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-slate-100/50 p-1.5 rounded-2xl mb-8 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-white text-primary-600 shadow-sm border border-slate-200/50'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-primary-600' : 'text-slate-500'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'image' && <ImageClassification />}
        {activeTab === 'text' && <TextClassification />}
        {activeTab === 'multimodal' && <MultimodalClassification />}
      </div>
    </div>
  );
};

export default Assignment1;
