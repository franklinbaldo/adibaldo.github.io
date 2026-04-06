with open("src/styles/global.css", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove transforms
content = content.replace('\ttransform: translateY(-3px);\n', '')
content = content.replace('\ttransform: translateY(-1px);\n', '')

# 2. Text decoration thickness
content = content.replace('text-decoration-thickness: 1px;', 'text-decoration-thickness: 2px;', 1)

# 3. Append new styles
new_styles = """
/* Text lists for post summaries */
.post-text-list { list-style-type: none; padding-left: 0; }
.post-text-list-item { margin-bottom: var(--space-lg); }
.post-text-meta { margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 0.9em; }
.post-text-link { font-weight: 600; text-decoration: underline; color: var(--text-primary); }
.post-text-link:hover { color: var(--accent-primary); }
.post-text-desc { margin-bottom: 1.5rem; color: var(--text-secondary); }

/* Featured text post */
.featured-text-item { margin-bottom: var(--space-lg); }
.featured-text-title { font-family: var(--font-title); font-weight: 600; font-size: clamp(22px, 3vw, 32px); margin: var(--space-sm) 0 var(--space-xs) 0; line-height: 1.25; }

/* Utilities */
.hidden { display: none !important; }
"""

content += new_styles

with open("src/styles/global.css", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
