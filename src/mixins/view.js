export default (list) => {
  list = list || [];
  const mixins = {
    created() {
      this.view = {};
      list.forEach((name) => {
        if (name in this.$module.view) {
          this.view[name] = this.$module.view[name];
        }
      });
    },
  };
  return [mixins];
};
