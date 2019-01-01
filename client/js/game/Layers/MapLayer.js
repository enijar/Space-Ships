import Config from '../Config'
import BaseLayer from './BaseLayer'
import StarFactory from '../Factories/StarFactory'

const STAR_TOTAL = 100;

export default class MapLayer extends BaseLayer {
  constructor (props = {}) {
    super(props);
    this.setSize(Config.width, Config.height);
    this.stars = [];

    for (let i = 0; i < STAR_TOTAL; i++) {
      this.stars.push(new StarFactory());
    }
  }

  render () {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Background
    this.ctx.fillStyle = '#111';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Stars
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    for (let i = 0; i < this.stars.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(this.stars[i].x, this.stars[i].y, this.stars[i].radius, 0, 2 * Math.PI, false);
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
}
