import Forecast from '@/app/components/Forecast'
import WeatherDispay from '@/app/components/WeatherDispay'
import { use } from 'react'

async function getCity(cityName: any) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5837425b9439a9975bb4b70b5deed236`,
    {
      cache: 'force-cache',
    }
  )
  return await res.json()
}
async function getForecast(cityName: any) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=5837425b9439a9975bb4b70b5deed236`,
      {
        cache: 'force-cache',
      }
    )
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

const page = ({ params }: { params: { city: string } }) => {
  const city = use(getCity(params.city))
  const forecast = use(getForecast(params.city))

  console.log(forecast)

  return (
    <main className=" lg:h-screen lg:min-h-[500px] flex flex-col gap-3 p-10 lg:pr-0 justify-items-start">
      <WeatherDispay weatherData={city} forecasteData={forecast} />
      <h1 className="text-2xl mt-3">6 Days Forecast</h1>
      <Forecast forecastData={forecast} />
      {/* <div className="blury-card-wrapper">
        <div className="blury-card w-[100%] h-[100%]"></div>
      </div> */}
    </main>
  )
}

export default page
