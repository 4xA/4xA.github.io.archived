const STEER = 3;

function Car(topSpeed, speed, acceleration) {
	// car state
	this.topSpeed			= topSpeed;
	this.speed				= 0;
	this.acceleration		= acceleration;
	this.steeringWheelAngle = 0;

	// car logic
	this.accelerating		= false;
	this.braking			= false;
	this.steerLeft			= false;
	this.steerRight			= false;

	// style values
	this.speedometerPaddingLeft		= 500;
	this.speedometerPaddingBottom	= 50;
	this.steeringPaddingLeft		= 100;
	this.steeringPaddingBottom		= -50;

	this.update	= function () {
		this.changeSpeed();

		this.steer();
	}

	this.draw = function() {
		var canvas = document.getElementById('game-layer');

		if (!canvas.getContext){
			handleNoCanvasSupport();
			return;
		}
		var ctx = canvas.getContext('2d');

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		this.drawSpeedometer(canvas, ctx);
		this.drawSteeringWheel(canvas, ctx);
	}

	/************
	 * GRAPHICS
	 ************/
	this.drawSpeedometer = function (canvas, ctx) {
		ctx.save();

		ctx.translate(440, 373);

		var rotationAngle = (225/this.topSpeed)*Math.floor(this.speed) - 45;	// 225 is the speedometer end angle
		ctx.translate(45, 45);
		ctx.rotate( (Math.PI)/180 * (rotationAngle) );
		ctx.translate(-45, -45);

		ctx.fillRect(20, 44.5, 31, 1);

		ctx.restore();
	}

/*	this.drawSpeedometer = function (canvas, ctx) {
		ctx.save();

		ctx.translate(this.speedometerPaddingLeft, canvas.height-200-this.speedometerPaddingBottom);

		var rotationAngle = (225/this.topSpeed)*Math.floor(this.speed) - 45;	// 225 is the speedometer end angle
		ctx.translate(100, 100);
		ctx.rotate( (Math.PI)/180 * (rotationAngle) );
		ctx.translate(-100, -100);

		ctx.fillRect(32, 99, 75, 2);

		ctx.restore();
	}
	*/

	this.steeringWheelImage		= new Image();
	this.steeringWheelImage.src = 'images/steering-wheel.svg';
	this.drawSteeringWheel = function (canvas, ctx) {
		ctx.save();

		//ctx.translate(this.steeringPaddingLeft, canvas.height-315-this.steeringPaddingBottom);
		ctx.translate(50, 242);

		ctx.translate(157.5, 157.5)
		ctx.rotate((Math.PI)/180 * (this.steeringWheelAngle));
		ctx.translate(-157.5, -157.5)

		// TODO: modify code to make sure image is pre-loaded
		ctx.drawImage(this.steeringWheelImage, 0, 0);

		ctx.restore();
	}

	/******************
	 *	FUNCTIONALITY
	 ******************/
	this.changeSpeed		= function () {
		var scale			= 10;
		var speed 			= this.speed*scale;
		var topSpeed		= this.topSpeed*scale;
		var acceleration	= this.acceleration*scale;
		var newSpeed;

		if (this.braking) {
			newSpeed = speed - acceleration;
		} else {
			newSpeed = 	(this.accelerating) 											?
						speed + acceleration*(0.25 - speed/(4*topSpeed)) : 
						speed - acceleration/6; 
		}

		newSpeed /= scale;
		// new speed is within valid limits
		if 		(newSpeed < 0)
			this.speed = 0;
		else if	(newSpeed > this.topSpeed)
			this.speed = this.topSpeed;
		else
			this.speed = newSpeed;
	}

	this.steer				= function () {
 		// steering wheel rotates no more than 90 degrees on each side
		if (this.steeringWheelAngle >= 90 && this.steerRight || 
			this.steeringWheelAngle <= -90 && this.steerLeft)
		   	return;

		if 		(this.steerRight)				this.steeringWheelAngle += STEER;
		else if (this.steerLeft)				this.steeringWheelAngle -= STEER;
		else if (this.steeringWheelAngle < 0) 	this.steeringWheelAngle += STEER;
		else if (this.steeringWheelAngle > 0) 	this.steeringWheelAngle -= STEER;
	}
	
	/**********************
	 * BACKGROUND GRAPHICS
	 **********************/
	this.cabinImage		= new Image();
	this.cabinImage.src	= 'images/interior-view.png';

	this.drawCabin		= function(canvas, ctx) {
		ctx.drawImage(this.cabinImage, 0, 0);
	}

	this.drawOuterRing	= function (canvas, ctx) {
		ctx.save();

		ctx.lineWidth = 2;

		var radius		= 45;
		var startAngle	= 0;
		var endAngle	= Math.PI*2;

		ctx.beginPath();
		ctx.fillStyle = '#E2E2E2';
		ctx.arc(45, 45, radius, startAngle, endAngle, true);
		ctx.closePath();
		ctx.fill();

		ctx.beginPath();
		ctx.strokeStyle = '#071E2B';
		ctx.arc(45, 45, radius, startAngle, endAngle, true);
		ctx.closePath();

		ctx.stroke();

		ctx.restore();
	}

	this.drawSpeedMarks = function(canvas, ctx) {
		var marks = 6;
		for (var i = 0; i < marks; i++){
			// marks
			ctx.save();
			ctx.translate(45, 45);
			ctx.rotate( (Math.PI)/180 * (-45 + i*45));
			ctx.translate(-45, -45);

			ctx.fillRect(0, 45, 3, 1);

			// readings
			ctx.textBaseline	= 'hanging';
			ctx.font			= '6px sans-serif';
			var reading 		= Math.floor(i*(this.topSpeed/(marks - 1)));

			// sloppy solution. it's been buggin me.
			ctx.translate(10, 45);

			if		(i === 0) 
				ctx.rotate( (Math.PI)/180 * (45));
			else if	(i === 1);
			else if (i === 2)
				ctx.rotate( (Math.PI)/180 * (-45));
			else if (i === 3)
				ctx.rotate( (Math.PI)/180 * (-90));
			else if (i === 4)
				ctx.rotate( (Math.PI)/180 * (225));
			else if (i === 5)
				ctx.rotate( (Math.PI)/180 * (180));

			ctx.translate(-10, -45);

			ctx.fillText(reading, 4, 44);

			ctx.restore();
		}
	}

	this.drawSubSpeedMarks = function(canvas, ctx) {
		// no context save/restore
		var submarks = 16;
		for (var i = 0; i < submarks; i++) {
			ctx.save();
			ctx.translate(45, 45);
			ctx.rotate( (Math.PI)/180 * (-45 + i*15));
			ctx.translate(-45, -45);

			ctx.fillRect(0, 45, 2, 1);

			ctx.restore();
		}
	}

	this.drawPointerCetner = function(canvas, ctx) {
		// center circle
		ctx.save();

		ctx.fillStyle = '#D93402';
		ctx.beginPath();
		ctx.arc(45, 45, 3, 0, Math.PI*2, true);
		ctx.fill();

		ctx.restore();
	}

	this.drawCarBackground = function (canvas, ctx) {

		this.drawCabin(canvas, ctx);

		// speedometer background
		ctx.save();
		ctx.translate(440, 373);

		this.drawOuterRing(canvas, ctx);
		this.drawSpeedMarks(canvas, ctx);
		//this.drawSubSpeedMarks(canvas, ctx);
		this.drawPointerCetner(canvas, ctx);

		ctx.restore();
	}

	var backgroundCanvas	= document.getElementById('interior-layer');
	var backgroundContext	= backgroundCanvas.getContext('2d');
	this.cabinImage.onload	= () => { this.drawCarBackground(backgroundCanvas, backgroundContext); };
}
