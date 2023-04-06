<template>
  <div class="flex text-white items-center p-3 rounded-lg bg-edit relative">
    <div class="w-20 min-h-[80px] overflow-hidden rounded-md" @mouseover="upHere = true" @mouseleave="upHere = false">
      <img class="w-20 min-h-[80px]" :src="current.avatar" alt="">
    </div>
    <div class="flex-1 min-w-[45%] pl-[16px]">
      <span class="font-medium text-base">
        {{ current.userName }}
      </span>
      <div class="font-light text-sm">
        {{ current.userTitle }}
      </div>
    </div>
    <button class="rounded-full p-1 bg-edit3 relative" @click="togleClick" @focusout="change">
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
          Hủy kết bạn
        </div>
      </div>
    </button>
    <friend-view v-if="upHere || upHere2" :current="current" class="z-50 absolute top-25 transition-all" @mouseover.stop="upHere2 = true" @mouseleave.stop="upHere2 = false" />
  </div>
</template>
<script>
import FriendView from './FriendView.vue'
export default {
  components: { FriendView },
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
    togleClick () {
      this.isClick = !this.isClick
    }
  }
}
</script>

<style scoped>
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
