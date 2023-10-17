import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:total_pos/models/settings.dart';
import 'package:total_pos/providers/auth_state_provider.dart';
import 'package:total_pos/providers/tables_state_provider.dart';
import 'package:total_pos/routes/cashier/cashier_sales/cashier_sales_route.dart';
import 'package:total_pos/routes/login_route.dart';
import 'package:total_pos/widgets/dialogs/charge_ticket_fullscreen_dialog.dart';
import 'package:total_pos/widgets/panel.dart';

class CashierDashboardRoute extends ConsumerWidget {
  static const String routeName = '/cashier/dashboard';
  const CashierDashboardRoute({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final logout = ref.read(authStateProvider.notifier).logout;
    final tablesMethods = ref.watch(tablesStateProvider.notifier);
    final tables = ref.watch(tablesStateProvider);
    return Scaffold(
        body: Column(children: [
      Panel(
          child:
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        Text(
          'Cashier',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        ElevatedButton.icon(
            onPressed: () {
              logout();
              context.pushReplacement(LoginRoute.routeName);
            },
            icon: const Icon(Icons.exit_to_app),
            label: const Text('Cerrar Sesion')),
      ])),
      Panel(
          child: Row(children: [
        ElevatedButton.icon(
            onPressed: () => context.push(CashierSalesRoute.routeName),
            icon: const Icon(Icons.attach_money_rounded),
            label: const Text('Venta Rapida')),
      ])),
      ExpandedPanel(
          child: tables.isEmpty
              ? const LinearProgressIndicator()
              : Column(children: [
                  for (int i = 0; i < 5; i++)
                    Expanded(
                        child: Row(children: [
                      for (int j = 0; j < 10; j++)
                        Expanded(
                            child: tables[(i * 10) + j] == null
                                ? Container(
                                    decoration: BoxDecoration(
                                        color:
                                            Colors.grey.shade700.withAlpha(100),
                                        border: Border.all()))
                                : tables[(i * 10) + j]!.ticket == null
                                    ? Container(
                                        width: 100,
                                        height: 100,
                                        alignment: Alignment.center,
                                        decoration: BoxDecoration(
                                            color: Settings.primaryColor,
                                            border: Border.all()),
                                        child: Text(tables[(i * 10) + j]!.name,
                                            style: Theme.of(context)
                                                .textTheme
                                                .headlineLarge))
                                    : Container(
                                        margin: const EdgeInsets.all(2),
                                        height: double.maxFinite,
                                        width: double.maxFinite,
                                        child: FilledButton(
                                            onPressed: () =>
                                                showChargeTicketFullScreenDialog(
                                                        context,
                                                        tables[(i * 10) + j]!
                                                            .ticket!)
                                                    .then((value) {
                                                  if (value != true) return;
                                                  tablesMethods.getTables();
                                                }),
                                            child: Text(
                                                tables[(i * 10) + j]!.name)),
                                      ))
                    ]))
                ]))
    ]));
  }
}
