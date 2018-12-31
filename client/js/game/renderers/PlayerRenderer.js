import BaseRenderer from './BaseRenderer'
import config from '../config'
import socket from '../../app/socket'
import state from '../state/index'

const SIZE = 100;
const FONT_SIZE = 20;

export default class PlayerRenderer extends BaseRenderer {
  constructor (props) {
    super(props);
    this.canvas.width = config.width;
    this.canvas.height = config.height;
  }

  init () {
    socket.on('player.moved', this.handlePlayerMove);
  }

  destroy () {
    socket.off('player.moved', this.handlePlayerMove);
  }

  handlePlayerMove = player => {
    state.players[player.id] = player;
  };

  update () {
    let {x, y} = state.players.player;

    // Up
    if (this.keys.active(['w'])) {
      y -= state.players.player.velocity;
    }

    // Down
    if (this.keys.active(['s'])) {
      y += state.players.player.velocity;
    }

    // Left
    if (this.keys.active(['a'])) {
      x -= state.players.player.velocity;
    }

    // Right
    if (this.keys.active(['d'])) {
      x += state.players.player.velocity;
    }

    const positionChanged = x !== state.players.player.x || y !== state.players.player.y;

    if (this.keys.active(['w', 's', 'a', 'd']) && positionChanged) {
      state.players.player.x = x;
      state.players.player.y = y;
      socket.emit('player.move', state.players.player);
    }
  }

  render () {
    this.ctx.clearRect(0, 0, config.width, config.height);

    for (let id in state.players) {
      if (!state.players.hasOwnProperty(id)) {
        continue;
      }

      const player = state.players[id];

      this.ctx.fillStyle = player.color;
      this.ctx.fillRect(player.x, player.y, SIZE, SIZE);

      this.ctx.fillStyle = '#111';
      this.ctx.font = `${FONT_SIZE}px Arial`;
      this.ctx.fillText(
        player.id,
        player.x + ((SIZE / 2) - (FONT_SIZE / 2)),
        player.y + ((SIZE / 2) + (FONT_SIZE / 2)),
      );
    }
  }
}
