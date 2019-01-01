import Config from '../Config'
import BaseLayer from './BaseLayer'
import StarFactory from '../Factories/StarFactory'

const STAR_TOTAL = 600;

export default class MapLayer extends BaseLayer {
  constructor (props = {}) {
    super(props);

    this.setSize(Config.map.width, Config.map.height);

    this.stars = [];

    for (let i = 0; i < STAR_TOTAL; i++) {
      this.stars.push(new StarFactory());
    }
  }

  update () {
    const player = this.game.layerManager.get('player');

    if (this.game.controlsManager.keyPressed('a')) {
      this.x += player.speed;
    }
    if (this.game.controlsManager.keyPressed('d')) {
      this.x -= player.speed;
    }
    if (this.game.controlsManager.keyPressed('w')) {
      this.y += player.speed;
    }
    if (this.game.controlsManager.keyPressed('s')) {
      this.y -= player.speed;
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
