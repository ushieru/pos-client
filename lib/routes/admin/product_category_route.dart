import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/models/product.dart';
import 'package:total_pos/providers/categories_state_provider.dart';
import 'package:total_pos/providers/products_state_provider.dart';
import 'package:total_pos/widgets/layouts/dashboard_layout.dart';
import 'package:total_pos/widgets/panel.dart';

class ProductCategoryRouteState extends StateNotifier<Product> {
  ProductCategoryRouteState(
    this.product,
    this.productsStateProvider,
  ) : super(product) {
    loadCategories();
  }

  final ProductsStateProvider productsStateProvider;
  final Product product;

  void loadCategories() async {
    state = await productsStateProvider.getProductByID(product.id);
  }
}

class ProductCategoryRoute extends ConsumerWidget {
  static const String routeName = '/admin/product-category';
  ProductCategoryRoute({super.key, required Product product}) {
    productCategoryRouteState =
        StateNotifierProvider<ProductCategoryRouteState, Product>((ref) =>
            ProductCategoryRouteState(
                product, ref.read(productsStateProvider.notifier)));
  }

  late final StateNotifierProvider<ProductCategoryRouteState, Product>
      productCategoryRouteState;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final categories = ref.read(categoriesStateProvider);
    final addCategory =
        ref.read(productsStateProvider.notifier).addCategoryToProduct;
    final deleteCategory =
        ref.read(productsStateProvider.notifier).deleteCategoryToProduct;
    final reloadProduct =
        ref.read(productCategoryRouteState.notifier).loadCategories;
    final product = ref.watch(productCategoryRouteState);
    final filterCategories = categories.where((category) {
      if (product.categories != null) {
        if (product.categories!
                .indexWhere((pCategory) => category.id == pCategory.id) >
            -1) return false;
      }
      return true;
    });
    return DashboardLayout(
        child: ListView(children: [
      Panel(
          child: Text('Agregar categorias',
              style: Theme.of(context).textTheme.titleLarge)),
      Panel(
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(
          product.name,
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 10),
        Text('ID: ${product.id}'),
        Text('Precio: \$${product.price}'),
        Text('Descripcion: ${product.description}'),
      ])),
      if (product.categories == null)
        const Panel(child: LinearProgressIndicator()),
      if (product.categories != null)
        Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          ExpandedPanel(
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                Text(
                  'Todas las Categorias',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 10),
                ...filterCategories.map((category) => Padding(
                      padding: const EdgeInsets.only(top: 10),
                      child: ElevatedButton.icon(
                        onPressed: () => addCategory(product, category)
                            .then((_) => reloadProduct()),
                        icon: const Icon(Icons.add),
                        label: Text(category.name),
                      ),
                    ))
              ])),
          ExpandedPanel(
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                Text(
                  'Categorias del producto',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 10),
                ...product.categories!.map((category) => Padding(
                      padding: const EdgeInsets.only(top: 10),
                      child: ElevatedButton.icon(
                        onPressed: () => deleteCategory(product, category)
                            .then((_) => reloadProduct()),
                        icon: const Icon(Icons.delete),
                        label: Text(category.name),
                      ),
                    ))
              ])),
        ])
    ]));
  }
}
