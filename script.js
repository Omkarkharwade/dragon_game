let score = 0;
let cross = true;

let audio = new Audio('music.mp3');
let audiogo = new Audio('gameover.mp3');

// Ensure volume is up and not muted
audio.volume = 1;
audio.muted = false;
audiogo.volume = 1;
audiogo.muted = false;

document.onkeydown = function (e) {
    // Play background music on first key press
    if (audio.paused) {
        audio.play().catch(err => {
            console.warn("Autoplay failed: ", err);
        });
    }

    console.log("key code is:", e.keyCode);

    let dino = document.querySelector('.dino');

    if (e.keyCode === 38) {
        // Jump
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }

    if (e.keyCode === 39) {
        // Move right
        let dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinox + 112 + "px";
    }

    if (e.keyCode === 37) {
        // Move left
        let dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinox - 112) + "px";
    }
};

setInterval(() => {
    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('#obstacle');

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = 'Game over - Reload to start over';
        obstacle.classList.remove('obstacleAni');

        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    } else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;

        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            let newDur = aniDur > 1 ? aniDur - 0.1 : aniDur; // Prevent too fast
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 10);

function updateScore(score) {
    let scoreCont = document.querySelector('#scoreCont');
    scoreCont.innerHTML = "Your score: " + score;
}
