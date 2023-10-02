import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:total_pos/models/dto/update_product_dto.dart';
import 'package:total_pos/providers/products_state_provider.dart';
import 'package:total_pos/routes/admin/product_category_route.dart';
import 'package:total_pos/widgets/dialogs/bool_dialog.dart';
import 'package:total_pos/widgets/dialogs/update_one_field_dialog.dart';

class ProductsTable extends ConsumerWidget {
  const ProductsTable({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(productsStateProvider);
    final productStateMethods = ref.watch(productsStateProvider.notifier);
    return DataTable(
        columns: [
          DataColumn(
              label: Text(
            'ID',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'Nombre',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'Precio',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'Descripcion',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'Opciones',
            style: Theme.of(context).textTheme.titleMedium,
          )),
        ],
        rows: state
            .map((product) => DataRow(cells: [
                  DataCell(Text(product.id.toString())),
                  DataCell(Text(product.name),
                      showEditIcon: true,
                      onTap: () => showUpdateOneFieldDialog(
                          context,
                          'Actualizar producto #${product.id}',
                          '',
                          false,
                          'Nombre',
                          (result) => productStateMethods.updateProduct(
                              UpdateProductDTO(
                                  id: product.id,
                                  description: product.description,
                                  name: result,
                                  price: product.price.toString())))),
                  DataCell(Text('\$ ${product.price}'),
                      showEditIcon: true,
                      onTap: () => showUpdateOneFieldDialog(
                          context,
                          'Actualizar producto #${product.id}',
                          '',
                          true,
                          'Precio',
                          (result) => productStateMethods.updateProduct(
                              UpdateProductDTO(
                                  id: product.id,
                                  description: product.description,
                                  name: product.name,
                                  price: result)))),
                  DataCell(
                      Tooltip(
                        message: product.description,
                        child: SizedBox(
                          width: 40,
                          child: Text(product.description,
                              overflow: TextOverflow.ellipsis),
                        ),
                      ),
                      showEditIcon: true,
                      onTap: () => showUpdateOneFieldDialog(
                          context,
                          'Actualizar producto #${product.id}',
                          '',
                          false,
                          'Descripcion',
                          (result) => productStateMethods.updateProduct(
                              UpdateProductDTO(
                                  id: product.id,
                                  description: result,
                                  name: product.name,
                                  price: product.price.toString())))),
                  DataCell(Row(children: [
                    ElevatedButton(
                        onPressed: () => context
                            .go(ProductCategoryRoute.routeName, extra: product),
                        child: const Icon(Icons.link, color: Colors.blue)),
                    ElevatedButton(
                        onPressed: () => showBoolDialog(
                                    context,
                                    'Eliminar producto',
                                    '¿Esta seguro que desea eliminar el producto "${product.name}" con ID: ${product.id}?')
                                .then((isOk) {
                              if (isOk ?? false) {
                                productStateMethods.deleteProduct(product);
                              }
                            }),
                        child: const Icon(Icons.delete_rounded,
                            color: Colors.red)),
                  ]))
                ]))
            .toList());
  }
}
