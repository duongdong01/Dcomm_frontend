<template>
  <div class="max-h-[86.5vh]">
    <div v-if="!isShowMediaFile">
      <div class="flex flex-col content-center items-center mt-6">
        <div class="py-2">
          <div class="relative">
            <div class="rounded-full overflow-hidden">
              <img class="w-[100px] h-[100px] object-cover" :src="user.avatar" alt="photo">
            </div>
            <div v-if="isOnline" class="w-4 h-4 right-2 bottom-[2px]  bg-green-600 absolute rounded-full border-[1.8px] border-black" />
          </div>
        </div>
        <div class="font-semibold text-lg cursor-pointer">
          {{ user.fullname }}
        </div>
        <div class="text-sm opacity-80">
          {{ isOnline ? 'Active now' :'Offline' }}
        </div>
        <div class="flex py-8">
          <div class="flex flex-col">
            <div class="flex flex-col text-center">
              <nuxt-link class="w-12 h-12 rounded-full flex justify-center items-center bg-gray-500 cursor-pointer" :to="`/profile_detail/${user._id}`" tag="div">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-person-circle text-white"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </nuxt-link>
              Profile
            </div>
          </div>
        </div>
      </div>
      <div class="ml-[32px]">
        <div class="flex flex-col">
          <div class="flex justify-between p-[10px] rounded-lg hover:bg-gray-800 cursor-pointer" @click="isKeyThree = !isKeyThree">
            <div class=" text-base">
              Media, files
            </div>
            <div>
              <svg
                v-if="!isKeyThree"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
              <svg
                v-if="isKeyThree"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-chevron-up"
                viewBox="0 0 16 16"
              >
                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
              </svg>
            </div>
          </div>
          <div v-if="isKeyThree">
            <div class="flex p-[10px] rounded-lg hover:bg-gray-800 cursor-pointer" @click="showMediaFile('MEDIA')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-images"
                viewBox="0 0 16 16"
              >
                <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
              </svg>
              <div class="text-base pl-[8px]">
                Media
              </div>
            </div>
            <div class="flex p-[10px] rounded-lg hover:bg-gray-800 cursor-pointer" @click="showMediaFile('FILE')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-file-earmark-text"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
              </svg>
              <div class="text-base pl-[8px]">
                File
              </div>
            </div>
          </div>
          <div class="flex justify-between p-[10px] rounded-lg hover:bg-gray-800 cursor-pointer" @click="isKeyFour = !isKeyFour">
            <div class=" text-base">
              Privacy & support
            </div>
            <div>
              <svg
                v-if="!isKeyFour"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
              <svg
                v-if="isKeyFour"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-chevron-up"
                viewBox="0 0 16 16"
              >
                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
              </svg>
            </div>
          </div>
          <div v-if="isKeyFour">
            <div class="flex p-[10px] rounded-lg hover:bg-gray-800 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-person-slash"
                viewBox="0 0 16 16"
              >
                <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465l3.465-3.465Zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465Zm-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
              </svg>
              <div class="text-base pl-[8px]">
                Block
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Show media file -->
    <div v-if="isShowMediaFile" class="px-3 space-y-3">
      <div class="flex h-110 leading-10 text-[16px] font-medium mt-4 space-x-2">
        <div class="flex w-9 h-9 rounded-full items-center justify-center cursor-pointer hover:bg-drak_chat" @click="backToProfile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
        </div>
        <div>
          Media and files
        </div>
      </div>
      <div class="flex space-x-3">
        <div class="h-14 items-center w-fit flex px-3 cursor-pointer" :class="isMedia ? 'focus-tab':'rounded-md hover:bg-gray-700'" @click="showMedia">
          <p class="px-1 font-semibold text-[16px]" :class="isMedia ? 'text-blue-700':'text-gray-300'">
            Media
          </p>
        </div>
        <div class="h-14 items-center  w-fit flex px-3 cursor-pointer " :class="isFile ? 'focus-tab':'rounded-md hover:bg-gray-700'" @click="showFiles">
          <p class="px-1 font-semibold text-[16px]" :class="isFile ? 'text-blue-700':'text-gray-300 '">
            Files
          </p>
        </div>
      </div>
      <div class="overflow-y-auto max-h-[72.5vh] media-file">
        <MediaList v-if="isMedia" :medias="listMedia" :type-media="'MEDIA'" />
        <MediaList v-else :medias="listFile" :type-media="'FILE'" />
      </div>
    </div>
  </div>
</template>

<script>
import MediaList from './MediaList.vue'
export default {
  components: { MediaList },
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    isOnline: {
      type: Boolean,
      default: () => Boolean,
      required: false
    }
  },
  data () {
    return {
      isKeyOne: false,
      isKeyTwo: false,
      isKeyThree: false,
      isKeyFour: false,
      isNotification: true,
      isShowMediaFile: false,
      isMedia: false,
      isFile: false,
      listMedia: [],
      listFile: []
    }
  },
  computed: {
    avatar () {
      return this.$store.getters.avatar
    }
  },
  watch: {
    $route () {
      this.listFile = []
      this.listMedia = []
      this.isFile = false
      this.isMedia = false
      this.isShowMediaFile = false
    }
  },
  methods: {
    async showMediaFile (type) {
      this.isShowMediaFile = true
      if (type === 'MEDIA') {
        await this.showMedia()
      } else {
        await this.showFiles()
      }
    },
    async showMedia () {
      try {
        if (!this.isMedia) {
          if (!this.listMedia.length) {
            const data = await this.$api.conversation.getFileMediaMessage({ conversationId: this.$route.params.id, type: 'MEDIA' })
            this.listMedia = data.data.conversationFile
          }
          this.isMedia = true
          this.isFile = false
        }
      } catch (error) {

      }
    },
    async showFiles () {
      if (!this.isFile) {
        if (!this.listFile.length) {
          const data = await this.$api.conversation.getFileMediaMessage({ conversationId: this.$route.params.id, type: 'FILE' })
          this.listFile = data.data.conversationFile
        }
        this.isFile = true
        this.isMedia = false
      }
    },
    backToProfile () {
      this.isShowMediaFile = false
      this.isMedia = false
      this.isFile = false
    }
  }
}
</script>
<style lang="scss">

.focus-tab{
  @apply border-b-2 border-b-blue-700 ;
}

.media-file::-webkit-scrollbar-track
{
-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
background-color: #424242;
}

.media-file::-webkit-scrollbar
{
width: 10px;
background-color: #424242;
}

.media-file::-webkit-scrollbar-thumb
{
background-color: #686868;
border: 2px solid #686868;
}
</style>
