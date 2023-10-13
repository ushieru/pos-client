import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:total_pos/models/account.dart';
import 'package:total_pos/providers/auth_state_provider.dart';
import 'package:total_pos/routes/admin/dashboard_route.dart';
import 'package:total_pos/routes/cashier/cashier_dashboard_route.dart';
import 'package:total_pos/models/settings.dart';
import 'package:total_pos/widgets/dialogs/config_dialog.dart';
import 'package:total_pos/widgets/dialogs/connect_client_dialog.dart';

class LoginRoute extends ConsumerWidget {
  static const String routeName = '/login';
  LoginRoute({super.key});

  final TextEditingController userController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final login = ref.read(authStateProvider.notifier).login;
    ref.listen(authStateProvider, (_, state) {
      if (!state.isLoged) return;
      if (state.user?.account.accountType == AccountType.admin) {
        context.go(DashboardRoute.routeName);
      }
      if (state.user?.account.accountType == AccountType.cashier) {
        context.go(CashierDashboardRoute.routeName);
      }
    });
    return Scaffold(
        body: Row(children: [
      Expanded(
          flex: 2,
          child: Container(
            color: Settings.primaryColor,
          )),
      Expanded(
          flex: 3,
          child: Column(children: [
            Padding(
              padding: const EdgeInsets.only(right: 10, top: 5),
              child: Row(mainAxisAlignment: MainAxisAlignment.end, children: [
                IconButton(
                    onPressed: () => showConnectClientDialog(context),
                    icon: const Icon(Icons.cell_tower)),
                IconButton(
                    onPressed: () => showConfigDialog(context),
                    icon: const Icon(Icons.settings)),
              ]),
            ),
            Expanded(
                child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 150),
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('Total POS',
                        style: Theme.of(context)
                            .textTheme
                            .headlineLarge!
                            .copyWith(color: Settings.primaryColor)),
                    const SizedBox(height: 10),
                    TextFormField(
                      controller: userController,
                      decoration:
                          const InputDecoration(prefixIcon: Icon(Icons.person)),
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      controller: passwordController,
                      onFieldSubmitted: (_) =>
                          login(userController.text, passwordController.text),
                      obscureText: true,
                      decoration:
                          const InputDecoration(prefixIcon: Icon(Icons.lock)),
                    ),
                    const SizedBox(height: 30),
                    FilledButton(
                        onPressed: () =>
                            login(userController.text, passwordController.text),
                        child: const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 30),
                          child: Text('Ingresar'),
                        ))
                  ]),
            )),
            const Text('Made with ❤️ by Ushieru'),
            const SizedBox(height: 10),
          ]))
    ]));
  }
}
