import {Link, useParams} from 'react-router-dom';
import {SeoHead} from '../components/SeoHead';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {Container} from '../components/ui/Container';
import {siteConfig} from '../config/site';
import {LEGAL_DOCUMENTS} from '../content/legal';
import {useLocale} from '../i18n/LocaleContext';
import {cn} from '../utils/cn';
import {LEGAL_SLUGS, LegalSlug, ROUTE_SEGMENTS} from '../utils/routes';
import {NotFoundPage} from './NotFoundPage';

export function LegalPage() {
  const {slug} = useParams<{slug: string}>();
  const {locale, t, to} = useLocale();

  const isKnown = LEGAL_SLUGS.includes(slug as LegalSlug);
  if (!isKnown) {
    return <NotFoundPage />;
  }

  const activeSlug = slug as LegalSlug;
  const doc = LEGAL_DOCUMENTS[activeSlug][locale];

  return (
    <>
      <SeoHead
        title={`${doc.title} — ${siteConfig.brandName}`}
        description={doc.summary}
        locale={locale}
      />

      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-surface)] py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              {label: t.nav.home, to: to(ROUTE_SEGMENTS.home)},
              {label: t.legal.sectionTitle},
              {label: doc.title},
            ]}
          />

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
              {doc.title}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--nt-text-secondary)]">
              {doc.summary}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <article className="lg:col-span-8 space-y-8">
              <div
                role="note"
                className="rounded-xl border border-[var(--nt-warning)]/40 bg-[var(--nt-warning-bg)] p-5 text-sm leading-relaxed text-[var(--nt-text)] space-y-1"
              >
                <p className="font-bold">{doc.effectiveNote}</p>
                <p>{t.legal.reviewBanner}</p>
              </div>

              <div className="space-y-8">
                {doc.sections.map((section) => (
                  <section key={section.heading} className="space-y-3">
                    <h2 className="text-xl font-bold text-[var(--nt-text)]">{section.heading}</h2>
                    {section.body.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-sm sm:text-base leading-relaxed text-[var(--nt-text-secondary)]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))}
              </div>
            </article>

            <aside className="lg:col-span-4 rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 space-y-4">
              <h2 className="text-sm font-bold text-[var(--nt-text)]">
                {t.legal.allPoliciesLabel}
              </h2>
              <nav aria-label={t.legal.allPoliciesLabel}>
                <ul className="space-y-1.5 text-sm">
                  {LEGAL_SLUGS.map((itemSlug) => {
                    const isActive = itemSlug === activeSlug;
                    return (
                      <li key={itemSlug}>
                        <Link
                          to={to(`${ROUTE_SEGMENTS.legal}/${itemSlug}`)}
                          className={cn(
                            'block rounded-lg px-3 py-2 transition-colors',
                            isActive
                              ? 'bg-[var(--nt-surface-elevated)] font-semibold text-[#176BCE] dark:text-[#16C7D9]'
                              : 'text-[var(--nt-text-secondary)] hover:bg-[var(--nt-surface-elevated)] hover:text-[var(--nt-text)]',
                          )}
                        >
                          {t.legal.items[itemSlug].title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
