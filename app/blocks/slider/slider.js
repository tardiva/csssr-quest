class Slider {

	constructor() {
		this.bar = document.getElementById('bar');
		this.handle = document.getElementById('handle');
		this.startPoint = this.bar.getBoundingClientRect().left + pageXOffset;
		this.endPoint = this.startPoint + this.bar.offsetWidth;
		this.leftEdge = -5/* (handle.offsetWidth / 2)*/;
		this.rightEdge = this.endPoint - this.startPoint - 10/* (handle.offsetWidth / 2)*/;
	}

	shift(event) {
		return event.pageX - this.handle.getBoundingClientRect().left;
	}

	moveHandle(event, shift) {

		let eventCoord;
		let xCoord;

		if (event.type === 'mousemove') {eventCoord = event.pageX;}
			else if (event.type === 'touchmove') {eventCoord = event.touches[0].pageX;}

		xCoord = eventCoord - shift - this.startPoint;

		if (eventCoord < this.startPoint) {xCoord = this.leftEdge;}
		if (eventCoord > this.endPoint) {xCoord = this.rightEdge;}

		this.handle.style.left = xCoord + 'px';
	}

}

const slider = new Slider();

slider.handle.addEventListener('mousedown', function (eventD) {

	const shift = slider.shift(eventD);

	this.ondragstart = function () {
		return false;
	};

	document.onmousemove = function (eventM) {
		slider.moveHandle(eventM, shift);
	};

	document.onmouseup = function () {
		document.onmousemove = null;
	};
});

slider.handle.addEventListener('touchstart', function () {

	this.addEventListener('touchmove', function (eventM) {

		eventM.preventDefault();
		slider.moveHandle(eventM, 0);

	});

});








