import 'package:total_pos/models/table.dart';

List<List<T?>> rotate2dMatrix<T>(List<List<T?>> matrix) {
  final List<List<T?>> newList2d = List.generate(
      matrix[0].length, (_) => List.generate(matrix.length, (_) => null));
  for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
      newList2d[j][matrix.length - 1 - i] = matrix[i][j];
    }
  }
  return newList2d;
}

List<Table?> tablesDesktoTablesMobile(List<Table?> matrix) {
  final List<List<Table?>> list2d =
      List.generate(5, (_) => List.generate(10, (_) => null));
  for (final table in matrix) {
    if (table == null) continue;
    list2d[table.posX - 1][table.posY - 1] = table;
  }
  final rotateList = rotate2dMatrix(list2d);
  final linearList = List<Table?>.filled(50, null);
  for (var i = 0; i < rotateList.length; i++) {
    for (var j = 0; j < rotateList[i].length; j++) {
      linearList[(i * 5) + (j)] = rotateList[i][j];
    }
  }
  return linearList;
}
