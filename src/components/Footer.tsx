import {Mail, MessageSquare} from 'lucide-react';
import {Link} from 'react-router-dom';
import {buildWhatsAppUrl, siteConfig} from '../config/site';
import {useConsent} from '../context/ConsentContext';
import {useLocale} from '../i18n/LocaleContext';
import {trackWhatsAppClick} from '../services/analytics';
import {LEGAL_SLUGS, ROUTE_SEGMENTS} from '../utils/routes';
import {Container} from './ui/Container';
import {Wordmark} from './Wordmark';

export function Footer() {
  const {locale, t, to} = useLocale();
  const {resetConsent} = useConsent();
  const year = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(t.footer.whatsappDefaultMessage);

  const navLinks = [
    {label: t.nav.services, path: to(ROUTE_SEGMENTS.services)},
    {label: t.nav.solutions, path: to(ROUTE_SEGMENTS.solutions)},
    {label: t.nav.portfolio, path: to(ROUTE_SEGMENTS.portfolio)},
    {label: t.nav.store, path: to(ROUTE_SEGMENTS.store)},
    {label: t.nav.insights, path: to(ROUTE_SEGMENTS.insights)},
    {label: t.nav.about, path: to(ROUTE_SEGMENTS.about)},
    {label: t.nav.contact, path: to(ROUTE_SEGMENTS.contact)},
  ];

  return (
    <footer className="border-t border-[var(--nt-border)] bg-[var(--nt-surface)] text-[var(--nt-text-secondary)]">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to={to(ROUTE_SEGMENTS.home)} className="inline-block">
              <Wordmark />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--nt-text-secondary)]">
              {t.footer.positioning}
            </p>
            <p className="text-xs font-semibold text-[#176BCE] dark:text-[#16C7D9]">
              {t.meta.slogan}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-[var(--nt-text)] mb-4">
              {t.footer.navigationTitle}
            </h2>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-[var(--nt-text)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-[var(--nt-text)] mb-4">
              {t.footer.legalTitle}
            </h2>
            <ul className="space-y-2.5 text-sm">
              {LEGAL_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    to={to(`${ROUTE_SEGMENTS.legal}/${slug}`)}
                    className="hover:text-[var(--nt-text)] transition-colors"
                  >
                    {t.legal.items[slug].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-sm font-semibold text-[var(--nt-text)] mb-4">
              {t.footer.connectTitle}
            </h2>
            {siteConfig.contactEmail ? (
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="flex items-center gap-2 text-sm hover:text-[var(--nt-text)] transition-colors break-all"
              >
                <Mail className="h-4 w-4 text-[#176BCE] dark:text-[#16C7D9] shrink-0" aria-hidden="true" />
                <span>{siteConfig.contactEmail}</span>
              </a>
            ) : (
              <Link
                to={to(ROUTE_SEGMENTS.contact)}
                className="flex items-center gap-2 text-sm hover:text-[var(--nt-text)] transition-colors"
              >
                <Mail className="h-4 w-4 text-[#176BCE] dark:text-[#16C7D9] shrink-0" aria-hidden="true" />
                <span>{t.footer.emailLabel}</span>
              </Link>
            )}

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('footer', 'general', locale)}
                className="flex items-center gap-2 text-sm hover:text-[var(--nt-text)] transition-colors"
              >
                <MessageSquare
                  className="h-4 w-4 text-[#16C7D9] shrink-0"
                  aria-hidden="true"
                />
                <span>{t.footer.whatsappLabel}</span>
              </a>
            ) : (
              <p className="text-xs text-[var(--nt-text-muted)]">
                {t.footer.whatsappNotConfigured}
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--nt-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--nt-text-muted)]">
          <p className="tabular-nums">
            &copy; {year} {t.footer.copyright}
          </p>
          <button
            type="button"
            onClick={resetConsent}
            className="hover:text-[var(--nt-text)] underline-offset-4 hover:underline cursor-pointer transition-colors"
          >
            {t.consent.managePreferences}
          </button>
        </div>
      </Container>
    </footer>
  );
}
