export default class BaseRenderer {
  constructor (width, height) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
    this.x = 0;
    this.y = 0;
    this.layer = 0;
  }

  update () {
    //
  }

  render () {
    //
  }
}
