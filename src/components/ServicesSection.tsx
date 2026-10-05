import React, { useState, useMemo } from 'react';
import { SERVICES } from '../data/salonData';
import { Service, ServiceCategory } from '../types';
import { Clock, Check, Plus, Search, Sparkles, ChevronRight, Info } from 'lucide-react';

interface ServicesSectionProps {
  selectedServiceIds: string[];
  onToggleService: (serviceId: string) => void;
  onDirectBook: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedServiceIds,
  onToggleService,
  onDirectBook,
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectingService, setInspectingService] = useState<Service | null>(null);

  const categories: { key: ServiceCategory; label: string }[] = [
    { key: 'all', label: 'All Treatments' },
    { key: 'hair', label: 'Hair Couture' },
    { key: 'skin', label: 'Restorative Skincare' },
    { key: 'bridal', label: 'Bridal Atelier' },
    { key: 'nails', label: 'Artisan Nails' },
    { key: 'spa', label: 'Holistic Head Spa' },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.includes.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="services" className="py-16 md:py-24 bg-[#F5F2EB]/50 border-t border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900/80 mb-2">
              <span>Bespoke Menu</span>
              <span aria-hidden="true">·</span>
              <span>100% Biodynamic Botanical Formulations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
              Curated Treatments for Hair, Skin & Soul.
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Every appointment includes a personalized scalp or complexion assessment, high-velocity Dyson styling, and our complimentary artisanal beverage pairing.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search treatments or techniques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-800 placeholder-stone-400"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 border border-stone-200/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8">
            <p className="text-stone-500 text-sm">No treatments found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-medium text-stone-900 underline underline-offset-4"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => {
              const isSelected = selectedServiceIds.includes(service.id);

              return (
                <div
                  key={service.id}
                  className={`group bg-white rounded-xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                    isSelected ? 'border-stone-900 ring-1 ring-stone-900' : 'border-stone-200/80 hover:border-stone-300'
                  }`}
                >
                  {/* Service Visual Preview if available */}
                  {service.image && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100 border-b border-stone-100">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {service.tag && (
                        <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs text-white text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded">
                          {service.tag}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top Meta: Duration & Price */}
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-2.5">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>{service.durationMinutes} minutes</span>
                        </div>
                        <span className="text-base font-semibold text-stone-900 font-mono tabular-nums">
                          ${service.price}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-serif text-stone-900 leading-snug group-hover:text-amber-950 transition-colors">
                        {service.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-2.5 text-xs text-stone-600 leading-relaxed line-clamp-3">
                        {service.description}
                      </p>

                      {/* Included steps preview */}
                      <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5">
                        <p className="text-[11px] font-medium text-stone-400 uppercase tracking-wider">Includes:</p>
                        {service.includes.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-stone-600">
                            <span className="text-stone-300 font-serif text-xs leading-none">·</span>
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setInspectingService(service)}
                        className="text-xs font-medium text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors cursor-pointer"
                        title="View treatment steps"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleService(service.id)}
                          className={`px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                            isSelected
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-amber-800" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 text-stone-600" />
                              <span>Select</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => onDirectBook(service.id)}
                          className="px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors shadow-xs whitespace-nowrap cursor-pointer"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      {inspectingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInspectingService(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              aria-label="Close details"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider mb-2">
              <span>{inspectingService.category.toUpperCase()} RITUAL</span>
              <span>·</span>
              <span>{inspectingService.durationMinutes} MIN</span>
            </div>

            <h3 className="text-2xl font-serif text-stone-900">{inspectingService.name}</h3>

            <p className="text-lg font-semibold text-stone-900 font-mono mt-1 mb-4">
              ${inspectingService.price}
            </p>

            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              {inspectingService.description}
            </p>

            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/60 mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
                Treatment Protocol Steps:
              </h4>
              <ul className="space-y-2">
                {inspectingService.includes.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                    <span className="w-4 h-4 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-[10px] shrink-0 font-medium">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-stone-100">
              <button
                onClick={() => setInspectingService(null)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = inspectingService.id;
                  setInspectingService(null);
                  onDirectBook(id);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md cursor-pointer"
              >
                Book This Treatment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
