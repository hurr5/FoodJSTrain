import { closeModal, openModal} from "./modal";
import {postData} from "../services/services";

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
		openModal(".modal");

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
			closeModal(".modal");
		}, 4000);
	}

}

export default form;