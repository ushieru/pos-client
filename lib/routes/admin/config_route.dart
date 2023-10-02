import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/models/settings.dart';
import 'package:total_pos/providers/settings_state_provider.dart';
import 'package:total_pos/widgets/layouts/dashboard_layout.dart';
import 'package:total_pos/utils/colors.dart' as c;
import 'package:total_pos/widgets/panel.dart';

class ConfigRoute extends ConsumerStatefulWidget {
  static const String routeName = '/admin/config';
  const ConfigRoute({super.key});

  @override
  ConsumerState createState() => _ConfigRouteState();
}

class _ConfigRouteState extends ConsumerState {
  c.Color dropdownValue = c.colorToMaterialColor(Settings.primaryColor);

  @override
  Widget build(BuildContext context) {
    return DashboardLayout(
        child: ListView(children: [
      Panel(
          child: Text('Configuracion',
              style: Theme.of(context).textTheme.titleLarge)),
      Panel(
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(
          'Color',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 10),
        DropdownButton<c.Color>(
            items: c.Color.values
                .map((e) =>
                    DropdownMenuItem<c.Color>(value: e, child: Text(e.name)))
                .toList(),
            value: dropdownValue,
            onChanged: (value) {
              if (value != null) {
                setState(() {
                  dropdownValue = value;
                });
              }
            }),
        const SizedBox(height: 10),
        FilledButton(
            onPressed: () => ref
                .read(settingsStateProvider.notifier)
                .updateColor(dropdownValue),
            child: const Text('Guardar'))
      ])),
    ]));
  }
}
