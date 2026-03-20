const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          Deep Learning Course Project &bull; Group APT &bull; {new Date().getFullYear()}
        </p>
        <p className="text-xs mt-2 text-slate-500">
          Built with React, Tailwind CSS, and FastAPI
        </p>
      </div>
    </footer>
  );
};

export default Footer;
