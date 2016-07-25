/* Init */
var Boids = function(count) {
	this.count = count
	this.points = []
	this.img = loadImage("assets/triangle_white.png");
	this.gen()
}

/* Generates the flock */
Boids.prototype.gen = function() {
	for (var i = 0; i < this.count; i++) {
		this.points[i] = {"x":random(width),"y":random(height),"angle":random(TWO_PI)}
	}
}

/* Draws the flock */
Boids.prototype.draw = function() {
	for (var i = 0; i < this.points.length; i++) {
		var point = this.points[i]
		push()
		translate(point.x,point.y)
		rotate(point.angle)
		image(this.img,0-this.img.width/4,0-this.img.height/4,this.img.width/2,this.img.height/2)
		translate(-point.x,-point.y)
		pop()
	}
}