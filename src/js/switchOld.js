const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const switchRef = document.querySelector('.js-switch-input');

const refs = {
  body: document.body,
};

switchRef.addEventListener('input', event => {
  if (event.target.checked) {
    switchTheme(refs.body, Theme.DARK, Theme.LIGHT);
  } else {
    switchTheme(refs.body, Theme.LIGHT, Theme.DARK);
  }
});

function switchTheme(elem, first, second) {
  elem.classList.add(`${first}`);
  localStorage.setItem(`theme`, `${first}`);
  elem.classList.remove(`${second}`);
}

const bodyRef = document.getElementsByTagName('body');
if (bodyRef) {
  initTheme();
}

function initTheme() {
  if (localStorage.getItem(`theme`) === `${Theme.DARK}`) {
    document.body.classList.add(`${Theme.DARK}`);
    document.body.querySelector('.js-switch-input').checked = true;
  }
}
