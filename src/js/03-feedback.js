import throttle from 'lodash.throttle';

let formData = {};
const FEEDBACK = "feedback-form-state";
const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('.feedback-form input');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));
onSaveMessage();

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  const storage = JSON.stringify(formData);
  localStorage.setItem(FEEDBACK, storage);
}

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(FEEDBACK);

  console.log(formData);

  for (const key in formData) {
    delete formData[key];
  }
}

function onSaveMessage() {
  const saveMessage = localStorage.getItem(FEEDBACK);
  const save = JSON.parse(saveMessage);

  if (save === null) {
  input.value = '';
  textarea.value = '';
  } else if (save.email === undefined && save.message !== undefined) {
    input.value = '';
    textarea.value = save.message;
  } else if (save.email !== undefined && save.message === undefined) {
    input.value = save.email;
    textarea.value = '';
  } else {
    input.value = save.email;
    textarea.value = save.message;
  }
}

