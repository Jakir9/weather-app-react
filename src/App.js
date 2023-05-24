"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styles_tsx_1 = require("./styles.tsx");
var weather_tsx_1 = require("./weather.tsx");
var axios_1 = require("axios");
//import dotenv from 'dotenv'
function App() {
    var _this = this;
    var _a = (0, react_1.useState)(0), longitude = _a[0], setLongitude = _a[1];
    var _b = (0, react_1.useState)(0), latitude = _b[0], setLatitude = _b[1];
    var _c = (0, react_1.useState)({}), weatherData = _c[0], setWeatherData = _c[1];
    // const [weatherData, setWeatherData] = useState({})
    var units = 'metric'; //can be changed to imperial if need be - maybe add functionality to toggle units
    var apiKey = 'null';
    //make an enum for units
    //type units = 'metric' | 'imperial'
    var convertUnits = {
        metric: {
            temp: 'C',
            speed: 'm/s',
        },
        imperial: {
            temp: 'F',
            speed: 'mph',
        },
    };
    var fetchWeather = function () { return __awaiter(_this, void 0, void 0, function () {
        var url, response, data, weather, _a, temp, feels_like, temp_min, temp_max, pressure, humidity, _b, speed, deg, _c, country, sunrise, sunset, name_1, _d, description, icon, error_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    url = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(latitude, "&lon=").concat(longitude, "&appid=").concat(apiKey, "&units=").concat(units);
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 2:
                    response = _e.sent();
                    if (response.status === 200) {
                        data = response.data;
                        weather = data.weather, _a = data.main, temp = _a.temp, feels_like = _a.feels_like, temp_min = _a.temp_min, temp_max = _a.temp_max, pressure = _a.pressure, humidity = _a.humidity, _b = data.wind, speed = _b.speed, deg = _b.deg, _c = data.sys, country = _c.country, sunrise = _c.sunrise, sunset = _c.sunset, name_1 = data.name;
                        _d = weather[0], description = _d.description, icon = _d.icon;
                        setWeatherData({
                            description: description,
                            temp: temp,
                            feels_like: feels_like,
                            speed: speed,
                            pressure: pressure,
                            humidity: humidity,
                            deg: deg,
                            icon: icon,
                            temp_min: temp_min,
                            temp_max: temp_max,
                            country: country,
                            name: name_1,
                            sunrise: sunrise,
                            sunset: sunset,
                        });
                        console.log('Weather data fetched');
                    }
                    else {
                        console.log('Error: Unexpected status code', response.status);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _e.sent();
                    console.log('Error:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var getCurrentCoordinates = function () {
        return new Promise(function (resolve, reject) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var _a = position.coords, latitude = _a.latitude, longitude = _a.longitude;
                    setLatitude(latitude);
                    setLongitude(longitude);
                    resolve();
                }, function (error) {
                    reject(error);
                });
            }
            else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        })
            .then(function (coordinates) {
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
            fetchWeather();
        })
            .catch(function (error) {
            console.log('Error:', error);
            // Handle the error appropriately
        });
    };
    (0, react_1.useEffect)(function () {
        getCurrentCoordinates();
        // if any changes occur it gets weather again
    }, [longitude, latitude]);
    console.log('Weather data:', weatherData);
    return (<styles_tsx_1.MainContainer>
      <styles_tsx_1.Title>Weather App</styles_tsx_1.Title>
      <styles_tsx_1.WeatherWrapper>
        {/* Have weather here */}
        <weather_tsx_1.Weather longitude={longitude} latitude={latitude} units={convertUnits[units].temp} speed={weatherData.speed} deg={weatherData.deg} temp={weatherData.temp} feels_like={weatherData.feels_like} temp_min={weatherData.temp_min} temp_max={weatherData.temp_max} country={weatherData.country} name={weatherData.name} icon={weatherData.icon} humidity={weatherData.humidity} pressure={weatherData.pressure} description={weatherData.description} sunrise={weatherData.sunrise} sunset={weatherData.sunset}/>
      </styles_tsx_1.WeatherWrapper>
    </styles_tsx_1.MainContainer>);
}
exports.default = App;
