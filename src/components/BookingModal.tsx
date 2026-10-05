import React, { useState, useEffect, useMemo } from 'react';
import { SERVICES, STYLISTS, SALON_INFO } from '../data/salonData';
import { AppointmentBooking } from '../types';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  Check,
  User,
  Coffee,
  Sparkles,
  Download,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Share2
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string | null;
  preselectedStylistId?: string | null;
  onBookingSuccess: (booking: AppointmentBooking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedStylistId,
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedStylistId, setSelectedStylistId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [beveragePreference, setBeveragePreference] = useState(SALON_INFO.beverages[0]);
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(null);

  // Initialize or update preselection
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceIds((prev) =>
        prev.includes(preselectedServiceId) ? prev : [...prev, preselectedServiceId]
      );
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedStylistId) {
      setSelectedStylistId(preselectedStylistId);
    }
  }, [preselectedStylistId]);

  // Generate available dates for the next 10 days
  const availableDates = useMemo(() => {
    const dates = [];
    const now = new Date();
    for (let i = 0; i < 10; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      const isSunday = d.getDay() === 0;
      const formatted = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dates.push({
        iso: formatted,
        dayName,
        monthDay,
        isSunday,
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : `${dayName}, ${monthDay}`,
      });
    }
    return dates;
  }, []);

  // Pre-select first date if empty
  useEffect(() => {
    if (!selectedDate && availableDates.length > 0) {
      setSelectedDate(availableDates[0].iso);
    }
  }, [availableDates, selectedDate]);

  // Available Time Slots
  const morningSlots = ['09:30 AM', '10:45 AM', '11:30 AM'];
  const afternoonSlots = ['01:15 PM', '02:30 PM', '03:45 PM'];
  const eveningSlots = ['05:00 PM', '06:15 PM', '07:00 PM'];

  // Calculations
  const selectedServices = SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  const selectedStylist =
    selectedStylistId === 'any'
      ? { name: 'First Available Master Artist', title: 'Senior Salon Specialist' }
      : STYLISTS.find((st) => st.id === selectedStylistId) || {
          name: 'First Available Master Artist',
          title: 'Senior Salon Specialist',
        };

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      alert('Please complete all contact details to secure your reservation.');
      return;
    }

    const booking: AppointmentBooking = {
      id: `EA-${Math.floor(10000 + Math.random() * 90000)}`,
      serviceIds: selectedServiceIds,
      serviceNames: selectedServices.map((s) => s.name),
      stylistId: selectedStylistId,
      stylistName: selectedStylist.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      clientName,
      clientEmail,
      clientPhone,
      beveragePreference,
      notes,
      totalPrice,
      totalDurationMinutes: totalDuration,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('elixir_aura_appointments') || '[]');
      existing.push(booking);
      localStorage.setItem('elixir_aura_appointments', JSON.stringify(existing));
    } catch {
      // LocalStorage fallback
    }

    setConfirmedBooking(booking);
    onBookingSuccess(booking);
    setStep(5);
  };

  // Generate downloadable .ics calendar file
  const downloadCalendarFile = () => {
    if (!confirmedBooking) return;
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Elixir & Aura Haute Beauty Parlour//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Treatment at Élixir & Aura: ${confirmedBooking.serviceNames.join(', ')}`,
      `DESCRIPTION:Specialist: ${confirmedBooking.stylistName}\\nBeverage: ${confirmedBooking.beveragePreference}\\nRef: ${confirmedBooking.id}`,
      `LOCATION:${SALON_INFO.address}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Elixir_Aura_Reservation_${confirmedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-900/80">
              Private Reservation
            </span>
            <h3 className="text-xl font-serif text-stone-900">
              {step === 5 ? 'Reservation Confirmed' : 'Reserve Salon Treatment'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps Stepper */}
        {step < 5 && (
          <div className="bg-stone-100/80 px-6 py-3 border-b border-stone-200 flex items-center justify-between text-xs font-medium text-stone-500">
            <span className={step === 1 ? 'text-stone-900 font-semibold' : ''}>1. Services</span>
            <span>·</span>
            <span className={step === 2 ? 'text-stone-900 font-semibold' : ''}>2. Artist</span>
            <span>·</span>
            <span className={step === 3 ? 'text-stone-900 font-semibold' : ''}>3. Date & Time</span>
            <span>·</span>
            <span className={step === 4 ? 'text-stone-900 font-semibold' : ''}>4. Hospitality</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* STEP 1: Select Services */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Select Treatment(s)</h4>
                  <p className="text-xs text-stone-500">You may combine multiple treatments into a single visit.</p>
                </div>
                {selectedServiceIds.length > 0 && (
                  <span className="text-xs font-medium text-stone-700 bg-amber-100/70 px-2.5 py-1 rounded">
                    {selectedServiceIds.length} Selected (${totalPrice})
                  </span>
                )}
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {SERVICES.map((s) => {
                  const isChecked = selectedServiceIds.includes(s.id);
                  return (
                    <label
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`flex items-start justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-xs'
                          : 'border-stone-200/80 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                            isChecked ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                          <p className="text-sm font-serif font-medium text-stone-900">{s.name}</p>
                          <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{s.durationMinutes} mins</span>
                            <span>·</span>
                            <span className="capitalize">{s.category}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-semibold font-mono text-stone-900 tabular-nums">
                        ${s.price}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Select Artist */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-stone-900">Choose Your Specialist</h4>
                <p className="text-xs text-stone-500">Each artist is certified in French precision and holistic hair care.</p>
              </div>

              <div className="space-y-3">
                {/* Any Master Stylist option */}
                <label
                  onClick={() => setSelectedStylistId('any')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedStylistId === 'any'
                      ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-xs'
                      : 'border-stone-200/80 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700">
                      <Sparkles className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-900">First Available Master Artist</p>
                      <p className="text-xs text-stone-500">Fastest booking availability across all senior directors</p>
                    </div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedStylistId === 'any' ? 'border-stone-900 bg-stone-900' : 'border-stone-300'
                    }`}
                  >
                    {selectedStylistId === 'any' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </label>

                {/* Individual Stylists */}
                {STYLISTS.map((st) => (
                  <label
                    key={st.id}
                    onClick={() => setSelectedStylistId(st.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedStylistId === st.id
                        ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-xs'
                        : 'border-stone-200/80 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={st.avatar}
                        alt={st.name}
                        className="w-10 h-10 rounded-full object-cover border border-stone-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-stone-900">{st.name}</p>
                          <span className="text-[11px] text-amber-800 font-medium">★ {st.rating}</span>
                        </div>
                        <p className="text-xs text-stone-500">{st.title}</p>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedStylistId === st.id ? 'border-stone-900 bg-stone-900' : 'border-stone-300'
                      }`}
                    >
                      {selectedStylistId === st.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Picker */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-stone-900">Select Date & Time Slot</h4>
                <p className="text-xs text-stone-500">Live availability updated for {selectedStylist.name}</p>
              </div>

              {/* Date Pills Slider */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                  Preferred Date
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.iso;
                    return (
                      <button
                        key={item.iso}
                        type="button"
                        onClick={() => setSelectedDate(item.iso)}
                        className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <p className="text-[10px] uppercase font-semibold">{item.dayName}</p>
                        <p className="text-base font-serif font-bold mt-0.5">{item.monthDay.split(' ')[1]}</p>
                        <p className="text-[10px] opacity-75">{item.monthDay.split(' ')[0]}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                  Available Slots
                </label>

                {/* Morning */}
                <div>
                  <p className="text-[11px] font-medium text-stone-400 mb-1.5">Morning</p>
                  <div className="grid grid-cols-3 gap-2">
                    {morningSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 px-3 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                          selectedTimeSlot === slot
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Afternoon */}
                <div>
                  <p className="text-[11px] font-medium text-stone-400 mb-1.5">Afternoon</p>
                  <div className="grid grid-cols-3 gap-2">
                    {afternoonSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 px-3 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                          selectedTimeSlot === slot
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Evening */}
                <div>
                  <p className="text-[11px] font-medium text-stone-400 mb-1.5">Evening</p>
                  <div className="grid grid-cols-3 gap-2">
                    {eveningSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 px-3 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                          selectedTimeSlot === slot
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Client Info & Hospitality */}
          {step === 4 && (
            <form id="booking-form" onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-stone-900">Hospitality & Guest Details</h4>
                <p className="text-xs text-stone-500">We tailor every nuance to your comfort before you step into the parlour.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Genevieve Sterling"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="genevieve@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-700 mb-1">Mobile Phone (For SMS Reminders) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (415) 555-0199"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              {/* Complimentary Beverage Preference */}
              <div className="pt-2">
                <label className="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-amber-700" />
                  <span>Complimentary Welcome Beverage Pairing</span>
                </label>
                <select
                  value={beveragePreference}
                  onChange={(e) => setBeveragePreference(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-800"
                >
                  {SALON_INFO.beverages.map((bev) => (
                    <option key={bev} value={bev}>
                      {bev}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Considerations & Notes */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Special Notes, Scalp Sensitivities, or Silent Appointment Request
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Sensitive scalp, preferring a quiet appointment to read, or vegan product preference..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              {/* Summary Box */}
              <div className="bg-stone-100 rounded-xl p-4 border border-stone-200 text-xs space-y-1.5">
                <div className="flex justify-between font-medium text-stone-900">
                  <span>Investment Total:</span>
                  <span className="font-mono text-sm">${totalPrice}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Estimated Duration:</span>
                  <span>{totalDuration} minutes</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Scheduled Date & Time:</span>
                  <span>{selectedDate} at {selectedTimeSlot || 'Pending selection'}</span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 5: Booking Confirmation Receipt */}
          {step === 5 && confirmedBooking && (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <Check className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-amber-900/80 font-semibold">
                  Reservation Secured
                </span>
                <h3 className="text-2xl font-serif text-stone-900 mt-1">
                  We Look Forward to Welcoming You.
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  A calendar confirmation and preparation notes have been dispatched to {confirmedBooking.clientEmail}
                </p>
              </div>

              {/* Haute Pass Card */}
              <div className="bg-white rounded-xl border border-stone-300/80 p-5 text-left shadow-sm space-y-4 max-w-md mx-auto">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest">Confirmation Pass</p>
                    <p className="text-base font-serif font-bold text-stone-900">{confirmedBooking.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest">Client</p>
                    <p className="text-xs font-semibold text-stone-800">{confirmedBooking.clientName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase">Date & Time</p>
                    <p className="font-medium text-stone-800">{confirmedBooking.date}</p>
                    <p className="text-stone-600">{confirmedBooking.timeSlot}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase">Specialist</p>
                    <p className="font-medium text-stone-800">{confirmedBooking.stylistName}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-stone-400 uppercase">Treatments Reserved</p>
                    <p className="font-medium text-stone-800">{confirmedBooking.serviceNames.join(' + ')}</p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-stone-100 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase">Hospitality Welcome</p>
                      <p className="text-stone-700 italic">{confirmedBooking.beveragePreference}</p>
                    </div>
                    <span className="text-sm font-semibold font-mono text-stone-900">
                      ${confirmedBooking.totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={downloadCalendarFile}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
                >
                  <span>Done</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Step 1 to 4) */}
        {step < 5 && (
          <div className="px-6 py-4 border-t border-stone-200 bg-white flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              {step === 1 && (
                <button
                  type="button"
                  disabled={selectedServiceIds.length === 0}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors cursor-pointer"
                >
                  <span>Next: Choose Artist</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
                >
                  <span>Next: Pick Date & Slot</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {step === 3 && (
                <button
                  type="button"
                  disabled={!selectedTimeSlot}
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors cursor-pointer"
                >
                  <span>Next: Guest Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {step === 4 && (
                <button
                  type="submit"
                  form="booking-form"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
                >
                  <span>Confirm Reservation</span>
                  <Check className="w-4 h-4 text-emerald-400" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
