const MOVMENT_ALOWED = 250;
const X_CENTER = -250;
const HORIZONTAL_SPEED = 4;

function Landscape() {
  /**********************
   * BACKGROUND GRAPHICS
   **********************/
  this.x = X_CENTER;
  this.y = 0;
  this.landscapeImage = new Image();
  this.landscapeImage.src = "images/landscape.svg";

  this.draw = function() {
    var canvas = document.getElementById("landscape-layer");

    if (!canvas.getContext) {
      handleNoCanvasSupport();
      return;
    }
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.drawLandscape(canvas, ctx);
  };

  this.drawLandscape = function(canvas, ctx) {
    ctx.drawImage(this.landscapeImage, this.x, this.y);
  };

  this.convertMovementToX = function(shiftLeft, shiftRight, shift) {
    var returnValue = this.x;
    if (!shift) return returnValue;

    if (shiftLeft) returnValue = this.x + HORIZONTAL_SPEED;
    else if (shiftRight) returnValue = this.x - HORIZONTAL_SPEED;

    if (returnValue > 0 || returnValue < -500) return this.x;

    return returnValue;
  };
}
