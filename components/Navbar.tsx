
import React, { useState, useEffect, useRef } from 'react';
import { LOGO_URL, MEGA_MENU_DATA, OFFICE_ADDRESSES, FOOTER_COLLEGES } from '../data.ts';
import { createSlug } from '../utils.ts';
import * as Flags from 'country-flag-icons/react/3x2';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  logoUrl?: string;
}

const FlagIcon = ({ code }: { code: string }) => {
  if (!code) return null;
  // Use flagcdn.com for reliable flag rendering
  // EU is supported by flagcdn
  const flagUrl = `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
  
  return (
    <img 
      src={flagUrl} 
      alt={code} 
      className="w-6 h-4 rounded shadow-sm object-cover"
      onError={(e) => {
        // Fallback to library if image fails, or just hide
        e.currentTarget.style.display = 'none';
      }}
    />
  );
};

// Helper for distance calculation
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

const TopBar: React.FC = () => {
  const [showFindUs, setShowFindUs] = useState(false);
  const [offices, setOffices] = useState(OFFICE_ADDRESSES);
  const [locating, setLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFindUs(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocateMe = () => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          // Sort offices by distance
          const sorted = [...OFFICE_ADDRESSES].map(office => {
            const dist = getDistanceFromLatLonInKm(latitude, longitude, office.lat, office.lng);
            return { ...office, distance: dist };
          }).sort((a, b) => a.distance - b.distance);

          setOffices(sorted);
          setLocating(false);
        },
        (error) => {
          console.error("Error locating user", error);
          alert("Could not access location. Please enable permissions.");
          setLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLocating(false);
    }
  };

  return (
    <div className="bg-[#01304a] py-2 border-b border-white/5 block relative z-[201]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 items-center text-white text-[10px] font-bold h-full">
        {/* Left Side: Locate Office */}
        <div className="flex items-center justify-start relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowFindUs(!showFindUs)} 
              className="flex items-center space-x-2 hover:text-brand-gold transition-colors tracking-widest uppercase bg-transparent p-0 rounded-lg whitespace-nowrap"
            >
              <Flags.IN className="w-3.5 h-auto rounded-sm" />
              <span>Locate Office</span>
              <i className={`fa-solid fa-chevron-down text-[7px] transition-transform ${showFindUs ? 'rotate-180' : ''}`}></i>
            </button>
            
            {showFindUs && (
              <div className="absolute top-full left-0 mt-3 w-64 bg-white text-brand-blue rounded-xl shadow-2xl overflow-hidden z-[300] border border-gray-100 animate-fade-in text-left">
                <div className="p-3 bg-gray-50 border-b border-gray-100">
                  <button 
                    onClick={handleLocateMe}
                    disabled={locating}
                    className="w-full flex items-center justify-center space-x-2 bg-brand-blue text-white py-2 rounded-lg text-[9px] uppercase tracking-widest hover:bg-brand-gold transition-colors disabled:opacity-70"
                  >
                    {locating ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-location-crosshairs"></i>}
                    <span>{locating ? 'Locating...' : 'Use My Location'}</span>
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {offices.map((off: any) => (
                    <Link key={off.slug} to={`/office/${off.slug}`} onClick={() => setShowFindUs(false)} className="block px-4 py-3 hover:bg-brand-gold/10 hover:text-brand-gold transition-colors border-b border-gray-50 last:border-0">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue">{off.city}</span>
                        {off.distance && <span className="text-[8px] font-bold text-gray-400">{(off.distance).toFixed(1)} km</span>}
                      </div>
                      <p className="text-[9px] text-gray-500 mt-0.5 truncate">{off.address}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>
        
        {/* Right Side: Socials & Phone */}
        <div className="flex items-center justify-end space-x-4">
          {/* Social Icons */}
          <div className="flex items-center space-x-3 text-white/80">
            <a href="https://www.facebook.com/iexplainedu" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors hover:scale-110"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/iexplain.education/" target="https://www.instagram.com/iexplain.education/" rel="noreferrer" className="hover:text-brand-gold transition-colors hover:scale-110"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.linkedin.com/company/92837677/admin/page-posts/published/1" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors hover:scale-110"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://www.youtube.com/@PriviEducation" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors hover:scale-110"><i className="fa-brands fa-youtube"></i></a>
          </div>

          <div className="h-3 w-px bg-white/10 hidden sm:block"></div>

          {/* Phone Link - Icon Only on Mobile, Full on Desktop */}
          <a href="tel:+919773847799" className="flex items-center space-x-2 hover:text-brand-gold transition-colors shrink-0">
            <i className="fa-solid fa-phone text-brand-gold text-[10px]"></i>
            <span className="tracking-widest hidden sm:inline">+91 97738 47799</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme, logoUrl }) => {
  const [activeTab, setActiveTab] = useState<keyof typeof MEGA_MENU_DATA>("STUDY ABROAD");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeCollegeTab, setActiveCollegeTab] = useState<'MBBS' | 'STUDY' | 'INDIA'>('MBBS');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileCollegeOpen, setMobileCollegeOpen] = useState<{mbbs: boolean, study: boolean, india: boolean}>({ mbbs: false, study: false, india: false });
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState<string | null>(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (menuName: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    timerRef.current = window.setTimeout(() => setActiveMenu(null), 200);
  };

  const sidebarIcons: Record<string, string> = {
    "STUDY ABROAD": "fa-solid fa-earth-americas",
    "MBBS ABROAD": "fa-solid fa-stethoscope",
    "STUDY IN INDIA": "fa-solid fa-building-columns",
    "ENTRANCE EXAMS": "fa-solid fa-file-signature"
  };

  const navLinks = ['HOME', 'ABOUT', 'SERVICES', 'MBBS ABROAD', 'MBBS INDIA', 'STUDY ABROAD', 'CONTACT'];

  const getSubPages = (name: string) => {
    if (name === 'MBBS ABROAD') return ['Study in Russia', 'Study in Georgia', 'Study in Kazakhstan', 'Study in Kyrgyzstan', 'Study in Egypt'];
    if (name === 'MBBS INDIA') return ['Study in Karnataka', 'Study in Maharashtra', 'Study in UP', 'Study in Delhi', 'Study in Kerala'];
    if (name === 'STUDY ABROAD') return ['Study in UK', 'Study in USA', 'Study in Australia', 'Study in Canada'];
    return [];
  };

  return (
    <div className="sticky top-0 z-[200] w-full bg-brand-blue shadow-md border-b border-white/10">
      <TopBar />
      <nav className="relative h-20 w-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
          <div className="flex-shrink-0 cursor-pointer w-[140px] md:w-[180px]" onClick={() => navigate('/')}>
            <img src={logoUrl || LOGO_URL} alt="Privi" className="h-10 md:h-12 w-auto brightness-0 invert" />
          </div>

          <div className="hidden lg:flex flex-grow justify-center h-full items-center space-x-6 xl:space-x-8">
            {navLinks.map(name => {
              const hasDropdown = ['MBBS ABROAD', 'MBBS INDIA', 'STUDY ABROAD'].includes(name);
              const isClickable = name === 'HOME';
              
              return (
              <div key={name} className="h-20 flex items-center relative group" 
                onMouseEnter={hasDropdown ? () => handleMouseEnter(name) : undefined} 
                onMouseLeave={hasDropdown ? handleMouseLeave : undefined}>
                <Link to={isClickable ? '/' : (hasDropdown ? '#' : `/${name.toLowerCase().replace(/ /g, '-')}`)} 
                  onClick={(e) => hasDropdown && e.preventDefault()}
                  className={`text-[11px] font-bold tracking-[0.12em] transition-all py-2 border-b-2 border-transparent hover:border-brand-gold text-white ${hasDropdown ? 'cursor-default opacity-80 hover:opacity-100' : ''}`}>
                  {name} {hasDropdown && <i className="fa-solid fa-chevron-down ml-1.5 text-[8px]"></i>}
                </Link>
                
                {hasDropdown && activeMenu === name && (
                  <div className="absolute top-20 left-0 w-64 bg-white shadow-xl rounded-xl overflow-hidden py-2 animate-fade-in z-[300]">
                    {getSubPages(name).map((sub, i) => {
                      const sectionPath = name === 'MBBS INDIA' ? 'study-india' : name.toLowerCase().replace(/ /g, '-');
                      const subPath = createSlug(sub.replace('Study in ', '').replace('Study ', ''));
                      return (
                        <Link key={i} to={`/${sectionPath}/${subPath}`} onClick={() => setActiveMenu(null)} className="block px-6 py-3 text-sm font-bold text-brand-blue hover:bg-brand-gold/10 hover:text-brand-gold transition-colors">
                          {sub}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )})}
          </div>

          <div className="flex items-center space-x-4 w-auto lg:w-[180px] justify-end flex-shrink-0">
            <button onClick={toggleTheme} className="hidden sm:flex w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/20">
              <i className={`fa-solid ${isDarkMode ? 'fa-sun text-sm' : 'fa-moon text-sm'}`}></i>
            </button>
            <Link to="/contact" className="hidden sm:inline-block px-6 py-2.5 bg-brand-gold text-brand-blue rounded-xl font-bold text-[11px] tracking-widest uppercase hover:bg-white transition-all shadow-md active:scale-95">ENROLL NOW</Link>
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[400] bg-brand-blue overflow-y-auto lg:hidden animate-fade-in pb-20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
               <div className="w-[140px]">
                 <img src={logoUrl || LOGO_URL} alt="Logo" className="w-full h-auto brightness-0 invert" />
               </div>
               <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                 <i className="fa-solid fa-xmark text-xl"></i>
               </button>
            </div>
            
            <div className="space-y-2">
              {navLinks.map(name => {
                const hasDropdown = ['MBBS ABROAD', 'MBBS INDIA', 'STUDY ABROAD'].includes(name);
                const isClickable = name === 'HOME';
                const isExpanded = mobileExpandedMenu === name;

                return (
                  <div key={name} className="border-b border-white/10">
                    <button 
                      onClick={() => {
                        if (hasDropdown) {
                          setMobileExpandedMenu(isExpanded ? null : name);
                        } else if (!hasDropdown) {
                          navigate(`/${name.toLowerCase().replace(/ /g, '-')}`);
                          setIsMobileMenuOpen(false);
                        } else if (isClickable) {
                          navigate('/');
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      className={`w-full flex items-center justify-between py-4 text-lg font-black uppercase tracking-tight transition-colors text-white ${hasDropdown ? 'hover:text-brand-gold' : 'hover:text-brand-gold'} ${isExpanded ? 'text-brand-gold' : ''}`}
                    >
                      <span>{name}</span>
                      {hasDropdown && <i className={`fa-solid fa-chevron-down text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}></i>}
                    </button>

                    {hasDropdown && isExpanded && (
                      <div className="pb-4 animate-fade-in pl-4 space-y-3">
                        {getSubPages(name).map((sub, i) => {
                          const sectionPath = name === 'MBBS INDIA' ? 'study-india' : name.toLowerCase().replace(/ /g, '-');
                          const subPath = createSlug(sub.replace('Study in ', '').replace('Study ', ''));
                          return (
                           <Link key={i} to={`/${sectionPath}/${subPath}`} onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-bold text-white/70 hover:text-white transition-colors py-2">
                             {sub}
                           </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              
              <div className="pb-8 pt-8">
                <Link to="#" onClick={e=>e.preventDefault()} className="block w-full py-5 bg-brand-gold text-brand-blue text-center rounded-2xl font-black uppercase tracking-widest shadow-xl">
                  ENROLL NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
