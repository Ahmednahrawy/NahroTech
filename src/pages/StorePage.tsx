import {ArrowLeft, ArrowRight} from 'lucide-react';
import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {SeoHead} from '../components/SeoHead';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {Container} from '../components/ui/Container';
import {MediaFrame} from '../components/ui/MediaFrame';
import {PRODUCT_CATEGORIES, PRODUCTS, ProductCategoryId} from '../content/products';
import {useLocale} from '../i18n/LocaleContext';
import {cn} from '../utils/cn';
import {ROUTE_SEGMENTS} from '../utils/routes';

export function StorePage() {
  const {locale, dir, t, to} = useLocale();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const [categoryFilter, setCategoryFilter] = useState<ProductCategoryId | 'all'>('all');

  const readyProducts = useMemo(() => PRODUCTS.filter((p) => p.readyForSale), []);

  const filtered = useMemo(() => {
    if (categoryFilter === 'all') return readyProducts;
    return readyProducts.filter((p) => p.category === categoryFilter);
  }, [categoryFilter, readyProducts]);

  return (
    <>
      <SeoHead
        title={t.pages.store.title}
        description={t.pages.store.description}
        locale={locale}
      />

      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-surface)] py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              {label: t.nav.home, to: to(ROUTE_SEGMENTS.home)},
              {label: t.nav.store},
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
              {t.pages.store.heading}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--nt-text-secondary)]">
              {t.pages.store.subheading}
            </p>
            <div className="rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface-elevated)] p-4 text-xs leading-relaxed text-[var(--nt-text-secondary)]">
              {t.pages.store.mvpPurchaseNote}
            </div>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
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
              {t.pages.store.allCategories}
            </button>
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={cn(
                  'min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                  categoryFilter === cat.id
                    ? 'bg-[#176BCE] text-white border-[#176BCE]'
                    : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                )}
              >
                {cat.label[locale]}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Product Grid */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => {
              const copy = product.content[locale];
              const categoryLabel =
                PRODUCT_CATEGORIES.find((c) => c.id === product.category)?.label[locale] || '';

              return (
                <article
                  key={product.slug}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)]"
                >
                  <div>
                    <Link to={to(`${ROUTE_SEGMENTS.store}/${product.slug}`)}>
                      <MediaFrame src={product.image} alt={copy.imageAlt} />
                    </Link>

                    <div className="p-6 space-y-3">
                      <p className="text-xs font-medium text-[var(--nt-text-muted)]">
                        {categoryLabel}
                      </p>
                      <h2 className="text-lg font-bold text-[var(--nt-text)]">
                        <Link
                          to={to(`${ROUTE_SEGMENTS.store}/${product.slug}`)}
                          className="hover:text-[#176BCE] dark:hover:text-[#16C7D9] transition-colors"
                        >
                          {copy.name}
                        </Link>
                      </h2>
                      <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                        {copy.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-[var(--nt-border)] space-y-3">
                    <p className="text-xs font-semibold text-[var(--nt-text)] tabular-nums">
                      {copy.priceDisplay}
                    </p>
                    <Link
                      to={to(`${ROUTE_SEGMENTS.store}/${product.slug}`)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176BCE] dark:text-[#16C7D9] hover:underline"
                    >
                      <span>{t.pages.store.viewProductDetails}</span>
                      <ArrowIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
