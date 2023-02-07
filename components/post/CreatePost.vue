<template>
  <div class="flex flex-col rounded-xl bg-gray-800 text-base post">
    <div class="flex create_post  space-x-4 px-6 pt-5 ">
      <a href="#" class="avatar_user w-10 h-10 rounded-full cursor-pointer">
        <img src="@/static/avatar/avatar1.jpg" class="rounded-full" alt="avatar">
      </a>
      <div class="w-full">
        <textarea
          ref="textarea"
          v-model="postUser.content"
          placeholder="What's happening?"
          class="post-textarea rounded-xl px-3 pt-2  bg-main_color transition-all ease-out duration-150 h-14 min-h-[56px]"
          @input="resize()"
        />
        <!-- <textarea ref="textarea" placeholder="write something..." @input="resize()" /> -->
      </div>
    </div>
    <div class="flex flex-col space-y-4 mb-4">
      <div class="px-10 ml-10  grid gap-6 mt-1" :class="[previewImage.length>1 ? ' grid-cols-4' :'grid-cols-2']">
        <div v-for="(item,index) in previewImage" :key="index" class="overflow-hidden max-h-[50vh] rounded-xl flex justify-center">
          <img :src="item" class="h-full rounded-xl w-[100%] object-contain">
        </div>
      </div>
      <div class="px-10 grid grid-cols-3 gap-4">
        <div class="border-r-[1px] flex justify-center text-center">
          <label for="file-input" class="flex"><svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-camera text-white cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
          </svg> <p class="text-white ml-2 mt-[6px]">Image/Video</p></label>
          <input id="file-input" type="file" accept="image/jpeg" multiple="multiple" @change="uploadImage">
        </div>
        <div class="border-r-[1px] flex justify-center items-center">
          <a-select
            label-in-value
            placeholder="Who can reply ?"
            class="bg-gray-800 w-44 text-base text-white select-post"
            @change="handleChange"
          >
            <a-select-option value="jack">
              Everyone
            </a-select-option>
            <a-select-option value="lucy">
              People you follow
            </a-select-option>
          </a-select>
        </div>
        <div class="flex justify-center">
          <button class="text-white bg-primary px-4 py-[10px] rounded-xl min-w-[140px]" @click="onSubmit">
            Create Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      previewImage: [],
      count: 0,
      postUser: {
        content: '',
        user: '63a8595b70f313083970865f',
        image: [
          'image'
        ]
      }
    }
  },
  mounted () {
    // this.getPostById()
  },
  methods: {

    handleChange (value) {
      console.log(value) // { key: "lucy", label: "Lucy (101)" }
    },
    resize () {
      const element = this.$refs.textarea
      if (element.scrollHeight > 90) {
        element.style.height = 'auto'
      } else {
        //
      }
      element.style.height = element.scrollHeight + 'px'
    },
    uploadImage (e) {
      const image = e.target.files
      for (let i = 0; i < image.length; i++) {
        const reader = new FileReader()
        reader.readAsDataURL(image[i])
        reader.onload = (e) => {
          this.previewImage.push(e.target.result)
        }
      }
    },
    async onSubmit () {
      // console.log('content: ', this.postUser.content)
      try {
        let contents = []
        if (this.postUser.content.length > 0) {
          contents = this.postUser.content.split(/\n/)
          this.postUser.content = contents.join('\n')
          // console.log('hadah', contents.join('\n'))
        }
        console.log(this.postUser.content)
        await this.$api.post_user.create(this.postUser)
      } catch (error) {
        console.log(error)
      }
    }
    // async getPostById () {
    //   const postUserData = await this.$api.post_user.getPostById('63d63dc5413f9ac2a342bf13')
    //   this.postUser.content = postUserData.data.content
    // }
  }
}
</script>

<style lang="scss">

// textarea {

// }
.post{

  .create_post{
      .post-textarea{
          @apply outline-0 border-0 resize-none w-full font-normal text-base text-white overflow-hidden;
  //           width: 300px;
  // min-height: 72px;
  // padding: 2px;
  // resize: none;
  // overflow: hidden;
  // background-color: transparent;
  // border: 2px solid #000;
  // border-radius: 4px;
  // font-family: "Inconsolata", monospace;
  // font-size: 1rem;
  // color: #000;
      }
      .post-textarea::placeholder{
          @apply font-normal   text-[16px] pt-1
      }
      .post-textarea:focus{
        @apply h-20 transition-all duration-150 ease-in
      }

  }
  #file-input{
          @apply hidden
    }
    .ant-select-selection__placeholder{
      @apply text-white
    }
    .ant-select-selection--single{
      @apply bg-gray-800 border-none
    }
    .ant-select-selection--single:focus{
      @apply bg-gray-800 border-none
    }
    .ant-select-focused .ant-select-selection, .ant-select-selection:focus, .ant-select-selection:active{
      @apply shadow-none
    }
    .ant-select-arrow-icon{
      @apply text-white
    }
}
.ant-select-dropdown-content{
  @apply rounded-md
}
.ant-select-dropdown{
  @apply rounded-lg
}
    .ant-select-dropdown-menu ,.ant-select-dropdown-menu-vertical ,.ant-select-dropdown-menu-root{
      @apply bg-gray-700 text-white
    }
  .ant-select-dropdown-menu-item{
      @apply bg-gray-700 text-white text-base
    }
    .ant-select-dropdown-menu-item:hover{
      @apply bg-gray-600 text-white
    }
    .ant-select-dropdown-menu-item:hover:not(.ant-select-dropdown-menu-item-disabled),.ant-select-dropdown-menu-item-active:not(.ant-select-dropdown-menu-item-disabled){
      @apply bg-gray-600 text-white
    }
</style>
