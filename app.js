let inputBox = document.querySelector(".input-box");
let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let minMax = document.querySelector(".min-max");
let desc = document.querySelector(".desc");
let date = document.querySelector(".date");


inputBox.addEventListener("keypress", (event) => {

       if(event.keyCode === 13) {

                const city = inputBox.value;

                if(city === '') {

                        alert('City Name is required');
                        return;

                }

                getWeatherData(city);

       }

        
});


async function getWeatherData(city) {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b53c46ffad9e11f1cbd8975911a444d2`);
        
        const data = await response.json();

        showWeatherData(data);

}


function showWeatherData(data) {
  
        city.innerText = `${data.name}, ${data.sys.country}`;
        
        temp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;

        minMax.innerHTML = `${Math.floor(data.main.temp_min)}&deg;C (min) / ${Math.ceil(data.main.temp_max)}&deg;C (max)`;
        
        let weatherType = data.weather[0].main;
        desc.innerText = weatherType;
        date.innerText = getTodayDate(data);
        changeBackground(weatherType);

}





function getTodayDate(data) {

        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let today = new Date();
        let date = today.getDate();
        let month = months[today.getMonth()];
        let day = days[today.getDay()];
        let year = today.getFullYear();

        let completeDate = `${date} ${month} (${day}), ${year}`;
        return completeDate;

}


function changeBackground(weatherType) {
      
        let desc = weatherType;
        let imageUrl = "url('./images/clear.jpg')";

        if(desc == 'Clouds') {

                imageUrl = "url('./images/cloud.jpg')";

        } else if (desc == 'Rain') {

                imageUrl = "url('./images/rain.jpg')";

        } else if(desc == 'Snow') {

                imageUrl = "url('./images/snow.jpg')";

        } else if(desc == 'Clear') {

                imageUrl = "url('./images/clear.jpg')";

        } else if(desc == 'Sunny') {

                imageUrl = "url('./images/sunny.jpg')";

        } else if(desc == 'Thunderstorm') {

                imageUrl = "url('./images/thunderstorm.jpg')";

        } else if (desc == 'Haze') {

                imageUrl = "url('./images/haze.jpg')";

        }

        document.body.style.backgroundImage = imageUrl;

}