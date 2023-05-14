<template>
  <div class="flex flex-col max-h-[100vh] h-[100vh]">
    <div class="fixed z-10 w-full flex justify-center bg-[#121212] border-[#303030] border-b-[1.5px]">
      <MainHeader class="animation-header px-10" />
    </div>
    <div class="flex justify-center items-center w-full h-full ">
      <nuxt class="w-full h-full px-8  pt-[72px]" />
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/main_layout/MainHeader.vue'
import SocketioService from '~/socket/socketio.service'
export default {
  components: {
    MainHeader
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  layout: 'conversation',
  middleware: ['auth'],
  beforeDestroy () {
    SocketioService.disconnect()
  },
  beforeMount () {
    // this.$socket.on('connect', () => {
    //   console.log('Socket connected')
    // })
    if (window.localStorage.getItem('access_token')) {
      SocketioService.setupSocketConnection()
    }
  }
}
</script>
<style>
@keyframes scaleAnimation {
  0% {
    transform: scaleX(0.84);
  }
  100% {
    transform: scaleX(1);
  }
}
.animation-header{
  animation-name: scaleAnimation;
  animation-duration: 0.6s;
  transition: all ease-in-out;
}
</style>
