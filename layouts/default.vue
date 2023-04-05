<template>
  <div class="flex flex-col">
    <div class="fixed z-50 w-full flex justify-center bg-[#121212] border-[#303030] border-b-[1.5px]">
      <MainHeader class="max-w-[1400px] animation-default-header px-1" />
    </div>
    <div class="grid grid-flow-col grid-cols-10  max-w-[1410px] mx-auto mt-24 gap-8">
      <div class="col-span-2 shrink">
        <main-left class="overflow-y-auto sticky top-24 w-[272px]" />
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
  components: { MainLeft, MainHeader },
  middleware: ['auth']
}
</script>

<style lang="scss">
#__nuxt{
  font-family: "Inter";
  background-color: #131720;
}
.bg-main_color{
  @apply bg-[#131720]
}
.bg-btn-hover{
  @apply bg-[#374151]
}
@keyframes scaleDefaultAnimation {
  0% {
    transform: scaleX(1.18);
  }
  100% {
    transform: scaleX(1);
  }
}
.animation-default-header{
  animation-name: scaleDefaultAnimation;
  animation-duration: 0.6s;
  transition: all ease-in-out;
}
</style>
