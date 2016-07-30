Boids.prototype.gen_pens = function () {
	var y = random(height-height/4)
	for (var i = 0; i < colors.length; i++) {
		this.pens[i] = {x:150 * (i + 1),y:y,color:colors[i]}
	}
}

Boids.prototype.draw_pens = function () {
	for (var i = 0; i < this.pens.length; i++) {
		var pen = this.pens[i]

		stroke(pen.color)
		strokeWeight(40)
		point(pen.x,pen.y)
		strokeWeight(1)
		stroke(0)
	}
}