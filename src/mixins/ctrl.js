export default (list) => {
  list = list || [];
  const mixins = {
    created() {
      this.ctrl = {};
      list.forEach((name) => {
        if (name in this.$module.ctrl) {
          this.ctrl[name] = this.$module.ctrl[name];
        }
      });
    },
  };
  return [mixins];
};
