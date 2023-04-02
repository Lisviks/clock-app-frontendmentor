const getTime = async () => {
  const res = await fetch('https://worldtimeapi.org/api/ip');
  const data = await res.json();
  return data;
};

const getLocation = async () => {
  const res = await fetch(`https://api.ipbase.com/v2/info?apikey=jmA7lQDUEMJlEu8Zq55eAfklJ8WKxfqPIs4p6VMf`);
  const data = await res.json();
  return data.data;
};

const displayTime = (data: any) => {
  const date = new Date(data.datetime);
  const hours = date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const time = `${hours}:${minutes} <span>${data.abbreviation}</span>`;
  const timeElement = document.querySelector('.time p') as HTMLParagraphElement;
  timeElement.innerHTML = time;
};

const displayMoreInfo = (data: any) => {
  const timezoneElement = document.querySelector('.timezone') as HTMLParagraphElement;
  const yearDayElement = document.querySelector('.year-day') as HTMLParagraphElement;
  const weekDayElement = document.querySelector('.week-day') as HTMLParagraphElement;
  const weekElement = document.querySelector('.week') as HTMLParagraphElement;

  timezoneElement.innerText = data.timezone;
  yearDayElement.innerText = data.day_of_year;
  weekDayElement.innerText = data.day_of_week === 0 ? 7 : data.day_of_week;
  weekElement.innerText = data.week_number;
};

const displayLocation = async () => {
  const data = await getLocation();
  const locationElement = document.querySelector('.location') as HTMLParagraphElement;
  locationElement.innerText = `In ${data.location.city.name}, ${data.location.country.alpha2}`;
};

const getScreen = () => {
  const screenWidth = window.screen.availWidth;

  if (screenWidth < 400) {
    return 'mobile';
  } else if (screenWidth >= 400 && screenWidth < 800) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

const greeting = (hours: number) => {
  const greetingElement = document.querySelector('.greeting p') as HTMLParagraphElement;
  const greetingIconElement = document.querySelector('.greeting-icon') as HTMLImageElement;
  const appContainer = document.querySelector('.app-container') as HTMLDivElement;

  if (hours >= 5 && hours < 12) {
    greetingElement.innerText = 'Good morning';
  } else if (hours >= 12 && hours < 18) {
    greetingElement.innerText = 'Good afternoon';
  } else {
    greetingElement.innerText = 'Good evening';
  }

  if (hours >= 5 && hours < 18) {
    greetingIconElement.src = './assets/desktop/icon-sun.svg';
    appContainer.style.backgroundImage = `url(./assets/${getScreen()}/bg-image-daytime.jpg)`;
  } else {
    greetingIconElement.src = './assets/desktop/icon-moon.svg';
    appContainer.style.backgroundImage = `url(./assets/${getScreen()}/bg-image-nighttime.jpg)`;
  }
};

const displayGreeting = (data: any) => {
  const date = new Date(data.datetime);
  const hours = date.getHours();
  greeting(hours);
};

const displayData = async () => {
  const data = await getTime();
  displayTime(data);
  displayMoreInfo(data);
  displayLocation();
  displayGreeting(data);
};

export default displayData;
