<template>
  <NewNotification :notification="notification" />
</template>
<script>
import NewNotification from './NewNotification.vue'
export default {
  components: { NewNotification },
  props: {
    notification: {
      type: Object,
      default: () => Object
    }

  },
  methods: {
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
  @apply bg-gray-800
    }

    .Vue-Toastification__toast-body.custom-class-1 {
        /* font-size: 30px; */
    }

    /* Applied to a wrapper div when using a custom component as content */
    .Vue-Toastification__toast-component-body.custom-class-2 {
        width: 350px;
    }
  </style>
