export const state = () => ({
  userInfo: {
    isLogin: true
  },
  systemInfo: {
    openLoginModal: false,
    openSignupModal: false,
    openFollower: false
  }
})

export const getters = {
  isLogin: (state) => {
    return state.userInfo.isLogin
  },
  isLoginModalOpen: (state) => {
    return state.systemInfo.openLoginModal
  },
  isSignupModalOpen: (state) => {
    return state.systemInfo.openSignupModal
  },
  isOpenFollower: state => state.systemInfo.openFollower
}

export const mutations = {
  showModalLogin: (state, show) => {
    state.systemInfo.openLoginModal = show
  },
  showModalSignup: (state, show) => {
    state.systemInfo.openSignupModal = show
  },
  showFollower: (state, show) => {
    state.systemInfo.openFollower = show
  }
}
