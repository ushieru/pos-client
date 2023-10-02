import 'package:flutter/material.dart' hide Table;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/models/settings.dart';
import 'package:total_pos/models/table.dart';
import 'package:total_pos/providers/tables_state_provider.dart';
import 'package:total_pos/widgets/dialogs/create/create_table_dialog.dart';
import 'package:total_pos/widgets/layouts/dashboard_layout.dart';
import 'package:total_pos/widgets/panel.dart';

class TablesRoute extends ConsumerWidget {
  static const String routeName = '/admin/tables';
  const TablesRoute({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final tables = ref.watch(tablesStateProvider);
    return DashboardLayout(
        child: Column(children: [
      Panel(
          child: Text('Mesas', style: Theme.of(context).textTheme.titleLarge)),
      Panel(
          child: Row(children: [
        ElevatedButton.icon(
            onPressed: () => showCreateTableDialog(context),
            icon: const Icon(Icons.add),
            label: const Text('Nueva Mesa'))
      ])),
      ExpandedPanel(
          child: tables.isEmpty
              ? const LinearProgressIndicator()
              : Column(children: [
                  for (int i = 0; i < 4; i++)
                    Expanded(
                        child: Row(children: [
                      for (int j = 0; j < 9; j++)
                        Expanded(
                            child: tables[(i * 10) + j] == null
                                ? DragTarget(
                                    builder: (context, candidateData,
                                            rejectedData) =>
                                        Container(
                                      decoration: BoxDecoration(
                                          color: Colors.grey.shade700
                                              .withAlpha(100),
                                          border: Border.all())
                                    )
                                  )
                                : Draggable<Table>(
                                    data: tables[(i * 10) + j],
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
                                    child: Container(
                                        alignment: Alignment.center,
                                        decoration: BoxDecoration(
                                            color: Settings.primaryColor
                                                .withAlpha(100),
                                            border: Border.all()),
                                        child: Text(tables[(i * 10) + j]!.name,
                                            style: Theme.of(context)
                                                .textTheme
                                                .headlineLarge))))
                    ]))
                ]))
    ]));
  }
}
