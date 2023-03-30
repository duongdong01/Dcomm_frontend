<template>
  <div class="flex-col">
    <div class="flex flex-col px-2 pb-6 text-white text-base border-b mb-4">
      <div class="flex justify-between border-b pb-3">
        <p class="font-semibold">
          Contact
        </p>
        <i class="fa-solid fa-ellipsis text-white cursor-pointer" />
      </div>
      <div v-for="(item,index) in [0,1,2,3,4,5]" :key="index" class="flex flex-col mt-4 cursor-pointer py-1 transition-all">
        <div class="flex  items-center mx-2">
          <div class="relative">
            <img class="rounded-full w-9 h-9" src="@/static/avatar/avatar1.jpg" alt="photo">
            <div class="rounded-full w-[10px] h-[10px] bg-green-400 top-[30px] right-[6px] absolute" />
          </div>
          <div class="ml-4 font-medium">
            Duong Dong {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex-col text-white  rounded-xl text-base  pb-3 mb-5">
      <div class="grid grid-cols-2 gap-1 rounded-xl pb-3">
        <div>
          <p class="font-semibold">
            🔥Hot Products
          </p>
        </div>
        <div class="flex justify-between ml-10">
          <div class="w-8 h-8 hover:bg-btn_hover rounded-xl flex justify-center items-center cursor-pointer " @click="backArr">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-chevron-left text-white font-semibold cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
          </div>
          <div class="w-8 h-8 hover:bg-btn_hover rounded-xl flex justify-center items-center cursor-pointer" @click="nextArr">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-chevron-right text-white font-semibold "
              viewBox="0 0 16 16"
            >
              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </div>
      </div>
      <Ads :arr="current" :class="startAni" />
      {{ startAni }}
    </div>
  </div>
</template>

<script>
import Ads from '../ads/Ads.vue'
export default {
  components: { Ads },
  data: function () {
    return {
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      current: [1, 2, 3],
      currentIndex: 0,
      startAni: ''
    }
  },
  created () {
    const tmp = [...this.array]
    this.current = tmp.splice(this.currentIndex, 3)
    this.currentIndex = 3
  },
  mounted () {
    setInterval(() => {
      if (this.currentIndex >= this.array.length) {
        this.currentIndex = 0
      }
      const tmp = [...this.array]
      this.current = tmp.splice(this.currentIndex, 3)
      this.currentIndex = this.currentIndex + 3
    }, 30000)
  },
  methods: {
    nextArr () {
      if (this.currentIndex >= this.array.length) {
        this.currentIndex = 0
      }
      const tmp = [...this.array]
      this.current = tmp.splice(this.currentIndex, 3)
      this.currentIndex = this.currentIndex + 3
      this.startAni = 'slide'
      setTimeout(() => {
        this.startAni = ''
      }, 500)
    },
    backArr () {
      this.currentIndex = this.currentIndex - 6
      if (this.currentIndex < 0) {
        this.currentIndex = 3
        return
      }
      const tmp = [...this.array]
      this.current = tmp.splice(this.currentIndex, 3)
      this.currentIndex = this.currentIndex + 3
      this.startAni = 'slide2'
      setTimeout(() => {
        this.startAni = ''
      }, 500)
    }
  }
}
</script>
<style lang="scss">
.slide{
  animation: ani 0.5s 1 ease-in-out;
}
.slide2{
  animation: ani2 0.5s 1 ease-in-out;
}
@keyframes ani {
  0%{
    transform: translateX(15px);
  }
  100%{
    transform: translateX(0);
  }
}
@keyframes ani2 {
  0%{
    transform: translateX(-15px);
  }
  100%{
    transform: translateX(0px);
  }
}
</style>
