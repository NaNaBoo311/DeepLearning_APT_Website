import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-primary-600 hover:text-primary-800 transition">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-xl tracking-tight">APT Group</span>
          </Link>
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition ${location.pathname === '/' ? 'text-primary-600' : 'text-slate-500 hover:text-primary-500'}`}
            >
              Home
            </Link>
            <Link 
              to="/assignment1" 
              className={`text-sm font-medium transition ${location.pathname === '/assignment1' ? 'text-primary-600' : 'text-slate-500 hover:text-primary-500'}`}
            >
              Assignment 1
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
