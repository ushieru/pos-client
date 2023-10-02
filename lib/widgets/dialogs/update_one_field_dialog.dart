import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';

class _UpdateOneFieldDialog extends StatelessWidget {
  _UpdateOneFieldDialog({
    required this.title,
    required this.description,
    required this.onlyNumbers,
    required this.inputLabel,
    required this.callback,
  });

  final String title;
  final String description;
  final Future<void> Function(String) callback;
  final bool onlyNumbers;
  final String inputLabel;
  final controller = TextEditingController();

  @override
  Widget build(BuildContext context) => SimpleDialog(
          title: Text(title),
          contentPadding: const EdgeInsets.all(30),
          children: [
            Text(description),
            onlyNumbers
                ? TextFormField(
                    controller: controller,
                    autofocus: true,
                    keyboardType: TextInputType.number,
                    inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                    decoration: InputDecoration(labelText: inputLabel))
                : TextFormField(
                    controller: controller,
                    autofocus: true,
                    decoration: InputDecoration(labelText: inputLabel)),
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
                  child: FilledButton(
                      onPressed: () =>
                          callback(controller.text).then((_) => context.pop()),
                      child: const Text('Aceptar')))
            ])
          ]);
}

Future<void> showUpdateOneFieldDialog(
  BuildContext context,
  String title,
  String description,
  bool onlyNumbers,
  String inputLabel,
  Future<void> Function(String result) callback,
) =>
    showDialog(
        context: context,
        builder: (BuildContext context) => _UpdateOneFieldDialog(
              title: title,
              description: description,
              callback: callback,
              onlyNumbers: onlyNumbers,
              inputLabel: inputLabel,
            ));
