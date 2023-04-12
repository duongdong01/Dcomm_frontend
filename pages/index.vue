<template>
  <div class="grid grid-cols-8 w-full gap-6">
    <div class="col-span-6">
      <create-post class="mb-4" :on="on" />
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
import { PostActionOn } from '@/constants/post'
export default {
  name: 'IndexPage',
  components: { MainRight, CreatePost, Post, Sort },
  data () {
    return {
      on: PostActionOn.PERSONAL
    }
  }
}
</script>
