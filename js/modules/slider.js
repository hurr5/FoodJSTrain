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

export default slider;