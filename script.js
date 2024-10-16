const temperatureField = document.querySelector(".temperature p");
const locationField = document.querySelector(".city p");
const weatherField = document.querySelector(".condition p");
const searchField = document.querySelector('.search input');
const form = document.querySelector('form');
const errorField = document.querySelector('.error-message'); // Add a field for showing error messages

// Add event listener for form submission
form.addEventListener('submit', searchForLocation);

let target = 'vijayawada';

const fetchResults = async () => {
    let url = `http://api.weatherapi.com/v1/current.json?key=8054bb19e0814fe9b91143352241510&q=${target}&aqi=no`;

    try {
        const res = await fetch(url);
        const data = await res.json();


        if (data.error) {
            errorField.textContent = "Location not found. Please try another location.";
            locationField.textContent = '';
            temperatureField.textContent = '';
            weatherField.textContent = '';
            return; 
        }

        // Clear any previous error messages if the request is successful
        errorField.textContent = '';

        let location = data.location.name;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        locationField.textContent = location;
        temperatureField.innerHTML = `<b>${temp}°C</b>`;
        weatherField.textContent = condition;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorField.textContent = "An error occurred while fetching data.";
    }
}

function searchForLocation(e) {
    e.preventDefault();

    // Get the search input value
    target = searchField.value;

    fetchResults();
}

// Initial fetch on page load
fetchResults();
