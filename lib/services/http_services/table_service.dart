import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:total_pos/models/dto/create_table_dto.dart';
import 'package:total_pos/models/settings.dart';
import 'package:total_pos/models/table.dart';

class TablesService {
  Future<List<Table>> getTables(String jwt) async {
    final response = await http.get(Uri.http(Settings.serverHost, '/tables'),
        headers: {'Authorization': 'Bearer $jwt'});
    final jsonList = jsonDecode(response.body) as List<dynamic>;
    return jsonList.map((json) => Table.fromJson(json)).toList();
  }

  Future<Table> createTable(String jwt, CreateTableDTO createTableDTO) async {
    final response = await http.post(
      Uri.http(Settings.serverHost, '/tables'),
      headers: {
        'Authorization': 'Bearer $jwt',
        'Content-Type': 'application/json'
      },
      body: jsonEncode(createTableDTO.toJson()),
    );
    final json = jsonDecode(response.body);
    return Table.fromJson(json);
  }

  Future<Table> updateTable(
      String jwt, int tableId, CreateTableDTO createTableDTO) async {
    final response = await http.put(
      Uri.http(Settings.serverHost, '/tables/$tableId'),
      headers: {
        'Authorization': 'Bearer $jwt',
        'Content-Type': 'application/json'
      },
      body: jsonEncode(createTableDTO.toJson()),
    );
    final json = jsonDecode(response.body);
    return Table.fromJson(json);
  }

  Future<bool> deleteTable(String jwt, int tableId) async {
    final response = await http.delete(
        Uri.http(Settings.serverHost, '/tables/$tableId'),
        headers: {'Authorization': 'Bearer $jwt'});
    return response.statusCode == 200;
  }
}
