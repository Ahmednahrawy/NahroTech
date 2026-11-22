import fs from 'fs';
import path from 'path';
import {pathToFileURL} from 'url';

interface PrerenderResult {
  html: string;
  head: {
    lang: 'en' | 'ar';
    dir: 'ltr' | 'rtl';
    tagsHtml: string;
  };
}

interface ServerEntryModule {
  render: (url: string) => PrerenderResult;
  PRERENDER_ROUTES: string[];
}

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, 'dist');
const ssrDir = path.resolve(rootDir, 'dist-ssr');
const templatePath = path.resolve(distDir, 'index.html');

function stripDefaultSeoTags(template: string): string {
  return template
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="description"[\s\S]*?\/>\s*/i, '')
    .replace(/<meta\s+property="og:title"[\s\S]*?\/>\s*/i, '')
    .replace(/<meta\s+property="og:description"[\s\S]*?\/>\s*/i, '')
    .replace(/<meta\s+property="og:type"[\s\S]*?\/>\s*/i, '')
    .replace(/<meta\s+property="og:site_name"[\s\S]*?\/>\s*/i, '')
    .replace(/<meta\s+name="twitter:card"[\s\S]*?\/>\s*/i, '');
}

function buildRootRedirectHtml(template: string, basePath: string, siteUrl: string): string {
  const cleanBase = basePath === '/' ? '' : basePath.replace(/\/+$/, '');
  const enPath = `${cleanBase}/en/`;
  const arPath = `${cleanBase}/ar/`;
  const enCanonical = `${siteUrl}${cleanBase}/en`;
  const arCanonical = `${siteUrl}${cleanBase}/ar`;

  const headTags = [
    `<title>NahrTech — Think Smart. Build Better.</title>`,
    `<meta name="description" content="NahrTech — Creative technology and business-solutions company. Choose English or Arabic." />`,
    `<link rel="canonical" href="${enCanonical}" />`,
    `<link rel="alternate" hreflang="en" href="${enCanonical}" />`,
    `<link rel="alternate" hreflang="ar" href="${arCanonical}" />`,
    `<link rel="alternate" hreflang="x-default" href="${enCanonical}" />`,
    `<meta http-equiv="refresh" content="0;url=${enPath}" />`,
    `<script>
      (function () {
        try {
          var saved = localStorage.getItem('nahrtech-locale');
          var lang = (saved === 'ar' || saved === 'en')
            ? saved
            : (navigator.language && navigator.language.indexOf('ar') === 0 ? 'ar' : 'en');
          window.location.replace(lang === 'ar' ? '${arPath}' : '${enPath}');
        } catch (e) {
          window.location.replace('${enPath}');
        }
      })();
    </script>`,
  ].join('\n    ');

  const bodyFallback = `
    <main style="min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:sans-serif;padding:2rem;text-align:center;">
      <div>
        <h1 style="font-size:1.5rem;font-weight:700;margin-bottom:0.75rem;">NahrTech</h1>
        <p style="margin-bottom:1rem;">Select your language / اختر اللغة</p>
        <p>
          <a href="${enPath}" style="margin-right:1rem;color:#176BCE;font-weight:600;">English</a>
          <a href="${arPath}" style="color:#176BCE;font-weight:600;">العربية</a>
        </p>
      </div>
    </main>
  `.trim();

  return stripDefaultSeoTags(template)
    .replace('<!--app-head-->', headTags)
    .replace('<!--app-html-->', bodyFallback);
}

function buildSitemapXml(routes: string[], siteUrl: string, basePath: string): string {
  const cleanBase = basePath === '/' ? '' : basePath.replace(/\/+$/, '');
  const now = new Date().toISOString().split('T')[0];

  const urls = routes
    .map((route) => {
      const loc = `${siteUrl}${cleanBase}${route}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobotsTxt(siteUrl: string, basePath: string): string {
  const cleanBase = basePath === '/' ? '' : basePath.replace(/\/+$/, '');
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}${cleanBase}/sitemap.xml\n`;
}

async function run() {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Missing client build template at ${templatePath}`);
  }

  const ssrEntryFiles = fs
    .readdirSync(ssrDir)
    .filter((f) => f.endsWith('.js') || f.endsWith('.mjs'));
  if (ssrEntryFiles.length === 0) {
    throw new Error(`No SSR entry bundle found in ${ssrDir}`);
  }

  const ssrEntryUrl = pathToFileURL(path.resolve(ssrDir, ssrEntryFiles[0])).href;
  const serverModule = (await import(ssrEntryUrl)) as ServerEntryModule;
  const rawTemplate = fs.readFileSync(templatePath, 'utf-8');
  const cleanTemplate = stripDefaultSeoTags(rawTemplate);

  const siteUrl = (process.env.VITE_SITE_URL || 'https://nahrtech.com').replace(/\/+$/, '');
  const basePath = process.env.VITE_BASE_PATH || '/';

  // Render every static route into dist/<route>/index.html
  for (const route of serverModule.PRERENDER_ROUTES) {
    const {html, head} = serverModule.render(route);
    const pageHtml = cleanTemplate
      .replace('<html lang="en" dir="ltr">', `<html lang="${head.lang}" dir="${head.dir}">`)
      .replace('<!--app-head-->', head.tagsHtml)
      .replace('<!--app-html-->', html);

    const routeRelative = route.replace(/^\/+/, '');
    const outDir = path.resolve(distDir, routeRelative);
    fs.mkdirSync(outDir, {recursive: true});
    fs.writeFileSync(path.join(outDir, 'index.html'), pageHtml, 'utf-8');
  }

  // Render 404.html for GitHub Pages fallback
  const notFoundRender = serverModule.render('/en/not-found');
  const notFoundHtml = cleanTemplate
    .replace(
      '<html lang="en" dir="ltr">',
      `<html lang="${notFoundRender.head.lang}" dir="${notFoundRender.head.dir}">`,
    )
    .replace('<!--app-head-->', notFoundRender.head.tagsHtml)
    .replace('<!--app-html-->', notFoundRender.html);
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

  // Render root index.html redirect & language chooser
  const rootHtml = buildRootRedirectHtml(rawTemplate, basePath, siteUrl);
  fs.writeFileSync(templatePath, rootHtml, 'utf-8');

  // Generate sitemap.xml & robots.txt
  fs.writeFileSync(
    path.join(distDir, 'sitemap.xml'),
    buildSitemapXml(serverModule.PRERENDER_ROUTES, siteUrl, basePath),
    'utf-8',
  );
  fs.writeFileSync(
    path.join(distDir, 'robots.txt'),
    buildRobotsTxt(siteUrl, basePath),
    'utf-8',
  );

  // Clean up temporary SSR output
  fs.rmSync(ssrDir, {recursive: true, force: true});

  console.log(
    `Prerendered ${serverModule.PRERENDER_ROUTES.length} static routes + 404.html + sitemap.xml + robots.txt`,
  );
}

run().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
