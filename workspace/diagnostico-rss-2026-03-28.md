# Diagnóstico do Feed RSS
**Data:** 28 de Março de 2026

## Respostas

1. **O arquivo `src/pages/rss.xml.js` existe?**
   Sim, o arquivo existe e estava gerando o feed RSS do blog.

2. **O feed inclui conteúdo completo dos posts ou apenas título+link?**
   Originalmente, o feed incluía apenas os metadados dos posts definidos em `post.data` e gerava o `link` e as `categories`. O conteúdo do corpo do post não era incluído.

3. **Se for apenas título+link, adicionar campo content.**
   O campo `content` foi adicionado ao mapeamento dos itens. Para converter o conteúdo dos posts (que estão em Markdown) em HTML utilizou-se o pacote `markdown-it` combinado com o `sanitize-html` para evitar problemas com injeções. Isso permite que leitores de RSS exibam o conteúdo completo e devidamente formatado do post.

4. **O link do feed está correto no `BaseHead.astro`?**
   Sim. O `BaseHead.astro` possuía a tag correspondente com o link correto:
   ```html
   <link
       rel="alternate"
       type="application/rss+xml"
       title={SITE_TITLE}
       href={new URL('rss.xml', Astro.site)}
   />
   ```

## Ações Realizadas
- Analisei os arquivos `src/pages/rss.xml.js` e `src/components/BaseHead.astro`.
- Instalei os pacotes `sanitize-html`, `@types/sanitize-html`, `markdown-it` e `@types/markdown-it` via NPM.
- Modifiquei o `src/pages/rss.xml.js` para adicionar `content: sanitizeHtml(parser.render(post.body))` a todos os itens renderizados no Feed RSS.
- A configuração original da tag `<link>` do RSS no arquivo `BaseHead.astro` já está correta, não requerendo correções adicionais.