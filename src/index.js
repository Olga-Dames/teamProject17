// Throttle
const throttle = require('lodash.throttle');

//Swiper
//-------------------------------------------------------------------------------------

import Swiper, { Pagination, Keyboard, Autoplay } from 'swiper';
import '../node_modules/swiper/swiper.scss';
import '../node_modules/swiper/modules/pagination/pagination.scss';

const swiper = new Swiper('.swiper', {
  modules: [Pagination, Keyboard, Autoplay],
  pagination: {
    el: '.swiper-pagination',
  },
  keyboard: {
    enabled: true,
  },
  loop: true,
  autoplay: {
    delay: 3000,
  },
  speed: 800,
});

//Modal window
//-------------------------------------------------------------------------------------

!(function (e) {
  'function' != typeof e.matches &&
    (e.matches =
      e.msMatchesSelector ||
      e.mozMatchesSelector ||
      e.webkitMatchesSelector ||
      function (e) {
        for (
          var t = this,
            o = (t.document || t.ownerDocument).querySelectorAll(e),
            n = 0;
          o[n] && o[n] !== t;

        )
          ++n;
        return Boolean(o[n]);
      }),
    'function' != typeof e.closest &&
      (e.closest = function (e) {
        for (var t = this; t && 1 === t.nodeType; ) {
          if (t.matches(e)) return t;
          t = t.parentNode;
        }
        return null;
      });
})(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function () {
  /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
  var modalButtons = document.querySelectorAll('.js-open-modal'),
    overlay = document.querySelector('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close');

  /* Перебираем массив кнопок */
  modalButtons.forEach(function (item) {
    /* Назначаем каждой кнопке обработчик клика */
    item.addEventListener('click', function (e) {
      /* Предотвращаем стандартное действие элемента. Так как кнопку разные
            люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
            Нужно подстраховаться. */
      e.preventDefault();

      /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
            и будем искать модальное окно с таким же атрибутом. */
      var modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector(
          '.modal[data-modal="' + modalId + '"]'
        );

      /* После того как нашли нужное модальное окно, добавим классы
            подложке и окну чтобы показать их. */
      modalElem.classList.add('active');
      overlay.classList.add('active');
    }); // end click
  }); // end foreach

  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.modal');

      parentModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  }); // end foreach

  document.body.addEventListener(
    'keyup',
    function (e) {
      var key = e.keyCode;

      if (key == 27) {
        document.querySelector('.modal.active').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
      }
    },
    false
  );

  overlay.addEventListener('click', function () {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
  });
}); // end ready

// Numbers animation

refs = {
  animationEl: document.querySelector('.advantages__text'),
  numberPossFirst: document.querySelector('[data-number="1"]'),
  numberPossSecond: document.querySelector('[data-number="2"]'),
  numberPossThird: document.querySelector('[data-number="3"]'),
};

const animationElHeight = refs.animationEl.offsetHeight;
const animationElOffest = offset(refs.animationEl).top;

console.log(
  `Для анимации необходимо проскролить: ${
    animationElOffest - window.innerHeight + animationElHeight - 1
  }`
);

function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

const throttledOnScrollMouse = throttle(onScrollMouse, 1000);

window.addEventListener('scroll', throttledOnScrollMouse);

function onScrollMouse() {
  console.log(`Проскролил px - ${scrollY}`);
  if (
    scrollY <
    animationElOffest - window.innerHeight + animationElHeight - 1
  ) {
    return;
  }
  refs.animationEl.classList.add('isActive');
  changeNumberFirst();
  changeNumberSecond();
  changeNumberThird();
  window.removeEventListener('scroll', throttledOnScrollMouse);
}

function changeNumberFirst() {
  let counter = 0;
  const timerId = setInterval(() => {
    if (counter === 721) {
      clearInterval(timerId);
    }
    refs.numberPossFirst.textContent = counter;
    counter += 7;
  }, 50);
}

function changeNumberSecond() {
  let counterSecond = 0;
  const timerId = setInterval(() => {
    if (counterSecond === 16) {
      clearInterval(timerId);
    }
    refs.numberPossSecond.textContent = counterSecond + 'kg';
    counterSecond += 1;
  }, 310);
}

function changeNumberThird() {
  let counterThird = 0;
  const timerId = setInterval(() => {
    if (counterThird === 84) {
      clearInterval(timerId);
    }
    refs.numberPossThird.textContent = counterThird;
    counterThird += 1;
  }, 60);
}
