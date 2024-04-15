import { use } from 'react'
import WeatherDispay from './components/WeatherDispay'
import Forecast from './components/Forecast'

async function getDefaultCity() {
  const res = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=5837425b9439a9975bb4b70b5deed236',
    {
      cache: 'force-cache',
    }
  )
  return await res.json()
}
async function getForecast() {
  const res = await fetch(
    'https://api.openweathermap.org/data/2.5/forecast?q=Hyderabad&appid=5837425b9439a9975bb4b70b5deed236',
    {
      cache: 'force-cache',
    }
  )
  return await res.json()
}

export default function Home() {
  const defaultCity = use(getDefaultCity())
  const forecast = use(getForecast())

  return (
    <main className=" lg:h-screen lg:min-h-[500px] flex flex-col gap-3 p-5 lg:p-10 lg:pr-0 justify-items-start">
      <WeatherDispay weatherData={defaultCity} forecasteData={forecast} />
      <h1 className="text-2xl mt-3">6 Days Forecast</h1>
      <Forecast forecastData={forecast} />
      {/* <div className="blury-card-wrapper">
        <div className="blury-card w-[100%] h-[100%]"></div>
      </div> */}
    </main>
  )
}
