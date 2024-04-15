import React, { useEffect, useRef } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { kelvinToCelsius, kelvinToFahrenheit } from './temperatureConverter'
import TemperatureUnit from '../models/TemperatureUnitModel'
import Chart from 'chart.js/auto'
import '@/styles/temp-chart.css'
import '@/styles/weather-display.css'
interface WeatherData {
  dt: number
  main: {
    temp: number
  }
}

interface HourlyTemperatureGraphProps {
  data: WeatherData[]
}

const HourlyTemperatureGraph: React.FC<HourlyTemperatureGraphProps> = observer(
  ({ data }) => {
    const chartRef = useRef<Chart<'line'> | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const store = useLocalStore(() => ({
      temperatureUnit: TemperatureUnit.create({ unit: 'Celsius' }),
    }))

    useEffect(() => {
      Chart.defaults.color = 'rgba(255, 255, 255, .8)'

      if (data && data.length > 0) {
        const temperatures = data.map((entry) =>
          kelvinToCelsius(entry.main.temp)
        )
        const timestamps = data.map((entry) =>
          new Date(entry.dt * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        )

        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          if (ctx && chartRef.current) {
            chartRef.current.destroy()
          }
          if (ctx) {
            chartRef.current = new Chart(ctx, {
              type: 'line',
              data: {
                labels: timestamps,
                datasets: [
                  {
                    label: 'Temperature (°C)',
                    data: temperatures,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderColor: 'white',
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: false,
                  },
                },
              },
            })
          }
        }
      }
    }, [data])

    return <canvas ref={canvasRef} id="temperatureChart"></canvas>
  }
)

export default HourlyTemperatureGraph
