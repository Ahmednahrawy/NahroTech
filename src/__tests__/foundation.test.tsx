import {fireEvent, render, screen, within} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import App from '../App';
import {PRERENDER_ROUTES} from '../routes';
import {absoluteUrl, localePath, stripLocalePrefix} from '../utils/routes';

describe('Routing utilities', () => {
  it('builds localized paths cleanly', () => {
    expect(localePath('en')).toBe('/en');
    expect(localePath('ar')).toBe('/ar');
    expect(localePath('en', 'services')).toBe('/en/services');
    expect(localePath('ar', '/legal/privacy-policy/')).toBe('/ar/legal/privacy-policy');
  });

  it('strips locale prefixes accurately', () => {
    expect(stripLocalePrefix('/en/services')).toEqual({locale: 'en', subPath: 'services'});
    expect(stripLocalePrefix('/ar/legal/refund-policy/')).toEqual({
      locale: 'ar',
      subPath: 'legal/refund-policy',
    });
    expect(stripLocalePrefix('/')).toEqual({locale: null, subPath: ''});
  });

  it('computes canonical URLs', () => {
    expect(absoluteUrl('/en/services')).toMatch(/\/en\/services$/);
  });

  it('includes both EN and AR routes in PRERENDER_ROUTES', () => {
    expect(PRERENDER_ROUTES).toContain('/en');
    expect(PRERENDER_ROUTES).toContain('/ar');
    expect(PRERENDER_ROUTES).toContain('/en/services');
    expect(PRERENDER_ROUTES).toContain('/ar/services');
    expect(PRERENDER_ROUTES).toContain('/en/legal/privacy-policy');
    expect(PRERENDER_ROUTES).toContain('/ar/legal/privacy-policy');
  });
});

describe('Phase 1 Foundation App', () => {
  it('renders English homepage with LTR direction and navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/en']}>
        <App />
      </MemoryRouter>,
    );

    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
    expect(
      screen.getByRole('heading', {
        name: /Turn business complexity into clear, practical digital systems/i,
      }),
    ).toBeInTheDocument();
    const mainNav = screen.getByRole('navigation', {name: 'Main navigation'});
    expect(within(mainNav).getByRole('link', {name: 'Services'})).toBeInTheDocument();
  });

  it('renders Arabic homepage with RTL direction and Arabic navigation', () => {
    render(
      <MemoryRouter initialEntries={['/ar']}>
        <App />
      </MemoryRouter>,
    );

    expect(document.documentElement.lang).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');
    expect(
      screen.getByRole('heading', {
        name: /حوّل تعقيد الأعمال إلى أنظمة رقمية عملية وواضحة/i,
      }),
    ).toBeInTheDocument();
    const mainNav = screen.getByRole('navigation', {name: 'التنقل الرئيسي'});
    expect(within(mainNav).getByRole('link', {name: 'الخدمات'})).toBeInTheDocument();
    const banner = screen.getByRole('banner');
    expect(within(banner).getByRole('link', {name: /NahroTech/i})).toBeInTheDocument();
  });

  it('toggles light/dark theme class on documentElement', () => {
    document.documentElement.classList.remove('dark');
    render(
      <MemoryRouter initialEntries={['/en']}>
        <App />
      </MemoryRouter>,
    );

    const themeButton = screen.getByRole('button', {name: /Switch to dark theme/i});
    fireEvent.click(themeButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    const lightButton = screen.getByRole('button', {name: /Switch to light theme/i});
    fireEvent.click(lightButton);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('switches language from EN to AR while preserving sub-route', () => {
    render(
      <MemoryRouter initialEntries={['/en/services']}>
        <App />
      </MemoryRouter>,
    );

    expect(document.documentElement.lang).toBe('en');
    const langSwitch = screen.getByRole('button', {name: /Switch language to Arabic/i});
    fireEvent.click(langSwitch);
    expect(document.documentElement.lang).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');
    expect(
      screen.getByRole('heading', {name: /خدمات مصممة كحلول أعمال مترابطة/i}),
    ).toBeInTheDocument();
  });
});
