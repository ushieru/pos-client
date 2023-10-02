import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class _BoolDialog extends StatelessWidget {
  const _BoolDialog({required this.title, required this.description});

  final String title;
  final String description;

  @override
  Widget build(BuildContext context) => SimpleDialog(
          title: Text(title),
          contentPadding: const EdgeInsets.all(30),
          children: [
            Text(description),
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

Future<bool?> showBoolDialog(
        BuildContext context, String title, String description) =>
    showDialog<bool>(
        context: context,
        builder: (BuildContext context) =>
            _BoolDialog(title: title, description: description));
