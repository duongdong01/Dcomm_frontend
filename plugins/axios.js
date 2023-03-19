export default ({ $axios }) => {
  $axios.onRequest((config) => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt')
      config.headers.common.Authorization = `Bearer ${jwt}`
    }
  })
}
