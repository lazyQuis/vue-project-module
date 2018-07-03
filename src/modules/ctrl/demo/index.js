import Ctrl from '../index';

const Me = class CtrlDemo extends Ctrl {
  constructor(injection) {
    super(injection, Me.INJECTION_MAP);
  }
  warningTest(msg) {
    msg = msg || 'Ubiix Demo Warning Test';
    this.module.demo.warning(msg);
  }
};

Me.INJECTION_MAP = {
  // plugin: ['demo'],
  module: ['demo', 'data', 'http'],
};

export default Me;
