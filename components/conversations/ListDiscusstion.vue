<template>
  <div class="flex flex-col mt-1 space-y-2">
    <div class="px-[1px] flex justify-center relative">
      <input type="text" placeholder="Search a messgae" class="bg-drak_chat rounded-full w-full py-2 pr-4 pl-8 outline-0">
      <i class="fa-solid fa-magnifying-glass text-gray-400 absolute ml-2  top-[11px] left-[1px]" />
    </div>
    <div class="flex space-x-2 mb-2">
      <div class="flex justify-center rounded-full hover:bg-[#31455d] bg-[#263951] px-3 py-2 cursor-pointer">
        <p class="text-blue-400 font-medium text-base">
          My direct
        </p>
      </div>
      <div class="flex justify-center rounded-full hover:bg-drak_chat  px-3 py-2 cursor-pointer">
        <p class="text-white font-medium text-base">
          Watting
        </p>
      </div>
    </div>
    <div>
      <discusstion-item v-for="item in [1,2,3,4,5,6,7]" :key="item" />
    </div>
  </div>
</template>

<script>
import DiscusstionItem from './DiscusstionItem.vue'
export default {
  components: { DiscusstionItem }
}
</script>
