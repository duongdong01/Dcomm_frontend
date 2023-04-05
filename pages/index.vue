<template>
  <div class="grid grid-cols-8 w-full gap-6">
    <div class="col-span-6">
      <create-post v-if="isLogin" class="mb-4" />
      <Sort />
      <div>
        <Post />
        <nuxt-child />
      </div>
    </div>
    <div class="col-span-2 flex">
      <MainRight class="rounded-2xl " />
    </div>
  </div>
</template>
<script>

import MainRight from '@/components/main_layout/MainRight.vue'
import CreatePost from '~/components/post/CreatePost.vue'
import Post from '~/components/post/Post.vue'
import Sort from '~/components/sort-new/Sort.vue'
export default {
  name: 'IndexPage',
  components: { MainRight, CreatePost, Post, Sort },
  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    }
  }
}
</script>

<style lang="scss">

</style>
