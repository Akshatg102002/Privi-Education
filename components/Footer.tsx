
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LOGO_URL, 
  FOOTER_COLLEGES,
  OFFICE_ADDRESSES 
} from '../data.ts';
import { createSlug } from '../utils.ts';

interface FooterProps {
  logoUrl?: string;
  helpline?: string;
  email?: string;
}

const Footer: React.FC<FooterProps> = ({ logoUrl, helpline, email }) => {
  const mbbsCountries = FOOTER_COLLEGES.mbbs.map(c => c.country);
  const studyCountries = FOOTER_COLLEGES.study.map(c => c.country);

  return (
    <footer className="font-sans border-t-4 border-brand-gold bg-brand-blue transition-colors text-white">
      
      {/* PART 1: Links & Colleges (Navy Background) */}
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Row: Brand, Top Countries, Quick Links */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16 border-b border-brand-gold/30 pb-12">
            
            {/* Column 1: Brand Info */}
            <div className="space-y-6">
                <img src={logoUrl || LOGO_URL} alt="Privi Education" className="h-10 w-auto brightness-0 invert" />
                <p className="text-xs text-white/70 font-medium leading-relaxed max-w-xs">
                Privi Education is a trusted source for authentic educational guidance. From admission-related help to e-learning resources, it ensures that students receive all the help they need.
                </p>
                <div className="space-y-3 pt-2">
                <div className="flex items-center text-xs font-bold text-white group cursor-pointer">
                    <i className="fa-solid fa-envelope text-brand-gold w-6"></i>
                    <span className="group-hover:text-brand-gold transition-colors">{email || 'info@privieducation.in'}</span>
                </div>
                <div className="flex items-center text-xs font-bold text-white group cursor-pointer">
                    <i className="fa-solid fa-phone text-brand-gold w-6"></i>
                    <span className="group-hover:text-brand-gold transition-colors">{helpline || '+91-9311431007'}</span>
                </div>
                </div>
            </div>

            {/* Column 2: Top MBBS Countries */}
            <div>
                <h4 className="font-playfair text-lg text-white mb-6 border-b border-brand-gold/50 inline-block pb-1">Top MBBS Abroad Countries</h4>
                <ul className="space-y-3">
                {mbbsCountries.map((country) => (
                    <li key={country}>
                    <Link to={`/mbbs-abroad/${createSlug(country)}`} className="text-sm font-medium text-white/60 hover:text-brand-gold hover:pl-1 transition-all block">
                        {country}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            {/* Column 3: Top Study Abroad Countries */}
            <div>
                <h4 className="font-playfair text-lg text-white mb-6 border-b border-brand-gold/50 inline-block pb-1">Top Study Abroad Countries</h4>
                <ul className="space-y-3">
                {studyCountries.map((country) => (
                    <li key={country}>
                    <Link to={`/study-abroad/${createSlug(country)}`} className="text-sm font-medium text-white/60 hover:text-brand-gold hover:pl-1 transition-all block">
                        {country}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            {/* Column 4: Map */}
            <div className="bg-white/5 p-2 rounded-[2rem] border border-brand-gold/30 h-64 overflow-hidden relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827184275!2d77.2065322!3d28.6289017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1689613765239!5m2!1sen!2sin" 
                  className="w-full h-full rounded-[1.5rem] grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute bottom-4 left-4 bg-brand-blue/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold text-white shadow-sm pointer-events-none border border-brand-gold/30">
                   Head Office
                </div>
            </div>
            </div>
        </div>
      </div>

      {/* Copyright */}
       <div className="bg-black/20 py-8 text-center border-t border-brand-gold/20">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">© 2025 Privi Education. Shaping Global Futures.</p>
       </div>
    </footer>
  );
};

export default Footer;
