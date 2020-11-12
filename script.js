// https://openweathermap.org/img/wn/{ICON ID}@2x.png

const key = "dd1284333d5e62e1bd1465e71e650a82";
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let submitUserInput = () => {
  let method = "GET";
  let url = "https://api.openweathermap.org/data/2.5/forecast?";
  let success = (data) => {
    $("#weatherTitle").empty();
    $("#weatherDisplay").empty();
    $("#weatherTitle").append(`The weather for ${$("#areaInput").val()}`);
    let rowLength = data.list.length/5;
    let items=[...data.list];

    for(let i = 0; i<5;i++){
     
      let weatherRow = `<div class="weatherRow" id="row${i+1}"></div>`;
      let date = new Date(items[0].dt_txt);
      
      $(`#weatherDisplay`).append('<h3 class="day">'+date.toUTCString().split(" ",4).join(" ")+'</h3>');
      $("#weatherDisplay").append(weatherRow);
      $("#weatherDisplay").append('</br>');
      for(let j = 0; j<rowLength; j++){
        let itemx = items.shift();
        addWeatherDiv(itemx,i+1);
      }

      
      }
  }

  let unit;
  if ($("#tempUnit option:selected").val() == "F") {
    unit = "imperial";
  } else {
    unit = "metric";
  }
  url += `units=${unit}&`;

  if ($("#area option:selected").val() == "zipCode") {
    let zip = $("#areaInput").val();
    url += `zip=${zip},us&appid=${key}`;
  } else {
    let city = $("#areaInput").val();
    url += `q=${city}&appid=${key}`;
  }
  
  $.ajax({ url, success, method });

}

// fields we need: main.temp = temperature, weather[0].description = description,  weather[0].icon = icon, 

let addWeatherDiv = (item,rowNum) => {
  let hour= new Date(item.dt_txt).getHours();
  let timestring;
  let temp = item.main.temp;
  let description = item.weather[0].description;
  let icon = item.weather[0].icon; // fix this
  if(hour===0)
    timestring="12 am";
  else if(hour>12){
    timestring=hour%12 +" pm";
  }
  else{
    timestring=hour+" am";
  }
  let weatherImg = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" />`
  let weatherDiv = `<div class="weather"><h3 class="weatherDateTime">${timestring}</h3> <div class="weatherTemperature">${temp} &#176; ${$('#tempUnit option:selected').val()}</div><div class="weatherDescription"> ${description}</div> <div class="weatherIcon">${weatherImg}</div></div>`
  $(`#row${rowNum}`).append(weatherDiv);
}