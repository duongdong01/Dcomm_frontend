<template>
  <div class="flex flex-col">
    <div>
      <nuxt-link to="/admin" class="text-black font-semibold text-lg">
        Admin
      </nuxt-link>
      <span class="text-gray-700 font-semibold text-lg">
        / Transactions
      </span>
    </div>
    <hr class="text-[#ccc] mt-2">
    <TableTransaction />
  </div>
</template>
<script>
import TableTransaction from '~/components/admin/transaction/TableTransaction.vue'

export default {
  components: { TableTransaction },
  layout: 'admin'
}
</script>
