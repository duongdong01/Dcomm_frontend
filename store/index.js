export const state = () => ({
  userInfo: null,
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
