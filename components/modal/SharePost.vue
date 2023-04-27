<template>
  <div ref="sharePost" class="fixed flex justify-center items-center w-full h-full top-0 left-0 z-20" style="background-color: rgba(0, 0, 0, 0.25);">
    <div class="relative pb-4 share-post space-y-3 max-w-lg max-h-[740px] w-[512px] flex flex-col text-white min-h-[260px] bg-gray_850 rounded-lg  border border-gray-700  lg:-mt-10 md:-mt-5" style="border-radius: 5px;box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);">
      <div class="flex py-3 border-b border-gray-700 text-white justify-center text-[18px] relative font-medium">
        <p> Write post </p>
        <div class="absolute cursor-pointer right-2 top-2 w-8 h-8 rounded-full flex justify-center items-center  bg-gray-600" @click="hiddenModalSharePost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
      </div>
      <div class="flex space-x-2 w-full px-3 ">
        <div class="flex h-full items-center">
          <img :src="userInfo.avatar" alt="photo" class="w-10 h-10 rounded-full my-auto object-cover">
        </div>
        <div class="flex flex-col -mt-1">
          <h2 class="text-white font-medium text-[16px]">
            {{ userInfo.fullname }}
          </h2>
          <div class="flex justify-center items-center">
            <a-select
              class="bg-gray_850 w-32 text-[14px] text-white select-post flex"
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
        </div>
      </div>
      <div class="overflow-y-auto scroll-share-post max-h-[500px]">
        <Mentionable
          placement="bottom"
          :keys="['@']"
          :items="items"
          offset="6"
          filtering-disabled
          class="mx-3"
          @open="onOpen()"
          @search="onOpen($event)"
          @apply="onApply"
        >
          <div
            ref="textareaSharePost"
            contenteditable="true"
            placeholder="What's happening?"
            class="rounded-xl pl-3 pr-9 pt-2 pb-2  h-14 min-h-[40px] focus:outline-none outline-none cursor-text"
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
        <div class="absolute z-[2] top-16 right-0">
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
        <!-- post share -->
        <div class="px-2 pb-3">
          <div class=" rounded-md overflow-hidden border border-gray-700 relative">
            <div v-if="postShare.albums">
              <Lightbox :items="postShare.albums.albumFileDetails.map(el=>el.file)" class="rounded-md" />
            </div>
            <div class="flex mt-4 px-2">
              <div class="w-9 h-9 overflow-hidden">
                <img :src="postShare.owner.avatar" alt="avatar" class="rounded-full object-cover w-9 h-9">
              </div>
              <div class="flex flex-col ml-3 -mt-1">
                <p class="text-white font-medium">
                  {{ postShare.owner.fullname }}
                </p>
                <div class="flex items-center gap-1 justify-center w-full -mt-2">
                  <p class="font-light text-white/80 text-sm">
                    1 day ago
                  </p>
                  <p class="pb-3">
                    .
                  </p>
                  <svg
                    v-if="postShare?.privacy ===PostPrivacy.PUBLIC"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    class="bi bi-globe-americas text-white/80"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
                  </svg>
                  <svg
                    v-if="postShare?.privacy ===PostPrivacy.FRIENDS"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-people-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-2 mb-2" v-html="postShare.normal.content" />
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <button class="text-white bg-primary px-4 py-[10px] rounded-xl min-w-[140px] flex justify-center items-center relative" :disabled="isCreatePost" @click="createSharePost">
          Share
          <Loading v-if="isCreatePost" class="absolute" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Mentionable } from 'vue-mention'
import Lightbox from '../lightbox/Lightbox.vue'
import Loading from '../loading/Loading.vue'
import { PostActionOn, PostPrivacy, PostType } from '@/constants/post'

export default {
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  components: { Mentionable, Lightbox, Loading },
  props: {
    postShare: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      privacy: PostPrivacy.PUBLIC,
      PostPrivacy,
      isCreatePost: false,
      isDebounce: null,
      items: [],
      search: '',
      images: [
        {

          url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/18/871936/Arin---Oh-My-Girl-8.jpg'
        },
        {
          url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/18/871936/Arin---Oh-My-Girl-5.jpg'
        },
        {
          url: 'https://luv.vn/wp-content/uploads/2021/11/avatar-gai-xinh-41.jpg'
        },
        {
          url: 'https://antimatter.vn/wp-content/uploads/2022/05/hinh-anh-hot-girl-han-quoc.jpg'
        }

      ]
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  mounted () {
    document.querySelector('body').classList.add('disable-scroll')
  },
  destroyed () {
    document.querySelector('body').classList.remove('disable-scroll')
  },
  methods: {
    hiddenModalSharePost () {
      this.$emit('hiddenShareModal', false)
    },
    handleChange (value) {
      this.privacy = value
    },
    resize () {
      this.isCreatePost = false
      const element = this.$refs.textareaSharePost
      if (element.scrollHeight > 90) {
        element.style.height = 'auto'
      } else {
        //
      }
      element.style.height = element.scrollHeight + 'px'
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
    onApply (item, key, replacedWith) {
      const lastMentionIndex = this.$refs.textareaSharePost.innerHTML.lastIndexOf('@')
      const newText = this.$refs.textareaSharePost.innerHTML.substring(0, lastMentionIndex) + `<a href="/profile_detail/${item.userDetail._id}" class="mention-user">` + item.userDetail.fullname + '</a>' + ' ' + this.$refs.textareaSharePost.innerHTML.substring(lastMentionIndex + 10, this.$refs.textareaSharePost.innerHTML.length
      )
      this.$refs.textareaSharePost.innerHTML = newText
      // set focus
      const selection = window.getSelection()
      const range = document.createRange()
      selection.removeAllRanges()
      range.selectNodeContents(this.$refs.textareaSharePost)
      range.collapse(false)
      selection.addRange(range)
      this.$refs.textareaSharePost.focus()
    },
    append (emoji) {
      this.$refs.textareaSharePost.innerHTML += emoji
      this.resize()
    },
    async createSharePost () {
      try {
        this.isCreatePost = true
        // this.isCreatePost = true
        const sharePostBody = {
          on: PostActionOn.PERSONAL,
          type: PostType.SHARE,
          privacy: this.privacy
        }
        if (this.postShare.type === PostType.NORMAL) {
          sharePostBody.originPostId = this.postShare._id
        } else {
          sharePostBody.originPostId = this.postShare.originPostId
        }
        const listTagA = this.$refs.textareaSharePost.getElementsByTagName('a')
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
        if (userMentions.length) {
          sharePostBody.userMentions = userMentions
        }
        const payloadPost = {
          refPostId: this.postShare._id
        }
        if (this.$refs.textareaSharePost.innerHTML.length) {
          payloadPost.content = this.$refs.textareaSharePost.innerHTML
        }
        sharePostBody.payloadPost = payloadPost
        const dataCreatePost = await this.$api.post.createSharePost(sharePostBody)
        dataCreatePost.data.post.isOwner = true
        this.$store.commit('post/newPost', dataCreatePost.data.post)
        this.hiddenModalSharePost()
        this.isCreatePost = false
      } catch (err) {
        //
      }
    }
  }
}
</script>

<style lang="scss">
.share-post{
  .mention-user{
  @apply bg-[#1f4a82] text-white;
  }
    .ant-select-arrow{
        @apply -right-5;
        svg{
            @apply w-[14px] h-[14px] mb-1
        }
    }
    .ant-select-selection--single .ant-select-selection__rendered{
        @apply m-0
    }
    .ant-select-selection__rendered{
        @apply m-0
    }
    .ant-select-selection__placeholder{
      @apply text-white text-[14px]
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
      @apply text-white text-[14px]
    }

.ant-select-dropdown-content{
  @apply rounded-md
}
.ant-select-dropdown{
  @apply rounded-lg
}
    .ant-select-dropdown-menu ,.ant-select-dropdown-menu-vertical ,.ant-select-dropdown-menu-root{
      @apply bg-gray-700 text-white text-[14px]
    }
  .ant-select-dropdown-menu-item{
      @apply bg-gray-700 text-white  text-[14px]
    }
    .ant-select-dropdown-menu-item:hover{
      @apply bg-gray-600 text-white text-[14px]
    }
    .ant-select-dropdown-menu-item:hover:not(.ant-select-dropdown-menu-item-disabled),.ant-select-dropdown-menu-item-active:not(.ant-select-dropdown-menu-item-disabled){
      @apply bg-gray-600 text-white text-[14px]
    }

}

.scroll-share-post::-webkit-scrollbar
{
  @apply w-[10px] bg-gray-700 rounded-lg ;
}

.scroll-share-post::-webkit-scrollbar-thumb
{
  @apply border-2 border-solid border-gray-600 bg-gray-600 rounded-lg  ;
}
.disable-scroll {
  height: 100vh;
  overflow-y: hidden;
}
</style>
