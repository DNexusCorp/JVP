import React, { useState } from 'react';
import { Home, ChevronDown, Sparkles, Tag, ArrowRight, Menu, X } from 'lucide-react';

export const Navbar = ({
  currentView,
  activeCategory,
  onNavigate,
}) => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    {
      name: 'SPIRITUAL PRODUCTS',
      slug: 'malas-japa',
      subItems: [
        { title: 'Holy Japa Malas', desc: 'Tulasi, Karungali & Rudraksha beads for daily chanting', slug: 'malas-japa' },
        { title: 'Spiritual Wrist Bracelets', desc: 'Protective planetary wrist wear and sacred threads', slug: 'bracelets' },
        { title: 'Conscious Books & Vedic Stotras', desc: 'Authentic scriptures with accurate meanings', slug: 'spiritual-books' }
      ]
    },
    {
      name: 'VASTU PRODUCTS',
      slug: 'vastu-products',
      subItems: [
        { title: 'Jalasthana Vastu Perumal', desc: 'North-East water guardian for harmony and growth', slug: 'vastu-products' },
        { title: '24K Gold Plated Sri Yantras', desc: 'Maha Meru & Copper Yantras for perennial prosperity', slug: 'vastu-products' }
      ]
    },
    {
      name: 'PUJA ESSENTIALS',
      slug: 'puja-essentials',
      subItems: [
        { title: 'Brass Thali & Aarti Sets', desc: 'Engraved pure virgin brass altar essentials', slug: 'puja-essentials' },
        { title: 'Gomukhi Japa Bags', desc: 'Concealed velvet bags with golden zari embroidery', slug: 'puja-essentials' },
        { title: 'Pure Sandalwood & Dhoop', desc: 'Chemical-free aromatic flora incense sticks', slug: 'incense-dhoop' }
      ]
    },
    {
      name: 'IDOLS',
      slug: 'idols-murthis',
      subItems: [
        { title: 'Lord Ganesha Murthis', desc: 'Obstacle remover for home entrance and puja mandir', slug: 'idols-murthis' },
        { title: 'Consecrated Deities', desc: 'Panchaloha and cast brass idols consecrated with havan', slug: 'idols-murthis' }
      ]
    },
    {
      name: 'MALAS & JAPA',
      slug: 'malas-japa',
      subItems: [
        { title: '108 Tulasi Beads Mala', desc: 'Original Vrindavan holy wood with guru bead', slug: 'malas-japa' },
        { title: 'Original Karungali Ebony Mala', desc: 'Siddha-blessed Mars pacifier and shield', slug: 'malas-japa' },
        { title: 'Nepali Rudraksha & Sphatik', desc: '5 Mukhi and ice-clear quartz crystal malas', slug: 'malas-japa' }
      ]
    },
    {
      name: 'BOOKS',
      slug: 'spiritual-books',
      subItems: [
        { title: 'Shrimad Bhagavad Gita', desc: 'Deluxe gold-embossed edition with Sanskrit & English', slug: 'spiritual-books' },
        { title: 'Vedic Stotra & Sahasranama', desc: 'Daily prayer manuals with guidance', slug: 'spiritual-books' }
      ]
    },
    {
      name: 'OFFERS',
      slug: 'offers',
      isOffer: true
    }
  ];

  return (
    <nav className="bg-[#00254d] border-t border-[#003b73] text-white select-none relative z-30 shadow-sm overflow-visible">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 lg:px-20 overflow-visible">
        <div className="flex items-center justify-between py-0 overflow-visible relative">
          
          {/* Home Icon */}
          <button
            onClick={() => {
              onNavigate('home');
              setHoveredMenu(null);
            }}
            className={`py-3 px-3 transition-colors duration-200 flex items-center hover:text-[#fdc34d] cursor-pointer ${
              currentView === 'home' && !activeCategory ? 'text-[#fdc34d]' : 'text-white/90'
            }`}
            title="Home"
            id="nav-home-btn"
          >
            <Home className="w-4 h-4" />
          </button>

          {/* Desktop Nav Categories - overflow visible so dropdown floats cleanly over page */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4 xl:space-x-6 text-[13px] tracking-wide font-medium overflow-visible">
            {navItems.map((item) => {
              const isCurrent = activeCategory === item.slug;
              const isHovered = hoveredMenu === item.name;

              return (
                <div
                  key={item.name}
                  className="relative overflow-visible"
                  onMouseEnter={() => setHoveredMenu(item.name)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button
                    onClick={() => {
                      if (item.isOffer) {
                        onNavigate('shop', 'offers');
                      } else {
                        onNavigate('shop', item.slug);
                      }
                      setHoveredMenu(null);
                    }}
                    className={`py-3 px-2 flex items-center gap-1 transition-all duration-200 uppercase font-semibold cursor-pointer ${
                      item.isOffer
                        ? 'text-[#FFF3B0] hover:text-[#D4AF37] font-bold flex items-center gap-1.5'
                        : isCurrent
                        ? 'text-[#FFF3B0] border-b-2 border-[#D4AF37]'
                        : 'text-white/90 hover:text-[#FFF3B0]'
                    }`}
                    id={`nav-item-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    {item.isOffer && <Tag className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />}
                    <span className="whitespace-nowrap">{item.name}</span>
                    {item.subItems && (
                      <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${isHovered ? 'rotate-180 text-[#D4AF37]' : ''}`} />
                    )}
                  </button>

                  {/* Standard Floating Dropdown Menu (no clipping, clean floating outside header) */}
                  {item.subItems && isHovered && (
                    <div 
                      className="absolute left-0 top-full mt-0 w-80 bg-white text-[#191c1e] rounded-b-md shadow-2xl border-t-2 border-[#D4AF37] border-x border-b border-gray-200 p-3 z-50 animate-fadeIn pointer-events-auto"
                      style={{ filter: 'drop-shadow(0 15px 25px rgba(9, 34, 63, 0.25))' }}
                    >
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#09223F] px-2 pb-2 border-b border-gray-100 flex items-center justify-between">
                        <span>{item.name}</span>
                        <span className="text-[#D4AF37] text-[10px] font-bold">Pure & Energized</span>
                      </div>
                      <div className="space-y-1.5 pt-2">
                        {item.subItems.map((sub, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              onNavigate('shop', sub.slug);
                              setHoveredMenu(null);
                            }}
                            className="p-2 rounded hover:bg-sky-50/80 cursor-pointer transition-colors group/sub"
                          >
                            <p className="text-xs font-bold text-[#09223F] group-hover/sub:text-[#005B82] flex items-center justify-between">
                              {sub.title}
                              <ArrowRight className="w-3 h-3 text-[#09223F] opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                            </p>
                            <p className="text-[11px] text-gray-500 line-clamp-1">{sub.desc}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-100 text-center">
                        <button
                          onClick={() => {
                            onNavigate('shop', item.slug);
                            setHoveredMenu(null);
                          }}
                          className="text-xs font-semibold text-[#09223F] hover:text-[#005B82] hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          View All in {item.name} →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center py-2">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-1.5 text-white/90 hover:text-white rounded hover:bg-[#003b73]"
              aria-label="Toggle navigation menu"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileNavOpen && (
          <div className="md:hidden py-3 border-t border-[#003b73] space-y-2 animate-fadeIn bg-[#00254d]">
            {navItems.map((item) => (
              <div key={item.name} className="px-2">
                <button
                  onClick={() => {
                    if (item.isOffer) {
                      onNavigate('shop', 'offers');
                    } else {
                      onNavigate('shop', item.slug);
                    }
                    setMobileNavOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 text-xs font-bold uppercase rounded hover:bg-[#003b73] text-white flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  {item.isOffer && <Tag className="w-3.5 h-3.5 text-[#fdc34d]" />}
                </button>
                {item.subItems && (
                  <div className="pl-4 py-1 space-y-1">
                    {item.subItems.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onNavigate('shop', sub.slug);
                          setMobileNavOpen(false);
                        }}
                        className="w-full text-left py-1 text-[11px] text-gray-300 hover:text-[#fdc34d]"
                      >
                        • {sub.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </nav>
  );
};
