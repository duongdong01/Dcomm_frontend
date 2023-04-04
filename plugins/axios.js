import axios from 'axios'
export default function (context, inject) {
  context.$axios.onRequest((config) => {
    if (localStorage.getItem('access_token')) {
      // eslint-disable-next-line camelcase
      const access_token = localStorage.getItem('access_token')
      // eslint-disable-next-line camelcase
      config.headers.common.Authorization = `Bearer ${access_token}`
    }
  })
  context.$axios.onError(async (error) => {
    if (error.response.status === 401) {
      const dataToken = await context.$axios.post('/auth/refresh-token', { refreshToken: localStorage.getItem('refresh_token') })
      localStorage.setItem('refresh_token', dataToken.data.data.refresh_token)
      localStorage.setItem('access_token', dataToken.data.data.access_token)
    } else {
      context.redirect('/auth/login')
    }
  })
  inject('axios', axios)
}
