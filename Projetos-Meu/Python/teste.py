#Jogo pro Teacher Felipe
print("\n")
print("\n")

#Titulo

print("***************************************************")
print("**                                               **")
print("**              Sobrevivencia RPG                **")
print("**    Feito por: Davi Oliveira, Davi de Sousa    **")
print("**    Gabriel Messias, Henrique Mozart, Lucas    **")
print("**              Valmir e Wellingtom              **")
print("**                                               **")
print("**                                               **")
print("***************************************************")

pausa=input("\n")

#pular linhas

print("\n")
print("\n")
print("\n")

#pegar o nome do usuário

nome=input("Digite seu nome: ")

print("\n")

#introdução

print("Um certo dia, você e amigos decidem acampar em uma floresta que betas diziam ser assombrada no interior de Pau dos Ferros - (RN)")
pausa=input("\n")
print("Vocês chegam por volta das 18:00, e adentram a floresta, vocês andam e encontrar um local até que, bem preservado, e decidem passar a noite ali")
pausa=input("\n")
print("Um certo tempo passa, vocês montam as barracas, fazem uma fogueira e decidem sentar em volta dela")

pausa=input("\n")

print("\n")
print("\n")
print("\n")

#dialogo

print("-Cês ficaram sabendo? - Bryan")
pausa=input("\n")
print("-O que? - ", (nome))
pausa=input("\n")
print("-Conta ai! - Junior")
pausa=input("\n")
print("-Fala logo, to começando a ficar com medo dessa floresta. - Layd")
pausa=input("\n")
print("-Falam que 5 pessoas morreram aqui, nesta floresta! - Bryan")
pausa=input("\n")
print("-Ai, fala sério, isso é historia pra boi dormir - ", (nome))
pausa=input("\n")
print("-Para com isso, ou a Layd vai ter pesadelos a noite inteirinha - Junior")
pausa=input("\n")
print("-Para Junior, você sabe que eu sou medrosa pra esse tipo de coisa.. - Layd")
pausa=input("\n")
print("-Tanto que eu quase não vim hoje, só vim pra vocês não ficarem sozinhos... - Layd")
pausa=input("\n")
print("-Ah, para de graça gente, isso não deixa vocês com medo de dormir aqui? - Bryan")
pausa=input("\n")
print("-Nem um pouco.. - ", (nome))
pausa=input("\n")

print("\n")
print("\n")
print("\n")

print("Um tempo passa, vocês contam historias, cantam musicas em volta da fogueira e decidem que é hora de ir dormir.")
pausa=input("\n")

print("\n")
print("\n")
print("\n")

print("A partir de agora, você fara escolhas que podem ou não, mudar o final que você ira tomar.")

pausa=input("\n")

print("\n")
print("\n")
print("\n")

print("Você acorda no meio da noite com vontade de fazer xixi.")

print('\n')
pausa=input("\n")

print("Você levanta para fazer xixi?")

pausa=input("\n")

print("1 - Levantar")
print("2 - Voltar a dormir")

print("\n")

opcoes = int(input("Digite a resposta: "))

pausa=input("\n")

if opcoes == 1:
    print("Você levanta e vai fazer xixi atrás de uma árvore.")
    pausa=input("\n")
    print("\n")
    pausa=input("\n")
    print("*creck*")
    pausa=input("\n")
    print("\n")
    pausa=input("\n")
    print("Você escuta um barulho, como se um galho tivesse sido pisado.")
    pausa=input("\n")
    print("\n")
    pausa=input("\n")
    print("Você vai verificar?")
    print("\n")
    print("1 - Verificar o barulho")
    print("2 - Ignorar o barulho")
    pausa=input("\n")

    verificar=int(input("Escolha a alternativa: "))
    if verificar == 1:
        print("Você foi verificar.")
        pausa=input("\n")
        print("\n")
        print("Você encontra um ")
        
    elif verificar == 2:
        print("Você ignorou e voltou para a barraca.")
elif opcoes == 2:
    print("Você decide voltar a dormir.")
    print("Final 1- Você mijou na cama, agora seus amigos te zoam pelo resto da vida. Otário")
    exit()

else:
    print("Opção inválida. Te dei 2 opções, você é burro?")
