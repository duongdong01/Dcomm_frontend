<template>
  <div class="grid grid-cols-8 w-full gap-6 mb-3">
    <div class="col-span-6">
      <Post v-if="isLoaded" :post="post" class="w-full" />
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
      isLoaded: false
    }
  },
  async created () {
    await this.getPostById(this.$route.params.id)
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
    }
  }
}
</script>
