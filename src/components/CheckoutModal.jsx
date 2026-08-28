import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, CreditCard, Banknote, Sparkles, Truck, Lock } from 'lucide-react';

export const CheckoutModal = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  onNavigate,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    paymentMethod: 'upi',
    gotra: '',
    rashi: '',
    nakshatra: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const isFreeShipping = subtotal >= 999;
  const shippingFee = isFreeShipping ? 0 : 99;
  const total = subtotal + shippingFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedId = `JVP-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedOrderId(generatedId);
      setIsProcessing(false);
      setStep(3); // Completed Step
      onOrderSuccess(generatedId, formData.address, total);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 md:p-8 relative border border-[#c3c6d1] my-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        id="checkout-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#00254d]" />
            <h2 className="font-serif text-xl font-bold text-[#00254d]">
              {step === 3 ? 'Order Consecration Confirmed' : 'Sacred Checkout & Delivery'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1 & 2: Shipping & Sankalpa Details */}
        {step < 3 && (
          <form onSubmit={handleSubmitOrder} className="space-y-5">
            {/* Step Indicators */}
            <div className="flex items-center justify-between text-xs border-b pb-3 mb-2 font-semibold text-gray-500">
              <span className={step === 1 ? 'text-[#00254d] font-bold border-b-2 border-[#00254d] pb-1' : 'text-emerald-700'}>
                1. Delivery & Sankalpa
              </span>
              <span className={step === 2 ? 'text-[#00254d] font-bold border-b-2 border-[#00254d] pb-1' : ''}>
                2. Sacred Payment
              </span>
            </div>

            {step === 1 && (
              <div className="space-y-4 text-xs">
                {/* Devotee Contact Details */}
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#00254d] mb-2">Devotee Contact Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-600 mb-1">Full Name *</label>
                      <input
                        required
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Sri Karthik Raman"
                        className="w-full p-2.5 border rounded focus:border-[#00254d] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Phone / WhatsApp *</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98400 12345"
                        className="w-full p-2.5 border rounded focus:border-[#00254d] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#00254d] mb-2">Sanctified Delivery Address</h3>
                  <div className="space-y-2">
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Door / Flat No, Street, Landmark"
                      className="w-full p-2.5 border rounded focus:border-[#00254d] focus:outline-none"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City / Town"
                        className="p-2.5 border rounded focus:border-[#00254d] focus:outline-none"
                      />
                      <input
                        required
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        className="p-2.5 border rounded focus:border-[#00254d] focus:outline-none"
                      />
                      <input
                        required
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                        className="p-2.5 border rounded focus:border-[#00254d] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Sankalpa Astrological Details (Optional) */}
                <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-1.5 font-bold text-[#7b5800] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Free Archana Sankalpa Details (Optional)</span>
                  </div>
                  <p className="text-[11px] text-[#434750] mb-2">
                    Our temple priests will perform sankalpa in your name & rashi before dispatch.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      name="gotra"
                      value={formData.gotra}
                      onChange={handleChange}
                      placeholder="Gotra (e.g. Kashyapa)"
                      className="p-2 bg-white border rounded text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      name="rashi"
                      value={formData.rashi}
                      onChange={handleChange}
                      placeholder="Rashi / Moon Sign"
                      className="p-2 bg-white border rounded text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      name="nakshatra"
                      value={formData.nakshatra}
                      onChange={handleChange}
                      placeholder="Nakshatra / Star"
                      className="p-2 bg-white border rounded text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (formData.fullName && formData.phone && formData.address && formData.pincode) {
                      setStep(2);
                    } else {
                      alert('Please fill in your name, contact number, and address.');
                    }
                  }}
                  className="w-full bg-[#00254d] text-white py-3 rounded font-bold text-xs uppercase tracking-wider hover:bg-[#003b73] transition-colors cursor-pointer"
                >
                  Continue to Payment (₹{total.toLocaleString('en-IN')}) →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 text-xs">
                {/* Order Summary Recap */}
                <div className="bg-gray-50 p-3 rounded-lg border space-y-1 text-xs">
                  <div className="flex justify-between font-medium text-gray-700">
                    <span>Items Total ({items.length} items)</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-medium text-gray-700">
                    <span>Vedic Archana & Energization</span>
                    <span className="text-emerald-700 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between font-medium text-gray-700">
                    <span>Pan India Delivery</span>
                    <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-sm text-[#00254d]">
                    <span>Total Payable</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Payment Options */}
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#00254d] mb-2">Select Payment Method</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-sky-50 transition-colors border-[#00254d] bg-sky-50/40">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleChange}
                        className="accent-[#00254d]"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-[#00254d] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
                          UPI Instant (GPay / PhonePe / Paytm / QR)
                        </p>
                        <p className="text-[11px] text-gray-500">Fast, instant sanctification priority</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="accent-[#00254d]"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-gray-600" />
                          Credit / Debit Card / Net Banking
                        </p>
                        <p className="text-[11px] text-gray-500">All major Indian banks supported</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="accent-[#00254d]"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 flex items-center gap-1.5">
                          <Banknote className="w-3.5 h-3.5 text-gray-600" />
                          Cash on Delivery (COD)
                        </p>
                        <p className="text-[11px] text-gray-500">Pay when sacred package is delivered</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-gray-100 text-gray-700 py-3 rounded font-bold text-xs uppercase hover:bg-gray-200 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-2/3 bg-[#00254d] text-white py-3 rounded font-bold text-xs uppercase tracking-wider hover:bg-[#003b73] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{isProcessing ? 'Consecrating Order...' : `Pay ₹${total.toLocaleString('en-IN')} & Bless`}</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        )}

        {/* Step 3: Success Confirmation Screen */}
        {step === 3 && (
          <div className="text-center py-6 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#7b5800] uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Blessed & Consecrated Order
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#00254d] mt-3">
                Pranam! Your Order has been Placed
              </h3>
              <p className="text-xs text-[#434750] mt-1 max-w-md mx-auto">
                Order Tracking ID: <strong className="text-[#00254d] font-mono text-sm">{confirmedOrderId}</strong>
              </p>
            </div>

            <div className="bg-sky-50/70 p-4 rounded-lg border border-sky-100 text-left text-xs text-gray-700 space-y-2 max-w-md mx-auto">
              <div className="flex items-center gap-2 font-bold text-[#00254d]">
                <Truck className="w-4 h-4" />
                <span>Next Spiritual Steps:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                1. Our temple priest will perform Archana & energization for your sacred items.<br />
                2. Items will be sealed in protective sanctified boxing with Ganga Jal touch.<br />
                3. Dispatch notification with tracking code will be sent to your WhatsApp.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  onClose();
                  onNavigate('track-order');
                }}
                className="bg-[#00254d] text-white text-xs font-bold py-2.5 px-6 rounded uppercase tracking-wider hover:bg-[#003b73] transition-colors cursor-pointer"
              >
                Track this Order Live
              </button>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('home');
                }}
                className="bg-gray-100 text-[#00254d] text-xs font-bold py-2.5 px-6 rounded uppercase tracking-wider hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
