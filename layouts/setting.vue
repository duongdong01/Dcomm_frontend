<template>
  <div class="flex flex-col min-h-[100vh]">
    <div class=" fixed z-10 w-full flex justify-center bg-[#121212] border-[#303030] border-b-[1.5px]">
      <MainHeader class="max-w-[1400px] animation-default-header px-1" />
    </div>
    <div class="grid grid-flow-col grid-cols-10  max-w-[1410px] mx-auto mt-24 gap-8 w-full">
      <div class="col-span-2 shrink">
        <LeftBar class="overflow-y-auto sticky top-24 xl:w-[272px] md:w-[230px]" />
      </div>
      <div class="col-span-8 flex">
        <nuxt />
      </div>
    </div>
    <Follower v-if="isOpenFollower" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LeftBar from '@/components/user-setting/LeftBar.vue'
import MainHeader from '@/components/main_layout/MainHeader.vue'
import Follower from '@/components/modal/Follower.vue'
import SocketioService from '@/socket/socketio.service'

export default {
  components: { LeftBar, MainHeader, Follower },
  middleware: ['auth'],
  computed: {
    ...mapGetters(['isOpenFollower'])

  },
  beforeDestroy () {
    SocketioService.disconnect()
  },
  beforeMount () {
    if (window.localStorage.getItem('access_token')) {
      SocketioService.setupSocketConnection()
    }
  }
}
</script>

  <style lang="scss">
  #__nuxt{
    font-family: "Inter";
    background-color: #131720;
  }
  .bg-main_color{
    @apply bg-[#131720]
  }
  .bg-btn-hover{
    @apply bg-[#374151]
  }
  @keyframes scaleDefaultAnimation {
    0% {
      transform: scaleX(1.18);
    }
    100% {
      transform: scaleX(1);
    }
  }
  .animation-default-header{
    animation-name: scaleDefaultAnimation;
    animation-duration: 0.6s;
    transition: all ease-in-out;
  }

  body::-webkit-scrollbar
  {
    @apply w-[10px] bg-gray-700 rounded-lg ;
  }

  body::-webkit-scrollbar-thumb
  {
    @apply border-2 border-solid border-gray-600 bg-gray-600 rounded-lg  ;
  }
  </style>
