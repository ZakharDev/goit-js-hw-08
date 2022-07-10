import throttle from 'lodash.throttle';
const throttle = require(`lodash.throttle`);

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('[name = "email"]');
const message = document.querySelector('[name = "message"]');

form.addEventListener(`input`, throttle(handleInput, 500));
form.addEventListener('submit', handleSubmit);

function handleInput() {
  const userPostObj = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userPostObj));
}

onPageLoad();

function onPageLoad() {
  const parseValue = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (parseValue) {
    email.value = parseValue.email;
    message.value = parseValue.message;
  } else {
    email.value = '';
    message.value = '';
  }
}

function handleSubmit() {
  event.preventDefault();

  console.log(`Mail: ${email.value}, Message: ${message.value}`);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
