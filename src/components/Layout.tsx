import React, {useState} from 'react';
import {useLocale} from '../i18n/LocaleContext';
import {Footer} from './Footer';
import {Header} from './Header';
import {SearchModal} from './SearchModal';

export function Layout({children}: {children: React.ReactNode}) {
  const {t} = useLocale();
  const [searchOpen, setSearchOpen] = useState(false);

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

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
