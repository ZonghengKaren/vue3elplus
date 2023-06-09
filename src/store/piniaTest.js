import { defineStore } from 'pinia'
export const useMyStore = defineStore({
  id: 'useMyStore',
  state: () => ({
    count: 0,
    name: ''
  }),
  getters: {
    getterCount() {
      return this.count;
    }
  },
  actions: {
    increment(res) {
      this.count += Number(res);
      console.log(this.count);
    }
  }
})