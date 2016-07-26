/* Player init */
var Player = function () {
	this.x = random(width)
	this.y = random(height)
	this.vx = 0
	this.vy = 0
	this.angle = 0
	this.img = loadImage("assets/triangle_white.png")
}

/* Angle vel. */
Player.prototype.avel = function() {
	this.vx = Math.cos(this.angle)
	this.vy = Math.sin(this.angle)
}

/* Key input */
Player.prototype.key = function() {
	if (keyIsDown(UP_ARROW)){
		this.avel()
		this.vx += this.vx
		this.vy += this.vy
	}
	if (keyIsDown(DOWN_ARROW)){
		this.avel()
		this.vx -= this.vx
		this.vy -= this.vy
	}
	if (keyIsDown(LEFT_ARROW)){
		this.angle -= 0.1
	}
	if (keyIsDown(RIGHT_ARROW)){
		this.angle += 0.1
	}
}

/* Draw player */
Player.prototype.draw = function() {
	this.key()
	
	/* Teleport */
	if (this.x < 0) {
		this.x = width
	}
	if (this.x > width) {
		this.x = 0
	}
	if (this.y < 0) {
		this.y = height
	}
	if (this.y > height) {
		this.y = 0
	}

	/*Update*/
	this.vx *= 0.98
	this.vy *= 0.98

	this.x += this.vx
	this.y += this.vy

	if(this.angle > TWO_PI){this.angle = 0;}
	if(this.angle < 0){this.angle = TWO_PI;}
	
	/* Draw */ 
	push()
	translate(this.x, this.y)
	rotate(this.angle+1.5)
	image(this.img,0-this.img.width/4,0-this.img.height/4,this.img.width/2,this.img.height/2)
	translate(-this.x, -this.y)
	pop()
}
