import React, { useState } from 'react';
import { TRANSFORMATIONS } from '../data/salonData';
import { Clock, User, Sparkles, ArrowRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  onBookService: (serviceName: string) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onBookService }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100

  const current = TRANSFORMATIONS[selectedIdx];

  // Curated visual representations for before and after states
  // Using styled high-fidelity representations
  const transformationMedia = [
    {
      // Balayage
      before: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      after: '/src/assets/images/service_hair_styling_1791194596048.jpg',
    },
    {
      // Skin
      before: 'https://images.unsplash.com/photo-1512290900672-1f55b6d92582?auto=format&fit=crop&w=800&q=80',
      after: '/src/assets/images/service_skincare_facial_1791194624268.jpg',
    },
    {
      // French Bob
      before: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80',
      after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const currentMedia = transformationMedia[selectedIdx] || transformationMedia[0];

  return (
    <section id="transformations" className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900/80 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Visible Transformations</span>
              <span aria-hidden="true">·</span>
              <span>Real Salon Clients</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
              Artistry Proven in Every Angle.
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base max-w-xl">
              Drag the center divider to observe the dramatic tonal evolution, textural rejuvenation, and facial contouring achieved in a single salon session.
            </p>
          </div>

          {/* Transformation Case Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 rounded-lg shrink-0 overflow-x-auto">
            {TRANSFORMATIONS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedIdx(idx);
                  setSliderPos(50);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedIdx === idx
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white p-6 sm:p-10 rounded-2xl border border-stone-200/80 shadow-xs">
          {/* Interactive Split Canvas */}
          <div className="lg:col-span-7">
            <div
              className="relative aspect-[4/3] rounded-xl overflow-hidden select-none cursor-ew-resize bg-stone-100 shadow-inner border border-stone-200"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                setSliderPos(Math.round((x / rect.width) * 100));
              }}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                setSliderPos(Math.round((x / rect.width) * 100));
              }}
            >
              {/* After Image (Full width background) */}
              <img
                src={currentMedia.after}
                alt="After transformation"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded">
                After: {current.afterLabel}
              </div>

              {/* Before Image (Clipped by slider position) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={currentMedia.before}
                  alt="Before transformation"
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none max-w-none"
                  style={{ width: '100%', minWidth: '100%' }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-xs text-stone-200 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded whitespace-nowrap">
                  Before: {current.beforeLabel}
                </div>
              </div>

              {/* Slider Handle Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl cursor-ew-resize pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-stone-900 shadow-md border border-stone-300 flex items-center justify-center text-xs font-bold">
                  ↔
                </div>
              </div>
            </div>

            {/* Slider Drag Hint */}
            <p className="text-[11px] text-stone-400 text-center mt-2.5">
              Drag or hover horizontally across the photo to reveal full transition
            </p>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                <span>{current.category}</span>
                <span>·</span>
                <span>{current.treatment}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 leading-snug">
                {current.title}
              </h3>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              {current.details}
            </p>

            {/* Metadata specs */}
            <div className="py-4 border-t border-b border-stone-100 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <User className="w-3.5 h-3.5 text-stone-500" />
                  <span>Master Artist</span>
                </p>
                <p className="text-sm font-semibold text-stone-900">{current.stylistName}</p>
              </div>

              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span>Time Invested</span>
                </p>
                <p className="text-sm font-semibold text-stone-900 font-mono tabular-nums">
                  {current.duration}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onBookService(current.treatment)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors shadow-xs cursor-pointer"
              >
                <span>Book This Transformation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
