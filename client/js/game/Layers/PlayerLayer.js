import Config from '../Config'
import BaseLayer from './BaseLayer'

export default class PlayerLayer extends BaseLayer {
  constructor (props = {}) {
    super(props);

    this.index = 1;
    this.x = (Config.width / 2) - (Config.player.width / 2);
    this.y = (Config.height / 2) - (Config.player.height / 2);
    this.speed = 4;

    this.setSize(Config.player.width, Config.player.height);
  }

  update () {
    const map = this.game.layerManager.get('map');

    if (this.game.controlsManager.keyPressed('a')) {
      map.x += this.speed;
    }
    if (this.game.controlsManager.keyPressed('d')) {
      map.x -= this.speed;
    }
    if (this.game.controlsManager.keyPressed('w')) {
      map.y += this.speed;
    }
    if (this.game.controlsManager.keyPressed('s')) {
      map.y -= this.speed;
    }
  }

  render () {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
