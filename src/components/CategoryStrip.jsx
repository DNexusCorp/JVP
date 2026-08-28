import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const CategoryStrip = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="mb-14 relative px-2 md:px-0">
      
      {/* Scroll controls */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-gray-300 shadow-md items-center justify-center text-gray-700 hover:bg-[#00254d] hover:text-white transition-all cursor-pointer"
        aria-label="Scroll left categories"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-gray-300 shadow-md items-center justify-center text-gray-700 hover:bg-[#00254d] hover:text-white transition-all cursor-pointer"
        aria-label="Scroll right categories"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Categories Horizontal Slider */}
      <div
        ref={scrollRef}
        className="flex items-center justify-start md:justify-center gap-6 md:gap-10 overflow-x-auto no-scrollbar py-2 px-2"
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.slug;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer group select-none"
              id={`cat-strip-${cat.slug}`}
            >
              {/* Circular Category Badge */}
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 transition-all duration-300 ${
                  isSelected
                    ? 'ring-4 ring-[#00254d] scale-105 shadow-lg'
                    : 'group-hover:scale-105 border-2 border-transparent group-hover:border-[#fdc34d]'
                }`}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-sm border border-gray-200 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Title Underneath */}
              <span
                className={`mt-2.5 text-xs sm:text-sm text-center font-bold tracking-wide uppercase transition-colors max-w-[110px] sm:max-w-[120px] ${
                  isSelected ? 'text-[#00254d]' : 'text-[#191c1e] group-hover:text-[#00254d]'
                }`}
              >
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
