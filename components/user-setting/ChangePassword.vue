<template>
  <div class="bg-gray_850 w-full form-change justify-center flex">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" layout="vertical">
      <a-form-model-item has-feedback label="Current Password" prop="current">
        <a-input
          v-model="ruleForm.current"
          :type="typeCurrentInput"
          autocomplete="off"
          class="relative"
          :disabled="!change"
          placeholder="*******"
        >
          <a-icon v-if="isShowCurrentPassword" slot="suffix" class="text-white/25 cursor-pointer" type="eye-invisible" @click="hiddenCurrentPassword" />
          <a-icon v-else slot="suffix" type="eye" class="text-white/25 cursor-pointer" @click="showCurrentPassword" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item has-feedback label="New Password" prop="pass">
        <a-input
          v-model="ruleForm.pass"
          :type="typeNewInput"
          autocomplete="off"
          class="relative"
          :disabled="!change"
          placeholder="*******"
        >
          <a-icon v-if="isShowNewPassword" slot="suffix" class="text-white/25 cursor-pointer" type="eye-invisible" @click="hiddenNewPassword" />
          <a-icon v-else slot="suffix" type="eye" class="text-white/25 cursor-pointer" @click="showNewPassword" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item has-feedback label="Confirm Password" prop="checkPass">
        <a-input
          v-model="ruleForm.checkPass"
          :type="typeConfirmInput"
          autocomplete="off"
          class="relative"
          :disabled="!change"
          placeholder="*******"
        >
          <a-icon v-if="isShowConfirmPassword" slot="suffix" class="text-white/25 cursor-pointer" type="eye-invisible" @click="hiddenConfirmPassword" />
          <a-icon v-else slot="suffix" type="eye" class="text-white/25 cursor-pointer" @click="showConfirmPassword" />
        </a-input>
      </a-form-model-item>
      <div v-if="change" class="flex w-full justify-center">
        <a-form-model-item>
          <a-button type="primary" class="relative h-10 w-40" @click="submitForm('ruleForm')">
            Change
            <Loading v-if="ishandling" class="top-0" />
          </a-button>
        </a-form-model-item>
      </div>
    </a-form-model>
  </div>
</template>
<script>
import { isValidPassword } from '@/assets/validators'
import Loading from '~/components/loading/Loading.vue'
export default {
  components: {
    Loading
  },
  props: {
    change: {
      type: Boolean,
      default: () => Boolean
    }
  },
  data () {
    const validatePass0 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the current password'))
      } else {
        if (!isValidPassword(value)) {
          callback(new Error('Invalid password'))
        }
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the new password'))
      } else {
        if (!isValidPassword(value)) {
          callback(new Error('Invalid password'))
        }
        if (value === this.ruleForm.current) {
          callback(new Error('New password cannot be the same as the old password'))
        }
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        current: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        current: [{ validator: validatePass0, trigger: 'change' }]
      },
      isShowCurrentPassword: false,
      isShowNewPassword: false,
      isShowConfirmPassword: false,
      typeCurrentInput: 'password',
      typeNewInput: 'password',
      typeConfirmInput: 'password',
      ishandling: false
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        try {
          if (valid) {
            this.ishandling = true
            await this.$api.auth.changePassword(this.ruleForm.current, this.ruleForm.pass)
            this.ishandling = false
            await this.$toast.success('Change password successfully', {
              timeout: 1500
            })
            setTimeout(() => {
              window.localStorage.removeItem('access_token')
              window.localStorage.removeItem('refresh_token')
              this.$router.push('/auth/login')
            }, 300)
          } else {
            return false
          }
        } catch (err) {
          this.ishandling = false
          if (err.data && Object.keys(err.data).length) {
            this.$toast.error(err.data.message, { timeout: 1500 })
          }
        }
      })
    },
    async  resetForm () {
      await this.$refs.ruleForm.resetFields()
    },
    showCurrentPassword () {
      this.isShowCurrentPassword = true
      this.typeCurrentInput = 'text'
    },
    hiddenCurrentPassword () {
      this.isShowCurrentPassword = false
      this.typeCurrentInput = 'password'
    },
    showNewPassword () {
      this.isShowNewPassword = true
      this.typeNewInput = 'text'
    },
    hiddenNewPassword () {
      this.isShowNewPassword = false
      this.typeNewInput = 'password'
    },
    showConfirmPassword () {
      this.isShowConfirmPassword = true
      this.typeConfirmInput = 'text'
    },
    hiddenConfirmPassword () {
      this.isShowConfirmPassword = false
      this.typeConfirmInput = 'password'
    }
  }
}
</script>

  <style lang="scss">
  .form-change{
    .ant-form-item-label > label {
      @apply text-white
    }
    .ant-input-affix-wrapper {
      @apply w-[280px]
    }
    .ant-form-item-control .ant-input-affix-wrapper .ant-input-suffix i{
      color: #838487 !important;
    }
    .ant-input{
        @apply py-[18px] w-full
    }
  }
  </style>
