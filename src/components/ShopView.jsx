import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Sparkles, Check, ChevronDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';

export const ShopView = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
}) => {
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedDeities, setSelectedDeities] = useState([]);

  const deitiesList = ['Lord Vishnu & Lord Krishna', 'Lord Murugan & Planet Mars (Sevvai)', 'Lord Shiva', 'Goddess Saraswati & Goddess Lakshmi', 'Lord Sri Ranganatha / Vastu Perumal', 'Lord Vighnaharta Ganesha'];

  const toggleDeity = (d) => {
    if (selectedDeities.includes(d)) {
      setSelectedDeities(selectedDeities.filter((item) => item !== d));
    } else {
      setSelectedDeities([...selectedDeities, d]);
    }
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'offers') {
        if (product.categorySlug !== selectedCategory) return false;
      }
      if (selectedCategory === 'offers') {
        if (!product.isOffer && product.discountPercent < 25) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          (product.deity && product.deity.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Price filter
      if (product.price > priceRange) return false;

      // Deity filter
      if (selectedDeities.length > 0) {
        if (!product.deity || !selectedDeities.includes(product.deity)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return b.reviewsCount - a.reviewsCount; // popular
    });
  }, [selectedCategory, searchQuery, priceRange, selectedDeities, sortBy]);

  const currentCatObj = CATEGORIES.find((c) => c.slug === selectedCategory);

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-0 py-6 animate-fadeIn">
      
      {/* Category Banner / Header */}
      <div className="bg-white rounded-xl p-6 mb-8 ethereal-shadow border border-[#e0e3e5] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#7b5800] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Catalog</span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#00254d]">
            {selectedCategory === 'offers'
              ? 'Auspicious Festive Offers & Discounts'
              : currentCatObj
              ? currentCatObj.name
              : searchQuery
              ? `Search Results for "${searchQuery}"`
              : 'All Sacred Products & Artifacts'}
          </h1>
          <p className="text-xs text-[#434750] mt-1 max-w-2xl">
            {currentCatObj
              ? currentCatObj.description
              : 'Every single product is hand-inspected, energized with Vedic rituals, and packaged with extreme care.'}
          </p>
        </div>

        {/* Total count badge */}
        <div className="bg-sky-50 text-[#00254d] border border-sky-100 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap">
          {filteredProducts.length} Sacred Artifacts
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl p-5 ethereal-shadow border border-[#e0e3e5] space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-serif text-sm font-bold text-[#00254d] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filter Sacred Items
              </span>
              {(selectedCategory || selectedDeities.length > 0 || priceRange < 5000) && (
                <button
                  onClick={() => {
                    onSelectCategory(null);
                    setSelectedDeities([]);
                    setPriceRange(5000);
                  }}
                  className="text-[11px] text-[#7b5800] font-semibold hover:underline"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Categories List */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#00254d] mb-2.5">
                Categories
              </label>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => onSelectCategory(null)}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategory === null
                      ? 'bg-[#00254d] text-white font-bold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] opacity-80">{PRODUCTS.length}</span>
                </button>

                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.slug)}
                    className={`w-full text-left py-1.5 px-2 rounded transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat.slug
                        ? 'bg-[#00254d] text-white font-bold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] opacity-80">
                      {PRODUCTS.filter((p) => p.categorySlug === cat.slug).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#00254d]">
                  Max Price
                </label>
                <span className="text-xs font-bold text-[#00254d]">
                  ₹{priceRange.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#00254d] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>₹200</span>
                <span>₹5,000+</span>
              </div>
            </div>

            {/* Deity / Energy Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#00254d] mb-2.5">
                Deity / Cosmic Power
              </label>
              <div className="space-y-1.5 text-xs">
                {deitiesList.map((deity) => (
                  <label
                    key={deity}
                    className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-[#00254d]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDeities.includes(deity)}
                      onChange={() => toggleDeity(deity)}
                      className="rounded text-[#00254d] focus:ring-0"
                    />
                    <span className="truncate text-[11px]">{deity}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Main Product Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Sorting & Filter bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3.5 rounded-lg ethereal-shadow border border-[#e0e3e5]">
            <span className="text-xs text-[#434750]">
              Showing <strong>{filteredProducts.length}</strong> divine products
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded px-2.5 py-1.5 font-medium text-[#00254d] focus:outline-none cursor-pointer"
              >
                <option value="popular">Most Popular & Devotee Reviews</option>
                <option value="rating">Highest Devotee Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Biggest Savings & Offers</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center ethereal-shadow border border-gray-200 space-y-3">
              <Sparkles className="w-10 h-10 text-amber-500 mx-auto opacity-70" />
              <h3 className="font-serif text-lg font-bold text-[#00254d]">No Spiritual Products Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try widening your price filter or selecting a different spiritual category.
              </p>
              <button
                onClick={() => {
                  onSelectCategory(null);
                  setSelectedDeities([]);
                  setPriceRange(5000);
                }}
                className="mt-2 bg-[#00254d] text-white text-xs font-bold py-2 px-5 rounded"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
