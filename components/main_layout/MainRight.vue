<template>
  <div class="flex justify-center w-full rounded-2xl">
    <div class="w-full flex flex-col  rounded-xl">
      <div class=" mb-2">
        <!-- <Trend /> -->
        <SubRight />
      </div>
    </div>
  </div>
</template>

<script>
// import Trend from '../trending/Trending.vue'
import SubRight from '../post/SubRight.vue'
// import SearchHeader from '../search/SearchHeader.vue'
export default {
  components: {
    //  Trend ,
    SubRight
  }
}
</script>

<style lang="scss">
</style>
