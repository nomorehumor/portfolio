export const state = () => ({
  isNavOpen: false,
  selectedProjectPath: "",
  searchText: "",
  filters: {
    radio: {
      study: false,
      work: false,
    },
    check: {
      web: false,
      embedded: false
    }
  }
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
  },
  setSearchText(state, text) {
    state.searchText = text
  }
};