import React, { useState, useEffect } from 'react'
import { Title, WeatherWrapper, MainContainer } from './styles.js'
import { Weather } from './weather.js'
import axios from 'axios'
import dotenv from 'dotenv'

function App() {
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)

  const [weatherData, setWeatherData] = useState({})

  const units = 'metric' //can be changed to imperial if need be - maybe add functionality to toggle units
  const apiKey = process.env.REACT_APP_API_KEY

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

  const fetchWeather = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`

    try {
      const response = await axios.get(url)

      if (response.status === 200) {
        const data = response.data

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

        console.log('Weather data fetched')
      } else {
        console.log('Error: Unexpected status code', response.status)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const getCurrentCoordinates = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            setLatitude(latitude)
            setLongitude(longitude)
            resolve({ latitude, longitude })
          },
          (error) => {
            reject(error)
          }
        )
      } else {
        reject(new Error('Geolocation is not supported by this browser.'))
      }
    })
      .then((coordinates) => {
        const { latitude, longitude } = coordinates
        console.log('Latitude:', latitude)
        console.log('Longitude:', longitude)
        fetchWeather()
      })
      .catch((error) => {
        console.log('Error:', error)
        // Handle the error appropriately
      })
  }

  getCurrentCoordinates() //call this every time the page loads

  useEffect(() => {
    getCurrentCoordinates()
    // if any changes occur it gets weather again
  }, [longitude, latitude])

  console.log('Weather data:', weatherData)

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
