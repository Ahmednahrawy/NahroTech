import {AlertCircle, CheckCircle2, Mail, MessageSquare} from 'lucide-react';
import React, {useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {SeoHead} from '../components/SeoHead';
import {Breadcrumbs} from '../components/ui/Breadcrumbs';
import {Button} from '../components/ui/Button';
import {Container} from '../components/ui/Container';
import {buildWhatsAppUrl, siteConfig} from '../config/site';
import {SERVICES} from '../content/services';
import {useLocale} from '../i18n/LocaleContext';
import {trackInquirySubmitted, trackWhatsAppClick} from '../services/analytics';
import {web3FormsContactProvider} from '../services/contactService';
import {cn} from '../utils/cn';
import {ROUTE_SEGMENTS} from '../utils/routes';

type InquiryIntent = 'project' | 'consultation' | 'product';

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  description?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactPage() {
  const {locale, t, to} = useLocale();
  const [searchParams] = useSearchParams();

  const initialIntentParam = searchParams.get('intent');
  const initialIntent: InquiryIntent =
    initialIntentParam === 'consultation' || initialIntentParam === 'product'
      ? initialIntentParam
      : 'project';

  const initialServiceParam = searchParams.get('service') || '';
  const initialProductParam = searchParams.get('product') || '';

  const [intent, setIntent] = useState<InquiryIntent>(initialIntent);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(
    initialProductParam ? `product:${initialProductParam}` : initialServiceParam,
  );
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState(
    initialProductParam
      ? locale === 'ar'
        ? `أرغب في الاستفسار عن المنتج الرقمي: ${initialProductParam}`
        : `I would like to inquire about the digital product: ${initialProductParam}`
      : '',
  );
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'not_configured' | 'error'
  >('idle');
  const [errorDetail, setErrorDetail] = useState('');

  const serviceOptions = useMemo(() => {
    const items = SERVICES.map((s) => ({
      value: s.slug,
      label: s.content[locale].title,
    }));
    items.push({
      value: 'consultation-general',
      label: t.pages.contact.intentLabels.consultation,
    });
    items.push({
      value: 'digital-product-inquiry',
      label: t.pages.contact.intentLabels.product,
    });
    if (initialProductParam) {
      items.unshift({
        value: `product:${initialProductParam}`,
        label: `${t.pages.contact.intentLabels.product}: ${initialProductParam}`,
      });
    }
    return items;
  }, [locale, t, initialProductParam]);

  const selectedServiceLabel =
    serviceOptions.find((opt) => opt.value === service)?.label || service || t.pages.contact.intentLabels[intent];

  const whatsappMessage =
    locale === 'ar'
      ? `مرحباً نحروتك، أود التواصل بخصوص: ${selectedServiceLabel}`
      : `Hello NahroTech, I would like to inquire regarding: ${selectedServiceLabel}`;
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (name.trim().length < 2) {
      next.name = t.pages.contact.form.validation.nameRequired;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      next.email = t.pages.contact.form.validation.emailInvalid;
    }
    if (!service.trim()) {
      next.service = t.pages.contact.form.validation.serviceRequired;
    }
    if (description.trim().length < 15) {
      next.description = t.pages.contact.form.validation.descriptionMin;
    }
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('submitting');
    setErrorDetail('');

    const result = await web3FormsContactProvider.submitInquiry({
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || undefined,
      service: selectedServiceLabel,
      description: description.trim(),
      budget: budget || undefined,
      intent,
      locale,
      honeypot,
    });

    if (result.ok) {
      setStatus('success');
      trackInquirySubmitted(intent, service || 'general', locale);
      return;
    }

    if (result.reason === 'not_configured') {
      setStatus('not_configured');
      return;
    }

    setStatus('error');
    setErrorDetail(
      result.reason === 'network_error'
        ? t.pages.contact.form.errorNetwork
        : result.message || t.pages.contact.form.errorRejected,
    );
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setCompany('');
    setDescription('');
    setBudget('');
    setErrors({});
    setStatus('idle');
    setErrorDetail('');
  };

  const inputBaseClass =
    'w-full rounded-lg border border-[var(--nt-border-strong)] bg-[var(--nt-bg)] px-4 py-2.5 text-sm text-[var(--nt-text)] placeholder:text-[var(--nt-text-muted)] focus:border-[#176BCE] focus:outline-none';

  return (
    <>
      <SeoHead
        title={t.pages.contact.title}
        description={t.pages.contact.description}
        locale={locale}
      />

      <section className="border-b border-[var(--nt-border)] bg-[var(--nt-surface)] py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              {label: t.nav.home, to: to(ROUTE_SEGMENTS.home)},
              {label: t.nav.contact},
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--nt-text)]">
              {t.pages.contact.heading}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--nt-text-secondary)]">
              {t.pages.contact.subheading}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Project Inquiry Form */}
            <div className="lg:col-span-7 rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--nt-text)]">
                  {t.pages.contact.form.title}
                </h2>

                {/* Intent Tabs */}
                <div className="flex flex-wrap gap-2">
                  {(['project', 'consultation', 'product'] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setIntent(item)}
                      className={cn(
                        'min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border',
                        intent === item
                          ? 'bg-[#176BCE] text-white border-[#176BCE]'
                          : 'bg-[var(--nt-bg)] text-[var(--nt-text-secondary)] border-[var(--nt-border)] hover:text-[var(--nt-text)]',
                      )}
                    >
                      {t.pages.contact.intentLabels[item]}
                    </button>
                  ))}
                </div>
              </div>

              {status === 'success' ? (
                <div
                  role="status"
                  className="rounded-xl border border-[var(--nt-success)]/30 bg-[var(--nt-success-bg)] p-6 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="h-5 w-5 text-[var(--nt-success)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-[var(--nt-text)]">
                        {t.pages.contact.form.successTitle}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                        {t.pages.contact.form.successBody}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={resetForm}>
                    {t.pages.contact.form.submitAnother}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot anti-spam field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="nt-website">Website</label>
                    <input
                      id="nt-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-[var(--nt-text)]"
                      >
                        {t.pages.contact.form.nameLabel} *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.pages.contact.form.namePlaceholder}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={inputBaseClass}
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="text-xs font-medium text-[var(--nt-error)]">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-[var(--nt-text)]"
                      >
                        {t.pages.contact.form.emailLabel} *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.pages.contact.form.emailPlaceholder}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={inputBaseClass}
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="text-xs font-medium text-[var(--nt-error)]">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-semibold text-[var(--nt-text)]"
                      >
                        {t.pages.contact.form.companyLabel}{' '}
                        <span className="font-normal text-[var(--nt-text-muted)]">
                          {t.pages.contact.form.optionalTag}
                        </span>
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={t.pages.contact.form.companyPlaceholder}
                        className={inputBaseClass}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-budget"
                        className="block text-xs font-semibold text-[var(--nt-text)]"
                      >
                        {t.pages.contact.form.budgetLabel}{' '}
                        <span className="font-normal text-[var(--nt-text-muted)]">
                          {t.pages.contact.form.optionalTag}
                        </span>
                      </label>
                      <select
                        id="contact-budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className={inputBaseClass}
                      >
                        <option value="">{t.pages.contact.form.optionalTag}</option>
                        {t.pages.contact.form.budgetOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-service"
                      className="block text-xs font-semibold text-[var(--nt-text)]"
                    >
                      {t.pages.contact.form.serviceLabel} *
                    </label>
                    <select
                      id="contact-service"
                      required
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={errors.service ? 'contact-service-error' : undefined}
                      className={inputBaseClass}
                    >
                      <option value="">{t.pages.contact.form.servicePlaceholder}</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p id="contact-service-error" className="text-xs font-medium text-[var(--nt-error)]">
                        {errors.service}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-description"
                      className="block text-xs font-semibold text-[var(--nt-text)]"
                    >
                      {t.pages.contact.form.descriptionLabel} *
                    </label>
                    <textarea
                      id="contact-description"
                      required
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t.pages.contact.form.descriptionPlaceholder}
                      aria-invalid={Boolean(errors.description)}
                      aria-describedby={errors.description ? 'contact-description-error' : undefined}
                      className={inputBaseClass}
                    />
                    {errors.description && (
                      <p
                        id="contact-description-error"
                        className="text-xs font-medium text-[var(--nt-error)]"
                      >
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {status === 'not_configured' && (
                    <div
                      role="alert"
                      className="rounded-lg border border-[var(--nt-warning)]/40 bg-[var(--nt-warning-bg)] p-4 flex items-start gap-3 text-xs leading-relaxed text-[var(--nt-text)]"
                    >
                      <AlertCircle
                        className="h-4.5 w-4.5 text-[var(--nt-warning)] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div className="space-y-1">
                        <p className="font-bold">{t.pages.contact.form.notConfiguredTitle}</p>
                        <p>{t.pages.contact.form.notConfiguredBody}</p>
                      </div>
                    </div>
                  )}

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="rounded-lg border border-[var(--nt-error)]/40 bg-[var(--nt-error-bg)] p-4 flex items-start gap-3 text-xs leading-relaxed text-[var(--nt-text)]"
                    >
                      <AlertCircle
                        className="h-4.5 w-4.5 text-[var(--nt-error)] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div className="space-y-1">
                        <p className="font-bold">{t.pages.contact.form.errorTitle}</p>
                        <p>{errorDetail}</p>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting'
                      ? t.pages.contact.form.submittingLabel
                      : t.pages.contact.form.submitLabel}
                  </Button>
                </form>
              )}
            </div>

            {/* Direct Channels */}
            <aside className="lg:col-span-5 space-y-5">
              <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-3">
                <h2 className="text-lg font-bold text-[var(--nt-text)]">
                  {t.pages.contact.directChannelsTitle}
                </h2>
                <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                  {t.pages.contact.directChannelsBody}
                </p>
              </div>

              <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-3">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="h-5 w-5 text-[#16C7D9] shrink-0" aria-hidden="true" />
                  <h3 className="text-base font-bold text-[var(--nt-text)]">
                    {t.pages.contact.whatsappTitle}
                  </h3>
                </div>
                {whatsappUrl ? (
                  <>
                    <p className="text-sm leading-relaxed text-[var(--nt-text-secondary)]">
                      {t.pages.contact.whatsappAvailableBody}
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick('contact_sidebar', intent, locale)}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#101B35] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1A2B52] dark:bg-[#16C7D9] dark:text-[#091122] transition-colors"
                    >
                      {t.actions.chatWhatsApp}
                    </a>
                  </>
                ) : (
                  <p className="text-xs leading-relaxed text-[var(--nt-text-muted)]">
                    {t.pages.contact.whatsappUnavailableBody}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 sm:p-7 space-y-3">
                <div className="flex items-center gap-2.5">
                  <Mail
                    className="h-5 w-5 text-[#176BCE] dark:text-[#16C7D9] shrink-0"
                    aria-hidden="true"
                  />
                  <h3 className="text-base font-bold text-[var(--nt-text)]">
                    {t.pages.contact.emailTitle}
                  </h3>
                </div>
                {siteConfig.contactEmail ? (
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="inline-flex text-sm font-semibold text-[#176BCE] dark:text-[#16C7D9] hover:underline break-all"
                  >
                    {siteConfig.contactEmail}
                  </a>
                ) : (
                  <p className="text-xs leading-relaxed text-[var(--nt-text-muted)]">
                    {t.pages.contact.emailUnavailableBody}
                  </p>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
