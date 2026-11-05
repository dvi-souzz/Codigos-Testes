// Lista com as 12 músicas do álbum (mude os nomes e refrões conforme necessário)
const faixasAlbum = [
  {
    musica: "Sucesso FM",
    refrao: `Ah, Yun Li, cara, ah, eu gostava muito das suas música' antes, cara, agora 'tá muito bosta<br>
             Ô, mano, esse Yun Li aí, porra, o cara foi muito bom, acompanhava pra caralho, mas agora 'tá muito ruim<br>
             Ah, cara, sei lá, eu acho que o Yun Li perdeu a essência dele depois que ele começou a fazer raps mais sérios... eu preferia muito mais quando ele fazia shittrap`
  },
  {
    musica: "Rumo à Vitória",
    refrao: `Rumo à vitória<br>
            De encontro com a glória, vivendo o agora<br>
            Isso já é história, porra (Todo mundo)<br>
            (And we go like) Rumo à vitória<br>
            Dе encontro com a glória, vivendo o agora<br>
            Isso já é história (Yeah, aham), porra (Aham)<br>
            (And wе—, and we go like) Rumo à vitória<br>
            De encontro com a glória, vivendo o agora<br>
            Isso já é história (Get it), porra (Levanta a mão, levanta a mão)<br>
            (And we go like) Rumo à vitória, rumo à vitória<br>
            Rumo à vitória (Yeah), rumo à vitória (Yeah)<br>
            And we—, and we go like<br>`
  },
  {
    musica: "Goddamn (part. Biffe)",
    refrao: `Goddamn, my friend, life some real shit<br>
            (But I'd get addicted just to take another hit)<br>
            Goddamn, my friend, life some real shit<br>
            (But I'd get addicted just to take another hit)<br>
            Goddamn, my friend, life some real shit<br>
            (But I'd get addicted just to take another hit)<br>
            Goddamn, my friend, goddamn<br>
            Goddamn, goddamn, goddamn, goddamn<br>`
  },
  {
    musica: "I Walk (part. Massaru",
    refrao: `I— I— I— I— I keep on walking, they tried but can't stop me<br>
            I walk, I walk, I walk (Yeah, yeah, yeah)<br>
            No blocking my way, I was born for this shit<br>
            I walk, I walk, I walk<br>
            I keep on walking, they tried but can't stop me<br>
            No blocking my way, I was born for this shit<br>
            I walk, I walk, I walk (Huh)<br>
            I walk, I walk, I walk (Huh, huh)<br>`
  },
  {
    musica: "Waiting to Fly",
    refrao: `I've been waiting to fly (I've been waiting)<br>
            I'm ready to go, oh-oh, oh-oh<br>
            I've been waiting to fly (I've been waiting)<br>
            I'm ready to go, oh-oh, oh-oh (C'mon, c-c-c'mon, yeah)<br>`
  },
  {
    musica: "Sonhar",
    refrao: `So damn (Damn), I'ma do it again (Aham)<br>
            Vou pegar seu peso e levantar você também<br>
            Porque não tem graça nenhuma 'tar no topo sem ninguém, han<br>
            Sem você não é, não é, não é, não é igual (Não é igual)<br>
            Ah-ah, let it out<br>
            Solta todo o medo e flutua<br>
            Estrela vai subir e brilhar<br>`
  },
  {
    musica: "I'm in Love (part. Astrus*)",
    refrao: `Look at me, I'm in love<br>
            When you're around I feel alright<br>
            Look at me, I'm in love (Yeah, yeah)<br>
            Come end my many lonely nights<br>
            Look at me, I'm in love (C'mon, c'mon)<br>
            I see it, girl, it's in your eyes<br>
            Look at me, I'm in love (Please, please)<br>
            I love you, girl, do you think I'm fine?<br>`
  },
  {
    musica: "For My Family (part. MAIK sbkaos)",
    refrao: `This for my mother, my father, my life<br>
            Prometo que eu volto com diamonds so bright<br>
            Só pra minha mãe, meu pai, minha família<br>
            Diamante ilumina o caminho da trilha<br>
            This for my mother, my father, my life<br>
            Prometo que eu volto com diamonds so bright<br>
            This for my mother, my father, my life<br>
            This for my mother, my father, my life<br>
            This for my mother, my father, my life (Far, far away)<br>
            This for my mother, my father, my life (Far, far away)<br>
            Prometo que eu volto com diamonds so bright<br>`
  },
  {
    musica: "Going Home (part. The Merk)",
    refrao: `Don't you miss me now? (When I'm going to Paris)<br>
            Dropped out, still graduated, shit<br>
            Don't wait for me, I ain't comin' down<br>
            I'm goin' home<br>
            Don't you miss me now? (When I'm going to Paris)<br>
            Dropped out, still graduated, shit<br>
            Don't wait for me, I ain't comin' down<br>
            I'm goin' home<br>`
  },
  {
    musica: "The Lord and Me (part. Biffe)",
    refrao: `Oh, I know the Lord is taking notes<br>
            He keeps calling my name<br>
            But I ain't the same that I used to be<br>
            That's how it goes, the Lord and me<br>
            Oh, I know the Lord is taking notes<br>
            He keeps calling my name<br>
            But I ain't the same that I used to be<br>
            That's how it goes, the Lord and me<br>
            (Recеive Him, re—re—rе— right now)<br>
            That's how it goes, the Lord and me<br>
            (He's callin', callin' just for you)<br>
            That's how it goes, the Lord and me<br>
            (Receive Him, re—re—re— right now)<br>
            That's how it goes, the Lord and me<br>
            (He's callin', callin' just for you, you)<br>`
  },
  {
    musica: "Anjos da Guarda (part. Biffe)",
    refrao: `Quebra minha pose e me deixa sem graça<br>
            Nunca tô sozinho, tenho anjos da guarda<br>
            Eles andam comigo, flutuam onde eu passo<br>
            Me mantém nos trilhos em tudo que eu faço<br>
            Quebra minha pose e me deixa sem graça<br>
            Nunca tô sozinho, tenho anjos da guarda<br>
            Eles andam comigo, flutuam onde eu passo<br>
            Me mantém nos trilhos em tudo que eu faço<br>
            Quebra minha pose e me deixa sem graça<br>
            Nunca tô sozinho, tenho anjos da guarda<br>
            Eles andam comigo, flutuam onde eu passo<br>
            Me mantém nos trilhos em tudo que eu faço<br>`
  },
  {
    musica: "We Gold",
    refrao: `Brothers and sisters, we gold<br>
            Looking at pictures, ain't cutting it tho'<br>
            Just so you know<br>
            I gotta go, I gotta go<br>
            Brothers and sisters, we gold<br>
            Looking at pictures, ain't cutting it tho'<br>
            Just so you know<br>
            I gotta go, I gotta go<br>
            Brothers and sisters, we gold<br>
            Muito obrigado por odiar meu trabalho<br>
            'Cê só fez com que eu ficasse bom<br>
            Brothers and sisters, we gold<br>
            Muito obrigado pelas noites acordado<br>
            Por ficar sempre do lado, mom<br>
            Brothers and sisters, we gold<br>
            Muito obrigado pelos risos, pelos papos<br>
            Mas de fato, esse é o fim do show<br>`
  }
];

let indiceAtual = 0;

const btnProximo = document.querySelector(".mudar-pagina");
const elMusica = document.getElementById("musica");
const elLeta = document.getElementById("leta");

btnProximo.addEventListener("click", () => {
  // Efeito suave de saída apenas do texto
  elMusica.style.opacity = "0";
  elLeta.style.opacity = "0";
  elMusica.style.transition = "opacity 0.25s ease";
  elLeta.style.transition = "opacity 0.25s ease";

  setTimeout(() => {
    // Avança para a próxima música (e volta para a primeira após a 12ª)
    indiceAtual = (indiceAtual + 1) % faixasAlbum.length;

    // Atualiza apenas os campos desejados
    elMusica.textContent = faixasAlbum[indiceAtual].musica;
    elLeta.innerHTML = faixasAlbum[indiceAtual].refrao;

    // Efeito suave de entrada
    elMusica.style.opacity = "1";
    elLeta.style.opacity = "1";
  }, 250);
});