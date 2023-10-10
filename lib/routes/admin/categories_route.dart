import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/widgets/panel.dart';
import 'package:total_pos/widgets/tables/categories_table.dart';
import 'package:total_pos/widgets/dialogs/create/create_category_dialog.dart';
import 'package:total_pos/widgets/layouts/dashboard_admin_layout.dart';

class CategoriesdRoute extends ConsumerWidget {
  static const String routeName = '/admin/categories';
  const CategoriesdRoute({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return DashboardAdminLayout(
        child: ListView(children: [
      Panel(
          child: Text('Categorias',
              style: Theme.of(context).textTheme.titleLarge)),
      Panel(
          child: Row(children: [
        ElevatedButton.icon(
            onPressed: () => showCreateCategoryDialog(context),
            icon: const Icon(Icons.add),
            label: const Text('Nueva categoria'))
      ])),
      const Panel(child: CategoriesTable()),
    ]));
  }
}
