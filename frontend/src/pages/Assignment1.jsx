import { Users, FileText, Database, Settings, BarChart2, Lightbulb, PlayCircle, Video, Github } from 'lucide-react';
import SectionCard from '../components/SectionCard';

const Assignment1 = () => {
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

      {/* Report Content */}
      <div className="space-y-8">
        <SectionCard title="1. Exploratory Data Analysis (EDA)" icon={FileText}>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p><strong>Overview:</strong> This section contains the problem description and our initial exploration of the dataset.</p>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl border-dashed">
              <p className="text-center text-slate-400 font-medium">[ Content Placeholder for EDA Charts and Analysis ]</p>
            </div>
            <p>During the EDA phase, we identified key distributions and imbalances that informed our preprocessing strategies.</p>
          </div>
        </SectionCard>

        <SectionCard title="2. Dataset, DataLoader & Augmentation" icon={Database}>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p><strong>Setup:</strong> Detailed explanation of the dataset splitting, custom DataLoader implementation, and data augmentation techniques applied to prevent overfitting.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Training Set: 80%</li>
              <li>Validation Set: 10%</li>
              <li>Test Set: 10%</li>
              <li>Augmentations: Random Crop, Horizontal Flip, Color Jitter</li>
            </ul>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl border-dashed">
              <p className="text-center text-slate-400 font-medium">[ Content Placeholder for Code Snippets or Examples ]</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="3. Model Building, Training, & Evaluation" icon={Settings}>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p><strong>Architecture & Pipeline:</strong> Description of the model architectures tested, hyperparameter tuning, loss functions, and the training loop.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                 <h4 className="font-semibold text-slate-800 mb-2">Model 1: Baseline</h4>
                 <p className="text-sm">Simple CNN architecture with 3 convolutional blocks and 2 fully connected layers.</p>
               </div>
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                 <h4 className="font-semibold text-slate-800 mb-2">Model 2: Improved</h4>
                 <p className="text-sm">ResNet based architecture with pre-trained weights fine-tuned on our dataset.</p>
               </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="4. Experimental Results" icon={BarChart2}>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p><strong>Analysis:</strong> Tables, figures, analysis of the training curves, test metrics, and detailed discussion on the performance comparison between models.</p>
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-xl border-dashed flex flex-col items-center justify-center min-h-[200px]">
              <div className="w-full max-w-md h-32 bg-slate-200 rounded-lg animate-pulse mb-4"></div>
              <p className="text-center text-slate-400 font-medium">[ Content Placeholder for Results Table and Graphs ]</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="5. Extensions & Future Work" icon={Lightbulb}>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
             <p><strong>Other Reports:</strong> Any additional experiments conducted outside the standard scope.</p>
             <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Deployment test using FastAPI backend</li>
              <li>Inference speed optimization analysis</li>
             </ul>
             <p className="text-sm italic text-slate-500 mt-4">Note: Content to be updated during finalizing report.</p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default Assignment1;
