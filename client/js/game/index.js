import config from './config'
import renderers from './renderers/index'
import state from './state/index'
import socket from '../app/socket'

export default class Game {
  constructor (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.renderers = renderers;
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

    socket.connect();
    socket.on('connected', event => {
      state.players.player = event.player;
      for (let i = 0; i < event.players.length; i++) {
        state.players[event.players[i].id] = event.players[i];
      }

      socket.on('player.joined', this.handlePlayerJoined);
      socket.on('player.left', this.handlePlayerLeft);

      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('keyup', this.handleKeyUp);

      // Initiate renderers
      for (let i = 0; i < this.renderers.length; i++) {
        this.renderers[i].keys = this.keys;
        this.renderers[i].init();
      }

      this.render();
    });

    socket.on('disconnected', () => {
      state.players = {};
      console.info('disconnected');
    });
  }

  stop () {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    socket.off('player.joined', this.handlePlayerJoined);
    socket.off('player.left', this.handlePlayerLeft);
    this.animationFrame && cancelAnimationFrame(this.animationFrame);
  }

  handlePlayerJoined = player => {
    state.players[player.id] = player;
  };

  handlePlayerLeft = player => {
    delete state.players[player.id];
  };

  handleKeyDown = event => {
    if (!this.keys.pressed.includes(event.key)) {
      this.keys.pressed.push(event.key);
    }
  };

  handleKeyUp = event => {
    const index = this.keys.pressed.indexOf(event.key);
    index > -1 && this.keys.pressed.splice(index, 1);
  };

  updateAndRenderLayers () {
    // Sort, update and render layers
    const layers = this.renderers.sort((a, b) => a.layer - b.layer);
    for (let i = 0; i < layers.length; i++) {
      layers[i].update();
      layers[i].render();
      this.ctx.drawImage(layers[i].canvas, layers[i].x, layers[i].y, layers[i].width, layers[i].height);
    }
  }

  render = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateAndRenderLayers();
    this.animationFrame = requestAnimationFrame(this.render);
  };
}
