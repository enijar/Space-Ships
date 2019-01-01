import Config from '../Config'
import BaseManager from './BaseManager'

export default class LayerManager extends BaseManager {
  constructor (game) {
    super(game);
    this.layers = [];
  }

  destroy () {
    for (let i = 0; i < this.layers.length; i++) {
      if (this.layers[i].id === id) {
        this.layers.splice(i, 1);
      }
    }
  }

  add (id, layer) {
    layer.id = id;
    this.layers.push(layer);
  }

  get (id) {
    for (let i = 0; i < this.layers.length; i++) {
      if (this.layers[i].id === id) {
        return this.layers[i];
      }
    }
    return null;
  }

  remove (id) {
    for (let i = 0; i < this.layers.length; i++) {
      if (this.layers[i].id === id) {
        this.layers.splice(i, 1);
        break;
      }
    }
  }

  render () {
    this.layers.sort((a, b) => b.index - a.index);

    for (let i = this.layers.length - 1; i >= 0; i--) {
      this.layers[i].update();
      this.layers[i].render();
      this.game.ctx.drawImage(
        this.layers[i].canvas,
        this.layers[i].x,
        this.layers[i].y,
        this.layers[i].width,
        this.layers[i].height,
      );
    }
  }
}
