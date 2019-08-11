/** VUEX nav module**/

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    activeHamburgerMenu: false
  },
  // -----------------------------------------------------------------
  getters: {
    getActiveHamburgerMenu: state => {
      return state.activeHamburgerMenu;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    //toggles the sidebar menu
    NAV_toggleHamburgerMenu(state, boolean) {
      state.activeHamburgerMenu = !state.activeHamburgerMenu;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    NAV_toggleHamburgerMenu: ({ commit }) => {
      commit("NAV_toggleHamburgerMenu");
    }
  }
};
