print("=" * 50)
print("        A FLORESTA SOMBRIA")
print("=" * 50)

print("\nVocê é um aventureiro em busca de um artefato lendário.")
print("Ao entrar na floresta, encontra uma bifurcação.")

c1 = input("\n1 - Ir pela esquerda\n2 - Ir pela direita\nEscolha: ")

if c1 == "1":

    print("\nVocê encontra uma cabana abandonada.")
    c2 = input("1 - Entrar\n2 - Ignorar\nEscolha: ")

    if c2 == "1":

        print("\nDentro da cabana há um baú e uma escada para o porão.")
        c3 = input("1 - Abrir o baú\n2 - Descer ao porão\nEscolha: ")

        if c3 == "1":
            print("\n🏆 FINAL 1")
            print("Você encontrou o artefato lendário e ficou rico!")

        elif c3 == "2":
            print("\n💀 FINAL 2")
            print("Um monstro estava escondido no porão.")
            print("Você foi derrotado.")

        else:
            print("\nEscolha inválida.")

    elif c2 == "2":

        print("\nVocê continua andando e encontra um rio.")
        c3 = input("1 - Atravessar\n2 - Voltar\nEscolha: ")

        if c3 == "1":
            print("\n🌊 FINAL 3")
            print("A correnteza era muito forte.")
            print("Você foi levado pelo rio.")

        elif c3 == "2":
            print("\n🏕️ FINAL 4")
            print("Você conseguiu voltar para casa em segurança.")

        else:
            print("\nEscolha inválida.")

    else:
        print("\nEscolha inválida.")

elif c1 == "2":

    print("\nVocê encontra uma caverna.")
    c2 = input("1 - Entrar\n2 - Fugir\nEscolha: ")

    if c2 == "1":

        print("\nHá um dragão dormindo.")
        c3 = input("1 - Atacar\n2 - Roubar o tesouro silenciosamente\nEscolha: ")

        if c3 == "1":
            print("\n🔥 FINAL 5")
            print("O dragão acordou e derrotou você.")

        elif c3 == "2":
            print("\n👑 FINAL 6")
            print("Você roubou o tesouro e escapou sem ser visto!")

        else:
            print("\nEscolha inválida.")

    elif c2 == "2":
        print("\n🚪 FINAL 7")
        print("Você desistiu da aventura e voltou para casa.")

    else:
        print("\nEscolha inválida.")

else:
    print("\nEscolha inválida.")