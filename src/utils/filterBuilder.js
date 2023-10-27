export class FilterBuilder {
  filters = []

  addFilter(field, operator, value) {
    const encodeField = encodeURIComponent(field)
    const encodeOperator = encodeURIComponent(operator)
    const encodeValue = encodeURIComponent(value)
    this.filters.push({ field: encodeField, operator: encodeOperator, value: encodeValue })
    return this
  }

  build() {
    return this.filters.reduce(
      (p, c, i) => p + `filters[${i}][field]=${c.field}&filters[${i}][operator]=${c.operator}&filters[${i}][value]=${c.value}&`,
      '')
  }
}


