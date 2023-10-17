import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:total_pos/models/ticket.dart';
import 'package:total_pos/providers/ticket_state_provider.dart';
import 'package:total_pos/widgets/dialogs/pay_ticket_dialog.dart';

class _ChargeTicketFullScreenDialog extends ConsumerWidget {
  const _ChargeTicketFullScreenDialog(this.ticket);

  final Ticket ticket;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final ticketMethods = ref.read(ticketStateProvider.notifier);
    return Dialog.fullscreen(
        child: SafeArea(
            child: Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text('Ticket #${ticket.id}',
            style: Theme.of(context).textTheme.headlineLarge),
        const Divider(),
        Expanded(
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
        const Divider(),
        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
          Text('Total', style: Theme.of(context).textTheme.headlineMedium),
          Text('\$${ticket.total}',
              style: Theme.of(context).textTheme.headlineMedium)
        ]),
        const Divider(),
        Row(mainAxisAlignment: MainAxisAlignment.end, children: [
          OutlinedButton(
              onPressed: () => context.pop(), child: const Text('atras')),
          const SizedBox(width: 20),
          ElevatedButton(
              onPressed: () =>
                  showPayTicketDialog(context, ticket).then((value) {
                    if (value != true) return;
                    ticketMethods.payTicket(ticket);
                    context.pop(true);
                  }),
              child: const Text('Cobrar')),
        ]),
      ]),
    )));
  }
}

Future<bool?> showChargeTicketFullScreenDialog(
        BuildContext context, Ticket ticket) =>
    showDialog<bool>(
        context: context,
        builder: (BuildContext context) =>
            _ChargeTicketFullScreenDialog(ticket));
