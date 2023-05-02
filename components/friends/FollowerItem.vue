<template>
  <div class="h-20 flex justify-between border-solid border-b-2 border-gray-500">
    <div class="flex items-center ">
      <div>
        <nuxt-link :to="`/profile_detail/${follower.userSender._id}`" class="w-12 h-12 rounded-full mr-2 cursor-pointer" tag="div">
          <img class="w-12 h-12 object-cover rounded-full" :src="follower.userSender.avatar" alt="img">
        </nuxt-link>
      </div>
      <div>{{ follower.userSender.fullname }}</div>
    </div>
    <div class="flex items-center">
      <div class="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-md cursor-pointer mr-2 relative flex items-center overflow-hidden" @click="acceptFriendRequestById">
        Accept
        <div v-if="isAccept" class="absolute left-0 w-full h-full flex justify-center bg-gray-200 opacity-40" />
        <Loading v-if="isAccept" />
      </div>
      <button class="p-2 bg-btn_hover opacity-80 hover:opacity-100 rounded-md cursor-pointer relative" @click="isShowRefuse = !isShowRefuse" @focusout="change">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="currentColor"
          class="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg>
        <div v-if="isShowRefuse" class="absolute bg-btn_hover hover:opacity-100 p-2 rounded-md top-10 -left-2" @click="refuseFriendRequestById">
          refuse
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import Loading from '~/components/loading/Loading.vue'

export default {
  components: {
    Loading
  },
  props: {
    follower: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => {
      }
    }
  },
  data () {
    return {
      isShowRefuse: false,
      isAccept: false
    }
  },
  methods: {

    async acceptFriendRequestById () {
      try {
        this.isAccept = true
        await this.$api.friend.acceptFriendRequestById(this.follower._id)
        this.$emit('updateFollower', this.follower._id)
        this.isAccept = false
      } catch (error) {

      }
    },
    async refuseFriendRequestById () {
      try {
        await this.$api.friend.refuseFriendRequestById(this.follower._id)
        this.$emit('updateFollower', this.follower._id)
      } catch (error) {

      }
    },
    change () {
      this.isShowRefuse = false
    }
  }
}
</script>

<style lang="scss"></style>
