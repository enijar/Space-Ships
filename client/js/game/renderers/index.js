import BackgroundRenderer from './BackgroundRenderer'
import PlayerRenderer from './PlayerRenderer'

export default [
  new BackgroundRenderer(),
  new PlayerRenderer({
    width: 100,
    height: 100,
  }),
]
