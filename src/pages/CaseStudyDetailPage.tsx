import {ArrowLeft, ArrowRight, Check} from 'lucide-react';
import {Link, useParams} from 'react-router-dom';
import {SeoHead} from '../components/SeoHead';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {LinkButton} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {MediaFrame} from '../components/ui/MediaFrame';
import {siteConfig} from '../config/site';
import {getPortfolioBySlug} from '../content/portfolio';
import {getServiceBySlug} from '../content/services';
import {useLocale} from '../i18n/LocaleContext';
import {ROUTE_SEGMENTS} from '../utils/routes';
import {NotFoundPage} from './NotFoundPage';

export function CaseStudyDetailPage() {
  const {slug} = useParams<{slug: string}>();
  const {locale, dir, t, to} = useLocale();
  const item = getPortfolioBySlug(slug);

  if (!item) {
    return <NotFoundPage />;
  }

  const copy = item.content[locale];
  const service = getServiceBySlug(item.serviceSlug);
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <>
      <SeoHead
        title={`${copy.title} — ${siteConfig.brandName}`}
        description={copy.shortDescription}
        locale={locale}
      />

      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-surface)] py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              {label: t.nav.home, to: to(ROUTE_SEGMENTS.home)},
              {label: t.nav.portfolio, to: to(ROUTE_SEGMENTS.portfolio)},
              {label: copy.title},
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--nt-text-muted)]">
                <span className="font-semibold text-[#176BCE] dark:text-[#16C7D9]">
                  {copy.statusLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span>{copy.category}</span>
                <span aria-hidden="true">·</span>
                <span>{item.technologies.join(' / ')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
                {copy.title}
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[var(--nt-text-secondary)]">
                {copy.shortDescription}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <LinkButton
                  to={`${to(ROUTE_SEGMENTS.contact)}?service=${item.serviceSlug}`}
                  variant="primary"
                  size="md"
                >
                  <span>{t.pages.portfolio.caseStudy.requestSimilarCta}</span>
                  <ArrowIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                </LinkButton>
                {service && (
                  <LinkButton
                    to={to(`${ROUTE_SEGMENTS.services}/${service.slug}`)}
                    variant="outline"
                    size="md"
                  >
                    {service.content[locale].title}
                  </LinkButton>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 overflow-hidden rounded-xl border border-[var(--nt-border)]">
              <MediaFrame src={item.image} alt={copy.imageAlt} priority />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl space-y-10">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[var(--nt-text)]">
                {t.pages.portfolio.caseStudy.problemHeading}
              </h2>
              <p className="text-base leading-relaxed text-[var(--nt-text-secondary)]">
                {copy.businessProblem}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[var(--nt-text)]">
                {t.pages.portfolio.caseStudy.requirementsHeading}
              </h2>
              <ul className="space-y-2.5 text-sm sm:text-base text-[var(--nt-text-secondary)]">
                {copy.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2.5">
                    <Check
                      className="h-4 w-4 mt-1 text-[#176BCE] dark:text-[#16C7D9] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[var(--nt-text)]">
                {t.pages.portfolio.caseStudy.solutionHeading}
              </h2>
              <p className="text-base leading-relaxed text-[var(--nt-text-secondary)]">
                {copy.proposedSolution}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[var(--nt-text)]">
                {t.pages.portfolio.caseStudy.implementationHeading}
              </h2>
              <ul className="space-y-2.5 text-sm sm:text-base text-[var(--nt-text-secondary)]">
                {copy.implementation.map((step) => (
                  <li key={step} className="flex items-start gap-2.5">
                    <span className="text-[#176BCE] dark:text-[#16C7D9]" aria-hidden="true">
                      —
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-3">
              <h2 className="text-xl font-bold text-[var(--nt-text)]">
                {t.pages.portfolio.caseStudy.outcomeHeading}
              </h2>
              <p className="text-base leading-relaxed text-[var(--nt-text-secondary)]">
                {copy.outcome}
              </p>
              <p className="pt-2 border-t border-[var(--nt-border)] text-xs leading-relaxed text-[var(--nt-text-muted)]">
                {copy.outcomeCaveat}
              </p>
            </div>

            {service && (
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--nt-border)]">
                <div className="text-sm">
                  <span className="text-[var(--nt-text-muted)]">
                    {t.pages.portfolio.caseStudy.relatedServiceLabel}:{' '}
                  </span>
                  <Link
                    to={to(`${ROUTE_SEGMENTS.services}/${service.slug}`)}
                    className="font-semibold text-[#176BCE] dark:text-[#16C7D9] hover:underline"
                  >
                    {service.content[locale].title}
                  </Link>
                </div>
                <LinkButton
                  to={`${to(ROUTE_SEGMENTS.contact)}?service=${item.serviceSlug}`}
                  variant="primary"
                  size="md"
                >
                  {t.pages.portfolio.caseStudy.requestSimilarCta}
                </LinkButton>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
