<template>
  <div class="bg-edit w-[350px] rounded-lg box shadow-gray-800 py-1">
    <div class="flex flex-row">
      <div class="m-[10px] relative">
        <nuxt-link tag="div" class="overflow-hidden rounded-full" :to="`/profile_detail/${friend.userDetail._id}`">
          <img class="w-[100px] h-[100px] object-cover cursor-pointer" :src="friend.userDetail.avatar" alt="photo">
        </nuxt-link>
        <div class="absolute bottom-2.5 right-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-circle-fill"
            viewBox="0 0 16 16"
          >
            <circle class="text-[#31a24c]" cx="8" cy="8" r="8" />
          </svg>
        </div>
      </div>
      <div class="mt-2 space-y-2">
        <div class="text-base font-bold">
          {{ friend.userDetail.fullname }}
        </div>
        <div v-if="friend.mutualCount +1 > 0" class="flex flex-row ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-people-fill text-white w-5 h-5"
            viewBox="0 0 16 16"
          >
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          </svg>
          <div class="ml-[10px] text-sm">
            <!-- {{ friend.mutualCount > 0 ? friend.mutualCount :'' }} {{ friend.mutualCount > 0 ? 'mutual friends' :'' }} -->
            10 mutual friends
          </div>
        </div>
        <div class="flex flex-row justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-person-check-fill text-white"
            viewBox="0 0 16 16"
          >
            <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
          <div class="ml-[10px] text-sm">
            Your friend since {{ $dayjs(friend.userDetail.createdAt).format('MMM Do YYYY') }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center gap-x-1.5 mb-4 mr-6">
      <button class="basis-5/12 p-2  ml-3 bg-gray-300 hover:bg-gray-400 rounded-lg cursor-pointer flex justify-center items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-person-check-fill text-black mr-1"
          viewBox="0 0 16 16"
        >
          <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
        <span class="text-black font-medium"> Friends </span>
      </button>
      <div class="basis-5/12 p-2 text-center bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer flex justify-center items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-messenger text-white mr-1"
          viewBox="0 0 16 16"
        >
          <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z" />
        </svg>
        <span class="text-white font-medium"> Message </span>
      </div>
      <div class="basis-12 p-2 max-w-[38px] bg-gray-500 hover:bg-gray-600 rounded-lg cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path class="text-center" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    friend: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => {
      }
    }
  }
}
</script>

<style scoped>
.bg-edit{
   background-color: rgb(28, 33, 46);
}
.box {
    box-shadow: 0px -1px 20px 0px rgb(17 24 39);
}

</style>
