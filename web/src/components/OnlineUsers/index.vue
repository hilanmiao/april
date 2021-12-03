<template>
  <div>
    <el-badge :value="onlineUserSocketIds.length" :max="99" type="primary">
      <svg-icon icon-class="peoples" @click="click" />
    </el-badge>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'OnlineUsers',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'onlineUserSocketIds'
    ])
  },
  methods: {
    click() {
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-badge {
  &:after {
    content:'';
    clear:both;
    overflow:hidden;
    height:0px;
  }
  .el-badge__content {
    top: 12px;
  }
}
</style>
