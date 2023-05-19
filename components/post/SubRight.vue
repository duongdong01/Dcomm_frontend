<template>
  <div class="flex-col">
    <div class="flex flex-col px-2 pb-3 text-white text-base ">
      <div class="flex justify-between pb-2">
        <p class="font-semibold">
          Contact
        </p>
        <i class="fa-solid fa-ellipsis text-white cursor-pointer" />
      </div>
      <div v-for="(item,index) in [0,1,2,3,4,5]" :key="index" class="flex flex-col mt-2 hover:bg-gray-200/40 rounded-lg cursor-pointer py-1 transition-all">
        <div class="flex  items-center mx-1">
          <div class="relative">
            <img class="rounded-full w-11 h-11" src="@/static/avatar/avatar1.jpg" alt="photo">
            <div class="rounded-full w-[10px] h-[10px] bg-green-400 top-[34px] right-[6px] absolute" />
          </div>
          <div class="ml-4 font-medium">
            Duong Dong {{ item }}
          </div>
        </div>
      </div>
      <!-- <div class="flex justify-center w-full h-20 items-center text-gray-300">
        No contacts
      </div> -->
    </div>
    <div class="flex-col text-white rounded-xl text-base px-3 mb-5 mt-1">
      <div class="flex justify-between">
        <p class="font-semibold">
          Who you may know
        </p>
        <i class="fa-solid fa-ellipsis text-white cursor-pointer" />
      </div>
      <div v-if="isLoad">
        <div v-for="(item, index) in list" :key="index">
          <People :people="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import People from '../friends/People.vue'
export default {
  components: {
    People
  },
  data: function () {
    return {
      list: [],
      upHere: false,
      upHere2: false,
      isLoad: false

    }
  },
  async created () {
    await this.getListPeopleRandom(4)
  },
  methods: {
    async getListPeopleRandom (limit) {
      try {
        const tmp = await this.$api.user.getListPeopleRandom(limit)
        this.list = tmp.data.listPeople
        this.isLoad = true
      } catch (error) {

      }
    }
  }
}
</script>
<style lang="scss">

</style>
