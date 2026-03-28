# Diagnóstico SEO - Alfarrábios do Adi (adibaldo.github.io)
**Data:** 28 de março de 2026

## Sumário Executivo
Este relatório apresenta um diagnóstico SEO técnico completo para o blog "Alfarrábios do Adi", construído em Astro e hospedado no GitHub Pages. O site já possui uma excelente base, com tempos de build rápidos, geração estática de páginas e uso de tags semânticas. No entanto, existem oportunidades significativas de melhoria em metadados estruturados (JSON-LD), refinamento de tags canônicas, e otimização da densidade de links internos para maximizar a visibilidade orgânica. O foco deve ser aprimorar a autoridade do autor e a clareza da estrutura do site para os motores de busca.

---

## Tabela de Issues (Prioridade / Esforço)

| Issue | Categoria | Descrição | Prioridade | Esforço |
| :--- | :--- | :--- | :--- | :--- |
| **1. Inconsistências no Schema JSON-LD de BlogPosting** | Structured Data | O schema de `BlogPosting` carece de referências robustas (ex: publisher logo, author sameAs) e validação estrita. | Alta | Baixo |
| **2. Ausência de Schema Person (Autor) Consolidado** | Schema de Pessoa | O schema de autor está fragmentado e não utiliza as propriedades completas recomendadas pelo Google (ex: sameAs, description, image). | Alta | Baixo |
| **3. Falta de Schema ItemList na Página Inicial/Blog** | Structured Data | As páginas de listagem (`/` e `/blog`) não possuem o schema `ItemList` para destacar os artigos recentes. | Média | Baixo |
| **4. Otimização de URLs / Slugs** | URLs | Alguns slugs podem conter stop-words ou serem excessivamente longos se derivados diretamente de títulos longos. | Baixa | Médio |
| **5. Core Web Vitals (LCP) e Imagens Eager** | Performance | Uso extensivo de `loading="eager"` em imagens acima da dobra (ex: na home) é bom, mas o LCP pode ser prejudicado por falta de preconnect ou otimizações no script do Cloudflare. | Média | Médio |
| **6. BreadcrumbList Incompleto ou Estático** | Structured Data | O schema `BreadcrumbList` é gerado, mas pode apresentar inconsistências em páginas de listagem e não cobre profundamente a estrutura do site. | Baixa | Baixo |
| **7. Hreflang Ausente** | Meta Tags | Não há declaração de `hreflang`, embora o site seja unicamente pt-BR. Declarar formalmente reforça o targeting regional. | Baixa | Baixo |
| **8. Oportunidade de Melhorar Internal Linking (Orphan Pages)** | Links Internos | A navegação transversal entre os artigos (`prev`/`next`) é boa, mas faltam links contextuais dentro do conteúdo e tags relacionadas (possíveis orphan pages se não categorizadas). | Média | Alto |

---

## Análise Detalhada e Correções Técnicas (Astro)

### 1. Structured Data / JSON-LD
**Diagnóstico:** O site implementa `WebSite`, `BlogPosting` e `BreadcrumbList`. Contudo, o `BlogPosting` no `BlogPost.astro` usa URLs relativas para o autor e falta a propriedade `logo` no `publisher`.
**Correção (Astro - `src/layouts/BlogPost.astro`):**
*   **Ação:** Atualizar o JSON-LD de `BlogPosting` para incluir URLs absolutas e o logotipo do publicador.
*   **Código:**
    ```javascript
    const blogPostingLD = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "image": ogImageAbsolute,
      // ...
      "author": {
        "@type": "Person",
        "name": "Adi Baldo",
        "url": new URL('/sobre', Astro.site).toString()
      },
      "publisher": {
        "@type": "Organization",
        "name": "Alfarrábios do Adi",
        "logo": {
          "@type": "ImageObject",
          "url": new URL('/favicon-adi.png', Astro.site).toString()
        }
      }
    };
    ```

### 2. Meta Tags
**Diagnóstico:** `title`, `description`, `canonical`, `og:*` e `twitter:*` estão bem configurados no `BaseHead.astro`. A meta tag `robots` não está explícita (o default é `index, follow`, o que está ok, mas pode ser explícito). Falta `hreflang`.
**Correção (Astro - `src/components/BaseHead.astro`):**
*   **Ação:** Adicionar `robots` explícito e `hreflang`.
*   **Código:**
    ```html
    <meta name="robots" content="index, follow" />
    <link rel="alternate" hreflang="pt-BR" href={canonicalURL} />
    ```

### 3. Sitemap.xml
**Diagnóstico:** O `@astrojs/sitemap` está instalado e configurado no `astro.config.mjs`. Os arquivos `sitemap-index.xml` e `sitemap-0.xml` estão sendo gerados corretamente na pasta `dist/`.
**Status:** Correto e operante.

### 4. Robots.txt
**Diagnóstico:** O arquivo `public/robots.txt` permite rastreamento completo (`Allow: /`) e aponta corretamente para o Sitemap Index.
**Status:** Correto e operante.

### 5. URLs
**Diagnóstico:** O Astro gera slugs amigáveis baseados nos nomes dos arquivos na coleção `blog`. Não há parâmetros desnecessários visíveis na configuração padrão.
**Recomendação:** Ao criar novos arquivos Markdown, garanta que os nomes (slugs) sejam concisos e removam stop words (ex: `o-cavalo-javali...` para `cavalo-javali...`). Nenhuma alteração de código é estritamente necessária aqui, é uma questão de governança de conteúdo.

### 6. Core Web Vitals Potenciais
**Diagnóstico:**
*   **LCP (Largest Contentful Paint):** A imagem hero em `BlogPost.astro` já usa `loading="eager"` e `fetchpriority="high"`, o que é excelente. Imagens otimizadas (WebP/AVIF via componente `<Image />`) também estão em uso.
*   **CLS (Cumulative Layout Shift):** O Astro cuida bem disso, mas verifique se fontes (ex: as preloaded no `BaseHead.astro`) não causam FOIT/FOUT perceptíveis (adicionar `font-display: swap` no CSS global pode ajudar, se já não estiver).
*   **FID/INP (Interaction to Next Paint):** Site estático tem INP virtualmente zero.
**Correção (Astro - `src/styles/global.css`):**
*   Certifique-se de usar `font-display: swap` na declaração `@font-face` das fontes locais para melhorar a percepção de carregamento (LCP percebido/CLS).

### 7. Links Internos
**Diagnóstico:** Há navegação `prev`/`next` em posts, listagens de tags e paginação. No entanto, a densidade de links contextuais (links dentro do corpo do texto Markdown apontando para outros posts) depende inteiramente do autor.
**Recomendação (Sem alteração de código):** O autor (Adi) ou o curador de conteúdo deve se esforçar para adicionar links Markdown (ex: `[leia mais sobre isso aqui](/blog/outro-causo/)`) dentro dos novos artigos para evitar que páginas antigas se tornem "órfãs" de links contextuais. A funcionalidade de "Posts Relacionados" (além do prev/next) via tags poderia ser uma adição valiosa no `BlogPost.astro` futuramente.

### 8. Schema de Pessoa/Autor
**Diagnóstico:** A página `/sobre` possui o `BreadcrumbList`, mas carece do schema `Person` fundamental para o Knowledge Graph do Google e E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness).
**Correção (Astro - `src/pages/sobre.astro`):**
*   **Ação:** Adicionar o schema `Person` focado no autor Adi Baldo.
*   **Código:**
    ```javascript
    const personLD = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Adi Baldo",
      "url": Astro.site?.toString(),
      "image": new URL('/assets/adi-profile.png', Astro.site).toString(),
      "jobTitle": "Advogado Aposentado e Escritor",
      "description": "Aos 76 anos, sou advogado aposentado, tive a honra de ser o primeiro advogado de Rolim de Moura/RO, escritor de memórias...",
      "sameAs": [
        "https://github.com/adibaldo"
      ]
    };
    ```
    *E adicionar no `<head>`:*
    ```html
    <script type="application/ld+json" set:html={JSON.stringify(personLD)} />
    ```
