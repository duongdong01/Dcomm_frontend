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
  }
})
