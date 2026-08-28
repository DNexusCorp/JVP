import React, { useState } from 'react';
import { X, Star, ShieldCheck, Sparkles, Heart, ShoppingBag, Truck, Check, Share2 } from 'lucide-react';

export const ProductQuickViewModal = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('benefits');
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 md:p-8 relative border border-[#c3c6d1] my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        id="product-quick-view-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Left Side: Product Image & Badges */}
          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-full bg-[#f7f9fb] rounded-xl overflow-hidden flex items-center justify-center p-6 border border-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              {product.discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-[#7b5800] text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs uppercase">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Energization Assurance Pill */}
            <div className="mt-4 w-full bg-amber-50/80 border border-amber-200/80 rounded-lg p-3 text-left">
              <div className="flex items-center gap-2 text-[#7b5800] font-bold text-xs">
                <Sparkles className="w-4 h-4 text-[#d97706]" />
                <span>Sanctified by Priests</span>
              </div>
              <p className="text-[11px] text-[#434750] mt-1 leading-snug">
                {product.energizationNote || 'Purified with Vedic Mantras & Ganga Jal before dispatch.'}
              </p>
            </div>
          </div>

          {/* Right Side: Product Details & Purchase Actions */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#7b5800] uppercase tracking-wider">
                {product.category}
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="text-gray-400 hover:text-gray-600 p-1 text-xs flex items-center gap-1 cursor-pointer"
                  title="Copy link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied!' : 'Share'}</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-1.5 rounded-full hover:bg-gray-100 cursor-pointer ${
                    isWishlisted ? 'text-rose-600' : 'text-gray-400 hover:text-rose-600'
                  }`}
                  title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#00254d] mt-1 leading-tight">
              {product.name}
            </h2>
            <p className="text-xs text-[#434750] mt-0.5">{product.subtitle}</p>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-semibold">
                {product.rating} ({product.reviewsCount} verified devotee reviews)
              </span>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 my-4 bg-sky-50/50 p-3 rounded-lg border border-sky-100">
              <span className="font-serif text-2xl font-bold text-[#00254d]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded ml-auto">
                In Stock & Consecrated
              </span>
            </div>

            {/* Product Meta Specifications */}
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4 bg-gray-50 p-3 rounded">
              {product.beadCount && (
                <div>
                  <span className="font-semibold text-gray-700">Bead Count: </span>
                  {product.beadCount}
                </div>
              )}
              {product.material && (
                <div>
                  <span className="font-semibold text-gray-700">Material: </span>
                  {product.material}
                </div>
              )}
              {product.deity && (
                <div>
                  <span className="font-semibold text-gray-700">Deity / Power: </span>
                  {product.deity}
                </div>
              )}
              <div>
                <span className="font-semibold text-gray-700">Shipping: </span>
                Pan India Fast Express
              </div>
            </div>

            {/* Tabs for Details / Mantra / Benefits */}
            <div className="border-b border-gray-200 mb-3 flex gap-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-2 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'benefits'
                    ? 'border-[#00254d] text-[#00254d]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Spiritual Benefits
              </button>
              <button
                onClick={() => setActiveTab('howToUse')}
                className={`pb-2 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'howToUse'
                    ? 'border-[#00254d] text-[#00254d]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                How to Wear & Use
              </button>
              <button
                onClick={() => setActiveTab('mantra')}
                className={`pb-2 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'mantra'
                    ? 'border-[#00254d] text-[#00254d]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Chanting Mantra
              </button>
            </div>

            <div className="text-xs text-[#434750] leading-relaxed mb-6 min-h-[70px]">
              {activeTab === 'benefits' && (
                <ul className="space-y-1.5 list-disc list-inside">
                  {product.spiritualBenefits?.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  )) || <li>{product.description}</li>}
                </ul>
              )}

              {activeTab === 'howToUse' && (
                <p className="bg-gray-50 p-2.5 rounded border border-gray-200">
                  {product.howToUse || 'Wear with clean body and devout intention after morning prayer.'}
                </p>
              )}

              {activeTab === 'mantra' && (
                <div className="space-y-2">
                  <p className="font-serif italic font-medium text-[#00254d] bg-white p-3 rounded border border-amber-200 text-sm leading-relaxed">
                    "{product.mantra}"
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Recite with devotion during morning sandhya or while holding prayer beads.
                  </p>
                </div>
              )}
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 mt-auto">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 cursor-pointer text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-[#00254d]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 cursor-pointer text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className="flex-1 bg-white border border-[#00254d] text-[#00254d] py-2.5 rounded font-bold text-xs uppercase tracking-wider hover:bg-sky-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>

              <button
                onClick={() => onBuyNow(product, quantity)}
                className="w-full bg-[#00254d] text-white py-3 rounded font-bold text-xs uppercase tracking-widest hover:bg-[#003b73] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                id="quick-view-buy-now-btn"
              >
                <span>Instant Buy Now & Consecrate</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
