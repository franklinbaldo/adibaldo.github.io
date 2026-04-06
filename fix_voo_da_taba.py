with open("src/content/blog/voo-da-taba.md", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("date: 2026-03-29", "pubDate: 2026-03-29\ndescription: A lembrança do meu voo rumo a Rondônia.")

with open("src/content/blog/voo-da-taba.md", "w", encoding="utf-8") as f:
    f.write(content)
