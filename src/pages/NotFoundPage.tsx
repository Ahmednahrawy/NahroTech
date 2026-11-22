import {SeoHead} from '../components/SeoHead';
import {LinkButton} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {useLocale} from '../i18n/LocaleContext';
import {ROUTE_SEGMENTS} from '../utils/routes';

export function NotFoundPage() {
  const {locale, t, to} = useLocale();

  return (
    <>
      <SeoHead
        title={t.pages.notFound.title}
        description={t.pages.notFound.description}
        locale={locale}
        noIndex
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="max-w-xl space-y-5">
            <p className="text-sm font-bold text-[#176BCE] dark:text-[#16C7D9] tabular-nums">
              404
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
              {t.pages.notFound.heading}
            </h1>
            <p className="text-base leading-relaxed text-[var(--nt-text-secondary)]">
              {t.pages.notFound.body}
            </p>
            <div className="pt-2">
              <LinkButton to={to(ROUTE_SEGMENTS.home)} variant="primary" size="md">
                {t.actions.goHome}
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
