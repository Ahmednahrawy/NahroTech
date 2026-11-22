import {ArrowLeft, ArrowRight, Check} from 'lucide-react';
import {useMemo, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {SeoHead} from '../components/SeoHead';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {Button, LinkButton} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {getServiceBySlug} from '../content/services';
import {
  BusinessSizeId,
  FUNCTION_OPTIONS,
  FunctionId,
  INDUSTRY_OPTIONS,
  IndustryId,
  SIZE_OPTIONS,
  SOLUTIONS,
} from '../content/solutions';
import {useLocale} from '../i18n/LocaleContext';
import {cn} from '../utils/cn';
import {ROUTE_SEGMENTS} from '../utils/routes';

export function SolutionsPage() {
  const {locale, dir, t, to} = useLocale();
  const [searchParams] = useSearchParams();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const initialIndustry = searchParams.get('industry') as IndustryId | null;
  const validInitialIndustry = INDUSTRY_OPTIONS.some((i) => i.id === initialIndustry)
    ? initialIndustry
    : 'all';

  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId | 'all'>(
    validInitialIndustry || 'all',
  );
  const [selectedFunction, setSelectedFunction] = useState<FunctionId | 'all'>('all');
  const [selectedSize, setSelectedSize] = useState<BusinessSizeId | 'all'>('all');

  const filteredSolutions = useMemo(() => {
    return SOLUTIONS.filter((item) => {
      if (selectedIndustry !== 'all' && !item.industries.includes(selectedIndustry)) {
        return false;
      }
      if (selectedFunction !== 'all' && !item.functions.includes(selectedFunction)) {
        return false;
      }
      if (selectedSize !== 'all' && !item.sizes.includes(selectedSize)) {
        return false;
      }
      return true;
    });
  }, [selectedIndustry, selectedFunction, selectedSize]);

  const hasFilters =
    selectedIndustry !== 'all' || selectedFunction !== 'all' || selectedSize !== 'all';

  const resetFilters = () => {
    setSelectedIndustry('all');
    setSelectedFunction('all');
    setSelectedSize('all');
  };

  return (
    <>
      <SeoHead
        title={t.pages.solutions.title}
        description={t.pages.solutions.description}
        locale={locale}
      />

      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-surface)] py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              {label: t.nav.home, to: to(ROUTE_SEGMENTS.home)},
              {label: t.nav.solutions},
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
              {t.pages.solutions.heading}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--nt-text-secondary)]">
              {t.pages.solutions.subheading}
            </p>
          </div>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-bg)] py-8">
        <Container className="space-y-6">
          {/* Industry Filter */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--nt-text-muted)]">
              {t.pages.solutions.filterIndustry}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedIndustry('all')}
                className={cn(
                  'min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border',
                  selectedIndustry === 'all'
                    ? 'bg-[#176BCE] text-white border-[#176BCE]'
                    : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                )}
              >
                {t.pages.solutions.allIndustries}
              </button>
              {INDUSTRY_OPTIONS.map((industry) => (
                <button
                  key={industry.id}
                  type="button"
                  onClick={() => setSelectedIndustry(industry.id)}
                  className={cn(
                    'min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border',
                    selectedIndustry === industry.id
                      ? 'bg-[#176BCE] text-white border-[#176BCE]'
                      : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                  )}
                >
                  {industry.content[locale].name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Business Function Filter */}
            <div className="space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--nt-text-muted)]">
                {t.pages.solutions.filterFunction}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedFunction('all')}
                  className={cn(
                    'min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border',
                    selectedFunction === 'all'
                      ? 'bg-[#101B35] text-white border-[#101B35] dark:bg-[#16C7D9] dark:text-[#091122] dark:border-[#16C7D9]'
                      : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                  )}
                >
                  {t.pages.solutions.allFunctions}
                </button>
                {FUNCTION_OPTIONS.map((fn) => (
                  <button
                    key={fn.id}
                    type="button"
                    onClick={() => setSelectedFunction(fn.id)}
                    className={cn(
                      'min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border',
                      selectedFunction === fn.id
                        ? 'bg-[#101B35] text-white border-[#101B35] dark:bg-[#16C7D9] dark:text-[#091122] dark:border-[#16C7D9]'
                        : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                    )}
                  >
                    {fn.label[locale]}
                  </button>
                ))}
              </div>
            </div>

            {/* Business Size Filter */}
            <div className="space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--nt-text-muted)]">
                {t.pages.solutions.filterSize}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSize('all')}
                  className={cn(
                    'min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border',
                    selectedSize === 'all'
                      ? 'bg-[#101B35] text-white border-[#101B35] dark:bg-[#16C7D9] dark:text-[#091122] dark:border-[#16C7D9]'
                      : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                  )}
                >
                  {t.pages.solutions.allSizes}
                </button>
                {SIZE_OPTIONS.map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size.id)}
                    className={cn(
                      'min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border',
                      selectedSize === size.id
                        ? 'bg-[#101B35] text-white border-[#101B35] dark:bg-[#16C7D9] dark:text-[#091122] dark:border-[#16C7D9]'
                        : 'bg-[var(--nt-surface)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                    )}
                  >
                    {size.label[locale]}
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

      {/* Filtered Solutions Grid */}
      <section className="py-12 sm:py-16">
        <Container>
          {filteredSolutions.length === 0 ? (
            <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-10 text-center space-y-4">
              <p className="text-base text-[var(--nt-text-secondary)]">
                {t.pages.solutions.noMatches}
              </p>
              <Button variant="outline" size="md" onClick={resetFilters}>
                {t.actions.clearFilters}
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredSolutions.map((item) => {
                const copy = item.content[locale];
                const industryLabels = item.industries
                  .map((id) => INDUSTRY_OPTIONS.find((opt) => opt.id === id)?.content[locale].name)
                  .filter(Boolean)
                  .join(' · ');
                const functionLabels = item.functions
                  .map((id) => FUNCTION_OPTIONS.find((opt) => opt.id === id)?.label[locale])
                  .filter(Boolean)
                  .join(' · ');

                return (
                  <article
                    key={item.id}
                    className="flex flex-col justify-between rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-6"
                  >
                    <div className="space-y-4">
                      <p className="text-xs font-medium text-[var(--nt-text-muted)]">
                        {industryLabels} <span aria-hidden="true">/</span> {functionLabels}
                      </p>

                      <h2 className="text-xl font-bold text-[var(--nt-text)]">{copy.title}</h2>

                      <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--nt-text-muted)]">
                          {t.pages.solutions.challengeLabel}
                        </h3>
                        <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                          {copy.challenge}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--nt-text-muted)]">
                          {t.pages.solutions.solutionLabel}
                        </h3>
                        <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                          {copy.solution}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--nt-text-muted)]">
                          {t.pages.solutions.outcomesLabel}
                        </h3>
                        <ul className="space-y-1.5 text-sm text-[var(--nt-text-secondary)]">
                          {copy.outcomes.map((outcome) => (
                            <li key={outcome} className="flex items-start gap-2">
                              <Check
                                className="h-4 w-4 mt-0.5 text-[#176BCE] dark:text-[#16C7D9] shrink-0"
                                aria-hidden="true"
                              />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[var(--nt-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-[var(--nt-text-muted)]">
                          {t.pages.solutions.relatedServicesLabel}
                        </p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold">
                          {item.relatedServiceSlugs.map((slug) => {
                            const srv = getServiceBySlug(slug);
                            if (!srv) return null;
                            return (
                              <Link
                                key={slug}
                                to={to(`${ROUTE_SEGMENTS.services}/${slug}`)}
                                className="text-[#176BCE] dark:text-[#16C7D9] hover:underline"
                              >
                                {srv.content[locale].shortTitle}
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <LinkButton
                        to={`${to(ROUTE_SEGMENTS.contact)}?service=${item.relatedServiceSlugs[0] || ''}`}
                        variant="outline"
                        size="sm"
                      >
                        <span>{t.pages.solutions.requestSolutionCta}</span>
                        <ArrowIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </LinkButton>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
