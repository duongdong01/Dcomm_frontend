<template>
  <div class="flex space-x-2 mt-2 w-full item-comment">
    <div class="min-w-[40px]">
      <div class="relative" @mouseover="upHere=true" @mouseleave="upHere=false">
        <nuxt-link :to="`/profile_detail/${comment.ownerId}`" class="avatar_user  rounded-full cursor-pointer ">
          <img :src="comment?.owner?.avatar" class="rounded-full w-10 h-10 object-cover" alt="avatar">
        </nuxt-link>
        <div v-if="upHere" class="z-50 absolute  transition-all bottom-[90%]">
          <UserView :user-id="comment.ownerId" />
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full">
      <div class="flex space-x-2 relative">
        <div class="bg-gray-700 px-3 rounded-2xl text-[14px]  w-fit py-1 min-h-[40px] flex-col max-w-2xl relative">
          <p class="cursor-pointer font-medium">
            {{ comment?.owner?.fullname }}
          </p>
          <div v-if="comment && comment.content" class="font-light text-comment" v-html="comment?.content" />
        </div>
        <div class="flex h-full items-end">
          <div v-if="comment.countReaction >0" class="-ml-4 z-[2] items-center flex justify-center cursor-pointer bg-gray-500 py-1 pr-1 h-6 overflow-hidden  rounded-3xl">
            <button class="w-5 h-5 overflow-hidden rounded-full upvoted flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-up-short text-white min-w-[28px]"
                viewBox="0 0 16 16"
              >
                <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
              </svg>
            </button>
            <p class="text-[14px] text-white font-medium">
              {{ comment.countReaction }}
            </p>
          </div>
        </div>
        <div class="flex justify-center items-center cursor-pointer ml-1 rounded-full overflow-hidden">
          <button class="w-7 h-7 rounded-full  hover:bg-gray-700 flex justify-center items-center option-comment absolute top-0 right-0" @click.prevent="toggleShowOption" @focusout="showOptionComment(false)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
            <!-- delete + report post -->
            <div v-if="isShowOptionComment && comment.isOwner" class="flex flex-col py-2  absolute w-56 bg-gray-900 border-gray-700 border -right-[225px] top-0 rounded-xl z-[4]">
              <div v-if="comment.isOwner" class="text-white flex gap-2 text-[16px]  items-center hover:bg-gray-700 py-3 px-5 transition-all ease-in-out duration-300" @click="showModalEditComment">
                <svg

                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>

                Edit comment
              </div>
              <div v-if="comment.isOwner" class="text-white flex gap-2 text-[16px]  items-center hover:bg-gray-700 py-3 px-5 transition-all ease-in-out duration-300" @click="deleteComment">
                <svg

                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg>
                Delete comment
              </div>
            </div>
          </button>
        </div>
      </div>
      <img v-if="comment && comment.fileUrl" :src="comment.fileUrl" alt="photo" class="max-h-[220px] max-w-[240px] rounded-2xl cursor-pointer">
      <div class="flex text-[12px] space-x-3 pl-2 font-medium">
        <div class="hover:underline cursor-pointer hover:text-[#E85E23]" :class="comment.isReaction ? 'text-[#E85E23]':''" @click="upvoteComment">
          Upvote
        </div>
        <!-- <div class="cursor-pointer hover:text-[#E85E23]" @click="replyComment">
          Reply
        </div> -->
        <div class="font-normal">
          {{ $dayjs(comment.createdAt).fromNow(true) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserView from '../friends/UserView.vue'
import { ReactionOn } from '@/constants/reaction'
export default {
  components: { UserView },
  props: {
    comment: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      ReactionOn,
      isShowOptionComment: false,
      upHere: false,
      isReply: false,
      isShowCommentReply: false

    }
  },
  methods: {

    toggleShowOption () {
      this.isShowOptionComment = !this.isShowOptionComment
    },
    showModalEditComment () {
      //
    },
    async deleteComment () {
      this.$emit('deleteReply', this.comment._id)
      await this.$api.comment.deleteComment(this.comment._id)
    },
    replyComment () {
      this.isReply = true
    },
    showOptionComment (e) {
      this.isShowOptionComment = e
    },
    async upvoteComment () {
      try {
        await this.$api.comment.reactionComment({ on: ReactionOn.COMMENT, type: 'OK', commentId: this.comment._id })
        this.$emit('upvote', this.comment._id)
        // await this.$store.dispatch('comment/upvoteComment', { on: ReactionOn.COMMENT, type: ReactionType.OK, commentId: this.comment._id })
      } catch (err) {
        //
      }
    }
  }
}

</script>

  <style lang="scss">
  .text-comment{
    overflow-wrap: break-word;
  }
  .upvoted{
    background: linear-gradient(90.9deg, #E21344 0%, #E85E23 82.29%, #EEAB00 100%);
  }
  .text-upvote{
    color:#E85E23
    }
    .option-comment{
      @apply hidden
    }
    .item-comment:hover{
        .option-comment{
          @apply flex
        }
    }
  </style>
