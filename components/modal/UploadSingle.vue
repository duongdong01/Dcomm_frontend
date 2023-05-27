<template>
  <div v-if="isShow" class="flex justify-center items-center w-full h-full top-0 left-0 fixed z-20 bg-black/80">
    <div class=" min-h-[260px] bg-[#1d1d1d] text-white py-4 px-8 rounded-lg border-gray-700 -mt-20 border" :class="isShowImage ? 'min-w-[260px] max-w-[600px]':'w-[650px]'">
      <div class="font-semibold text-[20px]">
        User profile {{ title }}
      </div>
      <div>
        It will be easier for friends to recognize you if you upload your real photo. You can upload an image in JPG, JPEG or PNG format. Frame size is 216x264.
      </div>
      <div v-if="!isShowImage" class="h-28 border-dashed border-gray-600 border-2 rounded-lg mt-6 bg-[#272727] flex justify-center items-center space-x-2 cursor-pointer" @click="inputFile">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-file-earmark-arrow-up"
            viewBox="0 0 16 16"
          >
            <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
          </svg>
        </div>
        <div>
          Upload your image here
        </div>
        <input
          v-show="false"
          ref="fileInput"
          type="file"
          accept="image/jpeg,video/mp4"
          multiple="false"
          @change="uploadImage"
        >
      </div>
      <div v-if="isShowImage" class="mt-6 mb-2">
        <div>
          <img :src="previewImage.dataImg" alt="photo" class="max-h-[600px] object-cover">
        </div>
        <div class="flex space-x-5 justify-center mt-4">
          <button class="px-4 py-[10px] bg-gray-600 rounded-lg w-44" @click="goBack">
            Discard & Go back
          </button>
          <button class="px-4 py-2 text-black bg-gray-200 rounded-lg w-44 relative flex justify-center" :disabled="isDisable" @click="uploadImageToAws">
            Proceed
            <LoadingSpin v-if="isLoaded" />
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
  </div>
</template>
<script>
import LoadingSpin from '../loading/LoadingSpin.vue'
export default {
  components: { LoadingSpin },
  data () {
    return {
      isShow: false,
      loading: false,
      title: 'avatar',
      type: 'AVATAR',
      file: null,
      isDisable: false,
      isLoaded: false,
      isShowImage: false,
      imageUpload: {},
      previewImage: {},
      typeImage: ['mp4', 'png', 'jpg', 'webp', 'jpeg']
    }
  },
  methods: {
    show (type) {
      if (type === 'AVATAR') {
        this.title = 'avatar'
      }
      if (type === 'COVER') {
        this.title = 'cover'
      }
      this.previewImage = {}
      this.file = null
      this.isShowImage = false
      this.type = type
      this.isShow = true
      this.isLoaded = false
    },
    hidden () {
      this.isShow = false
      this.imageUrl = ''
      this.isLoaded = false
    },
    inputFile () {
      this.$refs.fileInput.click()
    },
    uploadImage (e) {
      const image = e.target.files
      const reader = new FileReader()
      reader.readAsDataURL(image[0])
      this.file = image[0]
      reader.onload = (e) => {
        this.previewImage = { dataImg: e.target.result, name: image[0].name }
        this.isShowImage = true
      }
    },
    goBack () {
      this.isShowImage = false
      this.previewImage = {}
    },
    async uploadImageToAws () {
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
            this.$emit('updateUserSetting', true)
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
</style>
