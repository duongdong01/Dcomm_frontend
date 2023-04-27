<template>
  <div class="grid grid-cols-8 w-full gap-6 mb-24 h-auto">
    <div class="col-span-6">
      <Post v-if="isLoaded" :post="post" class="w-full" :comment-list="comments" />
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
      post: {},
      isLoaded: false,
      comments: [],
      isLoadedComment: false
    }
  },
  async created () {
    await this.getPostById(this.$route.params.id)
    await this.getCommentByPostId(this.$route.params.id, 10, 1)
  },
  methods: {
    async getPostById (postId) {
      try {
        this.isLoaded = false
        const postData = await this.$api.post.getPostById(postId)
        this.post = postData.data.post
        this.isLoaded = true
      } catch (err) {
        //
        this.$toast.error('System error.', { timeout: 1500 })
        this.$router.push('/')
      }
    },
    async getCommentByPostId (postId, limit, page) {
      try {
        this.isLoadedComment = false
        const commentData = await this.$api.comment.getCommentByPostId({ postId, limit, page })
        this.comments.push(...commentData.data.comments)
        console.log(this.comments)
        this.isLoadedComment = true
      } catch (err) {
        //
      }
    }
  }
}
</script>
