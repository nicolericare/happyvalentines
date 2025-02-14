// HEARTS
function createHearts() {
    for (let i = 0; i < 20; i++) {
        let heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
}
setInterval(createHearts, 500);
// ENVELOPE
function openEnvelope() {
    let envelope = document.getElementById("envelope");
    let flap = document.getElementById("flap");
    let letter = document.getElementById("letter");

    if (!envelope.classList.contains("open")) {
        flap.style.transform = "rotateX(180deg)";
        envelope.classList.add("open");
        setTimeout(() => {
            letter.style.display = "block";
            letter.style.opacity = "1";
            letter.style.transform = "translate(-50%, -50%) scale(1)";
        }, 500);
    } else {
        flap.style.transform = "rotateX(0deg)";
        envelope.classList.remove("open");
        letter.style.opacity = "0";
        letter.style.transform = "translate(-50%, -50%) scale(0.8)";
        setTimeout(() => {
            letter.style.display = "none";
        }, 300);
    }
}
//TO SCATTER PHOTOS
function scatterPhotos() {
    let container = document.getElementById("photo-container");
    container.style.display = "block"; 

    let photos = document.querySelectorAll(".scattered-photo");
    let usedPositions = [];
    let photoSize = 120; 
    let letterRect = document.getElementById("letter").getBoundingClientRect();

    photos.forEach((photo, index) => {
        setTimeout(() => {
            let position;
            let maxAttempts = 50;
            let attempts = 0;

            do {
                position = {
                    top: Math.random() * (window.innerHeight - photoSize) + "px",
                    left: Math.random() * (window.innerWidth - photoSize) + "px"
                };
                attempts++;
            } while ((isOverlapping(position, usedPositions, photoSize) || isOverlappingLetter(position, letterRect, photoSize)) && attempts < maxAttempts);

            usedPositions.push(position);

            photo.style.position = "absolute";
            photo.style.top = position.top;
            photo.style.left = position.left;
            photo.style.opacity = "1";
            photo.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
        }, index * 300); 
    });
    triggerConfetti();
}

// MINIMIZE THE PHOTO OVERLAP
function isOverlapping(newPos, usedPositions, size) {
    return usedPositions.some(pos => {
        let threshold = size * 1.2; 
        return (
            Math.abs(parseInt(newPos.top) - parseInt(pos.top)) < threshold &&
            Math.abs(parseInt(newPos.left) - parseInt(pos.left)) < threshold
        );
    });
}

function isOverlappingLetter(newPos, letterRect, size) {
    let photoRect = {
        top: parseInt(newPos.top),
        left: parseInt(newPos.left),
        right: parseInt(newPos.left) + size,
        bottom: parseInt(newPos.top) + size
    };

    return !(photoRect.right < letterRect.left ||
             photoRect.left > letterRect.right ||
             photoRect.bottom < letterRect.top ||
             photoRect.top > letterRect.bottom);
}

// Confetti effect
function triggerConfetti() {
    let confettiContainer = document.getElementById("confetti-container");
    confettiContainer.innerHTML = ""; 

    for (let i = 0; i < 30; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 50 + "vw"; 
        confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
        confettiContainer.appendChild(confetti);
    }
    for (let i = 0; i < 30; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.right = Math.random() * 50 + "vw";
        confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
        confettiContainer.appendChild(confetti);
    }
    setTimeout(() => confettiContainer.innerHTML = "", 10000); 
}
