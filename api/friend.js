export default axios => ({
  getListFriend ({ userParam, limit, page, keyword }) {
    return axios.get(`/user-relationship/${userParam}/get-list-friends?page=${page}&limit=${limit}&keyword=${keyword}`).then(_ => _.data)
  },
  removeFriendByUserId (userId) {
    return axios.put('/user-relationship/remove-friend', { friendId: userId })
  },
  createFriendRequest (receiverId) {
    return axios.post('/user-relationship/create-friend-request', { receiverId })
  },
  refuseFriendRequestByUserId (senderId) {
    return axios.delete('/user-relationship/refuse-friend-request-by-userId', {
      data: { senderId }
    })
  },
  cancelFriendRequestByUserId (receiverId) {
    return axios.delete('/user-relationship/cancel-friend-request-by-userId', { data: { receiverId } })
  },
  acceptFriendRequestByUserId (senderId) {
    return axios.post('/user-relationship/accept-friend-request-by-user-id', { senderId })
  }
})
