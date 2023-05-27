import React, { useState } from 'react'

interface SearchProps {
  setWeatherData: (weatherData: any) => void
}

function Search({ setWeatherData }: SearchProps) {
  // Define the type for the weather data
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

  // State variables
  const [searchLocation, setSearchLocation] = useState<string>('')
  const [error, setError] = useState<string>('')

  // Constants
  const units = 'metric'
  const apiKey = process.env.REACT_APP_API_KEY

  // Function to handle the search button click
  function handleClick() {
    // Check if the search location is empty
    if (searchLocation.trim() === '') {
      setError('Please enter a location')
      setWeatherData(null)
      //clear the search box
      return
    }

    // Fetch weather data from the API
    fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=${apiKey}&units=${units}`
      `http://localhost:3000/weather`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          // Extract the required data from the API response
          const {
            weather,
            main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
            wind: { speed, deg },
            sys: { country, sunrise, sunset },
            name,
            coord: { lat, lon },
          } = data

          const { description, icon } = weather[0]

          // Create the weather data object
          const weatherData: WeatherDataProps = {
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
            latitude: lat,
            longitude: lon,
            units,
          }

          // Set the weather data in the parent component
          setWeatherData(weatherData)

          // Clear the error message
          setError('')
          //clear the search box
          setSearchLocation('')
        } else {
          // Display the error message from the API response
          setError(data.message)
          setWeatherData(null)
        }
      })
      .catch((error) => {
        console.log('Error:', error)
        setError('An error occurred while fetching the weather data')
        setWeatherData(null)
      })
  }

  return (
    <div className="searchDiv">
      <input
        type="text"
        placeholder="Search"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        style={{ margin: '0.5rem' }}
      />
      <button onClick={handleClick}>Search</button>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Search
