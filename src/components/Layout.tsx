import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useConsent} from '../context/ConsentContext';
import {useLocale} from '../i18n/LocaleContext';
import {trackPageView} from '../services/analytics';
import {ConsentBanner} from './ConsentBanner';
import {FloatingWhatsApp} from './FloatingWhatsApp';
import {Footer} from './Footer';
import {Header} from './Header';
import {SearchModal} from './SearchModal';

export function Layout({children}: {children: React.ReactNode}) {
  const {locale, t} = useLocale();
  const {consent, ready} = useConsent();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (!ready || consent !== 'granted') {
      return;
    }
    trackPageView(`${location.pathname}${location.search}`, locale);
  }, [consent, ready, location.pathname, location.search, locale]);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--nt-bg)] text-[var(--nt-text)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-50 focus:rounded-lg focus:bg-[#176BCE] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t.a11y.skipToContent}
      </a>

      <Header onOpenSearch={() => setSearchOpen(true)} />

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <Footer />

      <FloatingWhatsApp />
      <ConsentBanner />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
