import { Link } from 'react-router-dom';
import { ArrowRight, Youtube } from 'lucide-react';

const AssignmentCard = ({ title, description, link, presentationVideo, demoVideo }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-primary-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden group flex flex-col">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary-500 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary-600 transition-colors">
        <Link to={link} className="before:absolute before:inset-0 focus:outline-none">
          {title}
        </Link>
      </h3>
      <p className="text-slate-600 mb-6 flex-grow">{description}</p>
      
      <div className="flex flex-wrap items-center justify-between gap-4 mt-auto border-t border-slate-50 pt-4">
        <div className="flex items-center text-primary-600 font-medium">
          View Details
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
        
        {(presentationVideo || demoVideo) && (
          <div className="flex items-center gap-2 relative z-10">
            {presentationVideo && (
              <a 
                href={presentationVideo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors bg-slate-50 hover:bg-red-50 px-2.5 py-1.5 rounded-md border border-slate-200 hover:border-red-200 shadow-sm"
                title="Presentation Video"
              >
                <Youtube className="w-4 h-4" />
                Presentation
              </a>
            )}
            {demoVideo && (
              <a 
                href={demoVideo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors bg-slate-50 hover:bg-red-50 px-2.5 py-1.5 rounded-md border border-slate-200 hover:border-red-200 shadow-sm"
                title="Demo Video"
              >
                <Youtube className="w-4 h-4" />
                Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
