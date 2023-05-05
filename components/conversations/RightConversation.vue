<template>
  <div>
    <div class="flex flex-col content-center items-center mt-6">
      <div class="py-2">
        <div class="relative">
          <div class="rounded-full overflow-hidden">
            <img class="w-[100px] h-[100px] object-cover" :src="user.avatar || avatar" alt="photo">
          </div>
          <div v-if="isOnline" class="w-4 h-4 right-2 bottom-[2px]  bg-green-600 absolute rounded-full border-[1.8px] border-black" />
        </div>
      </div>
      <div class="font-semibold text-lg cursor-pointer">
        {{ user.fullname }}
      </div>
      <div class="text-sm opacity-80">
        {{ isOnline ? 'Active now' :'Offline' }}
      </div>
      <div class="flex py-8">
        <div class="flex flex-col">
          <div class="flex flex-col text-center">
            <nuxt-link class="w-12 h-12 rounded-full flex justify-center items-center bg-gray-500 cursor-pointer" :to="`/profile_detail/${user._id}`" tag="div">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-person-circle text-white"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
              </svg>
            </nuxt-link>
            Profile
          </div>
        </div>
      </div>
    </div>
    <div class="ml-[32px]">
      <div class="flex flex-col">
        <div class="flex justify-between p-[10px] rounded-lg hover:bg-gray-800 cursor-pointer" @click="isKeyThree = !isKeyThree">
          <div class=" text-base">
            Media, files
          </div>
          <div>
            <svg
              v-if="!isKeyThree"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
            <svg
              v-if="isKeyThree"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-chevron-up"
              viewBox="0 0 16 16"
            >
              <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
            </svg>
          </div>
        </div>
        <div v-if="isKeyThree">
          <div class="flex p-[10px] rounded-lg hover:bg-gray-800 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-images"
              viewBox="0 0 16 16"
            >
              <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
            </svg>
            <div class="text-base pl-[8px]">
              Media
            </div>
          </div>
          <div class="flex p-[10px] rounded-lg hover:bg-gray-800 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-file-earmark-text"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
              <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
            </svg>
            <div class="text-base pl-[8px]">
              File
            </div>
          </div>
        </div>
        <div class="flex justify-between p-[10px] rounded-lg hover:bg-gray-800 cursor-pointer" @click="isKeyFour = !isKeyFour">
          <div class=" text-base">
            Privacy & support
          </div>
          <div>
            <svg
              v-if="!isKeyFour"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
            <svg
              v-if="isKeyFour"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-chevron-up"
              viewBox="0 0 16 16"
            >
              <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
            </svg>
          </div>
        </div>
        <div v-if="isKeyFour">
          <div class="flex p-[10px] rounded-lg hover:bg-gray-800 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-person-slash"
              viewBox="0 0 16 16"
            >
              <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465l3.465-3.465Zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465Zm-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
            </svg>
            <div class="text-base pl-[8px]">
              Block
            </div>
          </div>
          <!-- <div class="flex p-[10px] rounded-lg hover:bg-gray-800 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-pin-angle"
              viewBox="0 0 16 16"
            >
              <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146zm.122 2.112v-.002.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a4.507 4.507 0 0 0-.288-.076 4.922 4.922 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a4.924 4.924 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034.114 0 .23-.011.343-.04L9.927 2.028c-.029.113-.04.23-.04.343a1.779 1.779 0 0 0 .062.46z" />
            </svg>
            <div class="text-base pl-[8px]">
              Báo cáo
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    isOnline: {
      type: Boolean,
      default: () => Boolean,
      required: false
    }
  },
  data () {
    return {
      isKeyOne: false,
      isKeyTwo: false,
      isKeyThree: false,
      isKeyFour: false,
      isNotification: true
    }
  },
  computed: {
    avatar () {
      return this.$store.getters.avatar
    }
  }
}
</script>
<style lang="scss"></style>
