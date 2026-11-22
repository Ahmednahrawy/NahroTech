import {ArrowLeft, ArrowRight} from 'lucide-react';
import {Link} from 'react-router-dom';
import {SeoHead, buildOrganizationJsonLd} from '../components/SeoHead';
import {LinkButton} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {useLocale} from '../i18n/LocaleContext';
import {ROUTE_SEGMENTS} from '../utils/routes';

export function HomePage() {
  const {locale, dir, t, to} = useLocale();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const sectionLinks = [
    {
      title: t.nav.services,
      description: t.pages.services.subheading,
      path: to(ROUTE_SEGMENTS.services),
    },
    {
      title: t.nav.solutions,
      description: t.pages.solutions.subheading,
      path: to(ROUTE_SEGMENTS.solutions),
    },
    {
      title: t.nav.portfolio,
      description: t.pages.portfolio.subheading,
      path: to(ROUTE_SEGMENTS.portfolio),
    },
    {
      title: t.nav.store,
      description: t.pages.store.subheading,
      path: to(ROUTE_SEGMENTS.store),
    },
    {
      title: t.nav.insights,
      description: t.pages.insights.subheading,
      path: to(ROUTE_SEGMENTS.insights),
    },
    {
      title: t.nav.about,
      description: t.pages.about.subheading,
      path: to(ROUTE_SEGMENTS.about),
    },
  ];

  return (
    <>
      <SeoHead
        title={t.pages.home.title}
        description={t.pages.home.description}
        locale={locale}
        structuredData={buildOrganizationJsonLd()}
      />

      {/* Hero Section */}
      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-surface)]">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 space-y-6">
              <p className="text-sm font-semibold tracking-wide text-[#176BCE] dark:text-[#16C7D9]">
                {t.pages.home.eyebrow}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] text-[var(--nt-text)]">
                {t.pages.home.headline}
              </h1>
              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--nt-text-secondary)]">
                {t.pages.home.subheadline}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <LinkButton to={to(ROUTE_SEGMENTS.contact)} size="lg" variant="primary">
                  <span>{t.actions.startProject}</span>
                  <ArrowIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                </LinkButton>
                <LinkButton to={to(ROUTE_SEGMENTS.store)} size="lg" variant="outline">
                  {t.actions.exploreProducts}
                </LinkButton>
                <LinkButton
                  to={`${to(ROUTE_SEGMENTS.contact)}?intent=consultation`}
                  size="lg"
                  variant="ghost"
                >
                  {t.actions.bookConsultation}
                </LinkButton>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface-elevated)] p-6 sm:p-8 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--nt-text-muted)]">
                  {t.meta.siteName}
                </p>
                <p className="text-2xl font-bold tracking-tight text-[var(--nt-text)]">
                  {t.meta.slogan}
                </p>
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#176BCE] to-[#16C7D9]" />
                <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                  {t.footer.positioning}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Positioning Pillars */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl space-y-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--nt-text)]">
              {t.pages.home.positioningTitle}
            </h2>
            <p className="text-base text-[var(--nt-text-secondary)]">
              {t.pages.home.positioningBody}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {t.pages.home.pillars.map((pillar) => (
              <article
                key={pillar.index}
                className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-3"
              >
                <p className="text-sm font-bold text-[#176BCE] dark:text-[#16C7D9] tabular-nums">
                  {pillar.index}
                </p>
                <h3 className="text-lg font-bold text-[var(--nt-text)]">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Section Directory */}
      <section className="border-t border-[var(--nt-border)] bg-[var(--nt-surface)] py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl space-y-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--nt-text)]">
              {t.pages.home.quickLinksTitle}
            </h2>
            <p className="text-sm text-[var(--nt-text-secondary)]">
              {t.pages.home.foundationNoticeBody}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectionLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group flex flex-col justify-between rounded-xl border border-[var(--nt-border)] bg-[var(--nt-bg)] p-6 transition-colors hover:border-[#176BCE] dark:hover:border-[#16C7D9]"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[var(--nt-text)] group-hover:text-[#176BCE] dark:group-hover:text-[#16C7D9] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                    {item.description}
                  </p>
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#176BCE] dark:text-[#16C7D9]">
                  <span>{item.title}</span>
                  <ArrowIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
