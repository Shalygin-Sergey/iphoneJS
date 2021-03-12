document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const getData = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();

    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) return;
      if (request.status === 200) {
        const response = JSON.parse(request.response);
        callback(response);
      } else {
        console.log(new Error('ошибка:' + request.status));
      }
      
    });
  };  
 



  const tabs = () => {
    const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
    const cardDetailsTitleElem = document.querySelector('.card-details__title');
    const cardImageItem = document.querySelector('.card__image_item');
    const cardDetailsPriceElem = document.querySelector('.card-details__price');
    const descriptionMemory = document.querySelector('.description__memory');

    const data = [
      {
        name: 'Смартфон Apple iPhone 12 Pro 64GB Graphite',
        img: 'img/iPhone-graphite.png',
        price: 95990,
        memoryROM: 64
      },
      {
        name: 'Смартфон Apple iPhone 12 Pro 128GB Silver',
        img: 'img/iPhone-silver.png',
        price: 97990,
        memoryROM: 128
      },
      {
        name: 'Смартфон Apple iPhone 12 Pro 256GB Pacific Blue',
        img: 'img/iPhone-blue.png',
        price: 99990,
        memoryROM: 256
      },
    ];

    const deactive = () => {
      cardDetailChangeElems.forEach(btn => btn.classList.remove('active'))
    }

    cardDetailChangeElems.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (!btn.classList.contains('active')) { // если класса нет будет false то вернет true
          deactive();
          btn.classList.add('active');
          cardDetailsTitleElem.textContent = data[i].name;
          cardImageItem.src = data[i].img;
          cardImageItem.alt = data[i].name;
          cardDetailsPriceElem.textContent = data[i].price + '₽';
          descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`;
          
        }
      });
    });
  
  };
  
  const accordion = () => {
    const characteristicsListElem = document.querySelector('.characteristics__list');
    const characteristicsItemElems = document.querySelectorAll('.characteristics__item');

    // прописывыем плавное закрытие 1 поля аккордиона
    characteristicsItemElems.forEach(elem => {
      if (elem.children[1].classList.contains('active')) {
        elem.children[1].style.height = `${elem.children[1].scrollHeight}px`;
      }
    });

    const open = (button, dropDown) => { // принимает кнопку и блок дескрипшон
      closeAllDrops(button, dropDown);
      dropDown.style.height = `${dropDown.scrollHeight}px`;
      button.classList.add('active');
      dropDown.classList.add('active');
    };

    const close = (button, dropDown) => {
      button.classList.remove('active');
      dropDown.classList.remove('active');
      dropDown.style.height = '';       // после закрытия убираем высоту
    };
    // закрываем все вкладки, когда открываем новую
    const closeAllDrops = (button, dropDown) => {
      characteristicsItemElems.forEach((elem) => {
        if (elem.children[0] !== button && elem.children[1] !== dropDown) { // elem получает кнопку и текст внутри 
          close(elem.children[0], elem.children[1]); 
        }
      });
    };
    

    characteristicsListElem.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('characteristics__title')) {
        const parent = target.closest('.characteristics__item'); // получим родителя
        const description = parent.querySelector('.characteristics__description');
        description.classList.contains('active') ? 
          close(target, description) : 
            open(target, description);
      } 

    });

    // Закрываем все кнопки аккордиона по нажатию на свободное поле
    document.body.addEventListener('click', (event) => {
      const target = event.target;
      if (!target.closest('.characteristics__list')) {
        closeAllDrops();
      }
    })
  };
  
  const modalWindow = () => {
    const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
    const CardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
    const modal = document.querySelector('.modal');
    const cardDetailsTitle = document.querySelector('.card-details__title');
    const modalTitle = modal.querySelector('.modal__title');
    const modalSubtitle = modal.querySelector('.modal__subtitle');
    const modalTitleSubmit = modal.querySelector('.modal__title-submit');

    const openModal = (e) => {
      const target = e.target;
      modal.classList.add('open');
      document.addEventListener('keydown', escapeHandler);
      modalTitle.textContent = cardDetailsTitle.textContent; // запимываем название цвета айфона
      modalTitleSubmit.value = cardDetailsTitle.textContent; // записываем скрытый текст для менеджера
      modalSubtitle.textContent = target.dataset.buttonBuy; // выводим текст в карточку товара по data атрибуту
    };

    const closeModal = () => {
      modal.classList.remove('open');
      document.removeEventListener('keydown', escapeHandler);
    };
    // реализация закрытия по клавише Esc
    const escapeHandler = (e) => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    // Закрываем модалку по клику на крестик и вне окна
    modal.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('modal__close') || target === modal) {
        closeModal();
      }
    });

    cardDetailsButtonBuy.addEventListener('click', openModal);
    CardDetailsButtonDelivery.addEventListener('click', openModal);
  };


  const renderCrossSell = () => {

    const crossSellList = document.querySelector('.cross-sell__list');

    const createCrossSellItem = (good) => {
      const liItem = document.createElement('li');
      liItem.insertAdjacentHTML = `
            <article class="cross-sell__item">
							<img class="cross-sell__image" src="cross-sell-dbase/img/50126638b.jpg" alt="">
							<h3 class="cross-sell__title">${good.name}</h3>
							<p class="cross-sell__price">12990₽</p>
							<div class="button button_buy cross-sell__button">Купить</div>
						</article>
      `;
      return liItem;
    }

    const createCrossSellList = (goods) => {
      goods.forEach(item => {
        crossSellList.append(createCrossSellItem(item));
      })
    }

    getData('./cross-sell-dbase/dbase.json', createCrossSellList);
  };

  tabs();
  accordion();
  modalWindow();
  renderCrossSell();
});




