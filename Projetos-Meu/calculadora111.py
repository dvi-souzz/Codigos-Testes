from tkinter import *
def calcular():
    try:
        n1 = int(entrada1.get())
        n2 = int(entrada2.get())
        op = operacao.get()

        if op == "1":
            resultado = n1 + n2
        elif op == "2":
            resultado = n1 - n2
        elif op == "3":
            resultado = n1 * n2
        elif op == "4":
            if n2 == 0:
                resultado_label.config(text="Erro: Burro, Zero não divide")
                return
            resultado = n1 / n2
        else:
            resultado_label.config(text="Operação inválida")
            return

        resultado_label.config(text=f"Resultado: {resultado}")

    except ValueError:
        resultado_label.config(text="Digite apenas números")

janela = Tk()
janela.title("Calculadora Bem Bigodexxx")
janela.geometry("350x400")
janela.configure(bg="pink")
janela.resizable(False, False)
largura = 350
altura = 400

x = (janela.winfo_screenwidth() // 2) - (largura // 2)
y = (janela.winfo_screenheight() // 2) - (altura // 2)

janela.geometry(f"{largura}x{altura}+{x}+{y}")

Label(janela, text="Primeiro número", bg="pink", fg= "black", font=("Arial", 12, "bold")).pack()
entrada1 = Entry(janela)
entrada1.pack()

Label(janela, text="Segundo número", bg="pink", fg= "black", font=("Arial", 12, "bold")).pack()
entrada2 = Entry(janela)
entrada2.pack()

Label(janela, text="Operações", bg="pink", fg= "black", font=("Arial", 12, "bold")).pack()

operacao = StringVar()
operacao.set("1")

Radiobutton(janela, text="Soma", variable=operacao, value="1", bg="pink", fg= "black", font=("Arial", 12, "bold")).pack(anchor="center")
Radiobutton(janela, text="Subtração", variable=operacao, value="2", bg="pink", fg= "black", font=("Arial", 12, "bold")).pack(anchor="center")
Radiobutton(janela, text="Divisão", variable=operacao, value="4", bg="pink", fg= "black", font=("Arial", 12, "bold")).pack(anchor="center")
Radiobutton(janela, text="Multiplicação", variable=operacao, value="3", bg="pink", fg= "black", font=("Arial", 12, "bold")).pack(anchor="center")

Button(janela, text="Calcular", command=calcular, bg="pink", fg= "white", font=("Arial", 12, "bold")).pack(pady=10)

resultado_label = Label(janela, text="Resultado:", bg="lightpink", fg= "white", font=("Arial", 12, "bold"))
resultado_label = Label(janela,text="Resultado:", bg="lightpink", font=("Arial", 12, "bold"))
resultado_label.pack()

janela.mainloop()