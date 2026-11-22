import {useEffect} from 'react';
import {Link, Outlet, Route, Routes, useNavigate} from 'react-router-dom';
import {Layout} from './components/Layout';
import {Locale, siteConfig} from './config/site';
import {INSIGHT_SLUGS} from './content/insights';
import {PORTFOLIO_ITEMS} from './content/portfolio';
import {PRODUCTS} from './content/products';
import {SERVICES} from './content/services';
import {LocaleProvider} from './i18n/LocaleContext';
import {AboutPage} from './pages/AboutPage';
import {ArticleDetailPage} from './pages/ArticleDetailPage';
import {CaseStudyDetailPage} from './pages/CaseStudyDetailPage';
import {ContactPage} from './pages/ContactPage';
import {HomePage} from './pages/HomePage';
import {InsightsPage} from './pages/InsightsPage';
import {LegalPage} from './pages/LegalPage';
import {NotFoundPage} from './pages/NotFoundPage';
import {PortfolioPage} from './pages/PortfolioPage';
import {ProductDetailPage} from './pages/ProductDetailPage';
import {ServiceDetailPage} from './pages/ServiceDetailPage';
import {ServicesPage} from './pages/ServicesPage';
import {SolutionsPage} from './pages/SolutionsPage';
import {StorePage} from './pages/StorePage';
import {LEGAL_SLUGS, ROUTE_SEGMENTS, localePath} from './utils/routes';

export const STATIC_SUBPATHS: string[] = [
  '',
  ROUTE_SEGMENTS.services,
  ...SERVICES.map((s) => `${ROUTE_SEGMENTS.services}/${s.slug}`),
  ROUTE_SEGMENTS.solutions,
  ROUTE_SEGMENTS.portfolio,
  ...PORTFOLIO_ITEMS.map((item) => `${ROUTE_SEGMENTS.portfolio}/${item.slug}`),
  ROUTE_SEGMENTS.store,
  ...PRODUCTS.filter((p) => p.readyForSale).map((p) => `${ROUTE_SEGMENTS.store}/${p.slug}`),
  ROUTE_SEGMENTS.insights,
  ...INSIGHT_SLUGS.map((slug) => `${ROUTE_SEGMENTS.insights}/${slug}`),
  ROUTE_SEGMENTS.about,
  ROUTE_SEGMENTS.contact,
  ...LEGAL_SLUGS.map((slug) => `${ROUTE_SEGMENTS.legal}/${slug}`),
];

export const PRERENDER_ROUTES: string[] = siteConfig.supportedLocales.flatMap((locale) =>
  STATIC_SUBPATHS.map((subPath) => localePath(locale, subPath)),
);

function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    let targetLocale: Locale = siteConfig.defaultLocale;
    try {
      const saved = localStorage.getItem('nahrotech-locale');
      if (saved === 'ar' || saved === 'en') {
        targetLocale = saved;
      } else if (typeof navigator !== 'undefined' && navigator.language?.startsWith('ar')) {
        targetLocale = 'ar';
      }
    } catch {
      // Fallback to defaultLocale
    }
    navigate(localePath(targetLocale), {replace: true});
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--nt-bg)] p-6 text-center text-[var(--nt-text)]">
      <div className="space-y-4">
        <p className="text-lg font-bold">{siteConfig.brandName}</p>
        <div className="flex items-center justify-center gap-4 text-sm font-semibold text-[#176BCE]">
          <Link to={localePath('en')}>English</Link>
          <span aria-hidden="true">/</span>
          <Link to={localePath('ar')}>العربية</Link>
        </div>
      </div>
    </div>
  );
}

function LocalizedShell({locale}: {locale: Locale}) {
  return (
    <LocaleProvider forcedLocale={locale}>
      <Layout>
        <Outlet />
      </Layout>
    </LocaleProvider>
  );
}

function localeChildRoutes() {
  return (
    <>
      <Route index element={<HomePage />} />
      <Route path={ROUTE_SEGMENTS.services} element={<ServicesPage />} />
      <Route path={`${ROUTE_SEGMENTS.services}/:slug`} element={<ServiceDetailPage />} />
      <Route path={ROUTE_SEGMENTS.solutions} element={<SolutionsPage />} />
      <Route path={ROUTE_SEGMENTS.portfolio} element={<PortfolioPage />} />
      <Route path={`${ROUTE_SEGMENTS.portfolio}/:slug`} element={<CaseStudyDetailPage />} />
      <Route path={ROUTE_SEGMENTS.store} element={<StorePage />} />
      <Route path={`${ROUTE_SEGMENTS.store}/:slug`} element={<ProductDetailPage />} />
      <Route path={ROUTE_SEGMENTS.insights} element={<InsightsPage />} />
      <Route path={`${ROUTE_SEGMENTS.insights}/:slug`} element={<ArticleDetailPage />} />
      <Route path={ROUTE_SEGMENTS.about} element={<AboutPage />} />
      <Route path={ROUTE_SEGMENTS.contact} element={<ContactPage />} />
      <Route path={`${ROUTE_SEGMENTS.legal}/:slug`} element={<LegalPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route path="/en" element={<LocalizedShell locale="en" />}>
        {localeChildRoutes()}
      </Route>

      <Route path="/ar" element={<LocalizedShell locale="ar" />}>
        {localeChildRoutes()}
      </Route>

      <Route
        path="*"
        element={
          <LocaleProvider forcedLocale="en">
            <Layout>
              <NotFoundPage />
            </Layout>
          </LocaleProvider>
        }
      />
    </Routes>
  );
}
