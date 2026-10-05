import React, { useState } from 'react';
import { TESTIMONIALS, FAQS } from '../data/salonData';
import { Star, ChevronDown, ChevronUp, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsAndFaq: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900/80 mb-2">
            <span>Client Praise</span>
            <span aria-hidden="true">·</span>
            <span>Over 850 Five-Star Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
            Words from Our Guests.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            From seamless wedding mornings to corrective blonde restorations, read why San Francisco discerning clientele consider our salon their urban sanctuary.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#FAF8F5] p-6 rounded-xl border border-stone-200/80 flex flex-col justify-between shadow-2xs"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between text-xs text-stone-400 mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono">{t.date}</span>
                </div>

                {/* Treatment and Stylist Tag */}
                <p className="text-[11px] uppercase tracking-wider font-semibold text-amber-950 mb-2">
                  {t.treatment}
                </p>

                {/* Quote */}
                <p className="text-xs text-stone-700 leading-relaxed italic font-serif">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Attribution */}
              <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-stone-900">{t.clientName}</p>
                  <p className="text-[11px] text-stone-500">{t.city}</p>
                </div>
                <span className="text-[10px] text-stone-400">Stylist: {t.stylist.split(' ')[0]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto pt-6 border-t border-stone-100">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-900/80">
              Clarity & Policies
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Everything you need to know about reserving your treatment and salon amenities.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-200 bg-[#FAF8F5] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-100/50 transition-colors"
                  >
                    <span className="text-sm font-medium text-stone-900 font-serif">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-stone-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-200/50 pt-3 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
