export const orderTables = (tables, isVertical = false) => {
  const tables2d = Array.from({ length: 5 }, () => Array.from({ length: 10 }, () => undefined))
  for (const table of tables) {
    tables2d[table.pos_y - 1][table.pos_x - 1] = table
  }
  const t2d = isVertical ? rotateMatrix(tables2d) : tables2d
  const tablesOrdered = []
  for (const row of t2d) {
    for (const t of row) {
      tablesOrdered.push(t)
    }
  }
  return tablesOrdered
}

export const rotateMatrix = (matrix) => {
  const newList2d = Array.from({ length: matrix[0].length }, () => Array.from({ length: matrix.length }, () => undefined));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      newList2d[j][matrix.length - 1 - i] = matrix[i][j];
    }
  }
  return newList2d;
}

