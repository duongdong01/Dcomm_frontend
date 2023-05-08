<template>
  <div class="grid grid-cols-8">
    <div class="col-span-6 bg-gray-800 rounded-xl">
      <Notification />
    </div>
  </div>
</template>
<script>
import Notification from '@/components/notification/Notification.vue'
export default {
  components: { Notification }
}
</script>
