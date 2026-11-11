numeroum=int(input("Digite um Numero: "))
numerodois=int(input("Digite outro Numero: "))
operacao=int(input("Digite uma Operação: \n" \
" 1 = + \n" \
" 2 = - \n" \
" 3 = * \n" \
" 4 = / \n"))

if operacao == 1:
    print(numeroum + numerodois)
if operacao == 2:
    print(numeroum - numerodois)
if operacao == 3:
    print(numeroum * numerodois)
if operacao == 4:
    print(numeroum / numerodois)
else:
    exit