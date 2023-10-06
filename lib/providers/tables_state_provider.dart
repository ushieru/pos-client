import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/models/dto/create_table_dto.dart';
import 'package:total_pos/models/table.dart';
import 'package:total_pos/providers/auth_state_provider.dart';
import 'package:total_pos/services/http_services/table_service.dart';

final tablesStateProvider =
    StateNotifierProvider<TablesStateProvider, List<Table?>>(
        (ref) => TablesStateProvider(ref.read(authStateProvider)));

class TablesStateProvider extends StateNotifier<List<Table?>> {
  TablesStateProvider(this.authState) : super([]) {
    getTables();
    Timer.periodic(const Duration(seconds: 5), (timer) {
      getTables();
    });
  }

  final AuthState authState;
  final _tablesService = TablesService();

  Future<void> getTables() async {
    final List<List<Table?>> list2d =
        List.generate(5, (_) => List.generate(10, (_) => null));
    final tables = await _tablesService.getTables(authState.jwtToken);
    for (final table in tables) {
      list2d[table.posX - 1][table.posY - 1] = table;
    }
    final linearList = List<Table?>.filled(50, null);
    for (var i = 0; i < list2d.length; i++) {
      for (var j = 0; j < list2d[i].length; j++) {
        linearList[(i * 10) + (j)] = list2d[i][j];
      }
    }
    state = linearList;
  }

  Future<void> createTable(String tableName) async {
    final List<List<Table?>> list2d =
        List.generate(5, (_) => List.generate(10, (_) => null));
    final tables = await _tablesService.getTables(authState.jwtToken);
    for (final table in tables) {
      list2d[table.posX - 1][table.posY - 1] = table;
    }
    for (var i = 0; i < list2d.length; i++) {
      for (var j = 0; j < list2d[i].length; j++) {
        if (list2d[i][j] == null) {
          final createTableDTO =
              CreateTableDTO(name: tableName, posX: i + 1, posY: j + 1);
          await _tablesService.createTable(authState.jwtToken, createTableDTO);
          getTables();
          return;
        }
      }
    }
  }

  Future<void> updateTable(Table table, CreateTableDTO createTableDTO) async {
    await _tablesService.updateTable(
        authState.jwtToken, table.id, createTableDTO);
    getTables();
  }

  Future<void> deleteTable(Table table) async {
    await _tablesService.deleteTable(authState.jwtToken, table.id);
    getTables();
  }
}
