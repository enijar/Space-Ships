const sharedConfig = require('../../shared/config');

module.exports = {
  port: sharedConfig.port,
  key: 'secret',
  db: {
    dialect: 'mysql',
    host: 'mysql',
    port: 3306,
    name: 'space_ships',
    username: 'space_ships',
    password: 'secret',
  },
  saltRounds: 10,
}
