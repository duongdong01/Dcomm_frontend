<template>
  <div class="fixed w-full h-full blur-edit z-10 grid grid-cols-10">
    <FollowerList class="absolute top-36 col-start-4 col-end-8" />
  </div>
</template>
<script>
import FollowerList from '~/components/friends/FollowerList.vue'
export default {
  components: {
    FollowerList
  }
}
</script>
<style lang="scss">
.blur-edit{
  backdrop-filter: blur(4px);
    filter: blur(0);
}
</style>
