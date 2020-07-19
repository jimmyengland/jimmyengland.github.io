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


// function adjustRating(rating) {
//     document.getElementById("ratingvalue").innerHTML = rating;
// }

WebFont.load({
    google: {
        families: [
            'Source Sans Pro',
            'Merriweather'
        ]
    }
});

function home_page() {
    // Current Weather 

    const currentURL = "https://api.openweathermap.org/data/2.5/weather?id=3530103&units=imperial&exclude=hourly,daily&APPID=aabf571ae3b6766a2927f44fdd37a467";

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

                document.getElementById('current').appendChild(card);
            }

        );

    // 5 day forcast

    const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&exclude=hourly,daily&APPID=aabf571ae3b6766a2927f44fdd37a467";

    fetch(forecastURL)
        .then((response) => response.json())
        .then((jsonObject) => {
            const fiveday = jsonObject.list.filter(x => x.dt_txt.includes('12:00:00'));

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

    // Wind Chill 
    const w = document.querySelector("#wind").innerHTML;
    const t = document.querySelector("#currentTemp").innerHTML;



    if (t < 50 && w > 3.0) {
        const wc = 35.74 + (0.6215 * t) - (35.75 * Math.pow(w, .16)) + (.4275 * t * Math.pow(w, .16))
        document.querySelector("#chill").innerHTML = Math.floor(wc) + "&#8457;";
    } else {
        document.querySelector("#chill").innerHTML = "NA";
    }
}

function rentals_page() {
    const rentals = './data/rentals.json'
    fetch(rentals)
        .then((response) => response.json())
        .then((jsonObject) => {

            var col = [];
            for (var i = 1; i < jsonObject.length; i++) {
                for (var key in jsonObject[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }
            var table = document.createElement("table");

            var tr = table.insertRow(-1); // table row.

            for (var i = 0; i < jsonObject.length; i++) {

                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = jsonObject[i][col[j]];
                }
            }
            var divShowData = document.getElementById('showData');
            divShowData.innerHTML = "";
            divShowData.appendChild(table)

        });
}