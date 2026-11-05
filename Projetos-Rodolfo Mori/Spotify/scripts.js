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

const API_KEY = "AIzaSyCewQ6RVyEEabP2t_Hw-4JMX8s_LxhrzTA";

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

    return dadosBusca.items
        .filter(item => tocaveis.has(item.id.videoId))
        .slice(0, 12)
        .map(item => ({
            id: item.id.videoId,
            titulo: item.snippet.title,
            canal: item.snippet.channelTitle,
            miniatura: item.snippet.thumbnails.medium.url,
        }));
}

const campoBusca = document.getElementById('campo-busca');
const resultados = document.getElementById('resultados');

campoBusca.addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter') return;

    const termo = campoBusca.value.trim();
    if (!termo) return;

    const videos = await buscar(termo);

    resultados.innerHTML = '';
    videos.forEach(video => {
        const card = document.createElement('div');
        card.classList.add('album-card');
        card.innerHTML = `
            <img src="${video.miniatura}" alt="${video.titulo}">
            <div>
                <h3>${video.titulo}</h3>
                <p>${video.canal}</p>
            </div>
        `;
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

const btnPlay = document.getElementById('btn-play');
const barraProgresso = document.getElementById('barra-progresso');
const barraVolume = document.getElementById('barra-volume');
const tempoAtual = document.getElementById('tempo-atual');
const tempoTotal = document.getElementById('tempo-total');

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
        console.warn('Player ainda não está pronto');
        return;
    }

    if (lista) fila = lista;
    indiceAtual = fila.findIndex(v => v.id === video.id);

    player.loadVideoById(video.id);

    document.getElementById('player-thumb').src = video.miniatura;
    document.getElementById('player-titulo').textContent = decodificar(video.titulo);
    document.getElementById('player-artista').textContent =
        decodificar(video.canal).replace(' - Topic', '');
}

function tocarIndice(i) {
    if (i >= 0 && i < fila.length) tocarVideo(fila[i]);
}

function aoMudarEstado(evento) {
    if (evento.data === YT.PlayerState.ENDED) tocarIndice(indiceAtual + 1);

    const icone = btnPlay.querySelector('i');

    if (evento.data === YT.PlayerState.PLAYING) {
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

// Volume
barraVolume.addEventListener('input', () => {
    if (playerPronto) player.setVolume(Number(barraVolume.value));
});

// ---------- CRIAÇÃO DO PLAYER DO YOUTUBE ----------
function onYouTubeIframeAPIReady() {
    if (player) return; // evita criar o player duas vezes
    player = new YT.Player('player', {
        width: '200',
        height: '200',
        playerVars: { controls: 0, playsinline: 1 },
        events: {
            onReady: () => {
                playerPronto = true;
                console.log('Player pronto!');
            },
            onStateChange: aoMudarEstado,
            onError: (e) => {
                console.error('Erro do player YouTube:', e.data);
                tocarIndice(indiceAtual + 1); // pula para o próximo
            },
        },
    });
}

// Carrega a API do YouTube (precisa ficar DEPOIS da função acima)
if (window.YT && YT.Player) {
    onYouTubeIframeAPIReady();
} else {
    const tagYT = document.createElement('script');
    tagYT.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tagYT);
}