<template>
  <div class=" rounded-xl text-white bg-gray_850 px-3 py-3 mt-4 border border-gray-700 grid grid-cols-2 gap-1">
    <div class="flex justify-between col-span-2 mb-1">
      <div class="font-semibold">
        Media
      </div>
      <nuxt-link :to="`/profile_detail/${$route.params.id}/medias`" tag="button">
        <div class="active:text-blue-500">
          Show more
        </div>
      </nuxt-link>
    </div>
    <div v-if="isLoad" class="col-span-2 grid grid-cols-2 gap-1">
      <div v-for="(item,index) in list" :key="index" class="h-[122px]">
        <nuxt-link :to="`/profile_detail/${$route.params.id}/medias`" tag="button" class="col-span-1 rounded-md overflow-hidden w-full h-[122px] cursor-pointer">
          <AlbumItem :album="item" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>

import AlbumItem from '~/components/album/AlbumItem.vue'

export default {
  components: {
    AlbumItem
  },
  data () {
    return {
      list: [],
      isLoad: false
    }
  },
  async created () {
    await this.getListMedias('', 1, 10)
  },
  methods: {
    async getListMedias (userId, page, limit) {
      try {
        userId = this.$route.params.id
        const listAlbum = await this.$api.user.getListMedias({ userId, page, limit })
        this.list = listAlbum.data.files.slice(0, 4)
        this.isLoad = true
      } catch (error) {

      }
    }
  }

}

</script>

<style lang="scss">

.border-1{
  border-width: 1.5px;
}

</style>
