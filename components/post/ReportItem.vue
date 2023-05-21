<template>
  <div class="flex w-full justify-between items-center hover:bg-gray-800 py-2 px-5 rounded-md cursor-pointer font-medium text-white">
    <div>
      {{ report.name }}
    </div>
    <i class="fa-solid fa-angle-right text-[18px] text-white" />
  </div>
</template>
<script>
export default {
  props: {
    report: {
      type: Object,
      default: () => {}
    }
  }

}
</script>
