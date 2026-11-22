import {ArrowLeft, ArrowRight} from 'lucide-react';
import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {SeoHead} from '../components/SeoHead';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {Container} from '../components/ui/Container';
import {MediaFrame} from '../components/ui/MediaFrame';
import {getInsightsByLocale} from '../content/insights';
import {useLocale} from '../i18n/LocaleContext';
import {cn} from '../utils/cn';
import {ROUTE_SEGMENTS} from '../utils/routes';

export function InsightsPage() {
  const {locale, dir, t, to} = useLocale();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const articles = getInsightsByLocale(locale);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))),
    [articles],
  );

  const filtered = useMemo(() => {
    if (categoryFilter === 'all') return articles;
    return articles.filter((a) => a.category === categoryFilter);
  }, [articles, categoryFilter]);

  return (
    <>
      <SeoHead
        title={t.pages.insights.title}
        description={t.pages.insights.description}
        locale={locale}
      />

      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-surface)] py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              {label: t.nav.home, to: to(ROUTE_SEGMENTS.home)},
              {label: t.nav.insights},
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
              {t.pages.insights.heading}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--nt-text-secondary)]">
              {t.pages.insights.subheading}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-bg)] py-6">
        <Container>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={cn(
                'min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                categoryFilter === 'all'
                  ? 'bg-[#176BCE] text-white border-[#176BCE]'
                  : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
              )}
            >
              {t.pages.insights.allCategories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  'min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                  categoryFilter === cat
                    ? 'bg-[#176BCE] text-white border-[#176BCE]'
                    : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)]"
              >
                <div>
                  <Link to={to(`${ROUTE_SEGMENTS.insights}/${article.slug}`)}>
                    <MediaFrame src={article.image} alt={article.imageAlt} />
                  </Link>
                  <div className="p-6 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--nt-text-muted)] tabular-nums">
                      <span>{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={article.publishedAt}>{article.publishedAt}</time>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="text-lg font-bold text-[var(--nt-text)]">
                      <Link
                        to={to(`${ROUTE_SEGMENTS.insights}/${article.slug}`)}
                        className="hover:text-[#176BCE] dark:hover:text-[#16C7D9] transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h2>

                    <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-[var(--nt-border)]">
                  <Link
                    to={to(`${ROUTE_SEGMENTS.insights}/${article.slug}`)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176BCE] dark:text-[#16C7D9] hover:underline"
                  >
                    <span>{t.pages.insights.readArticle}</span>
                    <ArrowIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
