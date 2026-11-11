let name = prompt("Digite o nome do aluno :");

name = name.UpperCase();

let nota1 = parseFloat(prompt(" Digite a primeira nota:"));
let nota2 = parseFloat(prompt(" Digite a segunda nota:"));
let nota3 = parseFloat(prompt(" Digite a terceira nota:"));

let media = (nota1 + nota2 + nota3) / 3;

document.write(`<h2>Nome do aluno: ${name} </h2>`);
document.write(`<p>Nota 1: ${nota1} </p>`);
document.write(`<p>Nota 2: ${nota2} </p>`);
document.write(`<p>Nota 3: ${nota3} </p>`);
document.write("<p><strong> Média das notas: " + media.toFixed(2) + "</strong> </p>");