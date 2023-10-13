import 'package:go_router/go_router.dart';
import 'package:total_pos/models/product.dart';
import 'package:total_pos/routes/admin/categories_route.dart';
import 'package:total_pos/routes/admin/config_route.dart';
import 'package:total_pos/routes/admin/dashboard_route.dart';
import 'package:total_pos/routes/admin/product_category_route.dart';
import 'package:total_pos/routes/admin/products_route.dart';
import 'package:total_pos/routes/admin/tables_route.dart';
import 'package:total_pos/routes/admin/tickets_route.dart';
import 'package:total_pos/routes/admin/users_route.dart';
import 'package:total_pos/routes/cashier/cashier_dashboard_route.dart';
import 'package:total_pos/routes/cashier/cashier_sales/cashier_sales_route.dart';
import 'package:total_pos/routes/loading_route.dart';
import 'package:total_pos/routes/login_route.dart';
import 'package:total_pos/routes/waiter/ticket_route/ticket_route.dart';
import 'package:total_pos/routes/waiter/tables_route.dart' as waiter_route;

class Router {
  final _sharedRoutes = <GoRoute>[
    GoRoute(
      path: LoadingRoute.routeName,
      builder: (_, __) => const LoadingRoute(),
    ),
    GoRoute(
      path: LoginRoute.routeName,
      builder: (_, __) => LoginRoute(),
    ),
  ];

  final _adminRoutes = <GoRoute>[
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
      path: TicketsRoute.routeName,
      builder: (_, state) => const TicketsRoute(),
    ),
    GoRoute(
      path: TablesRoute.routeName,
      builder: (_, __) => const TablesRoute(),
    ),
    GoRoute(
      path: ConfigRoute.routeName,
      builder: (_, __) => const ConfigRoute(),
    ),
  ];

  final _cashierRoutes = <GoRoute>[
    GoRoute(
      path: CashierDashboardRoute.routeName,
      builder: (_, __) => const CashierDashboardRoute(),
    ),
    GoRoute(
      path: CashierSalesRoute.routeName,
      builder: (_, __) => const CashierSalesRoute(),
    ),
  ];

  final _waiterRoutes = <GoRoute>[
    GoRoute(
      path: waiter_route.TablesRoute.routeName,
      builder: (_, __) => const waiter_route.TablesRoute(),
    ),
    GoRoute(
      path: TicketRoute.routeName,
      builder: (_, __) => const TicketRoute(),
    ),
  ];

  GoRouter build() {
    var routes = <GoRoute>[];
    routes.addAll(_sharedRoutes);
    routes.addAll(_adminRoutes);
    routes.addAll(_cashierRoutes);
    routes.addAll(_waiterRoutes);
    return GoRouter(routes: routes);
  }
}
