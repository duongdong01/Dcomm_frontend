<template>
  <div class=" rounded-xl">
    <div>
      <div class="flex flex-col  rounded-xl w-full p-3">
        <div v-if="users.length>0" class=" space-y-3 w-full ">
          <div v-for="(item,index) in users" :key="index" class="flex space-x-4 text-white font-medium items-center my-1 w-full  py-4 bg-gray_850 justify-between px-3 shadow-lg  rounded-lg">
            <div class="flex space-x-4  items-center">
              <nuxt-link :to="`/profile_detail/${item._id}`" tag="div">
                <img :src="item.avatar ||avatar" class="w-[60px] h-[60px] rounded-full object-cover cursor-pointer" alt="photo">
              </nuxt-link>
              <div class="flex flex-col">
                <nuxt-link class="text-white font-semibold hover:underline cursor-pointer text-[16px]" :to="`/profile_detail/${item._id}`" tag="div">
                  {{ item.fullname }}
                </nuxt-link>
                <div class="text-gray-400 font-normal text-[14px]">
                  {{ item.isFriend ? 'Friend' :'People' }}
                </div>
                <div v-if="item.mutualCount>0" class="flex items-center text-gray-400 font-normal text-[14px]">
                  {{ item.mutualCount }} mutual friends
                </div>
              </div>
            </div>

            <div class="flex space-x-4">
              <button v-if="!item.isFriend && !item.isPending && !item.isReceiver" :disabled="isDisable" class="relative overflow-hidden flex items-center rounded-lg px-3 py-2 h-11  duration-300 bg-indigo-600 hover:bg-indigo-500 transition-all ease-in-out border-indigo-600 gap-x-3 text-white text-[16px]" @click="createFriendRequest(item._id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-person-plus w-5 h-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                </svg>
                Add Friend
              </button>

              <button v-if="!item.isFriend && !item.isPending && item.isReceiver" :disabled="isDisable" class="relative overflow-hidden flex items-center rounded-lg px-3 py-2 h-11  duration-300 bg-indigo-600 hover:bg-indigo-500 transition-all ease-in-out border-indigo-600 gap-x-3 text-white text-[16px]" @click="acceptFriendRequestByUserId(item._id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-person-check-fill"
                  viewBox="0 0 16 16"
                >
                  <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                Accept
              </button>

              <button v-if="!item.isFriend && !item.isPending && item.isReceiver" :disabled="isDisable" class="relative overflow-hidden flex items-center rounded-lg px-3 py-2 h-11  duration-300 bg-gray-700 hover:bg-gray-600 border-gray-700 transition-all ease-in-out  gap-x-3 text-white text-[16px]" @click="refuseFriendRequestByUserId(item._id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-person-dash h-5 w-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                </svg>
                Refuse
              </button>

              <button v-if="item.isFriend" :disabled="isDisable" class="overflow-hidden relative flex items-center rounded-lg px-3 py-2 h-11  duration-300 border-[1px] bg-gray_850  transition-all ease-in-out border-indigo-600 gap-x-3 text-white text-[16px]" @click="removeFriendByUserId(item._id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-person-dash h-5 w-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                </svg>
                Unfriend
              </button>
              <button v-if="item.isPending " :disabled="item.isDisable" class="overflow-hidden relative flex items-center rounded-lg px-3 py-2 h-11  duration-300 bg-indigo-600 hover:bg-indigo-500 transition-all ease-in-out border-indigo-600 gap-x-3 text-white text-[16px]" @click="cancelFriendRequestByUserId(item._id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-person-dash w-5 h-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                </svg>
                Cancel request
              </button>
            </div>
          </div>
        </div>
        <div v-if="users.length===0" class="flex justify-center h-11 text-gray-400 font-semibold flex-col text-center text-[16px]">
          No People found
          <p>Try searching for something else</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: [],
      pageDetailUser: {},
      isLoadMorePeople: false,
      isDebounce: null,
      isDisable: false
      // posts: []
    }
  },
  computed: {
    avatar () {
      return this.$store.getters.avatar
    }
  },
  watch: {
    '$route.query': {
      async  handler (newVal) {
        await this.searchGlobalUser({ limit: 8, page: 1, keyword: '', isLoadMore: false })
      }
    }
  },
  mounted () {
    if (this.$route.path.split('/')[2] === 'people') {
      window.addEventListener('scroll', this.loadMorePeople)
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.loadMorePeople)
  },
  async created () {
    await this.searchGlobalUser({ limit: 8, page: 1, keyword: '' })
  },
  methods: {
    loadMorePeople () {
      try {
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          if (this.$route.path.split('/')[2] === 'people' && this.pageDetailUser.nextPage && !this.isLoadMore) {
            if (!this.isLoadMore && this.pageDetailUser.nextPage && document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 120) {
              this.isLoadMorePeople = true
              await this.searchGlobalUser({ limit: 8, page: this.pageDetailUser.nextPage, keyword: '', isLoadMore: true })
              this.isLoadMorePeople = false
            }
          }
        }, 300)
      } catch (err) {
        //
      }
    },
    async removeFriendByUserId (userId) {
      try {
        this.isDisable = true
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]._id.toString() === userId.toString()) {
            this.users[i].isFriend = false
          }
        }
        await this.$api.friend.removeFriendByUserId(userId)
        this.isDisable = false
      } catch (err) {
        this.$toast.error(err.data.message)
        this.isDisable = false
      }
    },
    async refuseFriendRequestByUserId (userId) {
      try {
        this.isDisable = true
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]._id.toString() === userId.toString()) {
            this.users[i].isReceiver = false
          }
        }
        await this.$api.friend.refuseFriendRequestByUserId(userId)
        this.isDisable = false
      } catch (err) {
        this.isDisable = false
      }
    },
    async createFriendRequest (userId) {
      try {
        this.isDisable = true
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]._id.toString() === userId.toString()) {
            this.users[i].isPending = true
          }
        }
        await this.$api.friend.createFriendRequest(userId)

        this.isDisable = false
      } catch (err) {
        this.isDisable = false
      }
    },
    async cancelFriendRequestByUserId (userId) {
      try {
        this.isDisable = true
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]._id.toString() === userId.toString()) {
            this.users[i].isPending = false
          }
        }
        await this.$api.friend.cancelFriendRequestByUserId(userId)
        this.isDisable = false
      } catch (err) {
        this.isDisable = false
      }
    },
    async acceptFriendRequestByUserId (userId) {
      try {
        this.isDisable = true
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]._id.toString() === userId.toString()) {
            this.users[i].isFriend = true
          }
        }
        await this.$api.friend.acceptFriendRequestByUserId(userId)
        this.isDisable = false
      } catch (err) {
        this.isDisable = false
      }
    },
    async searchGlobalUser ({ limit, page, keyword, isLoadMore }) {
      try {
        const userData = await this.$api.search.searchGlobalUserExplore({ limit, page, keyword, explore: 'explore' })
        if (isLoadMore) {
          this.users.push(...userData.data.users)
        } else {
          this.users = userData.data.users
        }
        this.pageDetailUser = userData.data.pageDetail
      } catch (err) {
        //
      }
    }
  }
}
</script>
