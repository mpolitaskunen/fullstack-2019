import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
    // The variable for weather data
    const [ weather, setWeather ] = useState('')

    // Let's go get the weather!
    useEffect(() => {
        axios
            .get(`http://api.apixu.com/v1/current.json?key=fcf5e8f491964e0586a181240190406&q=${city}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    // If there is no weather coming in, just give an empty field..
    if ( !weather ) {
        return(
            <div></div>
        )
    }

    return(
        <div>
            <h2>Weather in {city}</h2>
            <p><strong>Temperature: </strong>{weather.current.temp_c} Celsius</p>
            <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
            <p><strong>Wind:</strong> {weather.current.wind_kph} kph, direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather