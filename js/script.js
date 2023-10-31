import tabs from './modules/tabs';
import	modal from './modules/modal';
import	timer from './modules/timer';
import	cards from './modules/cards';
import	calculator from './modules/calculator';
import	form from './modules/form';
import	slider from './modules/slider';

document.addEventListener('DOMContentLoaded', () => {
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	modal('[data-modal]', '.modal');
	timer('.timer');
	cards();
	calculator();
	form('form');
	slider({
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
