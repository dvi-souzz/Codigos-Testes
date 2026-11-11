document.addEventListener('DOMContentLoaded', () => {

    const artistData = [
        { name: 'Zé Neto & Cristiano', image: './img/artista-cinco.jpg' },
        { name: 'Henrique & Juliano', image: './img/artista-dois.jpg' },
        { name: 'Jorge & Matheus', image: './img/artista-quatro.jpg' },
        { name: 'Grupo Menos É Mais', image: './img/artista-tres.jfif' },
        { name: 'Matheus & Kauan', image: './img/artista-seis.jfif' },
        { name: 'Diego & Victor Hugo', image: './img/artista-um.jfif' }
    ];

    const albumsData = [
        { name: 'Liberdade', artist: 'Oruam', image: './img/album-cinco.jfif' },
        { name: 'Bem Vindo Ao Meu Mundo', artist: 'Wesley Safadão', image: './img/album-quatro.jfif' },
        { name: 'Churrasquinho 3', artist: 'Grupo Menos É Mais', image: './img/album-seis.jfif' },
        { name: 'Nada Como um Dia Após o Outro Dia', artist: 'Racionais MC\'s', image: './img/album-tres.jfif' },
        { name: '333', artist: 'Matuê', image: './img/album-um.jfif' },
        { name: 'Obrigado Deus', artist: 'Leo Foguete', image: './img/album-sete.jfif' },
    ];

    const artistGrid = document.querySelector('.artists-grid')
    const albumsGrid = document.querySelector('.albums-grid')

    artistData.forEach(artist => {
        const artistCard = document.createElement('div')
        artistCard.classList.add('artist-card')

        artistCard.innerHTML = `
            <img src="${artist.image}" alt="imagem do ${artist.name}">
            <div>
                <h3>${artist.name}</h3>
                <p>artista</p>
            </div>
        `
        artistGrid.appendChild(artistCard)
    })

    albumsData.forEach(album => {
        const albumCard = document.createElement('div')
        albumCard.classList.add('album-card')

        albumCard.innerHTML = `
            <img src="${album.image}" alt="imagem do ${album.name}">
            <div> 
                <h3>${album.name}</h3>
                <p>${album.artist}</p>
            </div>
        `
        albumsGrid.appendChild(albumCard)
    })


})

// ---------- BUSCA NO YOUTUBE ----------

const API_KEY = "AIzaSyB0bfLI6Zq0daMjz0ZfbfmMNLUIJc1vsBQ";

async function buscar(termo) {
    const urlBusca = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&videoSyndicated=true&videoCategoryId=10&regionCode=BR&maxResults=25&q=${encodeURIComponent(termo)}&key=${API_KEY}`;

    const respBusca = await fetch(urlBusca);
    const dadosBusca = await respBusca.json();

    if (!dadosBusca.items) {
        console.error("Erro da API:", dadosBusca);
        return [];
    }

    const ids = dadosBusca.items.map(i => i.id.videoId).join(',');

    // confere o status de cada vídeo (custa só 1 unidade de cota)
    const urlDetalhes = `https://www.googleapis.com/youtube/v3/videos?part=status,contentDetails&id=${ids}&key=${API_KEY}`;
    const respDetalhes = await fetch(urlDetalhes);
    const dadosDetalhes = await respDetalhes.json();

    const tocaveis = new Set(
        (dadosDetalhes.items || [])
            .filter(v => {
                const reg = v.contentDetails.regionRestriction;
                const bloqueadoBR = reg?.blocked?.includes('BR');
                const naoPermitidoBR = reg?.allowed && !reg.allowed.includes('BR');
                return v.status.embeddable
                    && v.status.privacyStatus === 'public'
                    && !bloqueadoBR
                    && !naoPermitidoBR;
            })
            .map(v => v.id)
    );

    const ehTopic = item => Number(item.snippet.channelTitle.endsWith('- Topic'));

    return dadosBusca.items
        .filter(item => tocaveis.has(item.id.videoId))
        // canais "- Topic" costumam ser os mais liberados para incorporação
        .sort((a, b) => ehTopic(b) - ehTopic(a))
        .slice(0, 12)
        .map(item => ({
            id: item.id.videoId,
            titulo: decodificar(item.snippet.title),
            canal: decodificar(item.snippet.channelTitle).replace(' - Topic', ''),
            miniatura: item.snippet.thumbnails.medium.url,
        }));
}

const campoBusca = document.getElementById('campo-busca');
const resultados = document.getElementById('resultados');

campoBusca.addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter') return;

    const termo = campoBusca.value.trim();
    if (!termo) return;

    resultados.innerHTML = '<p style="color:#b3b3b3">Buscando...</p>';

    let videos = [];
    try {
        videos = await buscar(termo);
    } catch (erro) {
        console.error('Falha na busca:', erro);
        resultados.innerHTML = '<p style="color:#b3b3b3">Erro ao buscar. Tente novamente.</p>';
        return;
    }

    resultados.innerHTML = '';

    if (videos.length === 0) {
        resultados.innerHTML = '<p style="color:#b3b3b3">Nenhum resultado encontrado.</p>';
        return;
    }

    videos.forEach(video => {
        const card = document.createElement('div');
        card.classList.add('album-card');

        const img = document.createElement('img');
        img.src = video.miniatura;
        img.alt = video.titulo;

        const info = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = video.titulo;
        const p = document.createElement('p');
        p.textContent = video.canal;
        info.append(h3, p);

        card.append(img, info);
        card.addEventListener('click', () => tocarVideo(video, videos));
        resultados.appendChild(card);
    });
});

// ---------- PLAYER ----------
let player;
let playerPronto = false;
let intervalo = null;
let arrastando = false;
let fila = [];
let indiceAtual = -1;
let falhasSeguidas = 0;
let pendente = null; // música clicada antes do player ficar pronto

const btnPlay = document.getElementById('btn-play');
const barraProgresso = document.getElementById('barra-progresso');
const barraVolume = document.getElementById('barra-volume');
const tempoAtual = document.getElementById('tempo-atual');
const tempoTotal = document.getElementById('tempo-total');
const elThumb = document.getElementById('player-thumb');
const elTitulo = document.getElementById('player-titulo');
const elArtista = document.getElementById('player-artista');

function decodificar(texto) {
    const el = document.createElement('textarea');
    el.innerHTML = texto; // converte &amp; &#39; etc.
    return el.value;
}

function formatarTempo(segundos) {
    const s = Math.floor(segundos || 0);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function tocarVideo(video, lista) {
    if (!playerPronto) {
        // guarda o clique e toca assim que o player ficar pronto
        pendente = { video, lista };
        return;
    }

    if (lista) {
        fila = lista;
        falhasSeguidas = 0; // clique novo do usuário: recomeça a contagem
    }
    indiceAtual = fila.findIndex(v => v.id === video.id);

    player.loadVideoById(video.id);

    elThumb.src = video.miniatura;
    elTitulo.textContent = video.titulo;
    elArtista.textContent = video.canal;
}

function tocarIndice(i) {
    if (i >= 0 && i < fila.length) tocarVideo(fila[i]);
}

function aoMudarEstado(evento) {
    if (evento.data === YT.PlayerState.ENDED) {
        tocarIndice(indiceAtual + 1);
        return;
    }

    const icone = btnPlay.querySelector('i');

    if (evento.data === YT.PlayerState.PLAYING) {
        falhasSeguidas = 0;
        icone.className = 'fa-solid fa-pause';
        const duracao = player.getDuration();
        barraProgresso.max = duracao;
        tempoTotal.textContent = formatarTempo(duracao);

        clearInterval(intervalo);
        intervalo = setInterval(() => {
            if (arrastando) return;
            const atual = player.getCurrentTime();
            barraProgresso.value = atual;
            tempoAtual.textContent = formatarTempo(atual);
        }, 500);
    } else {
        icone.className = 'fa-solid fa-play';
        clearInterval(intervalo);
    }
}

// Play / pause
btnPlay.addEventListener('click', () => {
    if (!playerPronto) return;
    const estado = player.getPlayerState();
    estado === YT.PlayerState.PLAYING ? player.pauseVideo() : player.playVideo();
});

// Música anterior / próxima
document.getElementById('btn-voltar').addEventListener('click', () => {
    if (!playerPronto) return;
    if (player.getCurrentTime() > 3) player.seekTo(0, true);
    else tocarIndice(indiceAtual - 1);
});
document.getElementById('btn-avancar').addEventListener('click', () => {
    tocarIndice(indiceAtual + 1);
});

// Arrastar a barra de progresso
barraProgresso.addEventListener('pointerdown', () => { arrastando = true; });
barraProgresso.addEventListener('input', () => {
    tempoAtual.textContent = formatarTempo(barraProgresso.value);
});
barraProgresso.addEventListener('change', () => {
    if (playerPronto) player.seekTo(Number(barraProgresso.value), true);
    arrastando = false;
});
// garante que soltar o mouse fora da barra não deixe "arrastando" travado
document.addEventListener('pointerup', () => { arrastando = false; });

// Volume
barraVolume.addEventListener('input', () => {
    if (playerPronto) player.setVolume(Number(barraVolume.value));
});

// ---------- TRATAMENTO DE ERROS DO PLAYER ----------
function aoDarErro(e) {
    console.error('Erro do player YouTube:', e.data);

    // 100, 101 e 150 = problema só nesse vídeo, vale pular
    const erroDoVideo = [100, 101, 150].includes(e.data);
    falhasSeguidas++;

    if (erroDoVideo && falhasSeguidas < 3 && indiceAtual + 1 < fila.length) {
        tocarIndice(indiceAtual + 1);
        return;
    }

    const atual = fila[indiceAtual];
    elTitulo.textContent = 'Não foi possível reproduzir aqui';

    if (e.data === 153) {
        elArtista.textContent = 'Erro 153: verifique VPN/extensões ou abra por http://localhost:5500';
    } else if (atual) {
        elArtista.innerHTML = '';
        const link = document.createElement('a');
        link.href = `https://www.youtube.com/watch?v=${atual.id}`;
        link.target = '_blank';
        link.rel = 'noopener';
        link.style.color = '#1db954';
        link.textContent = 'Abrir no YouTube';
        elArtista.appendChild(link);
    } else {
        elArtista.textContent = 'Tente outro vídeo';
    }
}

// ---------- CRIAÇÃO DO PLAYER DO YOUTUBE ----------
function onYouTubeIframeAPIReady() {
    if (player) return; // evita criar o player duas vezes
    player = new YT.Player('player', {
        width: '200',
        height: '200',
        playerVars: {
            controls: 0,
            playsinline: 1,
            origin: window.location.origin,
        },
        events: {
            onReady: () => {
                playerPronto = true;
                console.log('Player pronto! Origem:', window.location.origin);
                if (pendente) {
                    tocarVideo(pendente.video, pendente.lista);
                    pendente = null;
                }
            },
            onStateChange: aoMudarEstado,
            onError: aoDarErro,
        },
    });
}

// Carrega a API do YouTube (precisa ficar DEPOIS da função acima)
if (window.YT && YT.Player) {
    onYouTubeIframeAPIReady();
} else {
    const tagYT = document.createElement('script');
    tagYT.src = 'https://www.youtube.com/iframe_api';
    tagYT.onerror = () => console.error('Não foi possível carregar a API do YouTube (bloqueador de anúncios?)');
    document.head.appendChild(tagYT);
}