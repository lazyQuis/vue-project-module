const Me = class BaseData {
  constructor() {
    this._dataLS = {
      info: false,
      input: false,
      setting: false,
    };
    this._dataTmp = {};
  }

  getItem(name) {
    const nameSet = name.split('.');
    const ls = nameSet.shift();
    const field = nameSet.join('.');
    const data = this._getLS(ls);
    if (field) {
      return data[field];
    }
    return data;
  }

  setItem(name, data) {
    const nameSet = name.split('.');
    const ls = nameSet.shift();
    const field = nameSet.join('.');
    let obj;
    if (field && typeof data !== 'undefined') {
      obj = {};
      obj[field] = data;
    }
    return this._setLS(ls, obj);
  }

  getSetting() {
    return this._getLS('setting');
  }

  setSetting(obj) {
    return this._setLS('setting', obj);
  }

  getInput() {
    return this._getLS('input');
  }

  setInput(obj) {
    return this._setLS('input', obj);
  }

  getInfo() {
    return this._getLS('info');
  }

  setInfo(obj) {
    return this._setLS('info', obj);
  }

  _getTmp(field) {
    if (!(field in this._dataTmp)) {
      return undefined;
    }
    const data = this._dataTmp[field];
    if (data === false) {
      return false;
    }
    try {
      const obj = JSON.parse(JSON.stringify(data));
      return obj;
    } catch (err) {
      return false;
    }
  }

  _setTmp(field, val) {
    if (!(field in this._dataTmp)) {
      return undefined;
    }
    if (typeof val !== 'object') {
      this._dataTmp[field] = false;
      return false;
    }
    try {
      this._dataTmp[field] = JSON.parse(JSON.stringify(val));
      return true;
    } catch (err) {
      return false;
    }
  }

  _getLS(field) {
    if (!(field in this._dataLS)) {
      return undefined;
    }
    let diff = false;
    let data = this._dataLS[field];
    if (data !== false) {
      return data;
    }
    const lsName = Me.PREFIX_LS + field;
    const lsData = localStorage.getItem(lsName) || '';
    try {
      data = JSON.parse(lsData);
      Object.keys(Me.FIELD_LS[field]).forEach((key) => {
        if (key in data) {
          return;
        }
        diff = true;
        data[key] = Object.assign({}, Me.FIELD_LS[field][key]);
      });
      Object.keys(data).forEach((key) => {
        if (key in Me.FIELD_LS[field]) {
          return;
        }
        delete data[key];
      });
    } catch (err) {
      diff = true;
      data = Object.assign({}, Me.FIELD_LS[field]);
    }
    if (diff > 0) {
      localStorage.setItem(lsName, JSON.stringify(data));
    }
    return data;
  }

  _setLS(field, val) {
    const lsName = Me.PREFIX_LS + field;
    let data = this._getLS(field);
    if (typeof data === 'undefined' || data === false) {
      return data;
    }
    if (typeof val !== 'object') {
      data = false;
      localStorage.removeItem(lsName);
      return data;
    }
    const defaultField = Me.FIELD_LS[field];
    Object.keys(val).forEach((i) => {
      if (i in defaultField) {
        data[i] = val[i];
      }
    });
    localStorage.setItem(lsName, JSON.stringify(data));
    return data;
  }
};

Me.PREFIX_LS = 'ubiix_';

Me.FIELD_LS = {
  info: {
    demo: '',
  },
  input: {},
  setting: {},
};

export default Me;
