document.onkeydown = checkKey;

function checkKey(e) {
	e = e || window.event;
	if (e.keyCode == '32') { // jump
		jumpdate = new Date().getTime()
	}
	//for arrow keys http://i.imgur.com/FJ9t4UK.png
	if (e.keyCode == '38') { // up
		boids.points[0].y += 0.5 * Math.sin(boids.points[0].angle)
	}
	else if (e.keyCode == '40') { // down
		boids.points[0].x += 0.5 * Math.cos(boids.points[0].angle)
	}
	else if (e.keyCode == '37') { // left
		boids.points[0].angle = boids.points[0].angle - 0.1
	}
	else if (e.keyCode == '39') { // right
		boids.points[0].angle = boids.points[0].angle + 0.1
	}
}

