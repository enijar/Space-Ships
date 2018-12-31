const {guid} = require('../../../shared/util');

const PLAYERS = {};
let ID = 0;
const PUBLIC_DATA = ['id', 'x', 'y', 'velocity', 'color'];

module.exports = {
  add () {
    const uuid = guid();
    PLAYERS[uuid] = {
      data: {uuid, id: ++ID, x: 0, y: 0, velocity: 5, color: '#fff'},
      public () {
        const data = {};
        for (let key in this.data) {
          if (this.data.hasOwnProperty(key) && PUBLIC_DATA.includes(key)) {
            data[key] = this.data[key];
          }
        }
        return data;
      },
      private () {
        return this.data;
      },
      update (props = {}) {
        this.data = Object.assign(this.data, props);
      },
    };
    return PLAYERS[uuid];
  },
  all (excludedIds = []) {
    return Object.values(PLAYERS).filter(player => !excludedIds.includes(player.data.id)).map(player => player.public());
  },
  remove (uuid) {
    delete PLAYERS[uuid];
  },
  get (uuid, defaultValue = null) {
    return PLAYERS[uuid] || defaultValue;
  },
};
