(function () {

	const bar = document.getElementById('bar');
	const handle = document.getElementById('handle');
	const leftEdge = -5 /*handle.offsetWidth/2*/;
	const rightEdge = bar.offsetWidth - 10 /*handle.offsetWidth/2*/;

	function moveHandle(event, shift) {

		let eventCoord;
		let xCoord;
		let offset = 0;
		let startPoint;
		let endPoint;

		if (event.type === 'touchmove') {eventCoord = event.touches[0].pageX;}
		else  {
			    eventCoord = event.pageX;
				offset = pageXOffset;
		}

		startPoint = bar.getBoundingClientRect().left + offset;
		endPoint = startPoint + bar.offsetWidth;

		xCoord = eventCoord - shift - startPoint;

		if (eventCoord < startPoint) {xCoord = leftEdge;}
		if (eventCoord > endPoint) {xCoord = rightEdge;}

		handle.style.left = xCoord + 'px';
	}

	handle.addEventListener('mousedown', function () {

		let shift = event.pageX - handle.getBoundingClientRect().left - pageXOffset;

		handle.ondragstart = function () {
			return false;
		};

		document.onmousemove = function () {
			moveHandle(event, shift);
		};

		document.onmouseup = function () {
			document.onmousemove = null;
		};
	});

	handle.addEventListener('touchmove', function () {

			event.preventDefault();
			moveHandle(event, 0);

	});

})();







