<template>
  <div class="pagination">
    <button
      v-if="showPrevious"
      class="item prev"
      @click="changePage(current - 1)"
    >
      &laquo;
    </button>
    <button
      v-for="(page, index) in pages"
      :key="page"
      class="item"
      :class="{ current: page === current }"
      @click="changePage(index)"
    >
      {{ page }}
    </button>
    <button v-if="showNext" class="item next" @click="changePage(current + 1)">
      &raquo;
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    offset: {
      type: [String, Number],
      default: 0,
    },
    total: {
      type: [String, Number],
      required: true,
    },
    limit: {
      type: [String, Number],
      default: 1,
    },
  },
  computed: {
    showPrevious() {
      return this.current > 1
    },
    showNext() {
      return this.total > this.limit * this.current
    },
    current() {
      return this.offset ? this.offset + 1 : 1
    },
    pages() {
      const qty = Math.ceil(this.total / this.limit)

      if (qty <= 1) return [1]

      return Array.from(Array(qty).keys(), (i) => i + 1)
    },
  },
  methods: {
    changePage(offset) {
      this.$emit("change-page", offset)
    },
  },
}
</script>

<style lang="scss">
  @import "../assets/scss/variables.scss";
  @import "../assets/scss/styles/pagination.scss";
</style>