import React from 'react';
import { STYLISTS } from '../data/salonData';
import { Stylist } from '../types';
import { Star, Award, Instagram, Calendar, ArrowRight } from 'lucide-react';

interface StylistsSectionProps {
  onSelectStylistForBooking: (stylistId: string) => void;
}

export const StylistsSection: React.FC<StylistsSectionProps> = ({ onSelectStylistForBooking }) => {
  return (
    <section id="stylists" className="py-16 md:py-24 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900/80 mb-2">
            <span>Master Guild</span>
            <span aria-hidden="true">·</span>
            <span>Parisian & Clinical Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
            The Artists Behind the Aura.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Our team comprises internationally awarded color directors, trichologists, and celebrity aesthetic artists dedicated to personalized botanical care.
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STYLISTS.map((stylist) => (
            <div
              key={stylist.id}
              className="bg-[#FAF8F5] rounded-xl border border-stone-200/80 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-stone-300 group"
            >
              <div>
                {/* Stylist Portrait */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-200">
                  <img
                    src={stylist.avatar}
                    alt={stylist.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded flex items-center gap-1.5">
                    <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                    <span>{stylist.rating} ({stylist.reviewCount})</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span>{stylist.experienceYears} Years Experience</span>
                    <span className="text-stone-400 font-mono text-[11px]">{stylist.instagram}</span>
                  </div>

                  <h3 className="text-lg font-serif font-semibold text-stone-900 leading-snug">
                    {stylist.name}
                  </h3>
                  <p className="text-xs text-stone-600 font-medium mt-0.5">{stylist.title}</p>

                  <p className="text-xs text-stone-600 leading-relaxed mt-3 line-clamp-3">
                    {stylist.bio}
                  </p>

                  {/* Specialties */}
                  <div className="mt-4 pt-3 border-t border-stone-200/60">
                    <p className="text-[10px] font-medium text-stone-400 uppercase tracking-wider mb-1.5">
                      Masteries:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {stylist.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[11px] text-stone-700 bg-white border border-stone-200/80 px-2 py-0.5 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectStylistForBooking(stylist.id)}
                  className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-white bg-white hover:bg-stone-900 border border-stone-300 hover:border-stone-900 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve with {stylist.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
