import 'package:flutter/material.dart';
import 'package:total_pos/widgets/layouts/dashboard_layout.dart';
import 'package:total_pos/widgets/panel.dart';
import 'package:total_pos/widgets/tables/users_table.dart';

class UsersRoute extends StatelessWidget {
  static const String routeName = '/admin/users';
  const UsersRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return DashboardLayout(
        child: ListView(children: [
      Panel(
          child:
              Text('Usuarios', style: Theme.of(context).textTheme.titleLarge)),
      const Panel(child: UsersTable())
    ]));
  }
}
