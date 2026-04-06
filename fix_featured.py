import re

with open("src/pages/index.astro", "r", encoding="utf-8") as f:
    content = f.read()

pattern = re.compile(r'<article class="featured-card".*?</article>', re.DOTALL)
replacement = """<div class="featured-text-item"><h3 class="featured-text-title"><a href={'/blog/' + featuredPost.id + '/'} style="color: inherit; text-decoration: none;">{featuredPost.data.title}</a></h3><p>{featuredPost.data.description}</p></div>"""
content = pattern.sub(replacement, content)

with open("src/pages/index.astro", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
