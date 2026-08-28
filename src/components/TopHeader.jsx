import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, Truck, ShoppingCart, Search, ShieldCheck, Package, Heart, Sparkles, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const TopHeader = ({
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onSelectProduct,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const filteredSuggestions = searchQuery.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.deity && p.deity.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchSubmit(searchQuery);
      setShowSuggestions(false);
    }
  };

  return (
    <header className="w-full bg-[#00254d] text-white shadow-md sticky top-0 z-50">
      {/* Top Utility Bar */}
      <div className="bg-white text-[#191c1e] text-xs py-2 px-4 md:px-12 lg:px-20 border-b border-[#e0e3e5]">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center flex-wrap gap-2">
          {/* Left contact info */}
          <div className="flex items-center gap-4 text-[#434750]">
            <a 
              href="tel:+917418208067" 
              className="flex items-center gap-1.5 hover:text-[#00254d] transition-colors"
              id="header-phone-link"
            >
              <Phone className="w-3.5 h-3.5 text-[#00254d]" />
              <span className="font-medium">+91 74182 08067</span>
            </a>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <a 
              href="mailto:support@jvpspirituals.com" 
              className="hidden sm:flex items-center gap-1.5 hover:text-[#00254d] transition-colors"
              id="header-email-link"
            >
              <Mail className="w-3.5 h-3.5 text-[#00254d]" />
              <span>support@jvpspirituals.com</span>
            </a>
          </div>

          {/* Right quick links */}
          <div className="flex items-center gap-4 md:gap-6 font-medium">
            <button 
              onClick={() => onNavigate('track-order')}
              className="flex items-center gap-1 hover:text-[#00254d] transition-colors cursor-pointer"
              id="header-track-order-btn"
            >
              <Truck className="w-3.5 h-3.5 text-[#00254d]" />
              <span>Track Order</span>
            </button>

            <button 
              onClick={() => onNavigate('wishlist')}
              className="flex items-center gap-1 hover:text-[#00254d] transition-colors cursor-pointer relative"
              id="header-wishlist-btn"
            >
              <Heart className="w-3.5 h-3.5 text-rose-600" />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full ml-0.5">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => onNavigate('puja-guide')}
              className="hidden sm:flex items-center gap-1.5 hover:bg-[#D4AF37] hover:text-[#09223F] text-[#09223F] bg-[#FFF3B0]/90 px-2.5 py-1 rounded-full border border-[#D4AF37] transition-all duration-200 cursor-pointer shadow-xs font-semibold"
              id="header-advisor-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] font-bold tracking-wide">Divine Recommendation</span>
            </button>

            <button 
              onClick={onOpenCart}
              className="flex items-center gap-1.5 hover:text-[#00254d] text-[#00254d] font-bold transition-colors cursor-pointer"
              id="header-cart-btn"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart ({cartCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Logo & Search Bar */}
      <div className="bg-white text-[#191c1e] py-3.5 px-4 md:px-12 lg:px-20">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center gap-4 md:gap-8">
          
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="cursor-pointer flex items-center gap-3 group select-none"
            id="brand-logo-container"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] to-[#00254d] shadow-sm flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-all">
              <img 
                src="/animated-logo.png" 
                alt="JVP Spirituals Emblem" 
                className="w-full h-full object-contain rounded-full bg-white p-0.5 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-2xl md:text-3xl text-[#00254d] tracking-[0.18em] leading-tight group-hover:text-[#003b73] transition-colors">
                JVP
              </span>
              <span className="text-[10px] md:text-[11px] font-medium tracking-[0.3em] text-[#7b5800] -mt-1 uppercase">
                Spirituals
              </span>
            </div>
          </div>

          {/* Search Bar with Live Predictive Autocomplete */}
          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            <div className="flex w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                placeholder="Search for Tulasi mala, Karungali, Brass Idols, Yantras..."
                className="w-full px-4 py-2 text-sm border border-[#c3c6d1] rounded-l focus:outline-none focus:border-[#00254d] focus:ring-1 focus:ring-[#00254d] bg-[#f7f9fb] transition-all"
                id="main-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => {
                  onSearchSubmit(searchQuery);
                  setShowSuggestions(false);
                }}
                className="bg-[#00254d] text-white px-5 py-2 rounded-r hover:bg-[#003b73] transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                id="main-search-submit-btn"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-lg shadow-2xl border border-gray-200 z-[60] overflow-hidden divide-y divide-gray-100">
                <div className="p-2 bg-gray-50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Suggested Divine Products
                </div>
                {filteredSuggestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectProduct(item);
                      setShowSuggestions(false);
                    }}
                    className="flex items-center gap-3 p-2.5 hover:bg-sky-50 cursor-pointer transition-colors"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-10 h-10 object-contain rounded bg-gray-50 border p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#00254d] truncate">{item.name}</p>
                      <p className="text-[11px] text-gray-500">{item.category} • {item.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-[#00254d]">₹{item.price}</p>
                      <p className="text-[10px] text-gray-400 line-through">₹{item.originalPrice}</p>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    onSearchSubmit(searchQuery);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-[#00254d] bg-sky-50/50 hover:bg-sky-100 transition-colors"
                >
                  View all results for "{searchQuery}" →
                </button>
              </div>
            )}
          </div>

          {/* Trust Badges Desktop */}
          <div className="hidden lg:flex items-center gap-6 divide-x divide-gray-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-[#00254d]">
                <ShieldCheck className="w-5 h-5 text-[#00254d]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#00254d] uppercase tracking-wide">100% Authentic</span>
                <span className="text-[10px] text-[#434750]">Spiritual Products</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pl-6">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-[#7b5800]">
                <Package className="w-5 h-5 text-[#7b5800]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#00254d] uppercase tracking-wide">Secure Packaging</span>
                <span className="text-[10px] text-[#434750]">Safe & Divine Delivery</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
