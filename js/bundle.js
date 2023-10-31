/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
	const result = document.querySelector('.calculating__result span');

	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex'); 
	} else { 
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio'); 
	} else { 
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	const initLocalSettings = function(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(el => {
			el.classList.remove(activeClass);
			if (el.getAttribute('id') === localStorage.getItem('sex')) {
				el.classList.add(activeClass);
			}
			if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				el.classList.add(activeClass);
			}
		});
	};
	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

	const calcTotal = function() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '----';
			return;
		}
		if (sex === 'female') {
			result.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(0);
		} else {
			result.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(0);
		}
	};

	calcTotal();

	const getStaticInformation = function(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(el => {
			el.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}
	
				elements.forEach(el => el.classList.remove(activeClass));
	
				e.target.classList.add(activeClass);
				calcTotal();
			});
		});
	};

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	const getDynamicInformation = function(field) {
		const input = document.querySelector(field);

		input.addEventListener('input', () => {
			if (input.value.match(/\D/g)) {
				input.style.border = '3px solid red';
			} else {
				input.style.border = 'none';
			}

			switch(input.getAttribute('id')) {
			case 'height':
				height = input.value;
				break;
			case 'weight':
				weight = input.value;
				break;
			case 'age':
				age = input.value;
				break;
			}
			calcTotal();
		});
	};

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
	
	
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
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
	

	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, title, descr, price}) => {
				new MenuCard(img, title, descr, price, '.menu .container').render();
			});
		});

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector) {
	const forms = document.querySelectorAll(formSelector);

	const message = { // Создание массива с выводом информационных сообщений
		loading: 'img/modal/spinner.svg',
		success: 'Thank you! We will be in touch soon',
		failure: 'Something went wrong'
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

			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', JSON.stringify(object))
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
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal");

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
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
		}, 4000);
	}

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
const openModal = (modalSelector) => {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';
};

const closeModal = (modalSelector) => {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = 'auto';
};

function modal(triggerSelector, modalSelector) {
	const btnModal = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);

	btnModal.forEach(el => {
		el.addEventListener('click', () => openModal(modalSelector));
	});

	modal.addEventListener('click', e => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	const showModalByScroll = function() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modalSelector);
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


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, previousArrow, totalCounter, currentCounter, wrapper, field}) {
	const slider = document.querySelector(slide),
		slides = slider.querySelectorAll(container),
		currentSlide = slider.querySelector(currentCounter),
		totalSlides = slider.querySelector(totalCounter),
		arrowLeft = slider.querySelector(previousArrow),
		arrowRight = slider.querySelector(nextArrow),
		slidesWrapper = slider.querySelector(wrapper),
		slidesField = slider.querySelector(field),
		width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	const strToNum = arg => arg = +arg.replace(/\D/g, '');

	slider.style.position = 'relative';

	const slideCount = () => {
		if (slides.length < 10) {
			totalSlides.textContent = `0${slides.length}`;
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			totalSlides.textContent = slides.length;
			currentSlide.textContent = slideIndex;
		}
	};

	const slideOffset = (place, offset) => {
		place.style.transform = `translateX(-${offset}px)`;
	};

	slideCount();

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	arrowRight.addEventListener('click', () => {
		if (offset == strToNum(width) * (slides.length - 1)) {
			offset = 0;
			slideIndex = 1;
		} else {
			offset += strToNum(width);
			slideIndex++;
		}

		slideOffset(slidesField, offset);
		
		slideCount();

		dots.forEach(el => el.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = '1';
	});

	arrowLeft.addEventListener('click', () => {
		if (offset == 0) {
			offset = strToNum(width) * (slides.length - 1);
			slideIndex = slides.length;
		} else {
			offset -= strToNum(width);
			slideIndex--;
		}

		slideOffset(slidesField, offset);

		slideCount();
		
		dots.forEach(el => el.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = '1';
	});

	const indicators = document.createElement('ol'),
		dots = [];

	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.classList.add('dot');
		dot.setAttribute('data-slide-to', i + 1);
		if (i == 0) {
			dot.style.opacity = '1';
		}
		indicators.append(dot);
		dots.push(dot);
	}

	dots.forEach(el => {
		el.addEventListener('click', e => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = strToNum(width) * (slideTo - 1);

			slideOffset(slidesField, offset);

			slideCount();

			dots.forEach(el => el.style.opacity = '.5');
			dots[slideIndex - 1].style.opacity = '1';
		});
	});

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	let tabs = document.querySelectorAll(tabsSelector), // Извлечение каждого пункта выбора таба
		tabsContent = document.querySelectorAll(tabsContentSelector), // Извлечение наполнения таба
		tabsParent = document.querySelector(tabsParentSelector); // Извлечение контейнера где лежат табы чтобы регистрировать нажатия даже по новым табам

	function hideTabContent() { // Объявление функции которая скрывает все табы
		tabsContent.forEach(el => { // Перебор всех элементов псевдомассива с наполнением табов
			el.classList.add('hide');
			el.classList.remove('show', 'fade');
			el.style.display = 'none'; // Каждый элемент массива получает inline свойство display: none
		});
		tabs.forEach(el => { // Перебор всех элементов псевдомассива с табами
			el.classList.remove(activeClass); // Удаляем класс активности у всех табов
		});
	}

	function showTabContent(i = 0) { // Функция отображающая таб, имеет индекс по-умолчанию = 0 (первый эл-т)
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabsContent[i].style.display = 'block'; // Возвращаем display: block чтобы было видно наполнение таба
		tabs[i].classList.add(activeClass); // Добавляем табу класс активности
	}

	hideTabContent(); 
	showTabContent(); 

	tabsParent.addEventListener('click', function(event) { // Обработчик событий, из которого мы берем событие. Обрабатываемое событие - клик
		const target = event.target; // event.target регистрирует нажатие и возвращает его нам, мы сделали из этого переменную чтобы было легче обращаться
		if(target && target.classList.contains(tabsSelector.slice(1))) { // Первый аргумент (target) гарантирует что значение не будет равно null, второе проверяет
			// содержит ли элемент который был нажат класс tabheader__item
			tabs.forEach((item, i) => { // применяем на псевдомассив табов метод forEach
				if (target == item) { // Если точка нажатия совпала с табом, то мы выводим этот таб
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
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

const getResource = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");








document.addEventListener('DOMContentLoaded', () => {
	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal');
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer');
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
	(0,_modules_calculator__WEBPACK_IMPORTED_MODULE_4__["default"])();
	(0,_modules_form__WEBPACK_IMPORTED_MODULE_5__["default"])('form');
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
		container: '.offer__slide',
		nextArrow: '.offer__slider-next',
		previousArrow: '.offer__slider-prev',
		slide: '.offer__slider',
		totalCounter: '#total',
		currentCounter: '#current',
		field: '.offer__slider-inner',
		wrapper: '.offer__slider-wrapper',
	});
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map