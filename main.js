var img;
var boids;

function preload() {
	img = loadImage("assets/triangle_white.png");
}

function setup() {
	start = new Date().getTime();
	// Create the canvas
	createCanvas(720, 400);
	boids = new Boids(20);
	player = new Player();
}
function draw() {
	clear();
	background(130);
	player.draw();
	boids.draw();
	text(time/1000 + " seconds",10,10)
}
