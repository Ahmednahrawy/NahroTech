export type Locale = 'en' | 'ar';

const env = (typeof import.meta !== 'undefined' && import.meta.env) || ({} as Record<string, string | undefined>);

function normalizeSiteBasePath(raw?: string): string {
  const collapsed = (raw || '/').replace(/\/+/g, '/').replace(/\/+$/, '');
  return collapsed || '/';
}

export const siteConfig = {
  brandName: 'NahroTech',
  brandNameAr: 'نحروتك',
  sloganEn: 'Think Smart. Build Better.',
  sloganAr: 'فكّر بذكاء. ابنِ بجودة أفضل.',
  defaultLocale: 'en' as Locale,
  supportedLocales: ['en', 'ar'] as const,
  basePath: normalizeSiteBasePath(env.VITE_BASE_PATH),
  siteUrl: (env.VITE_SITE_URL || 'https://nahrotech.com').replace(/\/+$/, ''),
  contactEmail: (env.VITE_CONTACT_EMAIL || '').trim(),
  whatsappNumber: (env.VITE_WHATSAPP_NUMBER || '').replace(/[^\d]/g, ''),
  web3formsKey: (env.VITE_WEB3FORMS_KEY || '').trim(),
  ga4Id: (env.VITE_GA4_ID || '').trim(),
  mediaCdnUrl: (env.VITE_MEDIA_CDN_URL || '').replace(/\/+$/, ''),
} as const;

export function resolveMediaUrl(relativePath: string): string {
  const clean = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  if (siteConfig.mediaCdnUrl) {
    return `${siteConfig.mediaCdnUrl}/${clean}`;
  }
  const base = siteConfig.basePath === '/' ? '' : siteConfig.basePath;
  return `${base}/${clean}`;
}

export function buildWhatsAppUrl(message: string): string | null {
  if (!siteConfig.whatsappNumber) {
    return null;
  }
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
