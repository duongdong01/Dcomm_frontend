<template>
  <div
    class="flex h-full w-full text-white"
    @click="displayDetail"
    @mouseover="upHere = true"
    @mouseleave="upHere = false"
  >
    <div v-if="album.type==='IMAGE'" class="relative w-full h-full">
      <img class="w-full h-full object-cover" :src="album.url" alt="img">
      <div v-if="upHere && isview && owner" class="absolute top-2 right-2 z-2 bg-gray-700 rounded-full " @click.stop="messeage">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          class="bi bi-x-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
    </div>
    <div v-else class="relative" @click="toggleButton">
      <video class="w-full h-full object-cover" preload="metadata">
        <source :src="album.url" type="video/mp4">
      </video>
      <div
        v-if="!active"
        class="absolute z-2 top-[45%] left-[45%] text-white border-solid border-white border-1 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-caret-right"
          viewBox="0 0 16 16"
        >
          <path
            d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
          />
        </svg>
      </div>
      <div
        v-if="active"
        class="absolute z-2 top-[45%] left-[45%] text-white border-solid border-white border-1 rounded-full"
      >
        <svg width="22" height="22" version="1.1" viewBox="0 0 36 36" fill="currentColor">
          <path id="ytp-id-159" class="ytp-svg-fill" d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z" />
        </svg>
      </div>
      <div v-if="upHere && isview && owner" class="absolute top-2 right-2 z-2 bg-gray-700 rounded-full" @click.stop="messeage">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          class="bi bi-x-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
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
      default: () => { }
    },
    index: {
      type: Number,
      default: 0
    },
    isview: {
      type: Boolean,
      default: false
    },
    owner: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isImg: false,
      active: false,
      upHere: false
    }
  },
  methods: {
    toggleButton () {
      this.active = !this.active
    },
    displayDetail () {
      this.$emit('updateIndex', this.index)
    },
    messeage () {
      this.$emit('earseAlbum', this.index)
    }
  }
}
</script>
