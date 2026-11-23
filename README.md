# NahroTech | نحروتك — Official Website (MVP)

**Slogan:** Think Smart. Build Better. · فكّر بذكاء. ابنِ بجودة أفضل.

Official bilingual (English LTR / Arabic RTL) static-first website for **NahroTech** (**نحروتك**), built with React 19, TypeScript, Vite 8, and Tailwind CSS v4, and configured for static prerendered deployment on **GitHub Pages**.

---

## Architecture Overview

- **Bilingual Localized Routing:** `/en/...` (LTR, `Plus Jakarta Sans`) and `/ar/...` (RTL, `IBM Plex Sans Arabic`), with language preference detection at `/`.
- **Static Site Prerendering (`scripts/prerender.ts`):** Every route renders at build time via `vite build --ssr src/entry-server.tsx` into `dist/<route>/index.html`, accompanied by `dist/404.html`, `dist/sitemap.xml`, `dist/robots.txt`, and `.nojekyll`.
- **Core Pages & Modules:**
  - **Home (`/en`, `/ar`):** Value positioning, 6 connected service categories, priority industries, 3 engagement models, featured portfolio architectures, featured digital products, and latest insights.
  - **Services (`/services`, `/services/:slug`):** Data & BI, Excel Solutions & Automation, Business Management Solutions, Web Design & Development, Mobile App Development, and AI & Digital Automation.
  - **Solutions (`/solutions`):** Interactive filtering across Priority Industries, Business Functions, and Business Sizes.
  - **Portfolio (`/portfolio`, `/portfolio/:slug`):** Labeled **Concept Demonstrations** with multi-filter support (Industry, Service, Technology) and 5-part case studies.
  - **Digital Store (`/store`, `/store/:slug`):** Ready-made templates, Power BI packs, management tools, web starter kits, and guides using direct MVP manual ordering (Inquiry Form / WhatsApp) with no automated checkout.
  - **Insights (`/insights`, `/insights/:slug`):** Bilingual Markdown-driven articles with frontmatter, topic filtering, and `Article` structured data.
  - **About, Contact & Legal (`/about`, `/contact`, `/legal/:slug`):** Interactive inquiry/consultation/product form wired to Web3Forms, plus draft policies ready for jurisdiction review.

---

## Environment Variables

Configure public build-time configuration in `.env` (for local testing) or in **GitHub Repository Variables** (`Settings → Secrets and variables → Actions → Variables`):

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_BASE_PATH` | Base subpath for assets & links (`/` for custom domains, `/<repo>/` for GitHub Pages project sites). | `/` or `/nahrotech/` |
| `VITE_SITE_URL` | Canonical origin without trailing slash (used for `canonical`, `hreflang`, OpenGraph, `sitemap.xml`, and `robots.txt`). | `https://nahrotech.com` |
| `VITE_WEB3FORMS_KEY` | Public Web3Forms access key for `/contact` inquiries. | `your-public-key` |
| `VITE_WHATSAPP_NUMBER` | Digits-only international WhatsApp number. Contextual WhatsApp buttons and the floating launcher appear only when configured. | `971500000000` |
| `VITE_CONTACT_EMAIL` | Public business email address shown on Contact & Footer. | `contact@nahrotech.com` |
| `VITE_GA4_ID` | Google Analytics 4 Measurement ID (`G-...`). Loaded only after explicit visitor consent. | `G-XXXXXXXXXX` |
| `VITE_MEDIA_CDN_URL` | Optional external media base URL for images. | `""` |

> **Security Note:** Never store private API secrets, database credentials, or backend tokens in `VITE_*` variables. All `VITE_*` values are embedded in public client bundles.

### Web3Forms Domain Security
In your Web3Forms dashboard, enable **Allowed Domains / Domain Restriction** and restrict submissions to your production origin (e.g., `nahrotech.com` and/or `<username>.github.io`). Never claim form delivery success unless the provider API returns confirmation.

---

## Local Development & Verification

Install dependencies:
```bash
npm install --legacy-peer-deps
```

Run local development server (port `3000`):
```bash
npm run dev
```

Run TypeScript type checking:
```bash
npm run lint
```

Run automated Vitest suite (routing, bilingual rendering, filtering, forms, Markdown insights, consent & GA4 tracking, SEO metadata):
```bash
npm run test:run
```

Build and prerender static output into `dist/`:
```bash
npm run build
```

Test GitHub Pages subpath deployment locally:
```bash
VITE_BASE_PATH="/nahrotech/" VITE_SITE_URL="https://example.github.io" npm run build
```

---

## Deploying to GitHub Pages

The repository includes `.github/workflows/deploy.yml`, which automatically lints, tests, builds, prerenders, creates `.nojekyll`, and deploys `./dist` to GitHub Pages on pushes to `main`.

1. Push the repository to GitHub with `main` as the deployment branch.
2. Open **Settings → Pages** in your GitHub repository and set **Source** to **GitHub Actions**.
3. Open **Settings → Secrets and variables → Actions → Variables** and configure any public `VITE_*` variables (`VITE_WEB3FORMS_KEY`, `VITE_WHATSAPP_NUMBER`, `VITE_CONTACT_EMAIL`, `VITE_GA4_ID`).
   - If using the default `<username>.github.io/<repo>` URL, `.github/workflows/deploy.yml` automatically derives `VITE_BASE_PATH` and `VITE_SITE_URL` from `actions/configure-pages@v5` unless overridden.
4. Trigger or push to `main` to deploy.

### Custom Domain Setup (`nahrotech.com`)
When switching to a custom domain:
1. Point your DNS records (`A` / `ALIAS` / `CNAME`) to GitHub Pages according to GitHub's custom domain instructions and enter your domain in **Settings → Pages → Custom domain**.
2. Set GitHub Actions Repository Variables:
   - `VITE_BASE_PATH=/`
   - `VITE_SITE_URL=https://nahrotech.com`
3. Restrict your Web3Forms access key to your custom domain and re-run the deployment workflow.
