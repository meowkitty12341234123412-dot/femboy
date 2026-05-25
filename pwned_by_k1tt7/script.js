const card = document.getElementById("card");
const enter = document.getElementById("enter-screen");
const audio = document.getElementById("bgm");
const typed = document.querySelector(".typed-text");

const songFolder = "bs_songs/";
const totalSongs = 4;

const songs = Array.from(
    { length: totalSongs },
    (_, i) => `${songFolder}sound${i + 1}.mp3`
);

let playlist = [];
let currentIndex = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function buildPlaylist() {
    playlist = shuffle([...songs]);
    currentIndex = 0;
}

function fadeIn(audio, duration = 2000) {
    audio.volume = 0;

    const step = 0.05;
    const interval = duration * step;

    const fade = setInterval(() => {
        if (audio.volume < 0.7) {
            audio.volume = Math.min(audio.volume + step, 0.7);
        } else {
            clearInterval(fade);
        }
    }, interval);
}

function playNextSong() {

    if (currentIndex >= playlist.length) {
        buildPlaylist();
    }

    audio.src = playlist[currentIndex];
    currentIndex++;

    audio.play()
        .then(() => {
            fadeIn(audio);
        })
        .catch(() => {});
}

audio.addEventListener("ended", playNextSong);

enter.onclick = () => {
    enter.classList.add("hidden");

    buildPlaylist();
    playNextSong();
};

function copy(type, addr) {

    navigator.clipboard.writeText(addr);

    const popup = document.createElement("div");

    popup.className = "copy-popup";
    popup.innerText = `${type} copied`;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("show");
    }, 10);

    setTimeout(() => {

        popup.classList.remove("show");

        setTimeout(() => {
            popup.remove();
        }, 300);

    }, 2000);
}

document.addEventListener("mousemove", e => {

    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * -18;

    card.style.transform = `
        rotateX(${y}deg)
        rotateY(${x}deg)
        translateZ(10px)
    `;
});

const text = `Hello,

Your website has been reviewed and identified as having security vulnerabilities. No damage has been done to your source code, and no data has been accessed or altered. We are not requesting any form of ransom or compensation—this message is solely intended to inform you of the issues so they can be addressed and your system can be secured.

We do not deface or disrupt websites, and our focus is strictly on identifying and responsibly reporting security weaknesses. If you would like to support our work, optional donations can be sent to the wallet addresses provided below. Our activities are centered on ethical security research and vulnerability awareness.`;

let i = 0;

function typeWriter() {

    if (i < text.length) {

        typed.textContent += text.charAt(i);

        i++;

        const randomSpeed = Math.random() * 20 + 10;

        setTimeout(typeWriter, randomSpeed);
    }
}

window.addEventListener("load", () => {

    typed.textContent = "";

    typeWriter();

});

document.addEventListener("keydown", e => {

    if (e.code === "Space") {

        e.preventDefault();

        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    if (e.code === "ArrowRight") {
        playNextSong();
    }
});
