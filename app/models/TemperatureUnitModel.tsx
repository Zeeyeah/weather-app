import { t } from 'mobx-state-tree'

const TemperatureUnitModel = t.model('TemperatureUnit', {
  unit: t.enumeration('TemperatureUnit', ['Celsius', 'Fahrenheit']),
})

TemperatureUnitModel.actions((self) => ({
  toggleUnit() {
    self.unit = self.unit === 'Celsius' ? 'Fahrenheit' : 'Celsius'
  },
}))

export default TemperatureUnitModel
