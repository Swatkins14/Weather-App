const apiKey = '6259ddd55f60e7d713c076cc18d4211e';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton')
const locationElement = document.getElementById('location')
const temperatureElement = document.getElementById('temperature')
const descriptionElement = document.getElementById('description')

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiURL}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        locationElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather[0].description;
        backgroundChange();
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    })
}

function backgroundChange() {
    if (descriptionElement.textContent.includes('overcast clouds')) {
        document.body.style.backgroundImage="url('https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/black-rain-abstract-dark-power-1-1.jpg?resize=2048,1365')";
    } else if (descriptionElement.textContent.includes('clear sky')) {
        document.body.style.backgroundImage="url('https://www.pexels.com/photo/blue-sky-281260/')";
}
    
    else {
        document.body.style.backgroundImage="";
    }}