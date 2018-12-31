import BaseRenderer from './BaseRenderer'
import config from '../config'

export default class BackgroundRenderer extends BaseRenderer {
  constructor (props) {
    super(props);
    this.canvas.width = config.width;
    this.canvas.height = config.height;
  }

  update () {
    //
  }

  render () {
    this.ctx.clearRect(0, 0, config.width, config.height);
    this.ctx.fillStyle = '#111';
    this.ctx.fillRect(0, 0, config.width, config.height);
  }
}
