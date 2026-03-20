import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AssignmentCard = ({ title, description, link }) => {
  return (
    <Link to={link} className="block group">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-primary-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary-500 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary-600 transition-colors">{title}</h3>
        <p className="text-slate-600 mb-6">{description}</p>
        <div className="flex items-center text-primary-600 font-medium">
          View Details
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default AssignmentCard;
