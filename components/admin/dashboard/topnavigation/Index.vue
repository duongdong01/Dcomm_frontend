<template>
  <header class="bg-body h-20 items-center relative w-full z-10">
    <div class="flex flex-col h-full justify-center mx-auto px-3 relative">
      <div
        class="
          flex
          items-center
          pl-1
          relative
          w-full
          sm:ml-0 sm:pr-2
          lg:max-w-68
        "
      >
        <div class="flex left-0 relative w-3/4">
          <div class="flex group h-full items-center relative w-12">
            <button
              type="button"
              aria-expanded="false"
              aria-label="Toggle sidenav"
              class="text-4xl text-white focus:outline-none lg:hidden"
              @click="toggle"
            >
              &#8801;
            </button>
          </div>
        </div>
        <div
          class="
            flex
            items-center
            justify-end
            ml-5
            p-1
            relative
            w-full
            sm:mr-0 sm:right-auto
          "
        >
          <!-- <a href="#" class="block pr-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </a> -->
          <!-- <a href="#" class="block pr-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a> -->
          <button class="relative pr-2" @focusout="hideDropDown">
            <div class="flex justify-center items-center gap-[6px] btn-avatar h-12 px-1" @click="showDropDown()">
              <img v-if="isLoaded" :src="user.avatar || imageData" alt="avatar" class="w-[40px] h-[40px] rounded-full object-cover">
              <div v-if="!isLoaded" class="bg-white w-[38px] h-[38px] rounded-full" />
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
            </div>
            <!-- dropdown -->

            <div v-if="isShowDropDown" class="absolute bg-body w-64 min-h-56 rounded-xl top-[66px] right-0 flex flex-col py-[10px]  text-white font-normal text-base space-y-2 px-1">
              <nuxt-link
                tag="div"
                :to="{
                  name: 'profile_detail-id',params :{id:user._id}
                }"
                class="flex gap-2 rounded-md hover:bg-gray-500 w-full px-5 py-2 -top-[2px] text-start  items-center"
                @click.native="hideDropDown"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1 text-white min-w-6 min-h-6 w-6 h-6"
                  data-v-58a38da4=""
                ><path fill-rule="evenodd" clip-rule="evenodd" d="M17.146 16.9953C18.9116 15.192 20 12.7231 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 12.7231 1.08843 15.192 2.85398 16.9953C4.02765 14.2074 6.78524 12.25 10 12.25C13.2148 12.25 15.9723 14.2074 17.146 16.9953ZM6.75 7.5C6.75 5.70507 8.20507 4.25 10 4.25C11.7949 4.25 13.25 5.70507 13.25 7.5C13.25 9.29493 11.7949 10.75 10 10.75C8.20507 10.75 6.75 9.29493 6.75 7.5Z" fill="#D1D5DB" class="fill-current" /><circle
                  cx="10"
                  cy="10"
                  r="9"
                  stroke="#D1D5DB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="stroke-current "
                /></svg>
                <p class="text-start">
                  {{ user.fullname }}
                </p>
              </nuxt-link>
              <hr class="mx-4 text-gray-400">
              <nuxt-link to="/" class="flex gap-2 hover:bg-gray-500 w-full px-5 py-2 rounded-md" tag="div">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-arrow-right-circle-fill mr-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
                Go to home
              </nuxt-link>

              <div class="flex gap-2 hover:bg-gray-500 w-full px-5 py-2 rounded-md" @click="logout">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1 w-6 h-6 text-white"
                  data-v-58a38da4=""
                ><path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C3.34315 0 2 1.34315 2 3V9H10.5858L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L13.7071 9.29289C14.0976 9.68342 14.0976 10.3166 13.7071 10.7071L9.70711 14.7071C9.31658 15.0976 8.68342 15.0976 8.29289 14.7071C7.90237 14.3166 7.90237 13.6834 8.29289 13.2929L10.5858 11H2V17C2 18.6569 3.34315 20 5 20H15C16.6569 20 18 18.6569 18 17V3C18 1.34315 16.6569 0 15 0H5Z" fill="#D1D5DB" class="fill-current" /></svg>
                Log out
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TopNavigation',
  inject: ['toggle'],
  data () {
    return {
      isShowDropDown: false,
      user: {},
      isLoaded: false
    }
  },
  async created () {
    await this.getMe()
  },
  methods: {
    hideDropDown () {
      this.isShowDropDown = false
    },
    showDropDown () {
      this.isShowDropDown = !this.isShowDropDown
    },
    async getMe () {
      try {
        this.isLoaded = false
        if (window.localStorage.getItem('access_token')) {
          const dataUser = await this.$api.user.getMe()
          this.user = dataUser.data.user
          console.log(this.user)
          // this.isAdmin = dataUser.data.isAdmin
          // this.$store.commit('setUserInfo', this.user)
        }
        this.isLoaded = true
      } catch (err) {
      }
    },
    logout () {
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('refresh_token')
      window.localStorage.removeItem('isAdmin')
      this.$router.push('/auth/login')
    }
  }
}
</script>
