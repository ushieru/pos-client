import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/models/settings.dart';

final initBackendStateProvider =
    StateNotifierProvider<InitBackendStateProvider, Settings>(
        (ref) => InitBackendStateProvider());

class InitBackendStateProvider extends StateNotifier<Settings> {
  InitBackendStateProvider() : super(Settings()) {
    init();
  }

  Future<void> init() async {
    if (File('./backend/point_of_sale').existsSync()) {
      Process.run('./backend/point_of_sale', [])
          .then((result) => stdout.write(result.stdout));
    }
  }
}
