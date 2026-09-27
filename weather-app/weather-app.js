const inputElem = document.querySelector(".search-box");

const apiData = {
    url: "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "df9ef7edc4de81e21e0db4c210daa38f"
};


// Get weather data
function fetchData() {

    const city = inputElem.value.trim();

    // Don't send an empty request
    if (city === "") {
        return;
    }

    fetch(`${apiData.url}${encodeURIComponent(city)}&appid=${apiData.key}&units=metric`)
        .then(response => {

            if (!response.ok) {
                throw new Error("City not found");
            }

            return response.json();
        })
        .then(data => {
            console.log(data);

            showData(data);
        })
        .catch(error => {
            console.error(error);

            document.querySelector(".city").textContent = "City not found";
            document.querySelector(".date").textContent = "Please try another city";
            document.querySelector(".temp").innerHTML = "--<span>°C</span>";
            document.querySelector(".weather").textContent = "--";
            document.querySelector(".hi-low").textContent = "--°C / --°C";
        });
}


// Show weather data
function showData(data) {

    const cityElem = document.querySelector(".city");
    cityElem.textContent = `${data.name}, ${data.sys.country}`;


    const dateElem = document.querySelector(".date");
    dateElem.textContent = showDate();


    const tempElem = document.querySelector(".temp");

    tempElem.innerHTML = `
        ${Math.round(data.main.temp)}
        <span>°C</span>
    `;


    const weatherElem = document.querySelector(".weather");
    weatherElem.textContent = data.weather[0].main;


    const tempsElem = document.querySelector(".hi-low");

    tempsElem.textContent = `
        ${Math.round(data.main.temp_min)}°C /
        ${Math.round(data.main.temp_max)}°C
    `;
}


// Get current date
function showDate() {

    const now = new Date();

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const day = days[now.getDay()];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const date = now.getDate();

    return `${day} ${date} ${month} ${year}`;
}


// Search with Enter key
inputElem.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        fetchData();
    }

});
