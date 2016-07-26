var distance = function(x1,y1,x2,y2){
	return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
}

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
		this.points[i] = {
			"x":random(width),"y":random(height),
			"vx":0,"vy":0,
			"angle":random(TWO_PI),
		}
	}
}

/* Get neighbours */
Boids.prototype.getneighbours = function(n) {
	var d
	var neighbours = []
	for (var i = 0; i < this.points.length; i++) {
		d = distance(this.points[n].x,this.points[n].y,this.points[i].x,this.points[i].y)
		if (i!=n && d < 65){
			neighbours.push(i)
		}
	}
	return neighbours
}

/* Draws the flock */
Boids.prototype.draw = function() {
	for (var i = 0; i < this.points.length; i++) {

		/* Intergrate velocity */
		this.points[i].vx = Math.cos(this.points[i].angle)
		this.points[i].vy = Math.sin(this.points[i].angle)

		this.points[i].x += this.points[i].vx
		this.points[i].y += this.points[i].vy

		this.points[i].vx *= 0.98
		this.points[i].vy *= 0.98

		/* Teleport */
		if (this.points[i].x < 0) {
			this.points[i].x = width
		}
		if (this.points[i].x > width) {
			this.points[i].x = 0
		}
		if (this.points[i].y < 0) {
			this.points[i].y = height
		}
		if (this.points[i].y > height) {
			this.points[i].y = 0
		}

		/* Draw */ 
		push()
		translate(this.points[i].x, this.points[i].y)
		rotate(this.points[i].angle+1.5)
		tint(0, 200, 250)
		image(this.img,0-this.img.width/4,0-this.img.height/4,this.img.width/2,this.img.height/2)
		strokeWeight(10);
		point(0,0);
		translate(-this.points[i].x, -this.points[i].y)
		pop()
	}
}
