<template>
  <div class="flex space-x-2 items-center my-3" :class="isOwner ? 'justify-end':'justify-start'">
    <div class="max-w-[46%] flex w-full flex-col space-y-2">
      <div v-if="message.isDeleted===false" class="flex space-x-2 items-end" :class="isOwner ? 'justify-end':'justify-start'">
        <div v-if="!isOwner" class="flex items-end h-full min-w-[40px]">
          <img :src="message.userSender.avatar ||avatar" alt="photo" class="w-10 h-10 rounded-full object-cover">
        </div>
        <div class="flex w-full">
          <div class="flex h-full flex-col w-full ">
            <!-- sticker message -->
            <div v-if="message?.stickerUrl" :class="isOwner ? ' justify-end':' justify-start'" class="flex w-full relative message-sticker">
              <img :src="message.stickerUrl" alt="photo" class="max-w-[50%]">
              <!-- option message -->
              <button v-if="isOwner" class="absolute h-full  top-0 justify-center items-center option-sticker hidden left-0" @click="showOptionMessage" @focusout="hiddenOption">
                <div class="w-8 flex  justify-center items-center h-8 rounded-full hover:bg-drak_chat cursor-pointer relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  </svg>
                  <div v-if="isOptionMessage" class="py-1 rounded-md bg-gray-900 border border-gray-700 absolute top-7 right-1 h-10 flex w-40 justify-center items-center hover:bg-gray_850 z-10" @click="deleteMessage">
                    Delete message
                  </div>
                </div>
              </button>
            </div>
            <!-- file message -->
            <div v-if="message.conversationFile.length" class="grid  gap-1 grid-cols-1">
              <div v-for="(item,index) in message.conversationFile" :key="index" class="relative message-file">
                <img
                  v-if="item.type==='IMAGE'"
                  :src="item.url "
                  alt="photo"
                  class="rounded-lg shadow-sm max-h-[200px] cursor-pointer"
                  :class="isOwner? 'float-right':'float-left'"
                  @click="showImage(item,'IMAGE')"
                >
                <video
                  v-if="item.type==='VIDEO'"
                  controls="controls"
                  class="rounded-lg shadow-sm max-h-[200px] cursor-pointer"
                  :class="isOwner? 'float-right':'float-left'"
                  preload="metadata"
                  @click="showImage(item,'VIDEO')"
                >
                  <source :src="item.url" type="video/mp4">
                </video>
                <a v-if="item.type==='DOCS'" target="_blank" :href="item.url" class="py-6 px-4 max-h-[200px] bg-gray-500 flex items-end rounded-xl" :class="isOwner? 'float-right':'float-left'">
                  <div>
                    <img src="@/static/file_icon.png" alt="photo" class="w-12">
                  </div>
                  <div class="flex flex-col px-1">
                    <p>{{ item.size }}</p>
                    <div class="max-w-[140px] truncate">
                      {{ item.name }}
                    </div>
                  </div>
                </a>
                <!-- option message -->
                <div v-if="isOwner" class="absolute h-full hidden justify-center items-center option-file left-0">
                  <div class="w-8 flex  justify-center items-center h-8 rounded-full hover:bg-drak_chat cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-three-dots-vertical"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <!-- text message  -->
            <div v-if="message.message && message.message.length" class="w-full flex mt-[4px] message " :class="isOwner ? ' justify-end':' justify-start'">
              <div :class="isOwner ? 'text-white bg-blue-500':'bg-gray-600'" class="w-fit text-white px-4 py-[10px]  text-content rounded-3xl relative message max-w-[100%]">
                {{ message.message }}
                <div v-if="isOwner" class="w-3 h-3 bg-gray-600 rounded-full flex  items-center justify-center absolute bottom-0 -right-[13.5px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check text-gray-400"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                  </svg>
                </div>

                <!-- option message -->
                <button v-if="isOwner" class="absolute h-full  top-0 justify-center items-center hidden option-message" :class="isOwner ? '-left-10' :'-right-10'" @click="showOptionMessage" @focusout="hiddenOption">
                  <div class="w-8 flex justify-center items-center h-8 rounded-full hover:bg-drak_chat cursor-pointer relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-three-dots-vertical"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                    <div v-if="isOptionMessage" class="py-1 rounded-md bg-gray-900 border border-gray-700 absolute top-7 right-1 h-10 flex w-40 justify-center items-center hover:bg-gray_850 z-10" @click="deleteMessage">
                      Delete message
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="message.isDeleted" :class="isOwner ? 'justify-end':'justify-start'" class="flex space-x-2 items-end">
        <div v-if="!isOwner" class="flex items-end h-full min-w-[40px]">
          <img :src="message.userSender.avatar ||avatar" alt="photo" class="w-10 h-10 rounded-full object-cover">
        </div>
        <div class="w-full flex mt-[4px] message " :class="isOwner ? ' justify-end':' justify-start'">
          <div class="w-fit text-gray-200 px-4 py-[10px]  text-content rounded-3xl relative message max-w-[100%] border border-gray-700">
            {{ isOwner ? 'You' :message.userSender.fullname }} unsent a message
            <div v-if="isOwner" class="w-3 h-3 bg-gray-600 rounded-full flex  items-center justify-center absolute bottom-0 -right-[13.5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-check text-gray-400"
                viewBox="0 0 16 16"
              >
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MediaFile ref="mediaFile" :image="file" class="z-20" />
  </div>
</template>

<script>
import MediaFile from '../modal/MediaFile.vue'

export default {
  components: { MediaFile },
  props: {
    message: {
      type: Object,
      default: () => { }
    },
    isOwner: {
      type: Boolean,
      default: () => Boolean
    }
  },
  data () {
    return {
      isShowImg: false,
      file: null,
      isOptionMessage: false
    }
  },
  computed: {
    avatar () {
      return this.$store.getters.avatar
    }
  },
  methods: {
    showImage (item, type) {
      this.file = item
      this.$refs.mediaFile.show()
      // this.isShowImg = true
    },
    showOptionMessage () {
      this.isOptionMessage = true
    },
    hiddenOption () {
      this.isOptionMessage = false
    },
    async deleteMessage () {
      try {
        this.isOptionMessage = false
        this.$store.commit('conversation/deleteMessage', this.message._id)
        await this.$api.conversation.deleteMessageByConversationUserId({ conversationUserId: this.message._id })
      } catch (err) {
        this.isOptionMessage = false
      }
    }
  }
}
</script>

<style lang="scss">
.text-content {
  // inline-size: 200px;
  overflow-wrap: break-word;
}
.message-sticker:hover{
  .option-sticker{
    display: flex;
  }
}
.message:hover{
  .option-message{
    display: flex;
  }
}
.message-file:hover{
  .option-file{
    display: flex;
  }
}
</style>
