<template>
  <nuxt-link class="flex space-x-4 rounded-xl cursor-pointer px-1 py-2 relative" :to="`/conversation/direct/${discussion._id}`" tag="div" :class="$route.path.split('/')[3]===discussion._id ? 'bg-[#252f3c] hover:opacity-90':' hover:bg-drak_chat'">
    <div class="flex relative min-w-[52px]">
      <img :src=" discussion.userChat.avatar|| avatar" alt="photo" class="w-14 h-14 rounded-full">
      <div v-if="isOnline" class="w-4 h-4 right-1 bottom-0  bg-green-600 absolute rounded-full border-2 border-black" />
    </div>
    <div class="flex flex-col justify-center pr-5 ">
      <h1 class="text-white text-base">
        {{ discussion.userChat.fullname }}
      </h1>
      <div v-if="discussion.conversationUser" class="flex text-[14px] font-normal text-gray-400">
        <p v-if="discussion.conversationUser.type==='TEXT'" class="relative 2xl:max-w-[180px] truncate lg:max-w-[160px]">
          <span v-if="discussion.conversationUser.isOwner">  You: </span> {{ discussion.conversationUser.message }} <span class="-mt-1 ml-1 absolute right-0">.</span>
        </p>
        <p v-else class="relative">
          <span v-if="discussion.conversationUser.isOwner">  You send file  </span>
          <span v-else>  {{ discussion.userChat.fullname }} send file  </span>
          <span class="-mt-1 ml-1 absolute">.</span>
        </p>
        <p class="pl-2 text-[14px]">
          {{ timeAgo(discussion.conversationUser.createdAt) }}
        </p>
      </div>
      <div v-else class="text-gray-400 text-[14px]">
        You are now connected
      </div>
    </div>
    <div v-if="discussion.countNewMessage >0" class="flex h-full items-center absolute right-2">
      <div class="w-3 h-3 float-right  bg-blue-500 rounded-full mb-2" />
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    discussion: {
      type: Object,
      default: () => {}
    },
    isOnline: {
      type: Boolean,
      default: () => false,
      required: false
    }
  },
  data () {
    return {
      conversationId: '111111111'
    }
  },
  computed: {
    avatar () {
      return this.$store.getters.avatar
    }
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
        return 'now'
      }
      if (result / 60 < 60) {
        result = Math.ceil(result / 60)
        return `${result}m`
      }
      if (result / 3600 < 24) {
        result = (result / 3600).toFixed()
        return `${result}h`
      }
      if (result / 86400 < 5) {
        result = (result / 86400).toFixed()
        return `${result}d`
      }
      const dateResult = this.$dayjs(time).format('DD YYYY')
      return `${monthNames[getMonth]} ${dateResult}`
    }
  }
}
</script>
