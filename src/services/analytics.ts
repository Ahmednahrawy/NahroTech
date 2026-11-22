import {Locale, siteConfig} from '../config/site';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: string]: unknown;
  }
}

const VALID_GA4_ID = /^(G|GT|AW|DC)-[A-Z0-9]+$/i;
const FORBIDDEN_PII_KEYS = new Set([
  'name',
  'full_name',
  'email',
  'phone',
  'whatsapp',
  'company',
  'description',
  'message',
  'body',
]);

let analyticsActive = false;
let activeMeasurementId = '';

export function isAnalyticsConfigured(id: string = siteConfig.ga4Id): boolean {
  return VALID_GA4_ID.test(id.trim());
}

export function sanitizeAnalyticsParams(
  params?: Record<string, string | number | boolean | undefined>,
): Record<string, string | number | boolean> {
  if (!params) {
    return {};
  }
  const cleaned: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    if (FORBIDDEN_PII_KEYS.has(key.toLowerCase())) continue;
    cleaned[key] = value;
  }
  return cleaned;
}

export function initAnalytics(measurementId: string = siteConfig.ga4Id): boolean {
  const trimmed = measurementId.trim();
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }
  if (!isAnalyticsConfigured(trimmed)) {
    return false;
  }

  window[`ga-disable-${trimmed}`] = false;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }

  if (!document.querySelector('script[data-nahrotech-ga4="true"]')) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(trimmed)}`;
    script.setAttribute('data-nahrotech-ga4', 'true');
    document.head.appendChild(script);

    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    window.gtag('js', new Date());
    window.gtag('config', trimmed, {
      send_page_view: false,
      anonymize_ip: true,
    });
  } else {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
    });
  }

  analyticsActive = true;
  activeMeasurementId = trimmed;
  return true;
}

export function disableAnalytics(measurementId: string = siteConfig.ga4Id): void {
  const trimmed = measurementId.trim();
  analyticsActive = false;
  if (typeof window === 'undefined') {
    return;
  }
  if (trimmed) {
    window[`ga-disable-${trimmed}`] = true;
  }
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
    });
  }
}

export function isAnalyticsActive(): boolean {
  return analyticsActive && Boolean(activeMeasurementId);
}

export function resetAnalyticsRuntimeStateForTests(): void {
  analyticsActive = false;
  activeMeasurementId = '';
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === 'undefined' || !analyticsActive || typeof window.gtag !== 'function') {
    return;
  }
  window.gtag('event', eventName, sanitizeAnalyticsParams(params));
}

export function trackPageView(pagePath: string, locale: Locale): void {
  trackEvent('page_view', {
    page_path: pagePath,
    locale,
  });
}

export function trackServiceView(serviceSlug: string, locale: Locale): void {
  trackEvent('view_service', {
    service_slug: serviceSlug,
    locale,
  });
}

export function trackProductView(productSlug: string, productCategory: string, locale: Locale): void {
  trackEvent('view_product', {
    product_slug: productSlug,
    product_category: productCategory,
    locale,
  });
}

export function trackInquirySubmitted(intent: string, serviceSlug: string, locale: Locale): void {
  trackEvent('submit_inquiry', {
    intent,
    service_slug: serviceSlug,
    locale,
  });
  if (intent === 'consultation') {
    trackEvent('request_consultation', {
      service_slug: serviceSlug,
      locale,
    });
  }
}

export function trackWhatsAppClick(source: string, context: string, locale: Locale): void {
  trackEvent('click_whatsapp', {
    source,
    context,
    locale,
  });
}
