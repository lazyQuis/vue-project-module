// import libDate from '@/lib/date';
import View from '../index';

const Me = class ViewDemo extends View {
  constructor(vue, injection) {
    super(vue, injection, Me.INJECTION_MAP);
  }
  warning() {
    this.ctrl.demo.warningTest();
  }
  warningCancel() {
    this.vue.$store.dispatch('demo/onWarning', {
      msg: '',
    });
  }
  onEventWarning(data) {
    const msg = data.msg;
    this.vue.$store.dispatch('demo/onWarning', {
      msg,
    });
  }
  _eventHook() {
    this.ctrl.demo.on('warning', this.onEventWarning.bind(this));
  }
};

Me.INJECTION_MAP = ['demo'];

export default Me;
