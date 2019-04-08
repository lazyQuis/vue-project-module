<template>
  <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="false" @click.native.prevent="demoWarning">Ubiix Module Demo</el-button>
</template>

<script>
import ctrl from '@/mixins/ctrl';
const mixins = ctrl(['demo']);

export default {
  mixins,
  methods: {
    demoWarning() {
      this.ctrl.demo.warningTest();
    },
  },
};
</script>