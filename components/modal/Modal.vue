<template>
  <div class="fixed flex justify-center items-center w-full h-full z-20 modal-open">
    <div class="flex justify-center items-center w-full h-full  absolute bg-black opacity-60" />
    <div class="pb-4 share-post space-y-3 max-w-lg max-h-[740px] w-[512px] flex flex-col text-white min-h-[260px] bg-gray_850 absolute rounded-lg shadow-lg border border-gray-700  lg:-mt-10 md:-mt-5" />
  </div>
</template>

<script>
export default {
  mounted () {
    document.querySelector('body').classList.add('disable-scroll')
  },
  destroyed () {
    document.querySelector('body').classList.remove('disable-scroll')
  }
}
</script>
