import React, { useState, useEffect } from 'react'
import { Title, WeatherWrapper, MainContainer } from './styles.js'
import { Weather } from './weather.js'

function App() {
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)

  const [weatherData, setWeatherData] = useState({})

  const units = 'metric' //can be changed to imperial if need be - maybe add functionality to toggle units
  const apiKey = process.env.REACT_APP_API_KEY
  console.log(apiKey)

  const convertUnits = {
    metric: {
      temp: 'C',
      speed: 'm/s',
    },
    imperial: {
      temp: 'F',
      speed: 'mph',
    },
  }

  const fetchWeather = () => {
    if (!latitude && !longitude) {
      return
    } else {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const {
            coord: { lon, lat },
            main: { temp, feels_like },
            wind: { speed, deg },
            sys: { sunrise, sunset },
            weather: [{ icon }],
          } = data
          setWeatherData({
            lon,
            lat,
            temp,
            feels_like,
            speed,
            deg,
            sunrise,
            sunset,
            icon,
          })
        })
        .catch((error) => {
          console.log(`error: `, error)
        })
        .finally(() => {
          console.log(`fetched weather`)
        })
    }
  }
  // const updateCoordinates = (props) => {
  //   const { coords } = props
  //   const newLongitude = coords ? coords.longitude || 0 : 0
  //   const newLatitude = coords ? coords.latitude || 0 : 0
  //   setLongitude(newLongitude)
  //   setLatitude(newLatitude)
  //   console.log(`updated coordinates: ${newLongitude}, ${newLatitude}`)
  //   fetchWeather()
  // }

  const updateCoordinates = (coords) => {
    const newLongitude = coords ? coords.longitude || 0 : 0
    const newLatitude = coords ? coords.latitude || 0 : 0
    setLongitude(newLongitude)
    setLatitude(newLatitude)
    console.log(`updated coordinates: ${newLongitude}, ${newLatitude}`)
    fetchWeather()
  }

  useEffect(() => {
    updateCoordinates()
    fetchWeather() // if any changes occur it gets weather again
  }, [longitude, latitude])

  const getTime = (arg) => {
    let time = new Date(arg * 1000)
    return time.toLocaleTimeString('en-US')
  }

  return (
    <MainContainer>
      <Title>Weather App</Title>

      <WeatherWrapper>
        {/* Have weather here */}
        <Weather
          sunset={weatherData.sunset}
          sunrise={weatherData.sunrise}
          weatherData={weatherData}
          longitude={longitude}
          latitude={latitude}
          units={convertUnits[units].temp}
        />
      </WeatherWrapper>
    </MainContainer>
  )
}
export default App
