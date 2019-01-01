import BaseManager from './BaseManager'

export default class ControlsManager extends BaseManager {
  constructor (game) {
    super(game);
    this.activeKeys = [];
    this.mouseDown = false;

    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  destroy() {
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  handleMouseDown = () => {
    this.mouseDown = true;
  }

  handleMouseUp = () => {
    this.mouseDown = false;
  }

  handleKeyDown = event => {
    if (!this.activeKeys.includes(event.key)) {
      this.activeKeys.push(event.key);
    }
  }

  handleKeyUp = event => {
    const index = this.activeKeys.indexOf(event.key);
    if (index > -1) {
      this.activeKeys.splice(index, 1);
    }
  }

  keyPressed(key) {
    return this.activeKeys.includes(key);
  }

  keysPressed(keys) {
    for (let i = 0; i < keys.length; i++) {
      if (this.activeKeys.includes(keys[i])) {
        return true;
      }
    }
    return false;
  }

  mousePressed() {
    return this.mouseDown;
  }
}
