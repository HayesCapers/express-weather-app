var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.post('/search', (req,res)=>{
	const weatherApi = 'http://api.openweathermap.org/data/2.5/weather';
	const weatherApiForecast = 'http://api.openweathermap.org/data/2.5/forecast/daily?zip='
	var zipCode = req.body.zipCode;
	var weatherUrl = `${weatherApi}?zip=${zipCode},us&units=imperial&appid=${config.apiKey}`;
	var forecastUrl = `${weatherApiForecast}${zipCode},us&units=imperial&cnt=5&appid=${config.apiKey}`;


	request.get(weatherUrl, (error,response,weatherData)=>{
		var weatherData = JSON.parse(weatherData);
		// res.json(weatherData);
		// var weather = {
		// 		name: weatherData.name,
		// 		curr: weatherData.main.temp,
		// 		max: weatherData.main.temp_max,
		// 		min: weatherData.main.temp_min,
		// 		humidity: weatherData.main.humidity,
		// 		icon: weatherData.weather[0].icon,
		// 		weatherDesc: weatherData.weather[0].description,
		// 		windInt: weatherData.wind.deg,
		// 		windSpeed: weatherData.wind.speed,
		// 	}
		res.render('search', {
			weather: weatherData,
		});
	});
});



module.exports = router;
