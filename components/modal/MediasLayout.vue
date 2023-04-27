<template>
  <div class="flex justify-center">
    <div class="flex absolute top-48 bottom-48 ">
      <div v-if="isImg">
        <img class="w-full h-full  object-cover" :src="album.url" alt="img">
      </div>
      <div v-if="!isImg">
        <video class="w-full h-full object-cover" controls="controls" preload="metadata">
          <source :src="album.url" type="video/mp4">
        </video>
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
    }
  },
  data () {
    return {
      isImg: true,
      albumData: null
    }
  },
  mounted () {
    if (this.album?.type === 'IMAGE') {
      this.isImg = true
    } else {
      this.isImg = false
    }
    document.querySelector('body').classList.add('disable-scroll')
  },
  destroyed () {
    document.querySelector('body').classList.remove('disable-scroll')
  },
  beforeUpdate () {
    if (this.album?.type === 'IMAGE') {
      this.isImg = true
    } else {
      this.isImg = false
    }
  }
}
</script>
<style lang="scss">
.disable-scroll {
  height: 100vh;
  overflow-y: hidden;
}
</style>
