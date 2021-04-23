<template>
  <div>
    <el-menu
      router
      default-active="/"
      class="el-menu-vertical-demo"
    >
      <el-menu-item index="/">
        <span slot="title">Home</span>
      </el-menu-item>
      <el-menu-item index="2">
        <span slot="title">Todo</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span slot="title">Contact</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span slot="title">Project</span>
      </el-menu-item>
      <el-menu-item index="5">
        <span slot="title">Finance</span>
      </el-menu-item>
      <el-menu-item index="about">
        <span slot="title">About</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="scss" scoped>
.el-menu {
  background-color: transparent;
  .el-menu-item {
    color: rgba(255,255,255,.8);
    font-size: 20px;
    //font-weight: bold;
    &.is-active {
      color: #000;
      background: rgba(255,255,255,.9);
    }
    &:hover {
      color: #000;
      background: rgba(255,255,255,.9);
    }
  }
}
</style>
