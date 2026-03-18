/**
 * Gera PDFs dos posts do blog Alfarrábios do Adi.
 *
 * - livro-completo.pdf  → todos os textos em ordem cronológica
 * - posts/<slug>.pdf    → um PDF por post
 *
 * Uso: node scripts/generate-pdfs.mjs
 */

import { mdToPdf } from 'md-to-pdf';
import matter from 'gray-matter';
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── Caminhos ──

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const BLOG_DIR = join(ROOT, 'src/content/blog');
const FONTS_DIR = join(ROOT, 'public/fonts');
const STYLE_PATH = join(ROOT, 'scripts/pdf-style.css');
const OUTPUT_DIR = join(ROOT, 'public/pdfs');
const POSTS_DIR = join(OUTPUT_DIR, 'posts');

// ── Fontes ──

const FONT_FACES = [
  ['Playfair Display', 600, 'playfair-display-latin-600-normal.woff2'],
  ['Playfair Display', 600, 'playfair-display-latin-ext-600-normal.woff2'],
  ['Playfair Display', 700, 'playfair-display-latin-700-normal.woff2'],
  ['Playfair Display', 700, 'playfair-display-latin-ext-700-normal.woff2'],
  ['Playfair Display', 900, 'playfair-display-latin-900-normal.woff2'],
  ['Playfair Display', 900, 'playfair-display-latin-ext-900-normal.woff2'],
  ['Source Serif 4', 400, 'source-serif-4-latin-400-normal.woff2'],
  ['Source Serif 4', 400, 'source-serif-4-latin-ext-400-normal.woff2'],
  ['Source Serif 4', 600, 'source-serif-4-latin-600-normal.woff2'],
  ['Source Serif 4', 600, 'source-serif-4-latin-ext-600-normal.woff2'],
  ['Source Serif 4', 700, 'source-serif-4-latin-700-normal.woff2'],
  ['Source Serif 4', 700, 'source-serif-4-latin-ext-700-normal.woff2'],
  ['Source Sans 3', 400, 'source-sans-3-latin-400-normal.woff2'],
  ['Source Sans 3', 400, 'source-sans-3-latin-ext-400-normal.woff2'],
  ['Source Sans 3', 500, 'source-sans-3-latin-500-normal.woff2'],
  ['Source Sans 3', 500, 'source-sans-3-latin-ext-500-normal.woff2'],
  ['Source Sans 3', 600, 'source-sans-3-latin-600-normal.woff2'],
  ['Source Sans 3', 600, 'source-sans-3-latin-ext-600-normal.woff2'],
];

function buildFontFaceCss() {
  return FONT_FACES.map(
    ([family, weight, file]) =>
      `@font-face {
  font-family: '${family}';
  font-style: normal;
  font-weight: ${weight};
  src: url('file://${join(FONTS_DIR, file)}') format('woff2');
}`
  ).join('
');
}

// ── Helpers ──

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function readPosts() {
  const files = readdirSync(BLOG_DIR).filter(
    (f) => f.endsWith('.md') || f.endsWith('.mdx')
  );

  return files
    .map((file) => {
      const raw = readFileSync(join(BLOG_DIR, file), 'utf-8');
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx?$/, '');
      return { slug, data, content };
    })
    .filter((p) => !p.data.draft)
    .sort((a, b) => {
    // marco-zero sempre primeiro (introdução do livro)
    if (a.slug === 'marco-zero') return -1;
    if (b.slug === 'marco-zero') return 1;
    return new Date(a.data.pubDate) - new Date(b.data.pubDate);
  });
}

function postHeader(post) {
  const date = formatDate(post.data.pubDate);
  const place = post.data.placeLabel ? ` — ${post.data.placeLabel}` : '';
  return `# ${post.data.title}

<p class="post-meta">${date}${place}</p>

---

`;
}

// ── Opções do md-to-pdf ──

function pdfOptions(css) {
  return {
    css,
    body_class: [],
    pdf_options: {
      width: '6in', height: '9in',
      margin: { top: '19mm', right: '13mm', bottom: '19mm', left: '22mm' },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 9px; color: #999; text-align: center; width: 100%;">
          <span class="pageNumber"></span>
        </div>`,
    },
    launch_options: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    marked_options: {
      breaks: false,
    },
  };
}

// ── Geração ──

async function generatePostPdf(post, css) {
  const md = postHeader(post) + post.content;
  const result = await mdToPdf({ content: md }, pdfOptions(css));
  const outPath = join(POSTS_DIR, `${post.slug}.pdf`);
  await writeFile(outPath, result.content);
  console.log(`  posts/${post.slug}.pdf`);
}

async function generateBookPdf(posts, css) {
  const today = formatDate(new Date());

  const parts = [
    // Capa
    `<div class="cover">

# Eita Lasqueira

<p class="subtitle">Crônicas e Causos</p>

<p class="author">Adi Baldo</p>

<p class="date">${today}</p>

</div>`,
  
${introPost ? `<div class="chapter intro">

# ${introPost.data.title}

${introPost.content}

</div>` : ''},
    `<div class="rights-page">

<p>© 2026 Adi Baldo</p>

<p>Todos os direitos reservados. Nenhuma parte desta obra pode ser reproduzida ou transmitida por qualquer forma ou por quaisquer meios sem a autorização por escrito do autor.</p>

<p>Primeira edição: 2026</p>

<p><em>Eita Lasqueira — Crônicas e Causos</em></p>

<p>Adi Baldo<br>Rolim de Moura, Rondônia — Brasil</p>

</div>`,
  ];

  for (const post of bodyPosts) {
    const date = formatDate(post.data.pubDate);
    const place = post.data.placeLabel ? ` — ${post.data.placeLabel}` : '';

    parts.push(
      `<div class="chapter">

# ${post.data.title}

<p class="post-meta">${date}${place}</p>

---

${post.content}

</div>`
    );
  }

  const md = parts.join('

');
  const result = await mdToPdf({ content: md }, pdfOptions(css));
  const outPath = join(OUTPUT_DIR, 'livro-completo.pdf');
  await writeFile(outPath, result.content);
  console.log('  livro-completo.pdf');
}

// ── Main ──

async function main() {
  console.log('Gerando PDFs...
');

  mkdirSync(POSTS_DIR, { recursive: true });

  const styleCss = readFileSync(STYLE_PATH, 'utf-8');
  const fontsCss = buildFontFaceCss();
  const css = fontsCss + '
' + styleCss;

  const posts = readPosts();
  console.log(`${posts.length} posts encontrados.
`);

  // PDFs individuais
  console.log('PDFs individuais:');
  for (const post of bodyPosts) {
    await generatePostPdf(post, css);
  }

  // Livro completo
  console.log('
Livro completo:');
  await generateBookPdf(posts, css);

  console.log('
Pronto!');
}

main().catch((err) => {
  console.error('Erro ao gerar PDFs:', err);
  process.exit(1);
});
