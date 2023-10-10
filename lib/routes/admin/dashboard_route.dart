import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/providers/auth_state_provider.dart';
import 'package:total_pos/widgets/layouts/dashboard_admin_layout.dart';
import 'package:total_pos/widgets/panel.dart';

class DashboardRoute extends ConsumerWidget {
  static const String routeName = '/admin/dashboard';
  const DashboardRoute({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.read(authStateProvider);
    return DashboardAdminLayout(
        child: ListView(children: [
      Panel(
          child: Row(children: [
        Text('Dashboard', style: Theme.of(context).textTheme.titleLarge),
        const Expanded(child: SizedBox()),
        Text(authState.user!.name,
            style: Theme.of(context).textTheme.titleMedium),
      ])),
    ]));
  }
}
