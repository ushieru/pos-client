import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:total_pos/models/ticket.dart';

class _PayTicketDialog extends StatefulWidget {
  const _PayTicketDialog({
    required this.ticket,
  });

  final Ticket ticket;

  @override
  State<_PayTicketDialog> createState() => _PayTicketDialogState();
}

class _PayTicketDialogState extends State<_PayTicketDialog> {
  final payWith = TextEditingController();

  double change = 0;

  @override
  Widget build(BuildContext context) => SimpleDialog(
          title: Text('Pagar ticket #${widget.ticket.id}'),
          contentPadding: const EdgeInsets.all(30),
          children: [
            Text('Pago total por \$${widget.ticket.total}',
                style: Theme.of(context).textTheme.bodyLarge),
            TextFormField(
                keyboardType: TextInputType.number,
                inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                decoration: const InputDecoration(labelText: 'Paga con'),
                onChanged: (input) => setState(() => change =
                    (double.tryParse(input) ?? 0) - widget.ticket.total)),
            const SizedBox(height: 15),
            Text('Cambio:  \$$change',
                style: Theme.of(context).textTheme.bodyLarge),
            const SizedBox(height: 25),
            Row(mainAxisAlignment: MainAxisAlignment.end, children: [
              SizedBox(
                  width: 120,
                  child: OutlinedButton(
                      onPressed: () => context.pop(false),
                      child: const Text('Cancelar'))),
              const SizedBox(width: 25),
              SizedBox(
                  width: 120,
                  child: FilledButton(
                      onPressed: () => context.pop(true),
                      child: const Text('Aceptar')))
            ])
          ]);
}

Future<bool?> showPayTicketDialog(BuildContext context, Ticket ticket) =>
    showDialog<bool>(
        context: context,
        builder: (BuildContext context) => _PayTicketDialog(ticket: ticket));
