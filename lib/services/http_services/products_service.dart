import 'dart:convert';
import 'dart:developer';
import 'package:http/http.dart' as http;
import 'package:total_pos/models/category.dart';
import 'package:total_pos/models/dto/create_product_dto.dart';
import 'package:total_pos/models/dto/update_product_dto.dart';
import 'package:total_pos/models/product.dart';
import 'package:total_pos/models/settings.dart';

class ProductsService {
  Future<List<Product>> getProducts(String jwt) async {
    try {
      final response = await http.get(
          Uri.http(Settings.serverHost, '/products'),
          headers: {'Authorization': 'Bearer $jwt'});
      final jsonList = jsonDecode(response.body) as List<dynamic>;
      return jsonList.map((json) => Product.fromJson(json)).toList();
    } catch (e) {
      log('Error: Class ProductsService => Method getProducts');
      log(e.toString());
      return [];
    }
  }

  Future<Product> getProductByID(String jwt, int productId) async {
    try {
      final response = await http.get(
          Uri.http(Settings.serverHost, '/products/$productId'),
          headers: {'Authorization': 'Bearer $jwt'});
      final jsonProduct = jsonDecode(response.body);
      return Product.fromJson(jsonProduct);
    } catch (e) {
      log('Error: Class ProductsService => Method getProductByID');
      log(e.toString());
      throw 'Error getProductByID';
    }
  }

  Future<Product> createProduct(
      String jwt, CreateProductDTO createProductDTO) async {
    try {
      final response = await http.post(
        Uri.http(Settings.serverHost, '/products'),
        headers: {'Authorization': 'Bearer $jwt'},
        body: createProductDTO.toJson(),
      );
      final jsonProduct = jsonDecode(response.body);
      return Product.fromJson(jsonProduct);
    } catch (e) {
      log('Error: Class ProductService => Method createProduct');
      log(e.toString());
      throw 'Error createProduct';
    }
  }

  Future<Product> updateProduct(
      String jwt, UpdateProductDTO updateProductDTO) async {
    try {
      final response = await http.put(
        Uri.http(Settings.serverHost, '/products/${updateProductDTO.id}'),
        headers: {'Authorization': 'Bearer $jwt'},
        body: updateProductDTO.toJson(),
      );
      final jsonProduct = jsonDecode(response.body);
      return Product.fromJson(jsonProduct);
    } catch (e) {
      log('Error: Class ProductsService => Method updateProduct');
      log(e.toString());
      throw 'Error updateProduct';
    }
  }

  Future<List<Product>> getProductsByCategoryId(
      String jwt, int categoryId) async {
    try {
      final response = await http.get(
          Uri.http(Settings.serverHost, '/products/categories/$categoryId'),
          headers: {'Authorization': 'Bearer $jwt'});
      final jsonList = jsonDecode(response.body) as List<dynamic>;
      return jsonList.map((json) => Product.fromJson(json)).toList();
    } catch (e) {
      log('Error: Class ProductsService => Method getProductsByCategoryId');
      log(e.toString());
      return [];
    }
  }

  Future<bool> addCategoryToProduct(
      String jwt, Product product, Category category) async {
    try {
      final response = await http.post(
        Uri.http(Settings.serverHost,
            '/products/${product.id}/categories/${category.id}'),
        headers: {'Authorization': 'Bearer $jwt'},
      );
      return response.statusCode == 200;
    } catch (e) {
      log('Error: Class ProductService => Method addCategoryToProduct');
      log(e.toString());
      return false;
    }
  }

  Future<bool> deleteCategoryToProduct(
      String jwt, Product product, Category category) async {
    try {
      final response = await http.delete(
        Uri.http(Settings.serverHost,
            '/products/${product.id}/categories/${category.id}'),
        headers: {'Authorization': 'Bearer $jwt'},
      );
      return response.statusCode == 200;
    } catch (e) {
      log('Error: Class ProductService => Method deleteCategoryToProduct');
      log(e.toString());
      return false;
    }
  }

  Future<bool> deleteProducts(String jwt, Product product) async {
    try {
      final response = await http.delete(
          Uri.http(Settings.serverHost, '/products/${product.id}'),
          headers: {'Authorization': 'Bearer $jwt'});
      return response.statusCode == 200;
    } catch (e) {
      log('Error: Class ProductsService => Method createProducts');
      log(e.toString());
      return false;
    }
  }
}
