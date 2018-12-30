import React, { Component } from 'react'
import Screen from '../components/Screen'
import GameContainer from '../containers/GameContainer'

export default class PlayScreen extends Component {
  render () {
    return (
      <Screen name="play">
        <GameContainer/>
      </Screen>
    );
  }
}
