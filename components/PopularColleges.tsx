
import React, { useState, useEffect, useRef } from 'react';
import { POPULAR_COLLEGES, COUNTRY_ICONS } from '../data.ts';
import * as Flags from 'country-flag-icons/react/3x2';

const PopularColleges: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('Russia');
  const scrollRef = useRef<HTMLDivElement>(null);

  // We are asked to show ONLY dummy MBBS abroad colleges
  const colleges = POPULAR_COLLEGES.filter(c => c.category === 'MBBS Abroad');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (scrollRef.current && window.innerWidth < 768) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
          }
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, []);

  const availableCountries = Object.entries(COUNTRY_ICONS).filter(([countryName]) =>
    colleges.some(c => c.country === countryName)
  );

  const filteredColleges = colleges.filter(c => c.country === selectedCountry);
  const hasContent = availableCountries.length > 0;

  return (
    <section className="py-12 bg-white dark:bg-slate-900 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-brand-gold font-bold uppercase tracking-[0.12em] text-[11px] block mb-2">Universities</span>
          <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-brand-blue dark:text-white mb-6 tracking-tight">
            Our <span className="text-brand-gold italic">Partners</span>
          </h2>
          <div className="w-16 h-1 bg-brand-gold mb-8 mx-auto rounded-full"></div>
        </div>

        {hasContent && (
          <>
            {/* Country Selector */}
            <div className="relative mb-12">
              <div ref={scrollRef} className="flex items-center justify-start md:justify-center space-x-8 overflow-x-auto no-scrollbar pb-6 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {availableCountries.map(([countryName, flagCode]) => {
                  const FlagComponent = Flags[flagCode as keyof typeof Flags];
                  const isSelected = selectedCountry === countryName;
                  return (
                    <button
                      key={countryName}
                      onClick={() => setSelectedCountry(countryName)}
                      className={`flex flex-col items-center shrink-0 group transition-all snap-center ${
                        isSelected ? 'scale-110' : 'hover:scale-105'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all overflow-hidden ${
                        isSelected
                          ? 'bg-brand-gold shadow-xl shadow-brand-gold/20'
                          : 'bg-gray-100 dark:bg-slate-800 group-hover:grayscale'
                      }`}>
                        {FlagComponent
                          ? <FlagComponent className="w-8 h-8" />
                          : <span className="text-xs font-bold">{flagCode}</span>
                        }
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                        isSelected ? 'text-brand-gold' : 'text-gray-500 group-hover:text-gray-400'
                      }`}>
                        {countryName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* College Cards */}
            {filteredColleges.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in">
                {filteredColleges.map((college, i) => (
                  <div
                    key={college.id ?? i}
                    className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-gold hover:-translate-y-1 transition-all duration-300 border border-brand-blue/10 dark:border-slate-700 flex flex-col mx-auto w-full max-w-[300px]"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={college.image}
                        alt={college.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=1200";
                        }}
                      />
                    </div>
                    <div className="p-3 sm:p-5 text-center bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-700 mt-auto min-h-[60px] sm:min-h-[80px] flex items-center justify-center">
                      <h3 className="text-xs sm:text-sm font-bold text-brand-blue dark:text-white line-clamp-2">
                        {college.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};

export default PopularColleges;
