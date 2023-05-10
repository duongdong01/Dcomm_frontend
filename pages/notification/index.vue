<template>
  <div class="grid grid-cols-8 w-full">
    <div class="col-span-6 w-full bg-gray-800 rounded-xl">
      <Notification :notifications="listNotification" class="w-full" @unread="showUnreadNotification" />
    </div>
  </div>
</template>
<script>
import Notification from '@/components/notification/Notification.vue'
export default {
  components: { Notification },
  data () {
    return {
      isLoadMore: false,
      type: 'ALL'
    }
  },
  computed: {
    listNotification () {
      return this.$store.getters['notification/listNotification']
    }
  },
  async created () {
    await this.getNotification({ page: 1, limit: 100, type: this.type, isLoadMore: false })
  },
  methods: {
    async getNotification ({ page, limit, type, isLoadMore }) {
      await this.$store.dispatch('notification/getListNotification', { page, limit, type, isLoadMore })
    },
    async showUnreadNotification (e) {
      if (e === true) {
        this.type = 'UNREAD'
        await this.getNotification({ page: 1, limit: 100, type: this.type, isLoadMore: false })
      } else {
        this.type = 'ALL'
        await this.getNotification({ page: 1, limit: 100, type: this.type, isLoadMore: false })
      }
    }
  }
}
</script>
