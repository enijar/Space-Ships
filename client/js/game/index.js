import Config from './Config'
import LayerManager from './Managers/LayerManager'
import ControlsManager from './Managers/ControlsManager'
import MapLayer from './Layers/MapLayer'
import PlayerLayer from './Layers/PlayerLayer'

export default class Game {
  constructor (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.width = Config.width;
    this.canvas.height = Config.height;
    this.animationFrame = null;
    this.layerManager = new LayerManager(this);
    this.controlsManager = new ControlsManager(this);
  }

  start () {
    const props = {game: this};
    this.layerManager.add('map', new MapLayer(props));
    this.layerManager.add('player', new PlayerLayer(props));
    this.render();
  }

  stop () {
    this.animationFrame && cancelAnimationFrame(this.animationFrame);
    this.layerManager.destroy();
    this.controlsManager.destroy();
  }

  render = () => {
    this.animationFrame = requestAnimationFrame(this.render);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.layerManager.render();
  };
}
