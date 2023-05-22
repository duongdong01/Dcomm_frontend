<template>
  <div class="background-edit w-full h-full z-10 text-white flex justify-center">
    <div class="w-96 h-40 bg-gray-700 mt-[15%] rounded-sm">
      <div class="m-3 text-lg">
        Are you sure you want to block this user?
      </div>
      <div class="flex justify-between">
        <button class="ok-btn ml-6 hover:text-red-400" @click="yesClick">
          Yes
        </button>
        <button class="cancel-btn mr-6 hover:text-emerald-400" @click="noClick">
          NO
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

.ok-btn {
    @apply text-white bg-gray-500;
    padding: 0.5em 1em;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}

.cancel-btn {
    padding: 0.5em 1em;
    background-color: white;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
</style>
