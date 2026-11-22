import React, {createContext, useContext, useEffect, useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Locale, siteConfig} from '../config/site';
import {ar} from './ar';
import {en} from './en';
import {TranslationDictionary} from './types';
import {localePath, stripLocalePrefix} from '../utils/routes';

interface LocaleContextValue {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  t: TranslationDictionary;
  to: (subPath?: string) => string;
  switchLocalePath: (targetLocale: Locale) => string;
  switchLocale: (targetLocale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const DICTIONARIES: Record<Locale, TranslationDictionary> = {en, ar};

export function LocaleProvider({
  forcedLocale,
  children,
}: {
  forcedLocale?: Locale;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const parsed = stripLocalePrefix(location.pathname);
  const locale: Locale = forcedLocale || parsed.locale || siteConfig.defaultLocale;
  const dir: 'ltr' | 'rtl' = locale === 'ar' ? 'rtl' : 'ltr';
  const t = DICTIONARIES[locale];

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem('nahrotech-locale', locale);
    } catch {
      // Ignore storage access restrictions
    }
  }, [locale, dir]);

  const value = useMemo<LocaleContextValue>(() => {
    const to = (subPath = '') => localePath(locale, subPath);
    const switchLocalePath = (targetLocale: Locale) => {
      const {subPath} = stripLocalePrefix(location.pathname);
      return localePath(targetLocale, subPath);
    };
    const switchLocale = (targetLocale: Locale) => {
      const target = switchLocalePath(targetLocale);
      navigate(`${target}${location.search}${location.hash}`);
    };

    return {locale, dir, t, to, switchLocalePath, switchLocale};
  }, [locale, dir, t, location.pathname, location.search, location.hash, navigate]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used inside LocaleProvider');
  }
  return ctx;
}
