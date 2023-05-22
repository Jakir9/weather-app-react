import React from 'react'

export default function Weather({
  sunset,
  weatherData,
  longitude,
  latitude,
  sunrise,
  units,
}) {
  return (
    <>
      <p> Sunrise: {sunrise}</p>
      <p>Sunset: {sunset} </p>

      <p>
        Temperature: {weatherData.temp} {units}
      </p>
      <p>
        Feels Like: {weatherData.feels_like} {units}
      </p>
      <p>Longitude: {longitude}</p>
      <p>Latitude: {latitude}</p>
    </>
  )
}

export { Weather }
