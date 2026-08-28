import React from 'react';
import { Sparkles } from 'lucide-react';

export const DivineLoader = ({ 
  message = "Consecrating Divine Living...", 
  subMessage = "JVP Spirituals • Authentic & Energized",
  fullScreen = true,
  size = "md" // "sm" | "md" | "lg"
}) => {
  const sizeMap = {
    sm: "w-20 h-20",
    md: "w-32 h-32 md:w-36 md:h-36",
    lg: "w-44 h-44 md:w-52 md:h-52"
  };

  const content = (
    <div className="flex flex-col items-center justify-center p-6 text-center select-none animate-fadeIn">
      {/* Sacred Halo Container */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer glowing pulsing rings */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37]/30 via-[#005B82]/20 to-[#FF8EBB]/20 blur-xl animate-pulse" />
        <div className="absolute -inset-2 rounded-full border border-[#D4AF37]/30 animate-spin-slow" />
        
        {/* Circular Card for the GIF */}
        <div className={`relative ${sizeMap[size] || sizeMap.md} rounded-full p-2 bg-gradient-to-b from-white via-[#f0f7ff] to-white border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.35)] flex items-center justify-center overflow-hidden`}>
          <img
            src="/animated-logo-gif.gif"
            alt="JVP Spirituals Loading"
            className="w-full h-full object-contain drop-shadow-sm"
            loading="eager"
          />
        </div>
      </div>

      {/* Brand Title */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1.5 text-[#D4AF37]">
          <Sparkles className="w-3.5 h-3.5 animate-bounce" />
          <span className="font-serif font-bold text-lg md:text-xl text-[#00254d] tracking-[0.2em] uppercase">
            JVP Spirituals
          </span>
          <Sparkles className="w-3.5 h-3.5 animate-bounce" />
        </div>

        {/* Dynamic Sacred Messages */}
        <p className="text-xs md:text-sm font-medium text-[#434750] tracking-wide mt-1">
          {message}
        </p>

        {subMessage && (
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#7b5800] font-semibold mt-1">
            {subMessage}
          </span>
        )}

        {/* Shimmer progress bar */}
        <div className="w-36 md:w-48 h-1 bg-gray-200/80 rounded-full mt-4 overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#D4AF37] via-[#00254d] to-[#D4AF37] rounded-full animate-indeterminate-bar" />
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-radial from-[#ffffff] via-[#f4f8fc] to-[#e6f0fa] backdrop-blur-md transition-opacity duration-500"
        role="status"
        aria-live="polite"
      >
        {content}
      </div>
    );
  }

  return content;
};
