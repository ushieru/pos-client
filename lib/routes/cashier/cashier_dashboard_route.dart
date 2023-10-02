import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:total_pos/providers/auth_state_provider.dart';
import 'package:total_pos/routes/cashier/cashier_sales/cashier_sales_route.dart';
import 'package:total_pos/routes/login_route.dart';
import 'package:total_pos/widgets/panel.dart';

class CashierDashboardRoute extends ConsumerWidget {
  static const String routeName = '/cashier/dashboard';
  const CashierDashboardRoute({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final logout = ref.read(authStateProvider.notifier).logout;
    return Scaffold(
        body: ListView(children: [
      Panel(
          child: Row(children: [
        Text(
          'Cashier',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const Expanded(child: SizedBox()),
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
    ]));
  }
}
