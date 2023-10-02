import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/models/product.dart';
import 'package:total_pos/models/ticket.dart';
import 'package:total_pos/providers/auth_state_provider.dart';
import 'package:total_pos/services/http_services/payments_service.dart';
import 'package:total_pos/services/http_services/ticket_service.dart';

final ticketStateProvider =
    StateNotifierProvider<TicketStateProvider, List<Ticket>>(
        (ref) => TicketStateProvider(ref.read(authStateProvider)));

class TicketStateProvider extends StateNotifier<List<Ticket>> {
  TicketStateProvider(this.authState) : super([]) {
    getTickets();
  }

  final AuthState authState;
  final _ticketService = TicketService();
  final _paymentService = PaymentService();

  Future<void> getTickets() async {
    state = await _ticketService.getTickets(authState.jwtToken);
  }

  Future<Ticket> getTicketByID(int id) async =>
      await _ticketService.getTicketByID(authState.jwtToken, id);

  Future<Ticket> createTicket() async =>
      await _ticketService.createTicket(authState.jwtToken);

  Future<bool> deleteTicket(Ticket ticket) async =>
      await _ticketService.deleteTicket(authState.jwtToken, ticket.id);

  Future<Ticket> addProductToTicket(Ticket ticket, Product product) async =>
      await _ticketService.addProductToTicket(
          authState.jwtToken, ticket.id, product.id);

  Future<Ticket> deleteProductToTicket(Ticket ticket, Product product) async =>
      await _ticketService.deleteProductToTicket(
          authState.jwtToken, ticket.id, product.id);

  Future<Ticket> payTicket(Ticket ticket) async =>
      await _paymentService.payTicketById(authState.jwtToken, ticket.id);
}
