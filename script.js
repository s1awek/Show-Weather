$(document).ready(function () {

    //    $.getJSON('http://api.openweathermap.org/data/2.5/forecast/city?q=bielawa&APPID=083588bbe3a74143bc05a07dcc93e109&units=metric', function (data) {
    //        console.log(data);
    //    });
    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/forecast/';
    var ipLocationApiUrl = 'http://freegeoip.net/json/';
    var clientIpApiUrl = 'https://api.ipify.org?format=json';
    var units = 'metric';

    $.ajax({
        url: clientIpApiUrl,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (dataClienIP) {
            $.ajax({
                url: ipLocationApiUrl + dataClienIP.ip,
                dataType: 'json',
                type: 'get',
                cache: false,
                success: function (dataIpLocation) {

                    $.ajax({
                        url: weatherApiUrl + "city?q=" + dataIpLocation.city + "&APPID=083588bbe3a74143bc05a07dcc93e109&units=" + units,
                        dataType: 'json',
                        type: 'get',
                        cache: false,
                        success: function (dataWeather) {
                            var temperatute = Math.round(dataWeather.list[0].main.temp);
                            document.getElementById('temperature').innerHTML = temperatute;
                            document.getElementById('location').innerHTML = dataWeather.city.name + ', ' + dataWeather.city.country;
                        },
                        error: function (err) {
                            console.log('dataWeather API Error!');
                        }
                    });
                },
                error: function (err) {
                    console.log('dataIpLocation API Error!');
                }
            });
        },
        error: function (err) {
            console.log('dataClienIP API Error!');
        }
    });
});
