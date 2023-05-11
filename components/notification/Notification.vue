<template>
  <div class="p-2 cursor-default flex flex-col">
    <div class="flex text-white justify-between pt-[1px]">
      <div class="font-semibold text-[22px] cursor-text">
        Notifications
      </div>
      <button class="flex justify-center items-center w-8 h-8 hover:bg-gray-500 p-1 rounded-full cursor-pointer relative" @click.stop="showAllRead" @focusout="isShowAllRead=false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg>
        <div v-if="isShowAllRead" class="flex absolute text-white flex-col bg-gray-900 border border-gray-700 rounded-md py-1 z-10 right-8 top-2 w-fit">
          <div class="flex justify-start hover:bg-gray-700 items-center space-x-1 py-2 px-2 w-[160px]" @click.stop="readAllNotification">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-check-lg"
              viewBox="0 0 16 16"
            >
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
            </svg>
            <div>
              Mark all as read
            </div>
          </div>
        </div>
      </button>
    </div>
    <div class="flex my-1 space-x-2">
      <button class="py-2 px-3 rounded-3xl  text-white font-semibold text-[16px] hover:bg-gray-600" :class="isAll ? 'bg-blue-600/50':''" @click.stop="showUnreadNotification(false)">
        All
      </button>
      <button class="py-2 px-3 rounded-3xl  text-white font-semibold text-[16px] hover:bg-gray-600" :class="!isAll ? 'bg-blue-600/50':''" @click.stop="showUnreadNotification(true)">
        Unread
      </button>
    </div>
    <div class="flex mb-1 justify-between text-white font-semibold px-1 text-[16px]">
      <div>
        Earlier
      </div>
      <nuxt-link v-if="$route.path.split('/')[1]!=='notification'" to="/notification" tag="div" class="text-[#1876f2] text-[14px] cursor-pointer">
        See all
      </nuxt-link>
    </div>
    <div v-for="(item,index) in notifications" :key="index">
      <NotificationItem :notification="item" />
    </div>
  </div>
</template>

<script>
import NotificationItem from './NotificationItem.vue'
export default {
  components: {
    NotificationItem
  },
  props: {
    notifications: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isAll: true,
      isShowAllRead: false
    }
  },
  methods: {
    showUnreadNotification (e) {
      this.$emit('unread', e)
      this.isAll = !e
    },
    showAllRead () {
      this.isShowAllRead = !this.isShowAllRead
    },
    async  readAllNotification () {
      try {
        await this.$api.notification.readAllNotification()
        this.$store.commit('notification/readAllNotification')
        this.showAllRead()
      } catch (err) {
      //
      }
    }

  }
}
</script>
