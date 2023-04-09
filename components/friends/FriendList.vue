<template>
  <div id="friends flex flex-col">
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
        {{ search.length > 0 ? 'Total result' : 'Connected' }} : {{ pageDetail.totalDocs || 0 }} friend
      </div>
    </div>
    <div v-if="isLoaded" class="grid grid-cols-2 gap-4">
      <friend-item v-for="(item, index) in friends" :key="index" :friend="item" />
    </div>
    <LoadingDot v-if="!isLoaded ||isLoadMore " />
  </div>
</template>

<script>
import LoadingDot from '../loading/LoadingDot.vue'
import FriendItem from './FriendItem.vue'
export default {
  components: { FriendItem, LoadingDot },
  data () {
    return {
      countFriends: 123,
      isLoaded: false,
      friends: [],
      pageDetail: {},
      pageFriend: 1,
      search: '',
      isLoadMore: false
    }
  },
  async mounted () {
    window.addEventListener('scroll', this.debounce(this.loadMore, 300))
    await this.getListFriend(10, 1, this.search)
  },
  methods: {
    debounce (func, timeout = 300) {
      this.isLoadMore = true
      let timer
      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
      }
    },
    async loadMore () {
      try {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 10) {
          if (this.pageDetail.nextPage) {
            this.isLoadMore = true
            await this.getListFriend(10, this.pageDetail.nextPage, this.search)
            this.isLoadMore = false
          }
        } else {
          //
        }
      } catch (err) {
        this.isLoadMore = false
      }
    },
    async getListFriend (limit, page, keyword) {
      try {
        if (keyword || !keyword.trim().length) {
          const userId = this.$route.params.id
          const friendData = await this.$api.friend.getListFriend({ userParam: userId, limit, page, keyword })
          this.friends.push(...friendData.data.friends)
          if (this.pageDetail.prevPage !== friendData.data.detailPage.prevPage) {
            this.pageDetail = friendData.data.detailPage
          }
          this.isLoaded = true
        } else {
          const userId = this.$route.params.id
          this.friends = []
          this.pageDetail = {}
          const friendData = await this.$api.friend.getListFriend({ userParam: userId, limit, page, keyword })
          this.friends = friendData.data.friends
          if (this.pageDetail.prevPage !== friendData.data.detailPage.prevPage) {
            this.pageDetail = friendData.data.detailPage
          }
          this.isLoaded = true
        }
      } catch (err) {
        this.isLoaded = false
        this.$router.push('/')
        console.log(err)
      }
    },
    async searchFriend (e) {
      try {
        this.isLoaded = false
        this.friends = []
        await this.getListFriend(10, 1, this.search)
        this.isLoaded = true
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
