import { execSync } from 'child_process';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const htmlInput = join(ROOT, 'dist/book-export/index.html');
const htmlFixed = join(ROOT, 'dist/book-export/index-fixed.html');
const templateFile = join(ROOT, 'scripts/book-template.tex');
const outputDir = join(ROOT, 'public/pdfs');
const outputFile = join(outputDir, 'livro-completo.pdf');

mkdirSync(outputDir, { recursive: true });

if (!existsSync(htmlInput)) {
  console.error(`HTML not found: ${htmlInput}`);
  process.exit(1);
}

const astroDir = join(ROOT, 'dist/_astro');
const html = readFileSync(htmlInput, 'utf8');
const fixed = html.replace(/src="\/_astro\//g, `src="${astroDir}/`);
writeFileSync(htmlFixed, fixed);
console.log('Paths corrigidos');

const cmd = [
  'pandoc',
  `"${htmlFixed}"`,
  '--pdf-engine=xelatex',
  `--template="${templateFile}"`,
  '-V lang=pt-BR',
  `--resource-path="${join(ROOT, 'dist')}:${astroDir}"`,
  `-o "${outputFile}"`
].join(' ');

try {
  execSync(cmd, { stdio: 'inherit', cwd: ROOT });
  console.log(`PDF gerado: ${outputFile}`);
} catch (err) {
  console.error('Erro:', err.message);
  process.exit(1);
}
