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
            if (dataWeather.list[0].weather[0].main === 'Clear') {
                $('.weather-ico').attr('src', 'img/icons/clear_day.svg');
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
