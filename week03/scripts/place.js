const temperature = 29;
const windSpeed = 8;

function calculateWindChill(temperature, windSpeed) {
    return 13.12 + 0.6215 * temperature - 11.37 * windSpeed ** 0.16 + 0.3965 * temperature * windSpeed ** 0.16
}
const windChill = document.getElementById("windchill");

if (temperature <= 10 && windSpeed > 4.8) {
    windChill.textContent = calculateWindChill(temperature, windSpeed);
}
else {
    windChill.textContent = "N/A";
}

const currentYear = new Date().getFullYear();

const year = document.getElementById("year");
year.textContent = currentYear;
const lastModified = document.getElementById("LastModified");
lastModified.textContent = document.lastModified;