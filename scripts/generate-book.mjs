import { execSync } from 'child_process';
import { mkdirSync, existsSync } from 'fs';
import { join, dirname, fileURLToPath } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const htmlInput = join(ROOT, 'dist/book-export/index.html');
const templateFile = join(ROOT, 'scripts/book-template.tex');
const outputDir = join(ROOT, 'public/pdfs');
const outputFile = join(outputDir, 'livro-completo.pdf');

if (!mkdirSync && !existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}
mkdirSync(outputDir, { recursive: true });

if (!existsSync(htmlInput)) {
  console.error(`HTML not found: ${htmlInput}`);
  console.error('Run "npm run build" first.');
  process.exit(1);
}

console.log('Generating PDF with Pandoc + XeLaTeX...');

const cmd = [
  'pandoc',
  `"${htmlInput}"`,
  '--pdf-engine=xelatex',
  `--template="${templateFile}"`,
  '-V lang=pt-BR',
  `--resource-path="${join(ROOT, 'dist')}"`,
  `-o "${outputFile}"`
].join(' ');

try {
  execSync(cmd, { stdio: 'inherit', cwd: ROOT });
  console.log(`✅ PDF gerado: ${outputFile}`);
} catch (err) {
  console.error('❌ Erro ao gerar PDF:', err.message);
  process.exit(1);
}
