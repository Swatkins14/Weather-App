const apiKey = '6259ddd55f60e7d713c076cc18d4211e';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather';
const forecastApiURL = 'https://api.openweathermap.org/data/2.5/forecast';
const unsplashApiKey = "tznAiCJKfMdSTb_ctjcx3yikbblSS7KuwlEdLPxEFpc";
const unsplashApiURL = 'https://api.unsplash.com/photos/random';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton')
const locationElement = document.getElementById('location')
const temperatureElement = document.getElementById('temperature')
const descriptionElement = document.getElementById('description')
const forecastContainer = document.getElementById('forecast')

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

function fetchForecast(location) {
    const forecastURL = `${forecastApiURL}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(forecastURL)
    .then(response => response.json())
    .then(data => {
        displayForecast(data);
    })
    .catch(error => {
        console.error('Error fetching forecast data, please try again;', error);
    })
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    const dailyForecasts = [];

    data.list.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        const hour = date.getHours();

        if (hour === 12) {
            dailyForecasts.push(forecast)
        }
    })


dailyForecasts.forEach(dayForecast => {
    const date = new Date(dayForecast.dt_txt);
    const dayName = date.toLocaleDateString('en-UK', { weekday: 'long'})

    const temp = `${Math.round(dayForecast.main.temp)}°C`;
    const description = dayForecast.weather[0].description;

    const iconCode = dayForecast.weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconCode}.png`

    forecastContainer.innerHTML += `
    <div class="forecast-item">
        <h3>${dayName}</h3>
        <img src="${iconURL}" alt="${description}">
        <p>${temp}</p>
        <p>${description}</p>
    </div>
`;
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

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
        fetchForecast(location);
    }
})