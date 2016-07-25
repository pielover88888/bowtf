var img;
function preload() {
	img = loadImage("assets/triangle_white.png");
}

function setup() {
	// Create the canvas
	createCanvas(720, 400);
}
x = 100;
y = 100;
function draw() {
	clear();
	background(130);
	translate(x,y);
	rotate(random(0,PI*2));
	image(img,0-img.width/4,0-img.height/4,img.width/2,img.height/2);
	translate(-x,-y);
}
