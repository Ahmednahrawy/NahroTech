import {siteConfig} from '../config/site';

export interface ProjectInquiryPayload {
  name: string;
  email: string;
  company?: string;
  service: string;
  description: string;
  budget?: string;
  intent?: 'project' | 'consultation' | 'product';
  locale: 'en' | 'ar';
  honeypot?: string;
}

export interface ContactSubmissionResult {
  ok: boolean;
  reason?: 'not_configured' | 'spam_detected' | 'provider_rejected' | 'network_error';
  message?: string;
}

export interface ContactProvider {
  isConfigured: () => boolean;
  submitInquiry: (payload: ProjectInquiryPayload) => Promise<ContactSubmissionResult>;
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export const web3FormsContactProvider: ContactProvider = {
  isConfigured() {
    return Boolean(siteConfig.web3formsKey);
  },

  async submitInquiry(payload: ProjectInquiryPayload): Promise<ContactSubmissionResult> {
    if (payload.honeypot && payload.honeypot.trim().length > 0) {
      return {ok: false, reason: 'spam_detected'};
    }

    if (!siteConfig.web3formsKey) {
      return {ok: false, reason: 'not_configured'};
    }

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: siteConfig.web3formsKey,
          subject: `[NahroTech ${payload.intent || 'project'}] Inquiry from ${payload.name}`,
          from_name: payload.name,
          email: payload.email,
          company: payload.company || 'Not specified',
          service_required: payload.service,
          budget_range: payload.budget || 'Not specified',
          intent: payload.intent || 'project',
          locale: payload.locale,
          message: payload.description,
          botcheck: '',
        }),
      });

      const data = (await response.json()) as {success?: boolean; message?: string};
      if (response.ok && data.success === true) {
        return {ok: true, message: data.message};
      }

      return {
        ok: false,
        reason: 'provider_rejected',
        message: data.message,
      };
    } catch {
      return {
        ok: false,
        reason: 'network_error',
      };
    }
  },
};
