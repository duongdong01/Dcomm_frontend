<template>
  <div v-if="isShow" class="fixed w-full h-full z-20 bg-black/80 flex justify-center items-center top-0 left-0">
    <div class="right-4 top-4 absolute w-10 h-10 bg-gray-700 cursor-pointer flex justify-center items-center rounded-full" @click="hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        fill="currentColor"
        class="bi bi-x-lg text-white z-20"
        viewBox="0 0 16 16"
      >
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
      </svg>
    </div>
    <div class="flex justify-center items-center">
      <img v-if="imageWatch.type==='IMAGE'" :src="imageWatch.url" alt="photo" class="min-h-[200px] max-h-[80vh]">
      <video v-else class="w-full h-full object-cover" controls="controls" preload="metadata">
        <source :src="imageWatch.url" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isShow: false,
      imageWatch: this.image
    }
  },
  watch: {
    image () {
      this.imageWatch = this.image
    }
  },
  methods: {
    show () {
      this.isShow = true
    },
    hidden () {
      this.isShow = false
    }
  }
}
</script>
