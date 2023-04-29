export const state = () => ({
  comments: [],
  pageDetail: {}
})
export const getters = {
  comments: (state) => {
    return state.comments
  },
  pageDetail: (state) => {
    return state.pageDetail
  }
}

export const mutations = {
  setComments: (state, data) => {
    state.comments = data
  },
  setPageDetailPostProfile: (state, data) => {
    state.pageDetailPostProfile = data
  },
  toggleLikeComment: (state, commentId) => {
    state.comments.forEach((el) => {
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
  },
  deleteComment: (state, commentId) => {
    let index = 0
    for (let i = 0; i < state.comments.length; i++) {
      if (state.comments[i]._id.toString() === commentId.toString()) {
        index = i
        break
      }
    }
    console.log(index, commentId)
    state.comments.splice(index, 1)
  }
}

export const actions = {
  async getCommentByPostId ({ commit, state }, { postId, limit, page }) {
    try {
      const commentData = await this.$api.comment.getCommentByPostId({ postId, limit, page })
      commit('setComments', commentData.data.comments)
    } catch (err) {
      //
    }
  },
  async upvoteComment ({ commit, state }, { on, type, commentId }) {
    try {
      commit('toggleLikeComment', commentId)
      await this.$api.comment.reactionComment({ on, type, commentId })
    } catch (err) {
      //
      commit('toggleLikeComment', commentId)
    }
  }
}
