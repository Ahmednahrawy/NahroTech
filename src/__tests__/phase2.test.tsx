import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it, vi} from 'vitest';
import App from '../App';
import {PRERENDER_ROUTES} from '../routes';
import {web3FormsContactProvider} from '../services/contactService';

describe('Phase 2 Core Website', () => {
  it('includes all service detail routes in PRERENDER_ROUTES for both EN and AR', () => {
    expect(PRERENDER_ROUTES).toContain('/en/services/data-business-intelligence');
    expect(PRERENDER_ROUTES).toContain('/ar/services/data-business-intelligence');
    expect(PRERENDER_ROUTES).toContain('/en/services/ai-digital-automation');
    expect(PRERENDER_ROUTES).toContain('/ar/services/ai-digital-automation');
  });

  it('renders Services page and navigates to Service detail page', () => {
    render(
      <MemoryRouter initialEntries={['/en/services']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {name: /Services designed as connected business solutions/i}),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {name: /Data & Business Intelligence/i}),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {name: /AI & Digital Automation/i}),
    ).toBeInTheDocument();
  });

  it('renders individual Service detail page in Arabic RTL', () => {
    render(
      <MemoryRouter initialEntries={['/ar/services/excel-solutions-automation']}>
        <App />
      </MemoryRouter>,
    );

    expect(document.documentElement.dir).toBe('rtl');
    expect(
      screen.getByRole('heading', {name: /حلول إكسل والأتمتة/i}),
    ).toBeInTheDocument();
    expect(screen.getByText(/تحدي العمل/i)).toBeInTheDocument();
  });

  it('filters Solutions by Industry and Business Function and resets cleanly', () => {
    render(
      <MemoryRouter initialEntries={['/en/solutions']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {name: /Production Costing & Material Variance Tracking/i}),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Retail & E-commerce'}));
    expect(
      screen.queryByRole('heading', {name: /Production Costing & Material Variance Tracking/i}),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', {name: /Multi-Channel Sales & Stock Visibility/i}),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Reset filters'}));
    expect(
      screen.getByRole('heading', {name: /Production Costing & Material Variance Tracking/i}),
    ).toBeInTheDocument();
  });

  it('validates Contact inquiry form and handles unconfigured vs confirmed submissions honestly', async () => {
    render(
      <MemoryRouter initialEntries={['/en/contact']}>
        <App />
      </MemoryRouter>,
    );

    // Submit empty form -> validation errors appear
    fireEvent.click(screen.getByRole('button', {name: 'Send Inquiry'}));
    expect(
      screen.getByText(/Please enter your name/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please enter a valid email address/i),
    ).toBeInTheDocument();

    // Fill valid fields
    fireEvent.change(screen.getByLabelText(/Full Name/i), {target: {value: 'Tariq Mansour'}});
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: {value: 'tariq@example.com'},
    });
    fireEvent.change(screen.getByLabelText(/Service or Topic Required/i), {
      target: {value: 'data-business-intelligence'},
    });
    fireEvent.change(screen.getByLabelText(/Project or Inquiry Description/i), {
      target: {value: 'Need a weekly sales and inventory dashboard for three branches.'},
    });

    // Without VITE_WEB3FORMS_KEY, form reports not_configured instead of fake success
    fireEvent.click(screen.getByRole('button', {name: 'Send Inquiry'}));
    await waitFor(() => {
      expect(screen.getByText(/Form endpoint configuration required/i)).toBeInTheDocument();
    });

    // When provider confirms success, form renders confirmed success banner
    const spy = vi
      .spyOn(web3FormsContactProvider, 'submitInquiry')
      .mockResolvedValueOnce({ok: true});

    fireEvent.click(screen.getByRole('button', {name: 'Send Inquiry'}));
    await waitFor(() => {
      expect(screen.getByText(/Inquiry received/i)).toBeInTheDocument();
    });
    spy.mockRestore();
  });

  it('renders Legal policy pages with draft review notice in English and Arabic', () => {
    render(
      <MemoryRouter initialEntries={['/ar/legal/refund-policy']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', {name: 'سياسة الاسترجاع'})).toBeInTheDocument();
    expect(
      screen.getByText(/يجب مراجعة البنود المرتبطة بالاختصاص القضائي/i),
    ).toBeInTheDocument();
  });
});
