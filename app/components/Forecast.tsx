'use client'
import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { kelvinToCelsius, kelvinToFahrenheit } from './temperatureConverter'
import WeatherIcon from './WeatherIcons'
import '@/styles/weather-display.css'
import { getRootStore } from '../models/RootStore'

interface ForecastProps {
  cod: string
  message: number
  cnt: number
  list: [
    {
      dt: number
      main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        sea_level: number
        grnd_level: number
        humidity: number
        temp_kf: number
      }
      weather: [
        {
          id: number
          main: string
          description: string
          icon: string
        }
      ]
      clouds: {
        all: number
      }
      wind: {
        speed: number
        deg: number
        gust: number
      }
      visibility: number
      pop: number
      sys: {
        pod: string
      }
      dt_txt: string
    }
  ]
}
const Forecast = observer(
  ({ forecastData }: { forecastData: ForecastProps }) => {
    const rootStore = getRootStore()

    const uniqueDates = [
      ...new Set(
        forecastData.list.map((item) =>
          new Date(item.dt_txt).toLocaleDateString()
        )
      ),
    ]

    const todayWeather = uniqueDates.map((date) => {
      const itemsForDate = forecastData.list.filter(
        (item) => new Date(item.dt_txt).toLocaleDateString() === date
      )
      return itemsForDate[0] // Select the first item for each date
    })
    return (
      <div className="grid grid-cols-auto-fit-200 gap-3">
        {todayWeather.map((item: any, index: any) => (
          <div className="blury-card-wrapper circle" key={index}>
            <div className="blury-card flex justify-between w-[100%] h-[100%] p-3">
              <div className=" ">
                <h1 className="text-2xl">
                  {rootStore.temperatureUnit.unit === 'Celsius'
                    ? Math.floor(kelvinToCelsius(item.main.temp))
                    : Math.floor(kelvinToFahrenheit(item.main.temp))}{' '}
                  {rootStore.temperatureUnit.unit === 'Celsius' ? '°C' : '°F'}
                </h1>
                <p className="opacity-70">
                  {new Date(item.dt_txt).toLocaleString('en-us', {
                    weekday: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="weather-icon-small flex flex-col justify-center gap-1 items-center">
                <WeatherIcon weatherCode={item.weather[0].icon} />
                <p className="capitalize text-[10px]">
                  {item.weather[0].description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
)

export default Forecast
