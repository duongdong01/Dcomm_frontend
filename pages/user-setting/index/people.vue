<template>
  <div class="bg-gray_850 w-full ">
    <div class="text-lg inline-block border-b-2">
      People Blocked
    </div>
    <div v-if="load">
      <div v-for="(item, index) in list" :key="index" class="flex justify-between p-2 my-3 bg-gray-700 rounded-lg">
        <div class="flex ">
          <div class="rounded-full overflow-hidden">
            <img class="w-14 h-14 object-cover" :src="item.userDetail.avatar" alt="">
          </div>
          <div class="flex items-center ml-3">
            <div>
              {{ item.userDetail.fullname }}
            </div>
          </div>
        </div>
        <button class="flex items-center">
          <div class="bg-emerald-400 p-2 rounded-lg" @click="unBlockUserByUserId(item.userDetail._id, index)">
            Unblock
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      list: [],
      data: {},
      currentPage: 1,
      load: false,
      countPage: null,
      isLoadMore: false
    }
  },
  async mounted () {
    await this.getListBlock(this.currentPage, 10, '')
    window.addEventListener('scroll', this.loadMore)
  },
  methods: {
    async getListBlock (page, limit, search) {
      this.data = await this.$api.user.getListBlock({ page, limit, search })
      this.list = this.list.concat(this.data.data.listUserBlocked)
      this.countPage = this.data.data.detailPage.nextPage
      this.load = true
      this.currentPage++
    },
    loadMore () {
      try {
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          if (this.countPage && !this.isLoadMore) {
            if (!this.isLoadMore && this.countPage && document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 10) {
              this.isLoadMore = true
              await this.this.getListBlock(this.currentPage, 10, '')
              this.isLoadMore = false
            }
          }
        }, 300)
      } catch (err) {
        //
      }
    },
    refresh (indexBlock) {
      this.list = this.list.filter((current, index) => index !== indexBlock)
    },
    async unBlockUserByUserId (id, index) {
      try {
        await this.$api.user.unBlockUserByUserId(id)
        this.refresh(index)
      } catch (error) {

      }
    }
  }
}
</script>
