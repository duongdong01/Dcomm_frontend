export default axios => ({
  getListFriend ({ userParam, limit, page, keyword }) {
    return axios.get(`user-relationship/${userParam}/get-list-friends?page=${page}&limit=${limit}&keyword=${keyword}`).then(_ => _.data)
  }
})
