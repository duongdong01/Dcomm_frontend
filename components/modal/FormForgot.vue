<template>
  <div class="flex w-full justify-center form-forgot px-8 flex-col">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" class="w-full text-white max-w-[100%]">
      <a-form-model-item v-if="!isSendCode" has-feedback label="Email" prop="email">
        <a-input v-model="ruleForm.email" placeholder="@gmail.com" />
      </a-form-model-item>
      <a-form-model-item v-if="isSendCode" has-feedback label="Otp" prop="otp">
        <a-input v-model="ruleForm.otp" placeholder="Enter a code..." />
      </a-form-model-item>
      <a-form-model-item v-if="isSendCode" has-feedback label="New Password" prop="pass">
        <a-input v-model="ruleForm.pass" type="password" placeholder="Write here..." />
      </a-form-model-item>
      <a-form-model-item v-if="isSendCode" has-feedback label="Re-Password" prop="repass">
        <a-input v-model.trim="ruleForm.repass" type="password" placeholder="Write here..." />
      </a-form-model-item>
      <a-form-model-item class="flex justify-center flex-col mx-0 text-center">
        <a-spin :spinning="spinning" :delay="delayTime" size="default" class="h-full">
          <button v-if="!isSendCode" class="mt-4 mb-2 text-base px-6 py-[12px] w-full  text-white font-semibold rounded-md hover:bg-indigo-600 transition-all bg-indigo-500 shadow-lg shadow-indigo-500/50" @click="openLayoutChangePass">
            Send code
          </button>
        </a-spin>
        <button v-if="isSendCode" class="mt-4 mb-2 text-base px-6 py-[12px] w-full  text-white font-semibold rounded-md hover:bg-indigo-600 transition-all bg-indigo-500 shadow-lg shadow-indigo-500/50" @click="submitForm('ruleForm')">
          Save
        </button>
        <div class="flex justify-center flex-col text-white text-base font-semibold mt-3 text-center">
          <div v-if="!isSendCode" class="flex justify-center items-center gap-1 mt-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-arrow-left text-white"
              viewBox="0 0 16 16"
            >
              <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
            <nuxt-link tag="p" to="/auth/login">
              Back to log in
            </nuxt-link>
          </div>
          <div v-else class="flex justify-center items-center gap-1 mt-2 cursor-pointer" @click="backToForgot">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-arrow-left text-white"
              viewBox="0 0 16 16"
            >
              <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
            <p>Back</p>
          </div>
        </div>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { isValidEmail, isValidPassword } from '@/assets/validators'
export default {
  data () {
    let checkPending
    let checkPending2
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
    const validatePasswords = (rule, value, callback) => {
      clearTimeout(checkPending2)
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (!isValidPassword(value)) {
          callback(new Error('Invalid password'))
        } else if (value !== this.ruleForm.repass && this.ruleForm.repass !== '') {
          this.$refs.ruleForm.validateField('repass')
        }
        callback()
      }
    }
    const validateRePasswords = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the Re-password'))
      } else {
        if (value !== this.ruleForm.pass) {
          callback(new Error('Re-Passwords do not match'))
        }
        callback()
      }
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
        pass: '',
        otp: '',
        repass: ''
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'change' }],
        pass: [{ validator: validatePasswords, trigger: 'change' }],
        repass: [{ validator: validateRePasswords, trigger: 'change' }],
        otp: [{ validator: validateOtp, trigger: 'change' }]
      },
      isSendCode: false
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        try {
          if (valid) {
            this.isSendCode = true
            await this.$api.auth.forgotPassword({ email: this.ruleForm.email, newPassword: this.ruleForm.pass, otp: this.ruleForm.otp })
            this.$toast.success('Password recovery successful.', { timeout: 1000 })
            setTimeout(() => {
              this.$router.push('/auth/login')
            }, 1000)
          } else {
            // console.log('error submit!!')
            return false
          }
        } catch (err) {
          if (err.data && err.message) {
            this.$toast.error(err.data.message, { setTimeout: 1500 })
          }
        }
      })
    },
    async openLayoutChangePass () {
      try {
        this.$refs.ruleForm.validateField('email')
        if (isValidEmail(this.ruleForm.email)) {
          this.spinning = true
          await this.$api.auth.sentMailOtp({ email: this.ruleForm.email, type: 'FORGOT' })
          this.spinning = false
          this.$toast.success('Check otp forgot password in your email.')
          this.isSendCode = true
        } else {
          this.spinning = false
          return false
        }
      } catch (err) {
        if (err.data && err.data.message) {
          this.$toast.error(err.data.message, { setTimeout: 1500 })
        }
        this.spinning = false
      }
    },
    backToForgot () {
      this.isSendCode = false
      this.$refs.ruleForm.resetFields()
    },
    emitBackToLogin (e) {
      this.$emit('back-to-login', e)
    }
  }
}
</script>

  <style lang="scss">
  .form-forgot{
    .ant-form-item-label > label{
      @apply text-white text-[16px];
      color: #838487 !important;
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
