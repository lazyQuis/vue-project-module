// base
import BaseDemo from './base/demo';
import BaseData from './base/data';
import BaseHttp from './base/http';

// ctrl
import CtrlDemo from './ctrl/demo';

const Me = class Module {
  constructor() {
    this._isInit = false;
    this._isReg = false;
    this._cfg = {};
    this.plug = {};
    this.base = {};
    this.ctrl = {};
    this.view = {};
  }

  init(config, Vue, callback) {
    if (this._isInit) {
      return;
    }
    this._cfg = Object.assign({}, config);
    this._isInit = true;
    // vue bindinf
    Vue.prototype.$module = this;
    // plugin
    // ...
    // base
    this.base.demo = new BaseDemo();
    this.base.data = new BaseData();
    this.base.http = new BaseHttp(this._cfg.api, this._cfg.env);
    callback({ type: 'ready' });
  }

  register(vue) {
    if (this._isReg) {
      return;
    }
    this._isReg = true;
    this._ctrlSet();
  }
  _ctrlSet() {
    // ctrl
    this.ctrl.demo = new CtrlDemo({
      module: {
        demo: this.base.demo,
        data: this.base.data,
        http: this.base.http,
      },
    });
  }
};

export default new Me();
