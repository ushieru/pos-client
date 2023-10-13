import 'package:flutter/material.dart' hide Table;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/providers/tables_state_provider.dart';
import 'package:total_pos/utils/table_utils.dart';
import 'package:total_pos/widgets/panel.dart';
import 'package:total_pos/widgets/table.dart';

class TablesRoute extends ConsumerWidget {
  static const String routeName = '/waiter/tables';
  const TablesRoute({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    var tables = tablesDesktoTablesMobile(ref.watch(tablesStateProvider));
    return Scaffold(
        resizeToAvoidBottomInset: false,
        body: SafeArea(
            child: Column(children: [
          const Panel(child: Row(children: [Text('Mesas')])),
          ExpandedPanel(
              child: tables.isEmpty
                  ? const LinearProgressIndicator()
                  : Column(children: [
                      for (int i = 0; i < 10; i++)
                        Expanded(
                            child: Row(children: [
                          for (int j = 0; j < 5; j++)
                            Expanded(
                                child: tables[(i * 5) + j] == null
                                    ? Container(
                                        decoration: BoxDecoration(
                                            color: Colors.grey.shade700
                                                .withAlpha(100),
                                            border: Border.all()))
                                    : Table(table: tables[(i * 5) + j]!))
                        ]))
                    ]))
        ])));
  }
}
