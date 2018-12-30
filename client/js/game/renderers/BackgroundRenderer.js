import BaseRenderer from './BaseRenderer'
import config from '../config'

export default class BackgroundRenderer extends BaseRenderer {
  constructor (props) {
    super(props);
    this.width = config.width;
    this.height = config.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  update () {
    //
  }

  render () {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#111';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
