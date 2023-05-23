import { valiQuery } from '@/assets/validators'
export default axios => ({
  statisticalUser ({ page, limit, sort, fullname, email }) {
    const query = valiQuery({ page, limit, sort, fullname, email })
    return axios.get(`/admin/statistical-user?${query}`).then(_ => _.data)
  },
  listReportPost ({ page, limit, sort, fullname, email }) {
    const query = valiQuery({ page, limit, sort, fullname, email })
    return axios.get(`/admin/list-report-post?${query}`).then(_ => _.data)
  },
  deleteUserReport ({ reportId }) {
    return axios.delete('/admin/delete-user-report', { data: { reportId } }).then(_ => _.data)
  },
  getListReportUser ({ page, limit, sort, description, emailSender, emailReported, nameReported }) {
    const query = valiQuery({ page, limit, sort, description, emailSender, emailReported, nameReported })
    return axios.get(`/admin/get-list-user-report?${query}`).then(_ => _.data)
  },
  revenueStatistics () {
    return axios.get('/admin/revenue-statistical').then(_ => _.data)
  },
  getPieChart () {
    return axios.get('/admin/get-pie-chart').then(_ => _.data)
  },
  getLineChart () {
    return axios.get('/admin/get-line-chart').then(_ => _.data)
  },
  get () {}
})
