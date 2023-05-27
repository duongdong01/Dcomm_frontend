<template>
  <div class="bg-[#121212] h-[74px] grid grid-cols-10 gap-4  w-full z-50" style="box-shadow:rgb(0 0 0 / 8%) 0px 4px 20px 0px">
    <div class="col-span-8 grid grid-cols-4">
      <div class="flex justify-start col-span-1">
        <nuxt-link tag="h1" to="/" class="dscvr_logo items-center flex space-x-2 cursor-pointer">
          <img src="@/static/logo/dscvr-logo.png" class="max-w-[38px] rounded-full object-cover" alt="logo">
          <span class="text-white font-semibold text-lg">DCOMM</span>
        </nuxt-link>
      </div>
      <div class="search_header flex justify-start items-center w-full col-span-3 px-2">
        <SearchHeader />
      </div>
    </div>
    <div class="flex items-center col-span-2 gap-6 justify-end">
      <div class="flex space-x-4">
        <button class="bg-main-color btn-notification focus:outline-none h-12 w-12 flex items-center justify-center relative" title="Notifications" :disabled="$route.path.split('/')[1]==='notification'? true : false" :class="[$route.path.split('/')[1] === 'notification' ? 'bg-btn_hover rounded-lg':'',isLoadNotification ?'bg-btn_hover rounded-lg':'' ]" @click="showNotification">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-bell-fill text-white"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
          </svg>
          <div v-if="countNotification>0" class="absolute rounded-[50%] w-[22px] h-[22px] flex justify-center items-end bg-red-500 top-[1px] left-6">
            <p class="text-white font-medium text-[13px]">
              {{ countNotification }}
            </p>
          </div>
          <div v-if="isLoadNotification===true" class="absolute max-h-[80vh] overflow-y-auto bg-gray-800 rounded-md shadow-sm top-14 notification-modal pb-1 max-w-[360px] w-[360px] overflow-x-hidden">
            <Notification :notifications="listNotification" @unread="showUnreadNotification" />
          </div>
        </button>
        <nuxt-link tag="button" to="/conversation" class="bg-main-color btn-messenger focus:outline-none h-12 w-12 flex items-center justify-center relative" title="messenger" :class="$route.path === '/conversation' ? 'bg-btn_hover rounded-lg':'' ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-messenger text-white"
            viewBox="0 0 16 16"
          >
            <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z" />
          </svg>
          <div v-if="countMessageOutSide>0" class="absolute rounded-[50%] w-[22px] h-[22px] flex justify-center items-end bg-red-500 top-[1px] left-6">
            <p class="text-white font-medium text-[13px]">
              {{ countMessageOutSide > 0 ? countMessageOutSide:'' }}
            </p>
          </div>
        </nuxt-link>
      </div>
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

        <div v-if="isShowDropDown" class="absolute bg-gray-700 w-64 min-h-56 rounded-xl top-[66px] right-0 flex flex-col py-[10px]  text-white font-normal text-base space-y-2 px-1">
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
          <nuxt-link to="/user-setting/profile" class="flex gap-2 hover:bg-gray-500 w-full px-5 py-2 rounded-md" tag="div">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="mr-1 text-white w-6 h-6"
              data-v-58a38da4=""
            ><path fill-rule="evenodd" clip-rule="evenodd" d="M4.60451 4.46161C6.56624 4.46161 8.17064 2.93174 8.28973 1H11.683C11.8021 2.93174 13.4065 4.46161 15.3682 4.46161C15.9241 4.46161 16.4514 4.33874 16.9243 4.11866L18.6258 6.90229C17.601 7.55844 16.9218 8.70693 16.9218 10.014C16.9218 11.3245 17.6045 12.4755 18.6336 13.1308L16.8686 16.0424C16.4108 15.839 15.9041 15.726 15.3709 15.726C13.4731 15.726 11.9098 17.1578 11.702 19H8.27699C8.06924 17.1578 6.50588 15.726 4.60812 15.726C4.03601 15.726 3.49429 15.8562 3.01095 16.0884L1.33643 13.1865C2.42881 12.5453 3.1622 11.3583 3.1622 10.0001C3.1622 8.67266 2.46173 7.50886 1.41027 6.85812L2.56368 4.98799L3.1099 4.1466C3.56683 4.34911 4.07253 4.46161 4.60451 4.46161ZM10 14C12.2091 14 14 12.2091 14 10C14 7.79086 12.2091 6 10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14Z" fill="#D1D5DB" class="fill-current" /><path d="M8.28973 1V0C7.76134 0 7.32414 0.41108 7.29162 0.93847L8.28973 1ZM11.683 1L12.6811 0.93847C12.6486 0.41108 12.2114 0 11.683 0V1ZM16.9243 4.11866L17.7775 3.59713C17.5123 3.16315 16.9635 2.99743 16.5024 3.21204L16.9243 4.11866ZM18.6258 6.90229L19.165 7.74445C19.6233 7.45102 19.7628 6.84504 19.479 6.38075L18.6258 6.90229ZM18.6336 13.1308L19.4887 13.6492C19.7706 13.1842 19.6293 12.5793 19.1707 12.2873L18.6336 13.1308ZM16.8686 16.0424L16.4625 16.9563C16.9226 17.1607 17.4628 16.9913 17.7237 16.5608L16.8686 16.0424ZM11.702 19V20C12.2109 20 12.6387 19.6178 12.6957 19.1121L11.702 19ZM8.27699 19L7.28329 19.1121C7.34032 19.6178 7.76806 20 8.27699 20V19ZM3.01095 16.0884L2.14481 16.5882C2.40623 17.0412 2.97261 17.2163 3.44405 16.9897L3.01095 16.0884ZM1.33643 13.1865L0.830176 12.3242C0.356402 12.6023 0.195707 13.2105 0.470288 13.6863L1.33643 13.1865ZM1.41027 6.85812L0.559128 6.33318C0.269525 6.80274 0.4149 7.41812 0.884013 7.70845L1.41027 6.85812ZM2.56368 4.98799L1.72492 4.44348C1.72072 4.44996 1.71659 4.45648 1.71254 4.46305L2.56368 4.98799ZM3.1099 4.1466L3.51509 3.23236C3.06592 3.03329 2.53867 3.19 2.27114 3.60209L3.1099 4.1466ZM7.29162 0.93847C7.20485 2.3461 6.03457 3.46161 4.60451 3.46161V5.46161C7.09791 5.46161 9.13644 3.51738 9.28783 1.06153L7.29162 0.93847ZM11.683 0H8.28973V2H11.683V0ZM15.3682 3.46161C13.9381 3.46161 12.7678 2.3461 12.6811 0.93847L10.6849 1.06153C10.8363 3.51738 12.8748 5.46161 15.3682 5.46161V3.46161ZM16.5024 3.21204C16.1589 3.37187 15.7754 3.46161 15.3682 3.46161V5.46161C16.0729 5.46161 16.7439 5.3056 17.3462 5.02529L16.5024 3.21204ZM19.479 6.38075L17.7775 3.59713L16.0711 4.6402L17.7726 7.42383L19.479 6.38075ZM17.9218 10.014C17.9218 9.062 18.4152 8.22454 19.165 7.74445L18.0866 6.06014C16.7868 6.89235 15.9218 8.35186 15.9218 10.014H17.9218ZM19.1707 12.2873C18.4177 11.8078 17.9218 10.9685 17.9218 10.014H15.9218C15.9218 11.6805 16.7912 13.1431 18.0965 13.9743L19.1707 12.2873ZM17.7237 16.5608L19.4887 13.6492L17.7784 12.6124L16.0134 15.524L17.7237 16.5608ZM15.3709 16.726C15.7615 16.726 16.1302 16.8086 16.4625 16.9563L17.2746 15.1286C16.6915 14.8695 16.0466 14.726 15.3709 14.726V16.726ZM12.6957 19.1121C12.8471 17.7698 13.9878 16.726 15.3709 16.726V14.726C12.9585 14.726 10.9725 16.5457 10.7083 18.8879L12.6957 19.1121ZM8.27699 20H11.702V18H8.27699V20ZM4.60812 16.726C5.99121 16.726 7.13192 17.7698 7.28329 19.1121L9.27069 18.8879C9.00655 16.5457 7.02054 14.726 4.60812 14.726V16.726ZM3.44405 16.9897C3.79515 16.821 4.18913 16.726 4.60812 16.726V14.726C3.88289 14.726 3.19343 14.8913 2.57784 15.1871L3.44405 16.9897ZM0.470288 13.6863L2.14481 16.5882L3.87708 15.5886L2.20256 12.6867L0.470288 13.6863ZM2.1622 10.0001C2.1622 10.9892 1.62932 11.855 0.830176 12.3242L1.84268 14.0489C3.2283 13.2355 4.1622 11.7274 4.1622 10.0001H2.1622ZM0.884013 7.70845C1.65331 8.18455 2.1622 9.0333 2.1622 10.0001H4.1622C4.1622 8.31203 3.27016 6.83316 1.93652 6.00779L0.884013 7.70845ZM1.71254 4.46305L0.559128 6.33318L2.2614 7.38306L3.41482 5.51293L1.71254 4.46305ZM2.27114 3.60209L1.72492 4.44348L3.40244 5.5325L3.94865 4.69111L2.27114 3.60209ZM4.60451 3.46161C4.21477 3.46161 3.84688 3.37942 3.51509 3.23236L2.70471 5.06083C3.28678 5.3188 3.9303 5.46161 4.60451 5.46161V3.46161ZM13 10C13 11.6569 11.6569 13 10 13V15C12.7614 15 15 12.7614 15 10H13ZM10 7C11.6569 7 13 8.34315 13 10H15C15 7.23858 12.7614 5 10 5V7ZM7 10C7 8.34315 8.34315 7 10 7V5C7.23858 5 5 7.23858 5 10H7ZM10 13C8.34315 13 7 11.6569 7 10H5C5 12.7614 7.23858 15 10 15V13Z" fill="#D1D5DB" class="fill-current" /></svg>
            My settings
          </nuxt-link>
          <nuxt-link v-if="isAdmin" class="flex gap-2 hover:bg-gray-500 w-full px-5 py-2 rounded-md" to="/admin" tag="div">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-tools mr-1"
              viewBox="0 0 16 16"
            >
              <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z" />
            </svg>
            Administrators
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
</template>

<script>
import Notification from '../notification/Notification.vue'
import SearchHeader from '../search/SearchHeader.vue'
export default {
  components: { SearchHeader, Notification },
  data: () => {
    return {
      isShowDropDown: false,
      user: {},
      accessToken: window.localStorage.getItem('access_token'),
      imageData: require('@/static/avatar/avatar1.jpg'),
      isLoaded: false,
      isLoadNotification: false,
      isLoadMore: false,
      type: 'ALL',
      isAdmin: false

    }
  },

  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    },
    countMessageOutSide () {
      return this.$store.getters['conversation/countMessageOutSide']
    },
    countNotification () {
      return this.$store.getters['notification/countNotification']
    },
    listNotification () {
      return this.$store.getters['notification/listNotification']
    }
  },
  watch: {
    $route () {
      setTimeout(() => {
        this.isLoadNotification = false
      }, 30)
    }
  },
  async mounted () {
    this.isLoadNotification = false
    if (this.$route.path.split('/')[1] !== 'conversation') {
      await window.socket.on('conversation:get-count-new-message', this.handleCountNewMessage)
    }
    await window.socket.on('notification:count-new-notification', this.handleCountNewNotification)
  },
  async beforeDestroy () {
    await window.socket.off('conversation:get-count-new-message', this.handleCountNewMessage)
    await window.socket.on('notification:count-new-notification', this.handleCountNewNotification)
  },
  async created () {
    await this.getMe()
    await this.getCountMessage()
    await this.getCountNotification()
  },
  methods: {
    test () {
      console.log('ok')
    },
    handleCountNewNotification (data) {
      this.$store.commit('notification/setCountNotification', data.countNotification)
    },
    async getNotification ({ page, limit, type, isLoadMore }) {
      await this.$store.dispatch('notification/getListNotification', { page, limit, type, isLoadMore })
    },
    async getCountNotification () {
      await this.$store.dispatch('notification/getCountNotification')
    },
    async showNotification () {
      this.isLoadNotification = !this.isLoadNotification
      this.type = 'ALL'
      if (this.isLoadNotification === true) {
        await this.getNotification({ page: 1, limit: 100, type: this.type, isLoadMore: false })
        this.$store.commit('notification/setCountNotification', 0)
      }
    },
    async showUnreadNotification (e) {
      if (e === true) {
        this.type = 'UNREAD'
        await this.getNotification({ page: 1, limit: 100, type: this.type, isLoadMore: false })
      } else {
        this.type = 'ALL'
        await this.getNotification({ page: 1, limit: 100, type: this.type, isLoadMore: false })
      }
    },
    handleCountNewMessage (data) {
      this.$store.commit('conversation/setCountMessageOutSide', data.countMessage)
    },
    async getCountMessage () {
      await this.$store.dispatch('conversation/getCountMessage')
    },
    showDropDown () {
      this.isShowDropDown = !this.isShowDropDown
    },
    hideDropDown () {
      this.isShowDropDown = false
    },
    onSearch (value) {
      console.log(value)
    },
    logout () {
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('refresh_token')
      window.localStorage.removeItem('isAdmin')
      this.$router.push('/auth/login')
    },
    async getMe () {
      try {
        this.isLoaded = false
        if (window.localStorage.getItem('access_token')) {
          const dataUser = await this.$api.user.getMe()
          this.user = dataUser.data.user
          this.isAdmin = dataUser.data.isAdmin
          this.$store.commit('setUserInfo', this.user)
        }
        this.isLoaded = true
      } catch (err) {
      }
    }
  }
}
</script>

<style lang="scss">
.search_header>{

    .input_search{
     @apply  outline-none focus:border-[0.1px] border-blue-500
    }
    .input_search::placeholder{
      @apply text-lg
    }
}
.btn-notification:hover{
  @apply  bg-btn_hover rounded-lg
}
.btn-messenger:hover{
  @apply  bg-btn_hover rounded-lg

}
.btn-avatar:hover{
  @apply  bg-btn_hover rounded-lg
}

.notification-modal::-webkit-scrollbar
{
  @apply w-[6px] bg-gray-700 rounded-lg ;
}

.notification-modal::-webkit-scrollbar-thumb
{
  @apply border-2 border-solid border-gray-600 bg-gray-600 rounded-lg  ;
}
</style>
