<template>
  <div class="flex flex-col bg-gray_850 rounded-xl mt-4 text-white px-6  pt-5 pb-4 text-base outline-none border-gray-700 border">
    <header class="flex justify-between cursor-pointer">
      <div class="flex">
        <div class="w-10 h-10 overflow-hidden">
          <img src="@/static/avatar/avatar1.jpg" alt="avatar" class="rounded-full">
        </div>
        <div class="flex flex-col ml-3 -mt-1">
          <p class="text-white font-medium">
            {{ post?.owner.fullname }}
          </p>
          <div class="flex items-center gap-1 justify-center w-full -mt-2">
            <p v-if="post" class="font-light text-white/80 text-sm">
              {{ timeAgo(post.createdAt) }}
            </p>
            <p class="pb-3">
              .
            </p>
            <svg
              v-if="post?.privacy ===PostPrivacy.PUBLIC"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-globe-americas text-white/80"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
            </svg>
            <svg
              v-if="post?.privacy ===PostPrivacy.FRIENDS"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-people-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>
            <svg
              v-if="post?.privacy ===PostPrivacy.ONLY_ME"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-lock-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center -mt-1">
        <div class="hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-three-dots"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </div>
      </div>
    </header>
    <div class="leading-9 flex justify-center flex-col">
      <div v-if="post?.normal && post?.normal?.content?.length" v-html="post.normal.content" />
      <div v-if="post?.albums" class="mt-2 flex justify-center items-center overflow-hidden w-full max-h-[600px] rounded-md">
        <lightbox :items="post.albums.albumFileDetails.map(el=>el.file)" class="w-full" />
      </div>
      <div class="flex mt-8 gap-2">
        <div class="relative flex gap-[6px]  px-4 py-1 rounded-lg justify-center items-center hover:bg-indigo-500 cursor-pointer transition-all max-w-[80px] max-h-[40px]" :class="post?.isReactions ? 'upvoted': 'bg-indigo-600'" title="Upvote" @click="reactionPost(post._id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-arrow-up-short text-white min-w-[28px]"
            viewBox="0 0 16 16"
          >
            <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
          </svg>
          <p class="text-[14px]">
            {{ post?.countReaction }}
          </p>
        </div>
        <div class=" flex justify-center cursor-pointer hover:bg-btn_hover items-center gap-2 px-4  rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-chat-left"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          </svg>
          <p class="-mt-[2px]">
            0
          </p>
        </div>
        <div class="flex justify-center items-center cursor-pointer hover:bg-btn_hover rounded-lg px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-coin"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
          </svg>
        </div>
        <div class="flex justify-center items-center cursor-pointer hover:bg-btn_hover rounded-lg px-4 ">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-white"
            data-v-6ce1eb9f=""
          ><path d="M1.42862 19C1.42192 19 1.4169 19 1.4102 19C1.17917 18.9876 0.996697 18.7518 1.00005 18.4664C1.00172 18.3361 1.24781 5.59593 11.2857 5.24433V1.52982C11.2857 1.32507 11.3812 1.13893 11.5302 1.05207C11.6775 0.963133 11.8566 0.99002 11.9838 1.11825L18.841 8.00125C18.9414 8.1026 19 8.25358 19 8.41283C19 8.57208 18.9414 8.72306 18.8426 8.8244L11.9855 15.7074C11.8566 15.8356 11.6791 15.8605 11.5302 15.7736C11.3812 15.6867 11.2857 15.5006 11.2857 15.2958V11.5937C2.35439 11.7944 1.87225 18.2306 1.85551 18.5078C1.84045 18.787 1.65295 19 1.42862 19Z" stroke="#9CA3AF" stroke-width="1.5" class="stroke-current" /></svg>
        </div>
      </div>
    </div>
    <Comment class="mt-4" :post-id="post?._id" />
  </div>
</template>

<script>
import Comment from '../comment/Comment.vue'
import Lightbox from '../lightbox/Lightbox.vue'
import { PostPrivacy } from '~/constants/post'
export default {
  components: { Lightbox, Comment },
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return {
      lengthImg: [1],
      images: [
        'https://duong1310.s3.ap-southeast-2.amazonaws.com/1681394528876%20-5cbca2e7-c73f-4d22-8cc0-d3f424e8d080-934563089.mp4',
        'https://i.wifegeek.com/200426/5ce1e1c7.jpg',
        'https://i.wifegeek.com/200426/5fa51df3.jpg',
        'https://i.wifegeek.com/200426/663181fe.jpg',
        'https://i.wifegeek.com/200426/2d110780.jpg',
        'https://i.wifegeek.com/200426/e73cd3fa.jpg',
        'https://i.wifegeek.com/200426/15160d6e.jpg',
        'https://i.wifegeek.com/200426/d0c881ae.jpg',
        'https://i.wifegeek.com/200426/a154fc3d.jpg',
        'https://i.wifegeek.com/200426/71d3aa61.jpg'
      ],
      files: [],
      PostPrivacy,
      postDetail: null,
      isReactionPost: false
    }
  },
  created () {
    this.postDetail = { ...this.post }
  },
  methods: {
    timeAgo (time) {
      const getTime = new Date(time).getTime()
      const getMonth = new Date(time).getMonth()
      const currentDate = new Date().getTime()
      let result = (currentDate - getTime) / 1000
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
      if (result < 60) {
        return 'just now'
      }
      if (result / 60 < 60) {
        result = Math.ceil(result / 60)
        return `${result} minutes ago`
      }
      if (result / 3600 < 24) {
        result = Math.ceil(result / 3600)
        return `${result} hours ago`
      }
      if (result / 86400 < 5) {
        result = Math.ceil(result / 86400)
        return `${result} day ago`
      }
      const dateResult = this.$dayjs(time).format('DD YYYY')
      return `${monthNames[getMonth]} ${dateResult}`
    },
    reactionPost (postId) {
      this.$store.commit('post/toggleLikePost', postId)
      // if (this.postDetail.isReactions) {
      //   if (this.postDetail.countReaction > 0) {
      //     this.postDetail.countReaction -= 1
      //     this.postDetail.isReactions = false
      //   }
      // } else {
      //   this.postDetail.countReaction += 1
      //   this.postDetail.isReactions = true
      // }
    }
  }
}
</script>

<style lang="scss">
.upvoted{
  background: linear-gradient(90.9deg, #E21344 0%, #E85E23 82.29%, #EEAB00 100%);
}
</style>
