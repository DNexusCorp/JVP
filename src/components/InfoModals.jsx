import React, { useState } from 'react';
import { X, Heart, Trash2, Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

export const WishlistView = ({
  items,
  onAddToCart,
  onRemoveFromWishlist,
  onQuickView,
  onContinueShopping,
}) => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-0 py-8 mb-12 animate-fadeIn">
      <div className="border-b border-[#e0e3e5] pb-4 mb-6 flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#00254d]">
            Your Sacred Wishlist ({items.length})
          </h1>
          <p className="text-xs text-[#434750] mt-1">
            Cherished spiritual artifacts saved for future auspicious occasions.
          </p>
        </div>
        <button
          onClick={onContinueShopping}
          className="text-xs font-bold text-[#00254d] hover:underline cursor-pointer"
        >
          ← Continue Browsing
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl ethereal-shadow p-12 text-center max-w-md mx-auto space-y-3">
          <Heart className="w-12 h-12 text-rose-300 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#00254d]">Your Wishlist is Empty</h3>
          <p className="text-xs text-gray-500">
            Click the heart icon on any mala, idol, or yantra to save it to your sacred list.
          </p>
          <button
            onClick={onContinueShopping}
            className="mt-2 bg-[#00254d] text-white text-xs font-bold py-2.5 px-6 rounded uppercase tracking-wider hover:bg-[#003b73] transition-colors cursor-pointer"
          >
            Explore Sacred Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg p-4 ethereal-shadow border border-gray-100 flex flex-col group relative"
            >
              <button
                onClick={() => onRemoveFromWishlist(product.id)}
                className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-rose-600 rounded-full hover:bg-gray-50 transition-colors z-10 cursor-pointer"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div
                onClick={() => onQuickView(product)}
                className="relative aspect-square bg-[#f7f9fb] rounded p-3 mb-3 cursor-pointer flex items-center justify-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>

              <h4 className="font-serif text-sm font-bold text-[#00254d] truncate">{product.name}</h4>
              <p className="text-[11px] text-gray-500 mb-2">{product.subtitle}</p>
              
              <div className="mt-auto flex items-baseline gap-2 mb-3">
                <span className="font-serif text-base font-bold text-[#00254d]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-[#00254d] text-white text-xs font-bold py-2 rounded hover:bg-[#003b73] transition-colors cursor-pointer uppercase tracking-wider"
              >
                Move to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ContactModal = ({ isOpen, onClose }) => {
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative border border-[#c3c6d1]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-800 cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#00254d]">Pranam! Message Received</h3>
            <p className="text-xs text-gray-500">
              Our temple advisors will review your query and get back within 2-4 hours.
            </p>
            <button onClick={onClose} className="mt-4 bg-[#00254d] text-white text-xs font-bold py-2 px-6 rounded cursor-pointer">
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-b pb-3">
              <h2 className="font-serif text-2xl font-bold text-[#00254d]">Contact JVP Spirituals</h2>
              <p className="text-xs text-[#434750]">We are here to assist your spiritual journey with devotion.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded border">
                <Phone className="w-4 h-4 text-[#00254d]" />
                <div>
                  <p className="font-bold text-gray-700">Helpline</p>
                  <p className="text-[11px] text-gray-500">+91 74182 08067</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded border">
                <Mail className="w-4 h-4 text-[#00254d]" />
                <div>
                  <p className="font-bold text-gray-700">Email Support</p>
                  <p className="text-[11px] text-gray-500">support@jvpspirituals.com</p>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Your Full Name</label>
                <input required type="text" placeholder="Devotee Name" className="w-full p-2 border rounded focus:border-[#00254d] focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Phone / WhatsApp</label>
                <input required type="tel" placeholder="+91 XXXXX XXXXX" className="w-full p-2 border rounded focus:border-[#00254d] focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Spiritual Query / Product Customization</label>
                <textarea required rows={3} placeholder="Ask about energization, bead sizes, or delivery dates..." className="w-full p-2 border rounded focus:border-[#00254d] focus:outline-none" />
              </div>

              <button type="submit" className="w-full bg-[#00254d] text-white py-2.5 rounded font-bold text-xs uppercase tracking-wider hover:bg-[#003b73] transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                <Send className="w-3.5 h-3.5" />
                <span>Send Devotional Query</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
