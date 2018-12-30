import config from './config'
import renderers from './renderers/index'

export default class Game {
  constructor (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.animationFrame = null;
  }

  start() {
    this.canvas.width = config.width;
    this.canvas.height = config.height;
    this.render();
  }

  stop() {
    this.animationFrame && cancelAnimationFrame(this.animationFrame);
  }

  render = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Sort, update and render layers
    const layers = renderers.sort((a, b) => a.layer - b.layer);
    for (let i = 0; i < layers.length; i++) {
      layers[i].update();
      layers[i].render();
      this.ctx.drawImage(layers[i].canvas, layers[i].x, layers[i].y, layers[i].width, layers[i].height);
    }

    this.animationFrame = requestAnimationFrame(this.render);
  };
}
