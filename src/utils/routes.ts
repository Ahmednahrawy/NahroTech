import {Locale, siteConfig} from '../config/site';

export const ROUTE_SEGMENTS = {
  home: '',
  services: 'services',
  solutions: 'solutions',
  portfolio: 'portfolio',
  store: 'store',
  insights: 'insights',
  about: 'about',
  contact: 'contact',
  legal: 'legal',
} as const;

export const LEGAL_SLUGS = [
  'privacy-policy',
  'terms-of-use',
  'cookie-policy',
  'digital-product-terms',
  'refund-policy',
  'disclaimer',
] as const;

export type LegalSlug = (typeof LEGAL_SLUGS)[number];

/**
 * Builds an internal router path for a given locale, e.g.:
 * localePath('en', '') -> '/en'
 * localePath('ar', 'services') -> '/ar/services'
 */
export function localePath(locale: Locale, subPath = ''): string {
  const clean = subPath.replace(/^\/+|\/+$/g, '');
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

/**
 * Strips the leading /en or /ar segment from a pathname to recover the neutral sub-path.
 */
export function stripLocalePrefix(pathname: string): {locale: Locale | null; subPath: string} {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const match = normalized.match(/^\/(en|ar)(?:\/(.*))?$/);
  if (!match) {
    return {locale: null, subPath: normalized === '/' ? '' : normalized.replace(/^\/+/, '')};
  }
  return {
    locale: match[1] as Locale,
    subPath: match[2] || '',
  };
}

/**
 * Computes a full canonical URL (including siteUrl and configured basePath) for SEO tags.
 */
export function absoluteUrl(pathWithLocale: string): string {
  const base = siteConfig.basePath === '/' ? '' : siteConfig.basePath;
  const cleanPath = pathWithLocale.startsWith('/') ? pathWithLocale : `/${pathWithLocale}`;
  return `${siteConfig.siteUrl}${base}${cleanPath}`;
}

/**
 * Router basename derived from Vite's BASE_URL (without trailing slash unless root).
 */
export function getRouterBasename(): string {
  const raw = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || siteConfig.basePath;
  if (!raw || raw === '/') {
    return '/';
  }
  return raw.replace(/\/+$/, '');
}
