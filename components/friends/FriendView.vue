<template>
  <div class="bg-edit w-[350px] rounded-lg box shadow-gray-800 py-1">
    <div class="flex flex-row">
      <div class="m-[10px] relative">
        <div class="overflow-hidden rounded-full">
          <img class="w-[100px] h-[100px] object-cover cursor-pointer" :src="friend.userDetail.avatar" alt="photo">
        </div>
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
      <div class="mt-[20px] space-y-3">
        <div class="text-base font-bold">
          {{ friend.userDetail.fullname }}
        </div>
        <div v-if="friend.mutualCount > 0" class="flex flex-row ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-person-lines-fill"
            viewBox="0 0 16 16"
          >
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
          </svg>
          <div class="ml-[10px] text-sm">
            {{ friend.mutualCount > 0 ? friend.mutualCount :'' }} {{ friend.mutualCount > 0 ? 'mutual friends' :'' }}
          </div>
        </div>
        <div class="flex flex-row ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-person-up w-5 h-5"
            viewBox="0 0 16 16"
          >
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
          </svg>
          <div class="ml-[10px] text-sm">
            {{ friend.userDetail.createdAt }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center gap-x-1.5 mb-4 mr-6">
      <div class="basis-5/12 p-2 text-center ml-3 bg-gray-500 hover:bg-gray-600 rounded-lg cursor-pointer">
        Bạn Bè
      </div>
      <div class="basis-5/12 p-2 text-center bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer">
        Nhắn Tin
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
        // mutualCount: 0,
        // userDetail: {
        //   _id: '',
        //   fullname: '',
        //   avatar: '',
        //   coverImage: '',
        //   createdAt: '2023-04-05T14:54:35.935Z'
        // }
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
