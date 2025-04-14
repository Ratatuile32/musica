const colors = ["red", "blue", "violet", "green", "yellow", "#17725b"]
const genSpaceLayer = (size, selector, maxstars, duration) => {
    const layer = []
    for (let i = 0; i < maxstars; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);
        if (!i % 2 === 0) {
        }
        layer.push(`${x}vw ${y}vh 0 ${color}, ${x}vw ${y - 100}vh 0 ${color}, ${x - 100}vw ${y}vh 0 ${color}, ${x - 100}vw ${y - 100}vh 0 ${color}`)
    }
    const container = document.querySelector(selector);
    container.style.setProperty("--space-layer", layer.join(","));
    container.style.setProperty("--size", size);
    container.style.setProperty("--duration", duration);
};
genSpaceLayer("6px", ".star-layer-1", 100, "45s");
genSpaceLayer("8px", ".star-layer-2", 100, "30s");
genSpaceLayer("2px", ".star-layer-3", 100, "20s");
const image = document.querySelector("img");
const Titulo = document.getElementById("Titulo");
const artista = document.getElementById("Artista");

const progressCont = document.getElementById("progressbar");
const progress = document.getElementById("progress");

const tiempoA = document.getElementById("tiempoA");
const tiempoD = document.getElementById("tiempoD");

const music = document.querySelector("audio");
const prevbtn = document.getElementById("prev");
const playbtn = document.getElementById("play");
const nextbtn = document.getElementById("next");

const playlistEl = document.getElementById('playlist');
//se podria aplicar mejor con una base de datos
const songs = [
    {
        name: "Cobarde",
        artista: "Enjambre"
    },
    {
        name: "Die In A Fire",
        artista: "The Living Tombstone , EileMonty, Orko"
    },
    {
        name: "Die With A Smile",
        artista: "Lady Gaga , Bruno Mars"
    },
    {
        name: "El Triste",
        artista: "Jose Jose"
    },
    {
        name: "Él",
        artista: "Jose Jose"
    },
    {
        name: "Epoch - The Living Tombstone Remix",
        artista: "Savlonic"
    },
    {
        name: "golden hour",
        artista: "JVKE"
    },
    {
        name: "I Got No Time",
        artista: "The Living Tombstone"
    },
    {
        name: "Impacto",
        artista: "Enjambre, Lo Blondo"
    },
    {
        name: "Karma",
        artista: "AJR"
    },
    {
        name: "Let You Break My Heart Again",
        artista: "Laufey , Philharmonia Orchestra"
    },
    {
        name: "Like Him",
        artista: "Tyler,The Creator , Lola Young"
    },
    {
        name: "Maybe Man",
        artista: "AJR"
    },
    {
        name: "Origami",
        artista: "The Rare occasions"
    },
    {
        name: "Promise",
        artista: "Laufey"
    },
    {
        name: "Seventh Heaven",
        artista: "INOHA"
    },
    {
        name: "Staring",
        artista: "Tipling Rock"
    },
    {
        name: "Stressed Out",
        artista: "Twenty One Pilots"
    },
    {
        name: "Summer",
        artista: "Good Kid"
    },
    {
        name: "Valentine",
        artista: "Laufey"
    },
    {
        name: "Virtual Insanity",
        artista: "Jamiroquai"
    },
    {
        name: "Who Will Know (24 Bigslow)",
        artista: "Shiro SAGISU"
    },
];
let isPlaying = false;
function playMusic() {
    isPlaying = true
    playbtn.setAttribute('name', 'pause');
    playbtn.setAttribute('Titulo', 'pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false
    playbtn.setAttribute('name', 'play');
    playbtn.setAttribute('Titulo', 'play');
    music.pause();
}

let currentSongIndex = 0;
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadAndPlay(currentSongIndex)
}
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadAndPlay(currentSongIndex)
}

// Cargar lista en HTML

songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song.name + " - " + song.artista;
    li.onclick = () => loadAndPlay(index);
    playlistEl.appendChild(li);
});
function loadAndPlay(index) {
    currentSongIndex = index;
    const song = songs[index];
    Titulo.textContent = song.name;
    artista.textContent = song.artista;
    music.src = `audio/${song.name + ".mp3"}`;
    image.src = `imagenes/${song.name + ".png"}`;
    pauseMusic();
    playMusic();
}
playbtn.addEventListener('click', () => (isPlaying ? pauseMusic() : playMusic()));
prevbtn.addEventListener('click', prevSong);
nextbtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressCont.addEventListener('click',setProgressBar);

function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds<10){
            durationSeconds=`0${durationSeconds}`
        }
        if (durationSeconds){
            tiempoD.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds<10){
            currentSeconds=`0${currentSeconds}`
        }
        if (currentSeconds){
            tiempoA.textContent =`${currentMinutes} : ${currentSeconds}`
        }
    }
}
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX/width)*duration;
}