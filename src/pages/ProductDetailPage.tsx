import {Check, MessageSquare} from 'lucide-react';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {SeoHead} from '../components/SeoHead';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {LinkButton} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {MediaFrame} from '../components/ui/MediaFrame';
import {absoluteMediaUrl, buildWhatsAppUrl, siteConfig} from '../config/site';
import {PRODUCT_CATEGORIES, getProductBySlug} from '../content/products';
import {useLocale} from '../i18n/LocaleContext';
import {trackProductView, trackWhatsAppClick} from '../services/analytics';
import {ROUTE_SEGMENTS} from '../utils/routes';
import {NotFoundPage} from './NotFoundPage';

export function ProductDetailPage() {
  const {slug} = useParams<{slug: string}>();
  const {locale, t, to} = useLocale();
  const product = getProductBySlug(slug);

  useEffect(() => {
    if (product) {
      trackProductView(product.slug, product.category, locale);
    }
  }, [product?.slug, product?.category, locale]);

  if (!product) {
    return <NotFoundPage />;
  }

  const copy = product.content[locale];
  const categoryLabel =
    PRODUCT_CATEGORIES.find((c) => c.id === product.category)?.label[locale] || '';
  const whatsappHref = buildWhatsAppUrl(copy.whatsappInquiryMessage);
  const productImageUrl = absoluteMediaUrl(product.image);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: copy.name,
    description: copy.shortDescription,
    image: productImageUrl,
    category: categoryLabel,
    brand: {
      '@type': 'Brand',
      name: siteConfig.brandName,
    },
    ...(product.indicativePriceUsd
      ? {
          offers: {
            '@type': 'Offer',
            price: String(product.indicativePriceUsd),
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  };

  return (
    <>
      <SeoHead
        title={`${copy.name} — ${siteConfig.brandName}`}
        description={copy.shortDescription}
        locale={locale}
        image={product.image}
        structuredData={productJsonLd}
      />

      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-surface)] py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              {label: t.nav.home, to: to(ROUTE_SEGMENTS.home)},
              {label: t.nav.store, to: to(ROUTE_SEGMENTS.store)},
              {label: copy.name},
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 overflow-hidden rounded-xl border border-[var(--nt-border)]">
              <MediaFrame src={product.image} alt={copy.imageAlt} priority />
            </div>

            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold text-[#176BCE] dark:text-[#16C7D9]">
                {categoryLabel}
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
                {copy.name}
              </h1>
              <p className="text-base leading-relaxed text-[var(--nt-text-secondary)]">
                {copy.description}
              </p>

              <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-bg)] p-5 space-y-1">
                <p className="text-xs font-semibold text-[var(--nt-text-muted)]">
                  {t.pages.store.product.priceLabel}
                </p>
                <p className="text-lg font-bold text-[var(--nt-text)] tabular-nums">
                  {copy.priceDisplay}
                </p>
                <p className="text-xs text-[var(--nt-text-muted)]">
                  {t.pages.store.product.purchaseNotice}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <LinkButton
                  to={`${to(ROUTE_SEGMENTS.contact)}?intent=product&product=${encodeURIComponent(product.slug)}`}
                  variant="primary"
                  size="lg"
                >
                  {t.pages.store.requestPurchaseForm}
                </LinkButton>

                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('product_detail', product.slug, locale)}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-[#101B35] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1A2B52] dark:bg-[#16C7D9] dark:text-[#091122] transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{t.pages.store.requestPurchaseWhatsApp}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="space-y-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-4">
              <h2 className="text-lg font-bold text-[var(--nt-text)]">
                {t.pages.store.product.featuresHeading}
              </h2>
              <ul className="space-y-2.5 text-sm text-[var(--nt-text-secondary)]">
                {copy.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check
                      className="h-4 w-4 mt-0.5 text-[#176BCE] dark:text-[#16C7D9] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-4">
              <h2 className="text-lg font-bold text-[var(--nt-text)]">
                {t.pages.store.product.intendedUsersHeading}
              </h2>
              <ul className="space-y-2.5 text-sm text-[var(--nt-text-secondary)]">
                {copy.intendedUsers.map((user) => (
                  <li key={user} className="flex items-start gap-2.5">
                    <span className="text-[#176BCE] dark:text-[#16C7D9]" aria-hidden="true">
                      —
                    </span>
                    <span>{user}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 space-y-2">
              <h2 className="text-sm font-bold text-[var(--nt-text)]">
                {t.pages.store.product.compatibilityHeading}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                {copy.compatibility}
              </p>
            </div>
            <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 space-y-2">
              <h2 className="text-sm font-bold text-[var(--nt-text)]">
                {t.pages.store.product.requirementsHeading}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                {copy.requirements}
              </p>
            </div>
            <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 space-y-2">
              <h2 className="text-sm font-bold text-[var(--nt-text)]">
                {t.pages.store.product.licenseHeading}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                {copy.licenseInfo}
              </p>
            </div>
          </div>

          {copy.faqs.length > 0 && (
            <div className="max-w-3xl space-y-4">
              <h2 className="text-xl font-bold text-[var(--nt-text)]">
                {t.pages.store.product.faqHeading}
              </h2>
              <div className="divide-y divide-[var(--nt-border)] rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)]">
                {copy.faqs.map((faq) => (
                  <div key={faq.question} className="p-6 space-y-2">
                    <h3 className="text-base font-bold text-[var(--nt-text)]">{faq.question}</h3>
                    <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
