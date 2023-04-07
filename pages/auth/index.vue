<template>
  <div class="w-full h-[100vh] overflow-hidden grid md:grid-cols-2 grid-cols-1" style="background-color: #171819;">
    <div class="left-login w-full h-full  justify-center items-center relative hidden md:flex">
      <img src="@/static/map.ec5a8d00.png" alt="logo" class="w-[640px]">
    </div>
    <div class=" text-white h-full w-full flex justify-center items-center right-login transition-all ease-in">
      <div class=" w-[620px] md:min-h-[610px] min-h-full bg-[#121212] flex flex-col  items-center justify-center space-y-2 mx-0 drop-shadow-xl  rounded-2xl">
        <div class="bg-white w-[70px] h-[70px] rounded-md flex justify-center items-center mt-[30px]">
          <img src="@/static/logo/dscvr-logo.png" alt="logo" class="w-14 h-14">
        </div>
        <div class="space-y-6 flex flex-col items-center w-full">
          <p v-if="$route.path.split('/')[2] === 'login' " class="text-white md:text-[22px] text-[20px] font-semibold mt-6">
            Login in to Ducat Community
          </p>
          <p v-if="$route.path.split('/')[2] === 'signup'" class="text-white md:text-[22px] text-[20px] font-semibold mt-6">
            Sign up to Ducat Community
          </p>
          <p v-if="$route.path.split('/')[2] === 'forgot'" class="text-white md:text-[22px] text-[20px] font-semibold mt-6">
            Recover Account
          </p>
          <div class="w-full h-full md:px-8 px-4">
            <nuxt-child />
          </div>
        </div>
        <div class="flex justify-center mt-1 text-[16px] font-medium ">
          <p v-if="$route.path.split('/')[2] === 'login'" class="mb-[30px]">
            Don't have an account? <nuxt-link to="/auth/signup" tag="a" class="hover:text-blue-600 text-blue-500">
              Sign up!
            </nuxt-link>
          </p>
          <p v-if="$route.path.split('/')[2] === 'signup'" class="mb-[30px]">
            Do you have an account? <nuxt-link to="/auth/login" tag="a" class="hover:text-blue-600 text-blue-500">
              Log in!
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  middleware: ['existToken'],
  data: () => {
    return {
      forgotPass: false
    }
  },
  watch: {
    $route () {
      if (this.$route.path.split('/')[1] === 'auth' && this.$route.path.split('/').length === 2) {
        this.$router.push('/auth/login')
      }
    }
  },
  beforeCreate () {
    if (this.$route.path.split('/')[1] === 'auth' && this.$route.path.split('/').length === 2) {
      this.$router.push('/auth/login')
    }
  }
}
</script>
<style lang="scss">
@keyframes topToBottom {
  0% {
    transform: translateY(-40px);
  }
  100% {
    transform: translateY(0px);
  }
}

.left-login{
  background-image: url('@/static/blur-gradient.33a40d71.png');
  // background-origin: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.right-login{
  -webkit-animation: topToBottom ease-in 0.5s;
}
</style>
