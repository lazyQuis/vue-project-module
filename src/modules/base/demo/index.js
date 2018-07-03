const Me = class BaseDemo {
  constructor(sql, callback) {
    this.eventList = [];
  }

  warning(msg) {
    msg = msg || 'module event example.';
    this._eventTrigger({
      type: 'warning',
      data: { msg },
    });
  }

  eventRegister(callback) {
    if (typeof callback !== 'function') {
      console.log('Demo::eventRegister args error!');
      return;
    }
    this.eventList.push(callback);
    console.log('Demo::_eventRegister set.');
  }

  _eventTrigger(data) {
    if (this.eventList.length === 0) {
      console.log('Demo::eventTrigger empty.');
      return;
    }
    this.eventList.forEach((item) => {
      item(data);
    });
    console.log('Demo::eventTrigger send.');
  }
};

export default Me;
