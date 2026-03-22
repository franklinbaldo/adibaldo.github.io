# Alfarrábios do Adi - Design System (Google Stitch Pattern)

Este documento descreve o sistema de design do blog *Alfarrábios do Adi*, inspirado no padrão Google Stitch, com foco em estabelecer uma fonte de verdade para tokens de design, estética e componentes. O design atual busca legibilidade, contraste e um "respiro" que remete a uma varanda moderna e minimalista.

## 1. Design Tokens

Os Design Tokens são as variáveis base extraídas do `src/styles/global.css`, que garantem a consistência visual em todo o projeto.

### Cores (Color Tokens)

O tema principal utiliza tons quentes (creme, pêssego, tons de terra), proporcionando uma sensação acolhedora. O modo noturno (`data-theme="dark"`) inverte as cores para tons escuros, preservando o baixo contraste para leitura prolongada.

#### Light Mode (Padrão)
*   **Backgrounds:**
    *   `--bg-primary`: `#fdf0e2` (Creme claro)
    *   `--bg-gradient-start`: `#f5c77e` (Pêssego)
    *   `--bg-gradient-end`: `#fdf0e2`
    *   `--bg-card`: `#ffffff`
    *   `--bg-dark`: `#1a1a1a`
*   **Textos:**
    *   `--text-primary`: `#1a1a1a`
    *   `--text-secondary`: `#6b5b4f`
    *   `--text-muted`: `#9b8b7f`
*   **Destaques (Accents):**
    *   `--accent-primary`: `#d4874e`
    *   `--accent-hover`: `#c07640`
*   **Tags & Bordas:**
    *   `--tag-bg`: `#f0e6d8`
    *   `--tag-text`: `#6b5b4f`
    *   `--border-light`: `#e8ddd0`
    *   `--border-card`: `#d4c4b0`

#### Dark Mode (Modo Leitura Noturna)
*   **Backgrounds:**
    *   `--bg-primary`: `#1a1a1a`
    *   `--bg-gradient-start`: `#2a2218`
    *   `--bg-gradient-end`: `#1a1a1a`
    *   `--bg-card`: `#221f1a`
*   **Textos:**
    *   `--text-primary`: `#e8ddd0`
    *   `--text-secondary`: `#cbbcab`
    *   `--text-muted`: `#a89b8f`
*   **Bordas & Sombras:**
    *   `--border-light`: `rgba(232, 221, 208, 0.15)`
    *   `--border-card`: `rgba(232, 221, 208, 0.25)`
    *   `--shadow-card`: `0 1px 3px rgba(0, 0, 0, 0.35)`
    *   `--shadow-card-hover`: `0 6px 18px rgba(0, 0, 0, 0.45)`

### Tipografia (Typography Tokens)

O blog adota fontes com serifa clássicas combinadas com sem serifa para interface, criando o estilo de revista literária.
*   **Títulos (`--font-title`)**: `Playfair Display`, Georgia, 'Times New Roman', serif. (Pesos: 600, 700, 900)
*   **Corpo de Texto (`--font-body`)**: `Source Serif 4`, Georgia, 'Times New Roman', serif. (Pesos: 400, 600, 700)
*   **Interface (`--font-ui`)**: `Source Sans 3`, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif. (Pesos: 400, 500, 600)
*   **Escala Base**:
    *   Desktop: `20px` (Light) / `22px` (Dark)
    *   Mobile: `18px` (Light) / `20px` (Dark)

### Espaçamentos (Spacing Tokens)

Utilizados para definir margens e paddings, garantindo o "respiro" do layout.
*   `--space-xs`: `4px`
*   `--space-sm`: `8px`
*   `--space-md`: `16px`
*   `--space-lg`: `24px`
*   `--space-xl`: `40px`
*   `--space-2xl`: `64px`
*   `--space-3xl`: `96px`

### Layout, Raios e Sombras
*   **Containers:** `--container-max: 1120px` e `--reading-max: 720px`
*   **Border Radius:** `--radius-card: 12px`, `--radius-tag: 16px`, `--radius-button: 24px`
*   **Shadows (Light Mode):**
    *   `--shadow-card`: `0 1px 3px rgba(0, 0, 0, 0.06)`
    *   `--shadow-card-hover`: `0 4px 12px rgba(0, 0, 0, 0.1)`
    *   `--shadow-navbar`: `0 1px 8px rgba(0, 0, 0, 0.05)`

## 2. Estética e Princípios Visuais

*   **Revista Literária:** Uso predominante de tipografia serifada de alto contraste (Playfair Display para títulos, Source Serif 4 para leitura) para evocar o sentimento de leitura de um livro ou periódico clássico.
*   **Tons Quentes:** A paleta base (`#fdf0e2` e `#f5c77e`) transmite nostalgia, calor e proximidade, alinhando-se com a temática de "lembranças e reflexões".
*   **Minimalismo e Respiro:** "Texto bom é texto que respira." Layouts evitam superlotação. Margens amplas (`--space-3xl` em posts), linha de texto com largura controlada (`--reading-max`) para otimizar o *tracking* ocular, e uso expressivo de *white space*.
*   **Modo Noturno Adaptativo:** O modo escuro não apenas inverte cores, mas aumenta levemente a fonte base (de `20px` para `22px`) e a altura da linha, adaptando-se para uma experiência de leitura prolongada com menos fadiga visual.

## 3. Regras de Uso de Componentes

### Cards (Cartões de Conteúdo)

Usados predominantemente em grids (`.grid`) na Home e em listagens.
*   **Estrutura:** Devem possuir borda sutil (`--border-light`), fundo de card (`--bg-card`) e raio de `12px`.
*   **Interação:** No hover, a borda escurece (`--border-card`), a sombra aumenta (`--shadow-card-hover`) e o card translada levemente no eixo Y (`transform: translateY(-2px)`).
*   **Conteúdo Interno:**
    *   Títulos em `Playfair Display` (`20px`, peso `600`).
    *   Descrições e meta-dados (data, tags) utilizam a fonte de interface (`Source Sans 3`) na cor `--text-secondary`.

### Featured Posts (Thumbnails na Home)

Para o componente principal da Home (`.post-card-home`).
*   **Proporção de Imagem:** `16/9`.
*   **Fallback de Imagem:** Caso o post não tenha capa (`heroImage`), deve-se usar um `.post-thumb-fallback-home` com degradê direcional (`135deg`) usando as cores do gradiente de fundo (`--bg-gradient-start` para `--bg-gradient-end`).
*   **Animação:** A imagem interna da thumb deve ter um leve zoom (`transform: scale(1.03)`) ao passar o mouse.

### Tags e Metadados (Pills)

Usados para classificar posts (categorias, locais).
*   **Estilo Visual:** Formato pílula (`border-radius: 16px`), fundo claro contrastante (`--tag-bg`) e fonte de UI pequena (`13px`).
*   **Interação:** Mudança sutil de fundo e borda no hover para indicar clicabilidade (se aplicável) ou apenas refinamento visual.

### Botões e CTAs (Call to Actions)

Utilizados para ações primárias, como "Ler os textos" ou "Baixar livro".
*   **Primários (`.cta`):** Fundo sólido (`--accent-primary`), texto branco, bordas arredondadas máximas (`--radius-button: 24px`). Devem elevar-se (`transform: translateY(-1px)`) no hover, escurecendo o fundo (`--accent-hover`).
*   **Secundários / Outline (`.cta-outline`):** Fundo transparente, borda e texto na cor de destaque (`--accent-primary`). No hover, o fundo preenche com a cor de destaque e o texto fica branco.
*   **Ícones de Ação (`.icon-btn`):** (ex: Busca, Modo Leitura no Header). Uso do padrão "ghost button" com borda fina (`--border-light`), fundo translúcido (usando `rgba` sobre fundo claro ou escuro) para não pesar na navegação principal.

### Navegação (Header)

*   **Comportamento Sticky:** O header deve grudar ao topo (`position: sticky; top: 0;`).
*   **Estado *Scrolled*:** Ao rolar a página, o header ganha um `backdrop-filter: blur(10px)`, cor de fundo com opacidade (`rgba(253, 240, 226, 0.88)` no light mode) e uma leve sombra (`--shadow-navbar`) para se destacar do conteúdo da página.
*   **Links (`.nav-links a`):** Padding confortável (`10px 8px`), cantos arredondados (`10px`). O link ativo (`.active`) deve ter um sublinhado espesso (`2px`) com offset (`6px`) na cor `--accent-primary`.

---
*Nota: Qualquer nova implementação deve consultar estes tokens antes de introduzir novos valores CSS hardcoded, mantendo a coesão do design system.*