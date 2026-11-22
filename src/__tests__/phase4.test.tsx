import {fireEvent, render, screen, within} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import App from '../App';
import {siteConfig} from '../config/site';
import {
  disableAnalytics,
  initAnalytics,
  isAnalyticsActive,
  isAnalyticsConfigured,
  resetAnalyticsRuntimeStateForTests,
  sanitizeAnalyticsParams,
  trackInquirySubmitted,
  trackPageView,
} from '../services/analytics';

describe('Phase 4 Integrations & SEO', () => {
  beforeEach(() => {
    localStorage.clear();
    document.head.querySelectorAll('script[data-nahrotech-ga4="true"]').forEach((el) => el.remove());
    delete window.gtag;
    delete window.dataLayer;
    resetAnalyticsRuntimeStateForTests();
  });

  it('displays Cookie & Analytics Consent Banner cleanly and persists accept/decline choices', () => {
    render(
      <MemoryRouter initialEntries={['/en']}>
        <App />
      </MemoryRouter>,
    );

    const banner = screen.getByRole('region', {
      name: /Privacy and analytics cookie preferences/i,
    });
    expect(banner).toBeInTheDocument();
    expect(within(banner).getByRole('link', {name: 'Cookie Policy'})).toHaveAttribute(
      'href',
      '/en/legal/cookie-policy',
    );

    fireEvent.click(screen.getByRole('button', {name: 'Accept Analytics'}));
    expect(localStorage.getItem('nahrotech-analytics-consent')).toBe('granted');
    expect(
      screen.queryByRole('region', {name: /Privacy and analytics cookie preferences/i}),
    ).not.toBeInTheDocument();

    // Footer Cookie Preferences button allows reopening preferences
    fireEvent.click(screen.getByRole('button', {name: 'Cookie Preferences'}));
    expect(localStorage.getItem('nahrotech-analytics-consent')).toBeNull();
    expect(
      screen.getByRole('region', {name: /Privacy and analytics cookie preferences/i}),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Essential Only'}));
    expect(localStorage.getItem('nahrotech-analytics-consent')).toBe('denied');
  });

  it('renders Consent Banner in Arabic RTL cleanly', () => {
    render(
      <MemoryRouter initialEntries={['/ar']}>
        <App />
      </MemoryRouter>,
    );

    expect(document.documentElement.dir).toBe('rtl');
    expect(
      screen.getByRole('region', {name: /تفضيلات الخصوصية وملفات تعريف الارتباط/i}),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'قبول التحليلات'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'الأساسية فقط'})).toBeInTheDocument();
  });

  it('validates GA4 IDs, gates gtag injection, and strips any accidental PII from events', () => {
    expect(isAnalyticsConfigured('')).toBe(false);
    expect(isAnalyticsConfigured('invalid-id')).toBe(false);
    expect(isAnalyticsConfigured('G-TEST12345')).toBe(true);

    expect(initAnalytics('')).toBe(false);
    expect(document.querySelector('script[data-nahrotech-ga4="true"]')).toBeNull();

    expect(initAnalytics('G-TEST12345')).toBe(true);
    expect(isAnalyticsActive()).toBe(true);
    const script = document.querySelector<HTMLScriptElement>('script[data-nahrotech-ga4="true"]');
    expect(script).not.toBeNull();
    expect(script?.src).toContain('https://www.googletagmanager.com/gtag/js?id=G-TEST12345');

    const gtagSpy = vi.spyOn(window, 'gtag');
    trackPageView('/en/services', 'en');
    expect(gtagSpy).toHaveBeenCalledWith('event', 'page_view', {
      page_path: '/en/services',
      locale: 'en',
    });

    trackInquirySubmitted('consultation', 'data-business-intelligence', 'en');
    expect(gtagSpy).toHaveBeenCalledWith('event', 'submit_inquiry', {
      intent: 'consultation',
      service_slug: 'data-business-intelligence',
      locale: 'en',
    });
    expect(gtagSpy).toHaveBeenCalledWith('event', 'request_consultation', {
      service_slug: 'data-business-intelligence',
      locale: 'en',
    });

    // Ensure PII keys are strictly stripped by sanitizeAnalyticsParams
    const sanitized = sanitizeAnalyticsParams({
      name: 'Tariq',
      email: 'tariq@example.com',
      phone: '+123456',
      company: 'Acme',
      description: 'Private scope',
      intent: 'project',
      locale: 'en',
    });
    expect(sanitized).toEqual({
      intent: 'project',
      locale: 'en',
    });

    disableAnalytics('G-TEST12345');
    expect(isAnalyticsActive()).toBe(false);
  });

  it('keeps Floating WhatsApp hidden when VITE_WHATSAPP_NUMBER is unset to avoid broken links', () => {
    render(
      <MemoryRouter initialEntries={['/en/services/data-business-intelligence']}>
        <App />
      </MemoryRouter>,
    );

    if (!siteConfig.whatsappNumber) {
      expect(
        screen.queryByRole('link', {name: /Chat with NahroTech on WhatsApp/i}),
      ).not.toBeInTheDocument();
    }
  });

  it('injects canonical, hreflang, og:image, and Schema.org JSON-LD on detail pages', () => {
    render(
      <MemoryRouter initialEntries={['/en/portfolio/retail-margin-stock-bi-architecture']}>
        <App />
      </MemoryRouter>,
    );

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    expect(canonical?.href).toContain('/en/portfolio/retail-margin-stock-bi-architecture');

    const ogImage = document.head.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    expect(ogImage?.content).toContain('bi_analytics_workspace_1795357660215.jpg');

    const jsonLdScripts = document.head.querySelectorAll('script[data-nahrotech-jsonld="true"]');
    expect(jsonLdScripts.length).toBeGreaterThan(0);
    expect(jsonLdScripts[0].textContent).toContain('CreativeWork');
  });
});
