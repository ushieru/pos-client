import 'package:flutter/material.dart';
import 'package:total_pos/widgets/layouts/dashboard_admin_layout.dart';
import 'package:total_pos/widgets/panel.dart';

class TicketsRoute extends StatelessWidget {
  static const String routeName = '/admin/tickets';
  const TicketsRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return DashboardAdminLayout(
        child: ListView(children: [
      Panel(
          child:
              Text('Tickets', style: Theme.of(context).textTheme.titleLarge)),
    ]));
  }
}
