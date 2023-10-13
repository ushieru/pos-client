import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:total_pos/models/ticket.dart';

class _TicketProductsReceipDialog extends StatelessWidget {
  const _TicketProductsReceipDialog({required this.ticket});

  final Ticket ticket;

  @override
  Widget build(BuildContext context) => SimpleDialog(
          title: Text('Ticket #${ticket.id}'),
          contentPadding: const EdgeInsets.all(30),
          children: [
            SizedBox(
                height: MediaQuery.of(context).size.height / 2,
                width: MediaQuery.of(context).size.width / 2,
                child: ListView(
                    children: ticket.ticketProducts
                        .map((tp) => Card(
                            color: Colors.grey.shade900,
                            child: Padding(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 15, vertical: 8),
                              child: Column(children: [
                                Row(children: [
                                  Text(tp.product.name),
                                  const Expanded(child: SizedBox()),
                                  Text('\$${tp.product.price} c/u'),
                                ]),
                                Row(children: [
                                  Text(tp.quantity.toString()),
                                  const Expanded(child: SizedBox()),
                                  Text('\$${tp.product.price * tp.quantity}'),
                                ]),
                              ]),
                            )))
                        .toList())),
            const SizedBox(height: 25),
            Row(mainAxisAlignment: MainAxisAlignment.end, children: [
              SizedBox(
                  width: 120,
                  child: FilledButton(
                      onPressed: () => context.pop(),
                      child: const Text('Aceptar')))
            ])
          ]);
}

Future<bool?> showTicketProductsReceipDialog(
        BuildContext context, Ticket ticket) =>
    showDialog<bool>(
        context: context,
        builder: (BuildContext context) =>
            _TicketProductsReceipDialog(ticket: ticket));
