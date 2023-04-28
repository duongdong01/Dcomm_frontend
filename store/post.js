export const state = () => ({
  feeds: [],
  pageDetail: {},
  feedProfile: [],
  pageDetailPostProfile: {},
  isOpenModalSharePost: false
})

export const getters = {
  feeds: (state) => {
    return state.feeds
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
  }
}
export const mutations = {
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
  }
}
export const actions = {
  async getPostFeeds ({ commit, state }, { limit, page, isLoadMore }) {
    try {
      const feedData = await this.$api.post.getPostFeeds({ limit, page })
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
  }
}
