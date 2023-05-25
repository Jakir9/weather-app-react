import React, { useState, useEffect } from 'react'
import { Title, WeatherWrapper, MainContainer } from './styles.tsx'
import { Weather } from './weather.tsx'
import axios from 'axios'
//import dotenv from 'dotenv'

function App(): JSX.Element {
  const [longitude, setLongitude] = useState<number>(0)
  const [latitude, setLatitude] = useState<number>(0)

  interface WeatherProps {
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
    humidity: number // Add the humidity property
    pressure: number
    description: string
    sunrise: number
    sunset: number
  }

  const [weatherData, setWeatherData] = useState<WeatherData>({} as WeatherData)

  // const [weatherData, setWeatherData] = useState({})

  const units = 'metric' //can be changed to imperial if need be - maybe add functionality to toggle units
  const apiKey = 'null'

  //make an enum for units
  //type units = 'metric' | 'imperial'

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

  const fetchWeather = async (): Promise<void> => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`

    try {
      const response = await axios.get(url)

      if (response.status === 200) {
        const data = response.data

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
        })

        console.log('Weather data fetched')
      } else {
        console.log('Error: Unexpected status code', response.status)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const getCurrentCoordinates = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
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
      .then((coordinates) => {
        console.log('Latitude:', latitude)
        console.log('Longitude:', longitude)
        fetchWeather()
      })
      .catch((error) => {
        console.log('Error:', error)
        // Handle the error appropriately
      })
  }

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
          longitude={longitude}
          latitude={latitude}
          units={convertUnits[units].temp}
          speed={weatherData.speed}
          deg={weatherData.deg}
          temp={weatherData.temp}
          feels_like={weatherData.feels_like}
          temp_min={weatherData.temp_min}
          temp_max={weatherData.temp_max}
          country={weatherData.country}
          name={weatherData.name}
          icon={weatherData.icon}
          humidity={weatherData.humidity}
          pressure={weatherData.pressure}
          description={weatherData.description}
          sunrise={weatherData.sunrise}
          sunset={weatherData.sunset}
        />
      </WeatherWrapper>
    </MainContainer>
  )
}
export default App
