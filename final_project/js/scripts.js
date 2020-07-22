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
                

                document.getElementById('current').appendChild(card);
            }

        );

    // 5 day forcast

    const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&exclude=hourly,daily&APPID=aabf571ae3b6766a2927f44fdd37a467";

    fetch(forecastURL)
        .then((response) => response.json())
        .then((jsonObject) => {
            const fiveday = jsonObject.list.filter(x => x.dt_txt.includes('00:00:00'));

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
            var tr2 = table.insertRow(1);
            var th = document.createElement("th");
            var res = document.createElement("th");
            var walk = document.createElement("th");
            var blank = document.createElement("td");
            
            th.innerHTML = "Max Persons and Price Chart (includes Tax)";
            th.colSpan = 6;
            tr.appendChild(th);

            blank.innerHTML="";
            blank.colSpan = 2;
            tr2.appendChild(blank)

            res.innerHTML = "Reservation";
            res.colSpan = 2;
            tr2.appendChild(res);

            walk.innerHTML="Walk-In";
            walk.colSpan = 2;
            tr2.appendChild(walk)

            for (var i = 1; i < jsonObject.length; i++) {

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