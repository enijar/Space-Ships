const handlers = require('../socket/handlers');
const state = require('../state/index');

module.exports = class Socket {
  constructor (socket) {
    this.socket = socket;
    this.guid = socket.guid;
  }

  handleEvent (event, data) {
    if (handlers.hasOwnProperty(event)) {
      try {
        handlers[event](this, data);
      } catch (err) {
        console.error(`Error with event handler "${event}":`, err);
      }
    }
  }

  /**
   * Send message to this socket
   * @param {String} event
   * @param {*} data
   */
  emit (event, data) {
    this.socket.send(JSON.stringify({event, data}));
  }

  /**
   * Send message to all sockets (except this socket)
   * @param {String} event
   * @param {*} data
   */
  broadcast (event, data) {
    for (let socketId in state.sockets) {
      if (state.sockets.hasOwnProperty(socketId) && socketId !== this.guid) {
        state.sockets[socketId].socket.send(JSON.stringify({event, data}));
      }
    }
  }
}
