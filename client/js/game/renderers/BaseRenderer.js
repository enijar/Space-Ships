import config from '../config'

export default class BaseRenderer {
  constructor () {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.x = 0;
    this.y = 0;
    this.width = config.width;
    this.height = config.height;
    this.layer = 0;
    this.keys = {};
  }

  init() {
    //
  }

  destroy() {
    //
  }

  update () {
    //
  }

  render () {
    //
  }
}
