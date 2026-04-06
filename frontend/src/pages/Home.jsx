import { Link } from 'react-router-dom';
import AssignmentCard from '../components/AssignmentCard';
import { Users, User, Mail, GraduationCap, Github } from 'lucide-react';

const Home = () => {
  const members = [
    { name: "Phạm Nam An", id: "2352016", email: "an.pham3101@hcmut.edu.vn" },
    { name: "Cao Thanh Bằng", id: "2352114", email: "bang.caothanh455@hcmut.edu.vn" },
    { name: "Phạm Hồng Phát", id: "2352899", email: "phat.phamhong@hcmut.edu.vn" },
    { name: "Trương Anh Phan", id: "2352881", email: "phan.truongbraddock@hcmut.edu.vn" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-br from-primary-50 to-white rounded-3xl border border-primary-100 shadow-sm mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 blur-2xl pointer-events-none">
          <div className="w-64 h-64 bg-primary-400 rounded-full mix-blend-multiply"></div>
        </div>
        <div className="absolute bottom-0 left-0 p-8 opacity-10 blur-2xl pointer-events-none">
          <div className="w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply"></div>
        </div>

        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4 relative z-10">
          Deep Learning Course
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 relative z-10">
          A collection of assignments, demonstrations, and reports by Group APT.
        </p>
        <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm text-primary-700 font-medium border border-primary-100 relative z-10 cursor-default hover:bg-primary-50 transition">
          <GraduationCap className="w-5 h-5 text-primary-500" />
          Instructor: Lê Thành Sách
        </div>
      </div>

      {/* Group Info Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary-100 text-primary-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Group APT</h2>
            <p className="text-slate-500">Project Members</p>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-50/50 border-b border-primary-100">
                <th className="py-4 px-6 font-semibold text-slate-700">Name</th>
                <th className="py-4 px-6 font-semibold text-slate-700">ID</th>
                <th className="py-4 px-6 font-semibold text-slate-700">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((member, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-slate-800 group-hover:text-primary-600 transition-colors">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded text-slate-600">{member.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-slate-600">
                      <Mail className="w-4 h-4 mr-2 text-primary-400" />
                      <a href={`mailto:${member.email}`} className="hover:text-primary-600 transition-colors">{member.email}</a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignments Section */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Assignments</h2>
          <a
            href="https://github.com/NaNaBoo311/DeepLearning_APT_Website"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-xl transition-colors border border-slate-200 hover:border-slate-300 bg-white shadow-sm"
          >
            <Github className="w-5 h-5" />
            <span className="font-medium text-sm hidden sm:inline">Code Repository</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AssignmentCard
            title="Assignment 1"
            description="Exploratory Data Analysis, Data Loading, Model Training, and Evaluation."
            link="/assignment1"
            presentationVideo="https://www.youtube.com/watch?v=7Nzk_OxPINg"
            demoVideo="https://www.youtube.com/watch?v=rHvpSYWHlHk"
          />
          {/* Add more assignment cards here as needed in the future */}
        </div>
      </div>
    </div>
  );
};

export default Home;
