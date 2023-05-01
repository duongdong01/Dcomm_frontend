<template>
  <div ref="home" class="grid grid-cols-8 w-full gap-6">
    <div class="col-span-6 min-h-[100vh]">
      <create-post class="mb-4" :on="on" />
      <Sort @sort="sortPost" />
      <div>
        <div v-if="feeds.length >0 && $route.path.split('/')[1]==='following'">
          <Post v-for="(item,index) in feeds" :key="`${item._id}+${index}`" :post="item" />
        </div>
        <div v-if="feeds.length===0" class=" w-full flex justify-center items-center h-20 text-[18px] text-gray-400 font-medium bg-gray_850 mt-4 rounded-xl">
          No Content
        </div>
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
      isLoadMore: false,
      isDebounce: null,
      count: 0,
      type: 'FRIEND',
      sort: 'CREATED_AT'
    }
  },
  computed: {
    feeds () {
      return this.$store.getters['post/feeds']
    },
    pageDetail () {
      return this.$store.getters['post/pageDetail']
    }
  },
  watch: {

  },
  mounted () {
    if (this.$route.path.split('/')[1] === 'following') {
      window.addEventListener('scroll', this.loadMore)
    }
  },
  async created () {
    await this.getPostFeed({ limit: 5, page: 1, type: this.type, sort: this.sort, isLoadMore: this.isLoadMore })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.loadMore)
  },
  methods: {
    async sortPost (sort) {
      this.sort = sort
      await this.getPostFeed({ limit: 5, page: 1, sort: this.sort, type: this.type, isLoadMore: false })
    },
    debounce (func, timeout = 300) {
      let timer
      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
      }
    },
    async getPostFeed ({ limit, page, sort, type, isLoadMore }) {
      if (this.$route.path.split('/')[1] === 'following') {
        await this.$store.dispatch('post/getPostFeeds', { limit, page, sort, type: 'FRIEND', isLoadMore })
      }
    },
    loadMore () {
      try {
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          if (this.$route.path.split('/')[1] === 'following' && this.pageDetail.nextPage && !this.isLoadMore) {
            if (!this.isLoadMore && this.pageDetail.nextPage && document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 120) {
              this.isLoadMore = true
              await this.getPostFeed({ limit: 5, page: this.pageDetail.nextPage, isLoadMore: this.isLoadMore, sort: this.sort, type: this.type })
              this.isLoadMore = false
            }
          }
        }, 300)
      } catch (err) {
        //
      }
    }
  }
}
</script>
