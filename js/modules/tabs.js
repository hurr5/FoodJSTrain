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

export default tabs;