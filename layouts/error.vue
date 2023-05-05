<template>
  <div class="flex w-full max-h-[100vh] h-screen flex-col">
    <div class=" fixed z-10 w-full flex justify-center bg-[#121212] border-[#303030] border-b-[1.5px]">
      <MainHeader class="max-w-[1400px] animation-default-header px-1" />
    </div>
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist." class="flex items-center h-[70vh] flex-col page-error">
      <template #extra>
        <nuxt-link class="bg-indigo-500 hover:bg-indigo-400 rounded-md text-white px-3 py-2" to="/" tag="button">
          Back Home
        </nuxt-link>
      </template>
    </a-result>
  </div>
</template>
<script>
import MainHeader from '~/components/main_layout/MainHeader.vue'
export default {
  components: { MainHeader },
  layout: 'empty',
  data () {
    return {}
  }
}
</script>

<style lang="scss">
.page-error{
    .ant-result-title{
        @apply text-white
    }
    .ant-result-subtitle{
        @apply text-white
    }
}
</style>
