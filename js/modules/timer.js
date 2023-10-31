function timer(id) {
	const getNextDay = function() {
		const newDay = new Date();
		newDay.setDate(newDay.getDate() + 1);
		newDay.setHours(0, 0, 0, 0);
		return newDay;
	};

	const getTimeRemaining = function(deadline) {
		let days, hours, minutes, seconds;
		let t = deadline.getTime() - new Date(); 
		if (t <= 0) {
			deadline.setDate(deadline.getDate() + 1);
			t = deadline.getTime() - new Date(); 
		}
		days = Math.floor(t / (1000 * 60 * 60 * 24)),
		hours = Math.floor(t / (1000 * 60 * 60) % 24),
		minutes = Math.floor(t / (1000 * 60) % 60),
		seconds = Math.floor(t / 1000 % 60);

		return {
			total: t,
			days,
			hours,
			minutes,
			seconds,
		};
	};

	const getZero = function(num) {
		if (num < 10 && num > 0) {
			return num = `0${num}`;
		} else return num;
	};

	const setClock = function (selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			interval = setInterval(updateClock, 1000);

		updateClock();
		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);
			if (t.total <= 0) {
				clearInterval(interval);
			}
		}
	};
	setClock(id, getNextDay());

} 

export default timer;