import { types } from 'mobx-state-tree'

// const ColorTheme = types
//   .model({
//     color: types.enumeration('ColorTheme', [
//       'Rain',
//       'Sunny',
//       'Cloudy',
//       'Snow',
//       'Bolt',
//       'Shower',
//       'Fog',
//       'SunnyCloudy',
//     ]),
//   })
//   .actions((self) => ({
//     changeTheme(
//       newColor:
//         | 'Rain'
//         | 'Sunny'
//         | 'Cloudy'
//         | 'Snow'
//         | 'Bolt'
//         | 'Shower'
//         | 'Fog'
//         | 'SunnyCloudy'
//     ) {
//       self.color = newColor
//     },
//   }))

const ColorTheme = types.model('ColorTheme', {
  color: types.enumeration('ColorTheme', [
    'Rain',
    'Sunny',
    'Cloudy',
    'Snow',
    'Bolt',
    'Shower',
    'Fog',
    'SunnyCloudy',
  ]),
})

export default ColorTheme
