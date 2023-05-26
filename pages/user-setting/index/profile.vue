<template>
  <div class="bg-gray_850 flex w-full h-full flex-col text-white space-y- setting-profile">
    <div class="flex flex-col">
      <div class="text-[18px] font-semibold flex justify-between">
        <div>
          Profile picture
        </div>
        <button class="text-[16px] px-2 hover:bg-gray-700 font-medium text-blue-500 rounded-md" @click="showUploadAvatar">
          Edit
        </button>
      </div>
      <div class="flex py-2 justify-center items-center">
        <img v-if="isLoaded" :src="user.avatar||avatar" alt="photo" class="w-40 h-40 rounded-full object-cover">
        <div v-else class="w-40 h-40 rounded-full object-cover bg-gray-400" />
      </div>
    </div>
    <div class="flex flex-col">
      <div class="text-[18px] font-semibold flex justify-between">
        <div>
          Cover photo
        </div>
        <button class="text-[16px] px-2 hover:bg-gray-700 font-medium text-blue-500 rounded-md" @click="showUploadCover">
          Edit
        </button>
      </div>
      <div class="flex py-2 justify-center items-center">
        <img v-if="isLoaded" :src="user.coverImage||cover" alt="photo" class="min-w-[500px] h-[180px] rounded-xl object-cover">
        <div v-else class="min-w-[500px] h-[180px] rounded-xl object-cover bg-gray-400" />
      </div>
    </div>
    <div class="flex flex-col">
      <div class="text-[18px] font-semibold flex justify-between">
        <div>
          About
        </div>
        <button v-if="!isEditAbout" class="text-[16px] px-2 hover:bg-gray-700 font-medium text-blue-500 rounded-md py-1" @click="editAbout">
          Edit
        </button>
        <div v-if="isEditAbout">
          <button class="text-[16px] px-2 hover:bg-gray-700 font-medium text-blue-500 rounded-md py-1" @click="updateAbout">
            Save
          </button>
          <button class="text-[16px] px-2 hover:bg-gray-700 py-1 font-medium text-blue-500 rounded-md" @click="hiddenEditAbout">
            Cancel
          </button>
        </div>
      </div>
      <div class="flex py-2 justify-center items-center">
        <textarea ref="textAbout" v-model="textAbout" name="text" class="bg-gray-800 border border-gray-700 w-[500px] h-40 rounded-xl p-2 resize-none" :disabled="!isEditAbout" />
      </div>
    </div>
    <div class="flex flex-col">
      <div class="text-[18px] font-semibold flex justify-between">
        <div>
          Date of birth
        </div>
        <button v-if="!isEditDateOfBirth" class="text-[16px] px-2 hover:bg-gray-700 font-medium text-blue-500 rounded-md" @click="editDateOfBirth">
          Edit
        </button>
        <div v-if="isEditDateOfBirth">
          <button class="text-[16px] px-2 hover:bg-gray-700 font-medium text-blue-500 rounded-md py-1" @click="updateDateOfBirth">
            Save
          </button>
          <button class="text-[16px] px-2 hover:bg-gray-700 py-1 font-medium text-blue-500 rounded-md" @click="hiddenDateOfBirth">
            Cancel
          </button>
        </div>
      </div>
      <div class="flex py-2 justify-center items-center">
        <a-date-picker v-model="dateOfBirth" size="large" :disabled="disabledDate" />
      </div>
    </div>
    <div class="flex flex-col">
      <div class="text-[18px] font-semibold flex justify-between">
        <div>
          Gender
        </div>
        <button v-if="!isEditGender" class="text-[16px] px-2 hover:bg-gray-700 font-medium text-blue-500 rounded-md" @click="editGender">
          Edit
        </button>
        <div v-if="isEditGender">
          <button class="text-[16px] px-2 hover:bg-gray-700 font-medium text-blue-500 rounded-md py-1" @click="updateGender">
            Save
          </button>
          <button class="text-[16px] px-2 hover:bg-gray-700 py-1 font-medium text-blue-500 rounded-md" @click="hiddenGender">
            Cancel
          </button>
        </div>
      </div>
      <div class="flex py-2 justify-center items-center">
        <a-select v-model="gender" default-value="MALE" class="w-[280px]" placeholder="Please select your gender" :disabled="disabledGender">
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
      </div>
    </div>
    <div class="flex flex-col">
      <div class="text-[18px] font-semibold flex justify-between">
        <div>
          Full name
        </div>
        <button v-if="!isEditFullName" class="text-[16px] px-2 hover:bg-gray-700 font-medium text-blue-500 rounded-md py-1" @click="editFullName">
          Edit
        </button>
        <div v-if="isEditFullName">
          <button class="text-[16px] px-2 hover:bg-gray-700 font-medium text-blue-500 rounded-md py-1" @click="updateFullName">
            Save
          </button>
          <button class="text-[16px] px-2 hover:bg-gray-700 py-1 font-medium text-blue-500 rounded-md" @click="hiddenFullName">
            Cancel
          </button>
        </div>
      </div>
      <div class="flex py-2 justify-center items-center">
        <a-input v-model="fullname" placeholder="default size" :disabled="disabledFullname" class="w-[280px] h-[38px]" />
      </div>
    </div>
    <!-- change pass -->
    <div class="flex flex-col">
      <div class="text-[18px] font-semibold flex justify-between">
        <div>
          Change password
        </div>
        <button class="text-[16px] px-2 hover:bg-gray-700 font-medium text-blue-500 rounded-md py-1" @click="ChangePassword">
          {{ isChangePassword ?'Cancel': 'Edit' }}
        </button>
      </div>
      <div class="flex py-2 justify-center items-center">
        <ChangePassword ref="formChangePassword" :change="isChangePassword" />
      </div>
    </div>
    <UploadSingle ref="upLoadImgSetting" @updateUserSetting="fetchUserSetting" />
  </div>
</template>

<script>
import UploadSingle from '~/components/modal/UploadSingle.vue'
import ChangePassword from '~/components/user-setting/ChangePassword.vue'
export default {
  components: { UploadSingle, ChangePassword },
  data () {
    return {
      textAbout: '',
      isEditAbout: false,
      isEditDateOfBirth: false,
      isEditGender: false,
      isEditFullName: false,
      user: {},
      isLoaded: false,
      disabledDate: true,
      disabledGender: true,
      disabledFullname: true,
      dateOfBirth: '2001-01-01',
      gender: 'Male',
      fullname: '',
      isChangePassword: false
    }
  },
  computed: {
    avatar () {
      return this.$store.getters.avatar
    },
    cover () {
      return this.$store.getters.cover
    }
  },
  async created () {
    await this.getUser()
  },
  methods: {
    ChangePassword () {
      if (!this.isChangePassword) {
        this.$refs.formChangePassword.resetForm()
      }
      this.isChangePassword = !this.isChangePassword
    },
    async fetchUserSetting () {
      await this.getUser()
    },
    showUploadAvatar () {
      this.$refs.upLoadImgSetting.show('AVATAR')
    },
    showUploadCover () {
      this.$refs.upLoadImgSetting.show('COVER')
    },
    editAbout () {
      this.isEditAbout = true
      this.$refs.textAbout.focus()
    },
    editDateOfBirth () {
      this.disabledDate = false
      this.isEditDateOfBirth = true
    },
    editGender () {
      this.disabledGender = false
      this.isEditGender = true
    },
    editFullName () {
      this.disabledFullname = false
      this.isEditFullName = true
    },
    async updateAbout () {
      try {
        const aboutMe = this.textAbout.replace(/\r?\n/g, '\r\n')
        this.isEditAbout = false
        const userUpdate = await this.$api.user.updateUserInfo({ aboutMe })
        this.textAbout = userUpdate.data.user.aboutMe
      } catch (err) {
        //
        this.$toast.error('System error.', { timeout: 1500 })
      }
    },
    async updateDateOfBirth () {
      try {
        this.isEditDateOfBirth = false
        const userUpdate = await this.$api.user.updateUserInfo({ dateOfBirth: this.dateOfBirth })
        this.dateOfBirth = userUpdate.data.user.dateOfBirth
        this.disabledDate = true
      } catch (err) {
        //
        this.$toast.error('System error.', { timeout: 1500 })
      }
    },
    async updateGender () {
      try {
        this.isEditGender = false
        let genderUser = 'OTHER'
        if (this.gender) {
          genderUser = this.gender
        }
        const userUpdate = await this.$api.user.updateUserInfo({ gender: genderUser })
        this.gender = userUpdate.data.user.gender
        this.disabledGender = true
      } catch (err) {
        //
        this.$toast.error('System error.', { timeout: 1500 })
      }
    },
    async updateFullName () {
      try {
        this.isEditFullName = false
        const userUpdate = await this.$api.user.updateUserInfo({ fullname: this.fullname })
        this.fullname = userUpdate.data.user.fullname
        this.disabledFullname = true
      } catch (err) {
        //
        this.$toast.error('System error.', { timeout: 1500 })
      }
    },
    hiddenDateOfBirth () {
      this.isEditDateOfBirth = false
      this.disabledDate = true
    },
    hiddenEditAbout () {
      this.isEditAbout = false
    },
    hiddenGender () {
      this.isEditGender = false
      this.disabledGender = true
    },
    hiddenFullName () {
      this.isEditFullName = false
      this.disabledFullname = true
    },
    async getUser () {
      try {
        this.isLoaded = false
        const dataUser = await this.$api.user.getMe()
        this.user = dataUser.data.user
        if (this.user.aboutMe) {
          this.textAbout = this.user.aboutMe
        }
        if (this.user.dateOfBirth) {
          this.dateOfBirth = this.user.dateOfBirth
        }
        this.gender = this.user.gender
        this.fullname = this.user.fullname
        this.isLoaded = true
      } catch (err) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss">
.setting-profile{
  .ant-select-arrow{
      @apply text-white
    }
    .ant-form-item{
      @apply mb-5
    }
    .ant-select-selection--single{
      @apply h-[38px] pt-[3px]
    }
}
</style>
