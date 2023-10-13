import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/providers/ticket_state_provider.dart';
import 'package:total_pos/widgets/dialogs/ticket_products_receip_dialog.dart';

class TicketsTable extends ConsumerWidget {
  const TicketsTable({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(ticketStateProvider);
    return DataTable(
        columns: [
          DataColumn(
              label: Text(
            'ID',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'Estatus',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'Total',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'Mesero',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'Optiones',
            style: Theme.of(context).textTheme.titleMedium,
          )),
        ],
        rows: state
            .map((ticket) => DataRow(cells: [
                  DataCell(Text(ticket.id.toString())),
                  DataCell(Text(ticket.ticketStatus.name)),
                  DataCell(Text('\$${ticket.total}')),
                  DataCell(Text(ticket.account.username)),
                  DataCell(Row(children: [
                    ElevatedButton(
                        onPressed: () => showTicketProductsReceipDialog(context, ticket),
                        child: const Icon(Icons.receipt_long,
                            color: Colors.blue)),
                  ]))
                ]))
            .toList());
  }
}
