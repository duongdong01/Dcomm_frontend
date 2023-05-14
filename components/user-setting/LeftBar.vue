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
      <nuxt-link to="/user-setting/balance" tag="a" class="nav_left-menu">
        <div ref="home" class="flex" :class="$route.path.split('/')[2] === 'balance' ? 'focus_item_nav' : ''">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-wallet2"
              viewBox="0 0 16 16"
            >
              <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
            </svg>
          </div>
          <div> <span class="nav_item ">Balance</span></div>
        </div>
      </nuxt-link>
      <nuxt-link to="/user-setting/people" tag="a" class="nav_left-menu">
        <div ref="home" class="flex" :class="$route.path === '/follow' ? 'focus_item_nav' : ''">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-people-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>
          </div>
          <div> <span class="nav_item ">People</span></div>
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
