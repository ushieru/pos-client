import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:total_pos/models/settings.dart';
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
                    data: '@connect:$serverUrl:8080',
                    dataModuleStyle: QrDataModuleStyle(
                        color: Settings.primaryColor.shade800,
                        dataModuleShape: QrDataModuleShape.square),
                    eyeStyle: QrEyeStyle(
                        color: Settings.primaryColor.shade800,
                        eyeShape: QrEyeShape.square),
                  )),
            Text('$serverUrl:8080'),
          ]);
}

Future<void> showConnectClientDialog(BuildContext context) => showDialog(
    context: context,
    builder: (BuildContext context) => const _ConnectClientDialog());
