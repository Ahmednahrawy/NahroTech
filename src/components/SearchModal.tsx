import {ArrowLeft, ArrowRight, Search, X} from 'lucide-react';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {useLocale} from '../i18n/LocaleContext';
import {LEGAL_SLUGS, ROUTE_SEGMENTS} from '../utils/routes';

interface SearchEntry {
  title: string;
  description: string;
  path: string;
  section: string;
}

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {t, to, dir} = useLocale();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    const timer = setTimeout(() => inputRef.current?.focus(), 20);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const entries = useMemo<SearchEntry[]>(() => {
    const pages: SearchEntry[] = [
      {
        title: t.nav.home,
        description: t.pages.home.description,
        path: to(ROUTE_SEGMENTS.home),
        section: t.nav.home,
      },
      {
        title: t.nav.services,
        description: t.pages.services.description,
        path: to(ROUTE_SEGMENTS.services),
        section: t.nav.services,
      },
      {
        title: t.nav.solutions,
        description: t.pages.solutions.description,
        path: to(ROUTE_SEGMENTS.solutions),
        section: t.nav.solutions,
      },
      {
        title: t.nav.portfolio,
        description: t.pages.portfolio.description,
        path: to(ROUTE_SEGMENTS.portfolio),
        section: t.nav.portfolio,
      },
      {
        title: t.nav.store,
        description: t.pages.store.description,
        path: to(ROUTE_SEGMENTS.store),
        section: t.nav.store,
      },
      {
        title: t.nav.insights,
        description: t.pages.insights.description,
        path: to(ROUTE_SEGMENTS.insights),
        section: t.nav.insights,
      },
      {
        title: t.nav.about,
        description: t.pages.about.description,
        path: to(ROUTE_SEGMENTS.about),
        section: t.nav.about,
      },
      {
        title: t.nav.contact,
        description: t.pages.contact.description,
        path: to(ROUTE_SEGMENTS.contact),
        section: t.nav.contact,
      },
    ];

    const legalPages: SearchEntry[] = LEGAL_SLUGS.map((slug) => ({
      title: t.legal.items[slug].title,
      description: t.legal.items[slug].summary,
      path: to(`${ROUTE_SEGMENTS.legal}/${slug}`),
      section: t.legal.sectionTitle,
    }));

    return [...pages, ...legalPages];
  }, [t, to]);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return entries.slice(0, 8);
    }
    return entries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(trimmed) ||
        entry.description.toLowerCase().includes(trimmed) ||
        entry.section.toLowerCase().includes(trimmed),
    );
  }, [entries, query]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#091122]/60 backdrop-blur-xs p-4 pt-16 sm:pt-24"
      role="dialog"
      aria-modal="true"
      aria-label={t.actions.searchLabel}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-2xl rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 border-b border-[var(--nt-border)] px-4 py-3">
          <Search className="h-5 w-5 text-[var(--nt-text-muted)] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.actions.searchPlaceholder}
            aria-label={t.actions.searchLabel}
            className="w-full bg-transparent text-sm sm:text-base text-[var(--nt-text)] placeholder:text-[var(--nt-text-muted)] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t.a11y.closeSearch}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--nt-text-muted)] hover:bg-[var(--nt-surface-elevated)] hover:text-[var(--nt-text)] cursor-pointer shrink-0"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {!query.trim() && (
            <p className="px-3 py-2 text-xs text-[var(--nt-text-muted)]">{t.actions.searchHint}</p>
          )}

          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-[var(--nt-text-muted)]">
              {t.actions.searchEmpty}
            </p>
          ) : (
            <ul className="divide-y divide-[var(--nt-border)]">
              {results.map((entry) => (
                <li key={entry.path}>
                  <Link
                    to={entry.path}
                    onClick={onClose}
                    className="flex items-center justify-between gap-4 rounded-lg px-3 py-3 hover:bg-[var(--nt-surface-elevated)] transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-[var(--nt-text-muted)]">
                        <span>{entry.section}</span>
                      </div>
                      <div className="text-sm font-semibold text-[var(--nt-text)] truncate">
                        {entry.title}
                      </div>
                      <div className="text-xs text-[var(--nt-text-secondary)] line-clamp-1">
                        {entry.description}
                      </div>
                    </div>
                    <ArrowIcon
                      className="h-4 w-4 text-[var(--nt-text-muted)] shrink-0"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
