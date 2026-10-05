import React, { useState } from 'react';
import { Calendar, Sparkles, Menu, X, Clock, BookmarkCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
  onOpenGiftCard: () => void;
  onOpenMyAppointments: () => void;
  bookedCount: number;
  selectedServicesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenQuiz,
  onOpenGiftCard,
  onOpenMyAppointments,
  bookedCount,
  selectedServicesCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-2xl sm:text-3xl font-serif tracking-tight text-stone-900 hover:text-stone-700 transition-colors whitespace-nowrap"
          >
            Élixir & Aura
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Services Menu
            </button>
            <button
              onClick={() => scrollToSection('transformations')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Transformations
            </button>
            <button
              onClick={() => scrollToSection('stylists')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Master Artists
            </button>
            <button
              onClick={() => scrollToSection('bridal')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Bridal Atelier
            </button>
            <button
              onClick={onOpenQuiz}
              className="hover:text-amber-800 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Skin & Hair Quiz</span>
            </button>
            <button
              onClick={onOpenGiftCard}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Gift Vouchers
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {bookedCount > 0 && (
              <button
                onClick={onOpenMyAppointments}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors whitespace-nowrap"
                title="View your confirmed appointments"
              >
                <BookmarkCheck className="w-3.5 h-3.5 text-stone-600" />
                <span>My Bookings ({bookedCount})</span>
              </button>
            )}

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-all shadow-sm whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {selectedServicesCount > 0 ? `Book (${selectedServicesCount}) Treatments` : 'Book Appointment'}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-stone-200 px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 text-sm font-medium text-stone-700">
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2 hover:text-stone-900 border-b border-stone-200/50"
            >
              Services Menu
            </button>
            <button
              onClick={() => scrollToSection('transformations')}
              className="text-left py-2 hover:text-stone-900 border-b border-stone-200/50"
            >
              Transformations & Results
            </button>
            <button
              onClick={() => scrollToSection('stylists')}
              className="text-left py-2 hover:text-stone-900 border-b border-stone-200/50"
            >
              Master Artists & Stylists
            </button>
            <button
              onClick={() => scrollToSection('bridal')}
              className="text-left py-2 hover:text-stone-900 border-b border-stone-200/50"
            >
              Bridal Atelier & VIP Suite
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="text-left py-2 text-amber-800 font-semibold flex items-center gap-2 border-b border-stone-200/50"
            >
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Take Beauty Consultation Quiz</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGiftCard();
              }}
              className="text-left py-2 hover:text-stone-900 border-b border-stone-200/50"
            >
              Luxury Gift Vouchers
            </button>

            {bookedCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyAppointments();
                }}
                className="text-left py-2 text-stone-900 font-semibold flex items-center gap-2"
              >
                <BookmarkCheck className="w-4 h-4 text-stone-700" />
                <span>My Confirmed Appointments ({bookedCount})</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
