<template>
  <div class="flex space-x-2 items-center my-3" :class="isOwner ? 'justify-end':'justify-start'">
    <div class="max-w-[46%] flex w-full flex-col space-y-2">
      <div class="flex space-x-2 items-end" :class="isOwner ? 'justify-end':'justify-start'">
        <div v-if="!isOwner" class="flex items-end h-full min-w-[40px]">
          <img :src="message.userSender.avatar ||avatar" alt="photo" class="w-10 h-10 rounded-full object-cover">
        </div>
        <div class="flex">
          <div class="flex h-full flex-col ">
            <div v-if="message?.stickerUrl" :class="isOwner ? ' justify-end':' justify-start'" class="flex w-full">
              <img :src="message.stickerUrl" alt="photo" class="max-w-[50%]">
            </div>
            <div v-if="message.conversationFile.length" class="grid  gap-1 " :class="message.conversationFile.length===1 ? 'grid-cols-1':'grid-cols-2'">
              <div v-for="(item,index) in message.conversationFile" :key="index">
                <img v-if="item.type==='IMAGE'" :src="item.url " alt="photo" class="rounded-lg shadow-sm max-h-[200px]" :class="isOwner? 'float-right':'float-left'">
                <video v-if="item.type==='VIDEO'" class="rounded-lg shadow-sm max-h-[200px]" :class="isOwner? 'float-right':'float-left'" preload="metadata">
                  <source :src="item.url" type="video/mp4">
                </video>
                <a v-if="item.type==='DOCS'" target="_blank" :href="item.url" class="py-6 px-4 max-h-[200px] bg-gray-500 flex items-end rounded-xl" :class="isOwner? 'float-right':'float-left'">
                  <div>
                    <img src="@/static/file_icon.png" alt="photo" class="w-12">
                  </div>
                  <div class="flex flex-col px-1">
                    <p>{{ item.size }}</p>
                    <div class="max-w-[140px] truncate">
                      {{ item.name }}
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div v-if="message.message && message.message.length" class="w-full flex mt-[4px] " :class="isOwner ? ' justify-end':' justify-start'">
              <div :class="isOwner ? 'text-white bg-blue-500':'bg-gray-600'" class="w-fit text-white px-4 py-[10px]  text-content rounded-3xl relative">
                {{ message.message }}
                <div v-if="isOwner" class="w-3 h-3 bg-gray-600 rounded-full flex  items-center justify-center absolute bottom-0 -right-[13.5px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check text-gray-400"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => {}
    },
    isOwner: {
      type: Boolean,
      default: () => Boolean
    }
  },
  computed: {
    avatar () {
      return this.$store.getters.avatar
    }
  }
}
</script>

<style lang="scss">
.text-content {
  // inline-size: 200px;
  overflow-wrap: break-word;
}
</style>
