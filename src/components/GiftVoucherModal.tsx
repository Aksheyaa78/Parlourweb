import React, { useState } from 'react';
import { X, Sparkles, Printer, Check, Copy, Gift } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface GiftVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftVoucherModal: React.FC<GiftVoucherModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<number>(250);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [recipientName, setRecipientName] = useState('Helena Montgomery');
  const [senderName, setSenderName] = useState('With Love, Julian');
  const [message, setMessage] = useState(
    'Wishing you an afternoon of unhurried tranquility, botanical rejuvenation, and luxury.'
  );
  const [voucherCode] = useState(
    () => `EA-GIFT-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-800" />
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              Luxury Gift Voucher Atelier
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
            aria-label="Close gift voucher modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Live Gift Card Preview */}
          <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white shadow-xl border border-amber-500/30 overflow-hidden">
            {/* Background subtle watermark & gold line */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10 border-b border-stone-800/80 pb-4 mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-amber-300 font-mono">
                  Bespoke Gift Certificate
                </p>
                <h4 className="text-2xl font-serif tracking-tight text-white mt-0.5">
                  Élixir & Aura
                </h4>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-200 font-mono tabular-nums">
                  ${currentAmount}
                </span>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest">USD</p>
              </div>
            </div>

            <div className="relative z-10 space-y-3">
              <div>
                <p className="text-[10px] text-stone-400 uppercase tracking-wider">Prepared Exclusively For</p>
                <p className="text-lg font-serif text-white font-medium">
                  {recipientName || 'Honored Guest'}
                </p>
              </div>

              {message && (
                <p className="text-xs text-stone-300 italic font-serif leading-relaxed line-clamp-2">
                  "{message}"
                </p>
              )}

              <div className="pt-3 border-t border-stone-800/80 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-2">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block">Presented By</span>
                  <span className="text-stone-300">{senderName || 'Anonymous Benefactor'}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-500 uppercase block">Certificate Code</span>
                  <span className="font-mono text-amber-300 font-bold tracking-wider">{voucherCode}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form controls */}
          <div className="space-y-4">
            {/* Amount Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                Select Voucher Value
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {[75, 150, 250, 500].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setAmount(val);
                      setCustomAmount('');
                    }}
                    className={`py-2 px-3 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                      amount === val && !customAmount
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
                <input
                  type="number"
                  placeholder="Custom $"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="py-2 px-2.5 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-800 placeholder-stone-400"
                />
              </div>
            </div>

            {/* Recipient & Sender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Helena Montgomery"
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Your Name / Sign-off</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. With love, Julian"
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1">Personal Message</label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a warm note for the recipient..."
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-stone-200 bg-white flex items-center justify-between">
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 p-2 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Code Copied!' : 'Copy Voucher Code'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => {
                alert(`Voucher ${voucherCode} for $${currentAmount} has been registered! You may print or forward this certificate to ${recipientName}.`);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
            >
              <span>Issue Voucher</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
