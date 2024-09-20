const apiKey = '6259ddd55f60e7d713c076cc18d4211e';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather';
const unsplashApiKey = "tznAiCJKfMdSTb_ctjcx3yikbblSS7KuwlEdLPxEFpc";
const unsplashApiURL = 'https://api.unsplash.com/photos/random';

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
        backgroundChange(data.name);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    })
}

function backgroundChange(cityName) {

    const searchQuery = cityName.replace(/\s+/g, '+')

    const unsplashUrl = `${unsplashApiURL}?query=${searchQuery}&client_id=${unsplashApiKey}`;

    fetch(unsplashUrl)
    .then(response => response.json())
    .then(data => {
        document.body.style.backgroundImage = `url('${data.urls.regular}')`;
    })
    .catch(error => {
        console.error('Error fetching background image:', error);
    });
}

document.getElementById('loadingSpinner').style.display = 'block';

document.getElementById('loadingSpinner').style.display = 'none';