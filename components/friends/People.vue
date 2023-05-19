<template>
  <div class="flex justify-between text-sm items-center my-5">
    <div class="flex items-center">
      <div class="relative cursor-pointer" @mouseover="upHere = true" @mouseleave="upHere = false">
        <img class="w-14 h-14 rounded-full object-cover" :src="people.avatar" alt="">
        <div v-if="upHere" class="z-50 absolute top-[-180px] left-2 transition-all">
          <PeopleView :people="people" :issend="isSendRequest" @createFriendRequest="createFriendRequest" @cancelFriendRequestByUserId="cancelFriendRequestByUserId" />
        </div>
      </div>
      <div class="pl-2">
        <div class="pb-1 relative cursor-pointer" @mouseover="upHere2 = true" @mouseleave="upHere2 = false">
          {{ people.fullname }}
          <div v-if="upHere2" class="z-50 absolute top-[-180px] left-2 transition-all">
            <PeopleView :people="people" :issend="isSendRequest" @createFriendRequest="createFriendRequest" @cancelFriendRequestByUserId="cancelFriendRequestByUserId" />
          </div>
        </div>
        <div class="text-xs opacity-70">
          join in 2023
        </div>
      </div>
    </div>
    <button v-if="!isSendRequest" class="p-2 bg-gray-600 rounded-xl hover:bg-btn_hover" @click="createFriendRequest">
      Add
    </button>
    <button v-if="isSendRequest" class="p-2 bg-gray-600 rounded-xl hover:bg-btn_hover" @click="cancelFriendRequestByUserId">
      Cancel
    </button>
  </div>
</template>

<script>
import PeopleView from './PeopleView.vue'

export default {
  components: {
    PeopleView
  },
  props: {
    people: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      upHere: false,
      upHere2: false,
      isSendRequest: false
    }
  },
  methods: {
    async createFriendRequest () {
      try {
        this.isSendRequest = true
        await this.$api.friend.createFriendRequest(this.people._id)
      } catch (err) {
        this.isSendRequest = false
      }
    },
    async cancelFriendRequestByUserId () {
      try {
        this.isSendRequest = false
        await this.$api.friend.cancelFriendRequestByUserId(this.people._id)
      } catch (err) {
        this.isSendRequest = true
      }
    }

  }
}

</script>
