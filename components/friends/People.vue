<template>
  <div class="flex justify-between text-sm items-center my-5">
    <div class="flex items-center">
      <div class="relative cursor-pointer" @mouseover="upHere = true" @mouseleave="upHere = false" @click="goToProfile">
        <img class="w-11 h-11 rounded-full object-cover" :src="people.avatar" alt="">
        <div v-if="upHere" class="z-50 absolute top-[-180px] left-2 transition-all">
          <PeopleView :pending="isPending" :people="people" :issend="isSendRequest" @createFriendRequest="createFriendRequest" @cancelFriendRequestByUserId="cancelFriendRequestByUserId" />
        </div>
      </div>
      <div class="pl-2">
        <div class="pb-1 relative cursor-pointer" @mouseover="upHere2 = true" @mouseleave="upHere2 = false">
          {{ people.fullname }}
          <div v-if="upHere2" class="z-50 absolute top-[-180px] left-2 transition-all">
            <PeopleView :pending="isPending" :people="people" :issend="isSendRequest" @createFriendRequest="createFriendRequest" @cancelFriendRequestByUserId="cancelFriendRequestByUserId" />
          </div>
        </div>
        <div class="text-xs opacity-70">
          Join in {{ $dayjs(people.createdAt).format('YYYY') }}
        </div>
      </div>
    </div>
    <button v-if="!isSendRequest" class="px-3 py-[6px] bg-indigo-500 rounded-md hover:bg-indigo-600 relative" @click="createFriendRequest">
      Add
      <Loading v-if="isPending" class="top-0 left-0" />
    </button>
    <button v-if="isSendRequest" class="px-3 py-[6px] bg-gray-600 rounded-md hover:bg-btn_hover relative" @click="cancelFriendRequestByUserId">
      Cancel
      <Loading v-if="isPending" class="top-0 left-0" />
    </button>
  </div>
</template>

<script>
import PeopleView from './PeopleView.vue'
import Loading from '~/components/loading/Loading.vue'

export default {
  components: {
    PeopleView, Loading
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
      isSendRequest: false,
      isPending: false,
      dateJoin: null
    }
  },
  methods: {
    async createFriendRequest () {
      try {
        this.isPending = true
        await this.$api.friend.createFriendRequest(this.people._id)
        this.isPending = false
        this.isSendRequest = true
      } catch (err) {
        this.isSendRequest = false
        this.isPending = false
      }
    },
    async cancelFriendRequestByUserId () {
      try {
        this.isPending = true
        await this.$api.friend.cancelFriendRequestByUserId(this.people._id)
        this.isPending = false
        this.isSendRequest = false
      } catch (err) {
        this.isSendRequest = true
        this.isPending = false
      }
    },
    goToProfile () {
      this.$router.push({ path: `/profile_detail/${this.people._id}` })
    }

  }
}

</script>
