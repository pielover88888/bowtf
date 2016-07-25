var img;
function preload() {
  img = loadImage("assets/triangle_white.png");
}

function setup() {
	// Create the canvas
	createCanvas(720, 400);
	background(200);
}

function draw() {
  image(img, 0, 0);
}