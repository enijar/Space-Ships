const state = require('../state/index');
const Socket = require('../entities/Socket');
const {guid} = require('../../../shared/util');

module.exports = socket => {
  // Add socket to state
  socket.guid = guid();
  state.sockets[socket.guid] = new Socket(socket);

  const player = state.players.add();
  const playerPublic = player.public();
  const playerPrivate = player.private();
  state.sockets[socket.guid].emit('connected', {
    player: playerPrivate,
    players: state.players.all([playerPublic.id]),
  });
  state.sockets[socket.guid].broadcast('player.joined', playerPublic);

  // Handle client messages
  socket.on('message', message => {
    try {
      const {event, data} = JSON.parse(message);
      if (state.sockets.hasOwnProperty(socket.guid)) {
        state.sockets[socket.guid].handleEvent(event, data);
      }
    } catch (err) {
      // Ignore malformed client messages
      console.error('[error] Malformed client message:', message);
    }
  });

  // Handle client disconnections
  socket.on('close', () => {
    state.players.remove(playerPrivate.uuid);
    state.sockets[socket.guid].broadcast('player.left', playerPublic);
    delete state.sockets[socket.guid];
  });
};
