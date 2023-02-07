<template>
  <div class="bg-gray-800 h-[74px] grid grid-cols-10 gap-4  w-full z-50 max-w-[1440px]">
    <div class="col-span-8 flex space-x-7">
      <div class="flex justify-center">
        <h1 class="dscvr_logo items-center flex space-x-2 cursor-pointer">
          <img src="@/static/logo/dscvr-logo.png" class="max-w-[33px] rounded-full" alt="logo">
          <span class="text-white font-semibold text-lg">DTTD</span>
        </h1>
      </div>
      <div class="search_header flex items-center w-full leading-[70px]">
        <input type="search" placeholder="Search" class="input_search w-full h-12 text-base  text-white bg-main_color pl-11 rounded-lg">
        <i class="fa-solid fa-magnifying-glass absolute ml-4 text-base text-white" />
      </div>
    </div>
    <div class="flex items-center col-span-2 gap-2">
      <div class="flex space-x-1">
        <button class="bg-main-color btn-notification focus:outline-none h-12 w-12 flex items-center justify-center relative" title="Notifications">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-bell-fill text-white"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
          </svg>
          <div class="absolute rounded-[50%] w-[22px] h-[22px] flex justify-center items-end bg-red-500 top-[1px] left-6">
            <p class="text-white font-medium text-[13px]">
              9+
            </p>
          </div>
        </button>
        <button class="bg-main-color btn-messenger focus:outline-none h-12 w-12 flex items-center justify-center relative" title="messenger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-messenger text-white"
            viewBox="0 0 16 16"
          >
            <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z" />
          </svg>
          <div class="absolute rounded-[50%] w-[22px] h-[22px] flex justify-center items-end bg-red-500 top-[1px] left-6">
            <p class="text-white font-medium text-[13px]">
              2
            </p>
          </div>
        </button>
      </div>
      <button class="flex justify-center items-center gap-[7px] btn-avatar h-12 px-1">
        <img src="@/static/avatar/avatar-dscvr.png" alt="avatar" class="w-8 h-8 rounded-full">
        <div class="flex flex-col text-sm font-medium text-white">
          <h1 class="text-white font-bold truncate max-w-[96px]">
            Duong1102a
          </h1>
          <div class="flex gap-1">
            <img src="@/static/logo/dscvr-logo.png" alt="" class="w-4 h-4"> <span>230</span>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class=" text-white btn-svg_select"
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          data-v-58a38da4=""
        ><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onSearch (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss">
.search_header>{

    .input_search{
     @apply  outline-none focus:border-[0.1px] border-blue-500
    }
    .input_search::placeholder{
      @apply text-lg
    }
}
.btn-notification:hover{
  @apply  bg-btn_hover rounded-lg
}
.btn-messenger:hover{
  @apply  bg-btn_hover rounded-lg

}
.btn-avatar:hover{
  @apply  bg-btn_hover rounded-lg
}
// .btn-svg_select{
//   @apply  bg-btn_hover rounded-lg
// }
</style>
