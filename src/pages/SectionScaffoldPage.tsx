import {SeoHead} from '../components/SeoHead';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {LinkButton} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {useLocale} from '../i18n/LocaleContext';
import {ROUTE_SEGMENTS} from '../utils/routes';

export type ScaffoldSection = 'portfolio' | 'store' | 'insights';

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
            <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
              {pageCopy.description}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <LinkButton to={to(ROUTE_SEGMENTS.contact)} variant="primary" size="md">
                {t.actions.startProject}
              </LinkButton>
              <LinkButton to={to(ROUTE_SEGMENTS.services)} variant="outline" size="md">
                {t.actions.viewServices}
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
