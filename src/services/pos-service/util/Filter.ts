export enum FilterBuilderOperator {
  EQUAL = "=",
  NOT_EQUAL = "<>",
  GT = ">",
  GTE = ">=",
  LT = "<",
  LTE = "<=",
  CONTAINS = "CONTAINS",
  NOT_CONTAINS = "NOT_CONTAINS",
}

type ExtractStringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T]

export class Filter<T> {
  filters = []

  add(field: ExtractStringPropertyNames<T>, operator: FilterBuilderOperator, value: string) {
    const encodeField = encodeURIComponent(field.toString())
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
