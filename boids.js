/* Init */
function Boids(count) {
	this.count = count
	this.points = []
	this.gen()
	this.img = loadImage("assets/triangle_white.png");
}

/* Generates the flock */
function Boids.prototype.gen() {
	for (var i = 0; i < this.count; i++) {
		this.points[i] = {"x":random(width),"y":random(height),"angle":random(TWO_PI)}
	}
}

/* Draws the flock */
function Boids.prototype.draw() {
	for (var i = 0; i < this.points.length; i++) {
		var point = this.points[i]
		translate(point.x,point.y);
		push()
		rotate(point.angle)
		image(this.img,0-this.img.width/4,0-this.img.height/4,this.img.width/2,this.img.height/2);
		pop()
		translate(-point.x,-point.y)
	}
}