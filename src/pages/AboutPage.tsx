import {ArrowLeft, ArrowRight} from 'lucide-react';
import {SeoHead} from '../components/SeoHead';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {LinkButton} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {ABOUT_CONTENT} from '../content/about';
import {useLocale} from '../i18n/LocaleContext';
import {ROUTE_SEGMENTS} from '../utils/routes';

export function AboutPage() {
  const {locale, dir, t, to} = useLocale();
  const content = ABOUT_CONTENT[locale];
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <>
      <SeoHead
        title={t.pages.about.title}
        description={t.pages.about.description}
        locale={locale}
      />

      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-surface)] py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              {label: t.nav.home, to: to(ROUTE_SEGMENTS.home)},
              {label: t.nav.about},
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold text-[#176BCE] dark:text-[#16C7D9]">
              {content.eyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
              {content.heading}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--nt-text-secondary)]">
              {content.lead}
            </p>
          </div>
        </Container>
      </section>

      {/* Three Pillars */}
      <section className="py-12 sm:py-16">
        <Container className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--nt-text)]">
            {content.pillarsTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {content.pillars.map((pillar) => (
              <div
                key={pillar.order}
                className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-3"
              >
                <p className="text-sm font-bold text-[#176BCE] dark:text-[#16C7D9] tabular-nums">
                  {pillar.order}
                </p>
                <h3 className="text-lg font-bold text-[var(--nt-text)]">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Target Audiences */}
      <section className="border-t border-[var(--nt-border)] bg-[var(--nt-surface)] py-12 sm:py-16">
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--nt-text)]">
              {content.audiencesTitle}
            </h2>
            <p className="text-base text-[var(--nt-text-secondary)]">{content.audiencesBody}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.audiences.map((aud) => (
              <div
                key={aud.title}
                className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-bg)] p-6 space-y-2.5"
              >
                <h3 className="text-base font-bold text-[var(--nt-text)]">{aud.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                  {aud.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Workflow */}
      <section className="border-t border-[var(--nt-border)] py-12 sm:py-16">
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--nt-text)]">
              {content.workflowTitle}
            </h2>
            <p className="text-base text-[var(--nt-text-secondary)]">{content.workflowBody}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.workflowSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 space-y-2.5"
              >
                <p className="text-xs font-bold text-[#176BCE] dark:text-[#16C7D9] tabular-nums">
                  {step.step}
                </p>
                <h3 className="text-base font-bold text-[var(--nt-text)]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Engagement Models */}
      <section className="border-t border-[var(--nt-border)] bg-[var(--nt-surface)] py-12 sm:py-16">
        <Container className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--nt-text)]">
            {content.engagementTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {content.engagementModels.map((model) => {
              const target =
                model.actionType === 'store'
                  ? to(ROUTE_SEGMENTS.store)
                  : model.actionType === 'consultation'
                    ? `${to(ROUTE_SEGMENTS.contact)}?intent=consultation`
                    : to(ROUTE_SEGMENTS.contact);

              return (
                <div
                  key={model.title}
                  className="flex flex-col justify-between rounded-xl border border-[var(--nt-border)] bg-[var(--nt-bg)] p-6 space-y-5"
                >
                  <div className="space-y-2.5">
                    <h3 className="text-lg font-bold text-[var(--nt-text)]">{model.title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                      {model.description}
                    </p>
                  </div>
                  <div>
                    <LinkButton
                      to={target}
                      variant={model.actionType === 'project' ? 'primary' : 'outline'}
                      size="md"
                    >
                      <span>{model.actionLabel}</span>
                      <ArrowIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </LinkButton>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
