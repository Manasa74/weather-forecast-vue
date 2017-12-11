import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cities: ['Hyderabad', 'Guntur', 'Delhi']
  },
  mutations: {
    addCity (state, name) {
      state.cities.push(name)
    },
    deleteCity (state, index) {
      state.cities.splice(index, 1)
    }
  }
})
