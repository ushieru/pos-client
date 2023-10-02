import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/models/category.dart';
import 'package:total_pos/models/dto/create_product_dto.dart';
import 'package:total_pos/models/dto/update_product_dto.dart';
import 'package:total_pos/models/product.dart';
import 'package:total_pos/providers/auth_state_provider.dart';
import 'package:total_pos/services/http_services/products_service.dart';

final productsStateProvider =
    StateNotifierProvider<ProductsStateProvider, List<Product>>(
        (ref) => ProductsStateProvider(ref.read(authStateProvider)));

class ProductsStateProvider extends StateNotifier<List<Product>> {
  ProductsStateProvider(this.authState) : super([]) {
    getProducts();
    Timer.periodic(const Duration(seconds: 5), (timer) {
      getProducts();
    });
  }

  final AuthState authState;
  final _productsService = ProductsService();

  Future<void> getProducts() async {
    state = await _productsService.getProducts(authState.jwtToken);
  }

  Future<void> createProduct(CreateProductDTO createProductDTO) async =>
      _productsService
          .createProduct(authState.jwtToken, createProductDTO)
          .then((_) => getProducts());

  Future<Product> getProductByID(int productId) async =>
      _productsService.getProductByID(authState.jwtToken, productId);

  Future<void> updateProduct(UpdateProductDTO updateProductDTO) async =>
      _productsService
          .updateProduct(authState.jwtToken, updateProductDTO)
          .then((_) => getProducts());

  Future<void> addCategoryToProduct(Product product, Category category) async =>
      _productsService.addCategoryToProduct(
          authState.jwtToken, product, category);

  Future<void> deleteCategoryToProduct(
          Product product, Category category) async =>
      _productsService.deleteCategoryToProduct(
          authState.jwtToken, product, category);

  Future<void> deleteProduct(Product product) async => _productsService
      .deleteProducts(authState.jwtToken, product)
      .then((_) => getProducts());
}
