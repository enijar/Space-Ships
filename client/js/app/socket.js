import config from './config';

const executeEventFunctions = (events, event, data = null) => {
  if (events.hasOwnProperty(event)) {
    for (let i = events[event].length - 1; i >= 0; i--) {
      events[event][i].call(null, data);
    }
  }
};

const state = {
  events: {},
  connection: null,
  connected: false,
  pingInterval: null,
};

export default {
  connect () {
    state.connection = new WebSocket(config.ws.uri);
    state.connection.onopen = () => {
      state.connected = true;
      state.pingInterval && clearInterval(state.pingInterval);
      state.pingInterval = setInterval(() => this.emit('ping'), config.ws.ping_interval);
    };
    state.connection.onmessage = message => {
      const {event, data} = JSON.parse(message.data);
      executeEventFunctions(state.events, event, data);
    };
    state.connection.onclose = () => {
      state.connected = false;
      setTimeout(() => this.connect(), config.ws.reconnect_timeout);
      executeEventFunctions(state.events, 'disconnected');
    };
  },
  on (event, func) {
    if (!state.events.hasOwnProperty(event)) {
      state.events[event] = [];
    }
    state.events[event].push(func);
  },
  emit (event, data) {
    if (state.connected) {
      state.connection.send(JSON.stringify({event, data}));
    }
  },
  off (event, func) {
    if (state.events.hasOwnProperty(event)) {
      for (let i = state.events[event].length - 1; i >= 0; i--) {
        if (state.events[event][i] === func) {
          state.events = state.events.splice(i, 1);
        }
      }
    }
  },
}
