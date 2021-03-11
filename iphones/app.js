document.addEventListener('DOMContentLoaded', () => {
  'use strict';

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

    characteristicsItemElems.forEach(elem => {
      if (elem.children[1].classList.contains('active')) {
        elem.children[1].style.height = `${elem.children[1].scrollHeight}px`;
      }
    });

    const open = (button, dropDown) => { // принимает кнопку и блок дескрипшон
      // closeAllDrops(button, dropDown);
      dropDown.style.height = `${dropDown.scrollHeight}px`;
      button.classList.add('active');
      dropDown.classList.add('active');
    };

    const close = (button, dropDown) => {
      button.classList.remove('active');
      dropDown.classList.remove('active');
      dropDown.style.height = '';       // после закрытия убираем высоту
    };

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
    const modal = document.querySelector('.modal');

    // Открываем модалку по клику на кнопку "купить"
    cardDetailsButtonBuy.addEventListener('click', () => {
      modal.classList.add('open');
    })
    
    // Закрываем модалку по клику на крестик
    modal.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('modal__close')) {
        modal.classList.remove('open');
      }

    });

    // Закрываем модалку по клику вне окна
    document.body.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.toggle('open');
      }
    });

    // Закрываем модалку по клику на Ecs
    document.body.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        modal.classList.toggle('open');
      }
    });

  };

  tabs();
  accordion();
  modalWindow();
});




