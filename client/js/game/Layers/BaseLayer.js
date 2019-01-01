import Config from '../Config'

export default class BaseLayer {
  constructor (props = {}) {
    Object.assign(this, props);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.x = 0;
    this.y = 0;
    this.index = 0;
  }

  setSize (width, height) {
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
  }

  setPos (x, y) {
    this.x = x;
    this.y = y;
  }

  update () {
    //
  }

  render () {
    //
  }
}
