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
      <peopleBlock />
    </div>
    <div v-if="!isBlockPage">
      <peopleFollower />
    </div>
  </div>
</template>

<script>
import peopleBlock from '~/components/user-setting/peopleBlock.vue'
import peopleFollower from '~/components/user-setting/peopleFollower.vue'

export default {
  components: {
    peopleBlock, peopleFollower
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
