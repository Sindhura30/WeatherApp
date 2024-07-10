const apiKey = '7bfc0186a79b2880e23fc3441bdcddc1';

const btn = document.querySelector('.search-btn');
const inputAttr = document.querySelector('.form-control');

btn.addEventListener('click', (event) => {
    event.preventDefault();
    const city = inputAttr.value;
    fetchWeatherData(city);
    inputAttr.value = '';
})

const getIcon = (desc) => {
    const weather = desc.toLowerCase();
    if(weather.includes('sun')) 
        return "<i class='bi bi-sun'></i>";   
    else if(weather.includes('rain')) 
        return "<i class='bi bi-cloud-rain'></i>";
    else if(weather.includes('snow')) 
        return "<i class='bi bi-cloud-snow'></i>";  
    else if(weather.includes('drizzle')) 
        return "<i class='bi bi-cloud-drizzle'></i>"; 
    else (weather.includes('fog') || weather.includes('mist')) 
        return "<i class='bi bi-cloud-fog'></i>";  
}

const updateWeatherInfo = (data) => {
    const {main, name, wind, visibility, weather} = data;
    const cityAttr = document.querySelector('.city');
    const tempAttr = document.querySelector('.temp-val');
    const windAttr = document.querySelector('.wind');
    const humidityAttr = document.querySelector('.humidity');
    const visibilityAttr = document.querySelector('.visibility');
    const tempDescAttr = document.querySelector('.temp-description-txt');
    const dateAttr = document.querySelector('.date');
    const iconAttr = document.querySelector('.icon');

    cityAttr.textContent = name;
    tempAttr.textContent = Math.round(main.temp);
    windAttr.textContent = `${wind.speed} km/hr`;
    humidityAttr.textContent = `${main.humidity}%`;
    visibilityAttr.textContent = `${visibility/1000} km/hr`;
    tempDescAttr.textContent = `${weather[0].description}`;

    const todayDate = new Date();
    dateAttr.textContent = todayDate.toDateString();
    const icon = getIcon(weather[0].description);
    iconAttr.innerHTML = icon;
}

const fetchWeatherData = async (city = 'Bengaluru') => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        const response = await fetch(url);
        if(!response.ok) { 
            throw new Error('Unable to fetch weather data');
        }
        const data = await response.json();
        console.log('data', data);
        updateWeatherInfo(data);
    } catch(e) {
        console.log('error', e);
    }

}


