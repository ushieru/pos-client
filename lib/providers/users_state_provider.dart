import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/models/user.dart';
import 'package:total_pos/providers/auth_state_provider.dart';
import 'package:total_pos/services/http_services/users_service.dart';

final usersStateProvider =
    StateNotifierProvider<UsersStateProvider, List<User>>(
        (ref) => UsersStateProvider(ref.read(authStateProvider)));

class UsersStateProvider extends StateNotifier<List<User>> {
  UsersStateProvider(this.authState) : super([]) {
    getUsers();
  }

  final AuthState authState;
  final _usersService = UsersService();

  Future<void> getUsers() async {
    state = await _usersService.getUsers(authState.jwtToken);
  }

  Future<void> getUserByID(int id) async => throw "Method not implemented";

  Future<void> createUser() async => throw "Method not implemented";

  Future<void> updateUser(User user) async => throw "Method not implemented";

  Future<void> deleteUser(User user) async => throw "Method not implemented";
}
