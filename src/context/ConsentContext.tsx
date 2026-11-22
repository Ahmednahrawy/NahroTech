import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {disableAnalytics, initAnalytics} from '../services/analytics';

export type ConsentStatus = 'unknown' | 'granted' | 'denied';

interface ConsentContextValue {
  consent: ConsentStatus;
  ready: boolean;
  acceptAnalytics: () => void;
  declineAnalytics: () => void;
  resetConsent: () => void;
}

const CONSENT_STORAGE_KEY = 'nahrotech-analytics-consent';

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readStoredConsent(): ConsentStatus {
  if (typeof window === 'undefined') {
    return 'unknown';
  }
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw === 'granted' || raw === 'denied') {
      return raw;
    }
  } catch {
    // Ignore storage access errors
  }
  return 'unknown';
}

export function ConsentProvider({children}: {children: React.ReactNode}) {
  const [consent, setConsent] = useState<ConsentStatus>('unknown');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    setConsent(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }
    if (consent === 'granted') {
      initAnalytics();
    } else if (consent === 'denied') {
      disableAnalytics();
    }
  }, [consent, ready]);

  const acceptAnalytics = useCallback(() => {
    setConsent('granted');
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, 'granted');
    } catch {
      // Ignore storage access errors
    }
    initAnalytics();
  }, []);

  const declineAnalytics = useCallback(() => {
    setConsent('denied');
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, 'denied');
    } catch {
      // Ignore storage access errors
    }
    disableAnalytics();
  }, []);

  const resetConsent = useCallback(() => {
    setConsent('unknown');
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch {
      // Ignore storage access errors
    }
    disableAnalytics();
  }, []);

  const value = useMemo(
    () => ({consent, ready, acceptAnalytics, declineAnalytics, resetConsent}),
    [consent, ready, acceptAnalytics, declineAnalytics, resetConsent],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error('useConsent must be used inside ConsentProvider');
  }
  return ctx;
}
