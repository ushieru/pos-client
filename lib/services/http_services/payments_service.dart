import 'dart:convert';
import 'dart:developer';
import 'package:http/http.dart' as http;
import 'package:total_pos/models/ticket.dart';
import 'package:total_pos/models/settings.dart';

class PaymentService {
  Future<Ticket> payTicketById(String jwt, int ticketId) async {
    try {
      final response = await http.post(
          Uri.http(Settings.serverHost, '/payments/tickets/$ticketId'),
          headers: {'Authorization': 'Bearer $jwt'});
      final jsonTicket = jsonDecode(response.body);
      return Ticket.fromJson(jsonTicket);
    } catch (e) {
      log('Error: Class PaymentService => Method payTicketById');
      log(e.toString());
      throw 'payTicketById';
    }
  }
}
