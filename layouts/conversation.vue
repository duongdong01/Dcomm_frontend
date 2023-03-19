<template>
  <div class="flex flex-col">
    <div class="fixed z-50 w-full flex justify-center bg-[#121212]">
      <MainHeader class="" />
    </div>
    <nuxt />
    <div class="w-full h-[100vh]" />
  </div>
</template>

<script>
import MainHeader from '@/components/main_layout/MainHeader.vue'
export default {
  components: {
    MainHeader
  },
  layout: 'conversation'
}
</script>
<style>
#__nuxt{
  font-family: "Inter";
  background-color: #171819;
}</style>
