<template>
  <div class="grid grid-cols-8 w-full gap-6">
    <div class="col-span-6 min-h-[100vh]">
      <create-post class="mb-4" :on="on" />
      <Sort />
      <div>
        <div v-for="item in feeds" :key="item._id">
          <Post :post="item" />
        </div>
        <nuxt-child />
      </div>
    </div>
    <div class="col-span-2 flex">
      <MainRight class="rounded-2xl sticky top-7 " />
    </div>
  </div>
</template>
<script>

import MainRight from '@/components/main_layout/MainRight.vue'
import CreatePost from '~/components/post/CreatePost.vue'
import Post from '~/components/post/Post.vue'
import Sort from '~/components/sort-new/Sort.vue'
import { PostActionOn } from '@/constants/post'
export default {
  name: 'IndexPage',
  components: { MainRight, CreatePost, Post, Sort },
  data () {
    return {
      on: PostActionOn.PERSONAL,
      isLoadMore: false
    }
  },
  computed: {
    feeds () {
      console.log('change')
      return this.$store.getters['post/feeds']
    },
    pageDetail () {
      return this.$store.getters['post/pageDetail']
    }
  },
  mounted () {
    window.addEventListener('scroll', this.debounce(this.loadMore, 300))
  },
  async created () {
    await this.getPostFeed({ limit: 5, page: 1, isLoadMore: this.isLoadMore })
  },
  methods: {
    debounce (func, timeout = 300) {
      let timer
      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
      }
    },
    async getPostFeed ({ limit, page, isLoadMore }) {
      await this.$store.dispatch('post/getPostFeeds', { limit, page, isLoadMore })
    },
    async loadMore () {
      try {
        if (this.pageDetail.nextPage && !this.isLoadMore) {
          if (!this.isLoadMore && this.pageDetail.nextPage && document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 120) {
            this.isLoadMore = true
            await this.getPostFeed({ limit: 5, page: this.pageDetail.nextPage, isLoadMore: this.isLoadMore })
            this.isLoadMore = false
          }
        }
      } catch (err) {
        //
      }
    }
  }
}
</script>
