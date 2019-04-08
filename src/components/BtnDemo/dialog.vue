<template>
  <el-dialog title="Demo Warning" :visible.sync="isWarning" :show-close="false" center append-to-body>
    <span>{{warningMsg}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="demoWarningCancel()">OK</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ctrl from '@/mixins/ctrl';
const mixins = ctrl(['demo']);

export default {
  mixins,
  created() {
    this.eventHook();
  },
  computed: {
    warningMsg() {
      return this.$store.state.demo.warning;
    },
    isWarning() {
      return this.warningMsg !== '';
    },
  },
  methods: {
    demoWarningCancel() {
      this.$store.dispatch('demo/onWarning', {
        msg: '',
      });
    },
    eventHook() {
      this.ctrl.demo.on('warning', (data) => {
        const msg = data.msg;
        this.$store.dispatch('demo/onWarning', {
          msg,
        });
      });
    },
  },
};
</script>