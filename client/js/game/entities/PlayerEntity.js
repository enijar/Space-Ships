import BaseEntity from './BaseEntity'
import socket from '../../app/socket'

export default class PlayerEntity extends BaseEntity {
  state = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  }

  init () {
    socket.on('join', this.handleJoined);
    socket.on('move', this.handlePlayerMove);
    socket.emit('join');
  }

  destroy () {
    socket.off('move', this.handlePlayerMove);
    socket.emit('leave', {id: this.id, token: this.token});
  }
}
