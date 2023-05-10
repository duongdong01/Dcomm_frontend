<template>
  <div class="p-2 cursor-default flex flex-col">
    <div class="flex text-white justify-between pt-[1px]">
      <div class="font-semibold text-[22px] cursor-text">
        Notifications
      </div>
      <div class="flex justify-center items-center w-8 h-8 hover:bg-gray-500 p-1 rounded-full cursor-pointer">
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
      </div>
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
      isAll: true
    }
  },
  methods: {
    showUnreadNotification (e) {
      this.$emit('unread', e)
      this.isAll = !e
    }
  }
}
</script>
