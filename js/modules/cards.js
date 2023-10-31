import { getResource } from "../services/services";

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
	

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, title, descr, price}) => {
				new MenuCard(img, title, descr, price, '.menu .container').render();
			});
		});

}

export default cards;