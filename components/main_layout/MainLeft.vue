<template>
  <div class="flex flex-col text-white">
    <!-- <div class="pl-3 mt-4 mb-2">
      <h1 class="text-lg font-semibold text-white">
        Feeds
      </h1>
    </div> -->
    <nav class="nav_left">
      <nuxt-link :to="`/profile_detail/${userInfo?._id}`" tag="a" class="nav_left-menu">
        <div class="flex" :class="$route.path.split('/')[1] === 'profile_detail' ? 'focus_item_nav' : ''">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-person-circle text-white mt-[2px]"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
          </div>
          <div> <span class="nav_item ">Profile</span></div>
        </div>
      </nuxt-link>
      <nuxt-link to="/" tag="a" class="nav_left-menu">
        <div ref="home" class="flex" :class="$route.path === '/' ? 'focus_item_nav' : ''">
          <div>
            <svg
              width="23"
              height="23"
              viewBox="0 0 18 20"
              fill="none"
              class="text-white"
              xmlns="http://www.w3.org/2000/svg"
            ><path d="M7.94851 2.14988L1.47426 6.15133C1.17945 6.33354 1 6.6554 1 7.00197V17.2222C1 17.6937 1.18437 18.1459 1.51256 18.4793C1.84075 18.8127 2.28587 19 2.75 19H5.993C5.99687 19 6 18.9969 6 18.993V15C6 13.3431 7.34315 12 9 12C10.6569 12 12 13.3431 12 15V18.993C12 18.9969 12.0031 19 12.007 19H15.25C15.7141 19 16.1592 18.8127 16.4874 18.4793C16.8156 18.1459 17 17.6937 17 17.2222V7.00197C17 6.6554 16.8206 6.33354 16.5257 6.15133L10.0515 2.14988C9.40707 1.75159 8.59293 1.75159 7.94851 2.14988Z" fill="white" stroke="white" stroke-width="2" class="fill-current stroke-current" /></svg>
          </div>
          <div> <span class="nav_item ">Home</span></div>
        </div>
      </nuxt-link>
      <nuxt-link to="/following" tag="a" class="nav_left-menu">
        <div ref="home" class="flex" :class="$route.path === '/following' ? 'focus_item_nav' : ''">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-people-fill text-white"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>
          </div>
          <div> <span class="nav_item ">Following</span></div>
        </div>
      </nuxt-link>
      <nuxt-link to="/global" tag="a" class="nav_left-menu">
        <div ref="home" class="flex" :class="$route.path.split('/')[1] === 'global' ? 'focus_item_nav' : ''">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-globe-asia-australia"
              viewBox="0 0 16 16"
            >
              <path d="m10.495 6.92 1.278-.619a.483.483 0 0 0 .126-.782c-.252-.244-.682-.139-.932.107-.23.226-.513.373-.816.53l-.102.054c-.338.178-.264.626.1.736a.476.476 0 0 0 .346-.027ZM7.741 9.808V9.78a.413.413 0 1 1 .783.183l-.22.443a.602.602 0 0 1-.12.167l-.193.185a.36.36 0 1 1-.5-.516l.112-.108a.453.453 0 0 0 .138-.326ZM5.672 12.5l.482.233A.386.386 0 1 0 6.32 12h-.416a.702.702 0 0 1-.419-.139l-.277-.206a.302.302 0 1 0-.298.52l.761.325Z" />
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1.612 10.867l.756-1.288a1 1 0 0 1 1.545-.225l1.074 1.005a.986.986 0 0 0 1.36-.011l.038-.037a.882.882 0 0 0 .26-.755c-.075-.548.37-1.033.92-1.099.728-.086 1.587-.324 1.728-.957.086-.386-.114-.83-.361-1.2-.207-.312 0-.8.374-.8.123 0 .24-.055.318-.15l.393-.474c.196-.237.491-.368.797-.403.554-.064 1.407-.277 1.583-.973.098-.391-.192-.634-.484-.88-.254-.212-.51-.426-.515-.741a6.998 6.998 0 0 1 3.425 7.692 1.015 1.015 0 0 0-.087-.063l-.316-.204a1 1 0 0 0-.977-.06l-.169.082a1 1 0 0 1-.741.051l-1.021-.329A1 1 0 0 0 11.205 9h-.165a1 1 0 0 0-.945.674l-.172.499a1 1 0 0 1-.404.514l-.802.518a1 1 0 0 0-.458.84v.455a1 1 0 0 0 1 1h.257a1 1 0 0 1 .542.16l.762.49a.998.998 0 0 0 .283.126 7.001 7.001 0 0 1-9.49-3.409Z" />
            </svg>
          </div>
          <div> <span class="nav_item ">All</span></div>
        </div>
      </nuxt-link>
      <nuxt-link to="/explore" tag="a" class="nav_left-menu">
        <div ref="home" class="flex" :class="$route.path.split('/')[1] === 'explore' ? 'focus_item_nav' : ''">
          <div>
            <svg
              width="23"
              height="23"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class=" text-white"
              data-v-5ff1a5c1=""
            ><path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 10C1.75 5.44365 5.44365 1.75 10 1.75C14.5563 1.75 18.25 5.44365 18.25 10C18.25 14.5563 14.5563 18.25 10 18.25C5.44365 18.25 1.75 14.5563 1.75 10ZM10 0.25C4.61522 0.25 0.25 4.61522 0.25 10C0.25 15.3848 4.61522 19.75 10 19.75C15.3848 19.75 19.75 15.3848 19.75 10C19.75 4.61522 15.3848 0.25 10 0.25ZM14.7115 6.23717C14.8013 5.96767 14.7312 5.67054 14.5303 5.46967C14.3295 5.2688 14.0323 5.19865 13.7628 5.28849L7.76283 7.28849C7.53888 7.36314 7.36314 7.53888 7.28849 7.76283L5.28849 13.7628C5.19865 14.0323 5.2688 14.3295 5.46967 14.5303C5.67054 14.7312 5.96767 14.8013 6.23717 14.7115L12.2372 12.7115C12.4611 12.6369 12.6369 12.4611 12.7115 12.2372L14.7115 6.23717ZM7.18585 12.8141L8.59293 8.59293L12.8141 7.18585L11.4071 11.4071L7.18585 12.8141Z" fill="white" class="fill-current" /></svg>
          </div>
          <div> <span class="nav_item ">Explore</span></div>
        </div>
      </nuxt-link>
    </nav>
  </div>
</template>
<script>
export default {
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  }
}
</script>
<style lang="scss">

.nav_left {
  .nav_item{
      @apply  text-white text-[18px] ml-3
    }
  .focus_item {
    @apply text-white font-medium
  }

  .nav_left-menu > div:hover{
      @apply bg-gray-700 rounded-md
  }
  .nav_left-menu >div{
    @apply py-[10px] px-3
  }
  .focus_item_nav {
    @apply font-medium bg-gradient-to-r from-pink-800 rounded-md
  }
}
.nav-portal > div:hover{
      @apply bg-gray-700
  }
  .nav-portal >div{
    @apply py-[9px] px-3
  }
</style>
