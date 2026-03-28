from PIL import Image

# Criar a imagem base 1200x630 (Tamanho recomendado para OG)
bg_color = (250, 245, 235) # cor neutra de fundo, similar a pergaminho
img = Image.new('RGB', (1200, 630), color=bg_color)

# Abrir o logo para colar no centro
try:
    logo = Image.open('public/logo-style-3.png')
    # O logo tem 1024x1024, vamos redimensionar para algo menor, ex: 500x500
    logo.thumbnail((500, 500), Image.Resampling.LANCZOS)

    # Calcular posicao central
    x = (1200 - logo.width) // 2
    y = (630 - logo.height) // 2

    # Se o logo for RGBA (com transparencia), usar como mascara
    if logo.mode == 'RGBA':
        img.paste(logo, (x, y), logo)
    else:
        img.paste(logo, (x, y))

    img.save('public/og-home.png')
    print("Imagem public/og-home.png gerada com sucesso.")
except Exception as e:
    print(f"Erro ao gerar imagem: {e}")
