const state = require('../../../state/index');

module.exports = (socket, player) => {
  const statePlayer = state.players.get(player.uuid);
  if (!statePlayer) {
    return;
  }
  statePlayer.update({x: player.x, y: player.y});
  socket.broadcast('player.moved', statePlayer.public());
}
