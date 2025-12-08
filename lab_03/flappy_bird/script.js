let board, context;
const boardWidth = 360;
const boardHeight = 640;

const birdWidth = 34;
const birdHeight = 24;
const birdStartX = boardWidth / 8;
const birdStartY = boardHeight / 2;

let bird = {
    x: birdStartX,
    y: birdStartY,
    width: birdWidth,
    height: birdHeight,
    frameIndex: 0,
    frameTick: 0,
    frameTickMax: 6,
    rotation: 0
};

let pipeArray = [];
const pipeWidth = 64;
const pipeHeight = 512;
const pipeXStart = boardWidth;
const pipeYStart = 0;

let velocityX = -2;
let velocityY = 0;
let gravity = 0.175;

let gameOver = false;
let gameStarted = false;
let score = 0;
let bestScores = [];
let lastScore = 0;

let birdSprites = [];
let numberSprites = [];
let topPipeImg, bottomPipeImg, backgroundImg, baseImg;
let startScreenImg, gameOverScreenImg;
let wingSound, hitSound, dieSound, pointSound, swooshSound, bgMusic;

const baseHeight = 112;
const openingSpace = boardHeight / 4;
const PIPE_INTERVAL_MS = 1500;

window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    const spritePaths = [
        "./assets/fb/yellowbird-upflap.png",
        "./assets/fb/yellowbird-midflap.png",
        "./assets/fb/yellowbird-downflap.png"
    ];
    spritePaths.forEach(p => {
        const img = new Image();
        img.src = p;
        birdSprites.push(img);
    });

    topPipeImg = new Image();
    topPipeImg.src = "./assets/fb/pipe-green.png";
    bottomPipeImg = new Image();
    bottomPipeImg.src = "./assets/fb/pipe-green.png";
    backgroundImg = new Image();
    backgroundImg.src = "./assets/fb/background-day.png";
    baseImg = new Image();
    baseImg.src = "./assets/fb/base.png";

    startScreenImg = new Image();
    startScreenImg.src = "./assets/UI/message.png";
    gameOverScreenImg = new Image();
    gameOverScreenImg.src = "./assets/UI/gameover.png";

    for (let i = 0; i <= 9; i++) {
        const img = new Image();
        img.src = `./assets/UI/Numbers/${i}.png`;
        numberSprites.push(img);
    }

    wingSound = new Audio("./assets/sound/wing.wav");
    hitSound = new Audio("./assets/sound/hit.wav");
    dieSound = new Audio("./assets/sound/die.wav");
    pointSound = new Audio("./assets/sound/point.wav");
    swooshSound = new Audio("./assets/sound/swoosh.wav");
    bgMusic = new Audio("./assets/sound/music.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.4;

    loadScoresFromStorage();
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);

    requestAnimationFrame(update);
    setInterval(placePipes, PIPE_INTERVAL_MS);
};


function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    if (backgroundImg.complete) {
        context.drawImage(backgroundImg, 0, 0, board.width, board.height);
    } else {
        context.fillStyle = "#70c5ce";
        context.fillRect(0, 0, board.width, board.height);
    }

    if (!gameStarted) {
        drawStartScreen();
        return;
    }

    for (let pipe of pipeArray) {
        if (!pipe.static) pipe.x += velocityX;

        if (pipe.type === "top") {
            context.save();
            context.translate(pipe.x + pipe.width / 2, pipe.y + pipe.height / 2);
            context.rotate(Math.PI);
            context.drawImage(pipe.img, -pipe.width/2, -pipe.height/2, pipe.width, pipe.height);
            context.restore();
        } else {
            context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        }

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
            if (Math.abs(score % 1) < 0.001) {
                pointSound.currentTime = 0;
                pointSound.play();
            }
        }

        if (!gameOver && detectCollision(bird, pipe)) {
            gameOver = true;
            lastScore = Math.floor(score);
            saveScoreToStorage(lastScore);
            hitSound.play();
            dieSound.play();
            gravity = 1.2;
            velocityY = 4;
        }
    }

    velocityY += gravity;
    bird.y += velocityY;
    if (bird.y < 0) { bird.y = 0; velocityY = 0; }

    bird.frameTick++;
    if (bird.frameTick >= bird.frameTickMax) {
        bird.frameTick = 0;
        bird.frameIndex = (bird.frameIndex + 1) % birdSprites.length;
    }
    bird.rotation = Math.max(Math.min(velocityY * 0.12, 1.2), -0.6);
    drawRotatedBird();

    if (bird.y + bird.height >= board.height - baseHeight) {
        bird.y = board.height - baseHeight - bird.height;
        if (!gameOver) {
            gameOver = true;
            lastScore = Math.floor(score);
            saveScoreToStorage(lastScore);
            dieSound.play();
        }
    }

    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth*2) pipeArray.shift();

    if (baseImg.complete) {
        context.drawImage(baseImg, 0, board.height - baseHeight, board.width, baseHeight);
    }

    drawScoreWithSprites(score);

    if (gameOver) drawGameOverScreen();
}


function drawRotatedBird() {
    const img = birdSprites[bird.frameIndex];
    if (!img.complete) return;
    context.save();
    context.translate(bird.x + bird.width/2, bird.y + bird.height/2);
    context.rotate(bird.rotation);
    context.drawImage(img, -bird.width/2, -bird.height/2, bird.width, bird.height);
    context.restore();
}

function drawScoreWithSprites(score) {
    const scoreString = Math.floor(score).toString();
    const w = 24, h = 36;
    let x = board.width - (scoreString.length * w) - 10;
    let y = 20;

    for (let char of scoreString) {
        const img = numberSprites[parseInt(char)];
        if (img.complete) context.drawImage(img, x, y, w, h);
        x += w;
    }
}

function drawStartScreen() {
    if (startScreenImg.complete) {
        context.drawImage(startScreenImg, 0, 0, board.width, board.height);
    } else {
        context.fillStyle = "#000";
        context.fillRect(0,0,board.width,board.height);
        context.fillStyle = "#fff";
        context.font = "20px sans-serif";
        context.fillText("Click/Space to Start", board.width/4, board.height/2);
    }
}

function drawGameOverScreen() {
    if (gameOverScreenImg.complete) {
        const ratio = gameOverScreenImg.width / gameOverScreenImg.height;
        let w = board.width * 0.8;
        let h = w / ratio;
        if (h > board.height * 0.5) { h = board.height * 0.5; w = h * ratio; }
        context.drawImage(gameOverScreenImg, (board.width-w)/2, (board.height-h)/2, w, h);
    }
    context.fillStyle = "black";
    context.textAlign = "center";
    context.font = "24px sans-serif";
    context.fillText(`Score: ${Math.floor(lastScore)}`, board.width/2, board.height/2 + 80);
    context.fillText(`Best score: ${Math.floor(loadScoresFromStorage()[0])}`);
}


function placePipes() {
    if (!gameStarted || gameOver) return;
    const randomPipeY = pipeYStart - pipeHeight/4 - Math.random()*(pipeHeight/2);
    pipeArray.push(
        { img: topPipeImg, x: pipeXStart, y: randomPipeY, width:pipeWidth, height:pipeHeight, passed:false, type:"top" },
        { img: bottomPipeImg, x: pipeXStart, y: randomPipeY + pipeHeight + openingSpace, width:pipeWidth, height:pipeHeight, passed:false, type:"bottom" }
    );
}

function onKeyDown(e){ if(["Space","ArrowUp","KeyX"].includes(e.code)) flapOrRestart();}
function onMouseDown(){ flapOrRestart(); }

function flapOrRestart() {
    if (!gameStarted) {
        gameStarted = true; gameOver = false; score = 0; pipeArray = [];
        bird.x = birdStartX; bird.y = birdStartY; velocityY=0; gravity=0.175;
        if (bgMusic.paused) bgMusic.play();
        swooshSound.play();
        return;
    }
    if (gameOver) {
        gameOver=false; score=0; pipeArray=[]; bird.x=birdStartX; bird.y=birdStartY; velocityY=0; gravity=0.175;
        swooshSound.play();
        return;
    }
    velocityY = -6;
    wingSound.play();
}


function detectCollision(a,b){
    return a.x < b.x+b.width && a.x+a.width > b.x && a.y < b.y+b.height && a.y+a.height > b.y;
}
function saveScoreToStorage(s){
    bestScores.push(s);
    bestScores.sort((a,b)=>b-a);
    if(bestScores.length>5) bestScores.pop();
    localStorage.setItem("flappyBestScores", JSON.stringify(bestScores));
}
function loadScoresFromStorage(){
    const d = localStorage.getItem("flappyBestScores");
    if(d) bestScores = JSON.parse(d);
}