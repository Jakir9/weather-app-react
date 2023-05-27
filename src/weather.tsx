import React, { useState } from 'react'

interface WeatherProps {
  longitude: number
  latitude: number
  description: string
  temp: number
  feels_like?: number
  speed: number
  deg: number
  sunrise: number
  sunset: number
  icon: string
  temp_min?: number
  temp_max?: number
  country: string
  name: string
  units: string
  humidity: number
  pressure: number
  dt: number
}

const makeIconUrl = (iconId: string) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`

const unixToTime = (unixTime: number) => {
  const dateObject = new Date(unixTime * 1000)
  const hours = dateObject.getHours()
  const minutes = ('0' + dateObject.getMinutes()).slice(-2)

  const humanDateFormat =
    hours > 12
      ? hours - 12 + ':' + minutes + ' PM'
      : hours + ':' + minutes + ' AM'

  return humanDateFormat
}

const Weather: React.FC<WeatherProps> = ({
  longitude,
  latitude,
  description,
  temp,
  feels_like,
  speed,
  deg,
  sunrise,
  sunset,
  icon,
  temp_min,
  temp_max,
  country,
  name,
  units,
  humidity,
  pressure,
  dt,
}) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails)
  }

  return (
    <>
      <p>
        {name}, {country}
      </p>

      <img src={makeIconUrl(icon)} alt="weather icon" />

      <div
        className="weatherMainStats"
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ marginRight: '0.8rem' }}>
            Temp: {Math.round(temp)}°{units}
          </p>
          <p style={{ marginLeft: '0.8rem' }}>Humidity: {humidity}%</p>
        </div>

        <p>{description}</p>
      </div>
      <p>Last updated: {new Date(dt * 1000).toLocaleString('en-GB')}</p>
      {showDetails && (
        <>
          {feels_like && (
            <p>
              Feels Like: {Math.round(feels_like)}
              {units}
            </p>
          )}
          {temp_min && (
            <p>
              Min Temp: {Math.round(temp_min)}
              {units}
            </p>
          )}
          {temp_max && (
            <p>
              Max Temp: {Math.round(temp_max)}
              {units}
            </p>
          )}
          <p>Wind Speed: {speed} km/h</p>
          <p>Wind Direction: {deg}</p>
          <p>Longitude: {longitude}</p>
          <p>Latitude: {latitude}</p>
          <p>Pressure: {pressure} hPa</p>
          <p>Sunrise: {new Date(sunrise * 1000).toLocaleTimeString('en-GB')}</p>
          <p>Sunset: {new Date(sunset * 1000).toLocaleTimeString('en-GB')}</p>
        </>
      )}
      <button onClick={toggleDetails}>
        {showDetails ? 'Less Details' : 'More Details'}
      </button>
    </>
  )
}

export { Weather }
