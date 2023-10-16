document.addEventListener('DOMContentLoaded', () => {

	// Tabs

	let tabs = document.querySelectorAll('.tabheader__item'), // Извлечение каждого пункта выбора таба
		tabsContent = document.querySelectorAll('.tabcontent'), // Извлечение наполнения таба
		tabsParent = document.querySelector('.tabheader__items'); // Извлечение контейнера где лежат табы чтобы регистрировать нажатия даже по новым табам

	function hideTabContent() { // Объявление функции которая скрывает все табы
		tabsContent.forEach(el => { // Перебор всех элементов псевдомассива с наполнением табов
			el.classList.add('hide');
			el.classList.remove('show', 'fade');
			el.style.display = 'none'; // Каждый элемент массива получает inline свойство display: none
		});
		tabs.forEach(el => { // Перебор всех элементов псевдомассива с табами
			el.classList.remove('tabheader__item_active'); // Удаляем класс активности у всех табов
		});
	}

	function showTabContent(i = 0) { // Функция отображающая таб, имеет индекс по-умолчанию = 0 (первый эл-т)
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabsContent[i].style.display = 'block'; // Возвращаем display: block чтобы было видно наполнение таба
		tabs[i].classList.add('tabheader__item_active'); // Добавляем табу класс активности
	}

	hideTabContent(); 
	showTabContent(); 

	tabsParent.addEventListener('click', function(event) { // Обработчик событий, из которого мы берем событие. Обрабатываемое событие - клик
		const target = event.target; // event.target регистрирует нажатие и возвращает его нам, мы сделали из этого переменную чтобы было легче обращаться
		if(target && target.classList.contains('tabheader__item')) { // Первый аргумент (target) гарантирует что значение не будет равно null, второе проверяет
			// содержит ли элемент который был нажат класс tabheader__item
			tabs.forEach((item, i) => { // применяем на псевдомассив табов метод forEach
				if (target == item) { // Если точка нажатия совпала с табом, то мы выводим этот таб
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	// Timer

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
	setClock('.timer', getNextDay());

	// Modal

	const btnModal = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');

	const openModal = () => {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
	};

	const closeModal = () => {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = 'auto';
	};

	btnModal.forEach(el => {
		el.addEventListener('click', openModal);
	});




	modal.addEventListener('click', e => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const showModalByScroll = function() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	};

	window.addEventListener('scroll', showModalByScroll);

	const hei = document.querySelector('.offer__descr');
	let observer = new MutationObserver(mutationRecords => {
		console.log(mutationRecords);
	});
	

	observer.observe(hei, {
		childList: true
	});

	// Using classes for cards
	
	class MenuCard {
		constructor(img, subtitle, description, price, parentSelector, ...classes){
			this.img = img;
			this.subtitle = subtitle;
			this.description = description;
			this.price = price;
			this.transfer = 97;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.changeToRUB();
		}

		changeToRUB() {
			this.price = Math.ceil(this.price * this.transfer);
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length < 1) {
				this.element = 'menu__item';
				element.classList.add('menu__item');
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
			<img src=${this.img} alt="vegy">
			<h3 class="menu__item-subtitle">${this.subtitle}</h3>
			<div class="menu__item-descr">${this.description}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
			`;
			this.parent.append(element);
		}
	}
	
	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, title, descr, price}) => {
				new MenuCard(img, title, descr, price, '.menu .container').render();
			});
		});


	// Send form | POST request

	const forms = document.querySelectorAll('form');

	const message = { // Создание массива с выводом информационных сообщений
		loading: 'img/modal/spinner.svg',
		success: 'Thank you! We will be in touch soon',
		failure: 'Something went wrong'
	};

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});
		return await res.json();
	};

	const bindPostData = function(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto; 
			`;
			form.insertAdjacentElement('afterend', statusMessage);


			const formData = new FormData(form);

			// const obj = {};
			// formData.forEach((value, key) => {
			// 	obj[key] = value;
			// });
			// const json = ;

			const object = {};
			formData.forEach(function(value, key) {
				object[key] = value;
			});
			console.log(object);

			postData('http://localhost:3000/requests', JSON.stringify(object))
				.then(data => { // При положительном исходе
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});
		});
	};

	forms.forEach(el => {
		bindPostData(el);
	});

	// Show modal status

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>×</div>
				<div class="modal__title">${message}</div>
			</div>
		`;
		
		document.querySelector('.modal').prepend(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	// Slider

	const slider = document.querySelector('.offer__slider'),
		slides = slider.querySelectorAll('.offer__slide'),
		currentSlide = slider.querySelector('#current'),
		totalSlides = slider.querySelector('#total'),
		arrowLeft = slider.querySelector('.offer__slider-prev'),
		arrowRight = slider.querySelector('.offer__slider-next');


	const countTotalSlides = () => {
		if (slides.length < 10) {
			totalSlides.innerHTML = `0${slides.length}`;
		} else {
			totalSlides.innerHTML = slides.length;
		}
	};
	countTotalSlides();

	const hideSlides = () => {
		slides.forEach(el => el.classList.add('hide'));
		slides.forEach(el => el.classList.remove('show'));
	};

	const showSlide = (slide = 0) => {
		hideSlides();
		slides[slide].classList.remove('hide');
		slides[slide].classList.add('show');
		if (currentSlide.innerHTML < '10') {
			currentSlide.innerHTML = `0${slide + 1}`;
		} else {
			currentSlide.innerHTML = slide + 1;
		}
	};
	showSlide();

	arrowLeft.addEventListener('click', () => {
		if (parseInt(currentSlide.innerHTML) === 1) {
			showSlide(slides.length - 1);
		} else showSlide(parseInt(currentSlide.innerHTML) - 2);
	});
	arrowRight.addEventListener('click', () => {
		if (parseInt(currentSlide.innerHTML) === slides.length) {
			showSlide();
		} else {
			showSlide(parseInt(currentSlide.innerHTML));
		} 
	});

});

// if (parseInt(currentSlide.innerHTML) === (slides.length + 1)) {
// 	showSlide(0);
// }


// fetch('http://localhost:3000/menu').then(data => data.json()).then(res => console.log(res));


// Promise train

// console.log('Запрос данных...');

// const req = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		console.log('Подготовка данных');
// 		const product = {
// 			name: 'Iphone',
// 			price: 1000,
// 			category: 'Smartphones',
// 		};
// 		const gay = 'Max';
// 		resolve(product, gay);
// 	}, 2000);
// });

// req.then((product) => {
// 	console.log(product);
// });


