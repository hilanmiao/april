<template>
  <div class="dashboard-container" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 20px;
  h4,
  h5 {
    img {
      margin-left: 10px;
      vertical-align: middle;
    }
  }
}
</style>
