export const state = () => ({
  userInfo: {
    isLogin: true
  },
  systemInfo: {
    openLoginModal: false,
    openSignupModal: false
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
  }
}

export const mutations = {
  showModalLogin: (state, show) => {
    state.systemInfo.openLoginModal = show
  },
  showModalSignup: (state, show) => {
    state.systemInfo.openSignupModal = show
  }
}
