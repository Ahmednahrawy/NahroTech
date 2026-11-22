import {ArrowLeft, ArrowRight, Check} from 'lucide-react';
import {Link} from 'react-router-dom';
import {SeoHead, buildOrganizationJsonLd} from '../components/SeoHead';
import {ServiceIcon} from '../components/ServiceIcon';
import {LinkButton} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {ABOUT_CONTENT} from '../content/about';
import {SERVICES} from '../content/services';
import {INDUSTRY_OPTIONS} from '../content/solutions';
import {useLocale} from '../i18n/LocaleContext';
import {ROUTE_SEGMENTS} from '../utils/routes';

export function HomePage() {
  const {locale, dir, t, to} = useLocale();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const about = ABOUT_CONTENT[locale];

  return (
    <>
      <SeoHead
        title={t.pages.home.title}
        description={t.pages.home.description}
        locale={locale}
        structuredData={buildOrganizationJsonLd()}
      />

      {/* 1. Hero Section */}
      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-surface)]">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <p className="text-sm font-semibold tracking-wide text-[#176BCE] dark:text-[#16C7D9]">
                {t.pages.home.eyebrow}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[3.35rem] font-extrabold tracking-tight leading-[1.1] text-[var(--nt-text)]">
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

            {/* Clean Architectural System Blueprint Panel */}
            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-xl border border-[var(--nt-border)] bg-[var(--nt-navy,#101B35)] text-white p-7 sm:p-8 flex flex-col justify-between gap-8">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#16C7D9]">
                    {t.meta.siteName}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    {t.meta.slogan}
                  </p>
                  <div className="h-1 w-14 rounded-full bg-[#16C7D9]" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {SERVICES.slice(0, 4).map((service) => (
                    <Link
                      key={service.slug}
                      to={to(`${ROUTE_SEGMENTS.services}/${service.slug}`)}
                      className="rounded-lg border border-white/15 bg-white/5 p-3.5 hover:border-[#16C7D9] transition-colors"
                    >
                      <p className="font-bold text-[#16C7D9] tabular-nums">{service.order}</p>
                      <p className="mt-1 font-semibold text-white leading-snug">
                        {service.content[locale].shortTitle}
                      </p>
                    </Link>
                  ))}
                </div>

                <p className="text-xs leading-relaxed text-slate-300">
                  {t.footer.positioning}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Positioning & Value Proposition */}
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

      {/* 3. Services Overview (All 6 Connected Services) */}
      <section className="border-t border-[var(--nt-border)] bg-[var(--nt-surface)] py-16 sm:py-20">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--nt-text)]">
                {t.pages.home.servicesTitle}
              </h2>
              <p className="text-base text-[var(--nt-text-secondary)]">
                {t.pages.home.servicesSubtitle}
              </p>
            </div>
            <LinkButton to={to(ROUTE_SEGMENTS.services)} variant="outline" size="md">
              <span>{t.actions.viewServices}</span>
              <ArrowIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            </LinkButton>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const copy = service.content[locale];
              return (
                <Link
                  key={service.slug}
                  to={to(`${ROUTE_SEGMENTS.services}/${service.slug}`)}
                  className="group flex flex-col justify-between rounded-xl border border-[var(--nt-border)] bg-[var(--nt-bg)] p-6 transition-colors hover:border-[#176BCE] dark:hover:border-[#16C7D9]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#176BCE]/10 dark:bg-[#16C7D9]/15 text-[#176BCE] dark:text-[#16C7D9]">
                        <ServiceIcon name={service.iconName} />
                      </span>
                      <span className="text-xs font-bold text-[var(--nt-text-muted)] tabular-nums">
                        {service.order}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--nt-text)] group-hover:text-[#176BCE] dark:group-hover:text-[#16C7D9] transition-colors">
                      {copy.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                      {copy.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[var(--nt-border)] flex items-center justify-between text-xs font-semibold text-[#176BCE] dark:text-[#16C7D9]">
                    <span>{t.actions.viewServiceDetails}</span>
                    <ArrowIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4. Priority Industry Solutions */}
      <section className="border-t border-[var(--nt-border)] py-16 sm:py-20">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--nt-text)]">
                {t.pages.home.solutionsTitle}
              </h2>
              <p className="text-base text-[var(--nt-text-secondary)]">
                {t.pages.home.solutionsSubtitle}
              </p>
            </div>
            <LinkButton to={to(ROUTE_SEGMENTS.solutions)} variant="outline" size="md">
              <span>{t.actions.viewAllSolutions}</span>
              <ArrowIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            </LinkButton>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRY_OPTIONS.map((industry, idx) => {
              const info = industry.content[locale];
              return (
                <Link
                  key={industry.id}
                  to={`${to(ROUTE_SEGMENTS.solutions)}?industry=${industry.id}`}
                  className="group rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 space-y-3 hover:border-[#176BCE] dark:hover:border-[#16C7D9] transition-colors"
                >
                  <p className="text-xs font-bold text-[#176BCE] dark:text-[#16C7D9] tabular-nums">
                    0{idx + 1}.
                  </p>
                  <h3 className="text-base font-bold text-[var(--nt-text)] group-hover:text-[#176BCE] dark:group-hover:text-[#16C7D9] transition-colors">
                    {info.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                    {info.summary}
                  </p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. Three Engagement / Revenue Streams */}
      <section className="border-t border-[var(--nt-border)] bg-[var(--nt-surface)] py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl space-y-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--nt-text)]">
              {t.pages.home.revenueTitle}
            </h2>
            <p className="text-base text-[var(--nt-text-secondary)]">
              {t.pages.home.revenueSubtitle}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {about.engagementModels.map((model) => {
              const target =
                model.actionType === 'store'
                  ? to(ROUTE_SEGMENTS.store)
                  : model.actionType === 'consultation'
                    ? `${to(ROUTE_SEGMENTS.contact)}?intent=consultation`
                    : to(ROUTE_SEGMENTS.contact);

              return (
                <div
                  key={model.title}
                  className="flex flex-col justify-between rounded-xl border border-[var(--nt-border)] bg-[var(--nt-bg)] p-6 sm:p-7 space-y-6"
                >
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-[var(--nt-text)]">{model.title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                      {model.description}
                    </p>
                  </div>
                  <div>
                    <LinkButton
                      to={target}
                      variant={model.actionType === 'project' ? 'primary' : 'outline'}
                      size="md"
                    >
                      {model.actionLabel}
                    </LinkButton>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 6. Why Choose NahroTech */}
      <section className="border-t border-[var(--nt-border)] py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--nt-text)]">
                {t.pages.home.whyTitle}
              </h2>
              <p className="text-base leading-relaxed text-[var(--nt-text-secondary)]">
                {t.pages.home.whySubtitle}
              </p>
            </div>

            <div className="lg:col-span-8 grid gap-5 sm:grid-cols-2">
              {t.pages.home.whyPoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 space-y-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <Check
                      className="h-4.5 w-4.5 text-[#176BCE] dark:text-[#16C7D9] shrink-0"
                      aria-hidden="true"
                    />
                    <h3 className="text-base font-bold text-[var(--nt-text)]">{point.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Showcase Teasers (Portfolio, Digital Store, Insights) */}
      <section className="border-t border-[var(--nt-border)] bg-[var(--nt-surface)] py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl space-y-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--nt-text)]">
              {t.pages.home.showcaseTitle}
            </h2>
            <p className="text-base text-[var(--nt-text-secondary)]">
              {t.pages.home.showcaseSubtitle}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {t.pages.home.showcaseItems.map((item) => (
              <Link
                key={item.route}
                to={to(ROUTE_SEGMENTS[item.route])}
                className="group flex flex-col justify-between rounded-xl border border-[var(--nt-border)] bg-[var(--nt-bg)] p-6 transition-colors hover:border-[#176BCE] dark:hover:border-[#16C7D9]"
              >
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-[#176BCE] dark:text-[#16C7D9]">
                    {item.label}
                  </p>
                  <h3 className="text-lg font-bold text-[var(--nt-text)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#176BCE] dark:text-[#16C7D9]">
                  <span>{item.cta}</span>
                  <ArrowIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. Final Contact CTA */}
      <section className="border-t border-[var(--nt-border)] bg-[#101B35] text-white py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t.pages.home.finalCtaTitle}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-slate-300">
              {t.pages.home.finalCtaBody}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <LinkButton to={to(ROUTE_SEGMENTS.contact)} size="lg" variant="primary">
                <span>{t.actions.startProject}</span>
                <ArrowIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              </LinkButton>
              <LinkButton
                to={`${to(ROUTE_SEGMENTS.contact)}?intent=consultation`}
                size="lg"
                variant="secondary"
              >
                {t.actions.bookConsultation}
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
