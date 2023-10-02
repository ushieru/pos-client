import 'dart:convert';
import 'dart:developer';
import 'package:http/http.dart' as http;
import 'package:total_pos/models/category.dart';
import 'package:total_pos/models/dto/update_category_dto.dart';
import 'package:total_pos/models/settings.dart';

class CategoriesService {
  Future<List<Category>> getCategories(String jwt) async {
    try {
      final response = await http.get(
          Uri.http(Settings.serverHost, '/categories'),
          headers: {'Authorization': 'Bearer $jwt'});
      final jsonList = jsonDecode(response.body) as List<dynamic>;
      return jsonList.map((json) => Category.fromJson(json)).toList();
    } catch (e) {
      log('Error: Class CategoriesService => Method getCategories');
      log(e.toString());
      return [];
    }
  }

  Future<Category> createCategory(String jwt, String categoryName) async {
    try {
      final response = await http.post(
          Uri.http(Settings.serverHost, '/categories'),
          headers: {'Authorization': 'Bearer $jwt'},
          body: {'name': categoryName});
      final jsonCategory = jsonDecode(response.body);
      return Category.fromJson(jsonCategory);
    } catch (e) {
      log('Error: Class CategoriesService => Method createCategory');
      log(e.toString());
      throw 'Error createCategory';
    }
  }

  Future<Category> updateCategory(
      String jwt, UpdateCategoryDTO updateCategoryDTO) async {
    try {
      final response = await http.put(
          Uri.http(Settings.serverHost, '/categories/${updateCategoryDTO.id}'),
          headers: {'Authorization': 'Bearer $jwt'},
          body: {'name': updateCategoryDTO.name});
      final jsonCategory = jsonDecode(response.body);
      return Category.fromJson(jsonCategory);
    } catch (e) {
      log('Error: Class CategoriesService => Method updateCategory');
      log(e.toString());
      throw 'Error updateCategory';
    }
  }

  Future<bool> deleteCategory(String jwt, Category category) async {
    try {
      final response = await http.delete(
          Uri.http(Settings.serverHost, '/categories/${category.id}'),
          headers: {'Authorization': 'Bearer $jwt'});
      return response.statusCode == 200;
    } catch (e) {
      log('Error: Class CategoriesService => Method deleteCategory');
      log(e.toString());
      return false;
    }
  }
}
