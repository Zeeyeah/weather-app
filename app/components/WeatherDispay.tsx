'use client'

import React, { useEffect } from 'react'
import WeatherIcon from './WeatherIcons'
import { observer, useLocalStore } from 'mobx-react-lite'
import { kelvinToCelsius, kelvinToFahrenheit } from './temperatureConverter'
import TemperatureUnit from '../models/TemperatureUnitModel'
import HourlyTemperatureGraph from './TempGraph'
import '@/styles/weather-display.css'
import { getRootStore } from '../models/RootStore'
interface WeatherDispayProps {
  coord: {
    lon: number
    lat: number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

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

const WeatherDispay = observer(
  ({
    weatherData,
    forecasteData,
  }: {
    weatherData: WeatherDispayProps
    forecasteData: ForecastProps
  }) => {
    const rootStore = getRootStore()
    const handleToggleUnit = () => {
      rootStore.toggleUnit()
    }
    useEffect(() => {
      switch (weatherData.weather[0].icon) {
        case '01d':
          rootStore.changeTheme('Sunny')
          break
        case '02d':
          rootStore.changeTheme('SunnyCloudy')
          break
        case '03d':
        case '03n':
        case '04d':
        case '04n':
          rootStore.changeTheme('Cloudy')
          break
        case '09d':
        case '09n':
          rootStore.changeTheme('Shower')
          break
        case '10d':
        case '10n':
          rootStore.changeTheme('Rain')
          break
        case '11d':
        case '11n':
          rootStore.changeTheme('Bolt')
          break
        case '13d':
        case '13n':
          rootStore.changeTheme('Snow')
          break
        case '50d':
        case '50n':
          rootStore.changeTheme('Fog')
          break
        default:
          rootStore.changeTheme('Sunny')
          break
      }
    }, [])

    const today = new Date()

    const unitLabel = rootStore.temperatureUnit.unit === 'Celsius' ? '°C' : '°F'

    return (
      <div className="grid md:grid-cols-2 gap-3 h-[max-content]">
        <div className="flex flex-col justify-between h-[100%]">
          <div>
            <h1 className="text-[30px] h-[30px] mb-3">
              {weatherData.name}, {weatherData.sys.country}
            </h1>
            <p className="opacity-70">
              {today.toLocaleString('en-us', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </p>
          </div>
          <div className="grid grid-cols-2 between gap-8 mb-5 md:min-w-[400px]">
            <div>
              <h1 className="text-[60px] h-[64px] mt-6 mb-2">
                {rootStore.temperatureUnit.unit === 'Celsius'
                  ? Math.floor(kelvinToCelsius(weatherData.main.temp))
                  : Math.floor(kelvinToFahrenheit(weatherData.main.temp))}{' '}
                <span
                  className={`text-3xl cursor-pointer ${
                    unitLabel === '°C' ? '' : 'opacity-50'
                  }`}
                  onClick={rootStore.toggleUnit}
                >
                  °C
                </span>
                <span className="text-4xl font-light">{' | '}</span>
                <span
                  className={`text-3xl cursor-pointer ${
                    unitLabel === '°F' ? '' : 'opacity-50'
                  }`}
                  onClick={handleToggleUnit}
                >
                  °F
                </span>
              </h1>
            </div>
            <div>
              <div className="flex weather-icon flex-col justify-center items-center gap-2 ">
                <WeatherIcon weatherCode={weatherData.weather[0].icon} />
                <p className="capitalize text-[14px] w-[100px] text-center opacity-70">
                  {weatherData.weather[0].description}
                </p>
              </div>
            </div>
          </div>
          <div className="blury-card-wrapper">
            <div className="w-[100%] blury-card h-[100%] p-4 grid grid-cols-3 gap-3">
              <div className="flex gap-2 items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[25px] h-[25px]"
                >
                  <path
                    d="M2 6L8 6C8.55228 6 9 5.55229 9 5C9 4.44771 8.55228 4 8 4C7.56537 4 7.19429 4.27755 7.05677 4.66662C6.96475 4.92698 6.67909 5.06344 6.41873 4.97142C6.15837 4.8794 6.02191 4.59373 6.11393 4.33338C6.38825 3.55726 7.12841 3 8 3C9.10457 3 10 3.89543 10 5C10 6.10457 9.10457 7 8 7L2 7C1.72386 7 1.5 6.77614 1.5 6.5C1.5 6.22386 1.72386 6 2 6Z"
                    fill="white"
                  />
                  <path
                    d="M11.0788 5.37537C11.3563 4.29721 12.3344 3.5 13.5 3.5C14.8807 3.5 16 4.61929 16 6C16 7.39728 14.7593 8.5 13.5 8.5H0.5C0.223858 8.5 0 8.27614 0 8C0 7.72386 0.223858 7.5 0.5 7.5H13.5C14.2407 7.5 15 6.81186 15 6C15 5.17157 14.3284 4.5 13.5 4.5C12.8017 4.5 12.2138 4.97756 12.0472 5.62463C11.9784 5.89206 11.7058 6.05305 11.4384 5.98422C11.171 5.91539 11.01 5.6428 11.0788 5.37537Z"
                    fill="white"
                  />
                  <path
                    d="M2.5 9.5C2.5 9.22386 2.72386 9 3 9L11 9C12.1046 9 13 9.89543 13 11C13 12.1046 12.1046 13 11 13C10.1284 13 9.38825 12.4427 9.11393 11.6666C9.02191 11.4063 9.15837 11.1206 9.41873 11.0286C9.67909 10.9366 9.96475 11.073 10.0568 11.3334C10.1943 11.7224 10.5654 12 11 12C11.5523 12 12 11.5523 12 11C12 10.4477 11.5523 10 11 10L3 10C2.72386 10 2.5 9.77614 2.5 9.5Z"
                    fill="white"
                  />
                </svg>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[18px] h-[20px] ">
                    {weatherData.wind.speed}
                  </h2>
                  <p className="text-[10px] opacity-80">Wind Speed</p>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[25px] h-[25px]"
                >
                  <path
                    d="M0.292893 10.7071C0.105357 10.5196 0 10.2652 0 10C0 9.5 0.555422 8.60499 1 8C1.44458 8.60499 2 9.5 2 10C2 10.2652 1.89464 10.5196 1.70711 10.7071C1.51957 10.8946 1.26522 11 1 11C0.734784 11 0.48043 10.8946 0.292893 10.7071Z"
                    fill="white"
                  />
                  <path
                    d="M3.29289 13.7071C3.10536 13.5196 3 13.2652 3 13C3 12.5 3.55542 11.605 4 11C4.44458 11.605 5 12.5 5 13C5 13.2652 4.89464 13.5196 4.70711 13.7071C4.51957 13.8946 4.26522 14 4 14C3.73478 14 3.48043 13.8946 3.29289 13.7071Z"
                    fill="white"
                  />
                  <path
                    d="M7 15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15C9 14.5 8.44458 13.605 8 13C7.55542 13.605 7 14.5 7 15Z"
                    fill="white"
                  />
                  <path
                    d="M11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.5 11.5554 11.605 12 11C12.4446 11.605 13 12.5 13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071Z"
                    fill="white"
                  />
                  <path
                    d="M14 10C14 10.2652 14.1054 10.5196 14.2929 10.7071C14.4804 10.8946 14.7348 11 15 11C15.2652 11 15.5196 10.8946 15.7071 10.7071C15.8946 10.5196 16 10.2652 16 10C16 9.5 15.4446 8.60499 15 8C14.5554 8.60499 14 9.5 14 10Z"
                    fill="white"
                  />
                  <path
                    d="M8.5 4.5C8.5 4.22386 8.27614 4 8 4C7.72386 4 7.5 4.22386 7.5 4.5V6.8C7.5 7.1866 7.8134 7.5 8.2 7.5H10.5C10.7761 7.5 11 7.27614 11 7C11 6.72386 10.7761 6.5 10.5 6.5H8.5V4.5Z"
                    fill="white"
                  />
                  <path
                    d="M7.1 0C6.76863 0 6.5 0.268629 6.5 0.6C6.5 0.931371 6.76863 1.2 7.1 1.2H7.40002V2.03563C4.92148 2.33203 3 4.44162 3 7C3 9.76143 5.23858 12 8 12C10.7614 12 13 9.76143 13 7C13 5.76328 12.551 4.63144 11.8071 3.75858L12 3.56569L12.2172 3.78285C12.3734 3.93906 12.6266 3.93906 12.7828 3.78285C12.9391 3.62664 12.9391 3.37337 12.7828 3.21716L11.7828 2.21716C11.6266 2.06095 11.3734 2.06095 11.2172 2.21716C11.061 2.37337 11.061 2.62664 11.2172 2.78285L11.4343 3.00001L11.2414 3.19289C10.5119 2.57115 9.60143 2.1554 8.60002 2.03563V1.2H8.9C9.23137 1.2 9.5 0.931371 9.5 0.6C9.5 0.268629 9.23137 0 8.9 0H7.1ZM11.8 7C11.8 9.09868 10.0987 10.8 8 10.8C5.90132 10.8 4.2 9.09868 4.2 7C4.2 4.90132 5.90132 3.2 8 3.2C10.0987 3.2 11.8 4.90132 11.8 7Z"
                    fill="white"
                  />
                </svg>

                <div className="flex flex-col gap-1">
                  <h2 className="text-[18px] h-[20px]">
                    {weatherData.main.pressure}
                  </h2>
                  <p className="text-[10px] opacity-80">Pressure</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[25px] h-[25px]"
                >
                  <path
                    d="M3.00076 10.7594C2.31698 10.6299 1.66416 10.4071 0.861325 10.0545C0.562999 9.92344 0.20422 10.0369 0.0599698 10.3079C-0.0842801 10.5789 0.0406234 10.9048 0.33895 11.0359C1.37322 11.4901 2.21117 11.7558 3.13319 11.8895C3.3446 12.8467 3.80198 13.7313 4.46447 14.4379C5.40215 15.4381 6.67392 16 8 16C9.32608 16 10.5979 15.4381 11.5355 14.4379C12.4732 13.4377 13 12.0812 13 10.6667C13 8.24129 10.7027 4.07318 8.61455 0.911148C8.40681 0.596572 8.20113 0.291954 8 0C7.79887 0.291954 7.59319 0.596572 7.38545 0.911148C6.57052 2.14516 5.72374 3.53241 4.99409 4.9095C3.34695 4.92092 2.3685 4.71649 0.861325 4.05448C0.562999 3.92344 0.20422 4.0369 0.0599698 4.3079C-0.0842801 4.5789 0.0406234 4.90482 0.33895 5.03585C1.83506 5.693 2.92038 5.95552 4.44359 5.99471C4.13593 6.63131 3.86252 7.25623 3.63865 7.85275C2.70037 7.75349 1.90846 7.51442 0.861325 7.05448C0.562999 6.92344 0.20422 7.0369 0.0599698 7.3079C-0.0842801 7.5789 0.0406234 7.90482 0.33895 8.03585C1.43051 8.51531 2.3034 8.7847 3.28723 8.91055C3.10376 9.55704 3 10.1512 3 10.6667C3 10.6976 3.00025 10.7285 3.00076 10.7594ZM4.00519 10.884C4.00174 10.8118 4 10.7393 4 10.6667C4 10.2379 4.10102 9.67478 4.31221 8.99074C4.5644 8.99954 4.82831 9.00188 5.10797 8.99856C6.35655 8.98376 7.10093 8.87106 8.28731 8.51721C8.60215 8.4233 8.77357 8.11533 8.6702 7.82934C8.56682 7.54334 8.2278 7.38762 7.91296 7.48152C6.84242 7.80083 6.21899 7.89522 5.09231 7.90857C4.95688 7.91018 4.82599 7.9104 4.69899 7.90911C4.93565 7.31807 5.22293 6.69217 5.54732 6.04815C5.55754 6.02786 5.56779 6.00757 5.57808 5.98726C6.5607 5.94982 7.25748 5.82437 8.28731 5.51721C8.60215 5.4233 8.77357 5.11533 8.6702 4.82934C8.56682 4.54334 8.2278 4.38762 7.91296 4.48152C7.23632 4.68334 6.73829 4.79531 6.17891 4.85375C6.7504 3.81914 7.37973 2.78803 8 1.83503C8.85949 3.15559 9.73641 4.62612 10.4527 6.04815C10.9243 6.98438 11.3174 7.88233 11.5906 8.69056C11.8681 9.51134 12 10.1767 12 10.6667C12 11.7983 11.5786 12.8835 10.8284 13.6837C10.0783 14.4838 9.06087 14.9333 8 14.9333C6.93913 14.9333 5.92172 14.4838 5.17157 13.6837C4.72128 13.2033 4.38944 12.6203 4.19609 11.9862C4.4832 11.9987 4.78509 12.0024 5.10797 11.9986C6.35655 11.9838 7.10093 11.8711 8.28731 11.5172C8.60215 11.4233 8.77357 11.1153 8.6702 10.8293C8.56682 10.5433 8.2278 10.3876 7.91296 10.4815C6.84242 10.8008 6.21899 10.8952 5.09231 10.9086C4.69651 10.9133 4.33941 10.9062 4.00519 10.884Z"
                    fill="white"
                  />
                  <path
                    d="M11.0516 4.99594C12.7267 4.97096 13.7334 5.08615 15.4269 5.48447C15.6806 5.54413 15.9321 5.37559 15.9886 5.10803C16.0452 4.84046 15.8854 4.57519 15.6318 4.51553C13.7924 4.08292 12.6982 3.9675 10.8141 4.00736C10.7137 4.00949 10.6153 4.01325 10.5189 4.0185C10.7019 4.34363 10.8801 4.67017 11.0516 4.99594Z"
                    fill="white"
                  />
                  <path
                    d="M12.4215 8.01548C13.3961 8.06615 14.2439 8.20623 15.4269 8.48447C15.6806 8.54413 15.9321 8.37559 15.9886 8.10803C16.0452 7.84046 15.8854 7.57519 15.6318 7.51553C14.2202 7.18352 13.2474 7.03834 12.0197 7.00678C12.1676 7.35033 12.3024 7.68751 12.4215 8.01548Z"
                    fill="white"
                  />
                  <path
                    d="M15.4269 11.4845C14.4772 11.2611 13.7434 11.1268 12.9867 11.0562C12.9955 10.927 13 10.7971 13 10.6667C13 10.4741 12.9855 10.2706 12.9578 10.0574C13.7956 10.1287 14.5954 10.2718 15.6318 10.5155C15.8854 10.5752 16.0452 10.8405 15.9886 11.108C15.9321 11.3756 15.6806 11.5441 15.4269 11.4845Z"
                    fill="white"
                  />
                </svg>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[18px] h-[20px]">
                    {weatherData.main.humidity}%
                  </h2>
                  <p className="text-[10px] opacity-80">Humidity</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[25px] h-[25px]"
                >
                  <path
                    d="M3 2C2.66863 2 2.4 2.26863 2.4 2.6V4.40002H0.6C0.268629 4.40002 0 4.66865 0 5.00002C0 5.3314 0.26863 5.60002 0.600001 5.60002H2.4V7.4C2.4 7.73137 2.66863 8 3 8C3.33137 8 3.6 7.73137 3.6 7.4V5.60002H5.4C5.73137 5.60002 6 5.3314 6 5.00002C6 4.66865 5.73137 4.40002 5.4 4.40002H3.6V2.6C3.6 2.26863 3.33137 2 3 2Z"
                    fill="white"
                  />
                  <path
                    d="M11.5 3C11.2239 3 11 3.22386 11 3.5V9.56301C10.1374 9.78503 9.5 10.5681 9.5 11.5C9.5 12.6046 10.3954 13.5 11.5 13.5C12.6046 13.5 13.5 12.6046 13.5 11.5C13.5 10.5681 12.8626 9.78503 12 9.56301V3.5C12 3.22386 11.7761 3 11.5 3Z"
                    fill="white"
                  />
                  <path
                    d="M10.2 8.39855L9.66751 8.75498C8.7801 9.349 8.2 10.357 8.2 11.5C8.2 13.3225 9.67746 14.8 11.5 14.8C13.3225 14.8 14.8 13.3225 14.8 11.5C14.8 10.357 14.2199 9.349 13.3325 8.75498L12.8 8.39855V2.5C12.8 1.78203 12.218 1.2 11.5 1.2C10.782 1.2 10.2 1.78203 10.2 2.5V8.39855ZM9 2.5C9 1.11929 10.1193 0 11.5 0C12.8807 0 14 1.11929 14 2.5V7.75777C15.206 8.56504 16 9.93979 16 11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5C7 9.93979 7.79401 8.56504 9 7.75777V2.5Z"
                    fill="white"
                  />
                </svg>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[18px] h-[20px] ">
                    {rootStore.temperatureUnit.unit === 'Celsius'
                      ? Math.floor(kelvinToCelsius(weatherData.main.temp_max))
                      : Math.floor(
                          kelvinToFahrenheit(weatherData.main.temp_max)
                        )}{' '}
                    {unitLabel}
                  </h2>
                  <p className="text-[10px] opacity-80">Max Temp</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[25px] h-[25px]"
                >
                  <rect y="4.5" width="6" height="1.2" rx="0.6" fill="white" />
                  <path
                    d="M11.5 7C11.2239 7 11 7.22386 11 7.5V9.56301C10.1374 9.78503 9.5 10.5681 9.5 11.5C9.5 12.6046 10.3954 13.5 11.5 13.5C12.6046 13.5 13.5 12.6046 13.5 11.5C13.5 10.5681 12.8626 9.78503 12 9.56301V7.5C12 7.22386 11.7761 7 11.5 7Z"
                    fill="white"
                  />
                  <path
                    d="M10.2 8.39855L9.66751 8.75498C8.7801 9.349 8.2 10.357 8.2 11.5C8.2 13.3225 9.67746 14.8 11.5 14.8C13.3225 14.8 14.8 13.3225 14.8 11.5C14.8 10.357 14.2199 9.349 13.3325 8.75498L12.8 8.39855V2.5C12.8 1.78203 12.218 1.2 11.5 1.2C10.782 1.2 10.2 1.78203 10.2 2.5V8.39855ZM9 2.5C9 1.11929 10.1193 0 11.5 0C12.8807 0 14 1.11929 14 2.5V7.75777C15.206 8.56504 16 9.93979 16 11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5C7 9.93979 7.79401 8.56504 9 7.75777V2.5Z"
                    fill="white"
                  />
                </svg>

                <div className="flex flex-col gap-1">
                  <h2 className="text-[18px] h-[20px] ">
                    {rootStore.temperatureUnit.unit === 'Celsius'
                      ? Math.floor(kelvinToCelsius(weatherData.main.temp_min))
                      : Math.floor(
                          kelvinToFahrenheit(weatherData.main.temp_min)
                        )}{' '}
                    {unitLabel}
                  </h2>
                  <p className="text-[10px] opacity-80">Min temp</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[25px] h-[25px]"
                >
                  <path
                    d="M8.5 7C8.22386 7 8 7.22386 8 7.5V9.56301C7.13739 9.78503 6.5 10.5681 6.5 11.5C6.5 12.6046 7.39543 13.5 8.5 13.5C9.60457 13.5 10.5 12.6046 10.5 11.5C10.5 10.5681 9.86261 9.78503 9 9.56301V7.5C9 7.22386 8.77614 7 8.5 7Z"
                    fill="white"
                  />
                  <path
                    d="M7.2 8.39855L6.66751 8.75498C5.7801 9.349 5.2 10.357 5.2 11.5C5.2 13.3225 6.67746 14.8 8.5 14.8C10.3225 14.8 11.8 13.3225 11.8 11.5C11.8 10.357 11.2199 9.349 10.3325 8.75498L9.8 8.39855V2.5C9.8 1.78203 9.21797 1.2 8.5 1.2C7.78203 1.2 7.2 1.78203 7.2 2.5V8.39855ZM6 2.5C6 1.11929 7.11929 0 8.5 0C9.88071 0 11 1.11929 11 2.5V7.75777C12.206 8.56504 13 9.93979 13 11.5C13 13.9853 10.9853 16 8.5 16C6.01472 16 4 13.9853 4 11.5C4 9.93979 4.79401 8.56504 6 7.75777V2.5Z"
                    fill="white"
                  />
                </svg>

                <div className="flex flex-col gap-1">
                  <h2 className="text-[18px] h-[20px] ">
                    {rootStore.temperatureUnit.unit === 'Celsius'
                      ? Math.floor(kelvinToCelsius(weatherData.main.feels_like))
                      : Math.floor(
                          kelvinToFahrenheit(weatherData.main.feels_like)
                        )}{' '}
                    {unitLabel}
                  </h2>
                  <p className="text-[10px] opacity-80">Feels Like</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blury-card-wrapper w-[100%]">
          <div className="blury-card h-[100%] w-[100%] p-2 flex flex-col justify-between">
            <h1 className="text-[24px] font-[500]">Hourly Forecast</h1>
            <HourlyTemperatureGraph
              data={forecasteData.list.filter((item) => {
                const itemDate = new Date(item.dt_txt).toLocaleDateString()
                return itemDate === today.toLocaleDateString()
              })}
            />
            {/* <pre>
              {JSON.stringify(
                forecasteData.list.filter((item) => {
                  const itemDate = new Date(item.dt_txt).toLocaleDateString()
                  return itemDate === today.toLocaleDateString()
                }),
                null,
                2
              )}
            </pre> */}
          </div>
        </div>
      </div>
    )
  }
)

export default WeatherDispay
