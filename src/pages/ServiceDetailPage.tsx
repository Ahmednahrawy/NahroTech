import {ArrowLeft, ArrowRight, Check, MessageSquare} from 'lucide-react';
import {Link, useParams} from 'react-router-dom';
import {SeoHead} from '../components/SeoHead';
import {ServiceIcon} from '../components/ServiceIcon';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {LinkButton} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {buildWhatsAppUrl, siteConfig} from '../config/site';
import {getServiceBySlug} from '../content/services';
import {useLocale} from '../i18n/LocaleContext';
import {ROUTE_SEGMENTS} from '../utils/routes';
import {NotFoundPage} from './NotFoundPage';

export function ServiceDetailPage() {
  const {slug} = useParams<{slug: string}>();
  const {locale, dir, t, to} = useLocale();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <NotFoundPage />;
  }

  const copy = service.content[locale];
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const whatsappHref = buildWhatsAppUrl(copy.whatsappMessage);
  const connected = service.connectedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: copy.title,
    description: copy.summary,
    provider: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
    },
    serviceType: copy.capabilities.join(', '),
  };

  return (
    <>
      <SeoHead
        title={`${copy.title} — ${siteConfig.brandName}`}
        description={copy.summary}
        locale={locale}
        structuredData={serviceJsonLd}
      />

      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-surface)] py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              {label: t.nav.home, to: to(ROUTE_SEGMENTS.home)},
              {label: t.nav.services, to: to(ROUTE_SEGMENTS.services)},
              {label: copy.title},
            ]}
          />

          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#176BCE]/10 dark:bg-[#16C7D9]/15 text-[#176BCE] dark:text-[#16C7D9]">
                  <ServiceIcon name={service.iconName} />
                </span>
                <span className="text-xs font-bold text-[var(--nt-text-muted)] tabular-nums">
                  {service.order}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
                {copy.title}
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[var(--nt-text-secondary)]">
                {copy.summary}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <LinkButton
                  to={`${to(ROUTE_SEGMENTS.contact)}?service=${service.slug}`}
                  variant="primary"
                  size="lg"
                >
                  <span>{t.pages.services.detail.requestServiceCta}</span>
                  <ArrowIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                </LinkButton>
                <LinkButton
                  to={`${to(ROUTE_SEGMENTS.contact)}?intent=consultation&service=${service.slug}`}
                  variant="outline"
                  size="lg"
                >
                  {t.pages.services.detail.consultationCta}
                </LinkButton>
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-[var(--nt-border-strong)] px-5 py-3 text-sm font-semibold text-[var(--nt-text)] hover:bg-[var(--nt-surface-elevated)] transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 text-[#16C7D9] shrink-0" aria-hidden="true" />
                    <span>{t.actions.chatWhatsApp}</span>
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 rounded-xl border border-[var(--nt-border)] bg-[var(--nt-bg)] p-6 space-y-4">
              <h2 className="text-sm font-bold text-[var(--nt-text)]">
                {t.pages.services.detail.capabilitiesLabel}
              </h2>
              <ul className="space-y-2.5 text-sm text-[var(--nt-text-secondary)]">
                {copy.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2.5">
                    <Check
                      className="h-4 w-4 mt-0.5 text-[#176BCE] dark:text-[#16C7D9] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="space-y-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-3">
              <h2 className="text-lg font-bold text-[var(--nt-text)]">
                {t.pages.services.detail.problemLabel}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                {copy.problemSolved}
              </p>
            </div>

            <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-3">
              <h2 className="text-lg font-bold text-[var(--nt-text)]">
                {t.pages.services.detail.approachLabel}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                {copy.approach}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-4">
              <h2 className="text-lg font-bold text-[var(--nt-text)]">
                {t.pages.services.detail.deliverablesLabel}
              </h2>
              <ul className="space-y-2.5 text-sm text-[var(--nt-text-secondary)]">
                {copy.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      className="h-4 w-4 mt-0.5 text-[#176BCE] dark:text-[#16C7D9] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-4">
              <h2 className="text-lg font-bold text-[var(--nt-text)]">
                {t.pages.services.detail.idealForLabel}
              </h2>
              <ul className="space-y-2.5 text-sm text-[var(--nt-text-secondary)]">
                {copy.idealFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#176BCE] dark:text-[#16C7D9]" aria-hidden="true">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {connected.length > 0 && (
            <div className="pt-4 space-y-5">
              <h2 className="text-xl font-bold text-[var(--nt-text)]">
                {t.pages.services.detail.connectedServicesLabel}
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {connected.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={to(`${ROUTE_SEGMENTS.services}/${rel.slug}`)}
                    className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-5 hover:border-[#176BCE] dark:hover:border-[#16C7D9] transition-colors space-y-2"
                  >
                    <p className="text-xs font-bold text-[#176BCE] dark:text-[#16C7D9] tabular-nums">
                      {rel.order}
                    </p>
                    <p className="font-bold text-sm text-[var(--nt-text)]">
                      {rel.content[locale].title}
                    </p>
                    <p className="text-xs text-[var(--nt-text-secondary)] line-clamp-2">
                      {rel.content[locale].summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
