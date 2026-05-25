const card = document.getElementById("card");
const enter = document.getElementById("enter-screen");
const audio = document.getElementById("bgm");
const typed = document.querySelector(".typed-text");

const sounds = [
    "bs_songs/sound1.mp3",
    "bs_songs/sound2.mp3",
    "bs_songs/sound3.mp3",
    "bs_songs/sound4.mp3"
];

function playRandom() {
    const random = sounds[Math.floor(Math.random() * sounds.length)];
    audio.src = random;
    audio.volume = 0.7;
    audio.play().catch(() => {});
}

audio.addEventListener("ended", playRandom);

enter.onclick = () => {
    enter.classList.add("hidden");
    playRandom();
};

function copy(type, addr){
    navigator.clipboard.writeText(addr);
    alert(type + " address copied:\n" + addr);
}

document.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * -15;
    card.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});

const text = `Hello,

Your website has been reviewed and identified as having security vulnerabilities. No damage has been done to your source code, and no data has been accessed or altered. We are not requesting any form of ransom or compensation—this message is solely intended to inform you of the issues so they can be addressed and your system can be secured.

We do not deface or disrupt websites, and our focus is strictly on identifying and responsibly reporting security weaknesses. If you would like to support our work, optional donations can be sent to the wallet addresses provided below. Our activities are centered on ethical security research and vulnerability awareness.`;

let i = 0;

function typeWriter(){
    if(i < text.length){
        typed.textContent += text[i];
        i++;
        setTimeout(typeWriter, 18);
    }
}

window.addEventListener("load", typeWriter);