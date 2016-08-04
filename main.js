var img;
var boids;
var lastUpdate
var dt = 0
var now

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
	now = Date.now()
	dt = now - lastUpdate
	background(130);
	player.draw();
	boids.draw();
	lastUpdate = now
	text(Math.round(boids.time)+ " seconds",10,10)
}
