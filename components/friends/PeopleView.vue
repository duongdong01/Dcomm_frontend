<template>
  <div class="bg-edit w-[350px] rounded-lg box shadow-gray-800 py-1">
    <div class="flex flex-row">
      <div class="m-[10px] relative">
        <nuxt-link tag="div" class="overflow-hidden rounded-full" :to="`/profile_detail/${people._id}`">
          <img
            class="w-[100px] h-[100px] object-cover cursor-pointer"
            :src="people.avatar"
            alt="photo"
          >
        </nuxt-link>
      </div>
      <div class="mt-2 space-y-2">
        <div class="text-base font-bold">
          {{ people.fullname }}
        </div>

        <div v-if="people.mutualCount > 0" class="flex flex-row ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-people-fill text-white w-5 h-5"
            viewBox="0 0 16 16"
          >
            <path
              d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
            />
          </svg>
          <div class="ml-[10px] text-sm">
            {{ people.mutualCount > 0 ? people.mutualCount : '' }} {{ people.mutualCount > 0 ? 'mutual friends'
              : '' }}
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
            Your people since {{ $dayjs(people.createdAt).format('MMM Do YYYY') }}
          </div>
        </div>
        <div v-if="people.mutualCount === 0" class="flex flex-row ">
          <svg
            v-if="people.gender === 'FEMALE'"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-gender-female"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"
            />
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
            <path
              fill-rule="evenodd"
              d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
            />
          </svg>
          <div class="ml-[10px] text-sm">
            {{ people.gender === 'OTHER' ? 'Other' : '' }} {{ people.gender === 'FEMALE' ?
              'Female' : '' }} {{ people.gender === 'MALE' ? 'Male' : '' }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center gap-x-1.5 mb-4 mr-6">
      <button
        v-if="!isSendRequest"
        class="basis-5/12 p-2  ml-3 bg-gray-500 hover:bg-gray-400 rounded-lg cursor-pointer flex justify-center items-center "
        @click="createFriendRequest"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-person-fill-add"
          viewBox="0 0 16 16"
        >
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
        </svg>
        <span class="text-white font-medium pl-2">Add friends </span>
      </button>
      <button
        v-if="isSendRequest"
        class="basis-5/12 p-2  ml-3 bg-gray-300 hover:bg-gray-400 rounded-lg cursor-pointer flex justify-center items-center "
        @click="cancelFriendRequestByUserId"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-person-fill-x"
          viewBox="0 0 16 16"
        >
          <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z" />
        </svg>
        <span class="text-black font-medium pl-2">Cancel </span>
      </button>
      <div
        class="basis-5/12 p-2 text-center bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer flex justify-center items-center "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-messenger text-white mr-1"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"
          />
        </svg>
        <span class="text-white font-medium"> Message </span>
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
          <path
            class="text-center"
            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    people: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => {
      }
    },
    issend: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      isSendRequest: false
    }
  },
  watch: {
    issend () {
      this.isSendRequest = this.issend
    }
  },
  mounted () {
    this.isSendRequest = this.issend
  },
  methods: {
    createFriendRequest () {
      this.$emit('createFriendRequest')
    },
    cancelFriendRequestByUserId () {
      this.$emit('cancelFriendRequestByUserId')
    }
  }
}
</script>

<style scoped>
.bg-edit {
    background-color: rgb(28, 33, 46);
}

.box {
    box-shadow: 0px -1px 20px 0px rgb(17 24 39);
}
</style>
