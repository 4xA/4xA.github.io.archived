resize();

function resize() {
	var stage = document.getElementById('stage');

	var wHRatio	= 2;

	var newWidth					= window.innerWidth;
	var newHeight					= window.innerHeight;
	var fullscreenWHRatio = newWidth / newHeight;

	if (fullscreenWHRatio > wHRatio) {
		newWidth = newHeight * wHRatio;
		stage.style.height	= newHeight + 'px';
		stage.style.width		= newWidth + 'px';
	} else {
		newHeight = newWidth / wHRatio;
		stage.style.width		= newWidth + 'px';
		stage.style.height	= newHeight + 'px';
	}

	stage.style.marginTop		= (-newHeight / 2) + 'px';
	stage.style.marginLeft	= (-newWidth / 2) + 'px';
}
