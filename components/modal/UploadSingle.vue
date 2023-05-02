<template>
  <div v-if="isShow" class="flex justify-center items-center w-full h-full top-0 left-0 fixed z-20 bg-black/80">
    <div>
      <a-upload
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader flex justify-center"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        @change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="min-h-[160px]">
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'upload'" class="text-white text-[24px] font-medium -mt-2" />
          <div class="text-white font-semibold text-[16px]">
            Drag your image here
          </div>
        </div>
        <div v-if="isLoaded" class="w-full h-full absolute items-center justify-center flex top-2">
          <LoadingSpin v-if="isLoaded" />
        </div>
      </a-upload>
      <div v-if="imageUrl.length" class="flex justify-center items-center space-x-3 mt-[2px]">
        <button class="bg-blue-500 text-white rounded-md px-3 py-2 font-medium hover:bg-blue-600 relative flex justify-center items-center" :disabled="isDisable" @click.prevent="upload">
          Save changes
        </button>
        <button class="bg-gray-200 rounded-md px-3 py-2 font-medium hover:bg-gray-300" @click.prevent="hidden">
          Cancel
        </button>
      </div>
    </div>
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
  </div>
</template>
<script>
import LoadingSpin from '../loading/LoadingSpin.vue'

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  components: { LoadingSpin },
  data () {
    return {
      isShow: false,
      loading: false,
      imageUrl: '',
      type: 'AVATAR',
      file: null,
      isDisable: false,
      isLoaded: false
    }
  },
  methods: {
    show (type) {
      this.type = type
      this.isShow = true
      this.isLoaded = false
    },
    hidden () {
      this.isShow = false
      this.imageUrl = ''
      this.isLoaded = false
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      this.file = file
      return isJpgOrPng && isLt2M
    },
    async upload () {
      try {
        if (this.file) {
          if (this.type === 'COVER') {
            this.isLoaded = true
            this.isDisable = true
            const formData = new FormData()
            formData.append('files', this.file)
            const filesData = await this.$api.upload.uploadFilesToAws(formData)
            const coverImage = filesData.data[0].url
            await this.$api.user.updateUserInfo({ coverImage })
            this.isDisable = false
            this.$emit('updateUser', true)
            this.isLoaded = false
            this.hidden()
          }
          if (this.type === 'AVATAR') {
            this.isDisable = true
            this.isLoaded = true
            const formData = new FormData()
            formData.append('files', this.file)
            const filesData = await this.$api.upload.uploadFilesToAws(formData)
            const avatar = filesData.data[0].url
            await this.$api.user.updateUserInfo({ avatar })
            this.isDisable = false
            this.$emit('updateUser', true)
            this.$emit('updateUserSetting', true)
            this.isLoaded = false
            this.hidden()
          }
        }
      } catch (err) {
        this.isLoaded = false
        //
      }
    }
  }
}
</script>

<style lang="scss">
 .ant-upload.ant-upload-select-picture-card{
    @apply w-80 h-44 bg-gray-900
}

.ant-upload.ant-upload-select-picture-card > .ant-upload{
    @apply min-w-[320px] min-h-[176px] bg-gray-900 flex justify-center items-center
}
</style>
