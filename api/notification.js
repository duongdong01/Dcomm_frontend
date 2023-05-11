export default axios => ({
  getCountNotification () {
    return axios.get('notification/get-count-notification').then(_ => _.data)
  },
  getListNotification ({ page, limit, type }) {
    return axios.get(`/notification/notification?page=${page}&limit=${limit}&type=${type}`).then(_ => _.data)
  },
  deleteNotification ({ notificationId }) {
    return axios.delete(`/notification/${notificationId}`)
  },
  readNotification ({ notificationId }) {
    return axios.post('/notification/read-notification-by-id', { notificationId })
  },
  readAllNotification () {
    return axios.post('/notification/read-all-notification')
  }
})
