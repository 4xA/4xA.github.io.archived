function Road (x, y, vy) {
	this.roadAnimationImage		= new Image();
	this.roadAnimationImage.src	= 'images/road-animation.png';

	this.draw 					= function () {
		var canvas = document.getElementById('road-animation-layer');

		if (!canvas.getContext){
			handleNoCanvasSupport();
			return;
		}
		var ctx = canvas.getContext('2d');

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		this.drawRoadAnimation(canvas, ctx);
	}

	this.drawRoadAnimation	= function (canvas, ctx) {
		y += vy;
		if (y >= 0) y = -500;

		ctx.drawImage(this.roadAnimationImage, x, y);
	}

	this.determineVelocity	= function (speed) {
		if (speed == 0)
			vy = 0;
		else
			vy = Math.floor(speed/12) + 1;;
	}

	/**********************
	 * BACKGROUND GRAPHICS
	 **********************/
	this.roadImage			= new Image();
	this.roadImage.src		= 'images/road.svg';

	this.drawRoad		= function(canvas, ctx) {
		ctx.drawImage(this.roadImage, 0, 0);
	}

	var backgroundCanvas	= document.getElementById('road-layer');
	var backgroundContext	= backgroundCanvas.getContext('2d');
	this.roadImage.onload	= () => { this.drawRoad(backgroundCanvas, backgroundContext); };
}
