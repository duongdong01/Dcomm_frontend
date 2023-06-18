<template>
  <div class="flex flex-col min-h-[100vh]">
    <div class=" fixed z-10 w-full flex justify-center bg-[#121212] border-[#303030] border-b-[1.5px]">
      <MainHeader class="max-w-[1400px] animation-default-header px-1" />
    </div>
    <div class="grid grid-flow-col grid-cols-10  max-w-[1410px] mx-auto mt-24 gap-8 w-full">
      <div class="col-span-2 shrink">
        <MainLeft v-if="$route.path.split('/')[1]!=='post' && $route.path.split('/')[1]!=='search' && $route.path.split('/')[1]!=='notification'" class="overflow-y-auto sticky top-24 xl:w-[250px] md:w-[200px] lg:w-[240px]" />
      </div>
      <div class="col-span-8 flex md:ml-3 lg:ml-0">
        <nuxt />
      </div>
    </div>
    <Follower v-if="isOpenFollower" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MainLeft from '@/components/main_layout/MainLeft.vue'
import MainHeader from '@/components/main_layout/MainHeader.vue'
import Follower from '@/components/modal/Follower.vue'
import SocketioService from '@/socket/socketio.service'
import MyToast from '~/components/toast/MyToast.vue'

export default {
  components: { MainLeft, MainHeader, Follower },
  middleware: ['auth'],
  computed: {
    ...mapGetters(['isOpenFollower'])

  },
  async beforeDestroy () {
    await window.socket.off('notification:send-new-notification', this.handleSendNewNotification)
    SocketioService.disconnect()
  },
  async beforeMount () {
    // this.$socket.on('connect', () => {
    //   console.log('Socket connected')
    // })
    if (window.localStorage.getItem('access_token')) {
      await SocketioService.setupSocketConnection()
    }
  },
  async mounted () {
    await window.socket.on('notification:send-new-notification', this.handleSendNewNotification)
  },
  methods: {
    showToast (notificationData) {
      const content = {
        component: MyToast,
        props: {
          notification: notificationData
        },
        listeners: {
          click: () => {
            this.counter++
            this.$toast.success(`Toast with counter ${this.counter}`, { position: 'top-left' })
          }
        }
      }
      this.$toast(content, { position: 'bottom-left', toastClassName: 'my-custom-toast-class', icon: false, bodyClassName: ['custom-class-1', 'custom-class-2'], timeout: 5000, hideProgressBar: true })
    },
    handleSendNewNotification (data) {
      console.log('111111111111', data)
      this.showToast(data.notification)
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
