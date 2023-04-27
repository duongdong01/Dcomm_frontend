<template>
  <div class="flex flex-col rounded-xl bg-gray_850 text-base post relative">
    <div v-if="false" class="absolute z-[2] left-0 w-full h-full flex justify-center bg-[#000] opacity-50 rounded-xl" />
    <Loading v-if="false" class="absolute z-[2] bg-gray-500 opacity-40 rounded-xl" />
    <div class="grid grid-cols-12 create_post gap-1 px-6 pt-5 ">
      <a href="#" class="avatar_user w-11 h-11 rounded-full cursor-pointer col-span-1">
        <img :src="userInfo?.avatar" class="rounded-full object-cover  w-11 h-11" alt="avatar">
      </a>
      <div class="w-full relative col-span-11">
        <Mentionable
          placement="bottom"
          :keys="['@']"
          :items="items"
          offset="6"
          filtering-disabled
          @open="onOpen()"
          @search="onOpen($event)"
          @apply="onApply"
        >
          <div
            ref="textarea"
            contenteditable="true"
            placeholder="What's happening?"
            class="post-textarea rounded-xl pl-3 pr-9 pt-2 pb-2  bg-main_color transition-all ease-out duration-150 h-14 min-h-[56px]"
            @input="resize()"
          />

          <template #no-result>
            <div class="text-white mt-1">
              No result
            </div>
          </template>
          <template #item="{ item }">
            <div class="flex  py-[1px] space-x-2 cursor-pointer">
              <img :src="item.userDetail.avatar" class="w-9 h-9 rounded-full" alt="photo">
              <div class="flex items-center">
                <p>
                  {{ item.userDetail.fullname }}
                </p>
              </div>
            </div>
          </template>
        </Mentionable>

        <div class="absolute z-[2] top-0 right-0">
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
            <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
              <div class="emoji-picker" :style="{ top: display.y + 10+'px', left: display.x + 'px' }">
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
    <div class="flex flex-col space-y-4 mb-4">
      <div class="pr-10 pl-11 ml-11 grid gap-6 mt-1 grid-cols-2 max-h-[56vh]  grid-img" :class="previewImage.length>4 ? 'overflow-y-scroll':''">
        <div v-for="(item,index) in previewImage" :key="index" class="py-2 h-[25vh] rounded-xl flex justify-center flex-col relative ">
          <video v-if="['mp4'].includes(item.name.split('.')[item.name.split('.').length-1])" controls class="h-full rounded-xl w-[100%] object-cover">
            <source :src="item.dataImg" type="video/mp4">
          </video>
          <img v-else :src="item.dataImg" class="h-full rounded-xl w-[100%] object-cover">
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
      <div class="px-10 grid grid-cols-3 gap-4">
        <div class="border-r-[1px] flex justify-center text-center">
          <label for="file-input" class="flex"><svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-camera text-white cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
          </svg> <p class="text-white ml-2 mt-[6px]">Image/Video</p></label>
          <input id="file-input" type="file" accept="image/jpeg,video/mp4" multiple="multiple" @change="uploadImage">
        </div>
        <div class="border-r-[1px] flex justify-center items-center">
          <a-select
            class="bg-gray_850 w-36 text-base text-white select-post"
            default-value="PUBLIC"
            @change="handleChange"
          >
            <a-select-option value="PUBLIC">
              Everyone
            </a-select-option>
            <a-select-option value="FRIENDS">
              Your friends
            </a-select-option>
            <a-select-option value="ONLY_ME">
              Only me
            </a-select-option>
          </a-select>
        </div>
        <div class="flex justify-center -mt-1">
          <button class="text-white bg-primary px-4 py-[10px] rounded-xl min-w-[140px] flex justify-center items-center relative" :disabled="isCreatePost" :class=" isCreatePost ? 'opacity-80':''" @click="onSubmit">
            <Loading v-if="isLoadCreatePost" class="absolute z-[2] bg-gray-500 opacity-40 rounded-xl" />
            {{ !isLoadCreatePost ? 'Create post' :'Processing...' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Mentionable } from 'vue-mention'
import Loading from '../loading/Loading.vue'
import { PostType, PostPrivacy } from '@/constants/post'
export default {
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  components: { Loading, Mentionable },
  props: ['on'],
  data () {
    return {
      text: '',
      items: [],
      typeImage: ['mp4', 'png', 'jpg', 'webp', 'jpeg'],
      previewImage: [],
      imageUpload: [],
      isCreatePost: true,
      search: '',
      count: 0,
      privacy: PostPrivacy.PUBLIC,
      isLoadCreatePost: false,
      isDebounce: null,
      imgDefault: require('@/static/avatar/avatar1.jpg')
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  mounted () {
    this.$refs.textarea.addEventListener('click', this.cursor_position)
    this.$refs.textarea.addEventListener('keydown', this.cursor_position)
  },
  methods: {
    debounce (func, timeout = 300) {
      this.isLoadMore = true
      let timer
      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
      }
    },
    onOpen (searchText = '') {
      try {
        // this.isLoaded = false
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          const friendData = await this.$api.friend.getListFriend({ userParam: this.userInfo._id, limit: 4, page: 1, keyword: searchText })
          this.items = friendData.data.friends
        }, 300)
      } catch (err) {
        //
      }
    },
    placeCaretAtEnd (el) {
      el.focus()
      if (typeof window.getSelection !== 'undefined' &&
            typeof document.createRange !== 'undefined') {
        const range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      } else if (typeof document.body.createTextRange !== 'undefined') {
        const textRange = document.body.createTextRange()
        textRange.moveToElementText(el)
        textRange.collapse(false)
        textRange.select()
      }
    },
    onApply (item, key, replacedWith) {
      const lastMentionIndex = this.$refs.textarea.innerHTML.lastIndexOf('@')
      const newText = this.$refs.textarea.innerHTML.substring(0, lastMentionIndex) + `<a href="/profile_detail/${item.userDetail._id}" class="mention-user">` + item.userDetail.fullname + '</a>' + ' ' + this.$refs.textarea.innerHTML.substring(lastMentionIndex + 10, this.$refs.textarea.innerHTML.length
      )
      this.$refs.textarea.innerHTML = newText
      // set focus
      const selection = window.getSelection()
      const range = document.createRange()
      selection.removeAllRanges()
      range.selectNodeContents(this.$refs.textarea)
      range.collapse(false)
      selection.addRange(range)
      this.$refs.textarea.focus()
    },
    append (emoji) {
      this.isCreatePost = false
      this.$refs.textarea.innerHTML += emoji
    },
    handleChange (value) {
      this.privacy = value
    },
    resize () {
      this.isCreatePost = false
      const element = this.$refs.textarea
      if (element.scrollHeight > 90) {
        element.style.height = 'auto'
      } else {
        //
      }
      element.style.height = element.scrollHeight + 'px'
    },

    uploadImage (e) {
      this.isCreatePost = false
      const image = e.target.files
      const listImgName = this.imageUpload.map(el => el.name)
      if (this.previewImage.length + image.length > 8) {
        this.$toast.error('you can only choose 8 file.')
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
              this.previewImage.push({ dataImg: e.target.result, name: image[i].name })
            }
          }
        }
      }
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
    async onSubmit () {
      try {
        this.isCreatePost = true
        if (this.$refs.textarea.innerHTML.length && !this.imageUpload.length) {
          const checkContentNull = this.$refs.textarea.innerHTML.split(';')
          const listNbsp = checkContentNull.map(el => el.trim())
          let count = 0
          if (listNbsp[listNbsp.length - 1].toString() !== '') {
            count++
          }
          for (let i = 0; i < listNbsp.length - 1; i++) {
            if (listNbsp[i].toString() !== '&nbsp') {
              count++
            }
          }
          if (count === 0) {
            return
          }
        }
        this.isLoadCreatePost = true
        const listTagA = this.$refs.textarea.getElementsByTagName('a')
        const userMentions = []
        if (listTagA.length) {
          const listHref = []
          for (let i = 0; i < listTagA.length; i++) {
            listHref.push(listTagA[i].href)
          }
          listHref.forEach((el) => {
            userMentions.push(el.split('/')[el.split('/').length - 1])
          })
        }
        const postBody = {
          on: this.on,
          type: PostType.NORMAL,
          privacy: this.privacy
        }
        if (userMentions.length) {
          postBody.userMentions = userMentions
        }
        const payloadPost = {
        }
        if (this.$refs.textarea.innerHTML.length) {
          payloadPost.content = this.$refs.textarea.innerHTML
        }
        if (this.imageUpload.length) {
          const formData = new FormData()
          const album = {
            files: []
          }
          this.imageUpload.forEach((el) => {
            formData.append('files', el)
          })
          const filesData = await this.$api.upload.uploadFilesToAws(formData)
          album.files = filesData.data
          payloadPost.album = album
        }
        if (payloadPost.content || Object.keys(payloadPost.album).length) {
          postBody.payloadPost = payloadPost
          const dataCreatePost = await this.$api.post.createPost(postBody)
          dataCreatePost.data.post.isOwner = true
          this.$store.commit('post/newPost', dataCreatePost.data.post)
        }
        this.isLoadCreatePost = false
        this.reset()
      } catch (err) {
        this.$toast.error('System error.')
        this.isLoadCreatePost = false
      }
    },
    reset () {
      this.$refs.textarea.innerHTML = ''
      this.isCreatePost = true
      this.previewImage = []
      this.imageUpload = []
      this.resize()
    }
  }
}
</script>

<style lang="scss">
.post{
  .mention-user{
  @apply bg-[#1f4a82] text-white;
  }
  .create_post{
      .post-textarea{
          @apply outline-0 border-0 resize-none w-full font-normal text-base text-white overflow-hidden;
      }
      .post-textarea::placeholder{
          @apply font-normal   text-[16px] pt-1
      }
      .post-textarea:focus{
        @apply h-20 transition-all duration-150 ease-in
      }

  }
  #file-input{
          @apply hidden
    }
    .ant-select-selection__placeholder{
      @apply text-white
    }
    .ant-select-selection--single{
      @apply bg-gray_850 border-none
    }
    .ant-select-selection--single:focus{
      @apply bg-gray_850 border-none
    }
    .ant-select-focused .ant-select-selection, .ant-select-selection:focus, .ant-select-selection:active{
      @apply shadow-none
    }
    .ant-select-arrow-icon{
      @apply text-white
    }
}
.ant-select-dropdown-content{
  @apply rounded-md
}
.ant-select-dropdown{
  @apply rounded-lg
}
    .ant-select-dropdown-menu ,.ant-select-dropdown-menu-vertical ,.ant-select-dropdown-menu-root{
      @apply bg-gray-700 text-white
    }
  .ant-select-dropdown-menu-item{
      @apply bg-gray-700 text-white text-base
    }
    .ant-select-dropdown-menu-item:hover{
      @apply bg-gray-600 text-white
    }
    .ant-select-dropdown-menu-item:hover:not(.ant-select-dropdown-menu-item-disabled),.ant-select-dropdown-menu-item-active:not(.ant-select-dropdown-menu-item-disabled){
      @apply bg-gray-600 text-white
    }

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

.grid-img::-webkit-scrollbar
{
  @apply w-[10px] bg-gray-700 rounded-lg ;
}

.grid-img::-webkit-scrollbar-thumb
{
  @apply border-2 border-solid border-gray-600 bg-gray-600 rounded-lg  ;
}
.mention-item{
  @apply  text-white hover:bg-gray-600 px-1 min-h-[32px] items-center z-30
}
 .vue-popover-theme{
  @apply bg-gray-700  rounded-md min-w-[200px] p-0 overflow-hidden min-h-[32px] text-center z-30
 }
.mention-selected {
  @apply bg-gray-600 z-30;
}

</style>
