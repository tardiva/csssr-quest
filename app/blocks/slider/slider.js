(function () {

	const bar = document.getElementById('bar');
	const handle = document.getElementById('handle');

	function moveHandle(event, shift) {

		let eventCoord;
		let xCoord;

		if (event.type === 'touchmove') {eventCoord = event.touches[0].pageX;}
		else  {eventCoord = event.pageX;}

		const startPoint = bar.getBoundingClientRect().left + pageXOffset;
		const endPoint = startPoint + bar.offsetWidth;
		const leftEdge = -5 /*handle.offsetWidth/2*/;
		const rightEdge = endPoint - startPoint - 10 /*handle.offsetWidth/2*/;

		xCoord = eventCoord - shift - startPoint;

		console.log(pageXOffset + '-offset ' + startPoint + '-startPoint ' + eventCoord + '-eventCoord ' + xCoord + '-xCoord ' + endPoint + '-endPoint ' + shift + '-shift');

		if (eventCoord < startPoint) {xCoord = leftEdge;}
		if (eventCoord > endPoint) {xCoord = rightEdge;}

		handle.style.left = xCoord + 'px';
	}

	handle.addEventListener('mousedown', function (eventD) {

		let shift = event.pageX - handle.getBoundingClientRect().left - pageXOffset;

		handle.ondragstart = function () {
			return false;
		};

		document.onmousemove = function (eventM) {
			moveHandle(eventM, shift);
		};

		document.onmouseup = function () {
			document.onmousemove = null;
		};
	});

	handle.addEventListener('touchstart', function () {

		this.addEventListener('touchmove', function (eventM) {

			eventM.preventDefault();
			moveHandle(eventM, 0);

		})
	});

})();







