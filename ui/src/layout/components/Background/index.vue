<template>
  <div class="m-bg">
    <canvas id="plane-canvas" class="plane-canvas" />
    <canvas id="main-canvas" class="main-canvas" />
  </div>
</template>

<script>
import Background from './background'
export default {
  mounted() {
    new Background()
  },
  methods: {
    init() {

    }
  }
}
</script>

<style scoped>
  .m-bg {
    display: flex;
    justify-content: center;
    height: 100%;
    min-height: 100%;
    width: 100%;
  }
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
