import { types } from 'mobx-state-tree'

const TemperatureUnit = types
  .model({
    unit: types.enumeration('TemperatureUnit', ['Celsius', 'Fahrenheit']),
  })
  .actions((self) => ({
    toggleUnit() {
      self.unit = self.unit === 'Celsius' ? 'Fahrenheit' : 'Celsius'
    },
  }))

export default TemperatureUnit
