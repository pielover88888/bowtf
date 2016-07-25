document.onkeydown = checkKey;

function checkKey(e) {
	e = e || window.event;
	if (e.keyCode == '32') { // jump
		jumpdate = new Date().getTime()
	}
	//for arrow keys http://i.imgur.com/FJ9t4UK.png
	if (e.keyCode == '38') {
	}
	else if (e.keyCode == '40') {
	}
	else if (e.keyCode == '37') {
	}
	else if (e.keyCode == '39') {
	}
}

