import React from 'react';
import { AppointmentBooking } from '../types';
import { X, Calendar, Clock, User, Coffee, Trash2, Download, AlertCircle } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: AppointmentBooking[];
  onCancelAppointment: (id: string) => void;
  onNewBookingClick: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onNewBookingClick,
}) => {
  if (!isOpen) return null;

  const downloadIcs = (booking: AppointmentBooking) => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Elixir & Aura Haute Beauty Parlour//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Treatment at Élixir & Aura: ${booking.serviceNames.join(', ')}`,
      `DESCRIPTION:Specialist: ${booking.stylistName}\\nBeverage: ${booking.beveragePreference}\\nRef: ${booking.id}`,
      `LOCATION:${SALON_INFO.address}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Elixir_Aura_Reservation_${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-900/80">
              Client Portal
            </span>
            <h3 className="text-xl font-serif text-stone-900">
              Your Scheduled Experiences
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {appointments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-stone-200/80 p-6">
              <Calendar className="w-8 h-8 text-stone-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-stone-800">No active bookings recorded</p>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Explore our treatment menu to reserve a restorative session with a master stylist.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNewBookingClick();
                }}
                className="mt-4 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
              >
                Reserve Treatment
              </button>
            </div>
          ) : (
            appointments.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-900 uppercase tracking-wider">
                      Pass #{booking.id}
                    </span>
                    <h4 className="text-base font-serif font-medium text-stone-900 mt-0.5">
                      {booking.serviceNames.join(' + ')}
                    </h4>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Confirmed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>{booking.date} at {booking.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span>{booking.stylistName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{booking.totalDurationMinutes} mins (${booking.totalPrice})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="w-3.5 h-3.5 text-stone-400" />
                    <span className="truncate">{booking.beveragePreference}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => downloadIcs(booking)}
                    className="text-stone-600 hover:text-stone-900 flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save to Calendar</span>
                  </button>

                  <button
                    onClick={() => onCancelAppointment(booking.id)}
                    className="text-rose-600 hover:text-rose-800 flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Reservation</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-white flex items-center justify-between">
          <p className="text-[11px] text-stone-400">
            Need to reschedule? Call concierge at {SALON_INFO.phone}
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
