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



