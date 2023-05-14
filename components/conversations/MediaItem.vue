<template>
  <div class="flex">
    <img v-if="media.conversationFile.type==='IMAGE'" :src="media.conversationFile.url" alt="photo" class="object-cover cursor-pointer">
    <video v-if="media.conversationFile.type==='VIDEO'" controls="controls" preload="metadata" class=" object-cover h-[106px] w-[106px] cursor-pointer">
      <source :src="media.conversationFile.url" type="video/mp4">
    </video>
  </div>
</template>

<script>

export default {
  props: {
    media: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
  }
}
</script>
