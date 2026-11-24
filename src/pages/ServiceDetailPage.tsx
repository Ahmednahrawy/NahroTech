import {ArrowLeft, ArrowRight, Check, Maximize2, MessageSquare} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {SeoHead} from '../components/SeoHead';
import {ServiceIcon} from '../components/ServiceIcon';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {LinkButton} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {LightboxModal} from '../components/ui/LightboxModal';
import {MediaFrame} from '../components/ui/MediaFrame';
import {absoluteMediaUrl, buildWhatsAppUrl, siteConfig} from '../config/site';
import {PORTFOLIO_ITEMS} from '../content/portfolio';
import {getServiceBySlug} from '../content/services';
import {useLocale} from '../i18n/LocaleContext';
import {trackServiceView, trackWhatsAppClick} from '../services/analytics';
import {ROUTE_SEGMENTS} from '../utils/routes';
import {NotFoundPage} from './NotFoundPage';

export function ServiceDetailPage() {
  const {slug} = useParams<{slug: string}>();
  const {locale, dir, t, to} = useLocale();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const service = getServiceBySlug(slug);

  useEffect(() => {
    if (service) {
      trackServiceView(service.slug, locale);
    }
  }, [service?.slug, locale]);

  if (!service) {
    return <NotFoundPage />;
  }

  const copy = service.content[locale];
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const whatsappHref = buildWhatsAppUrl(copy.whatsappMessage);
  const connected = service.connectedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const relatedExamples = PORTFOLIO_ITEMS.filter((item) => item.serviceSlug === service.slug);

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: copy.title,
    description: copy.summary,
    image: absoluteMediaUrl(service.image),
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
        image={service.image}
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

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-5">
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
                    onClick={() => trackWhatsAppClick('service_detail', service.slug, locale)}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-[var(--nt-border-strong)] px-5 py-3 text-sm font-semibold text-[var(--nt-text)] hover:bg-[var(--nt-surface-elevated)] transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 text-[#16C7D9] shrink-0" aria-hidden="true" />
                    <span>{t.actions.chatWhatsApp}</span>
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="group overflow-hidden rounded-xl border border-[var(--nt-border)] bg-[var(--nt-bg)]">
                <div className="relative">
                  <MediaFrame src={service.image} alt={copy.imageAlt} priority />
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    aria-label={locale === 'ar' ? 'تكبير صورة نموذج العمل' : 'Expand work example image'}
                    className="absolute end-3 bottom-3 inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/25 bg-[#101B35]/85 px-3 text-xs font-semibold text-white backdrop-blur-xs hover:bg-[#176BCE] transition-colors cursor-pointer"
                  >
                    <Maximize2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{locale === 'ar' ? 'معاينة كاملة' : 'Full view'}</span>
                  </button>
                </div>
                <p className="px-4 py-3 text-xs font-medium text-[var(--nt-text-secondary)]">
                  {copy.workExampleCaption}
                </p>
              </div>
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

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-4">
              <h2 className="text-lg font-bold text-[var(--nt-text)]">
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

          {relatedExamples.length > 0 && (
            <div className="pt-4 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-[var(--nt-text)]">
                  {locale === 'ar' ? 'نماذج أعمال مرتبطة بهذه الخدمة' : 'Related Work Examples'}
                </h2>
                <Link
                  to={to(ROUTE_SEGMENTS.portfolio)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176BCE] dark:text-[#16C7D9] hover:underline"
                >
                  <span>{t.pages.home.viewAllPortfolio}</span>
                  <ArrowIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedExamples.map((example) => {
                  const exCopy = example.content[locale];
                  return (
                    <article
                      key={example.slug}
                      className="group grid sm:grid-cols-5 overflow-hidden rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)]"
                    >
                      <Link
                        to={to(`${ROUTE_SEGMENTS.portfolio}/${example.slug}`)}
                        className="sm:col-span-2 block"
                      >
                        <MediaFrame
                          src={example.image}
                          alt={exCopy.imageAlt}
                          aspectClass="aspect-[4/3] sm:h-full"
                          className="sm:border-b-0"
                        />
                      </Link>
                      <div className="sm:col-span-3 p-5 flex flex-col justify-between gap-3">
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-[#176BCE] dark:text-[#16C7D9]">
                            {exCopy.statusLabel}
                          </p>
                          <h3 className="text-base font-bold text-[var(--nt-text)]">
                            <Link
                              to={to(`${ROUTE_SEGMENTS.portfolio}/${example.slug}`)}
                              className="hover:text-[#176BCE] dark:hover:text-[#16C7D9] transition-colors"
                            >
                              {exCopy.title}
                            </Link>
                          </h3>
                          <p className="text-xs leading-relaxed text-[var(--nt-text-secondary)]">
                            {exCopy.shortDescription}
                          </p>
                        </div>
                        <Link
                          to={to(`${ROUTE_SEGMENTS.portfolio}/${example.slug}`)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176BCE] dark:text-[#16C7D9] hover:underline"
                        >
                          <span>{t.pages.portfolio.viewCaseStudy}</span>
                          <ArrowIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

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

      <LightboxModal
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        src={service.image}
        alt={copy.imageAlt}
        title={copy.title}
        subtitle={copy.workExampleCaption}
      />
    </>
  );
}
