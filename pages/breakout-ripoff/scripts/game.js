let canvas	= document.getElementById('game-canvas');
let ctx		= canvas.getContext("2d");

let hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

let score = 0;
let totalScore = 0;
let difficulty = 1;

let x	= canvas.width/2 + (Math.floor(Math.random() * 200)-100);
let y	= canvas.height-30;
let dx	= 4;
let dy	= -4;

let ballRadius	= 10;
let ballColor	= 'black';

let paddleWidth		= 75;
let paddleHeight	= 10;
let paddleX			= (canvas.width-paddleWidth)/2;
let pdx				= 7;
let paddleColor		= ballColor;

let brickColor			= randomColor();
let brickRowCount		= 3;
let brickColumnCount	= 5;
let brickWidth			= 75;
let brickHeight			= 20;
let brickPadding		= 10;
let brickOffsetTop		= 30;
let brickOffsetLeft		= 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (let r = 0; r < brickRowCount; r++)
		bricks[c][r] = { x: 0, y: 0, status: 1, color: randomColor() };
}

let rightPressed	= false;
let leftPressed		= false;

let gameOver		= false;
let win				= false;

draw();

function draw() {
	ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	if (score == difficulty*brickColumnCount*brickRowCount) {
		win = true;
		drawWin();
		return;
	}
	
	if (gameOver) {
		drawGameOver();
		return;
	}
	
	drawScore();
	drawLevel();
	drawBall(x, y, ballRadius, ballColor);
	drawPaddle(paddleX, paddleWidth, paddleHeight, paddleColor);
	drawBricks(bricks, brickColumnCount, brickRowCount);
	
	x += dx;
	y += dy;
	
	if (x + dx > canvas.width-ballRadius || x + dx < ballRadius)
		dx = -dx;
	if (y + dy < ballRadius)
		dy = -dy;
	else if (y + dy > canvas.height-ballRadius)	{
		if (x > paddleX && x < paddleX + paddleWidth)
			dy = -dy;
		else
			gameOver = true;
	}
	
	collisionDetection();
	
	if (rightPressed && paddleX < canvas.width-paddleWidth)
		paddleX += pdx;
	else if (leftPressed && paddleX > 0)
		paddleX -= pdx;
	
	requestAnimationFrame(draw);
}

function drawScore() {
	ctx.font = "16px Consolas";
	ctx.fillStyle = "black";
	ctx.fillText("SCORE " + score, 8, 20);
}

function drawLevel() {
	ctx.font = "16px Consolas";
	ctx.fillStyle = "black";
	ctx.fillText("LEVEL " + difficulty, 200, 20);
}

function drawBall(x, y, radius, color) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI*2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(x, width, height, color) {
	ctx.beginPath();
	ctx.rect(x, canvas.height-height, width, width);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

function drawBricks(bricks, brickColumnCount, brickRowCount) {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			if (bricks[c][r].status === 1) {
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = bricks[c][r].color;
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawWin() {
	ctx.fillStyle = 'blue';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font = '48px consolas';
	ctx.fillStyle = 'black';
	ctx.fillText('YOU WIN :)', 10, 50);
	ctx.fillText('TOTAL SCORED ' + totalScore, 30, 150);
	ctx.fillText('YOU IZ AWESOME', 70, 250);
}

function drawGameOver() {
	ctx.fillStyle = 'red';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font = '48px consolas';
	ctx.fillStyle = 'black';
	ctx.fillText('GAME OVER', 10, 50);
	ctx.fillText('TOTAL SCORED '  + totalScore, 30, 150);
	ctx.fillText('NOT TOO BAD', 70, 250);
}

function collisionDetection() {
	for (let c = 0; c < brickColumnCount; c++)
		for (let r = 0; r < brickRowCount; r++) {
			let b = bricks[c][r];
			if (x > b.x && x < b.x+brickWidth &&
				y > b.y && y < b.y+brickHeight &&
				b.status === 1) {
				b.status = 0;
				score += difficulty;
				totalScore += difficulty;
				dy = -dy;
			}
		}
}

function nextLevel() {
	difficulty++;
	x	= canvas.width/2 + (Math.floor(Math.random() * 200)-100);
	y	= canvas.height-30;
	dx	= 4 + difficulty*0.5;
	dy	= -4 - difficulty*0.5;
	win = false;
	score = 0;
	for (let c = 0; c < brickColumnCount; c++) 
		for (let r = 0; r < brickRowCount; r++)
			bricks[c][r].status = 1;
	draw();
}

function restartGame() {
	x	= canvas.width/2 + (Math.floor(Math.random() * 200)-100);
	y	= canvas.height-30;
	dx	= 4;
	dy	= -4;
	score = 0;
	totalScore = 0;
	win = false;
	gameOver = false;
	difficulty = 1;
	for (let c = 0; c < brickColumnCount; c++) 
		for (let r = 0; r < brickRowCount; r++)
			bricks[c][r].status = 1;
	draw();
}

function randomColor() {
	return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("click", clickHandler, false);

function keyDownHandler(e) {
	if (gameOver || win) restartGame();
	if 		(e.code == 'KeyA') leftPressed	= true;
	else if (e.code == 'KeyD') rightPressed	= true;
}

function keyUpHandler(e) {
	if			(e.code == 'KeyA')	leftPressed		= false;
	else if		(e.code == 'KeyD')	rightPressed	= false;
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function clickHandler(e) {
	if (win) nextLevel();
	if (gameOver) restartGame();
}

// TOUCH CONTROLS
var startX = 0;

window.addEventListener('touchstart', function (event) {
	// Touch controlls
	event.preventDefault();

	if (win) nextLevel();
	if (gameOver) restartGame();
});

window.addEventListener('touchmove', function (event) {
		event.preventDefault();
		
		var touchobj = event.changedTouches[0];
		paddleX = touchobj.clientX - canvas.offsetLeft;
});