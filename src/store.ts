import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    isLoggedIn: false,
    roles: [],
    username: null,
    fullName: null
  },
  mutations: {
    LOGIN: (state, { userId, username, fullName, roles }) => {
      state.userId = userId
      state.username = username
      state.fullName = fullName
      state.roles = roles
      state.isLoggedIn = true
    },
    LOGOUT: (state) => {
      state.isLoggedIn = false
      state.userId = null
      state.username = null
      state.fullName = null
      state.roles = []
    }
  },
  actions: {
    LOGIN: ({ commit, dispatch, state }, { userId, username, fullName, roles }) => {
      return new Promise(resolve => {
        commit('LOGIN', { userId, username, fullName, roles })
        resolve()
      })
    },
    LOGOUT: ({ commit, dispatch, state }) => {
      return new Promise(resolve => {
        commit('LOGOUT')
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn (state) {
      return state.isLoggedIn
    },
    userId (state) {
      return state.userId
    },
    username (state) {
      return state.username
    },
    fullName (state) {
      return state.fullName
    },
    roles (state) {
      return state.roles
    }
  }
})
