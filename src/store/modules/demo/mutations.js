export default {
  setWarning: (state, payload) => {
    const msg = (typeof payload.msg === 'string') ? payload.msg : '';
    state.warning = msg;
  },
};
