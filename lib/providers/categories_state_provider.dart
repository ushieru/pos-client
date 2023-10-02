import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/models/category.dart';
import 'package:total_pos/models/dto/update_category_dto.dart';
import 'package:total_pos/providers/auth_state_provider.dart';
import 'package:total_pos/services/http_services/categories_service.dart';

final categoriesStateProvider =
    StateNotifierProvider<CategoriesStateProvider, List<Category>>(
        (ref) => CategoriesStateProvider(ref.read(authStateProvider)));

class CategoriesStateProvider extends StateNotifier<List<Category>> {
  CategoriesStateProvider(this.authState) : super([]) {
    getCategories();
    Timer.periodic(const Duration(seconds: 5), (timer) {
      getCategories();
    });
  }

  final AuthState authState;
  final _categoriesService = CategoriesService();

  Future<void> getCategories() async {
    state = await _categoriesService.getCategories(authState.jwtToken);
  }

  Future<void> getCategoryByID(int id) async => throw "Method not implemented";

  Future<void> createCategory(String categoryName) async => _categoriesService
      .createCategory(authState.jwtToken, categoryName)
      .then((_) => getCategories());

  Future<void> updateCategory(UpdateCategoryDTO updateCategoryDTO) async =>
      _categoriesService
          .updateCategory(authState.jwtToken, updateCategoryDTO)
          .then((_) => getCategories());

  Future<void> deleteCategory(Category category) async => _categoriesService
      .deleteCategory(authState.jwtToken, category)
      .then((_) => getCategories());
}
