function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("hide");
}

var date = new Date();
var year = date.getFullYear();
var day = date.getDay();
var dayNum = date.getDate();
var month = date.getMonth();
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "October", "November", "December"]
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

var dateString = dayNames[day] + ", " + dayNum + " " + monthNames[month] + ", " + year;
document.getElementById("date").innerHTML = dateString;


document.getElementById("year").textContent = year;


function adjustRating(rating) {
    document.getElementById("ratingvalue").innerHTML = rating;
}


//current weather information
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

        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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