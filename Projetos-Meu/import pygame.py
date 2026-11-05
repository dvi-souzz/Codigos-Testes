import pygame
import sys

#inicializa o pygame
pygame.init()

# configurações da janela
Largura = 1280
Altura = 720
FPS = 60

tela=pygame.display.set_mode((Largura, Altura))
pygame.display.set_caption("Jogo da forca")

#relogio para controlar o FPS
relogio=pygame.time.Clock()

#cores
preto = (0, 0, 0)
branco = (255, 255, 255)

'''
Variaveis do jogo
'''

rodando=True


#Loop principal
while rodando:
    #eventos
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            rodando=False

#teclas pressionadas
teclas=pygame.key.get_pressed()
if teclas[pygame.K_ESCAPE]:
        rodando=False


#atualização do jogo

#movimento
#fisica
#colisões
#pontuação
#- etc.

