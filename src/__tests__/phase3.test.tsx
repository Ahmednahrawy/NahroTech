import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import App from '../App';
import {INSIGHT_SLUGS} from '../content/insights';
import {PORTFOLIO_ITEMS} from '../content/portfolio';
import {PRODUCTS} from '../content/products';
import {PRERENDER_ROUTES} from '../routes';

describe('Phase 3 Business Presentation', () => {
  it('registers all Portfolio, Store Product, and Insight routes in PRERENDER_ROUTES for EN and AR', () => {
    for (const item of PORTFOLIO_ITEMS) {
      expect(PRERENDER_ROUTES).toContain(`/en/portfolio/${item.slug}`);
      expect(PRERENDER_ROUTES).toContain(`/ar/portfolio/${item.slug}`);
    }
    for (const product of PRODUCTS.filter((p) => p.readyForSale)) {
      expect(PRERENDER_ROUTES).toContain(`/en/store/${product.slug}`);
      expect(PRERENDER_ROUTES).toContain(`/ar/store/${product.slug}`);
    }
    for (const slug of INSIGHT_SLUGS) {
      expect(PRERENDER_ROUTES).toContain(`/en/insights/${slug}`);
      expect(PRERENDER_ROUTES).toContain(`/ar/insights/${slug}`);
    }
  });

  it('renders featured Portfolio, Digital Products, and Insights on the HomePage', () => {
    render(
      <MemoryRouter initialEntries={['/en']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {level: 2, name: /Featured portfolio & concept architectures/i}),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {level: 2, name: /Ready-made digital products/i}),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {level: 2, name: /Latest insights & practical guides/i}),
    ).toBeInTheDocument();
  });

  it('displays Portfolio Concept Demonstration notice and supports multi-filtering', () => {
    render(
      <MemoryRouter initialEntries={['/en/portfolio']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/Concept demonstrations and architectural blueprints built by NahroTech/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {name: /Retail Margin & Multi-Branch Stock BI Architecture/i}),
    ).toBeInTheDocument();

    // Filter by Wholesale & Distribution
    fireEvent.click(screen.getByRole('button', {name: 'Wholesale & Distribution'}));
    expect(
      screen.queryByRole('heading', {name: /Retail Margin & Multi-Branch Stock BI Architecture/i}),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', {name: /Wholesale Receivables, Credit Aging & Cash-Flow Workbook/i}),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Reset filters'}));
    expect(
      screen.getByRole('heading', {name: /Retail Margin & Multi-Branch Stock BI Architecture/i}),
    ).toBeInTheDocument();
  });

  it('renders the 5-part Case Study Detail page in Arabic RTL', () => {
    render(
      <MemoryRouter initialEntries={['/ar/portfolio/retail-margin-stock-bi-architecture']}>
        <App />
      </MemoryRouter>,
    );

    expect(document.documentElement.dir).toBe('rtl');
    expect(screen.getByRole('heading', {name: '1. مشكلة العمل'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: '2. المتطلبات'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: '3. الحل المقترح'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: '4. التنفيذ'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: '5. النتيجة وملاحظة النطاق'})).toBeInTheDocument();
  });

  it('renders Digital Store categories with manual MVP purchase flow and zero automated cart/checkout', () => {
    render(
      <MemoryRouter initialEntries={['/en/store']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/Direct MVP purchasing: Browse product specifications/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Add to cart/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Dashboards & Analytics'}));
    expect(
      screen.getByRole('heading', {name: /Executive Sales & Margin Power BI Starter Pack/i}),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', {name: /SME Inventory & Cash-Flow Control Workbook/i}),
    ).not.toBeInTheDocument();
  });

  it('renders Product Detail specifications, FAQs, and inquiry form link', () => {
    render(
      <MemoryRouter initialEntries={['/en/store/sme-cashflow-inventory-excel-kit']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {name: /SME Inventory & Cash-Flow Control Workbook/i}),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Compatibility'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Requirements'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'License Information'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Frequently Asked Questions'})).toBeInTheDocument();

    const inquiryLink = screen.getByRole('link', {name: /Request via Inquiry Form/i});
    expect(inquiryLink).toHaveAttribute(
      'href',
      '/en/contact?intent=product&product=sme-cashflow-inventory-excel-kit',
    );
  });

  it('renders Insights listing and parses bilingual Markdown articles cleanly', () => {
    render(
      <MemoryRouter initialEntries={['/ar/insights/clean-spreadsheet-architecture']}>
        <App />
      </MemoryRouter>,
    );

    expect(document.documentElement.dir).toBe('rtl');
    expect(
      screen.getByRole('heading', {level: 1, name: /لماذا تتعطل أغلب جداول الأعمال/i}),
    ).toBeInTheDocument();
    expect(document.querySelector('.nt-prose')).not.toBeNull();
  });

  it('renders visual work-example images with alt text on Services, ServiceDetail, Solutions, and Portfolio pages', () => {
    const servicesView = render(
      <MemoryRouter initialEntries={['/en/services']}>
        <App />
      </MemoryRouter>,
    );
    const serviceImages = servicesView.container.querySelectorAll('img');
    expect(serviceImages.length).toBeGreaterThanOrEqual(6);
    serviceImages.forEach((img) => {
      expect(img.getAttribute('src')).toBeTruthy();
      expect(img.getAttribute('alt')?.trim().length).toBeGreaterThan(10);
    });
    servicesView.unmount();

    const detailView = render(
      <MemoryRouter initialEntries={['/en/services/web-design-development']}>
        <App />
      </MemoryRouter>,
    );
    const detailImages = detailView.container.querySelectorAll('img');
    expect(detailImages.length).toBeGreaterThanOrEqual(2);
    expect(detailView.getByRole('heading', {name: 'Related Work Examples'})).toBeInTheDocument();
    detailView.unmount();

    const solutionsView = render(
      <MemoryRouter initialEntries={['/ar/solutions']}>
        <App />
      </MemoryRouter>,
    );
    expect(solutionsView.container.querySelectorAll('img').length).toBeGreaterThanOrEqual(6);
    solutionsView.unmount();

    expect(PORTFOLIO_ITEMS).toHaveLength(6);
  });

  it('opens and closes full-resolution LightboxModal previews on Portfolio and Case Study pages', () => {
    const {unmount} = render(
      <MemoryRouter initialEntries={['/en/portfolio/b2b-catalog-inquiry-web-portal']}>
        <App />
      </MemoryRouter>,
    );

    const expandBtn = screen.getByRole('button', {name: /Expand work example image/i});
    fireEvent.click(expandBtn);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: /Close image preview/i}));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    unmount();

    render(
      <MemoryRouter initialEntries={['/en/about']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByAltText(/Operations team reviewing structured workflow/i)).toBeInTheDocument();
  });
});
