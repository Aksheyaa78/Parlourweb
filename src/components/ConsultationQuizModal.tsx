import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, Heart } from 'lucide-react';
import { SERVICES } from '../data/salonData';

interface ConsultationQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendedService: (serviceId: string) => void;
}

export const ConsultationQuizModal: React.FC<ConsultationQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectRecommendedService,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const questions = [
    {
      id: 'focus',
      title: 'What is your primary beauty focus today?',
      options: [
        { label: 'Hair Restoration & Luminous Color', value: 'hair' },
        { label: 'Clinical Facial Radiance & Glass Skin', value: 'skin' },
        { label: 'Japanese Scalp Detox & Deep Relaxation', value: 'spa' },
        { label: 'Bridal Atelier or Black-Tie Preparation', value: 'bridal' },
      ],
    },
    {
      id: 'concern',
      title: 'What is your primary texture or aesthetic concern?',
      options: [
        { label: 'Dullness, brassiness or fading hair tone', value: 'tone' },
        { label: 'Pore congestion, fine lines & micro-creping', value: 'skin-health' },
        { label: 'Dry brittle cuticles and split ends', value: 'moisture' },
        { label: 'Scalp tension, product build-up & stress', value: 'scalp' },
      ],
    },
    {
      id: 'finish',
      title: 'What is your ideal aesthetic finish?',
      options: [
        { label: 'Lived-in French effortless dimensional blonde/brunette', value: 'effortless' },
        { label: 'Dewy, camera-ready porcelain glass glow', value: 'glass' },
        { label: 'Zero-damage natural nail and hand rejuvenation', value: 'clean-nail' },
        { label: 'Silky weightless hair with mirror-like light reflection', value: 'silk' },
      ],
    },
    {
      id: 'commitment',
      title: 'What treatment rhythm fits your schedule best?',
      options: [
        { label: 'Deliberate & unhurried multi-hour sanctuary experience', value: 'luxury' },
        { label: 'Targeted high-efficacy 60-to-75 minute session', value: 'express' },
      ],
    },
  ];

  const handleSelectOption = (questionId: string, optionValue: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionValue }));
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep(questions.length); // Results screen
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
  };

  // Compute recommendation
  const getRecommendation = () => {
    if (answers.focus === 'bridal') {
      return {
        serviceId: 'bridal-couture-preview',
        service: SERVICES.find((s) => s.id === 'bridal-couture-preview')!,
        reason: 'Based on your upcoming celebration, our Couture Bridal Preview provides a 2.5-hour private VIP suite testing session for weather-resistant makeup and structural hair architecture.',
        homeRitual: 'Organic Damask Rose Hydrating Face Mist & Silk Sleep Pillowcase',
      };
    }
    if (answers.focus === 'skin' || answers.concern === 'skin-health') {
      return {
        serviceId: 'skin-hydrafacial',
        service: SERVICES.find((s) => s.id === 'skin-hydrafacial')!,
        reason: 'Your goal of poreless porcelain radiance is perfectly matched with our Platinum HydraGlow. Vortex extraction removes impurities while infusing medical-grade peptide complexes.',
        homeRitual: 'Biodynamic Plant-Cellular Ceramide Cream & Gua Sha Sculptor',
      };
    }
    if (answers.focus === 'spa' || answers.concern === 'scalp') {
      return {
        serviceId: 'spa-scalp-sanctuary',
        service: SERVICES.find((s) => s.id === 'spa-scalp-sanctuary')!,
        reason: 'To relieve cranial tension and purify follicle sebum, the Japanese Head Spa with waterfall ring therapy restores micro-circulation and brings instant sensory peace.',
        homeRitual: 'Cold-Pressed Rosemary Scalp Tonic & Botanical Stimulating Brush',
      };
    }
    // Default to balayage or silk blowout
    if (answers.commitment === 'express') {
      return {
        serviceId: 'hair-botanical-gloss',
        service: SERVICES.find((s) => s.id === 'hair-botanical-gloss')!,
        reason: 'A 60-minute Caviar & Collagen Silk Blowout infuses restorative botanical lipids into the cuticle for mirror-like shine without heavy commitment.',
        homeRitual: 'Nourishing Marula Oil Thermal Shield & Leave-In Gloss',
      };
    }
    return {
      serviceId: 'hair-balayage',
      service: SERVICES.find((s) => s.id === 'hair-balayage')!,
      reason: 'Our French Balayage & Gloss Atelier paints tailored dimensional ribbons of light that grow out seamlessly without harsh demarcation lines.',
      homeRitual: 'Tonal Violet Botanical Mask & Organic Keratin Bond Serum',
    };
  };

  if (!isOpen) return null;

  const isCompleted = currentStep >= questions.length;
  const recommendation = isCompleted ? getRecommendation() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              Diagnostic Consultation
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
            aria-label="Close quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {!isCompleted ? (
            <div className="space-y-6">
              {/* Progress indicator */}
              <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>QUESTION {currentStep + 1} OF {questions.length}</span>
                <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-stone-900 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="text-2xl font-serif text-stone-900 leading-snug">
                {questions[currentStep].title}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentStep].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(questions[currentStep].id, opt.value)}
                    className="w-full text-left p-4 rounded-xl border border-stone-200/90 bg-white hover:border-stone-900 hover:bg-stone-50 transition-all text-sm font-medium text-stone-800 flex items-center justify-between cursor-pointer group shadow-xs"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            recommendation && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-900 mx-auto flex items-center justify-center mb-3">
                    <Sparkles className="w-6 h-6 text-amber-800" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-amber-900/80 font-semibold">
                    Prescribed Salon Formulation
                  </span>
                  <h3 className="text-2xl font-serif text-stone-900 mt-1">
                    Your Personalized Salon Regimen
                  </h3>
                </div>

                {/* Recommended Service Card */}
                <div className="bg-white rounded-xl border border-stone-300/80 p-5 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800">
                        Primary In-Salon Recommendation
                      </span>
                      <h4 className="text-lg font-serif font-medium text-stone-900">
                        {recommendation.service.name}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {recommendation.service.durationMinutes} mins · ${recommendation.service.price}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                    {recommendation.reason}
                  </p>

                  <div className="pt-2 border-t border-stone-100">
                    <p className="text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                      Prescribed At-Home Ritual:
                    </p>
                    <p className="text-xs font-serif italic text-stone-800 mt-0.5">
                      {recommendation.homeRitual}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectRecommendedService(recommendation.serviceId);
                    }}
                    className="w-full sm:flex-1 py-3 px-5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors shadow-xs text-center cursor-pointer"
                  >
                    Reserve This Ritual
                  </button>

                  <button
                    onClick={resetQuiz}
                    className="w-full sm:w-auto py-3 px-4 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
