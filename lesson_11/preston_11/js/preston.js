const currentURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&exclude=hourly,daily&APPID=aabf571ae3b6766a2927f44fdd37a467";

fetch(currentURL)
    .then((response) => response.json())


    .then((jsonObject) => {
            const preston = jsonObject['main'];
            let card = document.createElement('section');
            const windspeed = jsonObject.wind.speed;
            const condition = jsonObject.weather[0].main;
            const current = preston.temp;
            const humidity = preston.humidity;

            document.getElementById('condition').textContent = condition;
            document.getElementById('currentTemp').textContent = Math.floor(current);
            // space for windchill calculation
            document.getElementById('humidity').textContent = humidity;
            document.getElementById('wind').textContent = Math.floor(windspeed);

            document.querySelector('div.weather').appendChild(card);
        }

    );

const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&exclude=hourly,daily&APPID=aabf571ae3b6766a2927f44fdd37a467";

fetch(forecastURL)
    .then((response) => response.json())
    .then((jsonObject) => {
        const fiveday = jsonObject.list.filter(x => x.dt_txt.includes('18:00:00'));

        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let i = 1;

        fiveday.forEach(forcast => {
            let date = forcast.dt_txt;
            let d = new Date(date).getDay();
            let f = forcast.main.temp;
            let alt = forcast.weather[0].description;
            const img = `https://openweathermap.org/img/w/${forcast.weather[0].icon}.png`;

            document.getElementById(`day${i}`).textContent = weekdays[d];
            document.getElementById(`forecast${i}`).textContent = `${Math.floor(f)}°F`;
            document.getElementById(`icon${i}`).setAttribute('src', img);
            document.getElementById(`icon${i}`).setAttribute('alt', alt);
            i++;
        })

    });


// script for json on index page
const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })

    .then(function (jsonObject) {
        // console.table(jsonObject); // temporary checking for valid response and data parsing
        const towns = jsonObject['towns'];

        for (let i = 0; i < towns.length; i++) {
            if (towns[i].name == "Preston") {
                // Create an unordered list
                let list = document.createElement('ul');

                // Create a list item for each event
                for (let j = 0; j < towns[i].events.length; j++) {
                    let item = document.createElement('li');
                    item.textContent = towns[i].events[j];
                    list.appendChild(item);
                }

                document.querySelector('div.events').appendChild(list);
            }
        }
    });