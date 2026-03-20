# DESIGN.md — Alfarrabios do Adi

Guia de estilo visual do blog. Documento vivo — atualizar sempre que o design evoluir.

---

## Essencia

O blog e uma **estante de alfarrabios**: intimo, literario, artesanal. O design deve ser
silencioso para que a voz do Adi fale mais alto. Menos e mais.

**Palavras-chave:** nostalgia, pergaminho, respiro, elegancia discreta, revista literaria.

---

## Paleta de cores

### Modo claro (padrao)

| Token                | Valor       | Uso                               |
|----------------------|-------------|-----------------------------------|
| `--bg-primary`       | `#faf5ef`   | Fundo principal (creme suave)     |
| `--bg-gradient-start`| `#f0dfc8`   | Inicio do gradiente hero          |
| `--bg-gradient-end`  | `#faf5ef`   | Final do gradiente hero           |
| `--bg-card`          | `#fffdf9`   | Fundo dos cards                   |
| `--text-primary`     | `#2c2420`   | Texto principal                   |
| `--text-secondary`   | `#6b5b4f`   | Texto secundario (marrom quente)  |
| `--text-muted`       | `#9b8b7f`   | Texto discreto (metadados)        |
| `--accent-primary`   | `#b87942`   | Links, botoes, destaque           |
| `--accent-hover`     | `#a06834`   | Hover de links/botoes             |
| `--accent-gold`      | `#c4a265`   | Bordas decorativas, perfil, selos |
| `--tag-bg`           | `#f3ece3`   | Fundo das tags                    |
| `--border-light`     | `#e8ddd0`   | Bordas leves                      |
| `--border-card`      | `#d4c4b0`   | Bordas de card (hover)            |

### Modo escuro (leitura noturna)

| Token                | Valor                           |
|----------------------|---------------------------------|
| `--bg-primary`       | `#1a1a1a`                       |
| `--bg-card`          | `#221f1a`                       |
| `--text-primary`     | `#e8ddd0`                       |
| `--text-secondary`   | `#cbbcab`                       |
| `--accent-gold`      | `#c4a265` (mantem)              |

**Principio:** tons quentes e abafados. Nada de azul frio. Tudo remete a papel envelhecido
e couro gasto.

---

## Tipografia

Tres familias, cada uma com papel definido. Todas auto-hospedadas em `/public/fonts/`.

| Familia             | Variavel        | Uso                      | Pesos disponiveis       |
|---------------------|-----------------|--------------------------|-------------------------|
| **Playfair Display**| `--font-title`  | Titulos (h1, h2, h3)    | 600, 700, 900           |
| **Source Serif 4**  | `--font-body`   | Corpo do texto, prosa    | 400, 400i, 600, 700     |
| **Source Sans 3**   | `--font-ui`     | Navegacao, botoes, meta  | 400, 500, 600           |

### Hierarquia

| Elemento  | Familia          | Peso | Tamanho                       |
|-----------|------------------|------|-------------------------------|
| h1        | Playfair Display | 700  | `clamp(36px, 5.5vw, 64px)`   |
| h2        | Playfair Display | 600  | `clamp(22px, 2.8vw, 28px)`   |
| h3        | Playfair Display | 600  | `clamp(18px, 2.2vw, 22px)`   |
| body      | Source Serif 4   | 400  | 20px / line-height 1.75      |
| .meta     | Source Sans 3    | 400  | herdado                       |
| .cta      | Source Sans 3    | 500  | 14px, letter-spacing 0.02em  |
| .tag      | Source Sans 3    | 400  | 13px                          |

**Principio:** pesos leves e refinados. Evitar bold exagerado. A tipografia deve lembrar
uma revista literaria de alto nivel, nao um jornal.

---

## Espacamento

| Token          | Valor  | Uso                       |
|----------------|--------|---------------------------|
| `--space-xs`   | 4px    | Gaps minimos              |
| `--space-sm`   | 8px    | Gaps internos de card     |
| `--space-md`   | 16px   | Padding padrao            |
| `--space-lg`   | 24px   | Separacao entre secoes    |
| `--space-xl`   | 40px   | Padding de secao          |
| `--space-2xl`  | 64px   | Hero, footer              |
| `--space-3xl`  | 96px   | Separacoes grandes        |

**Principio:** respiro generoso. O leitor nunca deve sentir que o texto esta apertado.
Pensar como livro, nao como feed.

---

## Layout

| Token              | Valor   | Uso                          |
|--------------------|---------|------------------------------|
| `--container-max`  | 1120px  | Largura maxima do conteudo   |
| `--reading-max`    | 720px   | Largura maxima para prosa    |

**Grid principal:** 4 colunas -> 2 (980px) -> 1 (620px).

---

## Componentes

### Cards (`.card`)

- Fundo: `--bg-card`
- Borda: 1px `--border-light`, radius 10px
- Sombra: sutil, quase imperceptivel em repouso
- Hover: elevacao de 3px, sombra mais pronunciada
- **Sensacao alvo:** capa de livro fisico

### Featured Article (`.featured-card`)

- Imagem atmosferica ocupando todo o card
- Texto sobreposto com gradiente escuro de baixo para cima
- Tipografia serif clara (Playfair Display 600) sobre a imagem
- Tags com fundo translucido e backdrop-blur

### Navigation Pills (`.nav-pill`)

- Forma horizontal tipo "pilula"
- Icone SVG minimalista (stroke-width 1.5, 18x18)
- Borda e sombra leves, hover com cor de destaque
- **Nao** usar grid de icones — preferir lista horizontal

### Tags (`.tag`)

- Formato pilula (border-radius 16px)
- Fundo discreto, borda leve
- Fonte Source Sans 3, 13px

### Botoes CTA (`.cta`)

- Border-radius generoso (24px)
- Peso de fonte 500 (nao bold)
- Cor solida com accent-primary
- Variante outline para acao secundaria

---

## Iconografia

- **Estilo:** linhas finas (stroke-width 1.2 no header, 1.5 nos demais)
- **Sensacao alvo:** selos vintage, minimalista, elegante
- **Formato:** SVG inline, sem fill, apenas stroke
- **Tamanho padrao:** 18-20px
- **Nunca** usar icones pesados ou preenchidos

---

## Imagens

- **Estilo:** autenticas, atmosfericas, pessoais
- **Evitar:** fotos de banco de imagem genericas
- **Sensacao alvo:** foto tirada por alguem que estava la, nao por um fotografo profissional
- **Aspect ratio dos thumbnails:** 3:2 (post cards)
- **Featured:** imagem de largura total com overlay de texto
- **Perfil:** circular com borda fina em ouro (`--accent-gold`)

---

## Texturas

- Fundo principal: cor solida (creme)
- Secoes especiais: gradiente radial sutil (`section-textured`)
  - Dois pontos de luz difusa (ouro e cobre) com opacidade de 3-4%
  - Nao deve ser perceptivel conscientemente — apenas "sentido"
- **Nunca** usar texturas pesadas ou patterns repetitivos

---

## Elementos decorativos

### Ornament divider (`.ornament-divider`)

- Caracteres tipograficos simples (travessao, losangos)
- Opacidade baixa (0.4), centralizado
- Usado entre secoes para criar pausa visual

### Quill (`.about-quill`)

- SVG delicado, 48px de largura
- Opacidade 0.35 — funciona como "assinatura", nao como ilustracao
- Aparece apenas na pagina Sobre

---

## Modo escuro

- Ativado por toggle no header (localStorage: `alfarrabios_mode`)
- Fonte aumenta para 22px com line-height 1.85 (mais conforto noturno)
- Sombras mais profundas para compensar fundo escuro
- Header com blur e transparencia ajustada

---

## Acessibilidade

- `focus-visible`: outline de 3px na cor accent
- Links com underline de 1px e offset de 3px
- `scroll-padding-top: 80px` para compensar header sticky
- Icones decorativos com `aria-hidden="true"`
- Labels em todos os botoes e links de navegacao
- `prefers-reduced-motion`: respeitar (TODO)

---

## Decisoes de design registradas

| Data       | Decisao                                                    |
|------------|------------------------------------------------------------|
| 2023-10-26 | Paleta migrada de amarelo (#fdf0e2) para creme (#faf5ef)  |
| 2023-10-26 | h1 de peso 900 para 700 — mais leve e refinado            |
| 2023-10-26 | Hero kicker mudou de sans-serif para serif italico         |
| 2023-10-26 | Adicionado featured card com overlay de gradiente          |
| 2023-10-26 | Navegacao migrada de grid para pills horizontais           |
| 2023-10-26 | Perfil na pagina Sobre recebeu borda ouro                  |
| 2023-10-26 | Icones do header: stroke-width de 1.5 para 1.2            |
| 2023-10-26 | Adicionado quill SVG como assinatura na pagina Sobre       |

---

## Fases futuras (fora do escopo atual)

- Depoimentos de leitores
- Cartas de leitores
- Galeria de fotos de lugares marcantes
- Indice de categorias como livro antigo
- Album de fotos de viagens
- Style guide formal com componentes interativos
