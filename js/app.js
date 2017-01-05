document.addEventListener('DOMContentLoaded',function() {
	const input = document.querySelector('input');
	const links = document.querySelectorAll('.links');
	const alarm = document.querySelector('audio');
	const timer = document.querySelector('#timer');
	const countdown = timer.querySelector('#countdown');
	const returnAt = timer.querySelector('#return');
	let interval;

	function startingCountDown(seconds) {
		const now = Date.now();
		const then = now + seconds * 1000;
		displayTimeLeft(seconds);
		interval = setInterval(() => {
			const secondsLeft = Math.round((then - Date.now()) / 1000);
			if(secondsLeft === 5)
				alarm.play();
			if(secondsLeft < 0) {
				clearInterval(interval);
				return;
			}
			displayTimeLeft(secondsLeft);
		},1000);
	}

	function displayTimeLeft(seconds) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor(seconds / 60);
		const time = `${twoDigit(hours % 24)}:${twoDigit(minutes % 60)}:${twoDigit(seconds % 60)}`;
		countdown.innerHTML = time;
		document.title = time;
	}

	function calcTime(time) {
		let [hours,minutes,seconds] = [Math.round(time / 3600  % 24),Math.round(time / 60  % 60),Math.round(time  % 60)];
		const now = new Date();
		startingCountDown(time);
		seconds = seconds + now.getSeconds();
		minutes = minutes + now.getMinutes() + parseInt(seconds / 60) ;
		hours = hours + now.getHours() + parseInt(minutes / 60);
		return [hours % 24,minutes % 60,seconds % 60];
	}

	function twoDigit(str) {
		let newStr = '00' + str;
		return newStr.slice(-2);
	}

	function handleInput(e) {
		e.preventDefault();
		let time = e.target.dataset.time || e.target.value  *  60;
		const [hours,minutes,seconds] = calcTime(time);
		returnAt.innerHTML = `Return at ${twoDigit(hours)}:${twoDigit(minutes)}:${twoDigit(seconds)}`;
	}

	links.forEach(link => link.addEventListener('click', (e) => {
		clearInterval(interval);
		handleInput(e);
	}));

	input.addEventListener('change', (e) => {
		clearInterval(interval);
		handleInput(e);
	});

	input.addEventListener('keyup', (e) => {
		clearInterval(interval);
		handleInput(e);
	});

});
