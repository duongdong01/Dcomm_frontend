<template>
  <div>
    <div class="w-[100%] h-[60px] mb-[24px] bg-edit flex justify-between items-center rounded-lg">
      <div class="flex relative items-center ml-6">
        <div class="absolute left-[4px] text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
        <input v-model="search" class="min-w-[500px] h-[30px] pl-7 rounded-lg input_search text-sm bg-gray-700 text-white" type="input" placeholder="Search by name..." @input="searchFriend">
      </div>
      <div class="text-white mr-6 text-base">
        Connected: {{ friends.length }} friend
      </div>
    </div>
    <div v-if="isLoaded" class="grid grid-cols-2 gap-4">
      <friend-item v-for="(item, index) in friends" :key="index" :friend="item" />
    </div>
    <div v-if="!isLoaded" class="grid grid-cols-2 gap-4">
      >
      <svg
        id="L5"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enable-background="new 0 0 0 0"
        xml:space="preserve"
        class="w-20 h-20"
      >
        <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 15 ; 0 -15; 0 15"
            repeatCount="indefinite"
            begin="0.1"
          />
        </circle>
        <circle fill="#fff" stroke="none" cx="30" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 10 ; 0 -10; 0 10"
            repeatCount="indefinite"
            begin="0.2"
          />
        </circle>
        <circle fill="#fff" stroke="none" cx="54" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 5 ; 0 -5; 0 5"
            repeatCount="indefinite"
            begin="0.3"
          />
        </circle>
      </svg>
    </div>
  </div>
</template>

<script>
import FriendItem from './FriendItem.vue'
export default {
  components: { FriendItem },
  data () {
    return {
      countFriends: 123,
      isLoaded: false,
      friends: [],
      search: ''
    }
  },
  async mounted () {
    await this.getListFriend(10, 1, '')
    console.log('hahaha', this.$route.params)
  },
  methods: {
    async getListFriend (limit, page, keyword) {
      try {
        const userId = this.$route.params.id
        const friendData = await this.$api.friend.getListFriend({ userParam: userId, limit, page, keyword })
        this.friends = friendData.data.friends
        this.isLoaded = true
      } catch (err) {
        this.isLoaded = false
        this.$router.push('/')
        console.log(err)
      }
    },
    async searchFriend (e) {
      try {
        this.isLoaded = false
        await this.getListFriend(10, 1, this.search)
        this.isLoaded = true
        console.log(this.search, e)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss">
    .input_search{
     @apply  border-gray-600 border focus:border-[0.1px] focus:border-blue-500
    }
    .input_search::placeholder{
      @apply text-sm
    }
    .bg-edit{
   background-color: rgb(28, 33, 46);
    }
</style>
