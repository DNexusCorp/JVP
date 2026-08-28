import React from 'react';
import { Sparkles, CheckCircle2, PackageCheck, Truck, RotateCcw, Users } from 'lucide-react';

export const ValueProps = () => {
  const values = [
    {
      title: 'Blessed & Energized',
      subtitle: 'Spiritually Empowered',
      icon: Sparkles,
    },
    {
      title: '100% Original',
      subtitle: 'Sourced with Devotion',
      icon: CheckCircle2,
    },
    {
      title: 'Secure Packaging',
      subtitle: 'Handled with Care',
      icon: PackageCheck,
    },
    {
      title: 'Pan India Delivery',
      subtitle: 'Fast & Reliable',
      icon: Truck,
    },
    {
      title: 'Easy Returns',
      subtitle: 'Hassle Free Returns',
      icon: RotateCcw,
    },
    {
      title: 'Happy Customers',
      subtitle: 'Trusted by Thousands',
      icon: Users,
    }
  ];

  return (
    <section className="bg-white/80 backdrop-blur-sm border-y border-[#e0e3e5] py-5 px-4 md:px-8 mb-12 rounded-lg ethereal-shadow mx-auto max-w-[1280px]">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">
        {values.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-3 justify-center sm:justify-start lg:justify-center p-2 ${
                index !== 0 ? 'lg:pl-4' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-sky-50/80 border border-sky-100 flex items-center justify-center flex-shrink-0 text-[#00254d]">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#00254d] leading-tight">
                  {item.title}
                </span>
                <span className="text-[11px] text-[#434750] leading-snug">
                  {item.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
