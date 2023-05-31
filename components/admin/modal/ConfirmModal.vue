<template>
  <div />
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => String
    }
  },
  methods: {
    showConfirm (e) {
      this.$confirm({
        title: this.title,
        onOk: () => {
          this.$emit('confirm', e)
        },
        onCancel () {
          console.log('Cancel')
        },
        class: 'test'
      })
    }
  }
}
</script>
