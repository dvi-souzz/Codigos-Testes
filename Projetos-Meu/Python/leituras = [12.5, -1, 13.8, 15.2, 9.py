leituras = [12.5, -1, 13.8, 15.2, 9.7, 16.1]
idx = 0
validas = 0
soma = 0

while idx < len(leituras) and validas < 5:
    valor = leituras[idx]
    idx += 1
    if valor <0:
        continue
    soma += valor
    validas += 1

    media = soma / validas

print(media)