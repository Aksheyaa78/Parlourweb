import React from 'react';
import { Calendar, Sparkles, ArrowRight, ShieldCheck, Award, Heart } from 'lucide-react';
import heroImg from '../assets/images/hero_luxury_beauty_salon_1791194579717.jpg';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenQuiz }) => {
  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500 mb-6 uppercase tracking-wider">
          <span>San Francisco Atelier</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Biodynamic & Cruelty-Free</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Bespoke Hair & Skin Sanctuary</span>
        </div>

        {/* Main Grid: Headline & Campaign Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-stone-900 leading-[1.12] tracking-tight [text-wrap:balance]">
              Where Botanical Purity Meets Haute Coiffure.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl font-normal">
              An architectural beauty parlour dedicated to effortless French balayage, restorative clinical HydraFacials, and bridal artistry. Each treatment is accompanied by our signature organic herbal and champagne bar.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-all shadow-sm hover:shadow cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Reserve An Experience</span>
              </button>

              <button
                onClick={scrollToServices}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded-md transition-colors cursor-pointer"
              >
                <span>View Treatment Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Diagnostic Hook */}
            <div className="pt-2">
              <button
                onClick={onOpenQuiz}
                className="group inline-flex items-center gap-2 text-xs font-medium text-amber-900 hover:text-amber-950 transition-colors"
              >
                <span className="p-1 rounded bg-amber-100/70 text-amber-800 group-hover:bg-amber-200/80 transition-colors">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="underline underline-offset-4 decoration-amber-300 group-hover:decoration-amber-600">
                  Unsure what your skin or hair requires? Take our 60-second diagnostic
                </span>
              </button>
            </div>

            {/* Claim-to-Proof Quantitative Adjacency */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl font-serif font-medium text-stone-900 tabular-nums">4.98 ★</p>
                <p className="text-xs text-stone-500 mt-0.5">850+ Verified Reviews</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-medium text-stone-900 tabular-nums">14 Yrs</p>
                <p className="text-xs text-stone-500 mt-0.5">Master Color Directors</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-medium text-stone-900 tabular-nums">100%</p>
                <p className="text-xs text-stone-500 mt-0.5">Organic & Toxin-Free</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl bg-stone-100 border border-stone-200/60">
              <img
                src={heroImg}
                alt="Élixir & Aura salon interior with travertine counters and soft ambient lighting"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback styling if local image fails
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />

              {/* Quiet In-Image Proof Note */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-stone-900/85 backdrop-blur-md px-4 py-3 rounded-lg text-white border border-stone-700/50 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <div>
                    <p className="text-xs font-medium tracking-wide">Private VIP Suites Available Today</p>
                    <p className="text-[11px] text-stone-300">Complimentary Laurent-Perrier Champagne with every color session</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
