<template>
  <div class="grid grid-cols-8 w-full gap-6 mb-24 h-auto">
    <div class="col-span-6">
      <Post v-if="isLoaded" :post="post" class="w-full" :comment-list="comments" @fetchPostEdited="fetchPostById" />
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
      // post: {},
      isLoaded: false,
      // comments: [],
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
