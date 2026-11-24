import {MessageSquare} from 'lucide-react';
import {useLocation} from 'react-router-dom';
import {buildWhatsAppUrl} from '../config/site';
import {getPortfolioBySlug} from '../content/portfolio';
import {getProductBySlug} from '../content/products';
import {getServiceBySlug} from '../content/services';
import {useConsent} from '../context/ConsentContext';
import {useLocale} from '../i18n/LocaleContext';
import {trackWhatsAppClick} from '../services/analytics';
import {cn} from '../utils/cn';
import {ROUTE_SEGMENTS, stripLocalePrefix} from '../utils/routes';

export function FloatingWhatsApp() {
  const {locale, t} = useLocale();
  const {consent, ready} = useConsent();
  const location = useLocation();
  const {subPath} = stripLocalePrefix(location.pathname);

  let contextualMessage = t.footer.whatsappDefaultMessage;
  if (subPath.startsWith(`${ROUTE_SEGMENTS.services}/`)) {
    const slug = subPath.slice(`${ROUTE_SEGMENTS.services}/`.length);
    const service = getServiceBySlug(slug);
    if (service) {
      contextualMessage = service.content[locale].whatsappMessage;
    }
  } else if (subPath.startsWith(`${ROUTE_SEGMENTS.store}/`)) {
    const slug = subPath.slice(`${ROUTE_SEGMENTS.store}/`.length);
    const product = getProductBySlug(slug);
    if (product) {
      contextualMessage = product.content[locale].whatsappInquiryMessage;
    }
  } else if (subPath.startsWith(`${ROUTE_SEGMENTS.portfolio}/`)) {
    const slug = subPath.slice(`${ROUTE_SEGMENTS.portfolio}/`.length);
    const project = getPortfolioBySlug(slug);
    if (project) {
      contextualMessage = `${t.consent.floatingWhatsappPortfolioPrefix} ${project.content[locale].title}`;
    }
  } else if (subPath === ROUTE_SEGMENTS.contact && location.search.includes('intent=consultation')) {
    contextualMessage = t.consent.floatingWhatsappConsultationMessage;
  }

  const href = buildWhatsAppUrl(contextualMessage);
  if (!href) {
    return null;
  }

  const bannerVisible = ready && consent === 'unknown';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.consent.floatingWhatsappLabel}
      title={t.consent.floatingWhatsappLabel}
      onClick={() => trackWhatsAppClick('floating_button', subPath || 'home', locale)}
      className={cn(
        'fixed end-5 z-30 inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#101B35] px-4 py-3 text-sm font-semibold text-white shadow-lg border border-white/15 hover:bg-[#176BCE] hover:-translate-y-1 hover:shadow-xl active:scale-95 dark:bg-[#16C7D9] dark:text-[#091122] dark:hover:bg-[#3BD6E6] transition-all animate-in fade-in slide-in-from-bottom-5',
        bannerVisible ? 'bottom-36 sm:bottom-24' : 'bottom-5',
      )}
    >
      <MessageSquare className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline whitespace-nowrap">{t.actions.chatWhatsApp}</span>
    </a>
  );
}
