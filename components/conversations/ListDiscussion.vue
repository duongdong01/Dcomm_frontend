<template>
  <div class="flex flex-col mt-1 space-y-2">
    <div class="px-[1px] flex justify-center relative">
      <input type="text" placeholder="Search a messages" class="bg-drak_chat rounded-full w-full py-2 pr-4 pl-8 outline-0">
      <i class="fa-solid fa-magnifying-glass text-gray-400 absolute ml-2  top-[11px] left-[1px]" />
    </div>
    <div class="flex space-x-2 mb-2">
      <div class="flex justify-center rounded-full hover:bg-[#31455d] bg-[#263951] px-3 py-2 cursor-pointer">
        <p class="text-blue-400 font-medium text-base">
          My direct
        </p>
      </div>
      <div class="flex justify-center rounded-full hover:bg-drak_chat  px-3 py-2 cursor-pointer">
        <p class="text-white font-medium text-base">
          Watting
        </p>
      </div>
    </div>
    <div>
      <discussion-item v-for="(item,index) in listConversation" :key="`${item._id}+${index}`" :discussion="item" :is-online="checkIsOnline(item.userChat._id)" />
    </div>
  </div>
</template>

<script>
import DiscussionItem from './DiscussionItem.vue'
export default {
  components: { DiscussionItem },
  props: {
    listConversation: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      listUserOnline: []
    }
  },
  mounted () {
    if (this.listConversation && this.listConversation.length) {
      const userIds = this.listConversation.map(el => el.userChat._id)
      window.socket.emit('getOnlineListUsers', { userIds })
      window.socket.on('listUserOnline', this.getListUserOnline)
    }
  },
  updated () {
    if (this.listConversation && this.listConversation.length) {
      const userIds = this.listConversation.map(el => el.userChat._id)
      window.socket.emit('getOnlineListUsers', { userIds })
      window.socket.on('listUserOnline', this.getListUserOnline)
    }
  },
  beforeDestroy () {
    window.socket.off('listUserOnline', this.getListUserOnline)
  },
  methods: {
    getListUserOnline (data) {
      this.listUserOnline = data.listUserOnline
      this.$store.commit('conversation/setListUserOnline', data.listUserOnline)
    },
    checkIsOnline (userId) {
      for (let i = 0; i < this.listUserOnline.length; i++) {
        if (this.listUserOnline[i].userId.toString() === userId.toString()) {
          return this.listUserOnline[i].isOnline
        }
      }
    }
  }
}
</script>
