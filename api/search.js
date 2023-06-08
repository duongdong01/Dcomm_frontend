export default axios => ({

  searchGlobalUser ({ limit, page, keyword }) {
    return axios.get(`/users/search-global?page=${page}&limit=${limit}&keyword=${keyword}`).then(_ => _.data)
  },
  searchGlobalPost ({ limit, page, keyword }) {
    return axios.get(`/post/search-post-global?page=${page}&limit=${limit}&keyword=${keyword}`).then(_ => _.data)
  },
  searchGlobalUserExplore ({ limit, page, keyword, explore }) {
    return axios.get(`/users/search-global?page=${page}&limit=${limit}&keyword=${keyword}&explore=${explore}`).then(_ => _.data)
  },
  searchGlobalPostExplore ({ limit, page, keyword, explore }) {
    return axios.get(`/post/search-post-global?page=${page}&limit=${limit}&keyword=${keyword}&explore=${explore}`).then(_ => _.data)
  }
})
