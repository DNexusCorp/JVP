import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 999;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;

  return (
    <div className="fixed inset-0 z-[70] overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 border-b border-[#e0e3e5] bg-[#00254d] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#fdc34d]" />
              <h2 className="font-serif text-lg font-bold">Your Sacred Cart</h2>
              <span className="text-xs bg-[#003b73] px-2 py-0.5 rounded-full text-white">
                {items.reduce((sum, item) => sum + item.quantity, 0)} Items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#003b73] rounded-full text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Alert Bar */}
          <div className="bg-amber-50 px-4 py-2 text-xs border-b border-amber-200 text-[#7b5800] flex items-center justify-between">
            {isFreeShipping ? (
              <span className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
                You unlocked FREE Consecrated Shipping!
              </span>
            ) : (
              <span>
                Add <strong>₹{freeShippingThreshold - subtotal}</strong> more for Free Pan-India Delivery!
              </span>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
                <p className="font-serif text-base font-bold text-[#00254d]">Your Sacred Cart is Empty</p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Add energised malas, idols or puja essentials to invite auspicious positivity into your home.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onContinueShopping();
                  }}
                  className="mt-4 bg-[#00254d] text-white text-xs font-bold py-2.5 px-6 rounded uppercase tracking-wider hover:bg-[#003b73] transition-colors cursor-pointer"
                >
                  Explore Sacred Catalog
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="pt-4 first:pt-0 flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain rounded border border-gray-200 p-1 bg-[#f7f9fb] flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-serif text-xs font-bold text-[#00254d] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-[10px] text-gray-500">{item.product.subtitle}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-0.5 text-xs hover:bg-gray-100 font-bold text-gray-600 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-[#00254d]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-0.5 text-xs hover:bg-gray-100 font-bold text-gray-600 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-xs font-bold text-[#00254d]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 border-t border-[#e0e3e5] bg-gray-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#00254d]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Vedic Energization & Archana</span>
                  <span className="text-emerald-700 font-semibold">FREE (Blessed)</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Express Packaging & Shipping</span>
                  <span className={isFreeShipping ? 'text-emerald-700 font-semibold' : 'text-gray-800'}>
                    {isFreeShipping ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between text-sm font-bold text-[#00254d]">
                  <span>Total Amount</span>
                  <span className="font-serif text-base">
                    ₹{(subtotal + (isFreeShipping ? 0 : 99)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-[#00254d] text-white py-3 rounded font-bold text-xs uppercase tracking-wider hover:bg-[#003b73] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                id="cart-proceed-checkout-btn"
              >
                <span>Proceed to Sacred Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Encrypted & Consecrated Order Fulfillment</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
