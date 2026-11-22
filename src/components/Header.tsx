import {Globe, Menu, Moon, Search, Sun, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {useTheme} from '../context/ThemeContext';
import {useLocale} from '../i18n/LocaleContext';
import {cn} from '../utils/cn';
import {ROUTE_SEGMENTS} from '../utils/routes';
import {LinkButton} from './ui/Button';
import {Container} from './ui/Container';
import {Wordmark} from './Wordmark';

export function Header({onOpenSearch}: {onOpenSearch: () => void}) {
  const {locale, t, to, switchLocale} = useLocale();
  const {theme, toggleTheme} = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {label: t.nav.home, path: to(ROUTE_SEGMENTS.home), end: true},
    {label: t.nav.services, path: to(ROUTE_SEGMENTS.services)},
    {label: t.nav.solutions, path: to(ROUTE_SEGMENTS.solutions)},
    {label: t.nav.portfolio, path: to(ROUTE_SEGMENTS.portfolio)},
    {label: t.nav.store, path: to(ROUTE_SEGMENTS.store)},
    {label: t.nav.insights, path: to(ROUTE_SEGMENTS.insights)},
    {label: t.nav.about, path: to(ROUTE_SEGMENTS.about)},
    {label: t.nav.contact, path: to(ROUTE_SEGMENTS.contact)},
  ];

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const nextLocale = locale === 'en' ? 'ar' : 'en';

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--nt-border)] bg-[var(--nt-surface)]/95 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Brand Wordmark */}
        <Link
          to={to(ROUTE_SEGMENTS.home)}
          className="inline-flex items-center py-1 shrink-0"
          aria-label={t.meta.siteName}
          onClick={() => setMobileMenuOpen(false)}
        >
          <Wordmark />
        </Link>

        {/* Desktop Main Navigation (8 required items) */}
        <nav
          aria-label={t.a11y.mainNavigation}
          className="hidden xl:flex items-center gap-5 text-sm font-medium"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({isActive}) =>
                cn(
                  'py-1.5 whitespace-nowrap shrink-0 transition-colors border-b-2',
                  isActive
                    ? 'border-[#176BCE] dark:border-[#16C7D9] text-[var(--nt-text)] font-semibold'
                    : 'border-transparent text-[var(--nt-text-secondary)] hover:text-[var(--nt-text)]',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Persistent Controls + Primary CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label={t.a11y.openSearch}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--nt-text-secondary)] hover:bg-[var(--nt-surface-elevated)] hover:text-[var(--nt-text)] transition-colors cursor-pointer shrink-0"
          >
            <Search className="h-4.5 w-4.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.a11y.switchThemeLight : t.a11y.switchThemeDark}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--nt-text-secondary)] hover:bg-[var(--nt-surface-elevated)] hover:text-[var(--nt-text)] transition-colors cursor-pointer shrink-0"
          >
            {theme === 'dark' ? (
              <Sun className="h-4.5 w-4.5" aria-hidden="true" />
            ) : (
              <Moon className="h-4.5 w-4.5" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => switchLocale(nextLocale)}
            aria-label={locale === 'en' ? t.a11y.switchToArabic : t.a11y.switchToEnglish}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[var(--nt-border)] px-3 text-xs font-semibold text-[var(--nt-text)] hover:bg-[var(--nt-surface-elevated)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-[#176BCE] dark:text-[#16C7D9]" aria-hidden="true" />
            <span>{locale === 'en' ? t.language.ar : t.language.en}</span>
          </button>

          <LinkButton
            to={to(ROUTE_SEGMENTS.contact)}
            size="sm"
            variant="primary"
            className="hidden sm:inline-flex"
          >
            {t.nav.startProject}
          </LinkButton>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            className="inline-flex xl:hidden h-11 w-11 items-center justify-center rounded-lg border border-[var(--nt-border)] text-[var(--nt-text)] hover:bg-[var(--nt-surface-elevated)] transition-colors cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden border-t border-[var(--nt-border)] bg-[var(--nt-surface)]"
        >
          <Container className="py-4">
            <nav aria-label={t.a11y.mobileNavigation} className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({isActive}) =>
                    cn(
                      'min-h-[44px] flex items-center rounded-lg px-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-[var(--nt-surface-elevated)] text-[#176BCE] dark:text-[#16C7D9] font-semibold'
                        : 'text-[var(--nt-text-secondary)] hover:bg-[var(--nt-surface-elevated)] hover:text-[var(--nt-text)]',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-3 mt-2 border-t border-[var(--nt-border)]">
                <LinkButton
                  to={to(ROUTE_SEGMENTS.contact)}
                  size="md"
                  variant="primary"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.startProject}
                </LinkButton>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
