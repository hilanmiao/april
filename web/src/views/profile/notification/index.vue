<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="未读消息(2)" name="unread">
              <unread />
            </el-tab-pane>
            <el-tab-pane label="已读消息" name="read">
              <read />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import unread from './components/unread'
import read from './components/read'

export default {
  name: 'Notification',
  components: { unread, read },
  data() {
    return {
      user: {},
      activeTab: 'unread'
    }
  },
  created() {

  },
  methods: {

  }
}
</script>
