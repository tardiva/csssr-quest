(function () {

	const bar = document.getElementById('bar');
	const handle = document.getElementById('handle');
	const input = document.getElementById('input');
	const leftEdge = -5/* handle.offsetWidth/2*/;
	const rightEdge = bar.offsetWidth - 10/* handle.offsetWidth/2*/;

	function moveHandle(event, shift) {

		let eventCoord;
		let xCoord;
		let offset = 0;

		if (event.type === 'touchmove' || event.type === 'touchstart') {eventCoord = event.touches[0].pageX;}
		else {
			eventCoord = event.pageX;
			offset = pageXOffset;
		}

		const startPoint = bar.getBoundingClientRect().left + offset;
		const endPoint = startPoint + bar.offsetWidth;

		xCoord = eventCoord - shift - startPoint;

		if (eventCoord < startPoint) {xCoord = leftEdge;}
		if (eventCoord > endPoint) {xCoord = rightEdge;}

		handle.style.left = xCoord + 'px';
		input.value = xCoord;
	}

	handle.style.left = input.value + 'px';

	handle.addEventListener('mousedown', function () {

		const shift = event.pageX - handle.getBoundingClientRect().left - pageXOffset;

		handle.style.transition = '';
		handle.ondragstart = function () {
			return false;
		};

		document.onmousemove = function () {
			document.body.style.cursor = 'move';
			bar.style.cursor = 'move';
			moveHandle(event, shift);
		};

		document.onmouseup = function () {
			document.body.style.cursor = 'default';
			bar.style.cursor = 'pointer';
			document.onmousemove = null;
		};
	});

	handle.addEventListener('touchmove', function () {

		event.preventDefault();
		handle.style.transition = '';
		moveHandle(event, 0);

	});

	bar.addEventListener('click', function () {

		const shift = 5/* handle.offsetWidth/2*/;
		handle.style.transition = 'left .3s ease-out';
		moveHandle(event, shift);
	});

	bar.addEventListener('touchstart', function () {

		handle.style.transition = 'left .3s ease-out';
		moveHandle(event, 0);
	});

})();







