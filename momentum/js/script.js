(function showTime() {
    const time = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    
    const DateT = document.querySelector('.date')
    const options = { weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-US', options);
    DateT.textContent = currentDate;

    setTimeout(showTime, 1000);
  }());


(function showGreeting(){
  const greeting = document.querySelector('.greeting');
  const date = new Date();
  const hours = date.getHours();
 
  if (hours >= 6 && hours < 12) {
    greeting.textContent = 'Good Morning';
  } else if (hours >= 12 && hours < 18) {
    greeting.textContent = 'Good Afternoon';
  } else if(hours >= 18 && hours < 24) {
    greeting.textContent = 'Good Evening';
    
  }else if(hours >= 0 && hours < 6){
    greeting.textContent = 'Good Night';
  }
  setTimeout(showGreeting,1000);
}());

function setLocalStorage() {
  const name = document.querySelector('.name');
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    const name = document.querySelector('.name');
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)



async function getWeather() { 
  const city = document.querySelector('.city'); 
  //city.value.textContent = 'Minsk';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=b0ab894ecd53d3d0908890fce2ab6b1a&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
 
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent =`Humidity ${data.main.humidity}%`;
  
/*   localStorage.setItem('city', city.value);
  localStorage.setItem('temperature',  data.main.temp);

  data.main.temp = localStorage.getItem('temperature');
  city.value = localStorage.getItem('city'); */
  
    
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('city', city.value);
    localStorage.setItem('temperature',  data.main.temp);
 })
 window.addEventListener('load', () => {
  data.main.temp = localStorage.getItem('temperature');
  city.value = localStorage.getItem('city');
 });
}
getWeather()

/* 
function weat() {
  const city = document.querySelector('.city');
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', weat)

function getweat() {
    const city = document.querySelector('.city');

    city.value = localStorage.getItem('city');

}
window.addEventListener('load', getweat) */

let randQuotes = (min = 1, max = 21) => Math.floor(Math.random() * (max - min)) + min;

const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const quoteBtn = document.querySelector('.change-quote')
let quoteNum
async function getQuotes(rnd = randQuotes(1, 99)) {  
  const url = `https://type.fit/api/quotes`;
  const res = await fetch(url);
  const data = await res.json();
  
  quote.textContent = `${data[rnd].text}`;
  author.textContent = (data[rnd].author === null) ? 'Papich' : `${data[rnd].author}`;
 
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('quote', quote.textContent);
    localStorage.setItem('author', author.textContent);
  })
  window.addEventListener('load', () => {
    quote.textContent = localStorage.getItem('quote');
    author.textContent = localStorage.getItem('author');
  });  
}
quoteBtn.addEventListener('click', () => getQuotes());
getQuotes();



const prev = document.querySelector('.play-prev')

const play = document.querySelector('.play')
const next = document.querySelector('.play-next')
let playNum = 0
let isPlay = false;
const playList = [
  {      
    title: 'Aqua Caelestis',
    src: '../assets/sounds/Aqua_Caelestis.mp3',
    duration: '00:58'
  },  
  {      
    title: 'River Flows In You',
    src: '../assets/sounds/River_Flows_In_You.mp3',
    duration: '03:50'
  },
  {      
    title: 'Ennio Morricone',
    src: '../assets/sounds/Ennio_Morricone.mp3',
    duration: '03:50'
  },
  {      
    title: 'Summer Wind',
    src: '../assets/sounds/Summer_Wind.mp3',
    duration: '03:50'
  }
]

const audio = new Audio();

play.addEventListener('click', () =>{
  if(isPlay === false){
    isPlay = true;
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
  }else{
    isPlay = false;
    audio.pause();
  }
 
  play.classList.toggle('pause')
});

prev.addEventListener('click', () =>{
  audio.src = playList[playNum].src;
  playNum -= 1;
  audio.currentTime = 0;
  audio.play();  
})

next.addEventListener('click', () =>{
  audio.src = playList[playNum].src;
  playNum += 1;
  audio.currentTime = 0;
  audio.play();
})


let list = document.querySelector('.play-list')
playList.forEach(el => {
  let li = document.createElement('li');
  li.classList.add('play-item')
  li.textContent= `${el.title}`
  list.append(li)
})
