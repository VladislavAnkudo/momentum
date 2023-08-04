let key = 'en';
const tag = document.querySelector('.tag');
const chooseImg = document.querySelector('.image');
const show = document.querySelectorAll('.show');
const city = document.querySelector('.city');

//time and date
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const showDate = () => {
    const dateD = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = dateD.toLocaleDateString('en-EN', options);
    date.textContent = currentDate;
}
const showTime = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    setTimeout(showTime, 1000);
}
showTime();

// greeting

const greeting = document.querySelector('.greeting');
let hours;

const getTimeOfDay = () => {
    if (hours > 5 && hours < 12) {
        return 'morning';
    } else if (hours >= 12 && hours < 18) {
        return 'afternoon';
    } else if (hours >= 18 && hours < 24) {
        return 'evening';
    }
    else if (hours >= 0 && hours < 6) {
        return 'night';
    }
}

const showGreeting = (key) => {
    const date = new Date();
    hours = date.getHours();
    getTimeOfDay()
    const timeOfDate = getTimeOfDay();
    greeting.textContent = `Good ${timeOfDate}`;
}

const showGreetingRU = () => {
    switch (greeting.textContent) {
     case `Good morning`: greeting.textContent = `Доброе утро`;
        break;
    case `Good afternoon`: greeting.textContent = `Добрый день`;
        break;
    case `Good evening`: greeting.textContent = `Добрый вечер`;
        break;
    case `Good night`: greeting.textContent = `Доброй ночи`;
        break;   
    }
}


showGreeting(key)
const timeOfDay = getTimeOfDay();

//language


const arrayBlocks = [
    ['Время:', 'Дата:', 'Приветствие:', 'Цитата:', 'Погода:', 'Плеер:'],
    ['Time:', 'Date:', 'Greeting:', 'Quote:', 'Weather:', 'Player:']
];
const language = document.querySelector('.language');
const todoOpt = document.querySelector('.todo-options');
const todoPlaceholder = document.querySelector('.todo-text');
const settingsTitle = document.querySelector('.popup-title');
const settingLanguage = document.querySelector('.change-language');
const settingImage = document.querySelector('.change-img');
const todoBtn = document.querySelector('.todo-button');
const nameSetting = document.querySelectorAll('.name-setting');

const changeAppLanguage = (key) => {
    if (key === 'ru') {
        language.textContent = 'Русский';
        settingsTitle.textContent = 'Настройки';
        settingLanguage.textContent = 'Выбрать язык:';
        settingImage.textContent = 'Выбрать источник изображений:';
        todoBtn.textContent = 'Заметки';
        todoOpt.textContent = '';
        todoPlaceholder.placeholder = 'Новая заметка';
        for (let i = 0; i < show.length; i++) {
            if (show[i].textContent === 'Отображать' || show[i].textContent === 'Show') {
                show[i].textContent = 'Отображать';
            } else {
                show[i].textContent = 'Скрыть';
            }
        }
        for (let i = 0; i < nameSetting.length; i++) {
            nameSetting[i].textContent = arrayBlocks[0][i];
        }
    } else {
        language.textContent = 'English';
        settingsTitle.textContent = 'Settings';
        settingLanguage.textContent = 'Select language:';
        settingImage.textContent = 'Select images source:';
        todoBtn.textContent = 'Todo';
        todoOpt.textContent = 'Inbox';
        todoPlaceholder.placeholder = 'NEW TODO';
        for (let i = 0; i < show.length; i++) {
            if (show[i].textContent === 'Show' || show[i].textContent === 'Отображать') {
                show[i].textContent = 'Show';
            } else {
                show[i].textContent = 'Hide';
            }
        }
        for (let i = 0; i < nameSetting.length; i++) {
            nameSetting[i].textContent = arrayBlocks[1][i];
        }
    }
}
changeAppLanguage(key);

language.addEventListener('click', () => {
    if (key === 'en') {
        language.textContent = 'Русский';
        settingsTitle.textContent = 'Настройки';
        settingLanguage.textContent = 'Выбрать язык:';
        settingImage.textContent = 'Выбрать источник изображений:';
        todoBtn.textContent = 'Заметки';
        todoOpt.textContent = '';
        todoPlaceholder.placeholder = 'Новая заметка';
        showGreetingRU()
        if (city.value === 'Molodechno') {
            city.value = 'Молодечно';
        }
        for (let i = 0; i < show.length; i++) {
            if (show[i].textContent === 'Show') {
                show[i].textContent = 'Отображать';
            } else {
                show[i].textContent = 'Скрыть';
            }
        }
        for (let i = 0; i < nameSetting.length; i++) {
            nameSetting[i].textContent = arrayBlocks[0][i];
        }
        key = 'ru';

    } else {
        language.textContent = 'English';
        settingsTitle.textContent = 'Settings';
        settingLanguage.textContent = 'Select language:';
        settingImage.textContent = 'Select images source:';
        todoBtn.textContent = 'Todo';
        todoOpt.textContent = 'Inbox';
        todoPlaceholder.placeholder = 'NEW TODO';
        showGreeting();
        if (city.value === 'Молодечно') {
            city.value = 'Molodechno';
        }
        for (let i = 0; i < show.length; i++) {
            if (show[i].textContent === 'Отображать') {
                show[i].textContent = 'Show';
            } else {
                show[i].textContent = 'Hide';
            }
        }
        for (let i = 0; i < nameSetting.length; i++) {
            nameSetting[i].textContent = arrayBlocks[1][i];
        }

        key = 'en';
    }
    showTime(key);
    getWeather(key);
    getQuotes(key);
})

//name LocalStorage

let tagImg = timeOfDay;
const nameUser = document.querySelector('.name');
const setLocalStorage = () => {
    localStorage.setItem('nameUser', nameUser.value);
}
window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
    if (localStorage.getItem('nameUser')) {
        nameUser.value = localStorage.getItem('nameUser');
    }
}
window.addEventListener('load', getLocalStorage);


//hide page items
const pageItems = {
    blocks: ['time', 'date', 'greeting-container', 'quotes', 'weather', 'player']
}

const showBlocks = () => {
    for (let i = 0; i < show.length; i++) {
        let block = document.querySelector(`.${pageItems.blocks[i]}`);
        if (show[i].textContent === 'Hide' || show[i].textContent === 'Убрать') {
            show[i].style.opacity = '0.8';
            block.style.opacity = '0';
        } else {
            show[i].style.opacity = '1';
            block.style.opacity = '1';
        }
    }
}
showBlocks();



//Change BackGround Image

const body = document.querySelector('body');

const getRandomNum = () => {
    return Math.floor(Math.random() * 20) + 1;
}

let randomNum = getRandomNum();

const setBg = () => {
    const timeOfDate = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, '0');
    //smooth change BackGround Image
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDate}/${bgNum}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDate}/${bgNum}.jpg')`;
    }
}
setBg();



//Slaider change BackGround Image

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

function getSlideNext() {
    randomNum < 20 ? (randomNum++) : (randomNum = 1);
    setBg()
}
function getSlidePrev() {
    randomNum > 1 ? (randomNum--) : (randomNum = 20);
    setBg()
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);



// weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
//city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');

if (key === 'ru') {
    city.value = 'Молодечно';
} else {
    city.value = 'Molodechno';
}

const setLocalStorageWeather = () => {
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorageWeather);

const getLocalStorageWeather = () => {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
    getWeather(key);
}
window.addEventListener('load', getLocalStorageWeather);

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${key}&appid=313445949dd6e620b03c5721573a7c81&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok === true) {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        if (key === 'en') {
            wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
        } else {
            wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
            humidity.textContent = `Влажность: ${data.main.humidity}%`;
        }
        weatherError.textContent = ``;
    } else {
        weatherError.textContent = `Error!!! \"${city.value}\" ${data.message}`;
        weatherIcon.className = '';
        wind.textContent = ``;
        humidity.textContent = ``;
        temperature.textContent = ``;
        weatherDescription.textContent = '';
    }
}
getWeather(key);
city.addEventListener('change', () => { getWeather(key) });


// quotes

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {
    let quotes;
    if (key === 'ru') {
        quotes = './js/quotesRU.json';
    } else if (key === 'en') {
        quotes = './js/quotesEn.json';
    }
    const res = await fetch(quotes);
    const data = await res.json();
    let rundomQuote = Math.floor(Math.random() * 7);
    quote.textContent = data[rundomQuote].text;
    author.textContent = data[rundomQuote].author;
}
getQuotes(key)
changeQuote.addEventListener('click', getQuotes);



//audio
import {playList} from './playList.js';

const play = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
let isPlay = false;
const audio = new Audio();
let playNum = 0;
const volume = document.querySelector('.volume');

function muteVolume() {
    if (volume.classList.contains('volume-mute') === true) {
        volume.classList.remove('volume-mute');
        audio.volume = true;
    } else {
        volume.classList.add('volume-mute');
        audio.volume = 0;
    }
}
volume.addEventListener('click', muteVolume);

//add new element 'li'
playList.forEach(elm => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = elm.title;
    playListContainer.append(li)
})
const itemPlay = document.querySelectorAll('.play-item');

function playAudio() {
    if (!isPlay) {
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
        isPlay = true;
        for (let i = 0; i < itemPlay.length; i++) {
            if (itemPlay[i].classList.contains('item-active') === true) {
                itemPlay[i].classList.remove('item-active');
            }
        }
        itemPlay[playNum].classList.add('item-active');
        play.classList.add('pause');
    } else {
        isPlay = false;
        play.classList.remove('pause');
        audio.pause();
    }
}
play.addEventListener('click', playAudio);

function playPrev() {
    if (playNum > 0) {
        playNum--;
        isPlay = false;
        playAudio()
    } else {
        playNum = 4;
        isPlay = false;
        playAudio()
    }
}

function playNext() {
    if (playNum < 3) {
        playNum++;
        isPlay = false;
        playAudio()
    } else {
        playNum = 0;
        isPlay = false;
        playAudio()
    }
}

playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);
audio.addEventListener('ended', function () {
    playNext();
});





// advanced audio

const progressPlay = document.querySelector('.play-progress');
const songTime = document.querySelector('.song-time');
const songDuration = document.querySelector('.song-duration');

function updateProgressValue() {
    progressPlay.max = audio.duration;
    progressPlay.value = audio.currentTime;
    songTime.innerHTML = (formatTime(Math.floor(audio.currentTime)));
};

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };
    return `${min}:${sec}`;
};

setInterval(updateProgressValue, 1000);

function changeProgressPlay() {
    audio.currentTime = progressPlay.value;
};

progressPlay.addEventListener('input', changeProgressPlay);



//settings

const settingsBtn = document.querySelector('.settings-icon');
const settingsPopup = document.querySelector('.popup-settings');
const settingsOverlay = document.querySelector('.popup-overlay');
const settingList = document.querySelector('.setting-list');

function settingToggler() {
    settingsPopup.classList.toggle('popup-settings-active');
    settingsOverlay.classList.toggle('popup-overlay-active');
    settingList.classList.toggle('popup-active');
}

settingsBtn.addEventListener('click', settingToggler)
settingsOverlay.addEventListener('click', settingToggler)

for (let i = 0; i < show.length; i++) {
    let block = document.querySelector(`.${pageItems.blocks[i]}`);
    show[i].addEventListener('click', () => {
        if (show[i].textContent === 'Show' || show[i].textContent === 'Отображать') {
            show[i].style.opacity = '0.8';
            if (key === 'en') {
                show[i].textContent = 'Hide';
            } else {
                show[i].textContent = 'Убрать';
            }
            block.style.opacity = '0';
            block.style.transition = '1s';
        } else {
            show[i].style.opacity = '1';
        if (key === 'en') {
            show[i].textContent = 'Show';
        } else {
            show[i].textContent = 'Отображать';
        }
        block.style.opacity = '1';
        block.style.transition = '1s';
        }
    })
}



//todo

//todoBtn = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo');
const ul = document.querySelector('.todo-items');
const inputTodo = document.querySelector('.todo-text');

function showTodo() {
    todoList.classList.toggle('todo-active');
}
todoBtn.addEventListener('click', showTodo)

const deleteTodo = (elm) => {
    elm.addEventListener("click", () => {
        elm.parentElement.remove();
    });
}

const createTodo = () => {
    const li = document.createElement('li');
    li.classList.add('todo-item')
    const textLabel = document.createElement('label');
    textLabel.classList.add('todo-content');
    const check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    const textSpan = document.createElement('span')
    textSpan.classList.add('text-span')
    textSpan.textContent = inputTodo.value;
    textLabel.append(check);
    textLabel.append(textSpan);
    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('todo-trash');
    ul.appendChild(li).append(textLabel, deleteBtn);
    inputTodo.value = '';
    deleteTodo(deleteBtn);
}
inputTodo.addEventListener("change", createTodo);

const setLocalStorageTodo = () => {
    localStorage.setItem('todo', ul.innerHTML);
    const check = document.querySelectorAll('input[type="checkbox"]');
    let array = [];
    for (let i = 0; i < check.length; i++) {
        array.push(check[i].checked);
    }
    localStorage.setItem('check', JSON.stringify(array));
}
window.addEventListener('beforeunload', setLocalStorageTodo);

const getLocalTodo = () => {
    const data = localStorage.getItem('todo');
    if (data) {
        ul.innerHTML = data;
    }
    const deleteButtons = document.querySelectorAll('.todo-trash');
    for (const button of deleteButtons) {
        deleteTodo(button);
    }
    const check = document.querySelectorAll('input[type="checkbox"]');
    let array = JSON.parse(localStorage.getItem('check'));
    for (let i = 0; i < check.length; i++) {
        check[i].checked = array[i];
    }
}
getLocalTodo();















