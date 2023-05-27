<template>
  <div>
    <div v-if="typeMedia==='MEDIA'" class="grid grid-cols-3 gap-1">
      <div v-for="(item,index) in medias" :key="index" class="flex overflow-hidden" @click="showImage(item)">
        <MediaItem :media="item" />
      </div>
    </div>
    <div v-else class="flex flex-col space-y-2 h-full w-full">
      <div v-for="(item,index) in medias" :key="index">
        <File :file="item" />
      </div>
    </div>
    <MediaFile ref="mediaFiles" :image="file" class="z-20" />
  </div>
</template>
<script>
import MediaFile from '../modal/MediaFile.vue'
import MediaItem from './MediaItem.vue'
import File from './File.vue'
export default {
  components: { MediaItem, File, MediaFile },
  props: {
    medias: {
      type: Array,
      default: () => []
    },
    typeMedia: {
      type: String,
      default: () => String
    }
  },
  data () {
    return {
      file: null
    }
  },
  methods: {
    showImage (item) {
      this.file = item.conversationFile
      this.$refs.mediaFiles.show()
    }
  }
}</script>
