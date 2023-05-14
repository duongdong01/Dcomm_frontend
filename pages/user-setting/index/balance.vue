<template>
  <div class="flex">
    <div class="flex space-x-3">
      <div>
        <img src="@/static/avatar/avatar1.jpg" class="w-28 h-28 rounded-lg" alt="photo">
      </div>
      <div class="flex flex-col space-y-2">
        <div class="text-[18px] font-bold">
          Duong Dong
        </div>
        <div class="flex space-x-2">
          <img src="@/static/logo/dscvr-logo.png" alt="photo" class="w-6 h-6">
          <div class="flex font-bold text-[16px]">
            999
          </div>
        </div>
      </div>
    </div>
    <div />
    <!-- <button class="w-28 h-20" @click="payment">
      NAP
    </button> -->
  </div>
</template>

<script>
export default {
  mounted () {
    window.socket.on('paypal:payment', this.handlePayment)
  },
  beforeDestroy () {
    window.socket.off('paypal:payment', this.handlePayment)
  },
  methods: {
    async  payment () {
      const data = await this.$api.user.payment({ amount: 1, description: 'aaaaa' })
      console.log('111111111111', data)
    },
    handlePayment (data) {
      this.$toast.success(data.url)
      window.location.replace(data.url)
    }
  }
}
</script>
