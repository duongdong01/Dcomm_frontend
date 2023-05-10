<template>
  <div class="t-container bg-white">
    <img src="@/static/ads2.jpeg" alt="" class="w-6 h-6 rounded-full">
    <span>Toasts {{ counter }} from toasts!</span>
    <button class="action" @click.stop="clicked">
      Open!
    </button>
  </div>
</template>
<script>
export default {
  props: ['counter'],
  methods: {
    clicked () {
      // Emit a "click" event when clicked.
      // Can be any event though and even pass parameters back
      this.$emit('click')
    }
  }
}
</script>
  <style>
  .t-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .action {
    height: 40px;
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    border: thin solid currentColor;
  }
  .Vue-Toastification__toast--default.my-custom-toast-class {
        background-color: red;
    }
  </style>
