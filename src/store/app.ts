export const useAppStore = defineStore('app', {
  state: () => ({}),
  getters: {},
  actions: {},
});

import.meta.hot &&
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
