<template>
  <div class="bg-gray_850 text-white w-full grid grid-cols-1 rounded-2xl">
    <div class="flex justify-between min-h-[64px] items-center">
      <div class="ml-5 text-base">
        Followers
      </div>
      <div
        class="mr-5 p-2 bg-btn_hover opacity-80 hover:opacity-100 rounded-md cursor-pointer"
        @click="showFollower(false)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="currentColor"
          class="bi bi-x-lg"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
          />
        </svg>
      </div>
    </div>
    <div id="scrollFollower" class="overflow-y-scroll max-h-[700px] min-h-[100px] scroll-right-edit">
      <FollowerItem
        v-for="(item, index) in listFollower"
        :key="index"
        :follower="item"
        class="ml-5 mr-5"
        @updateFollower="fetchFollower"
      />
    </div>
    <div class="bg-gray_850 w-full h-8 rounded-2xl" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import FollowerItem from '~/components/friends/FollowerItem.vue'
export default {
  components: {
    FollowerItem
  },
  data () {
    return {
      listFollower: [],
      countPage: 1
    }
  },
  async mounted () {
    await this.getListFriendRequests(this.countPage, 10, '')
    document.getElementById('scrollFollower').addEventListener('scroll', this.loadMoreFollower)
  },
  methods: {
    ...mapMutations(['showFollower']),
    async getListFriendRequests (page, limit, keyword) {
      try {
        const dataFollower = await this.$api.friend.getListFriendRequests({ page, limit, keyword })
        this.listFollower = this.listFollower.concat(dataFollower.data.friendRequests)
        this.countPage = dataFollower.data.detailPage.nextPage
      } catch (error) {
        //
      }
    },
    fetchFollower (id) {
      this.listFollower = this.listFollower.filter(current => current._id.toString() !== id.toString())
    },
    loadMoreFollower () {
      const tmp = document.getElementById('scrollFollower')

      if (this.countPage !== null && tmp.scrollTop >= 100) {
        this.getListFriendRequests(this.countPage, 10, '')
      }
    }
  }
}
</script>

<style lang="scss">
.bg-gray_850 {
  background-color: rgb(28 33 46);
}

.scroll-right-edit::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #424242;
}

.scroll-right-edit::-webkit-scrollbar {
  width: 10px;
  background-color: #424242;
}

.scroll-right-edit::-webkit-scrollbar-thumb {
  background-color: #686868;
  border: 2px solid #686868;
}
</style>
