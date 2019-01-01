import Config from '../Config'
import BaseLayer from './BaseLayer'

export default class PlayerLayer extends BaseLayer {
  constructor (props = {}) {
    super(props);

    this.setSize(Config.player.width, Config.player.height);

    this.index = 1;
    this.x = (Config.width / 2) - (Config.player.width / 2);
    this.y = (Config.height / 2) - (Config.player.height / 2);
    this.speed = 4;
  }

  render () {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
