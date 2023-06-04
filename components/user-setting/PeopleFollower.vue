<template>
  <div>
    <div v-if="load">
      <div
        v-for="(item, index) in listFollower"
        :key="index"
        class="flex justify-between p-2 my-3 bg-gray-700 rounded-lg"
      >
        <div class="flex ">
          <div class="rounded-full overflow-hidden">
            <img class="w-14 h-14 object-cover" :src="item.userSender.avatar" alt="">
          </div>
          <div class="flex items-center ml-3">
            <div>
              {{ item.userSender.fullname }}
            </div>
          </div>
        </div>
        <div class="flex justify-between">
          <button class="flex items-center">
            <div class="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-md cursor-pointer mr-2 relative flex items-center overflow-hidden" @click="acceptFriendRequestById(item._id, index)">
              Accept
              <div v-if="(CurrentClick === index ? true : false) && isAccept" class="absolute left-0 w-full h-full bg-gray-200 opacity-40" />
              <Loading v-if="(CurrentClick === index ? true : false) && isAccept" />
            </div>
          </button>
          <button class="flex items-center">
            <div class="bg-gray-500 hover:bg-gray-400 p-2 rounded-lg relative flex items-center overflow-hidden" @click="refuseFriendRequestById(item._id, index)">
              Refuse
              <div v-if="(CurrentClick === index ? true : false) && isRefuse" class="absolute left-0 w-full h-full bg-gray-200 opacity-40" />
              <Loading v-if="(CurrentClick === index ? true : false) && isRefuse" />
            </div>
          </button>
        </div>
      </div>
    </div>
    <div v-if="isEmpty" class="mt-4 text-base">
      You don't have any followers
    </div>
  </div>
</template>

<script>

import Loading from '~/components/loading/Loading.vue'

export default {
  components: {
    Loading
  },
  data () {
    return {
      listFollower: [],
      countPage: 1,
      isLoadMore: false,
      load: false,
      isAccept: false,
      isRefuse: false,
      isEmpty: false,
      CurrentClick: null
    }
  },
  async mounted () {
    await this.getListFriendRequests(this.countPage, 10, '')
    if (this.listFollower.length <= 0) {
      this.isEmpty = true
    }
    window.addEventListener('scroll', this.loadMore)
  },
  methods: {
    async getListFriendRequests (page, limit, keyword) {
      try {
        const dataFollower = await this.$api.friend.getListFriendRequests({ page, limit, keyword })
        this.listFollower = this.listFollower.concat(dataFollower.data.friendRequests)
        this.countPage = dataFollower.data.detailPage.nextPage
        this.load = true
      } catch (error) {
        //
      }
    },
    loadMore () {
      try {
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          if (this.countPage && !this.isLoadMore) {
            if (!this.isLoadMore && this.countPage && document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 10) {
              this.isLoadMore = true
              await this.getListFriendRequests(this.countPage, 10, '')
              this.isLoadMore = false
            }
          }
        }, 300)
      } catch (err) {
        //
      }
    },
    refresh (indexFollower) {
      this.listFollower = this.listFollower.filter((current, index) => index !== indexFollower)
    },
    async acceptFriendRequestById (item, index) {
      try {
        this.isAccept = true
        this.CurrentClick = index
        await this.$api.friend.acceptFriendRequestById(item)
        this.CurrentClick = null
        this.isAccept = false
        this.refresh(index)
      } catch (error) {

      }
    },
    async refuseFriendRequestById (item, index) {
      try {
        this.isRefuse = true
        this.CurrentClick = index
        await this.$api.friend.refuseFriendRequestById(item)
        this.CurrentClick = null
        this.isRefuse = false
        this.refresh(index)
      } catch (error) {

      }
    }
  }
}
</script>
