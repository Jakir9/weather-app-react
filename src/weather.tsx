import React from 'react'

interface WeatherProps {
  longitude: number
  latitude: number
  description: string
  temp: number
  feels_like: number
  speed: number
  deg: number
  sunrise: number
  sunset: number
  icon: string
  temp_min: number
  temp_max: number
  country: string
  name: string
  units: string
}

const makeIconUrl = (iconId: string) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`

const unixToTime = (unixTime: number) => {
  const dateObject = new Date(unixTime * 1000)
  var hours = dateObject.getHours()
  var minutes = '0' + dateObject.getMinutes()

  var humanDateFormat =
    hours + ':' + minutes.substring(-2) && hours > 12
      ? hours - 12 + ':' + minutes.substring(-2) + ' PM'
      : hours + ':' + minutes.substring(-2) + ' AM'

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
}) => {
  return (
    <>
      <h1>
        {name},{country}
      </h1>
      <p> Sunrise: {unixToTime(sunrise)}</p>
      <p>Sunset: {unixToTime(sunset)} </p>
      <p>
        Temp:{Math.round(temp)} {units}
      </p>
      <p>
        Feels Like:{Math.round(feels_like)}
        {units}
      </p>
      <p>
        Max Temp:{Math.round(temp_max)}
        {units}
      </p>
      <p>
        Min Temp:{Math.round(temp_min)}
        {units}
      </p>
      <p>Wind Speed:{speed}km/h</p>
      <p>Wind Direction:{deg}</p>
      <p>Longitude: {longitude}</p>
      <p>Latitude: {latitude}</p>
      <img src={makeIconUrl(icon)} alt="weather icon" />
      <p>{description}</p>
    </>
  )
}

export { Weather }
