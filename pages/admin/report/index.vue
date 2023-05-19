<template>
  <div class="flex flex-col">
    <div>
      <nuxt-link to="/admin" class="text-black font-semibold text-lg">
        Admin
      </nuxt-link>
      <span class="text-gray-700 font-semibold text-lg">
        / Reports
      </span>
    </div>
    <hr class="text-[#ccc] mt-2">
    <TabReport />
  </div>
</template>

<script>
import TabReport from '~/components/admin/reports/TabReport.vue'
export default {
  components: { TabReport },
  layout: 'admin'
  // middleware: ['auth']
}
</script>
