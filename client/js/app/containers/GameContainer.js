import React, { Component, createRef } from 'react'
import Game from '../../game'

export default class GameContainer extends Component {
  canvas = createRef();
  game = null;

  componentDidMount() {
    this.game = new Game(this.canvas.current);
    this.game.start();
  }

  componentWillUnmount() {
    this.game && this.game.stop();
  }

  render () {
    return (
      <div className="GameContainer">
        <canvas ref={this.canvas}/>
      </div>
    );
  }
}
