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
