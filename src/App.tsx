import React, { useState, useEffect } from 'react'
import { Title, WeatherWrapper, MainContainer } from './styles.tsx'
import { Weather } from './weather.tsx'
import Search from './search.tsx'
import axios from 'axios'
import './App.css'

function App(): JSX.Element {
  // Store longitude and latitude in state
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)

  //let mockApi = 'http://localhost:3000/weather'

  // Define the shape of weather data object
  type WeatherDataProps = {
    longitude: number
    latitude: number
    dt: number
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

  // Store weather data in state
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null)

  const units = 'metric'
  const apiKey = process.env.REACT_APP_API_KEY
  console.log(apiKey)

  // Define unit conversions for temperature and speed
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

  // Fetch weather data using longitude and latitude
  const fetchWeatherByLonLat = async (): Promise<void> => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`
    // let url = mockApi
    try {
      const response = await axios.get(url)

      if (response.status === 200) {
        const data = await response.data

        // Extract necessary weather data from the response
        const {
          weather,
          dt,
          main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
          wind: { speed, deg },
          sys: { country, sunrise, sunset },
          name,
        } = data

        const { description, icon } = weather[0]

        // Update the weather data state
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
          dt,
        })

        console.log('Weather data fetched')
      } else {
        console.log('Error: Unexpected status code', response.status)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  // Get the current coordinates of the device
  const getCurrentCoordinates = async (): Promise<void> => {
    try {
      await new Promise<void>((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              setLatitude(latitude)
              setLongitude(longitude)
              resolve()
            },
            (error) => {
              reject(error)
            }
          )
        } else {
          reject(new Error('Geolocation is not supported by this browser.'))
        }
      })

      console.log('Latitude:', latitude)
      console.log('Longitude:', longitude)

      // Fetch weather data using the obtained coordinates
      fetchWeatherByLonLat()
    } catch (error_1) {
      console.log('Error:', error_1)
    }
  }

  useEffect(() => {
    // Get the current coordinates when the component mounts
    getCurrentCoordinates()
    // Re-fetch weather data when there are changes in weatherData
  }, [])

  return (
    <div>
      <MainContainer>
        <Title>Todays Forecast</Title>
        <Search setWeatherData={setWeatherData} />
        <WeatherWrapper>
          {/* Render weather component if weather data is available */}
          {weatherData && (
            <Weather
              units={convertUnits[units].temp}
              description={weatherData.description}
              temp={weatherData.temp}
              country={weatherData.country}
              name={weatherData.name}
              icon={weatherData.icon}
              humidity={weatherData.humidity}
              pressure={weatherData.pressure}
              sunrise={Math.round(weatherData.sunrise)}
              sunset={Math.round(weatherData.sunset)}
              longitude={longitude}
              latitude={latitude}
              speed={weatherData.speed}
              deg={weatherData.deg}
              feels_like={weatherData.feels_like}
              temp_min={weatherData.temp_min}
              temp_max={weatherData.temp_max}
              dt={weatherData.dt}
            />
          )}
          {/* Render loading message if weather data is not available */}
          {!weatherData && <p>Loading...</p>}
        </WeatherWrapper>

        <button onClick={getCurrentCoordinates}>Refresh🔄</button>
      </MainContainer>
    </div>
  )
}

export default App
