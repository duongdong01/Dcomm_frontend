<template>
  <div class="mb-5">
    <AlbumList
      v-if="isLoad"
      ref="abc"
      :listalbum="list"
      :count-list="list.length"
      :owner="isOwner"
      @loadMoreNext="load"
    />
  </div>
</template>

<script>
import AlbumList from '~/components/album/AlbumList.vue'
export default {
  components: { AlbumList },
  data () {
    return {
      list: [],
      countPage: 1,
      isLoad: false,
      isLoadMore: false,
      isDebounce: null,
      isOwner: false
    }
  },
  async mounted () {
    await this.getListMedias('', 1, 8)
    document.addEventListener('scroll', this.loadMore)
  },
  methods: {
    async getListMedias (userId, page, limit) {
      try {
        userId = this.$route.params.id
        const listAlbum = await this.$api.user.getListMedias({ userId, page, limit })
        this.isOwner = listAlbum.data.isOwner
        this.list = this.list.concat(listAlbum.data.files)
        if (listAlbum.data.nextPage !== null) {
          this.countPage = listAlbum.data.pageDetail.nextPage
        }
        this.isLoad = true
      } catch (error) {

      }
    },
    loadMore () {
      try {
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          if (this.countPage && !this.isLoadMore) {
            if (!this.isLoadMore && this.countPage && document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 30) {
              this.isLoadMore = true
              await this.getListMedias('', this.countPage, 8)
              this.isLoadMore = false
            }
          }
        }, 300)
      } catch (err) {
        //
      }
    },
    async load () {
      await this.getListMedias('', this.countPage, 8)
      this.$refs.abc.nextIndex()
    }
  }
}
</script>

<style lang="scss">

</style>
