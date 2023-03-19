<template>
  <div class="flex flex-col">
    <div class="fixed z-50 w-full flex justify-center bg-[#121212]">
      <MainHeader class="" />
    </div>
    <div class="grid grid-flow-col grid-cols-10  max-w-[1440px] mx-auto mt-24 gap-6">
      <div class="col-span-2 shrink">
        <main-left class="overflow-y-auto sticky top-24 w-[280px]" />
      </div>
      <div class="col-span-8 flex">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import MainLeft from '@/components/main_layout/MainLeft.vue'
import MainHeader from '@/components/main_layout/MainHeader.vue'
export default {
  components: { MainLeft, MainHeader }

}
</script>

<style lang="scss">
#__nuxt{
  font-family: "Inter";
  background-color: #171819;
}
.bg-main_color{
  @apply bg-[#171819]
}
.bg-btn-hover{
  @apply bg-[#374151]
}
</style>
