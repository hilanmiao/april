<template>
  <div class="app-wrapper">
    <clock class="u-clock" />
    <weather class="u-weather" />
    <background class="u-bg" />
    <logo class="u-logo" />
    <sidebar class="u-sidebar" />
    <button-group class="u-button-group" />
    <app-main class="u-app-main" />
  </div>
</template>

<script>
import { AppMain, Background, Logo, Sidebar, Clock, Weather, ButtonGroup } from './components'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Background,
    Logo,
    Sidebar,
    Clock,
    Weather,
    ButtonGroup
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .u-app-main {
    //max-width: 80%;
    max-width: 1140px;
    min-height: 80%;
    height: 80%;
    overflow: unset;
  }

  .u-bg {
    position: absolute;
  }

  .u-clock {
    position: absolute;
    top: 20px;
    left: 40px;
    z-index: 1;
  }
  .u-weather {
    position: absolute;
    top: 120px;
    left: 40px;
    z-index: 1;
  }
  .u-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: polya;
    font-size: 250px;
    z-index: 1;
    user-select: none;
  }
  .u-sidebar {
    position: absolute;
    //top: 50%;
    bottom: 0;
    left: 0;
    //transform: translate(0, -50%);
    z-index: 1;
  }

  .u-button-group {
    position: absolute;
    bottom: 4%;
    width: 100%;
    text-align: center;
    z-index: 1;
  }

}
</style>
