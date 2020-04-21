try {
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    document.getElementById("lastUpdated").textContent = document.lastModified}
    catch (e) {
        alert("Error with code or your browser does not support Locale")
    }