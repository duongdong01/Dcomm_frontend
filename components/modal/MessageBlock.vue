<template>
  <div class="background-edit w-full h-full z-10 text-white flex justify-center">
    <div class="w-[500px] h-44 bg-gray_850 mt-[20%] rounded-lg">
      <div class="m-4 text-base text-center">
        Block this user ?
      </div>
      <div class="m-4 text-base border-solid border-t-2 border-gray-700  ">
        You won't be able to access this person's profile!
      </div>
      <div class="flex justify-end mt-10">
        <button class="okk-btn mr-3 hover:text-red-400 p-2 px-8" @click="yesClick">
          Yes
        </button>
        <button class="cancell-btn mr-3 hover:text-emerald-400 p-2 px-8" @click="noClick">
          No
        </button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    index: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      isImg: true,
      albumData: null
    }
  },
  methods: {
    yesClick () {
      this.$emit('blockUser')
    },
    noClick () {
      this.$emit('stopBlock')
    }
  }
}
</script>
<style lang="scss">
.background-edit {
    background-color: #000000b4;
}

.okk-btn {
    @apply text-white bg-gray-500;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}

.cancell-btn {
    background-color: white;
    color: #35907f;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
</style>
