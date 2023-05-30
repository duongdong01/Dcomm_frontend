<template>
  <div class="flex flex-col">
    <div>
      <nuxt-link to="/admin" class="text-black font-semibold text-lg">
        Admin
      </nuxt-link>
      <span class="text-gray-700 font-semibold text-lg">
        / Recycle-bin
      </span>
    </div>
    <hr class="text-[#ccc] mt-2">
    <BinTable />
  </div>
</template>

<script>
import BinTable from '~/components/admin/bin/BinTable.vue'
export default {
  components: { BinTable },
  layout: 'admin'
  // middleware: ['auth']
}
</script>
