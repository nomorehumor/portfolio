export const state = () => ({
  isNavOpen: false
});

export const mutations = {
  setIsNavOpen(state, yesno) {
    store.isNavOpen = yesno;
  },
  toggleNav(state) {
    state.isNavOpen = !state.isNavOpen;
  }
};