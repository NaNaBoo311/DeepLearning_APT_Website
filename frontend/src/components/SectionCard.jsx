const SectionCard = ({ title, icon: Icon, children }) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="border-b border-primary-50 bg-primary-50/50 px-6 py-4 flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-primary-500" />}
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </section>
  );
};

export default SectionCard;
