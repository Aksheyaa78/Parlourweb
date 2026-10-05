import React, { useState } from 'react';
import { SALON_INFO } from '../data/salonData';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface VisitAndFooterProps {
  onOpenBooking: () => void;
  onOpenGiftCard: () => void;
  onOpenQuiz: () => void;
}

export const VisitAndFooter: React.FC<VisitAndFooterProps> = ({
  onOpenBooking,
  onOpenGiftCard,
  onOpenQuiz,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  return (
    <footer id="visit" className="bg-stone-900 text-stone-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Salon Visit Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-stone-800">
          {/* Brand & Address */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-2xl font-serif tracking-tight text-white">
              {SALON_INFO.name}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {SALON_INFO.tagline}. An architectural sanctuary dedicated to high-fashion hair styling, medical-grade skin therapies, and sensory restoration.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{SALON_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{SALON_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-stone-400 block mb-1 font-medium">Complimentary Valet Service:</span>
              <p className="text-[11px] text-stone-500">
                Curbside valet attendants available at our Post Street portico for all scheduled appointments.
              </p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Salon Atelier Hours
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              {SALON_INFO.hours.map((h, i) => (
                <div key={i} className="flex justify-between border-b border-stone-800 pb-1.5">
                  <span className="text-stone-300">{h.days}</span>
                  <span className="font-mono text-stone-400">{h.time}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-stone-100 hover:bg-white rounded-md transition-colors text-center cursor-pointer shadow-xs"
              >
                Reserve Your Time Slot
              </button>
            </div>
          </div>

          {/* Private Newsletter / Journal */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              The Botanical Gazette
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive quarterly invitations to seasonal salon previews, bridal showcases, and biodynamic hair formulation notes.
            </p>

            {subscribed ? (
              <div className="p-3 bg-stone-800/80 rounded-lg border border-stone-700 flex items-center gap-2 text-xs text-emerald-400">
                <Check className="w-4 h-4 shrink-0" />
                <span>Welcome to our private circle. First invitation dispatched shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-800 border border-stone-700 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-300 text-stone-200 placeholder-stone-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 text-xs font-medium text-stone-200 bg-stone-800 hover:bg-stone-700 rounded-md border border-stone-700 transition-colors cursor-pointer"
                >
                  Join Guestbook
                </button>
              </form>
            )}

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-400">
              <button onClick={onOpenGiftCard} className="hover:text-white transition-colors cursor-pointer underline underline-offset-4">
                Send Gift Voucher
              </button>
              <button onClick={onOpenQuiz} className="hover:text-white transition-colors cursor-pointer underline underline-offset-4">
                Beauty Diagnostic
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Footer Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Élixir & Aura Haute Beauty Parlour. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Cruelty-Free Certified</span>
            <span>·</span>
            <span>Organic Biodynamic Formulations</span>
            <span>·</span>
            <span>Private Salon Sanctuary</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
