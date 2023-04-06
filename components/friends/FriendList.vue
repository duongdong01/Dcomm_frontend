<template>
  <div>
    <div class="w-[100%] h-[60px] mb-[24px] bg-edit flex justify-between items-center rounded-lg">
      <div class="flex relative items-center ml-6">
        <div class="absolute left-[4px] text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
        <input class="min-w-[500px] h-[30px] pl-7 rounded-lg input_search text-sm bg-gray-700 text-white" type="input" placeholder="Search by name...">
      </div>
      <div class="text-white mr-6 text-base">
        Bạn bè: {{ countFriends }} người
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <friend-item v-for="(item, index) in array" :key="index" :current="item" />
    </div>
  </div>
</template>

<script>
import FriendItem from './FriendItem.vue'
export default {
  components: { FriendItem },
  data () {
    return {
      countFriends: 123,
      array: [{
        userName: 'DuongDong',
        userTitle: 'Bắc Giang',
        avatar: 'https://ianrmedia.unl.edu/images/resources/nilo-ren.jpg'
      },
      {
        userName: 'Vợ 1 của idol Dương',
        userTitle: 'Hà Nam',
        avatar: 'https://luv.vn/wp-content/uploads/2021/08/gai-xinh-mac-vay-xep-ly-ngan-17.jpg'
      },
      {
        userName: 'Vợ 2 của idol Dương',
        userTitle: 'Hà Nội',
        avatar: 'https://pbs.twimg.com/profile_images/1438035897430130688/f4vDy5Bd_400x400.jpg'
      }, {
        userName: 'Vợ 3 của idol Dương',
        userTitle: 'Nam Ninh',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5r_Kri1nA7eoXgD6zdhqMneLSRYT5ZL1JNw&usqp=CAU'
      }]
    }
  }
}
</script>

<style lang="scss">
    .input_search{
     @apply  border-gray-600 border focus:border-[0.1px] focus:border-blue-500
    }
    .input_search::placeholder{
      @apply text-sm
    }
    .bg-edit{
   background-color: rgb(28, 33, 46);
    }
</style>
