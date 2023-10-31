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

export default modal;
export {closeModal, openModal};