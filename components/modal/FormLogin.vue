<template>
  <div class="flex w-full justify-center form-login px-8">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" class="w-full text-white max-w-[100%]">
      <a-form-model-item has-feedback label="Email" prop="email">
        <a-input v-model="ruleForm.email" placeholder="Type your email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Password" prop="pass" class="login-pass relative">
        <a-input v-model="ruleForm.pass" placeholder="Type your password" :type="typeInput" autocomplete="off">
          <a-icon v-if="isShowPassword" slot="suffix" class="text-white/25 cursor-pointer" type="eye-invisible" @click="hidenPassword" />
          <a-icon v-else slot="suffix" type="eye" class="text-white/25 cursor-pointer" @click="showPassword" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item class="flex justify-center flex-col mx-0 text-center">
        <div class="flex justify-end">
          <nuxt-link to="/auth/forgot" tag="p" class="mt-1 text-white cursor-pointer hover:text-blue-600 transition-all" @click="emitForgotPassword(true)">
            Forgot password?
          </nuxt-link>
        </div>
        <button class="mt-3 text-base px-6 py-[12px] w-full  text-white font-semibold rounded-md hover:bg-indigo-600 transition-all bg-indigo-500 shadow-lg shadow-indigo-500/50" @click="submitForm('ruleForm')">
          Log in
        </button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { isValidPassword, isValidEmail } from '@/assets/validators'
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
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (!isValidPassword(value)) {
          this.$refs.ruleForm.validateField('checkPass')
          callback(new Error('Invalid password'))
        }
        callback()
      }
    }
    return {
      isShowPassword: false,
      typeInput: 'password',
      ruleForm: {
        pass: '',
        email: ''
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'change' }],
        pass: [{ validator: validatePass, trigger: 'change' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        try {
          if (valid) {
            // const data = await this.$api.auth.login(this.ruleForm.email, this.ruleForm.pass)
            //   .catch(({ response: err }) => {
            //     this.$toast.error(err.data.message)
            //     console.log(err)
            //   })
            // console.log('tesst', data)
            this.$toast.success('Login successfully', {
              timeout: 1500
            })
            setTimeout(() => {
              this.$router.push('/')
            }, 1000)
          } else {
            this.$toast.error('Login erorr', {
              timeout: 2000
            })
            return false
          }
        } catch (err) {
          this.$toast.error(err.data.message)
          console.log(err)
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    emitForgotPassword (e) {
      this.$emit('forgot-password', e)
    },
    // async getRole () {
    //   const abc = await this.$api.auth.role()
    //   console.log(abc, 'abc')
    // }
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

.form-login{
  .ant-form-item-label > label{
    @apply  text-[16px];
    color: #838487 !important;
  }
  .ant-form-item-label >label::after{
    @apply content-none
  }
  .ant-input{
    @apply pb-[18px] pt-4  border-0 bg-[#1b1a38] h-12 text-white
  }
  .has-error .ant-input, .has-error .ant-input:hover{
    @apply bg-[#1b1a38] text-white
  }
  .login-pass{
    @apply mb-0
  }
}
</style>
