import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:total_pos/providers/settings_state_provider.dart';
import 'package:total_pos/routes/login_route.dart';

class LoadingRoute extends ConsumerWidget {
  static const String routeName = '/';
  const LoadingRoute({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final settings = ref.read(settingsStateProvider);
    ref.listen(settingsStateProvider, (_, settings) {
      if (settings != null) {
        context.go(LoginRoute.routeName);
      }
    });
    if (settings == null) {
      ref.read(settingsStateProvider.notifier).init();
    }
    return const Scaffold(
        body: Center(
            child: Card(
                child: Padding(
      padding: EdgeInsets.all(15),
      child: CircularProgressIndicator(),
    ))));
  }
}
