<template>
  <div class="flex text-white items-center p-3 rounded-lg bg-edit ">
    <div class="w-20 min-h-[80px]  rounded-md relative" @mouseover="upHere = true" @mouseleave="upHere=false">
      <nuxt-link tag="div" :to="`/profile_detail/${friend.userDetail._id}`">
        <img class="w-20 min-h-[80px] object-cover rounded-md cursor-pointer" :src="friend.userDetail.avatar" alt="photo">
      </nuxt-link>
      <div v-if="upHere" class="z-50 absolute top-[98%] transition-all">
        <friend-view :friend="friend" />
      </div>
    </div>
    <div class="flex-1 min-w-[45%] pl-[16px]">
      <div class="relative flex-inline w-fit" @mouseover="upHere2 = true" @mouseleave="upHere2=false">
        <nuxt-link tag="span" :to="`/profile_detail/${friend.userDetail._id}`" class="font-medium text-base hover:decoration-solid cursor-pointer hover:underline ">
          {{ friend.userDetail.fullname }}
        </nuxt-link>
        <div v-if="upHere2" class="z-50 absolute top-[98%] transition-all">
          <friend-view :friend="friend" />
        </div>
      </div>
      <div class="font-light text-sm">
        {{ friend.mutualCount > 0 ? friend.mutualCount :'' }} {{ friend.mutualCount > 0 ? 'mutual friends' :'' }}
      </div>
    </div>
    <button class="rounded-full p-1 bg-edit3 relative" @click="toggleClick" @focusout="change">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        fill="currentColor"
        class="bi bi-three-dots"
        viewBox="0 0 16 16"
      >
        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
      </svg>
      <div v-if="isClick" class="p-[8px] bg-gray-600 bg-edit4 absolute z-10 top-[36px] min-w-[120px] rounded-md">
        <div>
          Unfriend
        </div>
      </div>
    </button>
  </div>
</template>
<script>
import FriendView from './FriendView.vue'
export default {
  components: { FriendView },
  props: {
    friend: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => {
      }
    }
  },
  data: () => {
    return {
      isClick: false,
      upHere: false,
      upHere2: false
    }
  },
  methods: {

    change () {
      this.isClick = false
    },
    toggleClick () {
      this.isClick = !this.isClick
    }
  }
}
</script>

<style lang="scss">
.bg-edit{
   background-color: rgb(28, 33, 46);
}
.bg-edit2{
   background-color: rgba(67, 94, 163, 0.5);
}
.bg-edit3:hover{
   background-color: rgba(67, 94, 163, 0.5);
}
.bg-edit4:hover{
   background-color:  rgb(55 65 81);
}
</style>
