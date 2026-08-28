import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Shield, Heart, Compass, Flame, BookOpen } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const PujaGuideView = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const [goal, setGoal] = useState('peace');
  const [experience, setExperience] = useState('daily');
  const [recommendedProduct, setRecommendedProduct] = useState(PRODUCTS[0]);
  const [answered, setAnswered] = useState(false);

  const handleCalculate = () => {
    let chosen = PRODUCTS[0]; // Tulasi Mala
    if (goal === 'protection') {
      chosen = PRODUCTS[1]; // Karungali Mala
    } else if (goal === 'prosperity') {
      chosen = PRODUCTS[5]; // Jalasthana Vastu Perumal
    } else if (goal === 'meditation') {
      chosen = PRODUCTS[2]; // Rudraksha
    } else if (goal === 'focus') {
      chosen = PRODUCTS[3]; // Sphatik
    }
    setRecommendedProduct(chosen);
    setAnswered(true);
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-0 py-8 mb-12 animate-fadeIn space-y-10">
      
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#09223F] bg-[#FFF3B0] px-3.5 py-1 rounded-full border border-[#D4AF37] inline-flex items-center gap-1.5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          Vedic Spiritual Guidance
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#09223F] mt-3 mb-2">
          Divine Recommendation
        </h1>
        <p className="text-xs md:text-sm text-[#434750]">
          Answer two simple spiritual questions to receive personalized Vedic guidance on the most auspicious mala, idol, or yantra for your current life phase.
        </p>
      </div>

      {/* Interactive Advisor Widget */}
      <div className="bg-white rounded-2xl ethereal-shadow border border-[#D4AF37]/30 p-6 md:p-8 max-w-3xl mx-auto relative overflow-hidden">
        <div className="space-y-6">
          
          {/* Question 1 */}
          <div>
            <label className="block font-serif text-sm font-bold text-[#09223F] mb-3">
              1. What is your primary spiritual intention or life goal right now?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {[
                { id: 'peace', label: 'Mental Peace & Devotion', icon: Heart },
                { id: 'protection', label: 'Shield from Evil Eye / Mars', icon: Shield },
                { id: 'prosperity', label: 'Home Vastu & Wealth Influx', icon: Compass },
                { id: 'meditation', label: 'Deep Shiva Dhyana & Energy', icon: Flame },
                { id: 'focus', label: 'Cooling, Memory & Clarity', icon: Sparkles },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setGoal(item.id);
                      setAnswered(false);
                    }}
                    className={`p-3.5 rounded-xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                      goal === item.id
                        ? 'border-[#09223F] bg-sky-50/90 font-bold text-[#09223F] ring-2 ring-[#D4AF37]/50 shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${goal === item.id ? 'text-[#09223F]' : 'text-[#005B82]'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <label className="block font-serif text-sm font-bold text-[#09223F] mb-3">
              2. How frequently do you engage in daily prayers or mantra chanting?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                { id: 'beginner', title: 'Beginner / Casual', desc: 'Starting meditation or wearing for positivity' },
                { id: 'daily', title: 'Daily Devotee', desc: '108 chants or morning sandhya vandanam' },
                { id: 'vastu', title: 'Home Sanctum Placement', desc: 'Placing in living altar, temple or foyer' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setExperience(item.id);
                    setAnswered(false);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    experience === item.id
                      ? 'border-[#09223F] bg-sky-50/90 font-bold text-[#09223F] ring-2 ring-[#D4AF37]/50 shadow-sm'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <p className="text-xs font-bold text-[#09223F]">{item.title}</p>
                  <p className="text-[11px] text-gray-500 font-normal mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="text-center pt-2">
            <button
              onClick={handleCalculate}
              className="bg-[#09223F] text-[#FFF3B0] px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#09223F] transition-all duration-300 shadow-md cursor-pointer inline-flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#FFF3B0] group-hover:text-[#09223F]" />
              <span>Reveal Divine Recommendation</span>
            </button>
          </div>

          {/* Recommended Artifact Box */}
          {answered && (
            <div className="mt-6 pt-6 border-t border-gray-200 bg-gradient-to-r from-sky-50/80 via-white to-amber-50/50 p-5 rounded-xl border border-[#D4AF37]/40 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={recommendedProduct.image}
                  alt={recommendedProduct.name}
                  className="w-28 h-28 object-contain rounded-lg bg-white border border-[#D4AF37]/30 p-2 flex-shrink-0 shadow-sm"
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="bg-[#09223F] text-[#FFF3B0] text-[10px] font-bold px-2 py-0.5 rounded border border-[#D4AF37]">
                      DIVINE MATCH
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{recommendedProduct.category}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#09223F]">
                    {recommendedProduct.name}
                  </h3>
                  <p className="text-xs text-[#434750] mt-1 leading-relaxed">
                    {recommendedProduct.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <span className="font-serif text-lg font-bold text-[#09223F]">
                      ₹{recommendedProduct.price.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => onAddToCart(recommendedProduct)}
                      className="bg-[#09223F] text-[#FFF3B0] text-xs font-bold px-4 py-2 rounded-lg border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#09223F] transition-all cursor-pointer"
                    >
                      Add Recommended Mala to Cart
                    </button>
                    <button
                      onClick={() => onSelectProduct(recommendedProduct)}
                      className="text-xs font-bold text-[#005B82] hover:text-[#09223F] hover:underline cursor-pointer"
                    >
                      View Full Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Vedic Rules & Spiritual FAQ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl ethereal-shadow border border-[#e0e3e5] space-y-3">
          <h3 className="font-serif text-base font-bold text-[#00254d] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#7b5800]" />
            Sacred Rules for Wearing Japa Malas
          </h3>
          <ul className="text-xs text-[#434750] space-y-2 leading-relaxed list-disc list-inside">
            <li>Always wear sacred beads after morning bath with pure mind and reverence.</li>
            <li>Do not allow others to touch your personal chanting mala; store in a Gomukhi Japa bag when not in use.</li>
            <li>Never cross the Guru bead (the central large bead); reverse direction upon completing 108 counts.</li>
            <li>Re-energize your mala on auspicious tithis (Ekadashi, Pradosham, Pournami) by offering chandan and dhoop.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl ethereal-shadow border border-[#e0e3e5] space-y-3">
          <h3 className="font-serif text-base font-bold text-[#00254d] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#7b5800]" />
            Vastu Directions for Peace & Prosperity
          </h3>
          <ul className="text-xs text-[#434750] space-y-2 leading-relaxed list-disc list-inside">
            <li><strong>North-East (Ishanya):</strong> Divine corner for Jalasthana Vastu Perumal, water bowls, and peaceful meditation.</li>
            <li><strong>East:</strong> Auspicious direction for Surya Yantras and daily prayer chanting facing morning sun.</li>
            <li><strong>South-East (Agneya):</strong> Best suited for lighting brass diyas, havan kunds, and pure sambrani dhoop.</li>
            <li><strong>North:</strong> Kubera corner for Sri Yantra and financial accounts.</li>
          </ul>
        </div>
      </div>

    </div>
  );
};
