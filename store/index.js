export const state = () => ({
  isNavOpen: false,
  selectedProjectPath: ""
});

export const mutations = {
  setIsNavOpen(state, yesno) {
    store.isNavOpen = yesno;
  },
  toggleNav(state) {
    state.isNavOpen = !state.isNavOpen;
  },
  setSelectedProjectPath(state, projectPath) {
    state.selectedProjectPath = projectPath;
  }
};