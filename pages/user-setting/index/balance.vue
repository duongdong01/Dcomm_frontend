<template>
  <div class="flex flex-col space-y-3">
    <div class="flex space-x-3">
      <div />
    </div>
    <div class="flex flex-col rounded-lg border border-gray-700">
      <div class="border-b-[1px] border-gray-700 font-semibold px-4 py-3 text-[18px]">
        Deposit and withdraw
      </div>
      <div class="flex justify-between px-20 py-8 text-[16px]">
        <div class="flex flex-col space-y-1">
          <div class="text-gray-400">
            Current DCOMM
          </div>
          <div class="flex space-x-2 px-1">
            <img src="@/static/logo/dscvr-logo.png" alt="photo" class="w-6 h-6">
            <div class="font-semibold">
              {{ token.currentTotal }}
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-1">
          <div class="text-gray-400">
            Total DCOMM
          </div>
          <div class="flex space-x-2 px-1">
            <img src="@/static/logo/dscvr-logo.png" alt="photo" class="w-6 h-6">
            <div class="font-semibold">
              {{ token.total }}
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 px-4 text-[16px] font-semibold border-t-[1px] border-gray-700">
        <div class="flex flex-col border-r-[1px] border-gray-700 py-3">
          <div>
            Deposit
          </div>
          <div class="flex w-full justify-center py-1 text-center">
            <a-row class="w-full justify-center flex">
              <a-col :span="12">
                <a-slider v-model="inputValue" :min="1" :max="100" :step="0.1" />
              </a-col>
              <a-col :span="4">
                <a-input-number
                  v-model="inputValue"
                  :min="1"
                  :max="100"
                  :step="0.1"
                  style="marginLeft: 16px"
                />
              </a-col>
            </a-row>
          </div>
          <div class="flex flex-col justify-center w-full text-center py-1 space-y-1">
            <img src="@/static/logo/dscvr-logo.png" alt="photo" class="w-6 h-6 mx-auto">
            <div>
              {{ (inputValue*100).toFixed(1) }} DCOMM
            </div>
          </div>
          <div class="flex w-full justify-center my-2">
            <button class="paypal-buy-now-button" @click="payment">
              <span>Deposit now with</span>
              <svg aria-label="PayPal" xmlns="http://www.w3.org/2000/svg" width="90" height="33" viewBox="34.417 0 90 33">
                <path fill="#253B80" d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.146.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.03.998 1.177 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.804l1.77-11.208a.566.566 0 0 0-.56-.657zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.392-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.955.955 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678H69.41a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.469-.895z" />
                <path fill="#179BD7" d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.767 17.537a.57.57 0 0 0 .563.658h3.51a.665.665 0 0 0 .656-.563l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.141-2.694-1.745-4.983-1.745zm.789 6.405c-.373 2.454-2.248 2.454-4.063 2.454h-1.031l.726-4.583a.567.567 0 0 1 .562-.481h.474c1.233 0 2.399 0 3.002.704.358.42.467 1.044.33 1.906zM115.434 13.075h-3.272a.566.566 0 0 0-.562.481l-.146.916-.229-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.312 6.586-.312 1.918.131 3.752 1.22 5.03 1 1.177 2.426 1.666 4.125 1.666 2.916 0 4.532-1.875 4.532-1.875l-.146.91a.57.57 0 0 0 .563.66h2.949a.95.95 0 0 0 .938-.804l1.771-11.208a.57.57 0 0 0-.564-.657zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.483-.574-.666-1.392-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zM119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822c.469 0 .866-.34.938-.803l2.769-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="flex flex-col py-3 pl-4">
          <div>
            Withdraw
          </div>
          <div class="flex w-full justify-center py-1 text-center">
            <a-row class="w-full justify-center flex">
              <a-col :span="12">
                <a-slider v-model="inputWithdraw" :min="1000" :max="10000" :step="1" :disabled="true" />
              </a-col>
              <a-col :span="4">
                <a-input-number
                  v-model="inputWithdraw"
                  :disabled="true"
                  :min="1000"
                  :max="10000"
                  :step="1"
                  style="marginLeft: 16px"
                />
              </a-col>
            </a-row>
          </div>
          <div class="flex flex-col justify-center w-full text-center py-1 space-y-1">
            <img src="@/static/logo/dscvr-logo.png" alt="photo" class="w-6 h-6 mx-auto">
            <div>
              {{ token.currentTotal }} DCOMM
            </div>
          </div>
          <div class="flex w-full justify-center my-2">
            <button
              class="paypal-buy-now-button"
              title="Minimum quantity to withdraw is 1000 tokens"
              @click="payout"
            >
              <span>Withdraw now with</span>
              <svg aria-label="PayPal" xmlns="http://www.w3.org/2000/svg" width="90" height="33" viewBox="34.417 0 90 33">
                <path fill="#253B80" d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.146.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.03.998 1.177 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.804l1.77-11.208a.566.566 0 0 0-.56-.657zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.392-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.955.955 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678H69.41a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.469-.895z" />
                <path fill="#179BD7" d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.767 17.537a.57.57 0 0 0 .563.658h3.51a.665.665 0 0 0 .656-.563l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.141-2.694-1.745-4.983-1.745zm.789 6.405c-.373 2.454-2.248 2.454-4.063 2.454h-1.031l.726-4.583a.567.567 0 0 1 .562-.481h.474c1.233 0 2.399 0 3.002.704.358.42.467 1.044.33 1.906zM115.434 13.075h-3.272a.566.566 0 0 0-.562.481l-.146.916-.229-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.312 6.586-.312 1.918.131 3.752 1.22 5.03 1 1.177 2.426 1.666 4.125 1.666 2.916 0 4.532-1.875 4.532-1.875l-.146.91a.57.57 0 0 0 .563.66h2.949a.95.95 0 0 0 .938-.804l1.771-11.208a.57.57 0 0 0-.564-.657zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.483-.574-.666-1.392-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zM119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822c.469 0 .866-.34.938-.803l2.769-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue: 1,
      inputWithdraw: 1000,
      token: {}
    }
  },
  watch: {
    inputValue () {
      if (typeof this.inputValue !== 'number') {
        this.inputValue = 1
      }
      if (this.inputValue <= 0) {
        this.inputValue = 1
      }
    },
    inputWithdraw () {
      if (typeof this.inputWithdraw !== 'number') {
        this.inputWithdraw = 1000
      }
      if (this.inputWithdraw < 1000) {
        this.inputWithdraw = 1000
      }
    }
  },
  async created () {
    await this.getToken()
  },
  mounted () {
    window.socket.on('paypal:payment', this.handlePayment)
  },
  beforeDestroy () {
    window.socket.off('paypal:payment', this.handlePayment)
  },
  methods: {
    async payment () {
      try {
        await this.$api.user.payment({ amount: this.inputValue, description: 'aaaaa' })
      } catch (err) {
        // console.log(err)
      }
    },
    async getToken () {
      try {
        const tokenData = await this.$api.token.getTokenByUserId()
        this.token = tokenData.data.token
      } catch (error) {

      }
    },
    handlePayment (data) {
      this.$toast.success('Create payment successfully')
      window.location.replace(data.url)
    },
    async payout () {
      try {
        await this.$api.user.payout({ amount: 10, receiver: 'duong1310@gmail.com' })
      } catch (error) {

      }
    }
  }
}
</script>

<style lang="scss">

.paypal-buy-now-button {
display: inline-flex;
  position: relative;
  background: #FFC439;
  border-radius: 5px;
  border: 1px solid #DC911D;
  box-shadow: inset 0 1px 0 0 #FFD699;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-weight: 700;
  font-size: 14px;
  padding: 0 23px;
  height: 42px;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    border-radius: 5px;
    background: linear-gradient(to bottom, #FFAF00 0%, #DC911D 100%);
    z-index: 1;
  }

  &:after {
    content: "";
    border-radius: 4px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #FFC439;
    box-shadow: inset 0 1px 0 0 #FFD699;
    z-index: 1;
  }

  span {
    padding-top: 3px;
    padding-right: 7px;
    text-shadow: 0 1px 0 #FFD699;
    z-index: 2;
  }

  svg {
    filter: drop-shadow(0 1px 0 #FFFFFF);
    z-index: 2;
  }
}
</style>
