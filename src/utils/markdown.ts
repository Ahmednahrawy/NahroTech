import {marked} from 'marked';

export interface ParsedMarkdown {
  frontmatter: Record<string, string>;
  html: string;
}

export function parseMarkdownDocument(raw: string): ParsedMarkdown {
  const normalized = raw.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    return {
      frontmatter: {},
      html: marked.parse(normalized, {async: false}),
    };
  }

  const [, yamlBlock, body] = match;
  const frontmatter: Record<string, string> = {};

  for (const line of yamlBlock.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key) {
      frontmatter[key] = value;
    }
  }

  return {
    frontmatter,
    html: marked.parse(body.trim(), {async: false}),
  };
}
