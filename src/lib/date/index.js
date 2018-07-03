const Me = class DateTransfer {
  static timeToDateStr(time) {
    const date = new Date(time);
    return Me.dateToDateStr(date);
  }

  static timeToDateTimeStr(time) {
    const date = new Date(time);
    return Me.dateToDateTimeStr(date);
  }

  static dateToDateStr(date) {
    const yy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString();
    const dd = date.getDate().toString();
    const mmStr = mm[1] ? mm : `0${mm[0]}`;
    const ddStr = dd[1] ? dd : `0${dd[0]}`;
    return `${yy}/${mmStr}/${ddStr}`;
  }

  static dateToDateTimeStr(date) {
    const hh = date.getHours().toString();
    const mm = date.getMinutes().toString();
    const ss = date.getSeconds().toString();
    const hhStr = hh[1] ? hh : `0${hh[0]}`;
    const mmStr = mm[1] ? mm : `0${mm[0]}`;
    const ssStr = ss[1] ? ss : `0${ss[0]}`;
    return `${Me.dateToDateStr(date)} ${hhStr}:${mmStr}:${ssStr}`;
  }
};

export default Me;
