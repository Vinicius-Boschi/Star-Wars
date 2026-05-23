import { fetchData } from "../services/api"

export default {
  data() {
    return {
      data: [],
      loading: true,
      currentPage: 1,
      totalPages: 1,
      searchedItem: "",
      resource: "",
    }
  },
  methods: {
    async fetchData(pageNumber = this.currentPage) {
      this.loading = true

      try {
        const { results, count } = await fetchData(
          this.resource,
          pageNumber,
          this.searchedItem
        )
        this.data = results
        this.updateTotalPages(Math.ceil(count / 10))
      } catch (error) {
        console.error("Error fetching data:", error)
      }

      this.loading = false
    },
    updateTotalPages(newTotalPages) {
      this.totalPages = newTotalPages
    },
  },
}