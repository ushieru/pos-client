import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/widgets/dialogs/create/create_product_dialog.dart';
import 'package:total_pos/widgets/layouts/dashboard_admin_layout.dart';
import 'package:total_pos/widgets/panel.dart';
import 'package:total_pos/widgets/tables/products_table.dart';

class ProductsRoute extends ConsumerWidget {
  static const String routeName = '/admin/products';
  const ProductsRoute({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return DashboardAdminLayout(
        child: ListView(children: [
      Panel(
          child:
              Text('Productos', style: Theme.of(context).textTheme.titleLarge)),
      Panel(
          child: Row(children: [
        ElevatedButton.icon(
            onPressed: () => showCreateProductDialog(context),
            icon: const Icon(Icons.add),
            label: const Text('Nuevo Producto')),
      ])),
      const Panel(child: ProductsTable())
    ]));
  }
}
