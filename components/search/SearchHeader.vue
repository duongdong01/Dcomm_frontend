<template>
  <div class="search_header flex items-center w-full">
    <input type="search" placeholder="Search" class="input_search w-full h-12 text-base  text-black bg-[#eff3f4] pl-11 rounded-full">
    <i class="fa-solid fa-magnifying-glass absolute ml-4 text-base" />
  </div>
</template>

<script>
export default {
  methods: {
    onSearch (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss">
.search_header>{

    .input_search{
     @apply  outline-none focus:border-[0.1px] border-blue-500
    }
    .input_search::placeholder{
      @apply text-lg
    }
}
</style>
