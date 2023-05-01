export const state = () => ({
  userInfo: null,
  avatar: require('@/static/avatar/avatar1.jpg'),
  systemInfo: {
    openLoginModal: false,
    openSignupModal: false,
    openFollower: false
  }
})

export const getters = {
  userInfo: (state) => {
    return state.userInfo
  },
  avatar: (state) => {
    return state.avatar
  },
  // isLoginModalOpen: (state) => {
  //   return state.systemInfo.openLoginModal
  // },
  isSignupModalOpen: (state) => {
    return state.systemInfo.openSignupModal
  },
  isOpenFollower: state => state.systemInfo.openFollower
}

export const mutations = {
  // showModalLogin: (state, show) => {
  //   state.systemInfo.openLoginModal = show
  // },
  // showModalSignup: (state, show) => {
  //   state.systemInfo.openSignupModal = show
  // },
  showFollower: (state, show) => {
    state.systemInfo.openFollower = show
  },
  setUserInfo: (state, data) => {
    state.userInfo = data
  }
}
