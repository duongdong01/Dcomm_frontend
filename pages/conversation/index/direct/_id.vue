<template>
  <div class="grid grid-cols-8">
    <div class="flex max-h-[100vh] flex-col border-[1.5px] border-[#303030] relative" :class="isHiddenRight ? 'col-span-8' :'col-span-6'">
      <div class="h-[72px] border-b-[1.5px] border-[#303030] flex items-center justify-between">
        <div class="flex">
          <div class="flex justify-center items-center pl-4 relative">
            <img :src="userReceiverMessage.avatar || avatar" alt="photo" class="w-11 h-11 rounded-full">
            <div v-if="checkIsOnline(userReceiverMessage._id)" class="w-3 h-3 right-1 bottom-0  bg-green-600 absolute rounded-full border-[1.8px] border-black" />
          </div>
          <div class="flex flex-col justify-start">
            <p class="text-white font-medium text-[16px] ml-3">
              {{ userReceiverMessage.fullname }}
            </p>
            <p v-if="checkIsOnline(userReceiverMessage._id)" class="text-white font-normal text-[14px] ml-3">
              Active now
            </p>
            <p v-else class="text-white font-normal text-[14px] ml-3">
              Offline
            </p>
          </div>
        </div>
        <div class="flex pr-10 space-x-2">
          <div class="flex w-10 h-10 rounded-full hover:opacity-95 hover:bg-[#3a3b3c]/95  justify-center items-center cursor-pointer icon_warning" @click="hiddenRight">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-exclamation-square-fill text-red-700 w-6 h-6 rounded-full"
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </div>
        </div>
      </div>
      <!-- list message -->
      <div ref="chatContent" class="overflow-y-scroll h-full conversation_left px-4 overflow-hidden flex flex-col max-h-[79.7vh] min-h-[79.7vh]">
        <div v-for="(item,index) in listMessage" :key="`${item._id}+${index}`">
          <div v-if="index%10===0" class="flex justify-center text-gray-200">
            {{ $dayjs(item.createdAt).format('MMM D, YYYY h:mm A') }}
          </div>
          <MessageItem :is-owner="item.isOwner" :message="item" />
        </div>
        <div ref="elementEnd" />
      </div>
      <!-- input chat -->

      <div class="w-full absolute -bottom-[46px] max-h-[42px]">
        <div class="flex items-center space-x-[2px]">
          <!-- upload file -->
          <div class="flex w-10 h-10 rounded-full justify-center items-center hover:bg-gray-600 mb-[6px] cursor-pointer">
            <label for="file-chat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-file-earmark-image text-blue-500 cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z" />
              </svg>
            </label>
            <input
              id="file-chat"
              class="file-comment"
              type="file"
              accept="image/jpeg,video/mp4"
              multiple="multiple"
              @change="uploadImage"
            >
          </div>
          <div class="flex w-10 h-10 rounded-full justify-center items-center hover:bg-gray-600 mb-[6px] cursor-pointer relative">
            <svg
              class="w-6"
              height="20px"
              viewBox="0 0 17 16"
              width="20px"
              x="0px"
              y="0px"
              @click="getListSticker"
            ><g fill-rule="evenodd"><circle cx="5.5" cy="5.5" fill="none" r="1" /><circle cx="11.5" cy="4.5" fill="none" r="1" /><path d="M5.3 9c-.2.1-.4.4-.3.7.4 1.1 1.2 1.9 2.3 2.3h.2c.2 0 .4-.1.5-.3.1-.3 0-.5-.3-.6-.8-.4-1.4-1-1.7-1.8-.1-.2-.4-.4-.7-.3z" fill="none" /><path d="M10.4 13.1c0 .9-.4 1.6-.9 2.2 4.1-1.1 6.8-5.1 6.5-9.3-.4.6-1 1.1-1.8 1.5-2 1-3.7 3.6-3.8 5.6z" fill="#0084ff" /><path d="M2.5 13.4c.1.8.6 1.6 1.3 2 .5.4 1.2.6 1.8.6h.6l.4-.1c1.6-.4 2.6-1.5 2.7-2.9.1-2.4 2.1-5.4 4.5-6.6 1.3-.7 1.9-1.6 1.9-2.8l-.2-.9c-.1-.8-.6-1.6-1.3-2-.7-.5-1.5-.7-2.4-.5L3.6 1.5C1.9 1.8.7 3.4 1 5.2l1.5 8.2zm9-8.9c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-3.57 6.662c.3.1.4.4.3.6-.1.3-.3.4-.5.4h-.2c-1-.4-1.9-1.3-2.3-2.3-.1-.3.1-.6.3-.7.3-.1.5 0 .6.3.4.8 1 1.4 1.8 1.7zM5.5 5.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#0084ff" fill-rule="nonzero" /></g></svg>
            <button v-if="isShowSticker" class="absolute grid grid-cols-4 bottom-12 w-[270px] sticker bg-gray-700 gap-1 rounded-lg py-2">
              <div v-for="(item, index) in listSticker" :key="index" class="hover:bg-gray-500 p-1 rounded-md" @click="hiddenSticker(item.url)">
                <img :src="item.url" alt="photo" class="object-cover">
              </div>
            </button>
          </div>
          <!-- emoji -->
          <div class="w-full relative">
            <div v-if="isLoaded" class=" absolute w-full left-6 -top-[2px]">
              <div class="loader-line" />
            </div>
            <textarea
              ref="textareaConversation"
              class="w-full bg-gray-600 text-white rounded-3xl outline-none border-none pl-8 pr-9 pt-[9px] h-10 input-send-message"
              placeholder="Aa"
              @keyup.ctrl.enter.prevent="breakLine"
              @keydown.enter.exact.prevent="onSubmit"
            />
            <div class="absolute top-0 right-0">
              <emoji-picker :search="search" class="absolute top-0 right-1 w-full" @emoji="append">
                <button
                  slot="emoji-invoker"
                  slot-scope="{ events: { click: clickEvent } }"
                  class="emoji-invoker"
                  @click.stop="clickEvent"
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-grey">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </button>
                <div slot="emoji-picker" slot-scope="{ emojis, insert }">
                  <div class="emoji-picker absolute -top-[310px] right-7">
                    <div class="emoji-picker__search">
                      <input v-model="search" v-focus type="text">
                    </div>
                    <div>
                      <div v-for="(emojiGroup, category) in emojis" :key="category">
                        <h5>{{ category }}</h5>
                        <div class="emojis">
                          <span
                            v-for="(emoji, emojiName) in emojiGroup"
                            :key="emojiName"
                            :title="emojiName"
                            @click="insert(emoji)"
                          >{{ emoji }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </emoji-picker>
            </div>
          </div>
        </div>
        <!-- show file -->
        <div class="relative w-full">
          <div class="grid-cols-4 absolute bottom-[46px] left-[72px] gap-2 rounded-xl grid px-7">
            <div v-for="(item,index) in previewImage" :key="index" class="flex items-end h-full relative  max-h-[200px]">
              <video v-if="['mp4','webm'].includes(item.name.split('.')[item.name.split('.').length-1])" controls class="h-full rounded-xl w-[100%] object-cover">
                <source :src="item.dataImg" type="video/mp4">
              </video>
              <div v-if="['docx','pdf'].includes(item.name.split('.')[item.name.split('.').length-1])" class="py-6 px-4 max-h-[200px] bg-gray-500 flex items-end rounded-xl">
                <div>
                  <img src="@/static/file_icon.png" alt="photo" class="w-12">
                </div>
                <div class="max-w-[140px] truncate">
                  {{ item.name }}
                </div>
              </div>
              <!-- <iframe v-if="['docx','pdf'].includes(item.name.split('.')[item.name.split('.').length-1])" :src="item.dataImg" style="width:600px; height:500px;" frameborder="0" /> -->
              <img v-if="['png', 'jpg', 'webp', 'jpeg'].includes(item.name.split('.')[item.name.split('.').length-1])" :src="item.dataImg" class="h-full rounded-xl w-[100%] object-cover">
              <div class="flex justify-center items-center w-6 h-6 absolute top-3 right-2 rounded-full bg-gray-800 cursor-pointer hover:bg-btn_hover">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x-lg text-white"
                  viewBox="0 0 16 16"
                  @click="removeItemImage(item)"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isHiddenRight" class="col-span-2  rounded-r-lg border-l-[1.5px] border-[#303030]">
      <RightConversation :user="userReceiverMessage" :is-online="checkIsOnline(userReceiverMessage._id) ? true :false" />
    </div>
  </div>
</template>

<script>
import RightConversation from '~/components/conversations/RightConversation.vue'
import MessageItem from '@/components/conversations/MessageItem.vue'
import { MessageType } from '@/constants/conversation'
export default {
  name: 'Conversation',
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  components: { RightConversation, MessageItem },
  layout: 'conversation',
  data () {
    return {
      isHiddenRight: false,
      search: '',
      typeImage: ['mp4', 'png', 'jpg', 'webp', 'jpeg', 'pdf', 'docs', 'webm'],
      previewImage: [],
      imageUpload: [],
      maxSize: 0,
      isLoadMore: false,
      isDebounce: null,
      isOnline: false,
      isDebounce2: null,
      isLoaded: false,
      isShowSticker: false,
      listSticker: []
    }
  },
  computed: {
    listMessage () {
      return this.$store.getters['conversation/listMessage']
    },
    pageDetailListMessage () {
      return this.$store.getters['conversation/pageDetailListMessage']
    },
    avatar () {
      return this.$store.getters.avatar
    },
    userReceiverMessage () {
      return this.$store.getters['conversation/userReceiverMessage']
    },
    listUserOnline () {
      return this.$store.getters['conversation/listUserOnline']
    }
  },
  watch: {
    async $route () {
      if (this.$route.path.split('/')[2] === 'direct') {
        await this.getListMessageByConversationId({ limit: 20, page: 1, conversationId: this.$route.params.id, isLoadMore: false })
        this.scrollToEnd()
      }
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   // this.$refs.chatContent.scrollTop = this.$refs.chatContent.offsetHeight
    //   console.log(this.$refs.chatContent.scrollTop, this.$refs.chatContent.offsetHeight)
    // })
    this.$nextTick(() => {
      this.$refs.elementEnd.scrollIntoView({ behavior: 'smooth', block: 'end' })
    })
    this.$refs.chatContent.addEventListener('scroll', this.loadMore)
    // socket
    window.socket.emit('conversation:join-room', { roomId: this.$route.params.id })
    window.socket.on('conversation:send-text-message', this.handleSendTextMessage)
  },
  beforeDestroy () {
    this.$refs.chatContent.removeEventListener('scroll', this.loadMore)
    window.socket.off('conversation:send-text-message', this.handleSendTextMessage)
    window.socket.emit('conversation:join-room', { roomId: this.$route.params.id })
  },
  async created () {
    if (this.$route.params.id) {
      await this.getListMessageByConversationId({ limit: 20, page: 1, conversationId: this.$route.params.id, isLoadMore: this.isLoadMore })
    }
  },
  methods: {
    async hiddenSticker (stickerUrl) {
      try {
        const messageBody = {
          conversationId: this.$route.params.id,
          type: MessageType.TEXT,
          stickerUrl
        }
        const data = await this.$api.conversation.sendMessage(messageBody)
        this.isShowSticker = false
        this.$store.commit('conversation/setNewMessage', data.data.message)
        window.socket.emit('conversation:send-text-message', {
          roomId: this.$route.params.id,
          conversationUserId: data.data.message._id
        })
        await this.$store.dispatch('conversation/getListConversation', { page: 1, limit: 20, isLoadMore: false })
        setTimeout(() => {
          this.scrollToEnd2()
        }, 30)
      } catch (err) {
        //
      }
    },
    async getListSticker () {
      try {
        if (!this.isShowSticker) {
          const dataSticker = await this.$api.conversation.getListSticker()
          this.listSticker = dataSticker
          this.isShowSticker = true
        } else {
          this.isShowSticker = false
        }
      } catch (error) {
        //
      }
    },
    handleSendTextMessage (data) {
      this.$store.commit('conversation/setNewMessage', data)
      setTimeout(() => {
        this.scrollToEnd()
      }, 50)
    },
    checkIsOnline (userId) {
      if (userId) {
        for (let i = 0; i < this.listUserOnline.length; i++) {
          if (this.listUserOnline[i].userId.toString() === userId.toString()) {
            return this.listUserOnline[i].isOnline
          }
        }
      }
    },
    scrollToEnd () {
      this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight
    },
    scrollToEnd2 () {
      this.$nextTick(() => {
        this.$refs.elementEnd.scrollIntoView({ behavior: 'smooth', block: 'end' })
      })
    },
    async getListMessageByConversationId ({ limit, page, conversationId, isLoadMore }) {
      try {
        await this.$store.dispatch('conversation/getListMessage', { limit, page, conversationId, isLoadMore })
      } catch (err) {
        //
      }
    },
    loadMore () {
      try {
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          if (this.$route.path.split('/')[1] === 'conversation' && this.pageDetailListMessage.nextPage && !this.isLoadMore) {
            if (!this.isLoadMore && this.pageDetailListMessage.nextPage && this.$refs.chatContent.scrollTop === 0) {
              this.isLoadMore = true
              await this.getListMessageByConversationId({ conversationId: this.$route.params.id, limit: 20, page: this.pageDetailListMessage.nextPage, isLoadMore: true })
              this.isLoadMore = false
            }
          }
        }, 300)
      } catch (err) {
        //
      }
    },
    breakLine () {
      this.$refs.textareaConversation.value += '\r\n'
    },
    reset () {
      this.$refs.textareaConversation.value = ''
      this.previewImage = []
      this.imageUpload = []
    },
    async onSubmit () {
      try {
        if (!this.$refs.textareaConversation.value.trim().length && !this.imageUpload.length) {
          return
        }
        this.isLoaded = true
        const messageBody = {
          conversationId: this.$route.params.id
        }
        if (this.$refs.textareaConversation.value.length) {
          messageBody.message = this.$refs.textareaConversation.value
        }
        let type = MessageType.TEXT
        if (this.imageUpload.length) {
          type = MessageType.FILE
          const formData = new FormData()
          this.imageUpload.forEach((el) => {
            formData.append('files', el)
          })
          const filesData = await this.$api.upload.uploadFilesToAws(formData)
          messageBody.file = filesData.data
        }
        messageBody.type = type
        const data = await this.$api.conversation.sendMessage(messageBody)
        this.$store.commit('conversation/setNewMessage', data.data.message)
        window.socket.emit('conversation:send-text-message', {
          roomId: this.$route.params.id,
          conversationUserId: data.data.message._id
        })
        window.socket.emit('conversation:get-count-new-message', {
          receiverId: this.userReceiverMessage._id
        })

        this.isLoaded = false
        this.reset()
        await this.$store.dispatch('conversation/getListConversation', { page: 1, limit: 20, isLoadMore: false })
        setTimeout(() => {
          this.scrollToEnd2()
        }, 30)
      } catch (err) {
        //
        this.reset()
        this.isLoaded = false
      }
    },
    append (emoji) {
      this.isCreatePost = false
      this.$refs.textareaConversation.value += emoji
    },
    hiddenRight () {
      this.isHiddenRight = !this.isHiddenRight
    },
    removeItemImage (obFile) {
      const newPreviewImg = []
      const newImageUpload = []
      this.previewImage.forEach((el) => {
        if (el.name !== obFile.name) {
          newPreviewImg.push(el)
        }
      })
      this.imageUpload.forEach((el) => {
        if (el.name !== obFile.name) {
          newImageUpload.push(el)
        }
      })
      this.previewImage = newPreviewImg
      this.imageUpload = newImageUpload
    },
    uploadImage (e) {
      const image = e.target.files
      const listImgName = this.imageUpload.map(el => el.name)
      let maxSize = 0
      if (this.previewImage.length) {
        this.previewImage.forEach((el) => {
          maxSize += el.size / 1024 / 1024
        })
      }
      for (let i = 0; i < image.length; i++) {
        maxSize += Number(image[i].size)
      }
      if (maxSize / 1024 / 1024 >= 10) {
        this.$toast.error('File list must smaller than 10MB!')
        return
      }
      if (this.previewImage.length + image.length > 4) {
        this.$toast.error('you can only choose 4 file.')
      } else {
        for (let i = 0; i < image.length; i++) {
          let dem = 0
          if (!this.typeImage.includes(image[i].name.split('.')[image[i].name.split('.').length - 1])) {
            dem++
          }
          if (!listImgName.includes(image[i].name) && dem === 0) {
            this.imageUpload.push(image[i])
            const reader = new FileReader()
            reader.readAsDataURL(image[i])
            reader.onload = (e) => {
              this.previewImage.push({ dataImg: e.target.result, name: image[i].name, size: image[i].size })
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">

.icon_warning{
  -webkit-transform:rotate(180deg);
}
.input-send-message::-webkit-scrollbar-track
{
-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
background-color: #424242;
}

.input-send-message::-webkit-scrollbar
{
width: 10px;
background-color: #424242;
}

.input-send-message::-webkit-scrollbar-thumb
{
background-color: #686868;
border: 2px solid #686868;
}
.conversation{
  .emoji-invoker {
  @apply absolute top-2 right-2 w-6 h-6 rounded-[50%] cursor-pointer transition-all duration-200 p-0 bg-transparent border-0 hover:scale-110 ;
  svg {
    @apply fill-[#b1c6d0] ;
  }
}
.emoji-picker {
  @apply w-60 h-80 overflow-y-scroll overflow-hidden p-4 box-border rounded-xl bg-gray-800 text-white drop-shadow-lg;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  @apply w-[96%] flex-[1] rounded-[10rem]  py-2 px-4  outline-none bg-[#131720] mb-[2px] ;
}
.emoji-picker h5 {
  @apply mb-0 text-[#b1b1b1] uppercase text-[0.8rem] cursor-default ;
}
.emoji-picker .emojis {
  @apply flex flex-wrap justify-between ;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  @apply p-[0.2rem] cursor-pointer rounded-md ;
}
.emoji-picker .emojis span:hover {
  @apply bg-[#ececec] cursor-pointer ;
}

.emoji-picker::-webkit-scrollbar-track
{
-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}

.emoji-picker::-webkit-scrollbar
{
  @apply w-[10px] bg-gray-700 rounded-lg ;
}

.emoji-picker::-webkit-scrollbar-thumb
{
  @apply border-2 border-solid border-gray-600 bg-gray-600 rounded-lg  ;
}
}
.loader-line {
            width: 94%;
            height: 1.5px;
            position: relative;
            overflow: hidden;
            background-color: #ddd;
            // margin: 100px auto;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius: 20px;
        }

        .loader-line:before {
            content: "";
            position: absolute;
            left: -50%;
            height: 3px;
            width: 40%;
            background-color: coral;
            -webkit-animation: lineAnim 1s linear infinite;
            -moz-animation: lineAnim 1s linear infinite;
            animation: lineAnim 1s linear infinite;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius: 20px;
        }

        @keyframes lineAnim {
            0% {
                left: -40%;
            }
            50% {
                left: 20%;
                width: 80%;
            }
            100% {
                left: 100%;
                width: 100%;
            }
        }

.sticker:before {
  content: '';
  border-top: 10px solid rgb(55 65 81);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  bottom: -10px;
  right: 46%;
}
</style>
