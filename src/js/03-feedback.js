import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

refs.form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
});

setTextareaInput();

function onFormSubmit(e) {
  e.preventDefault();

  if (!e.target.message.value || !e.target.email.value) {
    Notify.failure('Error. All fields must be filled');
    return;
  }

  const dataSubmit = {
    email: e.currentTarget.email.value,
    message: e.currentTarget.message.value,
  };

  console.log('Send form');
  console.log(dataSubmit);

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  const inputText = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, inputText);
}

function setTextareaInput() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!savedMessage) {
    return;
  }
  if (savedMessage.message) {
    refs.form.message.value = savedMessage.message;
  }
  if (savedMessage.email) {
    refs.form.email.value = savedMessage.email;
  }
}
