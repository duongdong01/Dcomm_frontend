<template>
  <div class="flex-col">
    <div v-if="listUserOnline.length" class="flex flex-col px-3 py-3 text-white text-base bg-gray_850 rounded-xl mb-3">
      <div class="flex justify-between">
        <p class="font-semibold">
          Contact
        </p>
        <!-- <i class="fa-solid fa-ellipsis text-white cursor-pointer" /> -->
      </div>
      <div v-for="(item,index) in listUserOnline" :key="index" class="flex flex-col mt-2 hover:bg-white/10 rounded-lg cursor-pointer py-1 transition-all">
        <div class="flex  items-center mx-1" @click="goToConversation(item)">
          <div class="relative">
            <img class="rounded-full w-11 h-11" :src="item.user.avatar" alt="photo">
            <div v-if="item.isOnline" class="rounded-full w-[10px] h-[10px] bg-green-400 top-[34px] right-1 absolute border border-gray-200" />
          </div>
          <div class="ml-4 font-medium">
            {{ item.user.fullname }}
          </div>
        </div>
      </div>
      <!-- <div class="flex justify-center w-full h-20 items-center text-gray-300">
        No contacts
      </div> -->
    </div>
    <div class="flex-col text-white rounded-xl text-base px-3 mb-5 bg-gray_850 pt-3 pb-2">
      <div class="flex justify-between">
        <p class="font-semibold">
          Who you may know
        </p>
        <!-- <i class="fa-solid fa-ellipsis text-white cursor-pointer" /> -->
      </div>
      <div v-if="isLoad">
        <div v-for="(item, index) in list" :key="index">
          <People :people="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import People from '../friends/People.vue'
export default {
  components: {
    People
  },
  data: function () {
    return {
      list: [],
      upHere: false,
      upHere2: false,
      isLoad: false,
      listUserOnline: []

    }
  },
  async created () {
    await this.getListPeopleRandom(4)
  },
  mounted () {
    window.socket.emit('user:friend-online')
    window.socket.on('user:friend-online', this.handleFriendOnline)
  },
  beforeDestroy () {
    window.socket.off('user:friend-online', this.handleFriendOnline)
  },
  methods: {
    goToConversation (item) {
      console.log(item)
    },
    async getListPeopleRandom (limit) {
      try {
        const tmp = await this.$api.user.getListPeopleRandom(limit)
        this.list = tmp.data.listPeople
        this.isLoad = true
      } catch (error) {

      }
    },
    handleFriendOnline (data) {
      console.log('on:', data.listUserOnline)
      this.listUserOnline = data.listUserOnline.slice(0, 6)
    }
  }
}
</script>
<style lang="scss">

</style>
