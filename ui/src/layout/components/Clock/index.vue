<template>
  <div class="m-clock">
    <p class="date">{{ date }} 农历三月十六</p>
    <p class="time">{{ time }}</p>
  </div>
</template>

<script>
import WorkerInterval from '@/assets/js/interval.worker'
const workerInterval = new WorkerInterval()
export default {
  data() {
    return {
      time: '',
      date: '',
      week: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      timer: null
    }
  },
  mounted() {
    this.attachTimer()
    // setInterval(this.updateTime, 1000)
  },
  destroyed() {
    // 组件销毁时注销计时器
    workerInterval.terminate()
  },
  methods: {
    attachTimer() {
      // var cd = new Date()
      // 页面效果比较多，有大量的耗时工作，所以需要使用webWorker解决setInterval不准的问题
      workerInterval.postMessage({ unit: 1000 })
      workerInterval.onmessage = event => {
        const cd = event.data.date
        this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)
        this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()]
      }
    },
    zeroPadding(num, digit) {
      var zero = ''
      for (var i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    }
  }
}
</script>

<style lang="scss" scoped>
.m-clock {
  //font-family: teko;
  //color: #ffffff;
  //text-align: center;
  //color: #daf6ff;
  //text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);
  p {
    margin: 0;
    padding: 0;
  }
  .time {
    //letter-spacing: 0.05em;
    font-size: 60px;
    //padding: 5px 0;
  }
  .date {
    //letter-spacing: 0.1em;
    font-size: 24px;
  }
}
</style>
