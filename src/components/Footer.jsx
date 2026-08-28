import React, { useState } from 'react';
import { Globe, Instagram, Youtube, Check } from 'lucide-react';

export const Footer = ({ onNavigate, onOpenContact }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#09223F] text-gray-200 border-t-2 border-[#D4AF37]/40 w-full mt-auto relative z-10 overflow-hidden shadow-2xl">
      
      {/* 4 Column Main Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-12 lg:px-20 py-12 w-full max-w-[1280px] mx-auto">
        
        {/* Col 1: Stay Connected */}
        <div className="flex flex-col gap-3">
          <h4 className="font-serif font-bold text-xs text-[#FFF3B0] uppercase tracking-wider">
            Stay Connected
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            Subscribe to get special offers, new arrivals & spiritual updates.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex w-full mt-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="w-full px-3 py-2 text-xs border border-[#005B82] rounded-l-lg focus:outline-none focus:border-[#D4AF37] bg-white/10 text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-[#D4AF37] text-[#09223F] px-4 py-2 rounded-r-lg hover:bg-[#FFF3B0] transition-colors font-bold text-xs cursor-pointer flex-shrink-0"
            >
              {subscribed ? <Check className="w-4 h-4" /> : 'Subscribe'}
            </button>
          </form>
          {subscribed && (
            <p className="text-[11px] text-[#FFF3B0] font-semibold mt-1">
              ✓ Subscribed! May divine peace be with you.
            </p>
          )}
        </div>

        {/* Col 2: Customer Service */}
        <div className="flex flex-col gap-3">
          <h4 className="font-serif font-bold text-xs text-[#FFF3B0] uppercase tracking-wider">
            Customer Service
          </h4>
          <ul className="flex flex-col gap-2 text-xs text-gray-300">
            <li>
              <button onClick={onOpenContact} className="hover:text-[#FFF3B0] hover:underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer">
                About Us
              </button>
            </li>
            <li>
              <button onClick={onOpenContact} className="hover:text-[#FFF3B0] hover:underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer">
                Contact Us
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('track-order')} className="hover:text-[#FFF3B0] hover:underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer">
                Track Order
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('puja-guide')} className="hover:text-[#FFF3B0] hover:underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer">
                Divine Recommendation & Guidelines
              </button>
            </li>
            <li>
              <button onClick={onOpenContact} className="hover:text-[#FFF3B0] hover:underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer">
                Shipping Policy
              </button>
            </li>
            <li>
              <button onClick={onOpenContact} className="hover:text-[#FFF3B0] hover:underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer">
                Returns & Refunds
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: My Account */}
        <div className="flex flex-col gap-3">
          <h4 className="font-serif font-bold text-xs text-[#FFF3B0] uppercase tracking-wider">
            My Account
          </h4>
          <ul className="flex flex-col gap-2 text-xs text-gray-300">
            <li>
              <button onClick={() => onNavigate('track-order')} className="hover:text-[#FFF3B0] hover:underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer">
                My Account
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('track-order')} className="hover:text-[#FFF3B0] hover:underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer">
                Orders
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('wishlist')} className="hover:text-[#FFF3B0] hover:underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer">
                Wishlist
              </button>
            </li>
            <li>
              <button onClick={onOpenContact} className="hover:text-[#FFF3B0] hover:underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer">
                Address Book
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-[#FFF3B0] hover:underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer">
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Why JVP Spirituals? */}
        <div className="flex flex-col gap-3">
          <h4 className="font-serif font-bold text-xs text-[#FFF3B0] uppercase tracking-wider">
            Why JVP Spirituals?
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            At JVP Spirituals, we bring you authentic spiritual products energized with devotion to help you lead a peaceful, prosperous and divine life.
          </p>
          <div className="flex gap-2.5 mt-2">
            <a
              href="https://jvpspirituals.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-[#005B82] text-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#09223F] transition-all border border-[#D4AF37]/40"
              aria-label="Website"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="#instagram"
              className="w-8 h-8 rounded-full bg-[#005B82] text-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#09223F] transition-all border border-[#D4AF37]/40"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#youtube"
              className="w-8 h-8 rounded-full bg-[#005B82] text-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#09223F] transition-all border border-[#D4AF37]/40"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright & Large Watermark Logo */}
      <div className="border-t border-[#005B82]/50 py-4 px-4 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-4 w-full max-w-[1280px] mx-auto relative">
        <span className="text-[11px] text-gray-400">
          © 2024 JVP Spirituals. All Rights Reserved.
        </span>

        {/* Large Watermark Logo */}
        <div className="absolute right-1/2 translate-x-1/2 bottom-0 font-serif text-white/5 uppercase tracking-widest pointer-events-none select-none text-[80px] leading-none font-bold">
          JVP
        </div>

        <div className="flex gap-4 text-[11px] text-gray-400">
          <button onClick={onOpenContact} className="hover:text-[#FFF3B0] underline cursor-pointer">
            Privacy Policy
          </button>
          <button onClick={onOpenContact} className="hover:text-[#FFF3B0] underline cursor-pointer">
            Terms & Conditions
          </button>
        </div>

        <span className="text-[11px] text-[#FF8EBB]">
          Made with devotion ♥
        </span>
      </div>

    </footer>
  );
};
