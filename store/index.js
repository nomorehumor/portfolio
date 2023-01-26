export const state = () => ({
  isNavOpen: false,
  selectedProjectPath: "",
  searchText: "",
  filters: {
    type: "",
    area: "", 
    //   web: false,
    //   embedded: false
    // }
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
  },
  setTypeFilter(state, type) {
    state.filters.type = type
  }
};