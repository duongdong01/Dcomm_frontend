<template>
  <div class="flex space-x-2 mt-2">
    <div class="min-w-[40px]">
      <a href="#" class="avatar_user  rounded-full cursor-pointer ">
        <img :src="comment?.owner?.avatar" class="rounded-full w-10 h-10 object-cover" alt="avatar">
      </a>
    </div>
    <div class="flex flex-col">
      <div class="flex space-x-2 relative">
        <div class="bg-gray-700 px-3 rounded-2xl text-[14px]  w-fit py-1 min-h-[40px] flex-col max-w-2xl relative">
          <p class="cursor-pointer font-medium">
            {{ comment?.owner?.fullname }}
          </p>
          <div v-if="comment && comment.content" class="font-light text-comment" v-html="comment?.content" />
        </div>
        <div class="w-5 h-5 overflow-hidden rounded-full absolute right-3 bottom-0 upvoted flex justify-center items-center cursor-pointer">
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
        <!-- <p class="text-[14px]">
              {{ post?.countReaction }}
            </p> -->
        </div>
        <div class="flex justify-center items-center cursor-pointer">
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
        </div>
      </div>
      <img v-if="comment && comment.fileUrl" :src="comment.fileUrl" alt="photo" class="max-h-[220px] max-w-[240px] rounded-2xl cursor-pointer">
      <div class="flex text-[12px] space-x-3 pl-2 font-medium">
        <div class="hover:underline cursor-pointer text-upvote ">
          Upvote
        </div>
        <div>Reply</div>
        <div class="font-normal">
          {{ $dayjs(comment.createdAt).fromNow(true) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    comment: {
      type: Object,
      default: () => {}
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
</style>
