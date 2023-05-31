<template>
  <div ref="home" class="grid grid-cols-8 w-full gap-6">
    <div class="lg:col-span-6 min-h-[100vh] col-span-7">
      <create-post class="mb-4" :on="on" />
      <Sort @sort="sortPost" />
      <div>
        <div v-if="isLoaded && feeds.length >0 && $route.path==='/'">
          <Post v-for="(item,index) in feeds" :key="`${item._id}+${index}`" :post="item" />
        </div>
        <div v-if="!isLoaded" class="border border-gray-700 shadow rounded-md p-4 mx-auto mt-4 w-full">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-200 h-12 w-12" />
            <div class="flex-1 space-y-4 py-1">
              <div class="h-9 w-36 bg-slate-200 rounded mt-1" />
              <div class="space-y-3">
                <div class="h-24 bg-slate-200 rounded" />
                <div class="flex w-full space-x-6">
                  <div class="h-4 bg-slate-200 rounded w-20" />
                  <div class="h-4 bg-slate-200 rounded w-20" />
                  <div class="h-4 bg-slate-200 rounded w-20" />
                  <div class="h-4 bg-slate-200 rounded w-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="feeds.length===0 &&isLoaded" class=" w-full flex justify-center items-center h-20 text-[18px] text-gray-400 font-medium bg-gray_850 mt-4 rounded-xl">
          No Content
        </div>
      </div>
    </div>
    <div class="col-span-2 lg:flex hidden">
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
      type: 'ALL',
      sort: 'CREATED_AT',
      isLoaded: false
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
    if (this.$route.path === '/') {
      window.addEventListener('scroll', this.loadMore)
    }
    if (this.$route.path.split('/')[1] === 'following') {
      window.addEventListener('scroll', this.loadMore)
    }
  },
  async created () {
    this.isLoaded = false
    await this.getPostFeed({ limit: 5, page: 1, type: this.type, sort: this.sort, isLoadMore: this.isLoadMore })
    this.isLoaded = true
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
      if (this.$route.path === '/') {
        await this.$store.dispatch('post/getPostFeeds', { limit, page, sort, type, isLoadMore })
      }
    },
    loadMore () {
      try {
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          if (this.$route.path === '/' && this.pageDetail.nextPage && !this.isLoadMore) {
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
