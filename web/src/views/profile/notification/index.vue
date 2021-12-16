<template>
  <div class="notification-container">
    <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane :label="`未读消息(${unreadNotifications})`" name="unread">
        <unread />
      </el-tab-pane>
      <el-tab-pane label="已读消息" name="read">
        <read />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import unread from './components/unread'
import read from './components/read'
import { mapGetters } from 'vuex'

export default {
  name: 'Notification',
  components: { unread, read },
  data() {
    return {
      user: {},
      activeTab: 'unread'
    }
  },
  computed: {
    ...mapGetters([
      'unreadNotifications'
    ])
  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.notification-container {
  padding: 20px;

  ::v-deep .el-card {
    margin: 0 !important;
    box-shadow: none;
    .el-card__body {
      padding: 0 !important;
    }
  }
}
</style>
