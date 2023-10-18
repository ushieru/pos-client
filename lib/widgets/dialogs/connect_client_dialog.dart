import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:total_pos/services/http_services/utils_service.dart';

class _ConnectClientDialog extends StatefulWidget {
  const _ConnectClientDialog();

  @override
  State<_ConnectClientDialog> createState() => _ConnectClientDialogState();
}

class _ConnectClientDialogState extends State<_ConnectClientDialog> {
  final _utilsServices = UtilsService();
  String? serverUrl;

  @override
  void initState() {
    _utilsServices.getInfo().then((info) => setState(() => serverUrl = info));
    super.initState();
  }

  @override
  Widget build(BuildContext context) => SimpleDialog(
          title: const Text('Conectar Cliente'),
          contentPadding: const EdgeInsets.all(30),
          children: [
            if (serverUrl != null)
              SizedBox(
                  width: 200,
                  child: QrImageView(
                    data: 'http://$serverUrl:8080',
                    dataModuleStyle: const QrDataModuleStyle(
                        color: Colors.white,
                        dataModuleShape: QrDataModuleShape.square),
                    eyeStyle: const QrEyeStyle(
                        color: Colors.white, eyeShape: QrEyeShape.square),
                  )),
            Align(alignment: Alignment.center, child: Text('$serverUrl:8080')),
          ]);
}

Future<void> showConnectClientDialog(BuildContext context) => showDialog(
    context: context,
    builder: (BuildContext context) => const _ConnectClientDialog());
