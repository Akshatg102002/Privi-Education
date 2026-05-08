
import React from 'react';
import { HOW_IT_WORKS_CONTENT } from '../home_content.ts';

interface RoadmapProps {
  onBookSession?: () => void;
}

const Roadmap: React.FC<RoadmapProps> = ({ onBookSession }) => {
  return (
    <section className="py-12 bg-brand-light dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold uppercase tracking-[0.12em] text-[11px] block mb-2">Process</span>
          <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-brand-blue dark:text-white mb-4 tracking-tight">How It <span className="text-brand-gold italic">Works</span></h2>
          <p className="text-sm text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed mb-4 text-center">Your Overseas Education Journey Simplified</p>
          <div className="w-12 h-1 bg-brand-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {HOW_IT_WORKS_CONTENT.map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row bg-white dark:bg-slate-800 rounded-xl p-8 border border-brand-blue/10 dark:border-slate-700 hover:border-brand-gold hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden shadow-sm items-center">
              {/* Subtle Background Step Text */}
              <div className="absolute top-4 left-6 text-6xl font-black text-brand-blue/5 dark:text-white/5 pointer-events-none select-none transition-colors group-hover:text-brand-gold/10 uppercase tracking-tighter">
                STEP {item.step}
              </div>

              {/* Step Left Indicator */}
              <div className="shrink-0 flex flex-col items-center mb-4 md:mb-0 md:mr-6 relative z-10">
                <div className="text-[10px] font-black text-black dark:text-gray-300 uppercase tracking-[0.2em] mb-3">
                  STEP <span className="text-2xl block text-black dark:text-white group-hover:text-brand-gold transition-colors">{item.step}</span>
                </div>
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-xl text-brand-gold transition-all group-hover:bg-brand-gold group-hover:text-white shadow-sm">
                  <i className={item.icon}></i>
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-grow relative z-10">
                <h3 className="text-lg font-playfair font-bold text-brand-blue dark:text-white mb-2 transition-colors text-center md:text-left">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed text-center md:text-left">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={onBookSession}
            className="px-10 py-4 bg-brand-blue text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-blue/90 hover:-translate-y-1 transition-all shadow-md"
          >
            Book Your Flight To Study Abroad
          </button>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
