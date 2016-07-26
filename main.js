var img;
var boids;

function preload() {
	img = loadImage("assets/triangle_white.png");
}

function setup() {
	// Create the canvas
	createCanvas(720, 400);
	boids = new Boids(10);
}
function draw() {
	clear();
	background(130);
	boids.draw(); // important bit
}
