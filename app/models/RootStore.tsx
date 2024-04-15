import { Instance, t } from 'mobx-state-tree'
import TemperatureUnitModel from './TemperatureUnitModel'
import ColorTheme from './ColorTheme'

export const RootStore = t
  .model('RootStore', {
    temperatureUnit: TemperatureUnitModel,
    colorTheme: ColorTheme,
  })
  .actions((store) => ({
    toggleUnit() {
      store.temperatureUnit.unit =
        store.temperatureUnit.unit === 'Celsius' ? 'Fahrenheit' : 'Celsius'
    },
    changeTheme(
      newColor:
        | 'Rain'
        | 'Sunny'
        | 'Cloudy'
        | 'Snow'
        | 'Bolt'
        | 'Shower'
        | 'Fog'
        | 'SunnyCloudy'
    ) {
      store.colorTheme.color = newColor
    },
  }))

export type RootStoreType = Instance<typeof RootStore>
let rootStore: RootStoreType
export const getRootStore = () => {
  if (!rootStore) {
    rootStore = RootStore.create({
      temperatureUnit: { unit: 'Celsius' },
      colorTheme: { color: 'Fog' },
    })
  }
  return rootStore
}
