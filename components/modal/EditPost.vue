<template>
  <div ref="editPost" class="fixed flex justify-center items-center w-full h-full top-0 left-0 z-20" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="relative pb-4 edit-post space-y-3 max-w-lg max-h-[740px] w-[512px] flex flex-col text-white min-h-[260px] bg-gray_850 rounded-lg  border border-gray-700  lg:-mt-10 md:-mt-5" style="border-radius: 5px;box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);">
      <div class="flex py-3 border-b border-gray-700 text-white justify-center text-[18px] relative font-medium">
        <p> Edit post </p>
        <div class="absolute cursor-pointer right-2 top-2 w-8 h-8 rounded-full flex justify-center items-center  bg-gray-600" @click="hiddenModalEdit">
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
              :default-value="post.privacy"
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
      <div class="overflow-y-auto scroll-edit-post max-h-[500px]">
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
            ref="textareaEditPost"
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
        <div v-if="post.type === PostType.NORMAL" class="flex justify-center text-center absolute top-[72px] right-12">
          <label :for="`file-edit${post._id}`" class="flex"><svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-camera text-white cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
          </svg> </label>
          <input :id="`file-edit${post._id}`" class="file-comment" type="file" accept="image/jpeg,video/mp4" @change="uploadImage">
        </div>
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
        <!-- video + image -->
        <div class="grid  gap-1 mx-3 mb-1  preViewImg" :class="previewImage.length + albums.length <2 ? 'grid-cols-1' : 'grid-cols-2'">
          <!-- new image + video -->
          <div v-for="(item, index) in previewImage" :key="index" class="bg-gray-300 border border-gray-400 relative rounded-xl">
            <video v-if="['mp4'].includes(item.name.split('.')[item.name.split('.').length-1])" controls class="h-full rounded-xl w-[100%] object-cover">
              <source :src="item.dataImg" type="video/mp4">
            </video>
            <img v-else :src="item.dataImg" class="h-full rounded-xl w-[100%] object-cover">
            <div class="flex justify-center items-center w-6 h-6 absolute top-3 right-2 rounded-full bg-gray-700 cursor-pointer hover:bg-btn_hover">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-lg text-white"
                viewBox="0 0 16 16"
                @click="removeItemImagePreview(item)"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </div>
          </div>
          <!-- current image -->
          <div v-for="item in albums" :key="item._id" class="bg-gray-300 border border-gray-400 relative rounded-xl">
            <video v-if="item.type==='VIDEO'" controls class="h-full rounded-xl w-[100%] object-cover">
              <source :src="item.url" type="video/mp4">
            </video>
            <img v-else :src="item.url" class="h-full rounded-xl w-[100%] object-cover">
            <div class="flex justify-center items-center w-6 h-6 absolute top-3 right-2 rounded-full bg-gray-700 cursor-pointer hover:bg-btn_hover">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-lg text-white"
                viewBox="0 0 16 16"
                @click="removeItemImage(item._id)"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </div>
          </div>
        </div>
        <!-- post share -->
        <div v-if="post.type===PostType.SHARE && post.originPost " class="px-2 pb-3">
          <div class=" rounded-md overflow-hidden border border-gray-700 relative">
            <div v-if="post.originPost.albums">
              <Lightbox :items="post.originPost.albums.albumFileDetails.map(el=>el.file)" class="rounded-md" />
            </div>
            <div class="flex mt-4 px-2">
              <div class="w-9 h-9 overflow-hidden">
                <img :src="post.originPost.owner.avatar" alt="avatar" class="rounded-full object-cover w-9 h-9">
              </div>
              <div class="flex flex-col ml-3 -mt-1">
                <p class="text-white font-medium">
                  {{ post.originPost.owner.fullname }}
                </p>
                <div class="flex items-center gap-1 justify-center w-full -mt-2">
                  <p class="font-light text-white/80 text-sm">
                    1 day ago
                  </p>
                  <p class="pb-3">
                    .
                  </p>
                  <svg
                    v-if="post.originPost?.privacy ===PostPrivacy.PUBLIC"
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
                    v-if="post.originPost?.privacy ===PostPrivacy.FRIENDS"
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
            <div class="p-2 mb-2" v-html="post.originPost.normal.content" />
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <button :disable="isEditPosted" class="text-white bg-primary px-4 py-[10px] rounded-xl min-w-[140px] flex justify-center items-center relative" @click="savePost">
          Save
          <Loading v-if="isEditPosted" class="absolute" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Mentionable } from 'vue-mention'
import Loading from '../loading/Loading.vue'
import { PostPrivacy, PostType } from '@/constants/post'
export default {
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  components: { Mentionable, Loading },
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      privacy: PostPrivacy.PUBLIC,
      PostPrivacy,
      PostType,
      previewImage: [],
      items: [],
      isDebounce: null,
      typeImage: ['mp4', 'png', 'jpg', 'webp', 'jpeg'],
      search: '',
      editPost: this.post,
      imageUpload: [],
      albums: [],
      removeFiles: [],
      isEditPosted: false
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  mounted () {
    this.privacy = this.post.privacy
    if (this.post.type === PostType.SHARE && this.post.shared.content) {
      this.$refs.textareaEditPost.innerHTML = this.post.shared.content
      this.resize()
    }
    if (this.post.type === PostType.NORMAL) {
      if (this.post.normal.content) {
        this.$refs.textareaEditPost.innerHTML = this.post.normal.content
        this.resize()
      }
      if (this.post.albums) {
        this.albums = this.post.albums.albumFileDetails.map(el => el.file)
      }
    }
  },
  methods: {
    uploadImage (e) {
      const image = e.target.files
      const listImgName = this.imageUpload.map(el => el.name)
      if (this.previewImage.length + image.length + this.albums.length > 8) {
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
    removeItemImagePreview (obFile) {
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
    removeItemImage (_id) {
      const newImg = []
      this.removeFiles.push(_id)
      this.albums.forEach((el) => {
        if (el._id.toString() !== _id.toString()) {
          newImg.push(el)
        }
      })
      this.albums = newImg
    },
    filterUserMentions (userMentions) {
      // neu post co mention
      const addUserMentions = []
      const removeUserMentions = []
      const mentionIds = this.post.mentions.map(el => el.userId.toString())
      userMentions.forEach((el) => {
        let count = 0
        mentionIds.forEach((item) => {
          if (item.toString() === el.toString()) {
            count++
          }
          if (!userMentions.includes(item.toString())) {
            removeUserMentions.push(item)
          }
        })
        if (!count) {
          addUserMentions.push(el)
        }
      })
      const result = {}
      if (addUserMentions.length) {
        result.addUserMentions = addUserMentions
      }
      if (removeUserMentions.length) {
        result.removeUserMentions = removeUserMentions
      }
      return result
    },
    async savePost () {
      try {
        this.isEditPosted = true
        if (this.post.type === PostType.NORMAL) {
          if (this.$refs.textareaEditPost.textContent.length === 0 && !this.albums.length && !this.imageUpload.length) {
            return
          }
        }
        const postBody = {
          privacy: this.privacy
        }
        this.isLoadCreatePost = true
        const listTagA = this.$refs.textareaEditPost.getElementsByTagName('a')
        const userMentionIds = []
        if (listTagA.length) {
          const listHref = []
          for (let i = 0; i < listTagA.length; i++) {
            listHref.push(listTagA[i].href)
          }
          listHref.forEach((el) => {
            userMentionIds.push(el.split('/')[el.split('/').length - 1])
          })
        }
        let userMentions = {}
        if (this.post.mentions.length) {
          if (userMentionIds.length) {
            userMentions = this.filterUserMentions(userMentionIds)
          } else {
            userMentions.removeUserMentions = this.post.mentions.map(el => el.userId)
          }
        } else if (userMentionIds.length) {
          userMentions.addUserMentions = userMentionIds
        }
        if (Object.keys(userMentions).length) {
          postBody.userMentions = userMentions
        }
        const updatePostNormal = {
        }
        updatePostNormal.content = this.$refs.textareaEditPost.innerHTML
        if (Object.keys(updatePostNormal).length) {
          if (this.post.type === PostType.NORMAL) {
            postBody.updatePostNormal = updatePostNormal
          } else {
            postBody.updatePostShare = updatePostNormal
          }
        }
        if (this.post.type === PostType.NORMAL) {
          const album = {}
          if (this.imageUpload.length) {
            const formData = new FormData()
            this.imageUpload.forEach((el) => {
              formData.append('files', el)
            })
            const filesData = await this.$api.upload.uploadFilesToAws(formData)
            album.addFiles = filesData.data
          }
          if (this.removeFiles.length) {
            album.removeFiles = this.removeFiles
          }
          if (Object.keys(album).length) {
            postBody.updatePostNormal.album = album
          }
        }

        if (this.post.type === PostType.NORMAL) {
          const postData = await this.$api.post.updatePostNormal(this.post._id, postBody)
          this.$store.commit('post/updatePost', postData.data.post)
        } else {
          await this.$api.post.updatePostShare(this.post._id, postBody)
        }
        this.isEditPosted = false
        this.hiddenModalEdit()
      } catch (err) {
        //
        this.isEditPosted = false
        this.hiddenModalEdit()
      }
    },
    hiddenModalEdit () {
      this.$emit('hiddenEditModal', false)
    },
    handleChange (value) {
      this.privacy = value
    },
    resize () {
      const element = this.$refs.textareaEditPost
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
      const lastMentionIndex = this.$refs.textareaEditPost.innerHTML.lastIndexOf('@')
      const newText = this.$refs.textareaEditPost.innerHTML.substring(0, lastMentionIndex) + `<a href="/profile_detail/${item.userDetail._id}" class="mention-user">` + item.userDetail.fullname + '</a>' + ' ' + this.$refs.textareaEditPost.innerHTML.substring(lastMentionIndex + 10, this.$refs.textareaEditPost.innerHTML.length
      )
      this.$refs.textareaEditPost.innerHTML = newText
      // set focus
      const selection = window.getSelection()
      const range = document.createRange()
      selection.removeAllRanges()
      range.selectNodeContents(this.$refs.textareaEditPost)
      range.collapse(false)
      selection.addRange(range)
      this.$refs.textareaEditPost.focus()
    },
    append (emoji) {
      this.$refs.textareaEditPost.innerHTML += emoji
      this.resize()
    }
  }
}
</script>

<style lang="scss">
.edit-post{
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
.file-comment{
  @apply hidden
}
.scroll-edit-post::-webkit-scrollbar
{
  @apply w-[10px] bg-gray-700 rounded-lg ;
}

.scroll-edit-post::-webkit-scrollbar-thumb
{
  @apply border-2 border-solid border-gray-600 bg-gray-600 rounded-lg  ;
}
.disable-scroll {
  height: 100vh;
  overflow-y: hidden;
}
</style>
