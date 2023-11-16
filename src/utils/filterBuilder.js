export class FilterBuilder {
  filters = []

  /**
   * Add criteria filter
   *
   * @param {string} field 
   * @param {string} value 
   * @param {string} operator 
   *
   * @return {FilterBuilder} FilterBuilder instance
   */
  addFilter(field, operator, value) {
    const encodeField = encodeURIComponent(field)
    const encodeOperator = encodeURIComponent(operator)
    const encodeValue = encodeURIComponent(value)
    this.filters.push({ field: encodeField, operator: encodeOperator, value: encodeValue })
    return this
  }

  /**
   * Build criteria filters
   * @returns {string}
   */
  build() {
    return this.filters.reduce(
      (p, c, i) => p + `filters[${i}][field]=${c.field}&filters[${i}][operator]=${c.operator}&filters[${i}][value]=${c.value}&`,
      '')
  }
}


