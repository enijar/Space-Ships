import config from './config'
import renderers from './renderers/index'

export default class Game {
  constructor (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.animationFrame = null;
    this.keys = {
      pressed: [],
      active (keys) {
        for (let i = keys.length - 1; i >= 0; i--) {
          if (this.pressed.includes(keys[i])) {
            return true;
          }
        }
        return false;
      }
    };
  }

  start () {
    this.canvas.width = config.width;
    this.canvas.height = config.height;
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    this.render();
  }

  stop () {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    this.animationFrame && cancelAnimationFrame(this.animationFrame);
  }

  handleKeyDown = event => {
    if (!this.keys.pressed.includes(event.key)) {
      this.keys.pressed.push(event.key);
    }
  };

  handleKeyUp = event => {
    const index = this.keys.pressed.indexOf(event.key);
    if (index > -1) {
      this.keys.pressed.splice(index, 1);
    }
  };

  render = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Sort, update and render layers
    const layers = renderers.sort((a, b) => a.layer - b.layer);
    for (let i = 0; i < layers.length; i++) {
      layers[i].keys = this.keys;
      layers[i].update();
      layers[i].render();
      this.ctx.drawImage(layers[i].canvas, layers[i].x, layers[i].y, layers[i].width, layers[i].height);
    }

    this.animationFrame = requestAnimationFrame(this.render);
  };
}
