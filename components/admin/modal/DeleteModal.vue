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
  data () {
    return {
      test: '1111111111111'
    }
  },
  methods: {
    showDeleteConfirm (e) {
      this.$confirm({
        title: this.title,
        // content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => {
          this.$emit('delete', e)
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.ant-btn-danger{
    @apply bg-red-500 text-white
}
</style>
