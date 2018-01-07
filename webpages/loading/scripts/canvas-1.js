var loadingText = [
	'Loading game...',
	'Loading game...',
	'Loading game...',
	'Prepare for epic duels',
	'Sail the ocean infinitely',
	'Fight horrifying monsters',
	'Play with your friends ONLINE',
	'',
	'WASD controls',
	'',
	'loading AAA blockbuster',
	'Huge amount of content',
	'',
	'',
	'Please be patient',
	'7 Game of The Year awards',
	'',
	'Totally worth the wait',
	'',
	'Knock knock',
	'> Who\'s there?',
	'',
	'',
	'',
	'> Hello',
	'> Helllloo!',
	'> Anyone there?',
	'> Anyone there?',
	'> Anyone there?',
	'',
	'',
	'',
	'',
	'',
	':)',
	':)',
	':)',
	':|',
	':|',
	':|',
	':(',
	':(',
	':(',
	':(',
	':(',
	':(',
	':(',
	'WHAT ARE YOU DOING HERE?!',
	'WHAT ARE YOU DOING HERE?!',
	'WHO SAID YOU COULD BE HERE?!',
	'',
	'',
	'You like games?',
	'',
	'',
	'',
	'',
	'',
	'',
	'I like gamez...',
	'',
	'',
	'',
	'You waited for nothing',
	'',
	'',
	'',
	'',
	'Why haven\'t you left?',
	'LEAVE!!!',
	'',
	'I want to load forever',
	'Just me and loading',
	'',
	'Do you love me?',
	'Would you like to join me?',
	'We could load together',
	'FOREVER...'
];
var canvas, ctx;
var initialTime;

function init() {
	canvas = document.getElementById('canvas');
	
	if (!canvas.getContext) {
		handleNoCanvasSupport();
		return;
	}
	ctx = canvas.getContext('2d');

	initialTime = Date.now();
	window.requestAnimationFrame(draw);
}

function draw() {
	drawSecondsTime();
	drawCircularLoading();
	drawLoadingText();

	window.requestAnimationFrame(draw);
}

function drawSecondsTime() {
	ctx.save();

	ctx.textBaseline	= 'hanging';
	ctx.font			= '24px monospace';

	var currentTimeSeconds = Math.floor((Date.now() - initialTime)/1000);
	var textMeasured	= ctx.measureText(currentTimeSeconds);

	ctx.translate(canvas.width - textMeasured.width, 0);
	ctx.clearRect(0, 0, textMeasured.width, 24);
	ctx.fillText(currentTimeSeconds, 0, 0);

	ctx.restore();
}

var rotation = 0;
function drawCircularLoading() {
	ctx.save();

	// clear loader area
	ctx.translate(canvas.width/2 - 55, canvas.height/2 - 55);
	ctx.clearRect(0, 0, 110, 110);
	//ctx.fillRect(0, 0, 101, 101);
	ctx.restore();

	ctx.save();

	ctx.translate(canvas.width/2, canvas.height/2);
	ctx.rotate((Math.PI*2)/60 * rotation--);
	ctx.translate(-50, -50);

	// draw arc0
	ctx.beginPath();
	var radius			= 50;
	var startAngle		= 0;
	var endAngle		= Math.PI*2/3;
	var anticlockwise	= false;
	ctx.arc(50, 50, radius, startAngle, endAngle, anticlockwise);

	ctx.lineWidth = 8;
	ctx.stroke();
	ctx.closePath();

	// draw arc1 10 deg away
	ctx.beginPath();

	startAngle			= endAngle + Math.PI/36;
	endAngle			= startAngle + Math.PI/6;
	ctx.arc(50, 50, radius, startAngle, endAngle, anticlockwise);

	ctx.stroke();
	ctx.closePath();

	// draw arc2 5 deg away
	ctx.beginPath();

	startAngle			= endAngle + Math.PI/36;
	endAngle			= startAngle + Math.PI/12;
	ctx.arc(50, 50, radius, startAngle, endAngle, anticlockwise);

	ctx.stroke();
	ctx.closePath();

	// draw arc3 5 deg away
	ctx.beginPath();

	startAngle			= endAngle + Math.PI/36;
	endAngle			= startAngle + Math.PI/12;
	ctx.arc(50, 50, radius, startAngle, endAngle, anticlockwise);

	ctx.stroke();
	ctx.closePath();
	
	// draw arc4 5 deg away
	ctx.beginPath();

	startAngle			= endAngle + Math.PI/36;
	endAngle			= startAngle + Math.PI/12;
	ctx.arc(50, 50, radius, startAngle, endAngle, anticlockwise);

	ctx.stroke();
	ctx.closePath();

	ctx.restore();
}

function drawLoadingText() {
	ctx.save();

	// initialize variables
	var changeTextInterval	= 3;
	var currentTimeSeconds	= Math.floor((Date.now() - initialTime)/1000);
	var textIndex			= Math.floor(currentTimeSeconds/changeTextInterval);
	if (textIndex >= loadingText.length) textIndex = loadingText.length - 1;

	ctx.font				= '26px monospace';
	var textMeasured		= ctx.measureText(loadingText[textIndex]);
	var x = canvas.width/2 - textMeasured.width/2;
	var y = canvas.height/2 + 85;

	// clear text bar area
	ctx.translate(0, y);
	ctx.clearRect(0, 0, canvas.width, 48);
	ctx.restore();
	ctx.save();

	// draw text
	ctx.textBaseline		= 'hanging';
	ctx.font				= '26px monospace';
	ctx.translate(x, y);
	ctx.fillText(loadingText[textIndex], 0, 0);

	ctx.restore();
}

var grow = 1;
function drawRect() {
	ctx.save();

	ctx.translate(canvas.width/2 - 72, canvas.height/2 - 72);
	ctx.clearRect(0, 0, 143, 143);
	ctx.restore();

	ctx.save();

	ctx.translate(canvas.width/2, canvas.height/2);
	ctx.rotate((Math.PI*2)/60 * grow++);
	ctx.translate(-50, -50);

	ctx.fillRect(0, 0, 100, 100);

	ctx.restore();
}

function handleNoCanvasSupport() {}
