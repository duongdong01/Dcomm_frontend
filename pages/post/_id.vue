<template>
  <div class="grid grid-cols-8 w-full gap-6 mb-24 h-auto">
    <div class="col-span-6">
      <Post v-if="isLoaded" :post="post" class="w-full" :comment-list="comments" @fetchPostEdited="fetchPostById" />
      <div v-else class="border border-gray-700 shadow rounded-md p-4 mx-auto  w-full">
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
    </div>
  </div>
</template>

<script>
import Post from '~/components/post/Post.vue'
import { PostActionOn } from '@/constants/post'
export default {
  components: { Post },
  data: function () {
    return {
      PostActionOn,
      isLoaded: false,
      isLoadedComment: false
    }
  },
  computed: {
    comments () {
      return this.$store.getters['comment/comments']
    },
    post () {
      return this.$store.getters['post/postDetail']
    }
  },
  async created () {
    await this.getCommentByPostId(this.$route.params.id, 10, 1)
    await this.getPostById(this.$route.params.id)
  },
  methods: {
    async fetchPostById () {
      await this.getPostById(this.$route.params.id)
    },
    async getPostById (postId) {
      try {
        this.isLoaded = false
        await this.$store.dispatch('post/getPostById', { postId })
        this.isLoaded = true
      } catch (err) {
        //
        this.$toast.error('System error.', { timeout: 1500 })
        this.$router.push('/')
      }
    },
    async getCommentByPostId (postId, limit, page) {
      try {
        await this.$store.dispatch('comment/getCommentByPostId', { postId, limit, page })
      } catch (err) {
        //
      }
    }
  }
}
</script>
