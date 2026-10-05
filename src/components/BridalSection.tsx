import React from 'react';
import { BRIDAL_PACKAGES } from '../data/salonData';
import { Sparkles, Check, Clock, Calendar, Heart, Shield } from 'lucide-react';

interface BridalSectionProps {
  onOpenBookingForBridal: (serviceId?: string) => void;
}

export const BridalSection: React.FC<BridalSectionProps> = ({ onOpenBookingForBridal }) => {
  return (
    <section id="bridal" className="py-16 md:py-24 bg-[#F5F2EB]/40 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro with Image Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900/80">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Haute Bridal Atelier</span>
              <span aria-hidden="true">·</span>
              <span>Private VIP Penthouse Salon</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
              A Serene Sanctuary for Your Most Luminous Morning.
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Step into our private bridal penthouse wing. Far removed from the chaos of wedding morning prep, our team choreographs every detail—from pre-wedding Japanese scalp relaxation and veil placement to champagne mimosas and tear-proof 18-hour airbrush radiance.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenBookingForBridal('bridal-couture-preview')}
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors shadow-xs cursor-pointer"
              >
                Reserve Bridal Trial Session
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-stone-200 border border-stone-200/80">
              <img
                src="/src/assets/images/service_bridal_glamour_1791194635313.jpg"
                alt="Bridal atelier hairstyle and luminous dewy makeup"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-xs uppercase tracking-wider font-semibold text-amber-200">Exclusive Bridal Wing</p>
                  <p className="text-base font-serif">Tailored hair pieces, fine French veils & custom shade trials</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bridal Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BRIDAL_PACKAGES.map((pkg, idx) => {
            const isHighlight = idx === 0;

            return (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isHighlight
                    ? 'bg-stone-900 text-white shadow-xl ring-1 ring-stone-900'
                    : 'bg-white text-stone-900 border border-stone-200/80 shadow-xs hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={isHighlight ? 'text-amber-300 font-medium' : 'text-stone-500 font-medium'}>
                      {pkg.recommendedMonthsBefore}
                    </span>
                    <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                      isHighlight ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {pkg.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif leading-snug mb-1">{pkg.name}</h3>
                  <p className={`text-xs ${isHighlight ? 'text-stone-300' : 'text-stone-600'} mb-4`}>
                    {pkg.tagline}
                  </p>

                  <div className="mb-6 pb-4 border-b border-stone-200/20">
                    <span className="text-3xl font-serif font-bold font-mono tabular-nums">
                      ${pkg.price}
                    </span>
                    <span className={`text-xs ml-2 ${isHighlight ? 'text-stone-400' : 'text-stone-500'}`}>
                      complete package
                    </span>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isHighlight ? 'text-amber-300' : 'text-stone-700'
                          }`}
                        />
                        <span className={isHighlight ? 'text-stone-200' : 'text-stone-700'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-stone-200/20">
                  <button
                    onClick={() => onOpenBookingForBridal('bridal-day-of')}
                    className={`w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer text-center ${
                      isHighlight
                        ? 'bg-white text-stone-900 hover:bg-stone-100'
                        : 'bg-stone-900 text-white hover:bg-stone-800'
                    }`}
                  >
                    Select This Package
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
