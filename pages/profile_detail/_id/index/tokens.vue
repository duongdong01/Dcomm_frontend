<template>
  <div class="text-white">
    <div class="text-lg ml-44 mb-8 pl-2">
      Daily Task
    </div>
    <div class="px-4 flex justify-between mb-8">
      <div class="relative ml-16">
        <div class="">
          <svg width="300" height="300" viewBox="0 0 100 100">
            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#2ed8a7" />
              <stop offset="100%" stop-color="#a6ceff" />
            </linearGradient>
            <circle
              stroke-linecap="round"
              cx="50"
              cy="50"
              r="48"
              stroke="url(#linear)"
              stroke-width="4"
              fill="none"
              stroke-dasharray="315"
              stroke-mitterlimit="0"
              transform="rotate(-90 ) translate(-100 0)"
              :stroke-dashoffset="valueDashOffset"
            />
          </svg>
        </div>
        <div class="z-5 absolute top-0">
          <svg width="300" height="300" viewBox="0 0 100 100">
            <linearGradient id="linearOpacity" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="rgba(18,85,65,0.4)" />
              <stop offset="100%" stop-color="rgba(65,81,100,0.4)" />
            </linearGradient>
            <circle
              class="abc"
              stroke-linecap="round"
              cx="50"
              cy="50"
              r="48"
              stroke="url(#linearOpacity)"
              stroke-width="4"
              fill="none"
              stroke-dasharray="315"
              stroke-dashoffset="0"
              stroke-mitterlimit="0"
              transform="rotate(-90 ) translate(-100 0)"
            />
          </svg>
        </div>
        <div class="text-lg absolute top-[45%] left-[20%]">
          {{ countTaskComplete }}/{{ list.length }} Tasks Completed
        </div>
        <div id="the-final-countdown">
          <p />
        </div>
      </div>
      <div v-if="isLoad">
        <ListTask :list="list" class="w-96" />
      </div>
    </div>
  </div>
</template>

<script>
import ListTask from '~/components/token/listTask.vue'
export default {
  components: {
    ListTask
  },
  data () {
    return {
      list: [],
      isLoad: false,
      countTaskComplete: 0,
      valueDashOffset: 0
    }
  },
  mounted () {
    this.getTaskDaily()
  },
  methods: {
    async getTaskDaily () {
      try {
        this.list = await this.$api.token.getTaskDaily()
        this.isLoad = true
        this.list = this.list.data.getTaskDaily
        this.list.forEach(function (current) {
          const tmp = current.numberTaskDone / current.numberTask
          if (tmp === 1) {
            this.countTaskComplete++
          }
        })
        this.valueDashOffset = (1 - this.countTaskComplete / this.list.length) * 315 + 8
      } catch (error) {
      }
    }
  }
}
setInterval(function time () {
  const d = new Date()
  const hours = 23 - d.getHours()
  let min = 60 - d.getMinutes()
  if ((min + '').length === 1) {
    min = '0' + min
  }
  let sec = 60 - d.getSeconds()
  if ((sec + '').length === 1) {
    sec = '0' + sec
  }
  ('#the-final-countdown p').html(hours + ':' + min + ':' + sec)
}, 1000)
</script>

<style lang="scss">
.abc{
  background-color: bisque;
}

#the-final-countdown {
  font-family: 'Lato', sans-serif;
  text-align: center;
  color: #eee;
  text-shadow: 1px 1px 5px black;
  padding: 1rem 0;
  font-size: 3rem;
}
</style>
