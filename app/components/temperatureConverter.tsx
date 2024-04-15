const kelvinToCelsius = (kelvin: number) => {
  return kelvin - 273.15
}

const kelvinToFahrenheit = (kelvin: number) => {
  return ((kelvin - 273.15) * 9) / 5 + 32
}

export { kelvinToCelsius, kelvinToFahrenheit }
