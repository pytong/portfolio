function WeatherApp() {
  var tempKevin;

  return {
    addMetricListener: function(selectedMetric) {
      var currentMetric,
          selectedMetricBtn,
          currentMetricBtn,
          _this = this;

      currentMetric = ((selectedMetric === "celsius") ? "fahrenheit" : "celsius");
      selectedMetricBtn =  $("." + selectedMetric);
      currentMetricBtn = $("." + currentMetric);

      selectedMetricBtn.click(function() {
        selectedMetricBtn.addClass("btn-success");
        selectedMetricBtn.removeClass("btn-default");
        currentMetricBtn.addClass("btn-default");
        currentMetricBtn.removeClass("btn-success");
        _this.showTemperature(selectedMetric, tempKevin);
      });
    },

    getLocation: function () {
      return $.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBH4H5AhTnCxufmJ4NtHLxtb19QZ3QNcS0");
    },

    getLocationName: function(latlng) {
      return $.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBH4H5AhTnCxufmJ4NtHLxtb19QZ3QNcS0&latlng=" + latlng);
    },

    getWeather: function(location) {
      return $.get("http://api.openweathermap.org/data/2.5/weather?APPID=71089d976eb04dfd7ae2535e80157021&q=" + location);
    },

    showLocation: function(location) {
      $(".location").html(location);
    },

    showDescription: function(description) {
      $(".description").html(description);
    },

    showTemperature: function(metric, temperature) {
      var text;

      if(metric === "fahrenheit") {
        var tempFahrenheit = ((temperature - 273.15)* 1.8000 + 32.00).toFixed(0);
        text = tempFahrenheit + "°F";
      } else {
        var tempCelsius = (temperature - 273.15).toFixed(0);
        text = tempCelsius + "°C";
      }
      $(".temperature").html(text);
    },

    showWind: function(windDirection, windSpeed) {
      $(".wind").html(windDirection + " " + windSpeed);
    },

    showIcon: function(description) {
      var icon;

      if(description.match(/cloud/i)) {
        icon = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/48/Status-weather-clouds-icon.png";
      } else if(description.match(/sun/i)) {
        icon = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/48/Status-weather-clear-icon.png";
      } else if(description.match(/thunder/i)) {
        icon = "http://icons.iconarchive.com/icons/custom-icon-design/weather/48/thunder-icon.png";
      }  else if(description.match(/rain/i)) {
        icon = "http://icons.iconarchive.com/icons/aha-soft/free-3d-glossy/48/Weather-icon.png";
      } else if(description.match(/snow/i)) {
        icon = "http://icons.iconarchive.com/icons/paomedia/small-n-flat/48/snow-flake-icon.png";
      } else {
        icon = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/48/Status-weather-clear-icon.png";
      }
      $(".icon").attr("src", icon);
    },

    showBackground: function(description) {
      var backgroundImage;

      if(description.match(/cloud/i)) {
        backgroundImage = "http://randomwallpapers.net/fresh-air-landscape-cloudy-1920x1200-wallpaper111439.jpg";
      } else if(description.match(/sun/i)) {
        backgroundImage = "http://7-themes.com/data_images/out/57/6965058-sunny-breeze.jpg";
      } else if(description.match(/thunder/i)) {
        backgroundImage = "https://lh4.ggpht.com/_9i0N8KVLzgFGkxeanBrQo97OHmd-LCfjon0g36BKQyFpfT7326d598Ox_gqPf4j4lQ=h900";
      }  else if(description.match(/rain/i)) {
        backgroundImage = "http://images3.alphacoders.com/892/89289.jpg";
      }  else if(description.match(/snow/i)) {
        backgroundImage = "http://www.mrwallpaper.com/wallpapers/sunset-snow-landscape.jpg";
      } else {
        backgroundImage = "http://7-themes.com/data_images/out/57/6965058-sunny-breeze.jpg";
      }

      $(".bg").attr('src', backgroundImage);
    },

    degToCompass: function(deg) {
      var orientations = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],
          orientationIndex = (deg / 22.5).toFixed(0) % orientations.length;

      return orientations[orientationIndex];
    },

    load: function() {
      var _this = this;

      $.when(_this.getLocation()).then(function(data) {
        var latlng = data["location"]["lat"] + "," +data["location"]["lng"];

        $.when(_this.getLocationName(latlng)).then(function(data) {
          var city = data["results"][0]["address_components"][3]["short_name"],
              state = data["results"][0]["address_components"][5]["long_name"],
              location = city + ", " + state;

          _this.showLocation(location);

          $.when(_this.getWeather(location)).then(function(data) {
            tempKevin = data["main"]["temp"];
            var description = data["weather"][0]["description"],
                windSpeed = data["wind"]["speed"],
                windDeg = _this.degToCompass(data["wind"]["deg"]);

            _this.showTemperature("fahrenheit", tempKevin);
            _this.showDescription(description);
            _this.showWind(windDeg, windSpeed);

            _this.showIcon(description);
            _this.showBackground(description);
          });
        });
      });
    }

  }
}


$().ready(function() {
  var weatherApp = WeatherApp();
  weatherApp.load();
  weatherApp.addMetricListener("celsius");
  weatherApp.addMetricListener("fahrenheit");
});
