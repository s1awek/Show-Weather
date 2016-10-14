$(document).ready(function () {
    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/forecast/';
    var ipLocationApiUrl = 'http://freegeoip.net/json/';
    var clientIpApiUrl = 'https://api.ipify.org?format=json';

    function errHandler(jqXHR, textStatus, error) {
        console.log(error);
    }

    function doIt(units) {
        $.ajax({
            url: clientIpApiUrl,
            dataType: 'json',
            type: 'get',
            cache: false,
            success: cbIp,
            error: errHandler
        });

        function cbIp(dataClienIP) {
            $.ajax({
                url: ipLocationApiUrl + dataClienIP.ip,
                dataType: 'json',
                type: 'get',
                cache: false,
                success: cbDataIp,
                error: errHandler
            });
        }

        function cbDataIp(dataIpLocation) {
            $.ajax({
                url: weatherApiUrl + "city?q=" + dataIpLocation.city + "&APPID=083588bbe3a74143bc05a07dcc93e109&units=" + units,
                dataType: 'json',
                type: 'get',
                cache: false,
                success: cbIpLocation,
                error: errHandler
            });
        }

        function cbIpLocation(dataWeather) {
            var temperature = Math.round(dataWeather.list[0].main.temp);
            document.getElementById('temperature').innerHTML = temperature;
            document.getElementById('location').innerHTML = dataWeather.city.name + ', ' + dataWeather.city.country;
            if (dataWeather.list[0].weather[0].icon === '01d') {
                $('.weather-ico').attr('src', 'img/icons/clear_day.svg');
                $('body').removeClass();
                $('body').addClass('clear-day');
            } else if (dataWeather.list[0].weather[0].icon === '01n') {
                $('.weather-ico').attr('src', 'img/icons/clear_night.svg');
                $('body').removeClass();
                $('body').addClass('clear-night');
            } else if (dataWeather.list[0].weather[0].icon === '02d') {
                $('.weather-ico').attr('src', 'img/icons/few_clouds_day.svg');
                $('body').removeClass();
                $('body').addClass('few-clouds-day');
            } else if (dataWeather.list[0].weather[0].icon === '02n') {
                $('.weather-ico').attr('src', 'img/icons/few_clouds_night.svg');
                $('body').removeClass();
                $('body').addClass('few-clouds-night');
            } else if (dataWeather.list[0].weather[0].icon === '03d' || dataWeather.list[0].weather[0].icon === '03n') {
                $('.weather-ico').attr('src', 'img/icons/scattered_clouds.svg');
                $('body').removeClass();
                $('body').addClass('scattered-clouds');
            } else if (dataWeather.list[0].weather[0].icon === '04d' || dataWeather.list[0].weather[0].icon === '04n') {
                $('.weather-ico').attr('src', 'img/icons/broken_clouds.svg');
                $('body').removeClass();
                $('body').addClass('broken-clouds');
            } else if (dataWeather.list[0].weather[0].icon === '09d' || dataWeather.list[0].weather[0].icon === '09n') {
                $('.weather-ico').attr('src', 'img/icons/shower_rain.svg');
                $('body').removeClass();
                $('body').addClass('shower-rain');
            } else if (dataWeather.list[0].weather[0].icon === '10d' || dataWeather.list[0].weather[0].icon === '10n') {
                $('.weather-ico').attr('src', 'img/icons/rain.svg');
                $('body').removeClass();
                $('body').addClass('rain');
            } else if (dataWeather.list[0].weather[0].icon === '11d' || dataWeather.list[0].weather[0].icon === '11n') {
                $('.weather-ico').attr('src', 'img/icons/thunderstorm.svg');
                $('body').removeClass();
                $('body').addClass('thunderstorm');
            } else if (dataWeather.list[0].weather[0].icon === '13d' || dataWeather.list[0].weather[0].icon === '13n') {
                $('.weather-ico').attr('src', 'img/icons/snow.svg');
                $('body').removeClass();
                $('body').addClass('snow');
            }  else if (dataWeather.list[0].weather[0].icon === '50d' || dataWeather.list[0].weather[0].icon === '50n') {
                $('.weather-ico').attr('src', 'img/icons/mist.svg');
                $('body').removeClass();
                $('body').addClass('mist');
            }
            $('#unit-changer').click(function () {
                if (document.getElementsByClassName('unit')[0].innerHTML === "C") {
                    $('#unit-changer-wrapper').replaceWith('<div id="unit-changer-wrapper"><span class="unit">F</span><span class="small-unit"> / </span><a href="#" id="unit-changer"><span class="small-unit">C</span></a></div>');
                    doIt('imperial');
                } else {
                    $('#unit-changer-wrapper').replaceWith('<div id="unit-changer-wrapper"><span class="unit">C</span><span class="small-unit"> / </span><a href="#" id="unit-changer"><span class="small-unit">F</span></a></div>');
                    doIt('metric');
                }
            });

        }

    }
    doIt('metric');
});
