import {useEffect} from 'react';
import {Link, Outlet, Route, Routes, useNavigate} from 'react-router-dom';
import {Layout} from './components/Layout';
import {Locale, siteConfig} from './config/site';
import {SERVICES} from './content/services';
import {LocaleProvider} from './i18n/LocaleContext';
import {AboutPage} from './pages/AboutPage';
import {ContactPage} from './pages/ContactPage';
import {HomePage} from './pages/HomePage';
import {LegalPage} from './pages/LegalPage';
import {NotFoundPage} from './pages/NotFoundPage';
import {SectionScaffoldPage} from './pages/SectionScaffoldPage';
import {ServiceDetailPage} from './pages/ServiceDetailPage';
import {ServicesPage} from './pages/ServicesPage';
import {SolutionsPage} from './pages/SolutionsPage';
import {LEGAL_SLUGS, ROUTE_SEGMENTS, localePath} from './utils/routes';

export const STATIC_SUBPATHS: string[] = [
  '',
  ROUTE_SEGMENTS.services,
  ...SERVICES.map((s) => `${ROUTE_SEGMENTS.services}/${s.slug}`),
  ROUTE_SEGMENTS.solutions,
  ROUTE_SEGMENTS.portfolio,
  ROUTE_SEGMENTS.store,
  ROUTE_SEGMENTS.insights,
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
      <Route path={ROUTE_SEGMENTS.portfolio} element={<SectionScaffoldPage section="portfolio" />} />
      <Route path={ROUTE_SEGMENTS.store} element={<SectionScaffoldPage section="store" />} />
      <Route path={ROUTE_SEGMENTS.insights} element={<SectionScaffoldPage section="insights" />} />
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
