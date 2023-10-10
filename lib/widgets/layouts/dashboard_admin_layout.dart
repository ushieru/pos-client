import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:total_pos/providers/auth_state_provider.dart';
import 'package:total_pos/routes/admin/categories_route.dart';
import 'package:total_pos/routes/admin/config_route.dart';
import 'package:total_pos/routes/admin/dashboard_route.dart';
import 'package:total_pos/routes/admin/tickets_route.dart';
import 'package:total_pos/routes/login_route.dart';
import 'package:total_pos/routes/admin/products_route.dart';
import 'package:total_pos/routes/admin/tables_route.dart';
import 'package:total_pos/routes/admin/users_route.dart';
import 'package:total_pos/models/settings.dart';

class DashboardAdminLayout extends ConsumerWidget {
  const DashboardAdminLayout({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final logout = ref.read(authStateProvider.notifier).logout;
    return Scaffold(
        body: Row(children: [
      Container(
          width: 250,
          height: double.maxFinite,
          color: Settings.primaryColor,
          child: Column(children: [
            Container(
              alignment: Alignment.center,
              height: 150,
              width: double.maxFinite,
              color: Settings.primaryColor.shade800,
              child: Text('Total POS',
                  style: Theme.of(context)
                      .textTheme
                      .headlineLarge!
                      .copyWith(fontWeight: FontWeight.bold)),
            ),
            const Divider(height: 1),
            const SizedBox(height: 50),
            SizedBox(
                width: double.maxFinite,
                child: TextButton.icon(
                    onPressed: () => context.replace(DashboardRoute.routeName),
                    icon: const Icon(Icons.dashboard),
                    label: const Align(
                        alignment: Alignment.centerLeft,
                        child: Text("Dashboard")))),
            SizedBox(
                width: double.maxFinite,
                child: TextButton.icon(
                    onPressed: () => context.replace(UsersRoute.routeName),
                    icon: const Icon(Icons.person),
                    label: const Align(
                        alignment: Alignment.centerLeft,
                        child: Text("Usuarios")))),
            SizedBox(
                width: double.maxFinite,
                child: TextButton.icon(
                    onPressed: () =>
                        context.replace(CategoriesdRoute.routeName),
                    icon: const Icon(Icons.category),
                    label: const Align(
                        alignment: Alignment.centerLeft,
                        child: Text("Categorias")))),
            SizedBox(
                width: double.maxFinite,
                child: TextButton.icon(
                    onPressed: () => context.replace(ProductsRoute.routeName),
                    icon: const Icon(Icons.shopping_cart),
                    label: const Align(
                        alignment: Alignment.centerLeft,
                        child: Text("Productos")))),
            SizedBox(
                width: double.maxFinite,
                child: TextButton.icon(
                    onPressed: () => context.replace(TicketsRoute.routeName),
                    icon: const Icon(Icons.receipt),
                    label: const Align(
                        alignment: Alignment.centerLeft,
                        child: Text("Tickets")))),
            SizedBox(
                width: double.maxFinite,
                child: TextButton.icon(
                    onPressed: () => context.replace(TablesRoute.routeName),
                    icon: const Icon(Icons.table_bar_rounded),
                    label: const Align(
                        alignment: Alignment.centerLeft,
                        child: Text("Mesas")))),
            SizedBox(
                width: double.maxFinite,
                child: TextButton.icon(
                    onPressed: () => context.replace(ConfigRoute.routeName),
                    icon: const Icon(Icons.settings),
                    label: const Align(
                        alignment: Alignment.centerLeft,
                        child: Text("Configuracion")))),
            const Divider(),
            SizedBox(
                width: double.maxFinite,
                child: TextButton.icon(
                    onPressed: () {
                      logout();
                      context.pushReplacement(LoginRoute.routeName);
                    },
                    icon: const Icon(Icons.exit_to_app),
                    label: const Align(
                        alignment: Alignment.centerLeft,
                        child: Text("Cerrar sesion")))),
          ])),
      Expanded(child: child)
    ]));
  }
}
