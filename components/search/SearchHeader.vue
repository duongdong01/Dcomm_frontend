<template>
  <div id="box-search" class="flex flex-col relative w-full h-full">
    <div class="flex relative items-center my-auto">
      <input
        v-model="search"
        type="search"
        placeholder="Search"
        class="input_search w-full h-12 text-base  text-white bg-main_color pl-11 rounded-lg  border-gray-600"
        @input="searchGlobal"
        @keyup.enter="pushRouteSearch"
      >
      <i class="fa-solid fa-magnifying-glass absolute ml-4 text-base text-white" />
    </div>
    <div v-if="showSearch" class="flex w-full justify-start bg-gray-800 rounded-md relative transition-all ease-out duration-100">
      <div class="absolute flex flex-col  items-center bg-gray-800 w-full z-20 top-[-8px] justify-start rounded-md border border-gray-700 shadow-lg pb-2">
        <div class="text-white font-semibold text-[18px] w-full justify-start pl-5 bg-gray-700 h-12 leading-[48px] rounded-t-md">
          People
        </div>
        <nuxt-link
          v-for="(item,index) in users"
          :key="`${item}-${index}`"
          tag="div"
          :to="`/profile_detail/${item._id}`"
          class="flex space-x-4 text-white font-medium items-center my-1 w-full pl-10 py-1 hover:bg-gray-600 cursor-pointer"
          @click.native="closeEvent"
        >
          <img :src="item.avatar || avatar" class="w-[50px] h-[50px] rounded-full object-cover" alt="photo">
          <div class="flex flex-col">
            <p class="text-white font-semibold">
              {{ item.fullname }}
            </p>
            <p class="text-gray-400 font-normal">
              {{ item.isFriend ? 'Friend' :'People' }}
            </p>
          </div>
        </nuxt-link>
        <div v-if="users.length <1" class="w-full h-10 justify-center items-center text-[16px] font-medium flex text-white">
          No result
        </div>
        <button v-if="search.trim().length>0" class="flex w-full justify-center border-gray-500 h-11 leading-[44px] border-t text-white font-semibold text-[16px] cursor-pointer hover:text-[#E85E23] transition-all duration-75" @click.prevent="pushRouteSearch">
          See all result for "{{ search }}"
        </button>
        <LoadingSearch v-if="isLoading" class="absolute" />
      </div>
    </div>
  </div>
</template>
<script>
import LoadingSearch from '../loading/LoadingSearch.vue'
export default {
  components: { LoadingSearch },
  data () {
    return {
      search: '',
      isLoading: false,
      showSearch: false,
      hidden: false,
      isDebounce: null,
      users: []
    }
  },
  computed: {
    avatar () {
      return this.$store.getters.avatar
    }
  },
  mounted () {
    document.addEventListener('click', this.handleClickOutsideBox)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleClickOutsideBox)
  },
  methods: {
    handleClickOutsideBox (event) {
      const box = document.getElementById('box-search')

      if (!box.contains(event.target)) {
        this.showSearch = false
      }
    },
    pushRouteSearch () {
      this.showSearch = false
      if (this.search.trim().length > 0) {
        this.$router.push({ path: '/search', query: { keyword: this.search } })
      }
    },
    closeEvent () {
      this.showSearch = false
    },
    async searchGlobalUser ({ limit, page, keyword }) {
      try {
        const userData = await this.$api.search.searchGlobalUser({ limit, page, keyword })
        this.users = userData.data.users
      } catch (err) {
        //
      }
    },
    searchGlobal (e) {
      try {
        this.isLoading = true
        if (this.showSearch === false) {
          this.showSearch = true
        }
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          this.isLoading = false
          this.search = e.target.value
          await this.searchGlobalUser({ limit: 6, page: 1, keyword: this.search })
        }, 500)
      } catch (err) {
        //
      }
    }
  }
}
</script>

<style lang="scss">
.search_header>{

    .input_search{
     @apply  border-gray-600 border focus:border-[0.1px] focus:border-blue-500
    }
    .input_search::placeholder{
      @apply text-lg
    }
}
</style>
