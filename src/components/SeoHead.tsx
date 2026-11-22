import React, {createContext, useContext, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Locale, siteConfig} from '../config/site';
import {absoluteUrl, localePath, stripLocalePrefix} from '../utils/routes';

export interface SeoMetadata {
  title: string;
  description: string;
  locale: Locale;
  noIndex?: boolean;
  type?: 'website' | 'article';
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export interface CollectedHeadData {
  lang: Locale;
  dir: 'ltr' | 'rtl';
  tagsHtml: string;
}

const HeadCollectorContext = createContext<((data: CollectedHeadData) => void) | null>(null);

export function HeadCollectorProvider({
  onCollect,
  children,
}: {
  onCollect: (data: CollectedHeadData) => void;
  children: React.ReactNode;
}) {
  return <HeadCollectorContext.Provider value={onCollect}>{children}</HeadCollectorContext.Provider>;
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    slogan: siteConfig.sloganEn,
    ...(siteConfig.contactEmail ? {email: siteConfig.contactEmail} : {}),
  };
}

export function SeoHead({
  title,
  description,
  locale,
  noIndex = false,
  type = 'website',
  structuredData,
}: SeoMetadata) {
  const location = useLocation();
  const collector = useContext(HeadCollectorContext);

  const {subPath} = stripLocalePrefix(location.pathname);
  const canonicalPath = localePath(locale, subPath);
  const canonicalUrl = absoluteUrl(canonicalPath);
  const enUrl = absoluteUrl(localePath('en', subPath));
  const arUrl = absoluteUrl(localePath('ar', subPath));
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const jsonLdItems = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [buildOrganizationJsonLd()];

  if (collector) {
    const tags: string[] = [
      `<title>${escapeText(title)}</title>`,
      `<meta name="description" content="${escapeAttr(description)}" />`,
      `<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`,
      `<link rel="alternate" hreflang="en" href="${escapeAttr(enUrl)}" />`,
      `<link rel="alternate" hreflang="ar" href="${escapeAttr(arUrl)}" />`,
      `<link rel="alternate" hreflang="x-default" href="${escapeAttr(enUrl)}" />`,
      `<meta property="og:type" content="${escapeAttr(type)}" />`,
      `<meta property="og:title" content="${escapeAttr(title)}" />`,
      `<meta property="og:description" content="${escapeAttr(description)}" />`,
      `<meta property="og:url" content="${escapeAttr(canonicalUrl)}" />`,
      `<meta property="og:locale" content="${locale === 'ar' ? 'ar_AR' : 'en_US'}" />`,
      `<meta property="og:site_name" content="${escapeAttr(siteConfig.brandName)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
      `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    ];

    if (noIndex) {
      tags.push(`<meta name="robots" content="noindex, nofollow" />`);
    }

    for (const item of jsonLdItems) {
      tags.push(`<script type="application/ld+json">${JSON.stringify(item)}</script>`);
    }

    collector({
      lang: locale,
      dir,
      tagsHtml: tags.join('\n    '),
    });
  }

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    document.title = title;

    const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const upsertLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]`;
      let el = document.head.querySelector<HTMLLinkElement>(selector);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        if (hreflang) {
          el.setAttribute('hreflang', hreflang);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:locale', locale === 'ar' ? 'ar_AR' : 'en_US');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    if (noIndex) {
      upsertMeta('name', 'robots', 'noindex, nofollow');
    } else {
      const robotsEl = document.head.querySelector('meta[name="robots"]');
      if (robotsEl) {
        robotsEl.remove();
      }
    }

    upsertLink('canonical', canonicalUrl);
    upsertLink('alternate', enUrl, 'en');
    upsertLink('alternate', arUrl, 'ar');
    upsertLink('alternate', enUrl, 'x-default');

    document.head
      .querySelectorAll('script[data-nahrotech-jsonld="true"]')
      .forEach((node) => node.remove());

    for (const item of jsonLdItems) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-nahrotech-jsonld', 'true');
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
    }
  }, [title, description, canonicalUrl, enUrl, arUrl, locale, type, noIndex, jsonLdItems]);

  return null;
}
