<template>
  <div class="bg-edit w-[350px] rounded-lg box shadow-gray-800">
    <div class="flex flex-row">
      <div class="m-[10px] relative">
        <div class="overflow-hidden rounded-full">
          <img class="w-[100px] h-[100px]" :src="current.avatar" alt="">
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
      <div class="mt-[20px]">
        <div class="text-base">
          {{ current.userName }}
        </div>
        <div class="flex flex-row pt-[10px] pb-[10px]">
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
            có n bạn chung
          </div>
        </div>
        <div class="flex flex-row pt-[10px] pb-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-house-door"
            viewBox="0 0 16 16"
          >
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
          </svg>
          <div class="ml-[10px] text-sm">
            {{ current.userTitle }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center gap-x-1.5 m-2 mb-4 mr-6">
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
    current: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        userName: 'DuongDong',
        userTitle: 'Bắc Giang',
        avatar: 'https://ianrmedia.unl.edu/images/resources/nilo-ren.jpg'
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
