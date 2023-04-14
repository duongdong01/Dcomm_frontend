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
        <input class="min-w-[500px] h-[30px] pl-7 rounded-lg input_search text-sm bg-gray-700 text-white" type="input" placeholder="Search by name..." @input="searchFriend">
      </div>
      <div v-if="isLoaded" class="text-white mr-6 text-base">
        {{ search.length > 0 ? 'Total result' : 'Connected' }} : {{ pageDetail.totalDocs || 0 }} friend
      </div>
      <div v-if="!isLoaded" class="shadow  mr-6 text-base">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-md bg-gray-700 opacity-95 h-8 w-32" />
        </div>
      </div>
    </div>
    <div v-if="isLoaded" class="grid grid-cols-2 gap-4">
      <friend-item v-for="(item, index) in friends" :key="index" :friend="item" />
    </div>
    <div v-if="!isLoaded || isLoadMore" class="shadow grid grid-cols-2 gap-4 my-4">
      <div v-for="item in [0,1]" :key="item">
        <div class="animate-pulse flex space-x-4 p-3 bg-[#1c212e] rounded-md">
          <div class="rounded-md bg-gray-700 w-20 h-20 opacity-60" />
          <div class="py-1 items-center flex">
            <div class="bg-gray-700 rounded-md h-9 w-40 opacity-60" />
          </div>
        </div>
      </div>
    </div>
    <!-- <LoadingDot v-if="!isLoaded ||isLoadMore " class="transition-all ease-in-out" /> -->
  </div>
</template>

<script>
// import LoadingDot from '../loading/LoadingDot.vue'
import FriendItem from './FriendItem.vue'
export default {
  components: { FriendItem },
  data () {
    return {
      countFriends: 123,
      isLoaded: false,
      friends: [],
      pageDetail: {},
      pageFriend: 1,
      search: '',
      isLoadMore: false,
      isTyping: true,
      isDebounce: null
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
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 30) {
          if (this.pageDetail.nextPage && this.isLoadMore === false) {
            this.isLoadMore = true
            if (this.pageDetail.nextPage && (!this.search || !this.search.trim().length)) {
              await this.getListFriend(10, this.pageDetail.nextPage, this.search)
            }
            if (this.pageDetail.nextPage && this.search && this.search.trim().length) {
              await this.getListFriend(10, this.pageDetail.nextPage, this.search)
            }
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
        if (!keyword || !keyword.trim().length) {
          const userId = this.$route.params.id
          const friendData = await this.$api.friend.getListFriend({ userParam: userId, limit, page, keyword })
          this.pageDetail = friendData.data.detailPage
          if (this.isLoadMore) {
            this.friends.push(...friendData.data.friends)
          } else {
            this.friends = friendData.data.friends
          }
          this.isLoaded = true
          this.isLoadMore = false
        }
        if (keyword && keyword.trim().length) {
          const userId = this.$route.params.id
          const friendData = await this.$api.friend.getListFriend({ userParam: userId, limit, page, keyword })
          this.pageDetail = friendData.data.detailPage
          if (this.isLoadMore) {
            this.friends.push(...friendData.data.friends)
          } else {
            this.friends = friendData.data.friends
          }
          this.isLoaded = true
          this.isLoadMore = false
        }
      } catch (err) {
        this.isLoaded = false
        this.$toast.error(err.toString())
        this.$router.push('/')
      }
    },
    searchFriend (e) {
      try {
        this.isLoaded = false
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          this.search = e.target.value
          await this.getListFriend(10, 1, e.target.value)
          this.isLoaded = true
        }, 500)
      } catch (err) {
        //
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
