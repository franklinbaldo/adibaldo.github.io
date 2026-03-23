# Design System: Alfarrábios do Adi

Este documento especifica a linguagem visual do blog *Alfarrábios do Adi*. O design busca o equilíbrio entre o minimalismo moderno e a estética clássica de uma revista literária, com tons quentes que remetem a papel, madeira e leitura de varanda.

## Estética Geral
O blog é desenhado para *respirar*. A tipografia é o elemento principal, com grande foco em legibilidade e hierarquia. A paleta de cores é suave, evitando brancos puros ou negros chapados, preferindo tons de creme, sépia e marrom acinzentado.

- **Tons:** Cremes e pergaminhos para fundo, tons de terra para ênfase.
- **Minimalismo:** Layout sem ruído, foco no conteúdo.
- **Tipografia:** Serifada clássica para texto longo, sem serifa limpa para UI.

---

## Design Tokens

### Cores
| Token | Cor | Uso |
| :--- | :--- | :--- |
| `--bg-primary` | `#faf5ef` | Fundo principal (creme suave) |
| `--bg-card` | `#fffdf9` | Fundo de cartões/componentes |
| `--text-primary` | `#2c2420` | Texto principal (marrom escuro) |
| `--text-secondary` | `#6b5b4f` | Texto secundário (sépia claro) |
| `--accent-primary` | `#b87942` | Ações principais, links, CTAs |
| `--accent-gold` | `#c4a265` | Detalhes decorativos (dourado queimado) |
| `--border-light` | `#e8ddd0` | Bordas sutis |

### Tipografia
- **Títulos (`--font-title`):** *Playfair Display* (Serifada, dramática, elegante).
- **Corpo (`--font-body`):** *Source Serif 4* (Serifada, alta legibilidade).
- **UI (`--font-ui`):** *Source Sans 3* (Sem serifa, neutra).

### Espaçamento
Escala baseada em múltiplos:
- `xs` (4px), `sm` (8px), `md` (16px), `lg` (24px), `xl` (40px), `2xl` (64px), `3xl` (96px).

---

## Componentes e Regras

### Navegação (Header)
- **Comportamento:** *Sticky*, com efeito de desfoque (blur) ao rolar.
- **Interatividade:** Botão de alternância (Sol/Lua) para alternar entre modo claro (creme) e modo escuro (tom de carvão).
- **Links:** Sublinhados sutis ao passar o mouse.

### Cartões de Post (Cards)
- **Estrutura:** Imagem de destaque (ratio 3:2), título serifado, descrição, meta-dados (data/tags).
- **Interatividade:** Efeito de elevação (`transform: translateY(-3px)`) e sombra sutil ao passar o mouse.
- **Featured Card:** Card com sobreposição de gradiente (`linear-gradient(0deg, rgba(20, 16, 12, 0.82)...)`) e texto branco para maior impacto visual.

### Botões (CTA)
- **Estilo:** Bordas arredondadas (`--radius-button: 24px`).
- **Ação:** Cores de destaque (marrom acobreado), com transição suave na cor de fundo e leve deslocamento ao clicar.

### Acessibilidade
- Modo de leitura escuro ajusta o tamanho da fonte (`22px`) e entrelinhamento (`1.85`) para reduzir o cansaço visual.
- Foco dos elementos (`:focus-visible`) tem contorno de `3px solid var(--accent-primary)`.

