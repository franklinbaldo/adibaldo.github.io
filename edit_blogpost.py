import re

with open("src/layouts/BlogPost.astro", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove progress container
content = content.replace('\t\t<div id="progress-container">\n\t\t\t<div id="progress-bar"></div>\n\t\t</div>\n', '')


# 2. Remove share section
share_section_pattern = re.compile(r'<section class="share-section".*?</section>', re.DOTALL)
content = share_section_pattern.sub('', content)


# 3. Simplify related posts
related_posts_pattern = re.compile(r'<div class="grid" style="grid-template-columns: repeat\(auto-fill, minmax\(280px, 1fr\)\); gap: var\(--space-lg\);">.*?</div>\n\t\t\t\t\t</section>', re.DOTALL)
related_posts_replacement = """<ul class="post-text-list">
							{relatedPosts.map(post => (
								<li class="post-text-list-item"><a href={'/blog/' + post.id + '/'} class="post-text-link">{post.data.title}</a> - <FormattedDate date={post.data.pubDate} /></li>
							))}
						</ul>
					</section>"""
content = related_posts_pattern.sub(related_posts_replacement, content)

with open("src/layouts/BlogPost.astro", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
