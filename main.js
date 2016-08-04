var img;
var boids;
var lastUpdate
var dt = 0

function preload() {
	img = loadImage("assets/triangle_white.png");
}

function setup() {
	lastUpdate = Date.now()
	// Create the canvas
	createCanvas(720, 400);
	boids = new Boids(20);
	player = new Player();
}

function draw() {
	clear();
	dt = Date.now() - lastUpdate
	background(130);
	player.draw();
	boids.draw();
	text(boids.time/1000 + " seconds",10,10)
}
