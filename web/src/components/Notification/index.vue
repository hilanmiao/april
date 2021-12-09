<template>
  <div class="header-notification" @click="click">
    <template v-if="unreadCount > 0">
      <el-tooltip :content="`有${unreadCount}条未读消息`" effect="dark" placement="bottom">
        <el-badge is-dot>
          <i class="el-icon-message-solid" />
        </el-badge>
      </el-tooltip>
    </template>
    <template v-else>
      <i class="el-icon-message-solid" />
    </template>
  </div>
</template>

<script>

export default {
  name: 'Notification',
  props: {
    unreadCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
    click() {
      this.$router.push({ path: '/profile/notification' })
    }
  }
}
</script>

<style lang="scss">
  .header-notification {
    .el-badge__content.is-fixed.is-dot {
      right: 8px;
      top: 14px;
    }
  }
</style>
<style lang="scss" scoped>

</style>
