$(document).ready(function() {
  
  $("#temp").on("click", changeUnits);
  $(".local").on("click", local);
  $(".random").on("click", randomLoc);

  local();

});

var saj = {
  units: "metric",
  unitschar: "C",
  current: {},
  images: {
    clear: "https://icons.wxug.com/data/wximagenew/n/noneinc/10023-thumb250.jpg",
    clouds: "https://icons.wxug.com/data/wximagenew/e/elcondomondo/2-thumb250.jpg",
    rain: "https://icons.wxug.com/data/wximagenew/d/Doesiedoats/6118-thumb250.gif"
  }
};

function local() {
  $.getJSON("http://ip-api.com/json", function(json) {
      saj.lat = json.lat;
      saj.long = json.lon;
      getWeather(saj.lat, saj.long);
  });
}

function randomLoc() {
  saj.lat = Math.random() * 180 - 90;
  saj.long = Math.random() * 180 - 90;
  
  getWeather(saj.lat, saj.long);
}

function changeUnits() {
  if (saj.units == "metric") {
    saj.units = "imperial";
    saj.unitschar = "F";
  } else {
    saj.units = "metric";
    saj.unitschar = "C";
  }
  
  getWeather(saj.lat, saj.long);
}

function getWeather(lat, long) {
  
  lat = Math.floor(lat * 100) / 100;
  var strLat = "" + Math.abs(lat);
  if (lat >= 0) strLat += "N";
  else strLat += "S";

  long = Math.floor(long * 100) / 100;
  var strLong = "" + Math.abs(long);
  if (long >= 0) strLong += "E";
  else strLong += "W";

  // $("#demo").html(`${strLat} x ${strLong}`);
  http: //api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=7e8ed0d293b2253f6f723a08d82395bd
    var baseURL = "http://api.openweathermap.org/data/2.5/weather?";
  var url = baseURL + `lat=${lat}`;
  url += `&lon=${long}`;
  url += `&units=${saj.units}`;
  url += `&appid=7e8ed0d293b2253f6f723a08d82395bd`;

  console.log(url);
  $.getJSON(url, function(result) {
    if (result.cod == "200") {
      saj.current = result;
      $("#city").html(result.name);

      $("#temp").html(result.main.temp + " " + saj.unitschar);

      var cond = result.weather[0].main;
      $("#conditions").html(cond.slice(0, 1).toUpperCase() + cond.slice(1));

      var iconurl =  "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png";
      
      console.log(iconurl);
      $("#cond_img").attr("src", iconurl);
      $("html").css("background-image", 'url(' + saj.images[cond.toLowerCase()] + ')');
      // $("#all").html(JSON.stringify(result));
    } else {
      $("#demo").html(JSON.stringify(result.cod));
    }
  });
}
