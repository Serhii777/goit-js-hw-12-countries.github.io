import itemsTemplate from '../templates/menu-items.hbs';
import menu from '../menu.json';

const markup = itemsTemplate(menu);

const menuRef = document.querySelector('.js-menu');
menuRef.insertAdjacentHTML('beforeend', markup);
