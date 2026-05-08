import React from 'react';
import { WHO_WE_ARE_CONTENT } from '../home_content.ts';
import { Link } from 'react-router-dom';

const WhoWeAre: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-200 dark:border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Graphic */}
          <div className="lg:col-span-5 space-y-8">
             <div>
               <span className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-brand-blue/10 dark:border-slate-700 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-gold shadow-sm mb-6">
                 <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                 About Privi Education
               </span>
               <h2 className="text-4xl lg:text-5xl font-black text-brand-blue dark:text-white leading-[1.1] tracking-tight">
                 Empowering Your <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-orange-400">Global Dreams</span>
               </h2>
             </div>
             
             {/* Stats Bento Box */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-transform hover:-translate-y-1">
                   <p className="text-3xl font-black text-brand-blue dark:text-white mb-1">10k+</p>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Students Guided</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-transform hover:-translate-y-1">
                   <p className="text-3xl font-black text-brand-blue dark:text-white mb-1">50+</p>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Partner Universities</p>
                </div>
                <div className="bg-brand-blue text-white p-6 rounded-2xl shadow-lg col-span-2 relative overflow-hidden group items-center flex justify-between">
                   <div className="relative z-10">
                     <p className="text-sm font-bold text-brand-gold mb-1">Ready to start?</p>
                     <p className="text-xl font-black">Book a free session</p>
                   </div>
                   <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center relative z-10 group-hover:bg-brand-gold transition-colors">
                     <i className="fa-solid fa-arrow-right"></i>
                   </div>
                   <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                </div>
             </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-xl shadow-brand-blue/5">
             <div className="prose prose-lg dark:prose-invert">
                {WHO_WE_ARE_CONTENT.description.map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "text-xl font-medium text-brand-blue dark:text-white leading-relaxed mb-6" : "text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-6"}>
                    {paragraph}
                  </p>
                ))}
             </div>
             
             <div className="mt-10 pt-8 border-t border-gray-100 dark:border-slate-700 flex flex-wrap gap-4 items-center justify-between">
               <div className="flex -space-x-3">
                 <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-500 overflow-hidden"><img src="https://i.pravatar.cc/100?img=4" alt="user" /></div>
                 <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-500 overflow-hidden"><img src="https://i.pravatar.cc/100?img=5" alt="user" /></div>
                 <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-500 overflow-hidden"><img src="https://i.pravatar.cc/100?img=6" alt="user" /></div>
               </div>
               
               <Link to="/about" className="group px-6 py-3 bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all text-center flex items-center gap-2">
                 Read More About Us
                 <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
               </Link>
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
