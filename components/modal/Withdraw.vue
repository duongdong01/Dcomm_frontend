<template>
  <div v-if="isShow" class="fixed w-full h-full z-20 bg-black/80 flex justify-center items-center top-0 left-0">
    <div class="right-4 top-4 absolute w-10 h-10 bg-gray-700 cursor-pointer flex justify-center items-center rounded-full" @click="hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        fill="currentColor"
        class="bi bi-x-lg text-white z-20"
        viewBox="0 0 16 16"
      >
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
      </svg>
    </div>
    <div class="flex justify-center items-center bg-black border border-gray-700 px-8 py-2 rounded-lg w-[400px] form-withdraw">
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" class="w-full text-white max-w-[100%]">
        <a-form-model-item has-feedback label="Withdrawal email" prop="email">
          <a-input v-model="ruleForm.email" placeholder="@gmail.com" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Otp" prop="otp">
          <a-input v-model="ruleForm.otp" placeholder="Enter a code..." />
        </a-form-model-item>
        <a-spin :spinning="spinning" :delay="delayTime" size="default" class="h-full">
          <button class="mt-4 mb-2 text-base px-6 py-[12px] w-full  text-white font-semibold rounded-md hover:bg-indigo-600 transition-all bg-indigo-500 shadow-lg shadow-indigo-500/50" @click="submitForm('ruleForm')">
            Withdraw
          </button>
        </a-spin>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { isValidEmail } from '@/assets/validators'
export default {
  data () {
    let checkPending
    const checkEmail = (rule, value, callback) => {
      clearTimeout(checkPending)
      if (!value) {
        return callback(new Error('Please input the email'))
      }
      checkPending = setTimeout(() => {
        if (!isValidEmail(value)) {
          callback(new Error('Invalid Emails'))
        } else {
          callback()
        }
      }, 1000)
    }
    const validateOtp = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the Otp'))
      } else if (value.trim().length < 6 || value.trim().length > 6) {
        callback(new Error('Invalid otp'))
      }
      callback()
    }
    return {
      spinning: false,
      delayTime: 200,
      ruleForm: {
        email: '',
        otp: ''
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'change' }],
        otp: [{ validator: validateOtp, trigger: 'change' }]
      },
      isShow: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.userInfo
    }
  },
  methods: {
    submitForm (formName) {
      console.log(formName)
      this.$refs[formName].validate(async (valid) => {
        try {
          if (valid) {
            await this.$api.auth.verifyOtp({ email: this.user.email, type: 'WITHDRAW', otp: this.ruleForm.otp })
            this.$emit('withdraw', this.ruleForm.email)
          } else {
            // console.log('error submit!!')
            return false
          }
        } catch (err) {
          if (err.data && err.data.message) {
            this.$toast.error(err.data.message, { setTimeout: 1500 })
          }
        }
      })
    },

    show () {
      this.isShow = true
    },
    hidden () {
      this.isShow = false
    }
    // emitBackToLogin (e) {
    //   this.$emit('back-to-login', e)
    // }
  }
}
</script>

<style lang="scss">
.form-withdraw{
  .ant-form-item-label > label{
    @apply text-white text-[16px];
    color: white !important;
  }
  .ant-form-item-label >label::after{
    @apply content-none ;
  }
  .ant-input{
  @apply pb-[18px] pt-4  border-0 bg-[#1b1a38] h-12 text-white ;
}
.has-error .ant-input, .has-error .ant-input:hover{
  @apply bg-[#1b1a38] text-white
}
  .login-pass{
    @apply mb-5
  }
  .ant-spin-container::after{
    @apply bg-transparent ;
  }
  .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot{
      @apply mt-[0.5px]
  }
  .ant-spin-dot-item{
    @apply bg-white
  }
}
</style>
