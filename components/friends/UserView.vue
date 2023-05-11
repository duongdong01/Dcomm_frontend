<template>
  <div v-if="loaded" class="bg-edit w-[350px] rounded-lg box shadow-gray-800 py-1 border-gray-700 border">
    <div class="flex flex-row">
      <div class="m-[10px] relative">
        <nuxt-link tag="div" class="overflow-hidden rounded-full" :to="`/profile_detail/${user._id}`">
          <img class="w-[100px] h-[100px] object-cover cursor-pointer" :src="user.avatar" alt="photo">
        </nuxt-link>
        <div v-if="isOnline" class="absolute bottom-2.5 right-1.5">
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
      <div class="mt-2 space-y-2">
        <div class="text-base font-bold">
          {{ user.fullname }}
        </div>

        <div v-if="mutualCount > 0" class="flex flex-row ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-people-fill text-white w-5 h-5"
            viewBox="0 0 16 16"
          >
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          </svg>
          <div class="ml-[10px] text-sm">
            {{ mutualCount > 0 ? mutualCount :'' }} {{ mutualCount > 0 ? 'mutual friends' :'' }}
          </div>
        </div>
        <div class="flex flex-row justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            data-v-1ebbdd90=""
          ><path
            d="M14.45 8.00078C14.45 11.563 11.5623 14.4508 8.00005 14.4508C4.43781 14.4508 1.55005 11.563 1.55005 8.00078C1.55005 4.43854 4.43781 1.55078 8.00005 1.55078C11.5623 1.55078 14.45 4.43854 14.45 8.00078Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current"
          /><path
            d="M8 4.40039V8.18039L10.16 9.44039"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current"
          /></svg>
          <div class="ml-[10px] text-sm">
            Member Since {{ $dayjs(user.createdAt).format('MMM Do YYYY') }}
          </div>
        </div>
        <div v-if="mutualCount === 0" class="flex flex-row ">
          <svg
            v-if="user.gender ==='FEMALE'"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-gender-female"
            viewBox="0 0 16 16"
          >
            <path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-gender-male"
            viewBox="0 0 16 16"
          >
            <path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
          </svg>
          <div class="ml-[10px] text-sm">
            {{ user.gender=== 'OTHER' ? 'Other':'' }} {{ user.gender=== 'FEMALE' ? 'Female' :'' }} {{ user.gender=== 'MALE' ? 'Male' :'' }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isYourProfile" class="flex flex-row items-center gap-x-1.5 mb-4  justify-center mx-1">
      <button v-if="!isFriend && !isPending && !isReceiver" :disabled="isDisable" class="basis-5/12 px-2 py-[6px] text-center bg-gray-500  hover:bg-gray-400 text-white font-medium rounded-lg cursor-pointer flex justify-center items-center  max-h-[37px] " @click="createFriendRequest()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-person-plus w-5 h-5"
          viewBox="0 0 16 16"
        >
          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
          <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
        </svg>
        <span class="ml-1">Add friend </span>
      </button>
      <!-- is Friend -->
      <button v-if="isFriend" :disabled="isDisable" class="basis-5/12 px-2 py-[6px]  bg-gray-600 hover:bg-gray-700 text-white rounded-lg cursor-pointer flex justify-center items-center max-h-[37px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-person-check-fill  mr-1"
          viewBox="0 0 16 16"
        >
          <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
        <span class="ml-1 font-medium">Friend</span>
      </button>
      <!-- isPending -->
      <button v-if="isPending " :disabled="isDisable" class="basis-5/12 px-2 py-[6px]  bg-gray-600 hover:bg-gray-700 text-white rounded-lg cursor-pointer flex justify-center items-center  max-h-[37px]" @click="cancelFriendRequestByUserId()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-person-dash w-5 h-5"
          viewBox="0 0 16 16"
        >
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
        </svg>
        <span class="ml-1"> Cancel</span>
      </button>
      <!-- isReceiver -->
      <button v-if="!isFriend && !isPending && isReceiver" :disabled="isDisable" class="basis-5/12 px-2 py-[6px]  bg-gray-600 hover:bg-gray-700 text-white rounded-lg cursor-pointer flex justify-center items-center  max-h-[37px]" @click="acceptFriendRequestByUserId()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-person-check-fill"
          viewBox="0 0 16 16"
        >
          <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
        <span class="ml-1">Accept </span>
      </button>

      <div class="basis-5/12 px-2 py-[6px] text-center bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer flex justify-center items-center  max-h-[37px]" @click="nextToConversation">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-messenger text-white mr-1"
          viewBox="0 0 16 16"
        >
          <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z" />
        </svg>
        <span class="text-white font-medium"> Message </span>
      </div>
      <div class="basis-12 px-2 py-[6px]  max-w-[38px] bg-gray-500 hover:bg-gray-600 rounded-lg cursor-pointer">
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
    <div v-else class="flex flex-row items-center gap-x-1.5 mb-4 mr-6 justify-center ">
      <nuxt-link class=" px-2 py-[6px]  ml-3  bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer flex justify-center items-center" tag="button" :to="`/profile_detail/${userId}`">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-person-check-fill text-white mr-1"
          viewBox="0 0 16 16"
        >
          <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
        <span class="text-white font-medium"> View your profile </span>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    userId: {
      type: String,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => String
    }
  },
  data () {
    return {
      isYourProfile: false,
      mutualCount: 0,
      mutualFriend: [],
      isDisable: false,
      isFriend: true,
      isPending: false,
      isReceiver: false,
      user: {},
      loaded: false,
      isOnline: false
    }
  },
  async created () {
    await this.getUserHover()
  },
  mounted () {
    if (!this.isYourProfile) {
      window.socket.emit('getOnlineGroupUsers', { userId: this.userId })
      window.socket.on('onlineGroupUsersReceived', this.handleOnline)
    }
  },
  beforeDestroy () {
    window.socket.off('onlineGroupUsersReceived', this.handleOnline)
  },
  methods: {
    handleOnline (data) {
      this.isOnline = data.isOnline
    },
    nextToConversation () {
      try {
        console.log('ok')
      } catch (error) {
        //
      }
    },
    async createFriendRequest () {
      try {
        this.isDisable = true
        this.isPending = true
        await this.$api.friend.createFriendRequest(this.userId)

        this.isDisable = false
      } catch (err) {
        this.isDisable = false
      }
    },
    async cancelFriendRequestByUserId () {
      try {
        this.isDisable = true
        this.isPending = false
        await this.$api.friend.cancelFriendRequestByUserId(this.userId)
        this.isDisable = false
      } catch (err) {
        this.isDisable = false
      }
    },
    async acceptFriendRequestByUserId () {
      try {
        this.isDisable = true
        this.isFriend = true
        await this.$api.friend.acceptFriendRequestByUserId(this.userId)
        this.isDisable = false
      } catch (err) {
        this.isDisable = false
        console.log(err)
      }
    },
    async getUserHover () {
      try {
        const userData = await this.$api.user.getUserProfile(this.userId)
        this.isYourProfile = userData.data.isYourProfile
        this.mutualCount = userData.data.mutualCount
        this.mutualFriend = userData.data.mutualFriend
        this.isFriend = userData.data.isFriend
        this.isPending = userData.data.isPending
        this.isReceiver = userData.data.isReceiver
        this.user = userData.data.user
        this.loaded = true
      } catch (err) {
        //
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
