import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/providers/users_state_provider.dart';

class UsersTable extends ConsumerWidget {
  const UsersTable({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(usersStateProvider);
    return DataTable(
        columns: [
          DataColumn(
              label: Text(
            'ID',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'Nombre',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'Email',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'User',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'Tipo',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'Activo',
            style: Theme.of(context).textTheme.titleMedium,
          )),
        ],
        rows: state
            .map((user) => DataRow(cells: [
                  DataCell(Text(user.id.toString())),
                  DataCell(Text(user.name)),
                  DataCell(Text(user.email)),
                  DataCell(Text(user.account.username)),
                  DataCell(Text(user.account.accountType.name)),
                  DataCell(
                      Icon(user.account.isActive ? Icons.check : Icons.close)),
                ]))
            .toList());
  }
}
