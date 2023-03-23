export default ({ $axios }) => {
  $axios.onRequest((config) => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt')
      config.headers.common.Authorization = `Bearer ${jwt}`
    }
  })
  $axios.interceptors.response.use((response) => {
    return response
  }, function (error) {
    // Do something with response error
    if (error.response.status === 401) {
      console.log('unauthorized, logging out ...')
      // auth.logout()
      // router.replace('/auth/login')
    }
    return Promise.reject(error.response)
  })
}
