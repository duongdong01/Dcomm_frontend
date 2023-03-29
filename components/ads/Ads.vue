<template>
  <div class="flex-col space-y-6">
    <div v-for="(item,index) in arr" :key="index" class="flex relative w-full h-40 filter rounded-xl overflow-hidden hover:brightness-110">
      <div class="w-full h-40">
        {{ item }}
        <img src="@/static/ads.jpeg" alt="ads" class="object-cover w-full h-full rounded-xl">
      </div>
      <div class="grid grid-cols-5 bg-[#5f6077]/90 absolute h-20 bottom-0 w-full items-center cursor-pointer">
        <div class="flex col-span-3 px-3 gap-3">
          <img src="@/static/ads2.jpeg" alt="photo" class="w-12 h-12 rounded-xl">
          <p class="font-semibold">
            InterNet Computer
          </p>
        </div>
        <div class="col-span-2 flex justify-end pr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    arr: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [1, 2, 3]
    }
  }
}

</script>

<style scoped>

</style>
