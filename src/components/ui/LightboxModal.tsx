import {X} from 'lucide-react';
import {useEffect, useRef} from 'react';
import {resolveMediaUrl} from '../../config/site';
import {useLocale} from '../../i18n/LocaleContext';

interface LightboxModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
}

export function LightboxModal({open, onClose, src, alt, title, subtitle}: LightboxModalProps) {
  const {locale} = useLocale();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previousFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const closeLabel = locale === 'ar' ? 'إغلاق المعاينة' : 'Close image preview';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 sm:p-6 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl overflow-hidden rounded-xl border border-white/15 bg-[#091122] text-white shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5">
          <div className="min-w-0">
            {subtitle && (
              <p className="text-xs font-semibold text-[#16C7D9] truncate">{subtitle}</p>
            )}
            <p className="text-sm sm:text-base font-bold text-white truncate">{title}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 text-slate-200 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="bg-black/40 p-2 sm:p-4 flex items-center justify-center">
          <img
            src={resolveMediaUrl(src)}
            alt={alt}
            referrerPolicy="no-referrer"
            className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
}
