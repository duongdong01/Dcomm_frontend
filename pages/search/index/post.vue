<template>
  <div class="text-white w-full flex flex-col rounded-2xl">
    <div class="flex-col flex mt-2">
      <div v-for="(item,index) in posts" :key="`${item._id}+${index}`" class="my-2">
        <Post :post="item" />
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
  watch: {
    '$route.query': {
      async  handler (newVal) {
        await this.searchGlobalPost({ limit: 5, page: 1, isLoadMore: false, keyword: this.$route.query.keyword })
      }
    }
  },
  mounted () {
    if (this.$route.path.split('/')[2] === 'post') {
      window.addEventListener('scroll', this.loadMore)
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.loadMore)
  },
  async created () {
    await this.searchGlobalPost({ limit: 5, page: 1, isLoadMore: this.isLoadMore, keyword: this.$route.query.keyword })
  },
  methods: {
    loadMore () {
      try {
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          if (this.$route.path.split('/')[2] === 'post' && this.pageDetail.nextPage && !this.isLoadMore) {
            if (!this.isLoadMore && this.pageDetail.nextPage && document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 120) {
              this.isLoadMore = true
              await this.searchGlobalPost({ limit: 5, page: this.pageDetail.nextPage, isLoadMore: true, keyword: this.$route.query.keyword })
              this.isLoadMore = false
            }
          }
        }, 300)
      } catch (err) {
        //
      }
    },
    async searchGlobalPost ({ limit, page, keyword, isLoadMore }) {
      try {
        if (this.$route.path.split('/')[1] === 'search') {
          await this.$store.dispatch('post/searchGlobalPost', { limit, page, keyword, isLoadMore })
        }
      } catch (err) {
        //
      }
    }
  }
}
</script>
