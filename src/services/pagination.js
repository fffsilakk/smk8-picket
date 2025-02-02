import { defineStore } from 'pinia'

export const paginationState = defineStore('pagination', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      paginate: {},
      paginateResult: {},
    }
  },
  actions: {
    setPaginate(paginate) {
      this.paginate = paginate
    },
    setPaginateResult(paginateResult) {
      this.paginateResult = paginateResult
    },
  },
})