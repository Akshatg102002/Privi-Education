import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  onBookSession: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookSession }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gray-50 dark:bg-slate-900 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white dark:bg-slate-800 border border-brand-blue/10 dark:border-slate-700 rounded-full mb-8 shadow-sm">
              <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></div>
              <span className="text-brand-blue dark:text-brand-gold font-bold text-[10px] uppercase tracking-[0.15em]">Shape your future today</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-brand-blue dark:text-white leading-[1.1] mb-6 tracking-tight">
              Unlock Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-orange-400">Global Potential</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium mb-10 max-w-xl leading-relaxed">
              We specialize in MBBS India, MBBS Abroad, and Study Abroad programs, guiding ambitious students toward the best universities worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={onBookSession}
                className="px-8 py-4 bg-brand-blue dark:bg-brand-gold text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:-translate-y-1 transition-all shadow-xl shadow-brand-blue/20 dark:shadow-brand-gold/20 flex items-center justify-center gap-3 group"
              >
                Start Your Journey
                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
              <Link 
                to="/services"
                className="px-8 py-4 bg-white dark:bg-slate-800 text-brand-blue dark:text-white rounded-xl font-bold text-[11px] uppercase tracking-widest border border-gray-200 dark:border-slate-700 hover:border-brand-gold dark:hover:border-brand-gold hover:-translate-y-1 transition-all shadow-sm flex items-center justify-center"
              >
                Explore Programs
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
               <div className="flex -space-x-4">
                 <img src="https://i.pravatar.cc/100?img=1" className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-900 object-cover" alt="Student" />
                 <img src="https://i.pravatar.cc/100?img=2" className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-900 object-cover" alt="Student" />
                 <img src="https://i.pravatar.cc/100?img=3" className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-900 object-cover" alt="Student" />
                 <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-900 bg-brand-gold flex items-center justify-center text-white font-bold text-xs">
                   10k+
                 </div>
               </div>
               <div className="text-sm font-bold text-gray-500 dark:text-gray-400">
                 Trusted by students <br/><span className="text-brand-blue dark:text-white">worldwide</span>
               </div>
            </div>
          </div>
          
          <div className="relative mt-10 lg:mt-0 p-4">
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-brand-gold rounded-[2rem] transform rotate-3 scale-105 opacity-20 dark:opacity-40 blur-lg"></div>
             <img 
               src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000" 
               alt="Students studying" 
               className="relative z-10 w-full h-[400px] sm:h-[500px] object-cover rounded-[2rem] shadow-2xl border border-white/50 dark:border-slate-700/50"
             />
             
             {/* Floating Badge */}
             <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-xl border border-brand-blue/5 dark:border-slate-700 flex items-center gap-4 animate-bounce">
                <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-500 flex items-center justify-center rounded-xl text-xl shrink-0">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Success Rate</p>
                  <p className="text-xl font-bold text-brand-blue dark:text-white">98.5%</p>
                </div>
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
