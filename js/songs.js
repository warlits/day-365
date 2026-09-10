import { songs } from "./data/songs-data.js";

/* ==========================================================================
   ELEMENTS
========================================================================== */

const songsSection = document.querySelector(".songs-section");
const songList = songsSection.querySelector(".js-song-list");
const songCount = songsSection.querySelector(".js-song-count");
const audioPlayer = songsSection.querySelector(".js-audio-player");
const nowPlaying = songsSection.querySelector(".js-now-playing");
const nowPlayingCover = songsSection.querySelector(".js-now-playing-cover");
const nowPlayingTitle = songsSection.querySelector(".js-now-playing-title");
const nowPlayingArtist = songsSection.querySelector(".js-now-playing-artist");
const playButton = songsSection.querySelector(".js-play-btn");
const playIcon = songsSection.querySelector(".js-play-icon");

/* ==========================================================================
   STATE
========================================================================== */

let currentSongIndex = null;
let isPlaying = false;

/* ==========================================================================
   RENDER SONGS
========================================================================== */

function renderSongs() {
    songCount.textContent = `${songs.length} ${songs.length === 1 ? "song" : "songs"}`;
    songList.innerHTML = songs.map((song, index) => {
        return `
            <button
                class="song-tile"
                type="button"
                data-song-id="${song.id}"
                data-song-index="${index}"
                aria-label="Play ${song.title} by ${song.artist}"
            >
                <p class="song-number">${index + 1}</p>
                <p class="song-title">${song.title}</p>
                <p class="song-duration">${song.duration}</p>
            </button>
        `;
    }).join("");
}

/* ==========================================================================
   UPDATE NOW PLAYING
========================================================================== */

function updateNowPlaying(song) {
    nowPlayingCover.src = song.cover;
    nowPlayingCover.alt = `${song.title} album cover`;
    nowPlayingTitle.textContent = song.title;
    nowPlayingArtist.textContent = song.artist;
    nowPlaying.classList.remove("is-empty");
}

/* ==========================================================================
   UPDATE SONG STATES
========================================================================== */

function updateSongStates() {
    const songTiles = songList.querySelectorAll(".song-tile");

    songTiles.forEach((tile, index) => {
        const isCurrentSong = index === currentSongIndex;
        tile.classList.toggle("is-active", isCurrentSong);
        tile.classList.toggle("is-playing", isCurrentSong && isPlaying);
    });
}

/* ==========================================================================
   UPDATE PLAYER STATE
========================================================================== */

function updatePlayerState() {
    nowPlaying.classList.toggle("is-playing", isPlaying);
    playIcon.textContent = isPlaying ? "❚❚" : "▶";
    playButton.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
    updateSongStates();
}

/* ==========================================================================
   SELECT SONG
========================================================================== */

function selectSong(index) {
    const song = songs[index];

    if (!song) return;

    currentSongIndex = index;
    audioPlayer.src = song.audio;
    // audioPlayer.load();

    updateNowPlaying(song);

    playButton.disabled = false;

    updateSongStates();
}

/* ==========================================================================
   PLAY CURRENT SONG
========================================================================== */

async function playCurrentSong() {
    if (currentSongIndex === null) {
        selectSong(0);
    }

    try {
        await audioPlayer.play();
        isPlaying = true;
        updatePlayerState();
    } catch (error) {
        console.error("Could not play the audio:", error);
    }
}

/* ==========================================================================
   PAUSE CURRENT SONG
========================================================================== */

function pauseCurrentSong() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayerState();
}

/* ==========================================================================
   TOGGLE PLAY
========================================================================== */

function togglePlay() {
    if (currentSongIndex === null) {
        playCurrentSong();
        return;
    }

    if (isPlaying) {
        pauseCurrentSong();
    } else {
        playCurrentSong();
    }
}

/* ==========================================================================
   PLAY SONG
========================================================================== */

function playSong(index) {
    const isSameSong = currentSongIndex === index;

    if (isSameSong) {
        togglePlay();
        return;
    }

    selectSong(index);
    playCurrentSong();
}

async function forcePlaySong(index) {
    const isSameSong = currentSongIndex === index;

    if (!isSameSong) {
        selectSong(index);
    }

    if (!isPlaying) {
        await playCurrentSong();
    }
}

/* ==========================================================================
   SONG CLICK EVENTS
========================================================================== */

songList.addEventListener("click", (event) => {
    const songTile = event.target.closest(".song-tile");

    if (!songTile) return;

    const index = Number(songTile.dataset.songIndex);

    playSong(index);
});

/* ==========================================================================
   PLAY BUTTON EVENT
========================================================================== */

playButton.addEventListener("click", togglePlay);

/* ==========================================================================
   AUDIO EVENTS
========================================================================== */

audioPlayer.addEventListener("play", () => {
    isPlaying = true;
    updatePlayerState();
});

audioPlayer.addEventListener("pause", () => {
    isPlaying = false;
    updatePlayerState();
});

audioPlayer.addEventListener("ended", () => {
    const nextIndex = currentSongIndex + 1;

    if (nextIndex < songs.length) {
        selectSong(nextIndex);
        playCurrentSong();
    } else {
        isPlaying = false;
        updatePlayerState();
    }
});

/* ==========================================================================
   EXTERNAL SONG PLAY EVENT
========================================================================== */

document.addEventListener("songs:play", (event) => {
    const index = event.detail?.index ?? 0;
    playSong(index);
});

/* ==========================================================================
   INITIALIZE
========================================================================== */

function initSongs() {
    renderSongs();
    nowPlaying.classList.add("is-empty");
}

initSongs();