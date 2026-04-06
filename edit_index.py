import re

with open("src/pages/index.astro", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace text
content = content.replace(
    "Um canto pra juntar lembranças e reflexões, sem barulho. Texto bom é texto que respira.",
    "Arquivos de memórias e contos, focados em texto."
)

# 2. Replace featured card
content = re.sub(
    r'<article class="featured-card" style="position: relative;">\s*<a href=\{`/blog/\$\{featuredPost\.id\}/\`\} style="position: absolute; inset: 0; z-index: 0;" aria-label=\{`Ler post: \$\{featuredPost\.data\.title\}`\}></a>\s*\{featuredPost\.data\.heroImage \? \(\s*<Image\s*class="featured-card-bg"\s*src=\{featuredPost\.data\.heroImage\}\s*alt=\{featuredPost\.data\.heroImageAlt \|\| `Capa do post \$\{featuredPost\.data\.title\}`\}\s*widths=\{\[600, 1200\]\}\s*sizes="\(max-width: 620px\) 100vw, 1120px"\s*loading="eager"\s*fetchpriority="high"\s*/>\s*\) : \(\s*<div class="featured-card-bg" style="background: linear-gradient\(135deg, var\(--bg-gradient-start\), var\(--bg-gradient-end\)\);" />\s*\)\}\s*<div class="featured-card-overlay">\s*<div class="tag-row" style="position: relative; z-index: 1;">\s*\{featuredPost\.data\.tags\?\.slice\(0, 2\)\.map\(\(t\) => \(\s*<a href=\{`/tags/\$\{t\}`\} class="tag" style="text-decoration: none;">\{t\}</a>\s*\)\)\}\s*</div>\s*<h3 style="position: relative; z-index: 1;"><a href=\{`/blog/\$\{featuredPost\.id\}/\`\} style="color: inherit; text-decoration: none;">\{featuredPost\.data\.title\}</a></h3>\s*<p>\{featuredPost\.data\.description\}</p>\s*<p class="meta" style="position: relative; z-index: 1;">\s*<FormattedDate date=\{featuredPost\.data\.pubDate\} />\s*<span>&bull;</span>\s*<span class="reading-time">\{Math\.max\(1, Math\.round\(\(\(featuredPost\.body\?\.split\(/\\s\+/\)\.length \|\| 0\)\) / 200\)\)\} min de leitura</span>\s*</p>\s*</div>\s*</article>',
    """<div class="featured-text-item"><h3 class="featured-text-title"><a href={'/blog/' + featuredPost.id + '/'}>{featuredPost.data.title}</a></h3><p>{featuredPost.data.description}</p></div>""",
    content,
    flags=re.MULTILINE
)

# 3. Replace list wrapper
content = content.replace(
    '<div class="grid post-grid-home" id="post-grid">',
    '<ul id="post-grid" class="post-text-list">'
)

content = content.replace(
    '</div>\n\n					{recentPosts.length >= INITIAL_COUNT && (',
    '</ul>\n\n					{recentPosts.length >= INITIAL_COUNT && ('
)


# 4. Replace article items in recent posts
# We will use a more robust regex that just replaces the `<article class="card post-card-home"...> ... </article>` block
# within the `{recentPosts.map((post, i) => (` block.

pattern = re.compile(r'<article\s+class="card post-card-home"\s+data-index=\{i\}\s+style=\{i >= INITIAL_COUNT - 1 \? \'display:none; position: relative;\' : \'position: relative;\'\}\s*>.*?</article>', re.DOTALL)

replacement = """<li class={['post-text-list-item', i >= INITIAL_COUNT - 1 ? 'hidden' : '']} data-index={i}><p class="post-text-meta"><FormattedDate date={post.data.pubDate} /> - <a href={'/blog/' + post.id + '/'} class="post-text-link">{post.data.title}</a></p><p class="post-text-desc">{post.data.description}</p></li>"""

content = pattern.sub(replacement, content)

with open("src/pages/index.astro", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
