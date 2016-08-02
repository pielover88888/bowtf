Boids.prototype.gen_pens = function () {
	var y = random(height-height/4)
	for (var i = 0; i < colors.length; i++) {
		this.pens[i] = {x:150 * (i + 1),y:y,colorNumber:i,color:colors[i]}
	}
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

Boids.prototype.draw_pens = function () {
	for (var i = 0; i < this.pens.length; i++) {
		var pen = this.pens[i]
		temp = hexToRgb(pen.color)
		stroke(temp.r,temp.g,temp.b,0.5)
		strokeWeight(40)
		point(pen.x,pen.y)
		strokeWeight(1)
		stroke(0)
	}
}
