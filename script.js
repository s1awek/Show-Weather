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
                            document.getElementById('temperature').innerHTML = 'Teraz w miejscowości ' + dataWeather.city.name + ' jest ' + dataWeather.list[0].main.temp + ' stopni celcjusza.';
                        },
                        error: function (err) {
                            console.log('Data Weather API Error!');
                        }
                    });
                },
                error: function (err) {
                    console.log('Data IP Location API Error!');
                }
            });
        },
        error: function (err) {
            console.log('Data Client IP API Error!');
        }
    });
});
