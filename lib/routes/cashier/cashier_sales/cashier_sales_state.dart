import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/models/category.dart';
import 'package:total_pos/models/product.dart';
import 'package:total_pos/models/ticket.dart';
import 'package:total_pos/providers/auth_state_provider.dart';
import 'package:total_pos/services/http_services/categories_service.dart';
import 'package:total_pos/services/http_services/payments_service.dart';
import 'package:total_pos/services/http_services/products_service.dart';
import 'package:total_pos/services/http_services/ticket_service.dart';

final cashierSalesStateProvider =
    StateNotifierProvider<CashierSalesStateProvider, CashierSalesState>(
        (ref) => CashierSalesStateProvider(ref.read(authStateProvider)));

class CashierSalesStateProvider extends StateNotifier<CashierSalesState> {
  CashierSalesStateProvider(this.authState)
      : super(CashierSalesState(categories: [], products: [], ticket: null)) {
    getCategories().then((_) {
      if (state.categories.isNotEmpty) {
        getProductsByCategory(state.categories.first);
      }
    });
  }

  final AuthState authState;
  final _categoriesService = CategoriesService();
  final _productsService = ProductsService();
  final _ticketService = TicketService();
  final _paymentService = PaymentService();
  bool init = false;

  void resetInitState() {
    init = false;
    if (state.categories.isNotEmpty) {
      getProductsByCategory(state.categories.first);
    }
  }

  Future<void> initState() async {
    if (init) return;
    init = true;
    _createTicket();
  }

  Future<void> _createTicket() async {
    final ticket = await _ticketService.createTicket(authState.jwtToken);
    state = state.copyWith(ticket: ticket);
  }

  Future<void> addProduct(Product product) async {
    if (state.ticket == null) return;
    final ticket = await _ticketService.addProductToTicket(
        authState.jwtToken, state.ticket!.id, product.id);
    state = state.copyWith(ticket: ticket);
  }

  Future<void> deleteProduct(Product product) async {
    if (state.ticket == null) return;
    final ticket = await _ticketService.deleteProductToTicket(
        authState.jwtToken, state.ticket!.id, product.id);
    state = state.copyWith(ticket: ticket);
  }

  Future<void> deleteTicket() async {
    if (state.ticket == null) return;
    await _ticketService.deleteTicket(authState.jwtToken, state.ticket!.id);
  }

  Future<void> getCategories() async {
    final categories =
        await _categoriesService.getCategories(authState.jwtToken);
    state = state.copyWith(categories: categories);
  }

  Future<void> getProductsByCategory(Category category) async {
    final products = await _productsService.getProductsByCategoryId(
        authState.jwtToken, category.id);
    state = state.copyWith(products: products);
  }

  Future<bool> payTicket() async {
    if (state.ticket == null) return false;
    await _paymentService.payTicketById(authState.jwtToken, state.ticket!.id);
    return true;
  }
}

class CashierSalesState {
  CashierSalesState({
    required this.categories,
    required this.products,
    required this.ticket,
  });

  final List<Category> categories;
  final List<Product> products;
  final Ticket? ticket;

  CashierSalesState copyWith({
    List<Category>? categories,
    List<Product>? products,
    Ticket? ticket,
  }) {
    return CashierSalesState(
      categories: categories ?? this.categories,
      products: products ?? this.products,
      ticket: ticket ?? this.ticket,
    );
  }
}
