<template>
  <div class="text-white w-full flex flex-col rounded-2xl">
    <div class=" w-full h-full rounded-lg grid grid-cols-8">
      <div class="col-span-6  rounded-xl">
        <div class="flex h-[60px] items-center   w-full rounded-xl space-x-2  mb-2">
          <div class="flex hover:bg-gray-700 rounded-lg justify-between gap-2 py-2 px-2 text-white font-medium cursor-pointer text-base " :class="$route.path.split('/')[1]==='explore' && $route.path.split('/')[2]!=='people' && $route.path.split('/')[2]!=='post' ? 'bg-gray-700': ''" @click="changeRoute('ALL')">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="currentColor"
                class="bi bi-globe-americas text-primary mt-[1.5px]"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
              </svg>
            </div>
            <p>ALL</p>
          </div>
          <div class="flex hover:bg-gray-700 rounded-lg justify-between gap-2 py-2 px-2 text-white font-medium cursor-pointer text-base" :class="$route.path.split('/')[2]==='post' ? 'bg-gray-700' :''" @click="changeRoute('POST')">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-file-post text-primary mt-[1.5px]"
                viewBox="0 0 16 16"
              >
                <path d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-8z" />
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
              </svg>
            </div>
            <p>Posts</p>
          </div>
          <div class="flex hover:bg-gray-700 rounded-lg justify-between gap-2 py-2 px-2 text-white font-medium cursor-pointer text-base" :class="$route.path.split('/')[2]==='people' ?'bg-gray-700' :''" @click="changeRoute('PEOPLE')">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                fill="currentColor"
                class="bi bi-person-fill text-primary mt-[1.5px]"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg>
            </div>
            <p>People</p>
          </div>
        </div>
        <div v-if="$route.path.split('/')[1]==='explore' && $route.path.split('/')[2]!=='people' && $route.path.split('/')[2]!=='post'">
          <div class="flex flex-col bg-gray_850 rounded-xl p-3">
            <p class="font-semibold text-[18px] text-white">
              People
            </p>
            <div v-if="users.length>0">
              <div v-for="(item,index) in users" :key="index" class="flex space-x-4 text-white font-medium items-center my-1 w-full  py-1  justify-between px-3">
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
            <div v-if="pageDetailUser.nextPage" class="flex w-full justify-center h-[36px] items-center rounded-md bg-gray-700 cursor-pointer my-[1px] font-medium hover:opacity-80" @click="changeRoute('PEOPLE')">
              See all
            </div>
          </div>
          <div class="flex-col flex mt-2">
            <div v-for="(item,index) in posts" :key="`${item._id}+${index}`" class="my-2">
              <Post :post="item" />
            </div>
          </div>
        </div>
        <nuxt-child v-if="$route.path.split('/')[2]==='people' || $route.path.split('/')[2]==='post'" />
      </div>
    </div>
  </div>
</template>

<script>
import Post from '~/components/post/Post.vue'
export default {
  components: { Post },
  data () {
    return {
      users: [],
      pageDetailUser: {},
      isLoadMore: false,
      isDebounce: null,
      isDisable: false
    }
  },
  computed: {
    avatar () {
      return this.$store.getters.avatar
    },
    posts () {
      return this.$store.getters['post/postSearch']
    },
    pageDetail () {
      return this.$store.getters['post/pageDetailPostSearch']
    }
  },
  //   watch: {
  //     '$route.query': {
  //       async  handler (newVal) {
  //         await this.searchGlobalUser({ limit: 5, page: 1, keyword: this.$route.query.keyword })
  //         await this.searchGlobalPost({ limit: 5, page: 1, isLoadMore: false, keyword: this.$route.query.keyword })
  //       }
  //     }
  //   },
  mounted () {
    if (this.$route.path.split('/')[1] === 'explore' && this.$route.path.split('/')[2] !== 'people' && this.$route.path.split('/')[2] !== 'post') {
      window.addEventListener('scroll', this.loadMore)
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.loadMore)
  },
  async created () {
    await this.searchGlobalUser({ limit: 5, page: 1, keyword: '' })
    await this.searchGlobalPost({ limit: 5, page: 1, isLoadMore: this.isLoadMore, keyword: '' })
  },
  methods: {
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
    changeRoute (type) {
      if (type === 'ALL') {
        this.$router.push({ path: '/explore', query: { keyword: '' } })
      }
      if (type === 'PEOPLE') {
        this.$router.push({ path: '/explore/people', query: { keyword: '' } })
      }
      if (type === 'POST') {
        this.$router.push({ path: '/explore/post', query: { keyword: '' } })
      }
    },
    loadMore () {
      try {
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          if (this.$route.path.split('/')[1] === 'explore' && this.$route.path.split('/')[2] !== 'people' && this.$route.path.split('/')[2] !== 'post' && this.pageDetail.nextPage && !this.isLoadMore) {
            if (!this.isLoadMore && this.pageDetail.nextPage && document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 120) {
              this.isLoadMore = true
              await this.searchGlobalPost({ limit: 5, page: this.pageDetail.nextPage, isLoadMore: true, keyword: '' })
              this.isLoadMore = false
            }
          }
        }, 300)
      } catch (err) {
        //
      }
    },
    async searchGlobalUser ({ limit, page, keyword }) {
      try {
        const userData = await this.$api.search.searchGlobalUserExplore({ limit, page, keyword, explore: 'explore' })
        this.users = userData.data.users
        this.pageDetailUser = userData.data.pageDetail
      } catch (err) {
        //
      }
    },
    async searchGlobalPost ({ limit, page, keyword, isLoadMore }) {
      try {
        if (this.$route.path.split('/')[1] === 'explore') {
          await this.$store.dispatch('post/searchGlobalPostExplore', { limit, page, keyword, isLoadMore })
        }
      } catch (err) {
        //
      }
    }
  }
}
</script>
