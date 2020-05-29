const w = document.querySelector("#wind").innerHTML;
const t = document.querySelector("#currentTemp").innerHTML; 



if (t < 50 || w > 3.0){
    const wc = 35.74 + (0.6215 * t) - (35.75 * Math.pow(w,.16)) + (.4275 * t * Math.pow(w,.16))
    document.querySelector("#chill").innerHTML = Math.floor(wc) + "&#8457;";
} else{
    document.querySelector("#chill").innerHTML = "NA";
}
