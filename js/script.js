document.addEventListener('DOMContentLoaded', () => {

	// Tabs

	let tabs = document.querySelectorAll('.tabheader__item'), // Извлечение каждого пункта выбора таба
		tabsContent = document.querySelectorAll('.tabcontent'), // Извлечение наполнения таба
		tabsParent = document.querySelector('.tabheader__items'); // Извлечение контейнера где лежат табы чтобы регистрировать нажатия даже по новым табам

	function hideTabContent() { // Объявление функции которая скрывает все табы
		tabsContent.forEach(el => { // Перебор всех элементов псевдомассива с наполнением табов
			el.classList.add('hide');
			el.classList.remove('show', 'fade');
			// el.style.display = 'none'; // Каждый элемент массива получает inline свойство display: none
		});
		tabs.forEach(el => { // Перебор всех элементов псевдомассива с табами
			el.classList.remove('tabheader__item_active'); // Удаляем класс активности у всех табов
		});
	}

	function showTabContent(i = 0) { // Функция отображающая таб, имеет индекс по-умолчанию = 0 (первый эл-т)
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		// tabsContent[i].style.display = 'block'; // Возвращаем display: block чтобы было видно наполнение таба
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
		closeBtn = document.querySelector('[data-close]'),
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


	closeBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', e => {
		if (e.target === modal) {
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
		constructor(img, subtitle, description, price, parentSelector){
			this.img = img;
			this.subtitle = subtitle;
			this.description = description;
			this.price = price;
			this.transfer = 97;
			this.parent = document.querySelector(parentSelector);
			this.changeToRUB();
		}

		changeToRUB() {
			this.price = Math.ceil(this.price * this.transfer);
		}

		render() {
			const element = document.createElement('div');
			element.innerHTML = `
			<div class="menu__item">
			<img src=${this.img} alt="vegy">
			<h3 class="menu__item-subtitle">${this.subtitle}</h3>
			<div class="menu__item-descr">${this.description}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
			</div>
			`;
			this.parent.append(element);
		}
	}
	
	const card1 = new MenuCard('img/tabs/vegy.jpg', 
		'Меню "Фитнес"', 
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
		2.5, 
		'.menu .container'
	).render();

	const card2 = new MenuCard('img/tabs/elite.jpg', 
		'Меню “Премиум”', 
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
		4, 
		'.menu .container'
	).render();

	const card3 = new MenuCard('img/tabs/post.jpg', 
		'Меню "Постное"', 
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
		3.5, 
		'.menu .container'
	).render();


});

