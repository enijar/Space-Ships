import BaseRenderer from './BaseRenderer'

export default class PlayerRenderer extends BaseRenderer {
  constructor (props) {
    super(props);
    this.canvas.width = this.width = props.width;
    this.canvas.height = this.height = props.height;
    this.velocity = 5;
  }

  update () {
    // Up
    if (this.keys.active(['w'])) {
      this.y -= this.velocity;
    }

    // Right
    if (this.keys.active(['d'])) {
      this.x += this.velocity;
    }

    // Down
    if (this.keys.active(['s'])) {
      this.y += this.velocity;
    }

    // Left
    if (this.keys.active(['a'])) {
      this.x -= this.velocity;
    }
  }

  render () {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
