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
    const characteristicsTitle = document.querySelectorAll('.characteristics__title');
    const characteristicsDescription = document.querySelectorAll('.characteristics__description');

    characteristicsTitle.forEach((elem, i) => {
      elem.addEventListener('click', () => {
        elem.classList.toggle('active');
        characteristicsDescription[i].classList.toggle('active');
      });
    });
  };
  

  tabs();
  accordion();
});




