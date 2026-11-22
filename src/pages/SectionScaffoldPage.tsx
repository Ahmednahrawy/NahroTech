import {SeoHead} from '../components/SeoHead';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {LinkButton} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {useLocale} from '../i18n/LocaleContext';
import {LEGAL_SLUGS, LegalSlug, ROUTE_SEGMENTS} from '../utils/routes';

export type ScaffoldSection =
  | 'services'
  | 'solutions'
  | 'portfolio'
  | 'store'
  | 'insights'
  | 'about'
  | 'contact';

export function SectionScaffoldPage({section}: {section: ScaffoldSection}) {
  const {locale, t, to} = useLocale();
  const pageCopy = t.pages[section];

  return (
    <>
      <SeoHead
        title={pageCopy.title}
        description={pageCopy.description}
        locale={locale}
      />

      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <Breadcrumbs
            items={[
              {label: t.nav.home, to: to(ROUTE_SEGMENTS.home)},
              {label: t.nav[section]},
            ]}
          />

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
              {pageCopy.heading}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--nt-text-secondary)]">
              {pageCopy.subheading}
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-8 max-w-3xl space-y-4">
            <h2 className="text-lg font-bold text-[var(--nt-text)]">
              {t.pages.home.foundationNoticeTitle}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
              {pageCopy.description}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <LinkButton to={to(ROUTE_SEGMENTS.contact)} variant="primary" size="md">
                {t.actions.startProject}
              </LinkButton>
              <LinkButton to={to(ROUTE_SEGMENTS.home)} variant="outline" size="md">
                {t.actions.goHome}
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export function LegalScaffoldPage({slug}: {slug: LegalSlug}) {
  const {locale, t, to} = useLocale();
  const item = t.legal.items[slug] || t.legal.items[LEGAL_SLUGS[0]];

  return (
    <>
      <SeoHead
        title={`${item.title} — ${t.meta.siteName}`}
        description={item.summary}
        locale={locale}
      />

      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <Breadcrumbs
            items={[
              {label: t.nav.home, to: to(ROUTE_SEGMENTS.home)},
              {label: t.legal.sectionTitle},
              {label: item.title},
            ]}
          />

          <div className="max-w-3xl space-y-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
              {item.title}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--nt-text-secondary)]">
              {item.summary}
            </p>

            <div
              role="note"
              className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-warning-bg)] p-5 text-sm leading-relaxed text-[var(--nt-text)]"
            >
              {t.legal.reviewBanner}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
