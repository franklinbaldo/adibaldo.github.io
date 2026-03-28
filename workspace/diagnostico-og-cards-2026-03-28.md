# Diagnóstico de OG Cards - 28/03/2026

## Verificações Solicitadas

### 1. Meta tags og:* presentes e corretas?
Sim, em `src/components/BaseHead.astro` e `src/layouts/BlogPost.astro`. As tags a seguir são geradas automaticamente e se encontram adequadamente referenciadas:
- `og:title` -> content={title}
- `og:description` -> content={description}
- `og:image` -> content={ogImageUrl}
- `og:url` -> content={canonicalURL}
- `og:type` -> content={ogType} (que tem 'website' como padrão em `BaseHead` e sobrescrito como 'article' em `BlogPost`)

### 2. Posts sem imagem de capa têm fallback OG adequado?
O sistema tem um mecanismo de fallback no `BaseHead.astro`:
```typescript
const ogImageUrl = imageUrl ? new URL(imageUrl, canonicalURL) : new URL('/og-home.png', canonicalURL);
```
Porém, **o arquivo `/og-home.png` não existia no diretório `public/`**.

### 3. As configurações do Twitter estão configuradas?
Sim, o Twitter Cards está configurado como `summary_large_image` no `BaseHead.astro`:
- `twitter:card` (summary_large_image)
- `twitter:title` (title)
- `twitter:description` (description)
- `twitter:image` (ogImageUrl)
- `twitter:url` (canonicalURL)

### 4. As URLs das imagens OG são absolutas?
Sim. O Astro usa as APIs padrão `new URL(caminho_imagem, canonicalURL)` com `canonicalURL` derivado de `new URL(Astro.url.pathname, Astro.site)`, garantindo links completos apontando para a string absoluta do GitHub Pages do site.

### 5. Dimensões adequadas (1200x630px) e Imagem de Fallback
A imagem de fallback `/og-home.png` não existia no projeto. Os logos presentes em `public/` (como `logo-style-1.png`, `logo-style-2.png`, `logo-style-3.png`) possuem a dimensão de 1024x1024px, o que não obedece ao padrão Open Graph recomendado pelo Facebook e Twitter (1200x630px).

---
## Resolução Adotada
1. Criação do arquivo `public/og-home.png` a partir de um script Python utilizando a biblioteca Pillow.
2. A imagem foi redimensionada sob fundo claro `#faf5eb` para casar com a temática dos demais materiais, convertida no formato padrão de Open Graph recomendado de **1200x630px**, centralizando o logo `logo-style-3.png`.
