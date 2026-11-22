import {Link} from 'react-router-dom';
import {useConsent} from '../context/ConsentContext';
import {useLocale} from '../i18n/LocaleContext';
import {ROUTE_SEGMENTS} from '../utils/routes';
import {Button} from './ui/Button';

export function ConsentBanner() {
  const {consent, ready, acceptAnalytics, declineAnalytics} = useConsent();
  const {t, to} = useLocale();

  if (!ready || consent !== 'unknown') {
    return null;
  }

  return (
    <aside
      role="region"
      aria-label={t.consent.ariaLabel}
      className="fixed bottom-4 start-4 end-4 z-40 mx-auto max-w-4xl rounded-xl border border-[var(--nt-border-strong)] bg-[var(--nt-surface)]/95 p-4 sm:p-5 shadow-xl backdrop-blur-md"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 max-w-2xl">
          <p className="text-sm font-bold text-[var(--nt-text)]">{t.consent.title}</p>
          <p className="text-xs leading-relaxed text-[var(--nt-text-secondary)]">
            {t.consent.description}{' '}
            <Link
              to={to(`${ROUTE_SEGMENTS.legal}/cookie-policy`)}
              className="font-semibold text-[#176BCE] dark:text-[#16C7D9] hover:underline"
            >
              {t.consent.cookiePolicyLabel}
            </Link>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Button variant="outline" size="sm" onClick={declineAnalytics}>
            {t.consent.declineLabel}
          </Button>
          <Button variant="primary" size="sm" onClick={acceptAnalytics}>
            {t.consent.acceptLabel}
          </Button>
        </div>
      </div>
    </aside>
  );
}
