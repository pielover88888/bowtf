var img;
function preload() {
	img = loadImage("assets/triangle_white.png");
}

function setup() {
	// Create the canvas
	createCanvas(720, 400);
}
x = 150;
y = 100;
function draw() {
	clear();
	background(130);
	translate(x,y);
	rotate(10);
	image(img,0,0);
	translate(-x,-y);
}
