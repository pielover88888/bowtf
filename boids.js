var distance = function(x1,y1,x2,y2){
	return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
}

var avg_angle = function(angles){
	var x = 0
	var y = 0
	for (var i = 0; i < angles.length; i++) {
		angle = angles[i]
		x += Math.cos(angle)
		y += Math.sin(angle)
	}
	return Math.atan2(y, x)
}

var colors = ["#17a92f","#585858","#d7dd00","#e84820"]

/* Init */
var Boids = function(count) {
	this.time = 0
	this.count = count
	this.points = []
	this.pens = []
	this.img = loadImage("assets/triangle_white.png");
	this.gen()
	this.nradius = 70
	this.close = 20
	this.slider = createSlider(0, 255, 100);
	this.racebox = createCheckbox('Only flock with same color', false);
	this.slider.position(10,40)

	this.gen_pens()
}

/* Generates the flock */
Boids.prototype.gen = function() {
	for (var i = 0; i < this.count; i++) {
		this.points[i] = {
			"color":Math.round(random(1,4)),
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
	var neighbours_angles = []
	var distances = []
	var ax = 0
	var ay = 0
	var ncount = 0
	stroke(0)
	for (var i = 0; i < this.points.length; i++) {
		d = distance(this.points[n].x,this.points[n].y,this.points[i].x,this.points[i].y)
		
		pd = distance(this.points[n].x,this.points[n].y,player.x,player.y)
		if(i!=n && pd < this.nradius){
			line(this.points[n].x,this.points[n].y,player.x,player.y)
			neighbours_angles.push(player.angle)
		}

		if (i!=n && d < this.nradius){
			if(this.points[i].color != this.points[n].color && this.racebox.checked()){
                                continue;
                        }
			ax += this.points[i].x
			ay += this.points[i].y
			ncount += 1
			line(this.points[n].x,this.points[n].y,this.points[i].x,this.points[i].y)
			neighbours.push(i)
			neighbours_angles.push(this.points[i].angle)
			distances.push(d)
		}
	}
	return {"indexes":neighbours,"angles":neighbours_angles,"distances":distances,ax:ax/ncount,ay:ay/ncount}
}

/* Steer towards the average heading direction */
Boids.prototype.align = function(i, neighbours){
		
		var avg = avg_angle(neighbours.angles)

		for (var j = 0; j < neighbours.indexes.length; j++) {
			var n = neighbours.indexes[j]
			var pd = distance(this.points[n].x,this.points[n].y,player.x,player.y)
			if (pd < this.nradius){
				avg = player.angle
			}
			this.points[n].angle = avg
		}
}


/* Steer away if too close to neighbours */
Boids.prototype.seperation = function(i, neighbours){
		for (var j = 0; j < neighbours.indexes.length; j++) {
			var n = neighbours.indexes[j]
			var d = neighbours.distances[j]
			if(neighbours.indexes[j].vx === 0){
				console.log("DO NOT AVOID PEN")
				return;
			}
			if (d <= this.close){
				this.points[n].angle = -(this.points[n].angle*0.80)
			}
		}
}

/* Steer to a avg. pos */
Boids.prototype.cohesion = function(i, neighbours){
		for (var j = 0; j < neighbours.indexes.length; j++) {
			var n = neighbours.indexes[j]
			var angle = Math.atan2(this.points[n].y-neighbours.ay,this.points[n].x-neighbours.ax)
			if(distance(this.points[i].x,this.points[i].y,neighbours.ax,neighbours.ay) > this.nradius - 20){
				this.points[n].angle = angle
			}
		}
}

/* Draws the flock */
Boids.prototype.draw = function() {
	/* Draw pens */
	this.draw_pens()

	this.nradius = this.slider.value()

	for (var i = 0; i < this.points.length; i++) {

		/* Intergrate velocity */
		if(random(1) > 0.9){
			this.points[i].vx = Math.cos(this.points[i].angle)
			this.points[i].vy = Math.sin(this.points[i].angle)
		}
		for(var y = 0; y < this.pens.length; y++){
			if(distance(this.points[i].x,this.points[i].y,this.pens[y].x,this.pens[y].y) < 20 && this.pens[y].colorNumber === this.points[i].color - 1){
				this.points[i].vx = 0;
				this.points[i].vy = 0;
			}
		}

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

		/* Life */
		var neighbours = this.getneighbours(i);
		this.align(i,neighbours);
		this.seperation(i,neighbours);
		this.cohesion(i,neighbours);
		

		/* Draw boids */ 
		push();
		translate(this.points[i].x, this.points[i].y);
		rotate(this.points[i].angle+1.5);
		tint(colors[this.points[i].color - 1]);
		image(this.img,0-this.img.width/4,0-this.img.height/4,this.img.width/2,this.img.height/2);
		strokeWeight(10);
		point(0,0);
		translate(-this.points[i].x, -this.points[i].y);
		pop();
		fill(255,255,255);
		text([i],this.points[i].x,this.points[i].y + 5);
		text(Math.round((this.points[i].angle) * (180/PI)),this.points[i].x,this.points[i].y + 15); // text
		fill(0,0,0);
		this.time += dt/1000
	}
}
