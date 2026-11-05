from PIL import Image

def exibir_imagem_no_terminal(caminho_imagem, largura=80):
    # Caracteres ordenados por densidade visual
    CARACTERES = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", "."]
    
    try:
        img = Image.open(caminho_imagem)
    except Exception as e:
        print(f"Erro ao carregar imagem: {e}")
        return

    # Redimensiona mantendo a proporção (ajustando a altura para a fonte do terminal)
    largura_orig, altura_orig = img.size
    proporcao = altura_orig / largura_orig
    altura = int(largura * proporcao * 0.5)
    img = img.resize((largura, altura))

    # Converte para escala de cinza
    img = img.convert("L")

    # Mapeia cada pixel para um caractere
    pixels = img.getdata()
    texto = "".join([CARACTERES[pixel // 25] for pixel in pixels])

    # Divide o texto em linhas para formar a imagem
    for i in range(0, len(texto), largura):
        print(texto[i:i + largura])

# Altere 'foto.jpg' para o nome exato do seu arquivo de imagem
exibir_imagem_no_terminal("foto.jpg")