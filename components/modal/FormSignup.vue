<template>
  <div class="flex w-full justify-center form-signup px-8">
    <a-form-model v-if="!isShowLayoutOtp" ref="ruleForm" :model="ruleForm" :rules="rules" class="w-full text-white max-w-[100%]">
      <a-form-model-item has-feedback label="First name" prop="firstName">
        <a-input v-model="ruleForm.firstName" placeholder="Write here..." />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Last name" prop="lastName">
        <a-input v-model="ruleForm.lastName" placeholder="Write here..." />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Email" prop="email">
        <a-input v-model="ruleForm.email" placeholder="@gmail.com" />
      </a-form-model-item>
      <a-form-model-item label="Gender" prop="gender">
        <a-select v-model="ruleForm.gender" default-value="MALE" placeholder="Please select your gender">
          <a-select-option value="MALE">
            Male
          </a-select-option>
          <a-select-option value="FEMALE">
            Female
          </a-select-option>
          <a-select-option value="OTHER">
            Other
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item class="flex justify-center flex-col mx-0 text-center">
        <a-spin :spinning="spinning" :delay="delayTime" size="default" class="h-full">
          <button class="mt-4 text-base px-6 py-[12px] w-full  text-white font-semibold rounded-md hover:bg-indigo-600 transition-all bg-indigo-500 shadow-lg shadow-indigo-500/50" @click="submitForm('ruleForm')">
            Next
          </button>
        </a-spin>
      </a-form-model-item>
    </a-form-model>

    <a-form-model v-if="isShowLayoutOtp" ref="ruleForm2" :model="ruleForm2" :rules="rules2" class="w-full text-white max-w-[100%]">
      <a-form-model-item has-feedback label="Otp" prop="otp">
        <a-input v-model="ruleForm2.otp" placeholder="Enter a code..." />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Password" prop="pass" class="login-pass">
        <a-input v-model="ruleForm2.pass" :type="typeInput" autocomplete="off" placeholder="Write here...">
          <a-icon v-if="isShowPassword" slot="suffix" class="text-white/25 cursor-pointer" type="eye-invisible" @click="hidenPassword" />
          <a-icon v-else slot="suffix" type="eye" class="text-white/25 cursor-pointer" @click="showPassword" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item class="flex justify-center flex-col mx-0 text-center">
        <button class="mt-4 text-base px-6 py-[12px] w-full  text-white font-semibold rounded-md hover:bg-indigo-600 transition-all bg-indigo-500 shadow-lg shadow-indigo-500/50" @click="submitForm2('ruleForm2')">
          Sign up
        </button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { isValidPassword, isValidEmail, isValidNameVN } from '@/assets/validators'
export default {
  data () {
    let checkPending
    let checkPending2
    let checkPending3
    let checkPending4
    let checkPending5
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
      }, 500)
    }
    const validatePass = (rule, value, callback) => {
      clearTimeout(checkPending4)
      if (value === '') {
        callback(new Error('Please input the password'))
      }
      checkPending4 = setTimeout(() => {
        if (!isValidPassword(value)) {
          callback(new Error('Invalid password'))
        } else {
          callback()
        }
      }, 500)
    }
    const checkFristname = (rule, value, callback) => {
      clearTimeout(checkPending2)
      if (value === '') {
        callback(new Error('Please input the first name'))
      }
      checkPending2 = setTimeout(() => {
        if (!isValidNameVN(value)) {
          callback(new Error('First name invalid.'))
        } else {
          callback()
        }
      }, 500)
    }
    const checkLastname = (rule, value, callback) => {
      clearTimeout(checkPending3)
      if (value === '') {
        callback(new Error('Please input the last name'))
      }
      checkPending3 = setTimeout(() => {
        if (!isValidNameVN(value)) {
          callback(new Error('Last name invalid.'))
        } else {
          callback()
        }
      }, 500)
    }
    const checkOtp = (rule, value, callback) => {
      clearTimeout(checkPending5)
      checkPending5 = setTimeout(() => {
        if (value === '') {
          callback(new Error('Please input the Otp'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      isShowLayoutOtp: false,
      isShowPassword: false,
      spinning: false,
      delayTime: 200,
      typeInput: 'password',
      ruleForm: {
        // pass: '',
        email: '',
        firstName: '',
        lastName: '',
        gender: undefined
      },
      rules: {
        firstName: [{ validator: checkFristname, trigger: 'change' }],
        lastName: [{ validator: checkLastname, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
        pass: [{ validator: validatePass, trigger: 'change' }],
        gender: [{ required: true, message: 'Please select activity gender', trigger: 'change' }]
      },
      ruleForm2: {
        pass: '',
        otp: ''
      },
      rules2: {
        otp: [{ validator: checkOtp, trigger: 'change' }],
        pass: [{ validator: validatePass, trigger: 'change' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        try {
          if (valid) {
            this.spinning = true
            await this.$api.auth.sentMailOtp({ email: this.ruleForm.email, type: 'SIGNUP' })
            this.spinning = false
            this.$toast.success('Otp has been sent to your email.')
            this.isShowLayoutOtp = true
          } else {
            return false
          }
        } catch (err) {
          if (err.data) {
            this.spinning = false
            this.$toast.error(err.data.message, { timeout: 1500 })
          }
        }
      })
    },
    submitForm2 (formName) {
      this.$refs[formName].validate(async (valid) => {
        try {
          if (valid) {
            const verifyOtp = {
              otp: this.ruleForm2.otp,
              email: this.ruleForm.email,
              type: 'SIGNUP'
            }
            await this.$api.auth.verifyOtp(verifyOtp)
            let genderUser = 'MALE'
            if (this.ruleForm.gender) {
              genderUser = this.ruleForm.gender
            }
            const signupParam = {
              firstName: this.ruleForm.firstName,
              lastName: this.ruleForm.lastName,
              email: this.ruleForm.email,
              password: this.ruleForm2.pass,
              gender: genderUser
            }
            await this.$api.auth.signup(signupParam)
            this.$toast.success('Sign up successfully.')
            this.$router.push('/auth/login')
          } else {
            this.$toast.error('Sign up error')
            return false
          }
        } catch (err) {
          if (err.data && err.data.message) {
            this.$toast.error(err.data.message, { timeout: 1500 })
          }
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    showPassword () {
      this.isShowPassword = true
      this.typeInput = 'text'
    },
    hidenPassword () {
      this.isShowPassword = false
      this.typeInput = 'password'
    }
  }
}
</script>

  <style lang="scss">
  .form-signup{
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

    .ant-select-selection--single{
      @apply bg-[#1b1a38] border-none text-white h-12 pt-2
    }
    .ant-form-item-required::before{
      content: '';
    }
    .ant-select-arrow{
      @apply text-white
    }
    .ant-form-item{
      @apply mb-5
    }
  }
  </style>
