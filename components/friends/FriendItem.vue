<template>
  <div class="flex text-white items-center p-3 rounded-lg bg-edit ">
    <div class="w-20 min-h-[80px]  rounded-md relative" @mouseover="upHere = true" @mouseleave="upHere=false">
      <nuxt-link tag="div" :to="`/profile_detail/${friend.userDetail._id}`">
        <img class="w-20 h-20 object-cover rounded-md cursor-pointer" :src="friend.userDetail.avatar" alt="photo">
      </nuxt-link>
      <div v-if="upHere" class="z-50 absolute bottom-[90%] transition-all">
        <UserView :user-id="friend.userDetail._id" />
        <!-- <friend-view :friend="friend" /> -->
      </div>
    </div>
    <div class="flex-1 min-w-[45%] pl-[16px]">
      <div class="relative flex-inline w-fit" @mouseover="upHere2 = true" @mouseleave="upHere2=false">
        <nuxt-link tag="span" :to="`/profile_detail/${friend.userDetail._id}`" class="font-medium text-base hover:decoration-solid cursor-pointer hover:underline ">
          {{ friend.userDetail.fullname }}
        </nuxt-link>
        <div v-if="upHere2" class="z-50 absolute bottom-4 transition-all">
          <UserView :user-id="friend.userDetail._id" />
        </div>
      </div>
      <div class="font-light text-sm">
        {{ friend.mutualCount > 0 ? friend.mutualCount :'' }} {{ friend.mutualCount > 0 ? 'mutual friends' :'' }}
      </div>
    </div>
    <button v-if="isOwner" class="rounded-full p-1 bg-edit3 relative" @click="toggleClick" @focusout="change">
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
      <div v-if="isClick" class="p-2 bg-gray-600 bg-edit4 gap-2 absolute z-10 top-[36px] min-w-[120px] rounded-md flex" @click="removeFriendByUserId(friend.userDetail._id)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-person-dash h-5 w-5"
          viewBox="0 0 16 16"
        >
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
        </svg>
        <div>
          Unfriend
        </div>
      </div>
    </button>
  </div>
</template>
<script>
// import FriendView from './FriendView.vue'
import UserView from './UserView.vue'
export default {
  components: { UserView },
  props: {
    friend: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => {
      }
    },
    isOwner: {
      type: Boolean,
      default: () => Boolean
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
    },
    async removeFriendByUserId (userId) {
      try {
        this.$emit('unfriend', userId)
        await this.$api.friend.removeFriendByUserId(userId)
      } catch (err) {
        this.$toast.error(err.data.message)
      }
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
