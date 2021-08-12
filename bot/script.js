// eslint-disable-next-line no-undef
moment.locale('ru');
const answersLib = {
  // eslint-disable-next-line quote-props
  'дел': ['Дела прекрасно!'],
  // eslint-disable-next-line quote-props
  'привет': ['Привет!',
    'Нихао!',
  ],
};
const list = document.querySelector('.list-group');
function botAnswer(text = 'Какой вопрос Вы хотели задать боту?') {
  document.querySelector('.timestamp').innerText = moment().format('LLL');
  list.firstElementChild['href'] += (new Date()).getTime();
  const messageRow = list.firstElementChild.cloneNode(true);
  messageRow['href'] = `#${+messageRow['href'].split('#')[1] + 1}`;
  messageRow.querySelector('.timestamp').innerText = moment().format('LLL');
  messageRow.querySelector('.messagetext').innerText = text;
  list.append(messageRow);
}
botAnswer();
function send() {
  const message = document.querySelector('#message');
  if (!message.value) {
    message.classList.add('is-invalid');
    return;
  }
  const messageRow = list.lastElementChild.cloneNode(true);
  messageRow['href'] = `#${+messageRow['href'].split('#')[1] + 1}`;
  messageRow.classList.add('active');
  messageRow.querySelector('.messagetext').innerText = message.value;
  messageRow.querySelector('.d-flex > h5').innerText = 'Пользователь';
  messageRow.querySelector('.timestamp').innerText = moment().format('LLL');
  list.append(messageRow);
  message.classList.remove('is-invalid');

  const answersLibTemp = {};
  Object.assign(answersLibTemp, answersLib);
  let strRegExp = Object.keys(answersLibTemp).map((value) => `(${value})+|`).join('');
  const strRegExpArr = strRegExp.split('|');
  strRegExpArr.pop();
  strRegExp = strRegExpArr.join('|');
  const toFind = new RegExp(strRegExp, 'gi');
  let arrAnswers = message.value.match(toFind) || [];
  if (arrAnswers.length > 0) {
    arrAnswers = arrAnswers.map((value) => value.toLowerCase());
    arrAnswers.forEach((element) => {
      const i = Math.floor(Math.random() * answersLib[element].length);
      botAnswer(answersLib[element][i]);
    });
  } else {
    botAnswer('Моя твоя не понимать');
  }
  message.value = '';
  list.lastElementChild.scrollIntoView('alignToTop');
}
const btn = document.querySelector('.btn');
btn.addEventListener('click', send);
