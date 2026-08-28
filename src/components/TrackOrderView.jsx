import React, { useState } from 'react';
import { Search, PackageCheck, Truck, CheckCircle2, ShieldAlert, Sparkles, MapPin, Calendar, Clock } from 'lucide-react';
import { SAMPLE_ORDERS } from '../data/products';

export const TrackOrderView = () => {
  const [orderQuery, setOrderQuery] = useState('JVP-89241');
  const [activeOrder, setActiveOrder] = useState(SAMPLE_ORDERS['JVP-89241']);
  const [searched, setSearched] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanId = orderQuery.trim().toUpperCase();
    if (SAMPLE_ORDERS[cleanId]) {
      setActiveOrder(SAMPLE_ORDERS[cleanId]);
    } else {
      setActiveOrder({
        orderId: cleanId,
        customerName: 'Devotee',
        phone: '+91 9XXXX XXXXX',
        status: 'Energized by Priests',
        currentStep: 2,
        placedDate: 'August 26, 2026',
        estimatedDelivery: '2-3 Business Days',
        courierName: 'Sacred Temple Logistics & India Post Speed',
        trackingNumber: `IN-${Math.floor(100000000 + Math.random() * 900000000)}`,
        items: [
          {
            name: 'Consecrated Spiritual Package',
            quantity: 1,
            price: 1299,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBmygcSvZjQ1JauxWiWAwmTPlDVwY4mWSRLzs0AR0V_r1tTUwmcl9YyaRpe-EhYiVLmGmnxr63vQybP5LiCGyXsRxkKcqetvlueYeJYTCZkezg4f6kAhAjJUjqR3iWgnEXZzHwVfius9qK05rh1o8qlo1bbJA_EhPFvAdMxNaARiHDOe4SCthPbrLcmFYHCFgda-cJ68xtjVN0vIMDwQ0lvZyxnBdCMfAaW6xgNWWi1poTn8upUV25tA'
          }
        ],
        shippingAddress: 'Devotee Residential Sanctum, India',
        totalAmount: 1299
      });
    }
    setSearched(true);
  };

  const steps = [
    { title: 'Order Placed', desc: 'Sankalpa logged' },
    { title: 'Energized by Priests', desc: 'Vedic Archana & Havan' },
    { title: 'Sanctified Packaging', desc: 'Ganga Jal touch & sealed' },
    { title: 'Dispatched & In Transit', desc: 'Express Courier' },
    { title: 'Sacred Delivery', desc: 'Arrived at your Mandir' }
  ];

  return (
    <div className="max-w-[960px] mx-auto px-4 md:px-0 py-8 mb-12 animate-fadeIn space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#7b5800] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Live Devotee Logistics
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#00254d] mt-2 mb-2">
          Track Your Sacred Consignment
        </h1>
        <p className="text-xs md:text-sm text-[#434750]">
          Enter your Order ID (e.g. <strong>JVP-89241</strong>) or Registered Phone number to check the consecration and transit milestones.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-xl ethereal-shadow border border-[#e0e3e5] p-5 max-w-lg mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            required
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            placeholder="Enter Order ID (e.g. JVP-89241)"
            className="flex-1 px-4 py-2.5 text-xs border rounded-md focus:border-[#00254d] focus:outline-none uppercase font-mono"
            id="track-order-search-input"
          />
          <button
            type="submit"
            className="bg-[#00254d] text-white text-xs font-bold px-6 py-2.5 rounded-md hover:bg-[#003b73] transition-colors flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            id="track-order-submit-btn"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
        </form>
      </div>

      {/* Tracking Result View */}
      {searched && activeOrder && (
        <div className="bg-white rounded-xl ethereal-shadow border border-[#e0e3e5] p-6 md:p-8 space-y-8 animate-fadeIn">
          
          {/* Order Meta Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e3e5] pb-5">
            <div>
              <span className="text-[11px] font-bold text-[#7b5800] uppercase tracking-wider">
                Order Tracking ID
              </span>
              <h2 className="font-mono text-xl font-bold text-[#00254d]">
                {activeOrder.orderId}
              </h2>
              <p className="text-xs text-[#434750]">
                Devotee: <strong>{activeOrder.customerName}</strong> • Placed on {activeOrder.placedDate}
              </p>
            </div>

            <div className="text-left sm:text-right bg-sky-50 p-3 rounded-lg border border-sky-100">
              <span className="text-[11px] font-bold text-gray-500 uppercase">Estimated Delivery</span>
              <p className="font-serif text-sm font-bold text-[#00254d] flex items-center gap-1 sm:justify-end">
                <Calendar className="w-3.5 h-3.5 text-[#00254d]" />
                <span>{activeOrder.estimatedDelivery}</span>
              </p>
              <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                Courier: {activeOrder.courierName}
              </p>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="py-4">
            <h3 className="font-serif text-sm font-bold text-[#00254d] mb-6">
              Consecration & Fulfillment Timeline
            </h3>

            <div className="relative">
              {/* Progress Line */}
              <div className="hidden md:block absolute top-1/2 left-4 right-4 h-1 bg-gray-200 -translate-y-1/2 z-0" />
              <div
                className="hidden md:block absolute top-1/2 left-4 h-1 bg-emerald-600 -translate-y-1/2 z-0 transition-all duration-700"
                style={{ width: `${(activeOrder.currentStep / (steps.length - 1)) * 95}%` }}
              />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                {steps.map((step, idx) => {
                  const isCompleted = idx <= activeOrder.currentStep;
                  const isCurrent = idx === activeOrder.currentStep;

                  return (
                    <div key={idx} className="flex md:flex-col items-center md:text-center gap-3 md:gap-2">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-all ${
                          isCompleted
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-400 border border-gray-300'
                        } ${isCurrent ? 'ring-4 ring-emerald-100 scale-110' : ''}`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>
                      <div>
                        <p
                          className={`text-xs font-bold ${
                            isCompleted ? 'text-[#00254d]' : 'text-gray-400'
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="text-[11px] text-gray-500">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Items & Shipping Address Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#e0e3e5] text-xs">
            {/* Ordered Sacred Items */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#00254d]">
                Items in This Sacred Parcel
              </h4>
              <div className="space-y-2">
                {activeOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 p-2.5 rounded border border-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-contain bg-white rounded border p-1"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-[#00254d]">{item.name}</p>
                      <p className="text-gray-500 text-[11px]">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-[#00254d]">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Sanctum Address */}
            <div className="space-y-3 bg-[#f7f9fb] p-4 rounded-lg border border-[#e0e3e5]">
              <h4 className="font-serif text-sm font-bold text-[#00254d] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#7b5800]" />
                <span>Destination Mandir / Sanctum</span>
              </h4>
              <p className="text-xs text-[#434750] leading-relaxed">
                {activeOrder.shippingAddress}
              </p>
              <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-xs text-[#00254d]">
                <span>Total Sanctified Order Value:</span>
                <span>₹{activeOrder.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
