import React, { useState } from 'react'

function Search() {
  type WeatherDataProps = {
    longitude: number
    latitude: number
    units: string
    speed: number
    deg: number
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    country: string
    name: string
    icon: string
    humidity: number
    pressure: number
    description: string
    sunrise: number
    sunset: number
  }

  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null)
  const units = 'metric'
  const apiKey = process.env.REACT_APP_API_KEY

  function handleClick(e: any) {
    let searchLocation = e.target.value
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=${apiKey}&units=${units}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const {
            weather,
            main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
            wind: { speed, deg },
            sys: { country, sunrise, sunset },
            name,
          } = data

          const { description, icon } = weather[0]

          setWeatherData({
            description,
            temp,
            feels_like,
            speed,
            pressure,
            humidity,
            deg,
            icon,
            temp_min,
            temp_max,
            country,
            name,
            sunrise,
            sunset,
            longitude,
            latitude,
            units,
          })
        }
      })
  }

  return (
    <div className="searchDiv">
      <input type="text" placeholder="Search" />
      <button value="Search" onClick={handleClick}>
        Search
      </button>
    </div>
  )
}

export default Search
