<template>
  <div class="page-login">
    <div v-show="!visibleLogin" class="m-loading">
      <div class="text">LOADING....</div>
      <div class="box-progress-bar">
        <div class="progress-bar" />
        <div class="counter">{{ progress }}</div><span>%</span>
      </div>
    </div>
    <div v-show="visibleLogin" class="m-login">
      <div class="logo">
        <div class="u-logo">
          APRIL
        </div>
        <div class="u-text title">Tech Otakus Save the World</div>
        <!--        <div class="u-title">技术在拯救世界</div>-->
        <div class="u-text subtitle">"At the edge of the world, his journey begings"</div>
        <!--        <div class="u-subtitle">在世界的尽头，他开始了旅程</div>-->
      </div>
      <div class="login">
        <div class="u-btn" @click="visibleLoginForm = !visibleLoginForm"><span /><svg-icon icon-class="arrow-1" /></div>
        <div v-show="!visibleLoginForm" class="u-text" @click="visibleLoginForm = !visibleLoginForm">LOGIN</div>
        <div v-show="visibleLoginForm" class="form">
          <input v-model="form.username" type="text" name="memberID" placeholder="Member ID" autocomplete="off" @keyup.enter="handleLogin">
          <input v-model="form.password" type="password" name="password" placeholder="Password" autocomplete="new-password" @keyup.enter="handleLogin">
          <button class="u-btn-confirm" @click="handleLogin">Confirm</button>
        </div>
      </div>
      <div class="box-fingerprint">
        <fingerprint />
      </div>
    </div>
    <div class="u-mouse-follow" />
    <wave />
  </div>
</template>

<script>
import { TweenMax, Elastic } from 'gsap'
import Wave from './components/wave'
import Fingerprint from './components/fingerprint'
import WorkerCountdown from '@/assets/js/countdown.worker'
const workerCountdown = new WorkerCountdown()

export default {
  name: 'Login',
  components: {
    Wave,
    Fingerprint
  },
  data() {
    return {
      progress: 0,
      visibleLogin: true,
      visibleLoginForm: false,
      form: {
        username: 'April',
        password: 'april'
      }
    }
  },
  created() {
    window.addEventListener('mousemove', this.mouseFollow)
  },
  mounted() {
    this.attachTimer()
  },
  destroyed() {
    // 组件销毁时注销计时器
    workerCountdown.terminate()
    window.addEventListener('mousemove', this.mouseFollow)
  },
  methods: {
    mouseFollow(e) {
      TweenMax.to('.u-mouse-follow', 1.8, {
        css: { left: e.pageX, top: e.pageY },
        ease: Elastic.easeOut })
    },
    attachTimer() {
      // 页面效果比较多，有大量的耗时工作，所以需要使用webWorker解决setInterval不准的问题
      workerCountdown.postMessage({ frequency: 100, unit: 30 })
      workerCountdown.onmessage = event => {
        if (this.progress >= 100) {
          this.visibleLogin = true
        } else {
          this.progress++
        }
      }
      // const timer = setInterval(() => {
      //   if (this.progress >= 100) {
      //     this.visibleLogin = true
      //     clearInterval(timer)
      //   } else {
      //     this.progress++
      //   }
      // }, 30)
      // this.$once('hook:beforeDestroy', function() {
      //   clearInterval(timer)
      // })
    },
    handleLogin() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss">

.page-login {
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%),
  repeating-linear-gradient(135deg, rgba(255,255,255,0) 0, rgba(255,255,255,0.05) 800px);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  //background: #0F0F0F;
  .m-loading {
    display: inline-block;
    font-family: russoOne;
    font-size: 24px;
    .text {
      display: inline-block;
      border: 2px solid #ffffff;
      padding: 8px 16px;
      margin-bottom: 14px;
    }
    .box-progress-bar {
      border: 2px solid #ffffff;
      padding: 4px 16px;
      display: flex;
      align-items: center;
      .progress-bar {
        width: 400px;
        height: 16px;
        background: rgb(255,255, 255, .1);
        &:before {
          animation: progress1 4s linear forwards;
          transform-origin: 0 0;
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          background: white;
        }
        @keyframes progress1 {
          0% {
            transform: scalex(0);
            opacity: .5;
          }
          90% {
            transform: scalex(1);
            opacity: 1;
          }
          92% {
            transform: scalex(1);
            opacity: 1;
          }
          100% {
            transform: scalex(1);
            opacity: 1;
          }
        }
      }
      .counter {
        width: 60px;
        text-align: right;
      }
    }
  }

  .m-login {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: russoOne;
    .logo {
      text-align: center;
      margin-bottom: 160px;
      .u-logo {
        font-family: polya;
        font-size: 250px;
      }
      .u-text {
        &.title {
          font-size: 40px;
        }
        &.subtitle {
          font-size: 18px;
        }
      }
    }
    .login {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      position: fixed;
      left: 60px;
      bottom: 60px;
      height: 40px;
      .u-btn {
        //cursor: pointer;
        cursor: url(../../assets/cursor/battlefield-3-purple-revival/link.cur), auto;
        animation: fade 600ms infinite;
        @keyframes fade {
          from {
            opacity: 1.0;
          }
          50% {
            opacity: 0.4;
          }
          to {
            opacity: 1.0;
          }
        }
      }
      .u-text {
        margin-left: 16px;
        //cursor: pointer;
        cursor: url(../../assets/cursor/battlefield-3-purple-revival/link.cur), auto;
      }
      input {
        font-family: russoOne;
        color: #ffffff;
        background: rgba(255, 255, 255, .1);
        border: 1px solid #ffffff;
        text-align: center;
        margin-left: 16px;
        cursor: url(../../assets/cursor/battlefield-3-purple-revival/beam.cur), auto;
      }
      .u-btn-confirm {
        font-family: russoOne;
        color: #ffffff;
        background: rgba(255, 255, 255, .1);
        margin-left: 24px;
        border: white;
        position:relative;
        padding: 0.5em 0.75em;
        //line-height: 0.875;
        //font-size: 0.75em;
        cursor: pointer;
        transition: background-color 0.15s ease-in;
        will-change: transform;
        &:after,
        &:before {
          content:'';
          display: block;
          width: 40px;
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
    }
    .box-fingerprint {
      position: fixed;
      right: 40px;
      bottom: 40px;
    }
  }

  .u-mouse-follow {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
    border-radius: 50%;
    border: 4px solid #ffffff;
    pointer-events: none;
  }
}
</style>
