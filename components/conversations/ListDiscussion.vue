<template>
  <div class="flex flex-col mt-1 space-y-2">
    <!-- search -->
    <div class=" flex justify-center relative items-center" :class="isSearch ? '':'px-1'">
      <div v-if="isSearch" class="flex justify-center items-center w-10 h-10 cursor-pointer rounded-3xl hover:bg-drak_chat mr-1" @click="backSearch">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg>
      </div>
      <div class="relative flex w-full">
        <input
          v-model="search"
          type="text"
          placeholder="Search a conversation"
          class="bg-drak_chat rounded-full w-full py-2 pr-4 pl-8 outline-0"
          @click="showLayoutSearch"
          @input="searchFriend"
        >
        <i class="fa-solid fa-magnifying-glass text-gray-400 absolute ml-2  top-[11px] left-[1px]" />
      </div>
    </div>
    <div v-if="isSearch && search.trim().length>0" class="flex flex-col px-2">
      <div class="mb-1">
        Search conversation for "{{ search }}"
      </div>
      <div v-for="(item,index) in listFriend" :key="index" class="flex  space-x-3 items-center cursor-pointer hover:bg-drak_chat rounded-md p-2" @click="nextToChat(item.userDetail._id)">
        <div class="w-10 h-10 flex">
          <img :src="item.userDetail.avatar" alt="photo" class="w-10 h-10 rounded-full object-cover">
        </div>
        <div>{{ item.userDetail.fullname }}</div>
      </div>
      <div />
    </div>

    <!-- list discussion -->
    <div v-if="!isSearch" class="flex flex-col">
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
      listUserOnline: [],
      isSearch: false,
      search: '',
      listFriend: []
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
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
    async nextToChat (userId) {
      try {
        const conversationData = await this.$api.conversation.createConversation({ userIds: [this.userInfo._id, userId] })
        this.$router.push({ path: `/conversation/direct/${conversationData.data.data.conversation._id}` })
      } catch (error) {
      //
      }
    },
    showLayoutSearch () {
      this.isSearch = true
    },
    backSearch () {
      this.isSearch = false
      this.search = ''
    },
    async getListFriend ({ limit, page, keyword }) {
      try {
        if (keyword.length === 0) {
          this.listFriend = []
        } else {
          const friendData = await this.$api.friend.getListFriend({ userParam: this.userInfo._id, limit, page, keyword })
          this.listFriend = friendData.data.friends
        }
      } catch (err) {
        //
      }
    },
    searchFriend (e) {
      try {
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          this.search = e.target.value
          await this.getListFriend({ limit: 10, page: 1, keyword: e.target.value })
        }, 500)
      } catch (err) {
        //
      }
    },
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
