export default class BaseRenderer {
  constructor ({width, height} = {}) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.width = width || 0;
    this.canvas.height = this.height = height || 0;
    this.x = 0;
    this.y = 0;
    this.layer = 0;
    this.keys = {};
  }

  update () {
    //
  }

  render () {
    //
  }
}
