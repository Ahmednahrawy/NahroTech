import {ArrowLeft, ArrowRight} from 'lucide-react';
import {Link} from 'react-router-dom';
import {SeoHead} from '../components/SeoHead';
import {ServiceIcon} from '../components/ServiceIcon';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {LinkButton} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {SERVICES, ServiceItem} from '../content/services';
import {useLocale} from '../i18n/LocaleContext';
import {ROUTE_SEGMENTS} from '../utils/routes';

function ServiceCard({service}: {service: ServiceItem}) {
  const {locale, dir, t, to} = useLocale();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const copy = service.content[locale];

  return (
    <article className="flex flex-col justify-between rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#176BCE]/10 dark:bg-[#16C7D9]/15 text-[#176BCE] dark:text-[#16C7D9]">
            <ServiceIcon name={service.iconName} />
          </span>
          <span className="text-xs font-bold text-[var(--nt-text-muted)] tabular-nums">
            {service.order}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[var(--nt-text)]">{copy.title}</h3>
        <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">{copy.summary}</p>

        <ul className="space-y-1.5 pt-2 text-xs text-[var(--nt-text-secondary)]">
          {copy.capabilities.map((cap) => (
            <li key={cap} className="flex items-baseline gap-2">
              <span className="text-[#176BCE] dark:text-[#16C7D9]" aria-hidden="true">
                —
              </span>
              <span>{cap}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-[var(--nt-border)] flex items-center justify-between gap-3">
        <Link
          to={to(`${ROUTE_SEGMENTS.services}/${service.slug}`)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176BCE] dark:text-[#16C7D9] hover:underline"
        >
          <span>{t.actions.viewServiceDetails}</span>
          <ArrowIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function ServicesPage() {
  const {locale, t, to} = useLocale();
  const primaryServices = SERVICES.filter((s) => s.tier === 'primary');
  const additionalServices = SERVICES.filter((s) => s.tier === 'additional');

  return (
    <>
      <SeoHead
        title={t.pages.services.title}
        description={t.pages.services.description}
        locale={locale}
      />

      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-surface)] py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              {label: t.nav.home, to: to(ROUTE_SEGMENTS.home)},
              {label: t.nav.services},
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
              {t.pages.services.heading}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--nt-text-secondary)]">
              {t.pages.services.subheading}
            </p>
          </div>
        </Container>
      </section>

      {/* Primary Services */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-2xl space-y-2 mb-8">
            <h2 className="text-2xl font-bold text-[var(--nt-text)]">
              {t.pages.services.primaryHeading}
            </h2>
            <p className="text-sm text-[var(--nt-text-secondary)]">
              {t.pages.services.primarySubheading}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {primaryServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* Additional Services */}
      <section className="border-t border-[var(--nt-border)] py-12 sm:py-16">
        <Container>
          <div className="max-w-2xl space-y-2 mb-8">
            <h2 className="text-2xl font-bold text-[var(--nt-text)]">
              {t.pages.services.additionalHeading}
            </h2>
            <p className="text-sm text-[var(--nt-text-secondary)]">
              {t.pages.services.additionalSubheading}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {additionalServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* Connected Ecosystem CTA */}
      <section className="border-t border-[var(--nt-border)] bg-[var(--nt-surface)] py-14 sm:py-16">
        <Container>
          <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface-elevated)] p-7 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--nt-text)]">
                {t.pages.services.connectedHeading}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--nt-text-secondary)]">
                {t.pages.services.connectedBody}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <LinkButton to={to(ROUTE_SEGMENTS.contact)} variant="primary" size="md">
                {t.actions.startProject}
              </LinkButton>
              <LinkButton
                to={`${to(ROUTE_SEGMENTS.contact)}?intent=consultation`}
                variant="outline"
                size="md"
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
