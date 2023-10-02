import 'package:flutter/material.dart';
import 'package:total_pos/services/http_services/utils_service.dart';

class _ConnectClientDialog extends StatefulWidget {
  const _ConnectClientDialog();

  @override
  State<_ConnectClientDialog> createState() => _ConnectClientDialogState();
}

class _ConnectClientDialogState extends State<_ConnectClientDialog> {
  final _utilsServices = UtilsService();
  String? services;

  @override
  void initState() {
    _utilsServices.getInfo().then((info) => setState(() => services = info));
    super.initState();
  }

  @override
  Widget build(BuildContext context) => SimpleDialog(
          title: const Text('Conectar Cliente'),
          contentPadding: const EdgeInsets.all(30),
          children: [
            Text(services ?? 'Cargando...'),
          ]);
}

Future<void> showConnectClientDialog(BuildContext context) => showDialog(
    context: context,
    builder: (BuildContext context) => const _ConnectClientDialog());
