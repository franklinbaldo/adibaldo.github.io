# Diagnóstico de UI — Alfarrábios do Adi

**Data:** 28 de Março de 2026

## Sumário
1. [Tabela de Issues de UI](#tabela-de-issues-de-ui)
2. [Consistência Visual](#1-consistência-visual)
3. [Tipografia](#2-tipografia)
4. [Espaçamento](#3-espaçamento)
5. [Cores](#4-cores)
6. [Responsividade](#5-responsividade)
7. [Dark Mode](#6-dark-mode)
8. [Componentes](#7-componentes)
9. [Animações e Transições](#8-animações-e-transições)

---

## Tabela de Issues de UI

| Issue ID | Categoria | Severidade | Descrição | Arquivo/Componente |
| :--- | :--- | :--- | :--- | :--- |
| UI-001 | Consistência | Média | Cores hardcoded no botão de WhatsApp/Telegram, ignorando variáveis de tema. | `src/layouts/BlogPost.astro` |
| UI-002 | Tipografia | Baixa | `BlogPost.astro` usa `Merriweather` hardcoded para o corpo da leitura literária, divergindo de `Source Serif 4` do `DESIGN.md`. | `src/layouts/BlogPost.astro` |
| UI-003 | Responsividade | Média | Header (`Header.astro`) quebra layouts de navegação flex em 620px ocultando texto em favor de ícones, mas o espaçamento entre itens (`gap: 4px`) pode causar toques acidentais em mobile (375px). | `src/styles/global.css`, `src/components/Header.astro` |
| UI-004 | Espaçamento | Média | Padding nas sections e cards usa variáveis consistentes (`--space-*`), mas a hierarquia vertical nos blocos literários (`BlogPost.astro`) usa margens rem hardcoded. | `src/layouts/BlogPost.astro` |
| UI-005 | Dark Mode | Baixa | FOUC (Flash of Unstyled Content) na primeira carga; há um inline script em `BaseHead.astro` e lógica em `Header.astro`, mas ícones de botão de leitura noturna podem ter transição brusca. | `src/components/Header.astro`, `src/components/BaseHead.astro` |
| UI-006 | Componentes | Baixa | Botões CTA `.cta-outline` em `index.astro` estilizam inline e misturam regras que poderiam estar em `.cta.outline` globalmente. | `src/pages/index.astro`, `src/styles/global.css` |
| UI-007 | Componentes | Média | O Card `featured-card` de `index.astro` usa link esticado com tags clicáveis aninhadas o que, dependendo do markup exato de Astro, pode causar comportamento z-index ambíguo (tags clicadas acionam o card pai). | `src/pages/index.astro`, `src/styles/global.css` |
| UI-008 | Animações | Média | Faltam transições para o estado "scrolled" da navegação. O fundo e a sombra mudam subitamente. | `src/styles/global.css` |

---

## 1. Consistência Visual

A base estabelecida em `DESIGN.md` para um tema de "alfarrábios", "intimo" e de "pergaminho" é bem aplicada na fundação (`global.css`).
No entanto, o layout específico para leitura de posts (`.markdown-livro` em `BlogPost.astro`) introduz estilos isolados (`<style is:global>`) que quebram a coesão das variáveis globais de CSS, injetando cores como `#111`, `#2c2c2c`, `#fcfcfc` diretamente. Isso contorna o uso do design system.

- **Implementações Específicas:**
  - `src/layouts/BlogPost.astro`: As cores de compartilhamento (`#25D366` para WhatsApp e `#0088cc` para Telegram) estão em inline-style, contrastando com a consistência de tons pastéis/creme do site.
  - `src/layouts/BlogPost.astro`: `.markdown-livro` ignora `--bg-primary`, `--text-primary`, e `--font-body`.

## 2. Tipografia

A hierarquia está bem desenhada nos tokens de CSS global, usando `clamp()` de forma madura para escalabilidade responsiva de fontes `h1`, `h2`, e `h3`.
- `h1`: `clamp(36px, 5.5vw, 64px)` (Correto)
- `h2`: `clamp(22px, 2.8vw, 28px)` (Correto)
- `body`: Configurado com tamanho fixo `20px` e `line-height 1.75` (bom para leiturabilidade, excelente respiro). No dark mode salta para `22px`.

**Problemas detectados:**
- **Inconsistência de Família de Fonte:** `DESIGN.md` define `Source Serif 4` para prosa (`--font-body`). No entanto, a classe `.markdown-livro` força `font-family: 'Merriweather', 'Georgia', ...`.
- Fontes são pré-carregadas via `<link rel="preload">` corretamente em `BaseHead.astro`, mas o uso divergente no blog post pode impactar performance e coesão.

## 3. Espaçamento

O sistema de espaçamento baseado em escala (`--space-xs` até `--space-3xl`) é respeitado quase inteiramente em `global.css` e nas páginas construídas (`index.astro`). A estrutura de layout baseia-se em larguras máximas (`--container-max`, `--reading-max`), adequadas.

**Problemas detectados:**
- **Ritmo Vertical:** No `BlogPost.astro`, blocos literais ganham padding/margin em rem/px (ex: `padding: 2rem 1rem`, `margin: 3rem 0`), desviando-se das variáveis do sistema (como `var(--space-2xl)`).

## 4. Cores

A paleta definida no Design System: `--bg-primary: #faf5ef`, `--bg-gradient-start: #f0dfc8`, etc. é usada amplamente no `global.css`.

- **Contraste:** O modo claro possui bom contraste (`--text-primary: #2c2420` em `#faf5ef`), atingindo a margem WCAG AAA (Relação ~11.8:1). No modo escuro (`#e8ddd0` no `#1a1a1a`), também apresenta forte contraste AAA (~11.6:1).
- **Hardcoding:** No `.markdown-livro`, as cores `#666`, `#444`, `#888` estão espalhadas em vez de utilizar `--text-secondary` ou `--text-muted`.

## 5. Responsividade

Foram estabelecidos breakpoints claros em `global.css` para `980px` (Tablet grande) e `620px` (Mobile), o que atende 375px razoavelmente.
- Em mobile (`<=620px`), a navegação troca texto por apenas ícones. Os links de navegação reduzem seu padding e as fontes diminuem (ex: nav-links `gap: 4px; font-size: 13px`).
- **Ponto de fricção em Mobile:** Um `gap` e paddings pequenos na `.nav-links a` (ex: `padding: 6px 4px`) num device de 375px tornam a "hit area" menor do que os mínimos 44x44px recomendados por padrões de usabilidade em touch.
- As larguras de grids `grid-template-columns` ajustam graciosamente de 4 colunas para 2 e 1 colunas.

## 6. Dark Mode

O Dark Mode está implementado no `:root[data-theme='dark']` e via `localStorage`.

- **Funcionamento:** Um inline script em `BaseHead.astro` seta o modo preventivamente na tag `<html>`, evitando FOUC perfeitamente. Um botão no header (`toggle-reading`) altera o modo de forma funcional.
- **Experiência Visual:** A transição do modo claro para escuro inverte as variáveis principais de fundo e texto, trocando para um fundo `#1a1a1a`.
- **Ponto de fricção:** A alteração via JavaScript não injeta uma transição nos elementos `body` (como `transition: background-color 0.3s ease, color 0.3s ease;`). Logo, a virada de branco para preto é instantânea/agressiva. A classe `.markdown-livro` não ouve as variáveis de dark mode, o que significa que textos longos ficarão permanentemente brancos e dolorosos na vista no modo noturno.

## 7. Componentes

- **Cards:** Seguem a recomendação do `DESIGN.md`. A sombra suave, bordas de `1px` em `--border-light` e hover state animado (translação -3px) proporcionam boa experiência.
- **Botões/Links:** Os botões `.cta` utilizam flex, e possuem bom tracking e border-radius. Em `index.astro`, o `cta-outline` é injetado como CSS por componente no invés do arquivo global.
- **Tags:** Formato pílula elegante `.tag` implementado corretamente.
- **Hero Image:** Implementada com o componente Astro `<Image />` com `widths` e `sizes` para boa gestão de larguras (`100vw` no mobile, larguras limitadas em telas grandes).
- **Cartões com links aninhados:** Componentes como `featured-card` usam z-indexes sobrepostos `position: relative; z-index: 1;` com link absoluto esticado. Apesar de válido em padrão CSS, deve-se ter extrema cautela com foco (Acessibilidade) em elementos aninhados para navegação via teclado.

## 8. Animações e Transições

O blog é modesto e elegante nas animações (cumprindo a meta de um local tranquilo):
- Cards, botões e imagens (scale de `1.03` / `1.04` em hover) usam transformações de opacidade e translação bem orquestradas via CSS transitions. Exemplo: `transition: box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease;`.
- **Áreas de Melhoria:**
  1. A barra superior `.site-header.scrolled` não possui transition na sua classe base para quando `.scrolled` é adicionado/removido pelo script de scroll. O header ganhará `box-shadow` e `background` subitamente.
  2. A barra de progresso no topo `progress-bar` ganha um `transition: width 0.1s;` que dá a percepção de andamento suave durante a leitura.
  3. A transição de light para dark mode deveria ser suavizada.
