var img;
var boids;

function preload() {
	img = loadImage("assets/triangle_white.png");
}

function setup() {
	// Create the canvas
	createCanvas(720, 400);
	boids = new Boids(10);
	player = new Player();
}
function draw() {
	clear();
	background(130);
	player.draw();
	boids.draw();
}
