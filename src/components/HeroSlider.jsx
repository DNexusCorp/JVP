import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSlider = ({ onShopNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'JALASTHANA\nVASTU PERUMAL',
      subtitle: 'The Divine Protector of\nYour Home and Life',
      categorySlug: 'vastu-products',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpolvKJ43cvBYIekPHPpBD_dNszUIy09BangLQnfx9NuxEF8lBF7mDN8kLAkje_V9-eryUSxO-Tj8Na9ccPaw0GO3_DQ2n7zwbqC9rVlJg-c4OmLoVTcmzO7lpC_HV-umgQnp5dIZ_rJfaGkCK_Jjhk2WR-rkt7UUDqrUGTlrbrTwMBgfr6JJOr3iDBkRkuA0LhM5d6GBI_KQ5pq-qRoeCigwlDpDkOW-uFJ-n35GTs6Opj6J94dG_3g',
      accentText: 'North-East Architectural Guardian',
      badge: 'JVP'
    },
    {
      id: 2,
      title: 'SACRED TULASI &\nKARUNGALI MALAS',
      subtitle: 'Energized for Divine Protection,\nMeditation & Peace',
      categorySlug: 'malas-japa',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBmygcSvZjQ1JauxWiWAwmTPlDVwY4mWSRLzs0AR0V_r1tTUwmcl9YyaRpe-EhYiVLmGmnxr63vQybP5LiCGyXsRxkKcqetvlueYeJYTCZkezg4f6kAhAjJUjqR3iWgnEXZzHwVfius9qK05rh1o8qlo1bbJA_EhPFvAdMxNaARiHDOe4SCthPbrLcmFYHCFgda-cJ68xtjVN0vIMDwQ0lvZyxnBdCMfAaW6xgNWWi1poTn8upUV25tA',
      accentText: '100% Original Holy Vrindavan Wood & Siddha Ebony',
      badge: '108'
    },
    {
      id: 3,
      title: 'CONSECRATED BRASS\nIDOLS & SRI YANTRAS',
      subtitle: 'Attract Unbounded Wealth,\nClarity & Auspicious Grace',
      categorySlug: 'vastu-products',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW-XQ5qj-3QFHNe4pnllKME1RJ4qsixpYrkmydTbQt-nAgmfMEfudxJB-fmL5gfUM7OfcgtIl7TUp8osyCe2BiEzGrlc6FZsxvT2pptlX1DameI8M8i4iVShxA1C4pesk60tNW8OSWunGKI0R4SvX9K81C7HurVm9gOnK2ZAT4F2CY5sHhhfo5Xs93q6IIybrzNL6fNOBTPR4_rwJHZVXY-A1DsaS4vjLVZvfnEG9XLU1oQdvOrzSFNA',
      accentText: '24K Gold Plated Cosmic Geometry',
      badge: 'VASTU'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto slide every 6.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full h-[420px] md:h-[500px] lg:h-[540px] overflow-hidden bg-[#09223F] mb-0 select-none shadow-xl">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center w-full h-full transition-all duration-700 transform scale-105"
        style={{
          backgroundImage: `url('${slide.image}')`,
          backgroundPosition: 'center 40%'
        }}
      >
        {/* Deep Ocean & Teal atmospheric gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09223F]/95 via-[#005B82]/55 to-[#09223F]/40 backdrop-blur-[1px]" />
      </div>

      {/* Main Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        
        {/* Accent Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#09223F]/70 border border-[#D4AF37]/60 backdrop-blur-md mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFF3B0] animate-ping" />
          <span className="text-[11px] font-bold tracking-widest text-[#FFF3B0] uppercase">{slide.accentText}</span>
        </div>

        {/* Main Title in luminous white with gold shadow */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-white drop-shadow-[0_4px_12px_rgba(9,34,63,0.8)] mb-3 uppercase tracking-[0.05em] leading-[1.15] whitespace-pre-line animate-fadeIn">
          {slide.title}
        </h1>

        {/* Subtitle in Bright Gold */}
        <p className="font-serif text-base sm:text-lg md:text-xl text-[#FFF3B0] mb-6 drop-shadow-md whitespace-pre-line max-w-xl font-medium">
          {slide.subtitle}
        </p>

        {/* Circular JVP Crest mirroring circular water splash frame */}
        <div className="mb-6 w-16 h-16 md:w-20 md:h-20 border-2 border-[#D4AF37] rounded-full flex items-center justify-center bg-[#09223F]/60 backdrop-blur-md shadow-lg transition-transform hover:scale-105 gold-glow">
          <span className="font-serif text-lg md:text-xl text-[#FFF3B0] font-bold tracking-widest">
            {slide.badge}
          </span>
        </div>

        {/* Tactile CTA Button: Deep blue background, gold border, inverts on hover to gold with deep blue text */}
        <button
          onClick={() => onShopNow(slide.categorySlug)}
          className="bg-[#09223F] text-[#FFF3B0] px-8 md:px-10 py-3 rounded-full text-xs md:text-sm font-bold tracking-[0.15em] hover:bg-[#D4AF37] hover:text-[#09223F] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all duration-300 border border-[#D4AF37] shadow-lg uppercase cursor-pointer flex items-center gap-2 group active:scale-95"
          id="hero-shop-now-btn"
        >
          <span>Explore Sacred Collection</span>
        </button>
      </div>

      {/* Slider Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 bg-white/90 hover:bg-[#D4AF37] hover:text-[#09223F] text-[#09223F] rounded-full flex items-center justify-center cursor-pointer transition-all z-20 shadow-md hover:scale-110 active:scale-95 border border-[#D4AF37]/50"
        aria-label="Previous Slide"
        id="hero-slider-prev-btn"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Slider Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 bg-white/90 hover:bg-[#D4AF37] hover:text-[#09223F] text-[#09223F] rounded-full flex items-center justify-center cursor-pointer transition-all z-20 shadow-md hover:scale-110 active:scale-95 border border-[#D4AF37]/50"
        aria-label="Next Slide"
        id="hero-slider-next-btn"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentSlide === idx
                ? 'w-7 h-2 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                : 'w-2 h-2 bg-white/50 hover:bg-white/90'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
