$(window).ready(init);

function init() {
	var car			= new Car(150, 0, 4);
	var road		= new Road(0, -500, 1);
	var landscape	= new Landscape(0, 0, 1);
	var stage		= document.getElementById('stage');
	var stageRect	= stage.getBoundingClientRect();
	
	// controlls functions
	function accelerate()		{ car.accelerating		= true; }
	function brake()			{ car.braking			= true; }
	function steerLeft()		{ car.steerLeft			= true; car.steerRight	= false; }
	function steerRight()		{ car.steerRight		= true; car.steerLeft	= false; }
	function stopAccelerate()	{ car.accelerating		= false; }
	function stopBrake()		{ car.braking			= false; }
	function stopSteerLeft()	{ car.steerLeft			= false; }
	function stopSteerRight()	{ car.steerRight		= false; }
	// fullscreen
	function goFullscreen() {
		if		(this.stage.requestFullscreen)			this.stage.requestFullscreen();
		else if (this.stage.msRequestFullScreen)		this.stage.msRequestFullScreen();
		else if (this.stage.mozRequestFullScreen)		this.stage.mozRequestFullScreen();
		else if (this.stage.webkitRequestFullScreen)	this.stage.mozRequestFullScreen();
	}

	this.stage = document.getElementById('stage');
	window.addEventListener('keydown', function (event) {
		// WASD controlles
		if 		(event.code == 'KeyW') accelerate();
		else if (event.code == 'KeyS') brake();
		if 		(event.code == 'KeyA') steerLeft();
		else if (event.code == 'KeyD') steerRight();
		if 		(event.code == 'KeyF') {
			goFullscreen();
		}
	});
	this.stage		= document.getElementById('stage');

	window.addEventListener('keyup', function (event) {
		// WASD controlles
		if 		(event.code == 'KeyW') stopAccelerate();
		else if (event.code == 'KeyS') stopBrake();
		if 		(event.code == 'KeyA') stopSteerLeft();
		else if (event.code == 'KeyD') stopSteerRight();
	});

	// Touch controlls scheme
	/**************************
	 *		fullscreen	
	 *-------------------------
	 *			|
	 *			|	brake
	 *	steer	|--------------
	 *			|
	 *			|	accelerate
	 *			|
	 **************************/
	var startX = 0;

	window.addEventListener('touchstart', function (event) {
		// Touch controlls
		event.preventDefault();

		var touchobj	= event.changedTouches[0];
		var xPrecentage = (touchobj.clientX - stageRect.left) / stageRect.width;
		var yPrecentage = (touchobj.clientY - stageRect.top) / stageRect.height;

		if		(yPrecentage < 0.2) goFullscreen();
		else if (xPrecentage < 0.5) startX = touchobj.clientX;
		else if	(yPrecentage > 0.5) accelerate();
		else if (yPrecentage < 0.5) brake();
	});

	window.addEventListener('touchmove', function (event) {
		event.preventDefault();

		var touchobj	= event.changedTouches[0];
		var xPrecentage = (touchobj.clientX - stageRect.left) / stageRect.width;

		if (xPrecentage < 0.5) {
			if		(touchobj.clientX > startX) steerRight();
			else if	(touchobj.clientX < startX) steerLeft(); 
		}
	});

	window.addEventListener('touchend', function (event) {
		// Touch controlls
		event.preventDefault();

		var touchobj	= event.changedTouches[0];
		var xPrecentage = (touchobj.clientX - stageRect.left) / stageRect.width;
		var yPrecentage = (touchobj.clientY - stageRect.top) / stageRect.height;

		if 		(xPrecentage < 0.5) { stopSteerRight(); stopSteerLeft(); }
		else if	(yPrecentage > 0.5) stopAccelerate();
		else if (yPrecentage < 0.5) stopBrake();
	});

	window.requestAnimationFrame(() => draw(car, road, landscape));
}

function draw(car, road, landscape) {
	car.update();
	landscape.x	= landscape.convertMovementToX(car.steerLeft, car.steerRight, car.speed != 0);
	road.determineVelocity(car.speed);
	
	road.draw();
	landscape.draw();
	car.draw();

	window.requestAnimationFrame(() => draw(car, road, landscape));
}

function handleNoCanvasSupport() {}
