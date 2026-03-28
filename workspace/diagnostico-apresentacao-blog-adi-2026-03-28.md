# Diagnóstico de Apresentação Editorial (Blog Presentation)

**Data:** 28 de março de 2026
**Site:** adibaldo.github.io

## Sumário
1. [Página inicial](#1-página-inicial)
2. [Lista de posts](#2-lista-de-posts)
3. [Página de post individual](#3-página-de-post-individual)
4. [Categorias e Tags](#4-categorias-e-tags)
5. [Página Sobre/Autor](#5-página-sobreautor)
6. [Footer](#6-footer)
7. [Compartilhamento](#7-compartilhamento)
8. [Comentários](#8-comentários)
9. [Newsletter/CTA](#9-newslettercta)
10. [Breadcrumbs](#10-breadcrumbs)
11. [Tabela de Melhorias](#11-tabela-de-melhorias)

---

## 1. Página inicial
**Análise:**
A página inicial (`src/pages/index.astro`) possui uma hierarquia editorial clara. O post mais recente é destacado em uma seção própria (`featured-card`), exibindo a capa em destaque, título, resumo, data e tags. Logo abaixo, a seção "Últimas prosas" apresenta um grid com os demais posts, permitindo carregamento paginado ("Carregar mais").
**Veredito:** Bem estruturada e cumpre bem o papel de destacar conteúdo relevante.

## 2. Lista de posts
**Análise:**
A lista principal de textos (`src/pages/blog/index.astro`) utiliza cards (`post-card`) limpos que mostram a imagem de capa (com um fallback gradiente caso não exista), título, descrição (preview de conteúdo) e a data da publicação. As tags e locais (`placeLabel`) são exibidos de forma sucinta sobre os cards.
**Ponto de atenção:** O **tempo de leitura** não é exibido nos cards da listagem, embora seja calculado internamente no post individual.
**Veredito:** Apresentação elegante, porém a adição do tempo de leitura nos cards ajudaria na decisão de clique do leitor.

## 3. Página de post individual
**Análise:**
A apresentação de leitura no post individual (`src/layouts/BlogPost.astro`) é excelente para textos longos, empregando a classe `.markdown-livro` que utiliza fontes serifadas (`Merriweather`, `Georgia`) e estrutura tipográfica de literatura clássica.
- **Imagem hero:** Destacada no topo com boa adaptação para mobile.
- **Autor:** O nome do autor (Adi Baldo) não aparece explicitamente na interface da página (apenas implicitamente, já que é um blog pessoal) e nos metadados estruturados (JSON-LD).
- **Data e Tags:** Exibidas claramente no cabeçalho do post (junto com o local e o tempo de leitura).
- **Navegação:** Há links claros de "Anterior" e "Próximo" ao fim do texto para facilitar a continuidade da leitura.
**Veredito:** Foco impecável na legibilidade. A falta de exibição explícita do autor pode ser justificada pelo estilo de blog pessoal, mas é algo a se notar.

## 4. Categorias e Tags
**Análise:**
As tags são funcionais e úteis. Na página de Textos (`/blog`), há uma área "Explorar por temas" que exibe de forma clara todas as tags (assuntos) cadastradas. Elas se comportam como links e filtram adequadamente.
**Veredito:** Estão bem apresentadas através do padrão visual de "pills" (classe `.tag`). São úteis para agrupar as memórias por contextos temáticos.

## 5. Página Sobre/Autor
**Análise:**
A página sobre o autor existe (`src/pages/sobre.astro`) e está bem estruturada. Traz uma foto de perfil clara, uma breve introdução ("Quem é o Adi"), explicando a identidade de um advogado aposentado contador de causos, além de ícones diretos de contato (GitHub e RSS).
**Veredito:** O tom da página conversa muito bem com a estética editorial de 'Alfarrábios'. Está ótima.

## 6. Footer
**Análise:**
O footer (`src/components/Footer.astro`) é minimalista. Contém o copyright do ano atual, um link pro feed RSS e outro para o repositório no GitHub.
**Ponto de atenção:** Faltam links de redes sociais voltados ao público leitor convencional (como Instagram ou X/Twitter), embora o link do GitHub combine com a premissa de que o blog é versionado e aberto.
**Veredito:** Atende o básico. Pode-se repensar se o projeto necessita de mais presença social.

## 7. Compartilhamento
**Análise:**
O blog possui botões de compartilhamento nativos no rodapé dos posts individuais. Eles permitem enviar os links via **WhatsApp** e **Telegram**.
**Veredito:** Perfeito para o público-alvo e para leitores brasileiros, onde essas duas redes dominam a troca de links rápidos e causos entre conhecidos.

## 8. Comentários
**Análise:**
Existe um sistema de comentários ativado (o componente `<Giscus />`). Giscus utiliza as Discussions do GitHub.
**Veredito:** É uma solução muito prática (sem custo, sem banco de dados extra). Vale a pena manter se o público que consome e interage já for tecnicamente adaptado a ter uma conta no GitHub, mas pode afastar leitores comuns de deixarem mensagens.

## 9. Newsletter/CTA
**Análise:**
Não há nenhum formulário de captura de e-mails ou chamada para ação para newsletters. Na página inicial, as únicas CTA são "Ler os textos" e "Abrir livro para imprimir".
**Veredito:** Se o objetivo for apenas um repositório orgânico, está bom. Caso haja intenção de criar uma audiência fiel, a ausência de uma newsletter (ou Substack) é uma oportunidade de melhoria.

## 10. Breadcrumbs
**Análise:**
Os breadcrumbs existem estruturalmente como dados ocultos (`JSON-LD` injetados nas tags `<script>`), sendo extremamente úteis para SEO. Porém, **não há breadcrumbs visuais** na interface do usuário durante a navegação (como `Início > Textos > Post`).
**Veredito:** Útil para as ferramentas de busca. Adicionar breadcrumbs visuais poderia melhorar um pouco a navegação, embora não seja estritamente necessário num site com hierarquia tão plana.

---

## 11. Tabela de Melhorias

| Melhoria Proposta | Prioridade | Esforço | Impacto Editorial |
| :--- | :---: | :---: | :---: |
| **Exibir "Tempo de Leitura" nos cards de listagem de posts**<br><small>Ajudará o leitor a escolher entre um "causo rápido" ou "memória longa" direto na home/blog.</small> | Média | Baixo | Alto |
| **Adicionar Breadcrumbs Visuais nas páginas internas**<br><small>Ajuda o leitor a voltar rapidamente para a lista completa ou home.</small> | Baixa | Médio | Médio |
| **Implementar formulário de Newsletter / Inscrição de E-mail**<br><small>Construir audiência de leitores fiéis ao estilo crônica/livro.</small> | Alta | Alto | Alto |
| **Avaliar sistema de comentários secundário ou alternativa ao Giscus**<br><small>Giscus exige conta no GitHub. Leitores comuns podem desistir de interagir.</small> | Média | Alto | Médio |
| **Incluir mais links sociais ou "Contato" no Footer**<br><small>Facilitar que leitores enviem um e-mail direto pro "Adi" além de PR no GitHub.</small> | Baixa | Baixo | Baixo |
| **Exibir nome do autor sutilmente nos posts (Opcional)**<br><small>Pode reforçar a marca "Escrito por Adi" para quem chega via links diretos.</small> | Baixa | Baixo | Baixo |
