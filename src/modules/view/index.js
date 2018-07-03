const Me = class ModuleCtrl {
  constructor(vue, injection, map) {
    this._map = map || Me.INJECTION_MAP;
    this.vue = vue;
    this.ctrl = {};
    this._check(injection);
    this._eventHook();
    this._listener = {};
    this._check(injection);
  }

  _check(injection) {
    injection = (typeof injection === 'object') ? injection : {};
    this._map.forEach((name) => {
      if (!(name in injection) || !injection[name]) {
        throw new Error(`injection instance missed: ${name}`);
      }
      this.ctrl[name] = injection[name];
    });
  }

  _eventHook() {
    // implement by child
  }
};

Me.INJECTION_MAP = [];

export default Me;
