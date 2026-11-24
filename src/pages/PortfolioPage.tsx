import {ArrowLeft, ArrowRight, Maximize2} from 'lucide-react';
import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {SeoHead} from '../components/SeoHead';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {Button} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {LightboxModal} from '../components/ui/LightboxModal';
import {MediaFrame} from '../components/ui/MediaFrame';
import {PORTFOLIO_ITEMS} from '../content/portfolio';
import {SERVICES, getServiceBySlug} from '../content/services';
import {INDUSTRY_OPTIONS, IndustryId} from '../content/solutions';
import {useLocale} from '../i18n/LocaleContext';
import {cn} from '../utils/cn';
import {ROUTE_SEGMENTS} from '../utils/routes';

export function PortfolioPage() {
  const {locale, dir, t, to} = useLocale();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const [industryFilter, setIndustryFilter] = useState<IndustryId | 'all'>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [techFilter, setTechFilter] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<{
    src: string;
    alt: string;
    title: string;
    subtitle: string;
  } | null>(null);

  const technologies = useMemo(() => {
    const set = new Set<string>();
    for (const item of PORTFOLIO_ITEMS) {
      item.technologies.forEach((tech) => set.add(tech));
    }
    return Array.from(set);
  }, []);

  const usedServices = useMemo(() => {
    const slugs = new Set(PORTFOLIO_ITEMS.map((i) => i.serviceSlug));
    return SERVICES.filter((s) => slugs.has(s.slug));
  }, []);

  const filtered = useMemo(() => {
    return PORTFOLIO_ITEMS.filter((item) => {
      if (industryFilter !== 'all' && item.industry !== industryFilter) return false;
      if (serviceFilter !== 'all' && item.serviceSlug !== serviceFilter) return false;
      if (techFilter !== 'all' && !item.technologies.includes(techFilter)) return false;
      return true;
    });
  }, [industryFilter, serviceFilter, techFilter]);

  const hasFilters = industryFilter !== 'all' || serviceFilter !== 'all' || techFilter !== 'all';

  const resetFilters = () => {
    setIndustryFilter('all');
    setServiceFilter('all');
    setTechFilter('all');
  };

  return (
    <>
      <SeoHead
        title={t.pages.portfolio.title}
        description={t.pages.portfolio.description}
        locale={locale}
      />

      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-surface)] py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              {label: t.nav.home, to: to(ROUTE_SEGMENTS.home)},
              {label: t.nav.portfolio},
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
              {t.pages.portfolio.heading}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--nt-text-secondary)]">
              {t.pages.portfolio.subheading}
            </p>
            <p className="text-xs leading-relaxed text-[var(--nt-text-muted)] border-t border-[var(--nt-border)] pt-4">
              {t.pages.portfolio.conceptNotice}
            </p>
          </div>
        </Container>
      </section>

      {/* Filters */}
      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-bg)] py-7">
        <Container className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-3">
            {/* Industry */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--nt-text-muted)]">
                {t.pages.portfolio.filterIndustry}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setIndustryFilter('all')}
                  className={cn(
                    'min-h-[40px] rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                    industryFilter === 'all'
                      ? 'bg-[#176BCE] text-white border-[#176BCE]'
                      : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                  )}
                >
                  {t.pages.portfolio.allOption}
                </button>
                {INDUSTRY_OPTIONS.map((ind) => (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => setIndustryFilter(ind.id)}
                    className={cn(
                      'min-h-[40px] rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                      industryFilter === ind.id
                        ? 'bg-[#176BCE] text-white border-[#176BCE]'
                        : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                    )}
                  >
                    {ind.content[locale].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Service */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--nt-text-muted)]">
                {t.pages.portfolio.filterService}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setServiceFilter('all')}
                  className={cn(
                    'min-h-[40px] rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                    serviceFilter === 'all'
                      ? 'bg-[#101B35] text-white border-[#101B35] dark:bg-[#16C7D9] dark:text-[#091122] dark:border-[#16C7D9]'
                      : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                  )}
                >
                  {t.pages.portfolio.allOption}
                </button>
                {usedServices.map((srv) => (
                  <button
                    key={srv.slug}
                    type="button"
                    onClick={() => setServiceFilter(srv.slug)}
                    className={cn(
                      'min-h-[40px] rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                      serviceFilter === srv.slug
                        ? 'bg-[#101B35] text-white border-[#101B35] dark:bg-[#16C7D9] dark:text-[#091122] dark:border-[#16C7D9]'
                        : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                    )}
                  >
                    {srv.content[locale].shortTitle}
                  </button>
                ))}
              </div>
            </div>

            {/* Technology */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--nt-text-muted)]">
                {t.pages.portfolio.filterTechnology}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTechFilter('all')}
                  className={cn(
                    'min-h-[40px] rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                    techFilter === 'all'
                      ? 'bg-[#101B35] text-white border-[#101B35] dark:bg-[#16C7D9] dark:text-[#091122] dark:border-[#16C7D9]'
                      : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                  )}
                >
                  {t.pages.portfolio.allOption}
                </button>
                {technologies.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => setTechFilter(tech)}
                    className={cn(
                      'min-h-[40px] rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                      techFilter === tech
                        ? 'bg-[#101B35] text-white border-[#101B35] dark:bg-[#16C7D9] dark:text-[#091122] dark:border-[#16C7D9]'
                        : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                    )}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {hasFilters && (
            <div>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                {t.actions.clearFilters}
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* Gallery */}
      <section className="py-12 sm:py-16">
        <Container>
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-10 text-center space-y-4">
              <p className="text-base text-[var(--nt-text-secondary)]">
                {t.pages.portfolio.noMatches}
              </p>
              <Button variant="outline" size="md" onClick={resetFilters}>
                {t.actions.clearFilters}
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => {
                const copy = item.content[locale];
                const service = getServiceBySlug(item.serviceSlug);
                const techText = item.technologies.join(' · ');

                return (
                  <article
                    key={item.slug}
                    className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)]"
                  >
                    <div>
                      <div className="relative">
                        <Link to={to(`${ROUTE_SEGMENTS.portfolio}/${item.slug}`)}>
                          <MediaFrame src={item.image} alt={copy.imageAlt} />
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewItem({
                              src: item.image,
                              alt: copy.imageAlt,
                              title: copy.title,
                              subtitle: `${copy.statusLabel} · ${service?.content[locale].shortTitle || copy.category}`,
                            })
                          }
                          aria-label={
                            locale === 'ar'
                              ? `تكبير معاينة ${copy.title}`
                              : `Expand preview for ${copy.title}`
                          }
                          className="absolute end-3 bottom-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 bg-[#101B35]/80 text-white backdrop-blur-xs opacity-90 hover:opacity-100 hover:bg-[#176BCE] transition-all cursor-pointer"
                        >
                          <Maximize2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--nt-text-muted)]">
                          <span className="font-semibold text-[#176BCE] dark:text-[#16C7D9]">
                            {copy.statusLabel}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{service?.content[locale].shortTitle || copy.category}</span>
                        </div>

                        <h2 className="text-lg font-bold text-[var(--nt-text)]">
                          <Link
                            to={to(`${ROUTE_SEGMENTS.portfolio}/${item.slug}`)}
                            className="hover:text-[#176BCE] dark:hover:text-[#16C7D9] transition-colors"
                          >
                            {copy.title}
                          </Link>
                        </h2>

                        <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                          {copy.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-4 border-t border-[var(--nt-border)] flex flex-col gap-3">
                      <p className="text-xs text-[var(--nt-text-muted)]">{techText}</p>
                      <Link
                        to={to(`${ROUTE_SEGMENTS.portfolio}/${item.slug}`)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176BCE] dark:text-[#16C7D9] hover:underline"
                      >
                        <span>{t.pages.portfolio.viewCaseStudy}</span>
                        <ArrowIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      <LightboxModal
        open={Boolean(previewItem)}
        onClose={() => setPreviewItem(null)}
        src={previewItem?.src || ''}
        alt={previewItem?.alt || ''}
        title={previewItem?.title || ''}
        subtitle={previewItem?.subtitle}
      />
    </>
  );
}
