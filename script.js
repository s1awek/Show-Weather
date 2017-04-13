$(document).ready(function () {
    'use strict';
    //Setting up some global variables
    var weatherApiUrl = 'https://api.darksky.net/forecast/6783ef08a50356e2dd65a80c5d386461',
        ipLocationApiUrl = 'https://freegeoip.net/json/',
        units = 'si',
        country,
        city,
        time_zone;
    //API error handler
    function errHandler(jqXHR, textStatus, error) {
        console.log('jqXHR:', jqXHR);
        console.log('textStatus:', textStatus);
        console.log('Error:', error);
        $('#error').text("You probably have adblock enabled or another ad blocking plugin. If you want to test the application, please add the page to the white list.");
        $('#error').addClass('error');
    }

    function cbDataIp(dataIpLocation) {
        country = dataIpLocation.country_code;
        city = dataIpLocation.city;
        time_zone = dataIpLocation.time_zone;
        if (country) {
            //Setting up country code if valid
            country = dataIpLocation.country_code;
        } else {
            //If empty or null set to the placeholder instead
            country = '??';
        }
        if (city) {
            //Setting up city name if valid
            city = dataIpLocation.city;
        } else if (time_zone) {
            //If city name not valid use time_zone instead to approximate location
            var str = time_zone,
                arr = str.split('/');
            city = arr[1];
        } else {
            //If none of above valid use placeholder instead
            city = 'Unknown City';
        }
        //Get weather data from https://api.darksky.net
        $.ajax({
            url: weatherApiUrl + "/" + dataIpLocation.latitude + "," + dataIpLocation.longitude + "?units=" + units,
            dataType: 'jsonp',
            type: 'get',
            cache: false,
            success: cbIpLocation,
            error: errHandler
        });
    }
    //Get user location from https://freegeoip.net/
    function doIt(un) {
        units = un;
        $.ajax({
            url: ipLocationApiUrl,
            dataType: 'json',
            type: 'get',
            cache: false,
            success: cbDataIp, //Send location data to cbDataIp()
            error: errHandler
        });
    }

    function cbIpLocation(dataWeather) {
        var temperature = Math.round(dataWeather.currently.apparentTemperature); //Round temperature to whole number
        document.getElementById('temperature').innerHTML = temperature; //Display temperature
        document.getElementById('location').innerHTML = city + ', ' + country; //Display geo data
        //Display appropriate icon and background image based on api.darksky.net response
        if (dataWeather.currently.icon === 'clear-day') {
            $('.weather-ico').attr('src', 'https://res.cloudinary.com/s1awek/image/upload/weather-app/icons/clear_day.svg');
            $('body').removeClass();
            $('body').addClass('clear-day');
        } else if (dataWeather.currently.icon === 'clear-night') {
            $('.weather-ico').attr('src', 'https://res.cloudinary.com/s1awek/image/upload/weather-app/icons/clear_night.svg');
            $('body').removeClass();
            $('body').addClass('clear-night');
        } else if (dataWeather.currently.icon === 'partly-cloudy-day') {
            $('.weather-ico').attr('src', 'https://res.cloudinary.com/s1awek/image/upload/weather-app/icons/few_clouds_day.svg');
            $('body').removeClass();
            $('body').addClass('few-clouds-day');
        } else if (dataWeather.currently.icon === 'partly-cloudy-night') {
            $('.weather-ico').attr('src', 'https://res.cloudinary.com/s1awek/image/upload/weather-app/icons/few_clouds_night.svg');
            $('body').removeClass();
            $('body').addClass('few-clouds-night');
        } else if (dataWeather.currently.icon === 'cloudy') {
            $('.weather-ico').attr('src', 'https://res.cloudinary.com/s1awek/image/upload/weather-app/icons/broken_clouds.svg');
            $('body').removeClass();
            $('body').addClass('broken-clouds');
        } else if (dataWeather.currently.icon === 'rain') {
            $('.weather-ico').attr('src', 'https://res.cloudinary.com/s1awek/image/upload/weather-app/icons/rain.svg');
            $('body').removeClass();
            $('body').addClass('rain');
        } else if (dataWeather.currently.icon === 'snow') {
            $('.weather-ico').attr('src', 'https://res.cloudinary.com/s1awek/image/upload/weather-app/icons/snow.svg');
            $('body').removeClass();
            $('body').addClass('snow');
        } else if (dataWeather.currently.icon === 'fog') {
            $('.weather-ico').attr('src', 'https://res.cloudinary.com/s1awek/image/upload/weather-app/icons/mist.svg');
            $('body').removeClass();
            $('body').addClass('mist');
        }
        //Change temperature units
        $('#unit-changer').click(function () {
            if (document.getElementsByClassName('unit')[0].innerHTML === "C") {
                $('#unit-changer-wrapper').replaceWith('<div id="unit-changer-wrapper"><span class="unit">F</span><span class="small-unit"> / </span><a href="#" id="unit-changer"><span class="small-unit">C</span></a></div>');
                doIt('us');
            } else {
                $('#unit-changer-wrapper').replaceWith('<div id="unit-changer-wrapper"><span class="unit">C</span><span class="small-unit"> / </span><a href="#" id="unit-changer"><span class="small-unit">F</span></a></div>');
                doIt('si');
            }

        });
    }
    //Fire app with default metric units
    doIt('si');
});
