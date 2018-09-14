const Me = class ModuleCtrl {
  constructor(injection, map) {
    this._map = map || Me.INJECTION_MAP;
    this._listener = {};
    this._check(injection);
  }

  _check(injection) {
    injection = (typeof injection === 'object') ? injection : {};
    Object.keys(this._map).forEach((i) => {
      if (!(i in injection)) {
        throw new Error(`injection type missed: ${i}`);
      }
      this[i] = {};
      Object.keys(this._map[i]).forEach((j) => {
        const name = this._map[i][j];
        if (!(name in injection[i]) || !injection[i][name]) {
          throw new Error(`injection instance missed: ${i} :: ${name}`);
        }
        this[i][name] = injection[i][name];
        if ('eventRegister' in this[i][name]) {
          const event = `${i}.${name}`;
          if (!(event in Me.EVENT_MAP)) {
            Me.EVENT_MAP[event] = [];
            this[i][name].eventRegister(Me.EVENT_REG.bind(Me, event));
          }
          Me.EVENT_MAP[event].push(this._event.bind(this));
        }
      });
    });
  }

  _event(msg) {
    if (typeof msg !== 'object' || !('type' in msg) || !('data' in msg)) {
      // console.log(msg);
      throw new Error('listener msg error !');
    }
    if (!(msg.type in this._listener)) {
      // console.log('listener callback missed:', msg);
      return;
    }
    this._listener[msg.type](msg.data);
  }

  _register() {
    Object.keys(this._map).forEach((i) => {
      Object.keys(this._map[i]).forEach((j) => {
        const name = this._map[i][j];
        if ('eventRegister' in this[i][name]) {
          this[i][name].eventRegister(this._event.bind(this));
        }
      });
    });
  }

  on(type, callback) {
    if (typeof callback !== 'function') {
      throw new Error(`listener event error: ${type}`);
    }
    this._listener[type] = callback;
  }
};

// manage event from 'base' to which 'ctrl'
Me.EVENT_REG = function EVENT_REG(name, msg) {
  if (!(name in Me.EVENT_MAP)) {
    return;
  }
  Me.EVENT_MAP[name].forEach((e) => {
    e(msg);
  });
};
Me.EVENT_MAP = {};
Me.INJECTION_MAP = { plugin: [], module: [] };

export default Me;
