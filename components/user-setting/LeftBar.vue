<template>
  <div class="flex flex-col rounded-xl text-white">
    <div class="pl-3 mt-4 mb-4">
      <h1 class="text-lg font-semibold text-white">
        My Setting
      </h1>
    </div>
    <nav class="nav_left">
      <nuxt-link to="/user-setting/profile" tag="a" class="nav_left-menu">
        <div ref="home" class="flex" :class="$route.path.split('/')[2] === 'profile'? 'focus_item_nav' : ''">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-gear-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
          </div>
          <div> <span class="nav_item ">My profile</span></div>
        </div>
      </nuxt-link>
      <nuxt-link to="/user-setting/withdraw" tag="a" class="nav_left-menu">
        <div ref="home" class="flex" :class="$route.path === '/following' ? 'focus_item_nav' : ''">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-bank2"
              viewBox="0 0 16 16"
            >
              <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916l-7.5-5zM12.375 6v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1H.5z" />
            </svg>
          </div>
          <div> <span class="nav_item ">Withdraw</span></div>
        </div>
      </nuxt-link>
      <nuxt-link to="/" tag="a" class="nav_left-menu">
        <div ref="home" class="flex" :class="$route.path === '/follow' ? 'focus_item_nav' : ''">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-shield-fill-check"
              viewBox="0 0 16 16"
            >
              <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z" />
            </svg>
          </div>
          <div> <span class="nav_item ">Privacy</span></div>
        </div>
      </nuxt-link>
    </nav>
  </div>
</template>
<script>
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
        @apply bg-gray-700
    }
    .nav_left-menu >div{
      @apply py-[10px] px-3
    }
    .focus_item_nav {
      @apply font-medium bg-gradient-to-r from-pink-800
    }
  }
  .nav-portal > div:hover{
        @apply bg-gray-700
    }
    .nav-portal >div{
      @apply py-[9px] px-3
    }
  </style>
