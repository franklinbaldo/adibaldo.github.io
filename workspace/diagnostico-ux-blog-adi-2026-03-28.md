# Diagnóstico UX e Astro: Alfarrábios do Adi (28/03/2026)

## Sumário Executivo
Este relatório apresenta um diagnóstico detalhado da interface, experiência de uso (UX), performance, SEO e da implementação do Astro no blog "Alfarrábios do Adi".
O design atual possui um estilo literário ("varanda moderna") muito elegante e aderente à proposta contida no `DESIGN.md`, utilizando uma paleta quente, tipografias auto-hospedadas bem escolhidas (Playfair Display, Source Serif 4, Source Sans 3) e bom uso de CSS customizado com variáveis.
Do lado técnico, a base do Astro está bem configurada com suporte a coleções de conteúdo (`content.config.ts`), MDX, Sitemap, RSS e scripts de analytics e JSON-LD.
No entanto, existem oportunidades para refinar a acessibilidade, melhorar o carregamento de imagens no Hero, aprimorar a estrutura de SEO e otimizar elementos interativos que não necessitam de componentes complexos. O relatório a seguir detalha essas descobertas, separando-as em Quick Wins (fáceis de aplicar) e Melhorias Maiores (que demandam mais planejamento).

---

## Tabela de Issues

| Issue | Categoria | Prioridade | Esforço Estimado |
|-------|-----------|------------|------------------|
| Otimização do CSS de imagens Hero (Aspect Ratio/Cover) | UX / Performance | Alta | Baixo (< 1h) |
| Acessibilidade: Falta de `aria-current="page"` em links ativos e Skip Link | Acessibilidade | Alta | Baixo (< 1h) |
| Dependência excessiva de JavaScript para navegação de "Ver Mais" e Modo Escuro (FOUC) | Performance / UX | Média | Baixo (< 1h) |
| Imagens não responsivas em telas Ultrawide e Otimização do `fetchpriority` | Performance | Média | Baixo (< 1h) |
| Refatoração de botões aninhados em Cards clicáveis (Stretched Link) | UX / HTML Semântico | Alta | Baixo (< 1h) |
| Falta de Manifest PWA (Web App Manifest) | Mobile / UX | Baixa | Baixo (< 1h) |
| Busca estática nativa com Pagefind ou Fuse.js (atualmente sem implementação clara no header) | Features / UX | Alta | Médio (2h-4h) |
| Refatoração de View Transitions (`astro:page-load`) vs Vanilla JS | Performance | Média | Alto (3h-5h) |
| Image Generation dinâmica (Satori/OG) mais robusta via endpoints | SEO / Features | Média | Médio (2h-3h) |

---

## Quick Wins (Fáceis de Implementar)

### 1. Ajuste HTML Semântico nos Cards (Padrão "Stretched Link")
**Problema:** Atualmente, em `index.astro` e `blog/index.astro`, há tags `<a>` envolvendo ou próximas a outras tags de link (como as tags de categorias). Ter links interativos dentro do contexto de outro link pode causar problemas de usabilidade, delimitação de clique e HTML inválido.
**Como implementar no Astro:**
Aplicar o padrão "stretched link". Transforme o `<article class="card">` em `position: relative`. Coloque o link principal do post esticado cobrindo todo o card: `<a href={...} style="position: absolute; inset: 0; z-index: 0;"></a>`. E para garantir que as tags funcionem, adicione `position: relative; z-index: 1;` a elas (já parcialmente feito, mas pode ser padronizado globalmente no CSS).

### 2. Acessibilidade: `aria-current="page"`
**Problema:** No componente `Header.astro` e `HeaderLink.astro` (presumidamente), a indicação de link ativo baseia-se apenas numa classe `.active`, mas leitores de tela precisam saber qual é a página atual.
**Como implementar no Astro:**
No componente que renderiza os links da navegação (`HeaderLink.astro`), insira lógica condicional baseada na rota (`Astro.url.pathname`).
```astro
const isActive = Astro.url.pathname === href || Astro.url.pathname === href + '/';
<a href={href} class:list={[className, { active: isActive }]} aria-current={isActive ? 'page' : undefined}>
  <slot />
</a>
```

### 3. Acessibilidade: Skip Link para Conteúdo Principal
**Problema:** Usuários navegando por teclado não têm atalho para pular direto para o `<main>`, precisando passar sempre pelos links do Header.
**Como implementar no Astro:**
Adicione um link invisível logo após o `<body>` no `BaseHead.astro` (ou no `Layout` principal se for centralizado, ou direto nos arquivos como `index.astro` / `BlogPost.astro`):
```html
<a href="#main-content" class="sr-only focus:not-sr-only skip-link">Pular para o conteúdo principal</a>
```
E adicione `id="main-content"` na tag `<main>`. A classe `.sr-only` já existe no `global.css`. Precisaria adicionar o estado `:focus`.

### 4. Correção do `fetchpriority` e `loading` nas Imagens de Destaque
**Problema:** No `index.astro`, a propriedade `loading="eager"` e `fetchpriority="high"` está correta para a imagem principal (Featured Post). No entanto, em layouts de post (`BlogPost.astro`), também seria interessante garantir que imagens que não ficam "above the fold" em telas muito menores não percam otimização. O componente `<Image />` do Astro é ótimo e já está sendo usado.
**Como implementar no Astro:**
Basta manter a revisão das tags `<Image>` em `.post-hero-image`, garantindo que se use adequadamente os atributos. A implementação atual no `BlogPost.astro` já está boa (`loading="eager"`).

### 5. Configuração do Web App Manifest (PWA Básico)
**Problema:** Adicionar um ícone à tela inicial do celular requer um `site.webmanifest` que não está implementado, o que diminui a retenção (os leitores adorariam salvar "O Alfarrábio" como um app literário no celular).
**Como implementar no Astro:**
Crie um arquivo estático `/public/site.webmanifest`:
```json
{
  "name": "Alfarrábios do Adi",
  "short_name": "Adi",
  "icons": [
    { "src": "/favicon-adi.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#faf5ef",
  "background_color": "#faf5ef",
  "display": "standalone"
}
```
Em `BaseHead.astro`, referencie: `<link rel="manifest" href="/site.webmanifest" />`.

---

## Melhorias Maiores (Investimento de Tempo)

### 1. Implementar Busca Nativa e Estática (Pagefind)
**Justificativa de Impacto:** A navegação superior possui um botão "Buscar", que direciona para `/buscar` (provavelmente uma página ainda não totalmente otimizada ou dependente de API de terceiros).
Como o site é 100% estático, integrar o **Pagefind** (uma biblioteca de busca em Rust projetada para sites estáticos criados por SSGs como o Astro) seria um salto gigantesco na UX. O Pagefind cria um índice apenas no build (`npm run build`) e faz consultas super rápidas no lado do cliente sem pesar o pacote JS, perfeito para a estética minimalista do blog.
**Como:** Instalar `pagefind`, adicionar um comando de execução de post-build no `package.json` (`astro build && pagefind --site dist`) e criar um componente simples para consumir a UI dele em `src/pages/buscar.astro`.

### 2. Otimização de Paginação e View Transitions
**Justificativa de Impacto:** O botão "Carregar mais" no `index.astro` usa um script de manipulação de DOM (`display: none;` no grid) que esconde o conteúdo na renderização inicial e vai mostrando em lotes de 8.
Isso afeta SEO e carrega todas as imagens no DOM inicial (embora usando lazy/decoding async natural do browser, é muito HTML).
Em um framework moderno como Astro, a paginação estática (`getStaticPaths({ paginate })`) em `/blog/[page].astro` e o uso das **View Transitions (`<ViewTransitions />`)** do Astro criariam a sensação de App, com navegação fluida de página a página (cross-fade do conteúdo) sem carregar todos os artigos ocultos na index.
É um refactor considerável de roteamento, mas eleva a performance para o estado da arte e remove scripts client-side customizados frágeis.

### 3. Melhoria na Dinâmica de Geração de Imagens Open Graph (OG)
**Justificativa de Impacto:** A configuração atual utiliza `imageUrl?: string` no `BaseHead.astro` com fallback para `/og-home.png`. No `BlogPost.astro`, `imageUrl` é gerado pela suposição do arquivo `slug` (`/og/${slug}.png`), o que exige pré-geração. Pelo `package.json` (`satori`, `sharp`, `@resvg/resvg-js`), a infraestrutura para gerar SVGs para PNG dinamicamente em runtime/build já existe.
Criar um *Astro Endpoint* (ex: `src/pages/og/[slug].png.ts`) que gera essas imagens per-post, dinamicamente, garantindo que novos posts gerem cards de redes sociais sem que o autor precise criá-las no Figma toda vez.

---
*Relatório de análise de UX & Astro - 28 de março de 2026.*