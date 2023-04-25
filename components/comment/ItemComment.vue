<template>
  <div class="flex space-x-2 mt-2">
    <div class="min-w-[40px]">
      <a href="#" class="avatar_user  rounded-full cursor-pointer ">
        <img src="@/static/avatar/avatar1.jpg" class="rounded-full w-10 h-10" alt="avatar">
      </a>
    </div>
    <div class="flex flex-col">
      <div class="flex space-x-2">
        <div class="bg-gray-700 px-3 rounded-2xl text-[14px]  w-fit py-1 min-h-[40px] flex-col max-w-2xl">
          <p class="cursor-pointer font-medium">
            Duong Dong
          </p>
          <div class="font-light text-comment">
            Hello world hhhhhhhhhhhhhhhhhhhhhhhhhhhh hadha hadajd hadah dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
          </div>
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
      <img v-if="true" src="@/static/img-post-demo.jpg" alt="photo" class="max-h-[220px] max-w-[240px] rounded-2xl">
      <div class="flex text-[12px] space-x-3 pl-2 font-medium">
        <div>Upvote</div>
        <div>Reply</div>
        <div class="font-normal">
          17m
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.text-comment{
  overflow-wrap: break-word;
}
</style>
