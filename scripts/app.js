const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time =  document.querySelector('img.time');
const icon = document.querySelector('.icon img')

const updateUI = (data) => {

    const {cityDets,weather} = data;
    

    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <h5 class="my-3">${weather.WeatherText}</h5>
        <h5 class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span> <span>&deg;c</span>
        </h5>
    `;
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

    icon.setAttribute('src',iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }else{
        timeSrc = 'img/night.svg';
    }

    time.setAttribute('src',timeSrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
}


const updateCity = async (city) =>{
    console.log(city);

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets,
         weather,
    };
}

cityForm.addEventListener('submit',e=>{
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
            .then(data => updateUI(data))
            .catch(err => console.log(err));

});