import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:total_pos/providers/tables_state_provider.dart';

class _CreateTableDialog extends ConsumerWidget {
  _CreateTableDialog();

  final TextEditingController nameController = TextEditingController();

  void onSubmit(BuildContext context, WidgetRef ref) {
    ref
        .read(tablesStateProvider.notifier)
        .createTable(nameController.text)
        .then((_) => context.pop());
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) => SimpleDialog(
          title: const Text('Nueva Mesa'),
          contentPadding: const EdgeInsets.all(30),
          children: [
            TextFormField(
              autofocus: true,
              controller: nameController,
              decoration: const InputDecoration(labelText: 'Nombre'),
              onFieldSubmitted: (_) => onSubmit(context, ref),
            ),
            const SizedBox(height: 25),
            Row(mainAxisAlignment: MainAxisAlignment.end, children: [
              SizedBox(
                  width: 120,
                  child: OutlinedButton(
                      onPressed: () => context.pop(),
                      child: const Text('Cancelar'))),
              const SizedBox(width: 25),
              SizedBox(
                  width: 120,
                  child: ElevatedButton(
                      onPressed: () => onSubmit(context, ref),
                      child: const Text('Aceptar')))
            ])
          ]);
}

Future<void> showCreateTableDialog(BuildContext context) => showDialog(
    context: context, builder: (BuildContext context) => _CreateTableDialog());
