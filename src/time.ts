const getTime = async () => {
  const res = await fetch('http://worldtimeapi.org/api/ip');
  const data = await res.json();
  return data;
};

const getLocation = async () => {
  const res = await fetch(`https://api.ipbase.com/v2/info?apikey=${import.meta.env.VITE_API_KEY}`);
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
  weekDayElement.innerText = data.day_of_week;
  weekElement.innerText = data.week_number;
};

const displayLocation = async () => {
  const data = await getLocation();
  const locationElement = document.querySelector('.location') as HTMLParagraphElement;
  locationElement.innerText = `In ${data.location.city.name}, ${data.location.country.alpha2}`;
};

const greeting = (hours: number) => {
  const greetingElement = document.querySelector('.greeting p') as HTMLParagraphElement;
  const greetingIconElement = document.querySelector('.greeting-icon') as HTMLImageElement;

  if (hours >= 5 && hours < 12) {
    greetingElement.innerText = 'Good morning';
  } else if (hours >= 12 && hours < 18) {
    greetingElement.innerText = 'Good afternoon';
  } else {
    greetingElement.innerText = 'Good evening';
  }

  if (hours >= 5 && hours < 18) {
    greetingIconElement.src = './assets/desktop/icon-sun.svg';
  } else {
    greetingIconElement.src = './assets/desktop/icon-moon.svg';
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