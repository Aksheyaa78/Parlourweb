/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { StylistsSection } from './components/StylistsSection';
import { BridalSection } from './components/BridalSection';
import { TestimonialsAndFaq } from './components/TestimonialsAndFaq';
import { VisitAndFooter } from './components/VisitAndFooter';
import { BookingModal } from './components/BookingModal';
import { ConsultationQuizModal } from './components/ConsultationQuizModal';
import { GiftVoucherModal } from './components/GiftVoucherModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { AppointmentBooking } from './types';
import { SERVICES } from './data/salonData';
import { Calendar, Sparkles, X, Check, ArrowRight } from 'lucide-react';

export default function App() {
  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);
  const [isMyAppointmentsOpen, setIsMyAppointmentsOpen] = useState(false);

  // Selection states
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [preselectedStylistId, setPreselectedStylistId] = useState<string | null>(null);

  // Persistent bookings
  const [appointments, setAppointments] = useState<AppointmentBooking[]>([]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('elixir_aura_appointments');
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    } catch {
      // Fallback
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleToggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) => {
      const exists = prev.includes(serviceId);
      const updated = exists ? prev.filter((id) => id !== serviceId) : [...prev, serviceId];
      const service = SERVICES.find((s) => s.id === serviceId);
      if (service) {
        showToast(exists ? `Removed ${service.name} from selection` : `Added ${service.name} to booking`);
      }
      return updated;
    });
  };

  const handleDirectBook = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    if (!selectedServiceIds.includes(serviceId)) {
      setSelectedServiceIds((prev) => [...prev, serviceId]);
    }
    setIsBookingOpen(true);
  };

  const handleSelectStylistForBooking = (stylistId: string) => {
    setPreselectedStylistId(stylistId);
    setIsBookingOpen(true);
  };

  const handleBookFromTransformation = (treatmentName: string) => {
    // Find matching service or open booking
    const matched = SERVICES.find((s) => s.name.toLowerCase().includes(treatmentName.toLowerCase()));
    if (matched) {
      handleDirectBook(matched.id);
    } else {
      setIsBookingOpen(true);
    }
  };

  const handleRecommendedService = (serviceId: string) => {
    handleDirectBook(serviceId);
  };

  const handleBookingSuccess = (newBooking: AppointmentBooking) => {
    setAppointments((prev) => [newBooking, ...prev]);
    setSelectedServiceIds([]);
    showToast(`Reservation ${newBooking.id} secured! Check your email for details.`);
  };

  const handleCancelAppointment = (id: string) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    try {
      localStorage.setItem('elixir_aura_appointments', JSON.stringify(updated));
    } catch {}
    showToast('Reservation successfully cancelled.');
  };

  // Selected services calculation for bottom sticky bar
  const selectedServices = SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  const selectedTotalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const selectedTotalDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 selection:bg-stone-900 selection:text-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-3 rounded-lg shadow-xl border border-stone-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        onOpenBooking={() => {
          setPreselectedServiceId(null);
          setPreselectedStylistId(null);
          setIsBookingOpen(true);
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenGiftCard={() => setIsGiftCardOpen(true)}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
        bookedCount={appointments.length}
        selectedServicesCount={selectedServiceIds.length}
      />

      <main>
        {/* Campaign Hero Section */}
        <Hero
          onOpenBooking={() => {
            setPreselectedServiceId(null);
            setPreselectedStylistId(null);
            setIsBookingOpen(true);
          }}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Interactive Services Catalog */}
        <ServicesSection
          selectedServiceIds={selectedServiceIds}
          onToggleService={handleToggleService}
          onDirectBook={handleDirectBook}
        />

        {/* Interactive Before & After Transformation Slider */}
        <BeforeAfterSlider onBookService={handleBookFromTransformation} />

        {/* Master Stylists & Clinical Estheticians */}
        <StylistsSection onSelectStylistForBooking={handleSelectStylistForBooking} />

        {/* Bridal Atelier Suite */}
        <BridalSection
          onOpenBookingForBridal={(serviceId) => {
            if (serviceId) {
              handleDirectBook(serviceId);
            } else {
              setIsBookingOpen(true);
            }
          }}
        />

        {/* Verified Reviews & FAQs */}
        <TestimonialsAndFaq />
      </main>

      {/* Salon Visit Details & Quiet Footer */}
      <VisitAndFooter
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenGiftCard={() => setIsGiftCardOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Sticky Selection Bar if user selected items */}
      {selectedServiceIds.length > 0 && !isBookingOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-stone-900 text-white px-4 py-3.5 shadow-2xl border-t border-stone-800 animate-in slide-in-from-bottom-3 duration-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse hidden sm:block" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-200">
                  {selectedServiceIds.length} Treatment{selectedServiceIds.length > 1 ? 's' : ''} Selected
                </p>
                <p className="text-xs text-stone-300">
                  Total: <span className="font-mono font-bold text-white">${selectedTotalPrice}</span> · {selectedTotalDuration} mins
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedServiceIds([])}
                className="text-xs text-stone-400 hover:text-white px-2 py-1 cursor-pointer"
              >
                Clear
              </button>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-white hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
              >
                <span>Proceed to Reservation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={preselectedServiceId}
        preselectedStylistId={preselectedStylistId}
        onBookingSuccess={handleBookingSuccess}
      />

      <ConsultationQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectRecommendedService={handleRecommendedService}
      />

      <GiftVoucherModal
        isOpen={isGiftCardOpen}
        onClose={() => setIsGiftCardOpen(false)}
      />

      <MyAppointmentsModal
        isOpen={isMyAppointmentsOpen}
        onClose={() => setIsMyAppointmentsOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onNewBookingClick={() => {
          setIsMyAppointmentsOpen(false);
          setIsBookingOpen(true);
        }}
      />
    </div>
  );
}
