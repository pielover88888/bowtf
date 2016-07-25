var img;
function preload() {
	img = loadImage("assets/triangle_white.png");
}

function setup() {
	// Create the canvas
	createCanvas(720, 400);
	background(130);
}
x = 150;
y = 100;
function draw() {
	translate(x,y);
	rotate(0.9);
	image(img,0,0);
	translate(-x,-y);
}
