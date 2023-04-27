<template>
  <div class="flex h-full" @click="displayDetail">
    <img v-if="isImg" class="w-full h-full object-cover" :src="album.url" alt="img">
    <div v-if="!isImg" class="relative" @click="toggleButton">
      <video class="w-full h-full object-cover" preload="metadata">
        <source :src="album.url" type="video/mp4">
      </video>
      <div v-if="!active" class="absolute z-2 top-[45%] left-[45%] text-white border-solid border-white border-1 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-caret-right"
          viewBox="0 0 16 16"
        >
          <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
        </svg>
      </div>
      <div v-if="active" class="absolute z-2 top-[45%] left-[45%] text-white border-solid border-white border-1 rounded-full">
        <svg
          width="22"
          height="22"
          version="1.1"
          viewBox="0 0 36 36"
          fill="currentColor"
        >
          <path id="ytp-id-159" class="ytp-svg-fill" d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    album: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isImg: false,
      active: false
    }
  },
  mounted () {
    if (this.album.type === 'IMAGE') {
      this.isImg = true
    }
  },
  methods: {
    toggleButton () {
      this.active = !this.active
    },
    displayDetail () {
      this.$emit('updateIndex', this.index)
    }
  }
}
</script>
