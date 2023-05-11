<template>
  <div>
    <div class="rounded-xl text-white bg-gray_850 px-3 py-3 mt-4 border border-gray-700 ">
      <div class="text-base mb-3">
        Photos and Videos
      </div>
      <div v-if="isLoad" class="grid grid-cols-4 gap-1">
        <div v-for="(item, index) in list" :key="index">
          <AlbumItem :album="item" :index="index" class="col-span-1 overflow-hidden rounded-md w-full cursor-pointer h-[263px]" @earseAlbum="messageDisplay" @updateIndex="displayAlbumDetail" />
        </div>
      </div>
    </div>
    <div v-if="messageErase" class="fixed top-0 left-0 w-full h-full z-10">
      <MessageErase @deleteAlbum="deleteAlbum" @holdAlbum="holdAlbum" />
    </div>
    <div v-if="indexDisplay != null" class="fixed w-full h-full top-0 left-0 background-edit z-10 text-white">
      <button class="absolute z-50 top-4 right-4 cursor-pointer" @click="hiddenAlbum">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-x-lg"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        </svg>
      </button>
      <button class="absolute top-1/2 left-4 cursor-pointer" @click="prevAlbum">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
        </svg>
      </button>
      <MediasLayout :album="listalbum[indexDisplay]" />
      <button class="absolute top-1/2 right-4 cursor-pointer" @click="nextAlbum">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>

import AlbumItem from '~/components/album/AlbumItem.vue'
import MediasLayout from '~/components/modal/MediasLayout.vue'
import MessageErase from '~/components/modal/MessageErase.vue'
export default {
  components: {
    AlbumItem,
    MediasLayout,
    MessageErase
  },
  props: {
    listalbum: {
      type: Array,
      default: () => []
    },
    countList: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      list: [],
      indexDisplay: null,
      messageErase: false,
      indexDelete: null,
      isLoad: false
    }
  },
  watch: {
    listalbum () {
      this.list = this.listalbum
    }
  },
  beforeMount () {
    this.list = this.listalbum
    this.isLoad = true
  },
  methods: {
    displayAlbumDetail (e) {
      this.indexDisplay = e
    },
    hiddenAlbum () {
      this.indexDisplay = null
    },
    prevAlbum () {
      if (this.indexDisplay !== 0) {
        this.indexDisplay--
      }
    },
    nextAlbum () {
      if (this.indexDisplay === this.countList - 1) {
        this.$emit('loadMoreNext', true)
      } else if (this.indexDisplay >= this.countList) {
        this.indexDisplay = this.countList
      } else {
        this.indexDisplay++
      }
    },
    nextIndex () {
      this.indexDisplay++
    },
    messageDisplay (e) {
      this.messageErase = true
      this.indexDelete = e
    },
    async deleteAlbum () {
      try {
        this.messageErase = false
        const tmp = this.listalbum[this.indexDelete].albumFileDetail
        const listFilesDelet = [{ fileId: tmp.fileId, albumId: tmp.albumId }]
        const listdel = { listFilesDelete: listFilesDelet }
        this.refresh()
        await this.$api.user.earseAlbum(listdel)
      } catch (error) {

      }
    },
    holdAlbum () {
      this.messageErase = false
    },
    refresh () {
      this.list = this.list.filter((current, index) => index !== this.indexDelete)
    }
  }

}

</script>

<style lang="scss">
.border-1 {
    border-width: 1.5px;
}
.background-edit {
  background-color: #000000b4;
}

</style>
