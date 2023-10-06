import 'package:flutter/material.dart' hide Table;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/models/dto/create_table_dto.dart';
import 'package:total_pos/models/settings.dart';
import 'package:total_pos/models/table.dart';
import 'package:total_pos/providers/tables_state_provider.dart';
import 'package:total_pos/widgets/dialogs/create/create_table_dialog.dart';
import 'package:total_pos/widgets/layouts/dashboard_layout.dart';
import 'package:total_pos/widgets/panel.dart';

class TablesRoute extends ConsumerStatefulWidget {
  static const String routeName = '/admin/tables';
  const TablesRoute({super.key});

  @override
  ConsumerState createState() => _TablesRouteState();
}

class _TablesRouteState extends ConsumerState {
  bool _isVisibleDeleteDrop = false;

  @override
  Widget build(BuildContext context) {
    final tables = ref.watch(tablesStateProvider);
    final tableMethods = ref.watch(tablesStateProvider.notifier);
    return DashboardLayout(
        child: Column(children: [
      Panel(
          child: Text('Mesas', style: Theme.of(context).textTheme.titleLarge)),
      Panel(
          child:
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        ElevatedButton.icon(
            onPressed: () => showCreateTableDialog(context),
            icon: const Icon(Icons.add),
            label: const Text('Nueva Mesa')),
        if (_isVisibleDeleteDrop)
          DragTarget<Table>(
              onAccept: (table) => tableMethods.deleteTable(table),
              builder: (context, candidateData, rejectedData) => Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 30, vertical: 3),
                    decoration:
                        BoxDecoration(border: Border.all(color: Colors.red)),
                    child: const Row(children: [
                      Icon(Icons.delete, color: Colors.red),
                      SizedBox(width: 10),
                      Text('Eliminar mesa'),
                    ]),
                  )),
      ])),
      ExpandedPanel(
          child: tables.isEmpty
              ? const LinearProgressIndicator()
              : Column(children: [
                  for (int i = 0; i < 5; i++)
                    Expanded(
                        child: Row(children: [
                      for (int j = 0; j < 10; j++)
                        Expanded(
                            child: tables[(i * 10) + j] == null
                                ? DragTarget<Table>(
                                    onAccept: (table) {
                                      final updateTableDTO = CreateTableDTO(
                                          name: table.name,
                                          posX: i + 1,
                                          posY: j + 1);
                                      tableMethods.updateTable(
                                          table, updateTableDTO);
                                    },
                                    builder: (context, candidateData, rejectedData) =>
                                        Container(
                                            decoration: BoxDecoration(
                                                color: Colors.grey.shade700
                                                    .withAlpha(100),
                                                border: Border.all())))
                                : Draggable<Table>(
                                    data: tables[(i * 10) + j],
                                    onDragStarted: () => setState(
                                        () => _isVisibleDeleteDrop = true),
                                    onDragEnd: (_) => setState(
                                        () => _isVisibleDeleteDrop = false),
                                    feedback: Container(
                                        width: 100,
                                        height: 100,
                                        alignment: Alignment.center,
                                        decoration: BoxDecoration(
                                            color: Settings.primaryColor,
                                            border: Border.all()),
                                        child: Text(tables[(i * 10) + j]!.name,
                                            style: Theme.of(context)
                                                .textTheme
                                                .headlineLarge)),
                                    child: Container(alignment: Alignment.center, decoration: BoxDecoration(color: Settings.primaryColor.withAlpha(100), border: Border.all()), child: Text(tables[(i * 10) + j]!.name, style: Theme.of(context).textTheme.headlineLarge))))
                    ]))
                ]))
    ]));
  }
}
