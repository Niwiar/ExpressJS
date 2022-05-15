$(document).ready(function(){
    const KEY = 'e644f79b-32ea-4724-8d3f-7f8c9c942ec2';

    async function getAQI({ city, state, country }){
        let response = await fetch(
        `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${KEY}`
        );
        let { data: { current }} = await response.json();
        let { pollution, weather} = current;
        return {
            aqi: pollution.aqius,
            temperature: weather.tp,
            humidity: weather.hu,
            wind: weather.ws
        }
    }

    function displayAQI({city, state, country, aqi, temperature, humidity, wind}) {
        cityElem = $(".city");
        stateElem = $(".state-country");
        aqiElem = $(".aqi > h1");
        temperatureElem = $(".temperature");
        humidityElem = $(".humidity");
        windElem = $(".wind");

        cityElem.text(city);
        stateElem.text(`${state}, ${country}`);
        aqiElem.text(aqi);
        temperatureElem.text(`Temp: ${temperature}`);
        humidityElem.text(`Humidity: ${humidity}%`);
        windElem.text(`Wind: ${wind} m/s`)
    }

    function setAQIColor(aqi) {
        if (aqi <= 50)
            $(":root").css('--current-aqi-color', "var(--good-aqi-color)")
        else if (aqi <= 100)
            $(":root").css('--current-aqi-color', "var(--medium-aqi-color)")
        else $(":root").css('--current-aqi-color', "var(--bad-aqi-color)")
    }  

    async function run(){
        const city = 'Sathon';
        const state = 'Bangkok';
        const country = 'Thailand';
    
        let { aqi, temperature, humidity, wind} = await getAQI({ city, state, country });
    
        displayAQI({
            city, state, country, aqi, temperature, humidity, wind
        })

        setAQIColor(aqi);
    }
    
    run();
})