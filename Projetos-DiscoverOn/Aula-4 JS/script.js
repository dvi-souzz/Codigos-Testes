"use strict";

var periodo = window.prompt("Em que turno você estuda? T ou N ").toLowerCase();

    if (periodo == "t" ) {
        document.write("Boa tarde! Você estuda no período Vespertino!");
    

    var img = document.createElement("img")
    img.src = "14.jpg";
    document.body.appendChild(img);
}

    else if (periodo == "n" ) {
        document.write("Boa noite! Você estuda no período Noturno! <br>");
    
    
    var img = document.createElement("img")
    img.src = "15.jpg";
    document.body.appendChild(img);
}
    else {
        document.write("Turno Desconhecido!");
    }