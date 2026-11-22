import {Locale} from '../config/site';
import {parseMarkdownDocument} from '../utils/markdown';

export interface InsightArticle {
  slug: string;
  locale: Locale;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
  imageAlt: string;
  relatedServiceSlug?: string;
  html: string;
}

const rawEnFiles = import.meta.glob('./insights/en/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const rawArFiles = import.meta.glob('./insights/ar/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function extractSlug(filePath: string): string {
  const filename = filePath.split('/').pop() || '';
  return filename.replace(/\.md$/, '');
}

function loadLocaleArticles(files: Record<string, string>, locale: Locale): InsightArticle[] {
  return Object.entries(files)
    .map(([filePath, raw]) => {
      const slug = extractSlug(filePath);
      const {frontmatter, html} = parseMarkdownDocument(raw);
      return {
        slug,
        locale,
        title: frontmatter.title || slug,
        summary: frontmatter.summary || '',
        category: frontmatter.category || (locale === 'ar' ? 'مقالات' : 'Insights'),
        publishedAt: frontmatter.publishedAt || '2026-11-01',
        readTime: frontmatter.readTime || (locale === 'ar' ? '4 دقائق' : '4 min read'),
        image: frontmatter.image || 'src/assets/images/digital_guide_studio_1795357660137.jpg',
        imageAlt: frontmatter.imageAlt || frontmatter.title || slug,
        relatedServiceSlug: frontmatter.relatedServiceSlug || undefined,
        html,
      };
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

const ARTICLES_BY_LOCALE: Record<Locale, InsightArticle[]> = {
  en: loadLocaleArticles(rawEnFiles, 'en'),
  ar: loadLocaleArticles(rawArFiles, 'ar'),
};

export function getInsightsByLocale(locale: Locale): InsightArticle[] {
  return ARTICLES_BY_LOCALE[locale];
}

export function getInsightBySlug(locale: Locale, slug?: string): InsightArticle | undefined {
  return ARTICLES_BY_LOCALE[locale].find((article) => article.slug === slug);
}

export const INSIGHT_SLUGS: string[] = ARTICLES_BY_LOCALE.en.map((a) => a.slug);
