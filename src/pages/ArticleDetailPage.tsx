import {ArrowLeft, ArrowRight} from 'lucide-react';
import {Link, useParams} from 'react-router-dom';
import {SeoHead} from '../components/SeoHead';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {LinkButton} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {MediaFrame} from '../components/ui/MediaFrame';
import {absoluteMediaUrl, siteConfig} from '../config/site';
import {getInsightBySlug} from '../content/insights';
import {getServiceBySlug} from '../content/services';
import {useLocale} from '../i18n/LocaleContext';
import {ROUTE_SEGMENTS} from '../utils/routes';
import {NotFoundPage} from './NotFoundPage';

export function ArticleDetailPage() {
  const {slug} = useParams<{slug: string}>();
  const {locale, dir, t, to} = useLocale();
  const article = getInsightBySlug(locale, slug);

  if (!article) {
    return <NotFoundPage />;
  }

  const relatedService = getServiceBySlug(article.relatedServiceSlug);
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;
  const articleImageUrl = absoluteMediaUrl(article.image);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    image: articleImageUrl,
    datePublished: article.publishedAt,
    inLanguage: locale,
    author: {
      '@type': 'Organization',
      name: siteConfig.brandName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
    },
  };

  return (
    <>
      <SeoHead
        title={`${article.title} — ${siteConfig.brandName}`}
        description={article.summary}
        locale={locale}
        type="article"
        image={article.image}
        structuredData={articleJsonLd}
      />

      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-surface)] py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              {label: t.nav.home, to: to(ROUTE_SEGMENTS.home)},
              {label: t.nav.insights, to: to(ROUTE_SEGMENTS.insights)},
              {label: article.title},
            ]}
          />

          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--nt-text-muted)] tabular-nums">
              <span className="font-semibold text-[#176BCE] dark:text-[#16C7D9]">
                {article.category}
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.publishedAt}>{article.publishedAt}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--nt-text-secondary)]">
              {article.summary}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl space-y-8">
            <div className="overflow-hidden rounded-xl border border-[var(--nt-border)]">
              <MediaFrame src={article.image} alt={article.imageAlt} priority />
            </div>

            <article
              className="nt-prose"
              dangerouslySetInnerHTML={{__html: article.html}}
            />

            <div className="pt-8 border-t border-[var(--nt-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link
                to={to(ROUTE_SEGMENTS.insights)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--nt-text-secondary)] hover:text-[var(--nt-text)]"
              >
                <BackArrow className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t.pages.insights.backToInsights}</span>
              </Link>

              {relatedService && (
                <LinkButton
                  to={to(`${ROUTE_SEGMENTS.services}/${relatedService.slug}`)}
                  variant="outline"
                  size="sm"
                >
                  {t.pages.insights.relatedServiceLabel}: {relatedService.content[locale].shortTitle}
                </LinkButton>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
