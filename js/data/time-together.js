const START_DATE = new Date(2025, 8, 13, 0, 0, 0);

function pad(num) {
    return String(num).padStart(2, '0');
}

function updateCounter() {
    const now = new Date();
    let years = now.getFullYear() - START_DATE.getFullYear();
    let months = now.getMonth() - START_DATE.getMonth();
    let days = now.getDate() - START_DATE.getDate();
    let hours = now.getHours() - START_DATE.getHours();
    let minutes = now.getMinutes() - START_DATE.getMinutes();
    let seconds = now.getSeconds() - START_DATE.getSeconds();

    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }

    if (days < 0) {
        const prevMonthLength = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonthLength;
        months--;
    }

    if (months < 0) { months += 12; years--; }

    document.getElementById('tt-years').textContent = years;
    document.getElementById('tt-months').textContent = months;
    document.getElementById('tt-days').textContent = days;
    document.getElementById('tt-hours').textContent = pad(hours);
    document.getElementById('tt-minutes').textContent = pad(minutes);
    document.getElementById('tt-seconds').textContent = pad(seconds);
}

updateCounter();
setInterval(updateCounter, 1000);