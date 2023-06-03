<template>
  <div class="bg-gray_850 w-full min-h-[856px]">
    <div class="flex">
      <div class="text-lg inline-block cursor-pointer" :class="isBlockPage ? 'border-b-2' : '' " @click="goPage">
        People Blocked
      </div>
      <div class="text-lg inline-block ml-4 cursor-pointer" :class="isBlockPage ? '' : 'border-b-2'" @click="goPage">
        People Follower
      </div>
    </div>
    <div v-if="isBlockPage">
      <PeopleBlock />
    </div>
    <div v-if="!isBlockPage">
      <PeopleFollower />
    </div>
  </div>
</template>

<script>
import PeopleBlock from '~/components/user-setting/PeopleBlock.vue'
import PeopleFollower from '~/components/user-setting/PeopleFollower.vue'

export default {
  components: {
    PeopleBlock, PeopleFollower
  },
  data () {
    return {
      list: [],
      data: {},
      currentPage: 1,
      load: false,
      countPage: null,
      isLoadMore: false,
      isBlockPage: true
    }
  },
  methods: {
    goPage () {
      this.isBlockPage = !this.isBlockPage
    }
  }
}
</script>
