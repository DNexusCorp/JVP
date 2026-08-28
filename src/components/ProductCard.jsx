import React from 'react';
import { Heart, Star, Eye, ShoppingCart, Sparkles } from 'lucide-react';

export const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  onQuickView,
}) => {
  return (
    <div
      className="bg-white rounded-xl p-3.5 sm:p-4 ethereal-shadow border border-[#D4AF37]/20 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#D4AF37]/60 relative"
      id={`product-card-${product.id}`}
    >
      {/* Top badges & Wishlist Button */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        {product.discountPercent > 0 ? (
          <span className="bg-[#09223F] text-[#FFF3B0] text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded border border-[#D4AF37]/50 shadow-xs uppercase tracking-wider pointer-events-auto">
            {product.discountPercent}% OFF
          </span>
        ) : (
          <span />
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`p-1.5 rounded-full bg-white/95 shadow-sm transition-all pointer-events-auto hover:scale-110 cursor-pointer border border-gray-100 ${
            isWishlisted ? 'text-[#FF8EBB]' : 'text-gray-400 hover:text-[#FF8EBB]'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Sacred Wishlist'}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#FF8EBB] text-[#FF8EBB]' : ''}`} />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-square w-full bg-gradient-to-b from-[#f7f9fb] to-[#edf4fc] rounded-lg overflow-hidden flex items-center justify-center p-3 mb-3 cursor-pointer border border-sky-50"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick View overlay on hover */}
        <div className="absolute inset-0 bg-[#09223F]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
          <span className="bg-white text-[#09223F] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-[#D4AF37]/50">
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Product Titles & Ratings */}
      <div className="flex flex-col flex-grow text-left">
        <span className="text-[10px] sm:text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
          {product.category}
        </span>

        <h3
          onClick={() => onQuickView(product)}
          className="font-serif text-sm sm:text-base font-bold text-[#09223F] hover:text-[#005B82] cursor-pointer mt-0.5 leading-snug line-clamp-1 transition-colors"
        >
          {product.name}
        </h3>
        <p className="text-[11px] sm:text-xs text-[#434750] -mt-0.5 mb-1.5 line-clamp-1">
          {product.subtitle}
        </p>

        {/* Rating stars */}
        <div className="flex items-center gap-1 mb-2.5">
          <div className="flex text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-[#D4AF37]' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500 font-medium">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mb-3 mt-auto">
          <span className="font-serif text-base sm:text-lg font-bold text-[#09223F]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
      </div>

      {/* Add To Cart Full Width Action Button: Deep blue background, gold border, inverting on hover */}
      <button
        onClick={() => onAddToCart(product, 1)}
        className="w-full bg-[#09223F] text-[#FFF3B0] py-2 sm:py-2.5 px-3 rounded-lg text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#D4AF37]/70 hover:bg-[#D4AF37] hover:text-[#09223F] hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
        id={`add-to-cart-${product.id}`}
      >
        <ShoppingCart className="w-3.5 h-3.5" />
        <span>Add to Cart</span>
      </button>
    </div>
  );
};
