<template>
  <div>
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
          <div class="bg-emerald-400 hover:bg-emerald-300  p-2 rounded-lg relative flex items-center overflow-hidden" @click="unBlockUserByUserId(item.userDetail._id, index)">
            Unblock
            <div v-if="(CurrentClick === index ? true : false) && isUnBlock" class="absolute left-0  w-full h-full bg-gray-200 opacity-40" />
            <Loading v-if="(CurrentClick === index ? true : false) && isUnBlock" />
          </div>
        </button>
      </div>
    </div>
    <div v-if="isEmpty" class="mt-4 text-base">
      You haven't blocked anyone
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
      list: [],
      data: {},
      currentPage: 1,
      load: false,
      countPage: null,
      isLoadMore: false,
      CurrentClick: null,
      isUnBlock: false,
      isEmpty: false
    }
  },
  async mounted () {
    await this.getListBlock(this.currentPage, 10, '')
    if (this.list.length <= 0) {
      this.isEmpty = true
    }
    window.addEventListener('scroll', this.loadMore)
  },
  methods: {
    async getListBlock (page, limit, search) {
      this.data = await this.$api.user.getListBlock({ page, limit, search })
      this.list = this.list.concat(this.data.data.listUserBlocked)
      this.countPage = this.data.data.detailPage.nextPage
      this.currentPage++
      this.load = true
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
        this.isUnBlock = true
        this.CurrentClick = index
        await this.$api.user.unBlockUserByUserId(id)
        this.isUnBlock = false
        this.CurrentClick = null
        this.refresh(index)
      } catch (error) {

      }
    }
  }
}
</script>
