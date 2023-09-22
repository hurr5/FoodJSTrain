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

	const deadline = '2023-09-25';

	const getTimeRemaining = function(dead) {
		const t = Date.parse(dead) - new Date(),
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
			seconds = timer.querySelector('#seconds');

		const updateClock = function() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(setClock);
			}
		};
		const setClock = setInterval(updateClock, 1000);
	};
	setClock('.timer', deadline);
});
