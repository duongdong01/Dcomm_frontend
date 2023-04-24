
<template>
  <popup-modal ref="popup">
    <div class=" flex justify-center items-center border-b border-gray-700">
      <h2 class="text-white mb-1">
        {{ title }}
      </h2>
    </div>
    <p class="text-white mt-1">
      {{ message }}
    </p>
    <div class="flex justify-end w-full mt-1 space-x-3">
      <button class="cancel-btn" @click="_cancel">
        {{ cancelButton }}
      </button>
      <button class="ok-btn" @click="_confirm">
        {{ okButton }}
      </button>
    </div>
  </popup-modal>
</template>

<script>
import PopupModal from './PopupModal.vue'

export default {
  name: 'ConfirmDialogue',

  components: { PopupModal },

  data: () => ({
    title: undefined,
    message: undefined,
    okButton: undefined,
    cancelButton: 'Cancel',
    resolvePromise: undefined,
    rejectPromise: undefined
  }),

  methods: {
    show (opts = {}) {
      this.title = opts.title
      this.message = opts.message
      this.okButton = opts.okButton
      if (opts.cancelButton) {
        this.cancelButton = opts.cancelButton
      }
      this.$refs.popup.open()
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },

    _confirm () {
      this.$refs.popup.close()
      this.resolvePromise(true)
    },

    _cancel () {
      this.$refs.popup.close()
      this.resolvePromise(false)
    }
  }
}
</script>

<style scoped>

.ok-btn {
    @apply text-white bg-gray-500 ;
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
    color: #35907f;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
</style>
