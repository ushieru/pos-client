import 'package:flutter/material.dart';
// import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:oktoast/oktoast.dart';
import 'package:total_pos/models/product.dart';
import 'package:total_pos/providers/settings_state_provider.dart';
import 'package:total_pos/routes/admin/categories_route.dart';
import 'package:total_pos/routes/admin/config_route.dart';
import 'package:total_pos/routes/admin/dashboard_route.dart';
import 'package:total_pos/routes/cashier/cashier_dashboard_route.dart';
import 'package:total_pos/routes/cashier/cashier_sales/cashier_sales_route.dart';
import 'package:total_pos/routes/loading_route.dart';
import 'package:total_pos/routes/login_route.dart';
import 'package:total_pos/routes/admin/product_category_route.dart';
import 'package:total_pos/routes/admin/products_route.dart';
import 'package:total_pos/routes/admin/tables_route.dart';
import 'package:total_pos/routes/admin/users_route.dart';
import 'package:total_pos/models/settings.dart';

void main() {
  runApp(const ProviderScope(child: MyApp()));
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
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.watch(settingsStateProvider);
    return OKToast(
        child: MaterialApp.router(
            debugShowCheckedModeBanner: false,
            title: 'Point Of Sale',
            theme: ThemeData(
                colorScheme: ColorScheme.fromSeed(
                    seedColor: Settings.primaryColor,
                    brightness: Brightness.dark),
                useMaterial3: true),
            routerConfig: _router));
  }
}

final _router = GoRouter(routes: [
  GoRoute(
    path: LoadingRoute.routeName,
    builder: (_, __) => const LoadingRoute(),
  ),
  GoRoute(
    path: LoginRoute.routeName,
    builder: (_, __) => LoginRoute(),
  ),
  GoRoute(
    path: DashboardRoute.routeName,
    builder: (_, __) => const DashboardRoute(),
  ),
  GoRoute(
    path: UsersRoute.routeName,
    builder: (_, __) => const UsersRoute(),
  ),
  GoRoute(
    path: ProductsRoute.routeName,
    builder: (_, __) => const ProductsRoute(),
  ),
  GoRoute(
    path: CategoriesdRoute.routeName,
    builder: (_, __) => const CategoriesdRoute(),
  ),
  GoRoute(
    path: ProductCategoryRoute.routeName,
    builder: (_, state) =>
        ProductCategoryRoute(product: state.extra as Product),
  ),
  GoRoute(
    path: TablesRoute.routeName,
    builder: (_, __) => const TablesRoute(),
  ),
  GoRoute(
    path: ConfigRoute.routeName,
    builder: (_, __) => const ConfigRoute(),
  ),
  GoRoute(
    path: CashierDashboardRoute.routeName,
    builder: (_, __) => const CashierDashboardRoute(),
  ),
  GoRoute(
    path: CashierSalesRoute.routeName,
    builder: (_, __) => const CashierSalesRoute(),
  ),
]);
