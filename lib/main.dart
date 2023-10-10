import 'package:flutter/material.dart' hide Router;
// import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:oktoast/oktoast.dart';
import 'package:total_pos/providers/settings_state_provider.dart';
import 'package:total_pos/models/settings.dart';
import 'package:total_pos/router.dart';

void main() {
  runApp(ProviderScope(child: MyApp()));
  // doWhenWindowReady(() {
  //   final window = appWindow;
  //   const initialSize = Size(1280, 720);
  //   window.minSize = initialSize;
  //   window.size = initialSize;
  //   window.alignment = Alignment.center;
  //   window.title = "Total POS";
  //   window.show();
  // });
}

class MyApp extends ConsumerWidget {
  MyApp({super.key});

  final _router = Router().build();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.watch(settingsStateProvider);
    return OKToast(
        child: MaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: 'Point Of Sale',
      theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(
              seedColor: Settings.primaryColor, brightness: Brightness.dark),
          useMaterial3: true),
      routerConfig: _router,
    ));
  }
}
