export const state = () => ({
  feeds: [],
  pageDetail: {},
  feedProfile: [],
  pageDetailPostProfile: {},
  isOpenModalSharePost: false,
  postDetail: {}
})

export const getters = {
  feeds: (state) => {
    return state.feeds
  },
  postDetail: (state) => {
    return state.postDetail
  },
  pageDetail: (state) => {
    return state.pageDetail
  },
  feedProfile: (state) => {
    return state.feedProfile
  },
  pageDetailPostProfile: (state) => {
    return state.pageDetailPostProfile
  },
  isOpenModalSharePost: (state) => {
    return state.isOpenModalSharePost
  },
  isFetchPost: (state) => {
    return state.isFetchPost
  }
}
export const mutations = {
  setPostDetail: (state, data) => {
    state.postDetail = data
  },
  setSharePostModal: (state, show) => {
    state.isOpenModalSharePost = show
  },
  setFeedProfile: (state, { isLoadMore, data }) => {
    if (isLoadMore) {
      state.feedProfile.push(...data)
    } else {
      state.feedProfile = data
    }
  },
  setFeeds: (state, { isLoadMore, data }) => {
    if (isLoadMore) {
      state.feeds.push(...data)
    } else {
      state.feeds = data
    }
  },
  setPageDetailPostProfile: (state, data) => {
    state.pageDetailPostProfile = data
  },
  deletePostPostProfile: (state, postId) => {
    let count = 0
    for (let i = 0; i < state.feedProfile.length; i++) {
      if (state.feedProfile[i]._id.toString() === postId.toString()) {
        count = i
        break
      }
    }
    state.feedProfile.splice(count, 1)
  },
  setPageDetail: (state, data) => {
    state.pageDetail = data
  },
  newPost: (state, data) => {
    state.feeds.unshift(data)
  },
  deletePost: (state, postId) => {
    let count = 0
    for (let i = 0; i < state.feeds.length; i++) {
      if (state.feeds[i]._id.toString() === postId.toString()) {
        count = i
        break
      }
    }
    state.feeds.splice(count, 1)
  },
  toggleLikePost: (state, postId) => {
    state.feeds.forEach((el) => {
      if (el._id.toString() === postId.toString()) {
        if (el.isReactions) {
          if (el.countReaction > 0) {
            el.isReactions = false
            el.countReaction -= 1
          }
        } else {
          el.isReactions = true
          el.countReaction += 1
        }
      }
    })

    state.feedProfile.forEach((el) => {
      if (el._id.toString() === postId.toString()) {
        if (el.isReactions) {
          if (el.countReaction > 0) {
            el.isReactions = false
            el.countReaction -= 1
          }
        } else {
          el.isReactions = true
          el.countReaction += 1
        }
      }
    })
  },
  toggleLikeComment: (state, data) => {
    const { postId, commentId } = data
    for (let i = 0; i < state.feeds.length; i++) {
      if (state.feeds[i]._id.toString() === postId.toString()) {
        state.feeds[i].comments.forEach((el) => {
          if (el._id.toString() === commentId.toString()) {
            if (el.isReaction) {
              if (el.countReaction > 0) {
                el.isReaction = false
                el.countReaction -= 1
              }
            } else {
              el.isReaction = true
              el.countReaction += 1
            }
          }
        })
        break
      }
    }
    for (let i = 0; i < state.feedProfile.length; i++) {
      if (state.feedProfile[i]._id.toString() === postId.toString()) {
        state.feedProfile[i].comments.forEach((el) => {
          if (el._id.toString() === commentId.toString()) {
            if (el.isReaction) {
              if (el.countReaction > 0) {
                el.isReaction = false
                el.countReaction -= 1
              }
            } else {
              el.isReaction = true
              el.countReaction += 1
            }
          }
        })
        break
      }
    }
  },
  deleteCommentInFeed: (state, data) => {
    const { postId, commentId, type } = data
    if (type === 'FEED') {
      let indexComment = 0
      let indexPost = 0
      for (let i = 0; i < state.feeds.length; i++) {
        if (state.feeds[i]._id.toString() === postId.toString()) {
          state.feeds[i].comments.forEach((el, vIndex) => {
            if (el._id.toString() === commentId.toString()) {
              indexComment = vIndex
            }
          })
          indexPost = i
          break
        }
      }
      state.feeds[indexPost].comments.splice(indexComment, 1)
      state.feeds[indexPost].countComment -= 1
    } else {
      let indexComment = 0
      let indexPost = 0
      for (let i = 0; i < state.feedProfile.length; i++) {
        if (state.feedProfile[i]._id.toString() === postId.toString()) {
          state.feedProfile[i].comments.forEach((el, vIndex) => {
            if (el._id.toString() === commentId.toString()) {
              indexComment = vIndex
            }
          })
          indexPost = i
          break
        }
      }
      state.feedProfile[indexPost].comments.splice(indexComment, 1)
      state.feedProfile[indexPost].countComment -= 1
    }
  },
  commentPost: (state, postId) => {
    state.feeds.forEach((el) => {
      if (el._id.toString() === postId.toString()) {
        el.countComment += 1
      }
    })
  },
  updatePost: (state, post) => {
    let index = 0
    for (let i = 0; i < state.feeds.length; i++) {
      if (state.feeds[i]._id.toString() === post._id.toString()) {
        index = i
        break
      }
    }
    state.feeds.splice(index, 1, post)
  },
  changeCountComment: (state, data) => {
    // type === ADD , REMOVE
    const { postId, type } = data

    if (type === 'ADD' && state.postDetail._id.toString() === postId.toString()) {
      state.postDetail.countComment += 1
    }
    if (type === 'REMOVE' && state.postDetail._id.toString() === postId.toString()) {
      if (state.postDetail.countComment > 0) {
        state.postDetail.countComment -= 1
      }
    }
  }
}
export const actions = {
  async getPostFeeds ({ commit, state }, { limit, page, isLoadMore, type, sort }) {
    try {
      const feedData = await this.$api.post.getPostFeeds({ limit, page, type, sort })
      commit('setFeeds', { isLoadMore, data: feedData.data.posts })
      commit('setPageDetail', feedData.data.pageDetail)
    } catch (err) {
      //
    }
  },
  async getPostFeedProfile ({ commit, state }, { userId, limit, page, isLoadMore }) {
    try {
      const feedData = await this.$api.post.getPostByUserId({ userId, limit, page })
      commit('setFeedProfile', { isLoadMore, data: feedData.data.posts })
      commit('setPageDetailPostProfile', feedData.data.pageDetail)
    } catch (err) {
      //
    }
  },
  async reactionPost ({ commit, state }, { on, type, postId }) {
    try {
      commit('toggleLikePost', postId)
      await this.$api.reaction.reactionPost({ on, type, postId })
    } catch (err) {
      //
      commit('toggleLikePost', postId)
    }
  },
  async getPostById ({ commit, state }, { postId }) {
    try {
      const postData = await this.$api.post.getPostById(postId)
      commit('setPostDetail', postData.data.post)
    } catch (err) {
      //
      this.$toast.error('System error.', { timeout: 1500 })
      this.$router.push('/')
    }
  }
}
