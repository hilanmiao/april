<template>
  <div>
    <button class="u-btn">Todo New +</button>
    <button class="u-btn">Contact New +</button>
    <button class="u-btn">Project New +</button>
    <button class="u-btn">Finance New +</button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.u-btn {
  font-family: russoOne;
  color: #ffffff;
  background: rgba(255, 255, 255, .1);
  margin-left: 24px;
  border: white;
  position:relative;
  padding: 10px 20px;
  //line-height: 0.875;
  //font-size: 0.75em;
  cursor: pointer;
  transition: background-color 0.15s ease-in;
  will-change: transform;
  &:after,
  &:before {
    content:'';
    display: block;
    //width: 40px;
    width: 100%;
    border: 1px solid #ffffff;
    position:absolute;
    bottom: -2px;
    top:-2px;
    transition: width 0.15s ease-in-out;
  }
  &:before {
    border-right: none;
    left: -2px;
  }
  &:after{
    border-left: none;
    right:-2px;
  }
  &:hover {
    background: rgba(255,255,255, 0.8);
    color: black;
    &:before,
    &:after{
      width: calc(50% + 2px);
    }
  }
  &:focus {
    outline:none;
  }
  &:active {
    transform: scale(0.95);
    transition: transform 0.1s ease-out;
  }
}
</style>
