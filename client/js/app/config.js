import sharedConfig from '../../../shared/config'

export default {
  ...sharedConfig,
  ws: {
    uri: 'ws://localhost:8080',
    reconnect_timeout: 1000,
    ping_interval: 30000,
  }
}
