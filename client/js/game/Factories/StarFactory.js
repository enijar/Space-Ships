import Util from '../Util'
import Config from '../Config'

export default class StarFactory {
  constructor () {
    this.radius = 10;
    this.x = Util.rand(this.radius * 2, Config.map.width);
    this.y = Util.rand(this.radius * 2, Config.map.height);
  }
}
